import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BUNDLES_DIR = path.join(ROOT, 'public', 'caracoles', 'data', 'curricular-development');
const PAGES_DIR = path.join(ROOT, 'content', 'caracoles', 'generated-private');
const REPORT_PATH = path.join(ROOT, 'reports', 'caracoles', 'pending-horizons-iterative-validation-audit.md');
const SAMPLE_PER_GRADE = 5;
const BATCH_MODE = process.env.HORIZON_BATCH_MODE === '1';
const BATCH_SIZE = Number(process.env.HORIZON_BATCH_SIZE || 20);
const BATCH_LABEL = process.env.HORIZON_BATCH_LABEL || 'Lote 1';
const BATCH_FIXED = process.env.HORIZON_BATCH_FIXED === '1';
const BATCH_NUMBER = Number(process.env.HORIZON_BATCH_NUMBER || 1);
const BATCH_PENDING_COUNT = Number(process.env.HORIZON_BATCH_PENDING_COUNT || 0);

const FIELD_LABELS = {
  lenguajes: 'Lenguajes',
  'saberes-y-pensamiento-cientifico': 'Saberes y Pensamiento Cientifico',
  'etica-naturaleza-y-sociedades': 'Etica, Naturaleza y Sociedades',
  'de-lo-humano-y-lo-comunitario': 'De lo Humano y lo Comunitario',
};

const MANDATORY_CASES = [
  {
    grade: '1',
    field: 'De lo Humano y lo Comunitario',
    ppaNumber: '1',
    paNumber: 1,
    title: 'Sin metas no hay futuro',
  },
];

const FIXED_SAMPLE_CASES = [
  ['1', 'De lo Humano y lo Comunitario', '1', 1],
  ['1', 'De lo Humano y lo Comunitario', '1', 2],
  ['1', 'De lo Humano y lo Comunitario', '1', 3],
  ['1', 'De lo Humano y lo Comunitario', '2', 4],
  ['1', 'De lo Humano y lo Comunitario', '2', 5],
  ['2', 'De lo Humano y lo Comunitario', '1', 2],
  ['2', 'De lo Humano y lo Comunitario', '2', 5],
  ['2', 'De lo Humano y lo Comunitario', '2', 6],
  ['2', 'De lo Humano y lo Comunitario', '3', 7],
  ['2', 'De lo Humano y lo Comunitario', '5', 14],
  ['3', 'De lo Humano y lo Comunitario', '3', 7],
  ['3', 'De lo Humano y lo Comunitario', '4', 10],
  ['3', 'De lo Humano y lo Comunitario', '4', 11],
  ['3', 'Etica, Naturaleza y Sociedades', '1', 1],
  ['3', 'Etica, Naturaleza y Sociedades', '1', 2],
];

const FIXED_BATCH_1_CASES = [
  ['1', 'De lo Humano y lo Comunitario', '1', 2],
  ['1', 'De lo Humano y lo Comunitario', '1', 3],
  ['1', 'Etica, Naturaleza y Sociedades', '2', 4],
  ['1', 'De lo Humano y lo Comunitario', '2', 5],
  ['1', 'Etica, Naturaleza y Sociedades', '2', 5],
  ['1', 'Etica, Naturaleza y Sociedades', '2', 6],
  ['1', 'Etica, Naturaleza y Sociedades', '3', 7],
  ['1', 'Etica, Naturaleza y Sociedades', '3', 8],
  ['1', 'Etica, Naturaleza y Sociedades', '3', 9],
  ['1', 'Etica, Naturaleza y Sociedades', '4', 11],
  ['1', 'Etica, Naturaleza y Sociedades', '4', 12],
  ['1', 'De lo Humano y lo Comunitario', '3', 7],
  ['1', 'De lo Humano y lo Comunitario', '3', 8],
  ['1', 'De lo Humano y lo Comunitario', '3', 9],
  ['1', 'De lo Humano y lo Comunitario', '4', 10],
  ['1', 'De lo Humano y lo Comunitario', '4', 11],
  ['1', 'De lo Humano y lo Comunitario', '4', 12],
  ['1', 'Etica, Naturaleza y Sociedades', '6', 18],
  ['1', 'Etica, Naturaleza y Sociedades', '7', 19],
  ['1', 'Etica, Naturaleza y Sociedades', '7', 20],
];

