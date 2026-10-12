import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const shouldApply = process.argv.includes('--apply');
const extractedPath = path.join(root, 'tmp', 'caracoles-possibilities-columns.json');
const bundleDirectory = path.join(root, 'public', 'caracoles', 'data', 'curricular-development');
const readJson = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
const manifest = readJson(path.join(root, 'src', 'caracoles', 'data', 'materials-manifest.json'));
const extracted = readJson(extractedPath).records;

const normalize = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
const keyFor = (grade, field, pa) => `${grade}|${normalize(field)}|${Number(pa)}`;
const extractedByKey = new Map(
  extracted.map((record) => [keyFor(record.grade, record.field, record.academicProjectNumber), record]),
);

const conceptMaterialByGradeField = new Map(
  manifest
    .filter((item) => item.type === 'conceptos')
    .map((item) => [`${item.grade}|${normalize(item.field)}`, item.id]),
);
const multiplesMaterialByGrade = new Map(
  manifest
    .filter((item) => item.type === 'apoyo' && normalize(item.field).includes('multiples lenguajes'))
    .map((item) => [String(item.grade), item.id]),
);

const summary = {
  mode: shouldApply ? 'apply' : 'dry-run',
  projectsMatched: 0,
  filesChanged: 0,
  possibilitiesPagesCorrected: 0,
  conceptReferencesAdded: 0,
  conceptRangesExpanded: 0,
  multiplesReferencesAdded: 0,
  multiplesRangesExpanded: 0,
  skippedUnsafeTitles: 0,
};
const changedProjects = [];

for (const file of fs.readdirSync(bundleDirectory).filter((name) => name.endsWith('.json'))) {
  const filePath = path.join(bundleDirectory, file);
  const bundle = readJson(filePath);
  let fileChanged = false;

  for (const project of bundle.development?.academicProjects || []) {
    const pa = Number(project.academicProjectNumber || 0);
    const record = extractedByKey.get(keyFor(bundle.grade, bundle.field, pa));
    if (!record) continue;
    summary.projectsMatched += 1;
    const changes = [];

    project.sourceValidation ||= {};
    if (
      JSON.stringify(project.sourceValidation.possibilitiesPages || []) !==
      JSON.stringify(record.possibilitiesPages)
    ) {
      project.sourceValidation.possibilitiesPages = record.possibilitiesPages;
      summary.possibilitiesPagesCorrected += 1;
      changes.push(`dosificación ${record.possibilitiesPages.join('-')}`);
    }
    if (project.sourceValidation.possibilitiesColumnIndex !== record.column) {
      project.sourceValidation.possibilitiesColumnIndex = record.column;
      changes.push(`columna ${record.column}`);
    }
    project.sourceValidation.columnEvidence =
      `Columna ${record.column} confirmada por geometría del PDF de Posibilidades de uso; ` +
      `${record.possibilitiesPages.length === 2 ? 'continuidad 1 de 2 / 2 de 2' : 'ficha 1 de 1'} ` +
      `en ${formatPages(record.possibilitiesPages)}.`;

    project.sourcePages ||= {};
    project.sourcePages.conceptBook ||= [];
    project.sourcePages.multiplesLenguajes ||= [];

    const conceptMaterialId = conceptMaterialByGradeField.get(
      `${bundle.grade}|${normalize(bundle.field)}`,
    );
    const conceptResult = mergeReferences(
      project.sourcePages.conceptBook,
      record.conceptBook,
      {
        materialId: conceptMaterialId,
        label: bundle.field,
        status: 'confirmed-by-column-layout',
      },
    );
    summary.conceptReferencesAdded += conceptResult.added;
    summary.conceptRangesExpanded += conceptResult.expanded;
    summary.skippedUnsafeTitles += conceptResult.skipped;
    if (conceptResult.added || conceptResult.expanded) {
      changes.push(`libro de campo +${conceptResult.added}/${conceptResult.expanded} ampliadas`);
    }

    const multiplesResult = mergeReferences(
      project.sourcePages.multiplesLenguajes,
      record.multiplesLenguajes,
      {
        materialId: multiplesMaterialByGrade.get(String(bundle.grade)),
        label: 'Múltiples Lenguajes',
        status: 'confirmed-by-column-layout',
      },
    );
    summary.multiplesReferencesAdded += multiplesResult.added;
    summary.multiplesRangesExpanded += multiplesResult.expanded;
    summary.skippedUnsafeTitles += multiplesResult.skipped;
    if (multiplesResult.added || multiplesResult.expanded) {
      changes.push(`Múltiples +${multiplesResult.added}/${multiplesResult.expanded} ampliadas`);
    }

    if (changes.length) {
      fileChanged = true;
      changedProjects.push({
        grade: String(bundle.grade),
        field: bundle.field,
        pa,
        title: project.title,
        changes,
      });
    }
  }

  if (fileChanged) {
    summary.filesChanged += 1;
    if (shouldApply) fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
  }
}

const result = { summary, changedProjects };
fs.writeFileSync(
  path.join(root, 'tmp', 'caracoles-possibilities-column-update-preview.json'),
  `${JSON.stringify(result, null, 2)}\n`,
  'utf8',
);
console.log(JSON.stringify(summary, null, 2));

function formatPages(pages) {
  return pages.length === 1 ? `p. ${pages[0]}` : `pp. ${pages[0]}-${pages.at(-1)}`;
}

function cleanTitle(value) {
  return String(value || '')
    .replace(/([\p{L}])[-–]\s+(?=[\p{L}])/gu, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function isSafeTitle(value) {
  const normalized = normalize(value);
  return (
    normalized.length >= 4 &&
    !/[�|]/.test(value) &&
    !/^(?:y|e|o|u|de|del|para|por|con|en)\b/i.test(value) &&
    !/\b(?:primer|segundo|tercer) grado\b/i.test(value) &&
    !/\bnuestro libro de proyectos\b/i.test(value) &&
    !/\btomo\s+(?:i|ii|iii)\b/i.test(value) &&
    !normalized.includes('proyecto academico') &&
    !normalized.includes('video ppa') &&
    !normalized.includes('nuestro libro de proyectos') &&
    !/\bsu(?:relacion|relación)\b/i.test(value)
  );
}

function mergeReferences(target, candidates, defaults) {
  let added = 0;
  let expanded = 0;
  let skipped = 0;

  for (const candidate of candidates) {
    const startPage = Number(candidate.startPage || 0);
    const endPage = Number(candidate.endPage || startPage);
    if (!startPage || !endPage) continue;

    const exactStart = target.find((entry) => Number(entry.startPage) === startPage);
    if (exactStart) {
      const currentEnd = Number(exactStart.endPage || exactStart.startPage || 0);
      if (endPage > currentEnd) {
        exactStart.endPage = endPage;
        exactStart.pagesLabel = pageLabel(startPage, endPage);
        exactStart.status = defaults.status;
        expanded += 1;
      }
      continue;
    }

    const title = cleanTitle(candidate.title);
    if (!isSafeTitle(title) || !defaults.materialId) {
      skipped += 1;
      continue;
    }
    target.push({
      materialId: defaults.materialId,
      label: defaults.label,
      startPage,
      endPage,
      pagesLabel: pageLabel(startPage, endPage),
      topicTitle: title,
      status: defaults.status,
    });
    added += 1;
  }

  target.sort((left, right) => Number(left.startPage) - Number(right.startPage));
  return { added, expanded, skipped };
}

function pageLabel(startPage, endPage) {
  return startPage === endPage ? `p. ${startPage}` : `pp. ${startPage}-${endPage}`;
}
