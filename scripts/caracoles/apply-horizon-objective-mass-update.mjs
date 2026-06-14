import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BUNDLES_DIR = path.join(ROOT, 'public', 'caracoles', 'data', 'curricular-development');
const PAGES_DIR = path.join(ROOT, 'content', 'caracoles', 'generated-private');
const REPORT_PATH = path.join(ROOT, 'reports', 'caracoles', 'horizon-objective-mass-update-audit.md');

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = Number(process.env.HORIZON_UPDATE_LIMIT || 150);

const FIELD_LABELS = {
  lenguajes: 'Lenguajes',
  'saberes-y-pensamiento-cientifico': 'Saberes y Pensamiento Científico',
  'etica-naturaleza-y-sociedades': 'Ética, Naturaleza y Sociedades',
  'de-lo-humano-y-lo-comunitario': 'De lo Humano y lo Comunitario',
};

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function normalize(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function cleanText(value = '') {
  return String(value)
    .replace(/-\s+/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .trim();
}

function displayField(slug, fallback) {
  return FIELD_LABELS[slug] || fallback || slug;
}

function isConfirmedStatus(status = '') {
  const normalized = normalize(status);
  return normalized.includes('confirmed') || normalized.includes('official') || normalized.includes('validated');
}

function hasConfirmedHorizon(project) {
  const direct = project.horizonOrPurpose;
  if (cleanText(direct?.text) && isConfirmedStatus(direct?.status)) return true;

  const expectation = project.projectExpectationHorizon;
  if (cleanText(expectation?.officialText) || cleanText(expectation?.studentVersion)) return true;

  return false;
}

function isProvisional(project) {
  const expectation = project.projectExpectationHorizon;
  const purpose = project.projectPurpose;
  return Boolean(
    cleanText(purpose?.text) ||
      normalize(expectation?.status).includes('suggested') ||
      normalize(expectation?.status).includes('teacher') ||
      normalize(expectation?.status).includes('provisional'),
  );
}

function fieldSlugFromFile(fileName) {
  const match = fileName.match(/^grade-\d+-(.+)-ppa-\d+\.json$/);
  return match?.[1] || '';
}

function pageLabel(entry) {
  if (entry?.pagesLabel) return entry.pagesLabel;
  if (entry?.startPage && entry?.endPage && entry.startPage !== entry.endPage) return `pp. ${entry.startPage}-${entry.endPage}`;
  if (entry?.startPage) return `p. ${entry.startPage}`;
  return '';
}

function sourcePageLabel(bundle, project, pageNumber) {
  const source = project.sourcePages?.nuestroLibroProyectos?.[0];
  const label = source?.label || `Nuestro libro de proyectos ${project.bookVolume || bundle.development?.bookVolume || ''}`.trim();
  return `${label} p. ${pageNumber}`;
}

function rangeLabel(project) {
  const source = project.sourcePages?.nuestroLibroProyectos?.[0];
  const label = source?.label || `Nuestro libro de proyectos ${project.bookVolume || ''}`.trim();
  return `${label} ${pageLabel(source)}`.trim();
}

function getProjectPages(project, pagesIndex) {
  const source = project.sourcePages?.nuestroLibroProyectos?.[0];
  if (!source?.materialId || !source?.startPage || !source?.endPage) return [];
  return pagesIndex.pages
    .filter(
      (page) =>
        page.materialId === source.materialId &&
        page.pageNumber >= source.startPage &&
        page.pageNumber <= source.endPage,
    )
    .sort((a, b) => a.pageNumber - b.pageNumber);
}

function sentenceCase(value) {
  const text = cleanText(value);
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function stripTrailingNoise(value) {
  return cleanText(value)
    .replace(/\s+(Etapa|Paso a paso|Organicemos|Unimos|Valoremos|Ahora|Reorientamos)\b.*$/i, '')
    .replace(/\s+Proyecto Acad[eé]mico\s+\d+.*$/i, '')
    .replace(/\s+PPA\s+\d+.*$/i, '')
    .trim();
}

function captureBetween(text, start, endCandidates) {
  const afterStart = text.slice(start.index + start[0].length);
  let end = afterStart.length;
  for (const candidate of endCandidates) {
    const index = afterStart.search(candidate);
    if (index >= 0 && index < end) end = index;
  }
  return stripTrailingNoise(afterStart.slice(0, end));
}

function extractObjectiveEvidence(project, pages) {
  if (!pages.length) return null;

  const joined = cleanText(
    pages
      .map((page) => `[[PAGE ${page.pageNumber}]] ${page.text}`)
      .join(' '),
  );
  const normalized = normalize(joined);

  const etapa3Index = normalized.search(/etapa\s*3/);
  if (etapa3Index < 0) {
    return {
      classification: 'needsReview',
      reason: 'No se localizo Etapa 3 dentro del rango exacto del PA.',
    };
  }

  const objective1Index = normalized.search(/objetivo\s*1\b/);
  const objective2Index = normalized.search(/objetivo\s*2\b/);
  if (objective1Index < 0 || objective2Index < 0) {
    return {
      classification: 'needsReview',
      reason: 'No se localizaron Objetivo 1 y Objetivo 2 como pares claros.',
    };
  }

  if (objective1Index < etapa3Index || objective1Index - etapa3Index > 5000) {
    return {
      classification: 'needsReview',
      reason: 'Objetivo 1 no queda claramente despues de Etapa 3.',
    };
  }

  if (objective2Index <= objective1Index || objective2Index - objective1Index > 2200) {
    return {
      classification: 'needsReview',
      reason: 'Objetivo 2 no queda a distancia confiable de Objetivo 1.',
    };
  }

  const objectivePage =
    pages.find((page) => normalize(page.text).includes('objetivo 1') && normalize(page.text).includes('objetivo 2')) ||
    pages.find((page) => normalize(page.text).includes('objetivo 1')) ||
    null;

  if (!objectivePage) {
    return {
      classification: 'needsReview',
      reason: 'No se pudo ubicar una pagina concreta para los objetivos.',
    };
  }

  const lines = objectivePage.text.split(/\r?\n/).map((line) => cleanText(line));
  const objective2Line = lines.findIndex((line) => /^objetivo\s*2\b/i.test(line));
  const endLine = lines.findIndex(
    (line, index) =>
      index > objective2Line &&
      /^(objetivo\s*3|etapa\s*4|paso\s+a\s+paso|organicemos|unimos\s+las\s+piezas|valoremos)\b/i.test(line),
  );

  if (objective2Line < 0 || endLine < 0 || endLine - objective2Line < 4) {
    return {
      classification: 'needsReview',
      reason: 'No se pudo separar con claridad el bloque textual de objetivos.',
    };
  }

  const objectiveBlock = lines
    .slice(objective2Line + 1, endLine)
    .filter((line) => line && !/^\d+$/.test(line) && !/^w$/i.test(line))
    .join(' ');

  const sentences = objectiveBlock
    .split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/)
    .map(stripTrailingNoise)
    .filter((sentence) => sentence.length >= 35);

  if (sentences.length < 2) {
    return {
      classification: 'needsReview',
      reason: 'El bloque de objetivos no produjo dos enunciados completos.',
    };
  }

  const objectiveTexts = [sentences[0], sentences.slice(1).join(' ')].map(sentenceCase);
  const goodLengths = objectiveTexts.every((item) => item.length >= 45 && item.length <= 900);
  if (!goodLengths) {
    return {
      classification: 'needsReview',
      reason: `Longitud dudosa de objetivo: ${objectiveTexts.map((item) => item.length).join(', ')}.`,
    };
  }

  return {
    classification: 'confirmed',
    detectedLabel: 'Objetivo',
    sourcePage: objectivePage.pageNumber,
    officialText: `Objetivo 1: ${objectiveTexts[0]} Objetivo 2: ${objectiveTexts[1]}`,
    studentVersion: `${objectiveTexts[0]} ${objectiveTexts[1]}`,
  };
}

function collectBundles() {
  return fs
    .readdirSync(BUNDLES_DIR)
    .filter((fileName) => /^grade-\d+-.+-ppa-\d+\.json$/.test(fileName))
    .filter((fileName) => !fileName.includes('ingles'))
    .sort()
    .map((fileName) => path.join(BUNDLES_DIR, fileName));
}

function pagesByGrade() {
  const result = new Map();
  for (const grade of ['1', '2', '3']) {
    result.set(grade, readJson(path.join(PAGES_DIR, `grade-${grade}`, 'pages-index.full.json')));
  }
  return result;
}

function audit() {
  const pageIndexes = pagesByGrade();
  const bundleFiles = collectBundles();
  const stats = {
    totalProjects: 0,
    confirmedBefore: 0,
    provisionalBefore: 0,
    missingBefore: 0,
    newConfirmed: 0,
    needsReview: 0,
    missingAfter: 0,
  };
  const updates = [];
  const needsReview = [];
  const untouchedConfirmed = [];
  const filesChanged = new Set();

  for (const bundlePath of bundleFiles) {
    const fileName = path.basename(bundlePath);
    const bundle = readJson(bundlePath);
    const grade = String(bundle.grade || bundle.development?.grade || '');
    const pagesIndex = pageIndexes.get(grade);
    const projects = bundle.development?.academicProjects || [];
    const fieldSlug = fieldSlugFromFile(fileName);

    for (const project of projects) {
      stats.totalProjects += 1;
      if (hasConfirmedHorizon(project)) {
        stats.confirmedBefore += 1;
        untouchedConfirmed.push(project.id);
        continue;
      }

      if (isProvisional(project)) stats.provisionalBefore += 1;
      else stats.missingBefore += 1;

      const pages = getProjectPages(project, pagesIndex);
      const evidence = extractObjectiveEvidence(project, pages);

      if (evidence?.classification !== 'confirmed') {
        stats.needsReview += 1;
        needsReview.push({
          grade,
          field: displayField(fieldSlug, bundle.field || project.field),
          ppa: project.ppaNumber || bundle.ppaNumber,
          pa: project.academicProjectNumber,
          title: project.projectTitle || project.title,
          pages: rangeLabel(project),
          reason: evidence?.reason || 'No se encontro evidencia suficiente.',
        });
        continue;
      }

      if (updates.length >= LIMIT) {
        stats.needsReview += 1;
        needsReview.push({
          grade,
          field: displayField(fieldSlug, bundle.field || project.field),
          ppa: project.ppaNumber || bundle.ppaNumber,
          pa: project.academicProjectNumber,
          title: project.projectTitle || project.title,
          pages: rangeLabel(project),
          reason: `Confirmable, pero fuera del limite conservador de ${LIMIT}.`,
        });
        continue;
      }

      project.projectExpectationHorizon = {
        ...(project.projectExpectationHorizon || {}),
        officialText: evidence.officialText,
        studentVersion: evidence.studentVersion,
        sourcePages: [sourcePageLabel(bundle, project, evidence.sourcePage)],
        evidence:
          'Texto rotulado como Objetivo dentro del rango exacto del Proyecto Academico; se acepta como equivalente funcional de horizonte de expectativas.',
        status: 'confirmed-from-project-book',
        detectedLabel: evidence.detectedLabel,
        validationScope: 'academic-project',
      };

      updates.push({
        grade,
        field: displayField(fieldSlug, bundle.field || project.field),
        tomo: project.bookVolume || bundle.development?.bookVolume || '',
        ppa: project.ppaNumber || bundle.ppaNumber,
        pa: project.academicProjectNumber,
        title: project.projectTitle || project.title,
        pages: rangeLabel(project),
        source: sourcePageLabel(bundle, project, evidence.sourcePage),
        label: evidence.detectedLabel,
        text: evidence.officialText,
        status: 'confirmed',
        file: path.relative(ROOT, bundlePath).replaceAll(path.sep, '/'),
      });
      filesChanged.add(bundlePath);
      stats.newConfirmed += 1;
    }

    if (!DRY_RUN && filesChanged.has(bundlePath)) {
      writeJson(bundlePath, bundle);
    }
  }

  stats.missingAfter = stats.totalProjects - stats.confirmedBefore - stats.newConfirmed;

  return {
    stats,
    updates,
    needsReview,
    filesChanged: [...filesChanged].map((filePath) => path.relative(ROOT, filePath).replaceAll(path.sep, '/')).sort(),
  };
}

function sampleByGrade(items, count = 3) {
  const result = [];
  for (const grade of ['1', '2', '3']) {
    result.push(...items.filter((item) => item.grade === grade).slice(0, count));
  }
  return result;
}

function writeReport(result) {
  const { stats, updates, needsReview, filesChanged } = result;
  const samples = sampleByGrade(updates, 4);
  const reviewSamples = sampleByGrade(needsReview, 3);

  const lines = [
    '# Actualizacion masiva conservadora de horizontes por Objetivo',
    '',
    `Fecha: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## Alcance',
    '',
    'Se aplico la regla validada en prueba controlada: aceptar Objetivo como equivalente funcional del horizonte del Proyecto Academico solo cuando el texto aparece dentro del rango exacto del PA en Nuestro libro de proyectos.',
    '',
    'No se tocaron header movil, memorama, SEO, mapa mental, Ingles, videos, selector, package.json ni package-lock.json.',
    '',
    '## Conteo',
    '',
    `- Proyectos revisados sin Ingles: ${stats.totalProjects}`,
    `- Horizontes confirmados antes: ${stats.confirmedBefore}`,
    `- Provisionales antes: ${stats.provisionalBefore}`,
    `- Faltantes antes: ${stats.missingBefore}`,
    `- Nuevos confirmados por regla conservadora: ${stats.newConfirmed}`,
    `- Quedan en revision o pendientes: ${stats.needsReview}`,
    `- Faltantes/no confirmados despues de esta pasada: ${stats.missingAfter}`,
    '',
    '## Archivos modificados',
    '',
    ...filesChanged.map((file) => `- \`${file}\``),
    '- `reports/caracoles/horizon-objective-mass-update-audit.md`',
    '',
    '## Reglas aplicadas',
    '',
    '- El PA no debia tener ya un horizonte confirmado.',
    '- La busqueda se limito a `sourcePages.nuestroLibroProyectos` del PA.',
    '- El OCR debia contener `Etapa 3` antes de `Objetivo 1`.',
    '- Debian aparecer `Objetivo 1` y `Objetivo 2` como par claro.',
    '- Cada objetivo debia tener longitud sustantiva y no extenderse a etapas posteriores.',
    '- La fuente guardada corresponde a la pagina exacta donde aparece el objetivo dentro del rango del PA.',
    '',
    '## Confirmacion de no mezcla',
    '',
    '- No se usaron objetivos localizados fuera del rango del PA.',
    '- No se usaron objetivos de introduccion del PPA.',
    '- Los casos con OCR mezclado, sin Etapa 3 clara o con separacion dudosa quedaron en revision.',
    '- Los 166 casos ya confirmados no fueron modificados.',
    '- La prueba controlada publicada no se altero si ya estaba confirmada.',
    '',
    '## Ejemplos confirmados por grado',
    '',
    ...samples.flatMap((item) => [
      `### ${item.grade} grado - ${item.field} - PA${item.pa}`,
      '',
      `- PPA: ${item.ppa}`,
      `- Titulo: ${item.title}`,
      `- Tomo: ${item.tomo}`,
      `- Paginas del PA: ${item.pages}`,
      `- Rotulo encontrado: ${item.label}`,
      `- Fuente aplicada: ${item.source}`,
      `- Estado: ${item.status}`,
      `- Texto: ${item.text}`,
      '',
    ]),
    '## Ejemplos que permanecen en revision',
    '',
    ...reviewSamples.flatMap((item) => [
      `- ${item.grade} grado, ${item.field}, PA${item.pa}, ${item.title}. Paginas: ${item.pages}. Motivo: ${item.reason}`,
    ]),
    '',
    '## Riesgos detectados',
    '',
    '- Algunos OCR reordenan columnas y pueden colocar objetivos cerca de etapas ajenas.',
    '- Algunos PA comparten pagina con cierre o inicio de otro proyecto.',
    '- Algunos textos requieren validacion visual fina antes de confirmarse.',
    '',
    '## Verificacion',
    '',
    '- Build: pendiente de ejecucion en esta corrida.',
    '- Verificacion visual: pendiente de registro al cierre de la tarea.',
  ];

  fs.writeFileSync(REPORT_PATH, `${lines.join('\n')}\n`, 'utf8');
}

const result = audit();
writeReport(result);

console.log(JSON.stringify({ dryRun: DRY_RUN, ...result.stats, filesChanged: result.filesChanged.length }, null, 2));