const FIXED_BATCH_2_CASES = [
  ['1', 'Etica, Naturaleza y Sociedades', '8', 22],
  ['1', 'Etica, Naturaleza y Sociedades', '8', 23],
  ['1', 'Etica, Naturaleza y Sociedades', '8', 24],
  ['1', 'De lo Humano y lo Comunitario', '5', 13],
  ['1', 'De lo Humano y lo Comunitario', '5', 14],
  ['1', 'De lo Humano y lo Comunitario', '5', 15],
  ['1', 'De lo Humano y lo Comunitario', '6', 16],
  ['1', 'De lo Humano y lo Comunitario', '6', 17],
  ['1', 'Etica, Naturaleza y Sociedades', '9', 25],
  ['1', 'Etica, Naturaleza y Sociedades', '9', 26],
  ['1', 'Etica, Naturaleza y Sociedades', '9', 27],
  ['1', 'Etica, Naturaleza y Sociedades', '10', 29],
  ['1', 'Etica, Naturaleza y Sociedades', '10', 30],
  ['1', 'Etica, Naturaleza y Sociedades', '11', 31],
  ['1', 'Etica, Naturaleza y Sociedades', '12', 34],
  ['1', 'Etica, Naturaleza y Sociedades', '12', 35],
  ['1', 'Etica, Naturaleza y Sociedades', '12', 36],
  ['2', 'Etica, Naturaleza y Sociedades', '1', 1],
  ['2', 'Saberes y Pensamiento Cientifico', '1', 1],
  ['2', 'Etica, Naturaleza y Sociedades', '1', 2],
];

const FIXED_BATCH_3_CASES = [
  ['2', 'Lenguajes', '1', 2],
  ['2', 'Saberes y Pensamiento Cientifico', '1', 2],
  ['2', 'Etica, Naturaleza y Sociedades', '2', 4],
  ['2', 'Etica, Naturaleza y Sociedades', '2', 6],
  ['2', 'Etica, Naturaleza y Sociedades', '3', 8],
  ['2', 'Etica, Naturaleza y Sociedades', '5', 14],
  ['2', 'Etica, Naturaleza y Sociedades', '5', 15],
  ['2', 'Etica, Naturaleza y Sociedades', '6', 16],
  ['2', 'Etica, Naturaleza y Sociedades', '6', 17],
  ['2', 'Etica, Naturaleza y Sociedades', '6', 18],
  ['2', 'Etica, Naturaleza y Sociedades', '7', 19],
  ['2', 'Etica, Naturaleza y Sociedades', '7', 21],
  ['2', 'Saberes y Pensamiento Cientifico', '8', 22],
  ['2', 'Etica, Naturaleza y Sociedades', '8', 23],
  ['2', 'Etica, Naturaleza y Sociedades', '8', 24],
  ['2', 'Saberes y Pensamiento Cientifico', '8', 24],
  ['2', 'Saberes y Pensamiento Cientifico', '9', 26],
  ['2', 'Saberes y Pensamiento Cientifico', '10', 28],
  ['2', 'Saberes y Pensamiento Cientifico', '10', 29],
  ['2', 'De lo Humano y lo Comunitario', '5', 15],
];

const FIXED_BATCH_4_CASES = [
  ['2', 'De lo Humano y lo Comunitario', '6', 18],
  ['2', 'Etica, Naturaleza y Sociedades', '9', 25],
  ['2', 'Etica, Naturaleza y Sociedades', '9', 26],
  ['2', 'Etica, Naturaleza y Sociedades', '9', 27],
  ['2', 'Etica, Naturaleza y Sociedades', '10', 28],
  ['2', 'Etica, Naturaleza y Sociedades', '10', 30],
  ['2', 'Etica, Naturaleza y Sociedades', '11', 31],
  ['2', 'Etica, Naturaleza y Sociedades', '11', 32],
  ['3', 'Saberes y Pensamiento Cientifico', '1', 1],
  ['3', 'Lenguajes', '2', 4],
  ['3', 'Saberes y Pensamiento Cientifico', '2', 4],
  ['3', 'Etica, Naturaleza y Sociedades', '2', 5],
  ['3', 'Saberes y Pensamiento Cientifico', '2', 5],
  ['3', 'Etica, Naturaleza y Sociedades', '2', 6],
  ['3', 'Lenguajes', '2', 6],
  ['3', 'Saberes y Pensamiento Cientifico', '2', 6],
  ['3', 'Saberes y Pensamiento Cientifico', '3', 7],
  ['3', 'Saberes y Pensamiento Cientifico', '3', 8],
  ['3', 'Etica, Naturaleza y Sociedades', '4', 10],
  ['3', 'Saberes y Pensamiento Cientifico', '4', 11],
];

