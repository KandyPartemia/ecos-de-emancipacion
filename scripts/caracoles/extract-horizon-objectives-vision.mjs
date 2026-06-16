/**
 * extract-horizon-objectives-vision.mjs
 *
 * Renderiza las páginas de origen de cada PA desde los Tomos de Nuestros Proyectos,
 * envía la imagen a la API de Claude con visión y extrae el texto de los cuadros
 * "Horizonte de expectativa 1" y "Horizonte de expectativa 2".
 *
 * Actualiza los bundles en:
 *   content/caracoles/curricular-development/
 *   public/caracoles/data/curricular-development/
 *
 * Uso:
 *   node scripts/caracoles/extract-horizon-objectives-vision.mjs
 *   node scripts/caracoles/extract-horizon-objectives-vision.mjs --grade=1
 *   node scripts/caracoles/extract-horizon-objectives-vision.mjs --grade=2 --field=lenguajes
 *   node scripts/caracoles/extract-horizon-objectives-vision.mjs --dry-run
 *   node scripts/caracoles/extract-horizon-objectives-vision.mjs --limit=10
 *
 * Requiere: ANTHROPIC_API_KEY en el entorno
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import * as pdfjsLib from '../../node_modules/pdfjs-dist/legacy/build/pdf.mjs';
import { createCanvas } from '@napi-rs/canvas';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');

// ─── Config ────────────────────────────────────────────────────────────────
const SRC_DEV_DIR = path.join(ROOT, 'content/caracoles/curricular-development');
const PUB_DEV_DIR = path.join(ROOT, 'public/caracoles/data/curricular-development');
const PDF_BASE = path.join(ROOT, 'content/caracoles/source-pdfs');
const REPORT_PATH = path.join(ROOT, 'reports/caracoles/horizon-vision-extraction-report.md');

const RENDER_SCALE = 2.5;   // Higher = better quality for vision, more tokens
const MODEL = 'claude-haiku-4-5-20251001';  // Fast and cheap for extraction tasks
const DELAY_MS = 800;       // Between API calls to avoid rate limiting

// Parse CLI args
const args = process.argv.slice(2).reduce((acc, a) => {
  if (!a.startsWith('--')) return acc;
  const [k, v = 'true'] = a.slice(2).split('=');
  acc[k] = v;
  return acc;
}, {});

const DRY_RUN = args['dry-run'] === 'true';
const GRADE_FILTER = args.grade || null;
const FIELD_FILTER = args.field ? args.field.toLowerCase() : null;
const LIMIT = args.limit ? parseInt(args.limit, 10) : Infinity;

// ─── PDF material map ───────────────────────────────────────────────────────
// Maps grade + tomo label to local PDF path
function pdfPath(grade, tomoLabel) {
  const gradeSlug = { '1': 'primer-grado', '2': 'segundo-grado', '3': 'tercer-grado' }[grade];
  const tomoNum = tomoLabel.match(/(?:tomo|Tomo)\s*(i{1,3}|[123])/i)?.[1]?.toLowerCase();
  const tomoMap = { 'i': '1', '1': '1', 'ii': '2', '2': '2', 'iii': '3', '3': '3' };
  const num = tomoMap[tomoNum] || '1';

  const dir = path.join(PDF_BASE, gradeSlug, 'proyectos');
  const files = fs.readdirSync(dir);
  const romanMap = { '1': 'i', '2': 'ii', '3': 'iii' };
  const roman = romanMap[num];
  const match = files.find(f => {
    const lower = f.toLowerCase();
    return lower.includes(`tomo ${roman}`) ||   // "tomo i", "tomo ii", "tomo iii"
           lower.includes(`tomo${roman}`) ||     // "tomoi"
           lower.includes(`tomo ${num}`) ||      // "tomo 1", "tomo 2", "tomo 3"
           lower.includes(`tomo${num}`);         // "tomo1"
  });
  if (!match) throw new Error(`PDF no encontrado para grado ${grade} ${tomoLabel} en ${dir}`);
  return path.join(dir, match);
}

// ─── PDF page cache ─────────────────────────────────────────────────────────
const pdfCache = new Map();

async function getPdfDoc(filePath) {
  if (pdfCache.has(filePath)) return pdfCache.get(filePath);
  const data = fs.readFileSync(filePath);
  const doc = await pdfjsLib.getDocument({
    data: new Uint8Array(data),
    useSystemFonts: true,
    verbosity: 0,
  }).promise;
  pdfCache.set(filePath, doc);
  return doc;
}

// ─── Render page to base64 PNG ──────────────────────────────────────────────
async function renderPageToBase64(pdfDoc, pageNumber) {
  const page = await pdfDoc.getPage(pageNumber);
  const viewport = page.getViewport({ scale: RENDER_SCALE });
  const canvas = createCanvas(Math.round(viewport.width), Math.round(viewport.height));
  const ctx = canvas.getContext('2d');
  await page.render({ canvasContext: ctx, viewport }).promise;
  const buf = canvas.toBuffer('image/jpeg', { quality: 0.88 });
  return buf.toString('base64');
}

// ─── Claude vision extraction ───────────────────────────────────────────────
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROMPT = `Esta es una página de un libro de proyectos de Telesecundaria mexicana (Nueva Escuela Mexicana).

Busca en la página los recuadros o cuadros destacados titulados "Horizonte de expectativa" con un número (1 y/o 2), o "Horizonte de expectativas" seguido de propuestas numeradas o en columnas. Pueden aparecer con fondo de color, borde, o en una sección separada del texto corrido.

Extrae el texto COMPLETO de cada recuadro. El texto suele ser una o dos oraciones que describen lo que los estudiantes lograrán al final del proyecto.

Responde ÚNICAMENTE con JSON válido, sin markdown, sin explicación:
{
  "horizonte1": "texto completo del horizonte 1 (o null si no existe)",
  "horizonte2": "texto completo del horizonte 2 (o null si no existe)",
  "pagina": número de página visto en el documento,
  "confianza": "alta" | "media" | "baja",
  "nota": "observación opcional si hay ambigüedad"
}`;

async function extractHorizonsFromImage(base64Image, pageNumber) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 512,
    messages: [{
      role: 'user',
      content: [
        {
          type: 'image',
          source: { type: 'base64', media_type: 'image/jpeg', data: base64Image },
        },
        { type: 'text', text: PROMPT },
      ],
    }],
  });

  const raw = response.content[0].text.trim();
  try {
    // Strip markdown code blocks if present
    const clean = raw.replace(/^```json?\s*/i, '').replace(/\s*```$/, '');
    return JSON.parse(clean);
  } catch {
    return { horizonte1: null, horizonte2: null, pagina: pageNumber, confianza: 'baja', nota: `Parse error: ${raw.slice(0, 100)}` };
  }
}

// ─── Pages index cache ───────────────────────────────────────────────────────
const pagesIndexCache = new Map();

function getPagesIndex(grade) {
  if (pagesIndexCache.has(grade)) return pagesIndexCache.get(grade);
  const indexPath = path.join(ROOT, `content/caracoles/generated-private/grade-${grade}/pages-index.full.json`);
  const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  const pages = data.pages || [];
  pagesIndexCache.set(grade, pages);
  return pages;
}

// Find the specific page within a PA's range that contains the Horizonte box
// The Horizonte text is on the "Etapa 3 / Una propuesta de solución" page
function findHorizonPage(grade, materialId, startPage, endPage) {
  const pages = getPagesIndex(grade);
  const range = pages.filter(p =>
    p.materialId === materialId &&
    p.pageNumber >= startPage &&
    p.pageNumber <= endPage
  );

  // Primary: page that says "Establezcan el horizonte" or "propuesta de solución"
  const horizonPage = range.find(p =>
    /establezcan\s+(?:un\s+)?horizonte/i.test(p.text) ||
    /propuesta de soluci[oó]n/i.test(p.text)
  );
  if (horizonPage) return horizonPage.pageNumber;

  // Fallback: page mentioning "horizonte de expectativa"
  const fallback = range.find(p => /horizonte de expectativa/i.test(p.text));
  if (fallback) return fallback.pageNumber;

  // Last resort: startPage + 2 (typical layout pattern)
  return Math.min(startPage + 2, endPage);
}

// ─── Find source page for a PA ──────────────────────────────────────────────
function findSourcePage(pa) {
  // From sourcePages.nuestroLibroProyectos
  const bookPages = pa.sourcePages?.nuestroLibroProyectos;
  if (bookPages && bookPages.length > 0) {
    const confirmed = bookPages.find(b => b.status === 'confirmed-source') || bookPages[0];
    const materialId = confirmed.materialId;
    const startPage = confirmed.startPage;
    const endPage = confirmed.endPage || (startPage + 6);
    const horizonPage = materialId
      ? findHorizonPage(pa.grade, materialId, startPage, endPage)
      : startPage + 2;
    return { page: horizonPage, startPage, endPage, tomo: confirmed.label, materialId };
  }
  // From sourceValidation or sourcePages string array
  const sourceStr = (pa.sourcePages || []);
  if (Array.isArray(sourceStr)) {
    for (const s of sourceStr) {
      const m = typeof s === 'string' && s.match(/Tomo\s+(I{1,3}|[123]).*?p\.\s*(\d+)/i);
      if (m) return { page: parseInt(m[2], 10) + 2, startPage: parseInt(m[2], 10), tomo: `Tomo ${m[1].toUpperCase()}` };
    }
  }
  return null;
}

// ─── Update horizon in a PA object ─────────────────────────────────────────
function applyHorizon(pa, result, pageNumber) {
  const h1 = result.horizonte1?.trim() || '';
  const h2 = result.horizonte2?.trim() || '';

  // Choose the better horizon: prefer the longer/more complete one
  let chosen = '';
  let source = '';
  if (h1 && h2) {
    chosen = h1.length >= h2.length ? h1 : h2;
    source = `Visión — ${h1.length >= h2.length ? 'Horizonte 1' : 'Horizonte 2'} (p. ${pageNumber})`;
  } else if (h1) {
    chosen = h1;
    source = `Visión — Horizonte 1 (p. ${pageNumber})`;
  } else if (h2) {
    chosen = h2;
    source = `Visión — Horizonte 2 (p. ${pageNumber})`;
  }

  if (!chosen) return false;

  pa.projectExpectationHorizon = {
    officialText: chosen,
    studentVersion: chosen,
    horizon1Raw: h1 || null,
    horizon2Raw: h2 || null,
    sourcePages: [source],
    evidence: `Extraído por visión de imagen de la página ${pageNumber} del libro de proyectos. Confianza: ${result.confianza}.`,
    status: result.confianza === 'alta' ? 'confirmed-from-project-book' : 'needs-review-vision',
    extractedAt: new Date().toISOString(),
  };

  if (pa.horizonOrPurpose) {
    pa.horizonOrPurpose = {
      status: result.confianza === 'alta' ? 'confirmed-from-project-book' : 'needs-review-vision',
      text: chosen,
      source,
    };
  }

  return true;
}

// ─── Process all pending PAs ────────────────────────────────────────────────
async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ Falta ANTHROPIC_API_KEY en el entorno.');
    process.exit(1);
  }

  const srcFiles = fs.readdirSync(SRC_DEV_DIR).filter(f => f.endsWith('-development.json'));

  const stats = { total: 0, processed: 0, updated: 0, skipped: 0, errors: 0, noPage: 0 };
  const report = [];

  let count = 0;

  for (const filename of srcFiles) {
    if (count >= LIMIT) break;

    // Grade filter
    if (GRADE_FILTER) {
      if (!filename.startsWith(`grade-${GRADE_FILTER}-`)) continue;
    }
    // Field filter
    if (FIELD_FILTER) {
      if (!filename.toLowerCase().includes(FIELD_FILTER)) continue;
    }

    const srcPath = path.join(SRC_DEV_DIR, filename);
    const pubFilename = filename.replace(/-development\.json$/, '.json');
    const pubPath = path.join(PUB_DEV_DIR, pubFilename);

    const srcData = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
    const pubData = fs.existsSync(pubPath)
      ? JSON.parse(fs.readFileSync(pubPath, 'utf8'))
      : null;

    const bundleGrade = srcData.grade;
    const projects = srcData.academicProjects || [];
    let bundleChanged = false;

    for (const pa of projects) {
      // Ensure grade is set at PA level (some bundles only set it at bundle level)
      if (!pa.grade) pa.grade = bundleGrade;
      if (count >= LIMIT) break;
      stats.total++;

      // Skip if already confirmed
      const hStatus = pa.projectExpectationHorizon?.status || '';
      if (hStatus === 'confirmed-from-project-book' || hStatus === 'official') {
        stats.skipped++;
        continue;
      }

      // Find source page
      const source = findSourcePage(pa);
      if (!source) {
        stats.noPage++;
        report.push({ pa: pa.id, result: 'sin-página-fuente' });
        continue;
      }

      stats.processed++;
      count++;

      try {
        // Find PDF
        const pdfFile = pdfPath(pa.grade, source.tomo);
        const pdfDoc = await getPdfDoc(pdfFile);

        console.log(`[${count}] ${pa.id} → ${source.tomo} p.${source.page}`);

        if (DRY_RUN) {
          console.log('  [DRY-RUN] skip API call');
          continue;
        }

        // Render primary page
        let result = null;
        const pagesToTry = [source.page];
        // Add adjacent pages if primary is not startPage+2 already
        if (source.startPage) {
          const offsets = [1, 3, 4, 5];
          for (const off of offsets) {
            const adj = source.startPage + off;
            if (!pagesToTry.includes(adj) && adj !== source.page) pagesToTry.push(adj);
          }
        }

        for (const pageNum of pagesToTry) {
          const img = await renderPageToBase64(pdfDoc, pageNum);
          const candidate = await extractHorizonsFromImage(img, pageNum);
          console.log(`  p.${pageNum} → h1: ${(candidate.horizonte1 || '').slice(0, 55)}… | conf: ${candidate.confianza}`);
          await new Promise(r => setTimeout(r, DELAY_MS));
          if (candidate.horizonte1 || candidate.horizonte2) {
            result = candidate;
            break;
          }
        }
        if (!result) result = { horizonte1: null, horizonte2: null, pagina: source.page, confianza: 'baja', nota: 'Sin horizonte en páginas adyacentes' };

        // Apply to source dev file
        const updated = applyHorizon(pa, result, result.pagina || source.page);

        if (updated) {
          stats.updated++;
          bundleChanged = true;
          report.push({ pa: pa.id, page: source.page, confianza: result.confianza, horizonte1: result.horizonte1, horizonte2: result.horizonte2 });
        } else {
          stats.errors++;
          report.push({ pa: pa.id, page: source.page, result: 'sin-horizonte-detectado', nota: result.nota });
        }

        // Also apply to corresponding PA in published bundle
        if (pubData) {
          const pubProjects = pubData.development?.academicProjects || [];
          const pubPa = pubProjects.find(p => p.id === pa.id || p.academicProjectNumber === pa.academicProjectNumber);
          if (pubPa) applyHorizon(pubPa, result, source.page);
        }

        await new Promise(r => setTimeout(r, DELAY_MS));

      } catch (err) {
        stats.errors++;
        console.error(`  ❌ Error en ${pa.id}:`, err.message);
        report.push({ pa: pa.id, result: 'error', error: err.message });
      }
    }

    // Save updated files
    if (bundleChanged && !DRY_RUN) {
      fs.writeFileSync(srcPath, JSON.stringify(srcData, null, 2) + '\n', 'utf8');
      if (pubData) {
        fs.writeFileSync(pubPath, JSON.stringify(pubData, null, 2) + '\n', 'utf8');
      }
      console.log(`  ✓ Guardado: ${filename}`);
    }
  }

  // ─── Write report ─────────────────────────────────────────────────────────
  const ts = new Date().toISOString();
  const md = `# Reporte — Extracción de Horizontes por Visión
Generado: ${ts}
Modo: ${DRY_RUN ? 'DRY-RUN' : 'ESCRITURA'}
Filtros: grado=${GRADE_FILTER || 'todos'}, campo=${FIELD_FILTER || 'todos'}, límite=${LIMIT}

## Resumen
| Métrica | Valor |
|---------|-------|
| PA totales evaluados | ${stats.total} |
| PA procesados (con API) | ${stats.processed} |
| Horizontes actualizados | ${stats.updated} |
| Ya confirmados (omitidos) | ${stats.skipped} |
| Sin página fuente | ${stats.noPage} |
| Errores | ${stats.errors} |

## Detalle por PA
${report.map(r => `- **${r.pa}** p.${r.page || '?'} | ${r.confianza || r.result || ''} | H1: ${(r.horizonte1 || '').slice(0, 80)} | H2: ${(r.horizonte2 || '').slice(0, 80)}`).join('\n')}
`;

  fs.writeFileSync(REPORT_PATH, md, 'utf8');

  console.log('\n──────────────────────────────────────');
  console.log(`✅ Completado. PA procesados: ${stats.processed} | Actualizados: ${stats.updated} | Errores: ${stats.errors}`);
  console.log(`📄 Reporte: ${REPORT_PATH}`);
}

main().catch(err => { console.error(err); process.exit(1); });