const FIXED_BATCH_5_CASES = [
  ['3', 'Lenguajes', '5', 14],
  ['3', 'Saberes y Pensamiento Cientifico', '5', 14],
  ['3', 'Lenguajes', '6', 18],
  ['3', 'Etica, Naturaleza y Sociedades', '7', 19],
  ['3', 'Lenguajes', '7', 20],
  ['3', 'Etica, Naturaleza y Sociedades', '7', 21],
  ['3', 'Saberes y Pensamiento Cientifico', '7', 21],
  ['3', 'Etica, Naturaleza y Sociedades', '8', 22],
  ['3', 'Etica, Naturaleza y Sociedades', '8', 23],
  ['3', 'Lenguajes', '9', 26],
  ['3', 'Lenguajes', '9', 27],
  ['3', 'Saberes y Pensamiento Cientifico', '10', 28],
  ['3', 'Lenguajes', '10', 29],
  ['3', 'Etica, Naturaleza y Sociedades', '9', 25],
  ['3', 'Etica, Naturaleza y Sociedades', '9', 26],
  ['3', 'Etica, Naturaleza y Sociedades', '11', 32],
  ['3', 'Lenguajes', '11', 32],
  ['3', 'Etica, Naturaleza y Sociedades', '11', 33],
  ['3', 'Lenguajes', '12', 34],
  ['3', 'Etica, Naturaleza y Sociedades', '12', 35],
  ['3', 'Lenguajes', '12', 36],
  ['3', 'Lenguajes', '14', 42],
  ['3', 'Lenguajes', '15', 45],
  ['3', 'Saberes y Pensamiento Cientifico', '15', 45],
];

const INITIAL_PENDING_COUNT = 116;
const TOMO_ORDER = {
  'Tomo I': 1,
  'Tomo II': 2,
  'Tomo III': 3,
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

function sentenceCase(value = '') {
  const text = cleanText(value);
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
}

function fieldSlugFromFile(fileName) {
  return fileName.match(/^grade-\d+-(.+)-ppa-\d+\.json$/)?.[1] || '';
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

function isPendingHorizon(project) {
  const expectation = project.projectExpectationHorizon || {};
  const direct = project.horizonOrPurpose || {};
  if (hasConfirmedHorizon(project)) return false;
  return (
    normalize(expectation.status).includes('pending') ||
    normalize(direct.status).includes('pending') ||
    (!cleanText(expectation.officialText) && !cleanText(direct.text))
  );
}

function pageLabel(entry) {
  if (entry?.pagesLabel) return entry.pagesLabel;
  if (entry?.startPage && entry?.endPage && entry.startPage !== entry.endPage) return `pp. ${entry.startPage}-${entry.endPage}`;
  if (entry?.startPage) return `p. ${entry.startPage}`;
  return '';
}

function rangeLabel(project) {
  const source = project.sourcePages?.nuestroLibroProyectos?.[0];
  const label = source?.label || `Nuestro libro de proyectos ${project.bookVolume || ''}`.trim();
  return `${label} ${pageLabel(source)}`.trim();
}

function sourcePageLabel(bundle, project, pageNumbers) {
  const source = project.sourcePages?.nuestroLibroProyectos?.[0];
  const label = source?.label || `Nuestro libro de proyectos ${project.bookVolume || bundle.development?.bookVolume || ''}`.trim();
  const pages = [...new Set(pageNumbers)].sort((a, b) => a - b);
  const pageText = pages.length > 1 ? `pp. ${pages.join(', ')}` : `p. ${pages[0]}`;
  return `${label} ${pageText}`;
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

function stripNoise(value = '') {
  return cleanText(value)
    .replace(/\s+(El di[aá]logo es|Comenten los factores|Etapa\s+\d+|Paso a paso|Distintas fuentes de consulta|Unimos las piezas|Ya lo tenemos)\b.*$/i, '')
    .trim();
}

function hasVisualOcrMix(value = '') {
  const text = normalize(value);
  return [
    'cartografia',
    'escala grafica',
    'escala numerica',
    'proyeccion conica',
    'golfo de mexico',
    'mar caribe',
    'tropico de cancer',
    'meridiano',
    'paralelo',
  ].some((pattern) => text.includes(pattern));
}

function titleMatches(project, pages) {
  const joined = normalize(pages.map((page) => page.text).join(' '));
  const title = normalize(project.projectTitle || project.title);
  const paNumber = String(project.academicProjectNumber || '').trim();
  return Boolean(title && joined.includes(title)) || Boolean(paNumber && joined.includes(`proyecto academico ${paNumber}`));
}

function splitSentences(block) {
  return cleanText(block)
    .split(/(?<=\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡])/)
    .map((item) => sentenceCase(stripNoise(item)))
    .filter((item) => item.length >= 25);
}

function extractObjectivePairFromPage(page) {
  const lines = page.text.split(/\r?\n/).map((line) => cleanText(line));
  const label1 = lines.findIndex((line) => /^objetivo\s*1\b/i.test(line));
  const label2 = lines.findIndex((line) => /^objetivo\s*2\b/i.test(line));
  if (label1 < 0 || label2 < 0 || label2 < label1 || label2 - label1 > 8) return null;

  const start = label2 + 1;
  const end = lines.findIndex(
    (line, index) =>
      index > start &&
      /^(objetivo\s*3\b|etapa\s+\d+\.?|paso\s+a\s+paso|distintas\s+fuentes|unimos\s+las\s+piezas|ya\s+lo\s+tenemos|el\s+di[aá]logo\s+es|seguramente\b|recuerden\b|en comunidad, analicen\b|identificar el problema\b|conocer los horizontes\b|para dar respuesta\b|serie(?: de actividades)?\s*\d+|ficha\s+\d+|w$|bit\.ly)\b/i.test(line),
  );
  if (end < 0 || end - start < 3) return null;

  const block = lines
    .slice(start, end)
    .filter((line) => line && !/^\d+$/.test(line) && !/^w$/i.test(line))
    .join(' ');
  if (hasVisualOcrMix(block)) return null;

  const sentences = splitSentences(block);
  if (sentences.length < 2) return null;

  const secondSentenceBelongsToFirst = sentences.length >= 3 && /^Además\b/i.test(sentences[1]);
  return {
    labels: ['Objetivo 1', 'Objetivo 2'],
    texts: secondSentenceBelongsToFirst
      ? [sentences.slice(0, 2).join(' '), sentences.slice(2).join(' ')]
      : [sentences[0], sentences.slice(1).join(' ')],
    pageNumbers: [page.pageNumber],
  };
}

function extractSingleObjectiveFromPage(page) {
  const lines = page.text.split(/\r?\n/).map((line) => cleanText(line));
  const label = lines.findIndex((line) => /^objetivo( del proyecto)?\.?:?$/i.test(line));
  if (label < 0) return null;

  const end = lines.findIndex(
    (line, index) =>
      index > label &&
      /^(objetivo\s*2\b|etapa\s+\d+\.?|paso\s+a\s+paso|distintas\s+fuentes|unimos\s+las\s+piezas|ya\s+lo\s+tenemos|situaci[oó]n\s+\d+)\b/i.test(line),
  );
  const block = lines
    .slice(label + 1, end > label ? end : label + 8)
    .filter((line) => line && !/^\d+$/.test(line) && !/^w$/i.test(line))
    .join(' ');
  const text = sentenceCase(stripNoise(block));
  if (hasVisualOcrMix(text)) return null;
  if (text.length < 45 || text.length > 900) return null;

  return {
    labels: [lines[label].replace(/\.$/, '') || 'Objetivo'],
    texts: [text],
    pageNumbers: [page.pageNumber],
  };
}

function extractHorizonLabelFromPage(page) {
  const lines = page.text.split(/\r?\n/).map((line) => cleanText(line));
  const label = lines.findIndex((line) => /^Horizonte de expectativa(s)?\.?:?$/.test(line));
  if (label < 0) return null;

  const nearby = normalize(lines.slice(Math.max(0, label - 12), Math.min(lines.length, label + 16)).join(' '));
  if (
    nearby.includes('valoracion del proyecto academico') ||
    nearby.includes('pautas generadoras') ||
    nearby.includes('identificar lo que necesiten mejorar') ||
    nearby.includes('nivel de compromiso')
  ) {
    return null;
  }

  const end = lines.findIndex(
    (line, index) =>
      index > label &&
      /^(objetivo|etapa\s+\d+\.?|paso\s+a\s+paso|distintas\s+fuentes|unimos\s+las\s+piezas|ya\s+lo\s+tenemos)\b/i.test(line),
  );
  const block = lines
    .slice(label + 1, end > label ? end : label + 8)
    .filter((line) => line && !/^\d+$/.test(line) && !/^w$/i.test(line))
    .join(' ');
  const text = sentenceCase(stripNoise(block));
  if (hasVisualOcrMix(text)) return null;
  if (text.length < 45 || text.length > 900) return null;

  return {
    labels: [lines[label].replace(/\.$/, '') || 'Horizonte de expectativas'],
    texts: [text],
    pageNumbers: [page.pageNumber],
  };
}

function classifyEvidence(project, pages) {
  if (!pages.length) {
    return { status: 'notFound', reason: 'No hay paginas OCR para el rango exacto del PA.' };
  }

  if (!titleMatches(project, pages)) {
    return {
      status: 'needsReview_ocr',
      reason: 'El rango existe, pero el OCR no confirma con claridad el titulo o numero del PA.',
    };
  }

  for (const page of pages) {
    const horizon = extractHorizonLabelFromPage(page);
    if (horizon) {
      return {
        status: 'confirmed_from_horizon_label',
        reason: 'Rotulo Horizonte de expectativas dentro del rango exacto del PA.',
        ...horizon,
      };
    }
  }

  for (const page of pages) {
    const pair = extractObjectivePairFromPage(page);
    if (pair) {
      return {
        status: 'confirmed_from_objective',
        reason: 'Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.',
        ...pair,
      };
    }
  }

  for (const page of pages) {
    const single = extractSingleObjectiveFromPage(page);
    if (single) {
      return {
        status: 'confirmed_from_objective',
        reason: 'Rotulo Objetivo localizado dentro del rango exacto del PA.',
        ...single,
      };
    }
  }

  const ppaObjective = pages.some((page) => normalize(page.text).includes('proyecto parcial de aula') && normalize(page.text).includes('objetivo'));
  if (ppaObjective) {
    return {
      status: 'ppa_level_objective',
      reason: 'Se detecto Objetivo asociado al PPA o a una seccion general, no al PA exacto.',
    };
  }

  const objectiveMention = pages.some((page) => /\bObjetivo\b/i.test(page.text));
  if (objectiveMention) {
    const hasVisualMix = pages.some((page) => hasVisualOcrMix(page.text));
    return {
      status: hasVisualMix ? 'needsReview_visual_mix' : 'needsReview_ocr',
      reason: hasVisualMix
        ? 'Hay menciones de Objetivo, pero el OCR mezcla texto curricular con cartografia u otros elementos visuales.'
        : 'Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.',
    };
  }

  return {
    status: 'notFound',
    reason: 'No se encontraron rotulos de horizonte u objetivo dentro del rango exacto del PA.',
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

function caseKey(item) {
  return [item.grade, item.field, item.ppaNumber, item.paNumber].map(normalize).join('|');
}

function sortPendingCases(left, right) {
  const leftTomo = left.project.bookVolume || left.bundle.development?.bookVolume || '';
  const rightTomo = right.project.bookVolume || right.bundle.development?.bookVolume || '';
  return (
    Number(left.grade) - Number(right.grade) ||
    (TOMO_ORDER[leftTomo] || 99) - (TOMO_ORDER[rightTomo] || 99) ||
    Number(left.ppaNumber) - Number(right.ppaNumber) ||
    Number(left.paNumber) - Number(right.paNumber) ||
    left.field.localeCompare(right.field)
  );
}

function collectProjectCases() {
  const cases = [];
  for (const bundlePath of collectBundles()) {
    const fileName = path.basename(bundlePath);
    const bundle = readJson(bundlePath);
    const fieldSlug = fieldSlugFromFile(fileName);
    const field = displayField(fieldSlug, bundle.field || bundle.development?.field);
    const projects = bundle.development?.academicProjects || [];

    for (const project of projects) {
      const source = project.sourcePages?.nuestroLibroProyectos?.[0];
      cases.push({
        grade: String(bundle.grade || project.grade || bundle.development?.grade || ''),
        field,
        ppaNumber: String(project.ppaNumber || bundle.ppaNumber || ''),
        paNumber: Number(project.academicProjectNumber || 0),
        title: project.projectTitle || project.title || '',
        pages: rangeLabel(project),
        hasExactSource: Boolean(source?.materialId && source?.startPage && source?.endPage),
        bundlePath,
        bundle,
        project,
        wasPending: isPendingHorizon(project),
      });
    }
  }
  return cases;
}

function selectSample(projectCases) {
  if (BATCH_MODE) {
    if (BATCH_FIXED) {
      const fixedBatchCases =
        BATCH_NUMBER === 5
          ? FIXED_BATCH_5_CASES
          : BATCH_NUMBER === 4
            ? FIXED_BATCH_4_CASES
          : BATCH_NUMBER === 3
            ? FIXED_BATCH_3_CASES
          : BATCH_NUMBER === 2
            ? FIXED_BATCH_2_CASES
            : FIXED_BATCH_1_CASES;
      return fixedBatchCases.map(([grade, field, ppaNumber, paNumber]) =>
        projectCases.find(
          (item) =>
            item.grade === grade &&
            normalize(item.field) === normalize(field) &&
            item.ppaNumber === ppaNumber &&
            item.paNumber === paNumber,
        ),
      ).filter(Boolean);
    }
    const reviewedKeys = new Set(
      BATCH_NUMBER >= 2
        ? [
            ...FIXED_SAMPLE_CASES,
            ...FIXED_BATCH_1_CASES,
            ...(BATCH_NUMBER >= 3 ? FIXED_BATCH_2_CASES : []),
            ...(BATCH_NUMBER >= 4 ? FIXED_BATCH_3_CASES : []),
            ...(BATCH_NUMBER >= 5 ? FIXED_BATCH_4_CASES : []),
          ].map(([grade, field, ppaNumber, paNumber]) =>
            [grade, field, ppaNumber, paNumber].map(normalize).join('|'),
          )
        : [],
    );
    return projectCases
      .filter((item) => item.wasPending && !reviewedKeys.has(caseKey(item)))
      .sort(sortPendingCases)
      .slice(0, BATCH_SIZE);
  }

  const fixed = FIXED_SAMPLE_CASES.map(([grade, field, ppaNumber, paNumber]) =>
    projectCases.find(
      (item) =>
        item.grade === grade &&
        normalize(item.field) === normalize(field) &&
        item.ppaNumber === ppaNumber &&
        item.paNumber === paNumber,
    ),
  ).filter(Boolean);

  if (fixed.length === FIXED_SAMPLE_CASES.length) return fixed;

  const selected = [];
  const selectedKeys = new Set();

  for (const mandatory of MANDATORY_CASES) {
    const found = projectCases.find(
      (item) =>
        item.grade === mandatory.grade &&
        normalize(item.field) === normalize(mandatory.field) &&
        item.ppaNumber === mandatory.ppaNumber &&
        item.paNumber === mandatory.paNumber,
    );
    if (found) {
      selected.push(found);
      selectedKeys.add(caseKey(found));
    }
  }

  for (const grade of ['1', '2', '3']) {
    const existing = selected.filter((item) => item.grade === grade).length;
    const needed = SAMPLE_PER_GRADE - existing;
    const candidates = projectCases
      .filter((item) => item.wasPending && item.grade === grade && !selectedKeys.has(caseKey(item)))
      .sort((a, b) => Number(b.hasExactSource) - Number(a.hasExactSource) || a.bundlePath.localeCompare(b.bundlePath) || a.paNumber - b.paNumber)
      .slice(0, needed);
    for (const candidate of candidates) {
      selected.push(candidate);
      selectedKeys.add(caseKey(candidate));
    }
  }

  return selected.sort((a, b) => Number(a.grade) - Number(b.grade) || a.field.localeCompare(b.field) || Number(a.ppaNumber) - Number(b.ppaNumber) || a.paNumber - b.paNumber);
}

function applyConfirmation(item, evidence) {
  const text =
    evidence.labels.length === 2
      ? `${evidence.labels[0]}: ${evidence.texts[0]} ${evidence.labels[1]}: ${evidence.texts[1]}`
      : `${evidence.labels[0]}: ${evidence.texts[0]}`;
  item.project.projectExpectationHorizon = {
    ...(item.project.projectExpectationHorizon || {}),
    officialText: text,
    studentVersion: evidence.texts.join(' '),
    sourcePages: [sourcePageLabel(item.bundle, item.project, evidence.pageNumbers)],
    evidence: `${evidence.reason} Se conserva el rotulo encontrado como evidencia.`,
    status: 'confirmed-from-project-book',
    detectedLabel: evidence.labels.join(' + '),
    validationScope: 'academic-project',
  };
  return text;
}

function writeReport({ pendingCount, selected, results, filesChanged, globalSummary }) {
  const confirmed = results.filter((item) => item.status.startsWith('confirmed'));
  const review = results.filter((item) => item.status.startsWith('needsReview') || item.status === 'ppa_level_objective');
  const notFound = results.filter((item) => item.status === 'notFound');
  const objectivePairs = results.filter((item) => item.labels?.includes('Objetivo 1') && item.labels?.includes('Objetivo 2'));

  const lines = [
    '# Auditoria iterativa de horizontes pendientes',
    '',
    `Fecha: ${new Date().toISOString().slice(0, 10)}`,
    '',
    '## Alcance',
    '',
    'Muestra controlada sobre proyectos que aun aparecian como Horizonte pendiente de validacion en fuente. No se ejecuto un bucle infinito: se recorrio una lista finita de 15 casos, cinco por grado.',
    '',
    'No se tocaron header movil, memorama, SEO, mapa mental, Ingles, videos, selector, package.json ni package-lock.json.',
    '',
    '## Conteo de muestra',
    '',
    `- Pendientes disponibles antes de seleccionar muestra: ${pendingCount}`,
    `- Pendientes revisados en la muestra: ${selected.length}`,
    `- Confirmados: ${confirmed.length}`,
    `- En revision: ${review.length}`,
    `- No encontrados: ${notFound.length}`,
    '',
    '## Reglas usadas',
    '',
    '- Solo se leyo el rango exacto de `sourcePages.nuestroLibroProyectos` del PA.',
    '- Se exigio coincidencia del titulo o numero de Proyecto Academico dentro del rango OCR.',
    '- Se aceptaron `Horizonte de expectativas`, `Horizonte de expectativa`, `Objetivo`, `Objetivo 1` y `Objetivo 2` solo dentro del PA.',
    '- Cuando aparecieron `Objetivo 1` y `Objetivo 2` como par, ambos textos se unieron y se conservaron los rotulos.',
    '- Los casos con OCR mezclado, objetivo de PPA o sin separacion clara quedaron sin confirmar.',
    '',
    '## Archivos modificados',
    '',
    ...(filesChanged.length ? filesChanged.map((file) => `- \`${file}\``) : ['- Ningun bundle fue modificado.']),
    '- `reports/caracoles/pending-horizons-iterative-validation-audit.md`',
    '',
    '## Casos revisados',
    '',
    ...results.flatMap((item, index) => [
      `### ${index + 1}. ${item.grade}o / ${item.field} / PPA ${item.ppaNumber} / PA${item.paNumber}`,
      '',
      `- Titulo: ${item.title}`,
      `- Paginas revisadas: ${item.pages}`,
      `- Estado: ${item.status}`,
      `- Rotulo encontrado: ${item.labels?.join(' + ') || 'No confirmado'}`,
      `- Texto extraido: ${item.text || 'No confirmado'}`,
      `- Razon: ${item.reason}`,
      `- Archivo bundle: \`${item.file}\``,
      '',
    ]),
    '## Objetivo 1 + Objetivo 2 unidos',
    '',
    ...(objectivePairs.length
      ? objectivePairs.map((item) => `- ${item.grade}o ${item.field} PA${item.paNumber}: ${item.title}`)
      : ['- No hubo pares Objetivo 1 + Objetivo 2 confirmados en esta muestra.']),
    '',
    '## Casos rechazados por PPA completo',
    '',
    ...(results.filter((item) => item.status === 'ppa_level_objective').length
      ? results.filter((item) => item.status === 'ppa_level_objective').map((item) => `- ${item.grade}o ${item.field} PA${item.paNumber}: ${item.title}`)
      : ['- No se detectaron objetivos de PPA completo en esta muestra.']),
    '',
    '## Recomendacion',
    '',
    'Ampliar al resto de pendientes por lotes pequenos, conservando evidencia por caso. Los confirmados por Objetivo 1 + Objetivo 2 son aptos para publicacion; los casos `needsReview_*` requieren inspeccion visual de pagina antes de modificar bundles.',
    '',
  ];

  if (!BATCH_MODE) {
    fs.writeFileSync(REPORT_PATH, lines.join('\n'), 'utf8');
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const batchLines = [
    '',
    `## ${BATCH_LABEL} - ${today}`,
    '',
    '### Alcance del lote',
    '',
    `Se procesaron los primeros ${selected.length} PA pendientes actuales, ordenados por grado, tomo, PPA y PA. Se mantuvieron las mismas reglas de la muestra inicial.`,
    '',
    '### Conteo del lote',
    '',
    `- Pendientes disponibles al iniciar este lote: ${pendingCount}`,
    `- Pendientes revisados en este lote: ${selected.length}`,
    `- Confirmados: ${confirmed.length}`,
    `- En revision: ${review.length}`,
    `- No encontrados: ${notFound.length}`,
    '',
    '### Archivos modificados en este lote',
    '',
    ...(filesChanged.length ? filesChanged.map((file) => `- \`${file}\``) : ['- Ningun bundle fue modificado.']),
    '',
    '### Casos revisados en este lote',
    '',
    ...results.flatMap((item, index) => [
      `#### ${index + 1}. ${item.grade}o / ${item.field} / PPA ${item.ppaNumber} / PA${item.paNumber}`,
      '',
      `- Titulo: ${item.title}`,
      `- Paginas revisadas: ${item.pages}`,
      `- Estado: ${item.status}`,
      `- Rotulo encontrado: ${item.labels?.join(' + ') || 'No confirmado'}`,
      `- Texto extraido: ${item.text || 'No confirmado'}`,
      `- Razon: ${item.reason}`,
      `- Archivo bundle: \`${item.file}\``,
      '',
    ]),
    '### Confirmados del lote',
    '',
    ...(confirmed.length
      ? confirmed.map((item) => `- ${item.grade}o ${item.field} PA${item.paNumber}: ${item.title}. Texto: ${item.text}`)
      : ['- No hubo confirmaciones en este lote.']),
    '',
    '### Casos en revision del lote',
    '',
    ...(review.length
      ? review.map((item) => `- ${item.grade}o ${item.field} PA${item.paNumber}: ${item.title} (${item.status}).`)
      : ['- No hubo casos en revision en este lote.']),
    '',
    ...(BATCH_NUMBER === 5 && globalSummary
      ? [
          '## Resumen global de toda la auditoria',
          '',
          `- Proyectos Academicos no ingleses en la base: ${globalSummary.total}`,
          `- Horizontes confirmados: ${globalSummary.confirmed}`,
          `- Horizontes que siguen en needsReview o pendientes: ${globalSummary.needsReview}`,
          `- Orientaciones pedagogicas provisionales: ${globalSummary.provisional}`,
          `- Casos revisados en muestra y lotes: ${globalSummary.reviewed}`,
          '',
          'Los casos pendientes no fueron rellenados ni convertidos en confirmados sin evidencia suficiente. La orientacion provisional se mantiene separada de los horizontes confirmados.',
          '',
        ]
      : []),
  ];

  const sectionHeading = `## ${BATCH_LABEL} - ${today}`;
  const existing = fs.existsSync(REPORT_PATH) ? fs.readFileSync(REPORT_PATH, 'utf8') : '';
  const sectionStart = existing.indexOf(`\n${sectionHeading}`);
  const base = sectionStart >= 0 ? existing.slice(0, sectionStart).trimEnd() : existing.trimEnd();
  fs.writeFileSync(REPORT_PATH, `${base}\n${batchLines.join('\n')}`, 'utf8');
}

function main() {
  const pageIndexes = pagesByGrade();
  const projectCases = collectProjectCases();
  const selected = selectSample(projectCases);
  const results = [];
  const filesChanged = new Set();

  for (const item of selected) {
    const pages = getProjectPages(item.project, pageIndexes.get(item.grade));
    const evidence = classifyEvidence(item.project, pages);
    let text = '';
    if (evidence.status.startsWith('confirmed')) {
      text = applyConfirmation(item, evidence);
      filesChanged.add(item.bundlePath);
    }

    results.push({
      grade: item.grade,
      field: item.field,
      ppaNumber: item.ppaNumber,
      paNumber: item.paNumber,
      title: item.title,
      pages: item.pages,
      status: evidence.status,
      labels: evidence.labels || [],
      text,
      reason: evidence.reason,
      file: path.relative(ROOT, item.bundlePath).replaceAll(path.sep, '/'),
    });
  }

  for (const bundlePath of filesChanged) {
    const item = selected.find((candidate) => candidate.bundlePath === bundlePath);
    writeJson(bundlePath, item.bundle);
  }

  const globalSummary = projectCases.reduce(
    (summary, item) => {
      const expectation = item.project.projectExpectationHorizon || {};
      const direct = item.project.horizonOrPurpose || {};
      const text = cleanText(expectation.officialText || expectation.studentVersion || direct.text);
      const status = expectation.status || direct.status || '';
      summary.total += 1;
      if (text && isConfirmedStatus(status)) summary.confirmed += 1;
      else if (text) summary.provisional += 1;
      else summary.needsReview += 1;
      return summary;
    },
    {
      total: 0,
      confirmed: 0,
      needsReview: 0,
      provisional: 0,
      reviewed: new Set(
        [...FIXED_SAMPLE_CASES, ...FIXED_BATCH_1_CASES, ...FIXED_BATCH_2_CASES, ...FIXED_BATCH_3_CASES, ...FIXED_BATCH_4_CASES, ...FIXED_BATCH_5_CASES].map(
          ([grade, field, ppaNumber, paNumber]) => [grade, field, ppaNumber, paNumber].map(normalize).join('|'),
        ),
      ).size,
    },
  );

  writeReport({
    pendingCount: BATCH_MODE
      ? BATCH_PENDING_COUNT || projectCases.filter((item) => item.wasPending).length
      : INITIAL_PENDING_COUNT,
    selected,
    results,
    filesChanged: [...filesChanged].map((filePath) => path.relative(ROOT, filePath).replaceAll(path.sep, '/')).sort(),
    globalSummary,
  });

  console.log(
    JSON.stringify(
      {
        pendingCount: BATCH_MODE
          ? BATCH_PENDING_COUNT || projectCases.filter((item) => item.wasPending).length
          : INITIAL_PENDING_COUNT,
        reviewed: results.length,
        confirmed: results.filter((item) => item.status.startsWith('confirmed')).length,
        review: results.filter((item) => item.status.startsWith('needsReview') || item.status === 'ppa_level_objective').length,
        notFound: results.filter((item) => item.status === 'notFound').length,
        filesChanged: [...filesChanged].map((filePath) => path.relative(ROOT, filePath).replaceAll(path.sep, '/')).sort(),
        results,
      },
      null,
      2,
    ),
  );
}

main();
