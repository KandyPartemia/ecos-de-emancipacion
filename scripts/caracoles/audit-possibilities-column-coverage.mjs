import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const extractedPath = path.join(root, 'tmp', 'caracoles-possibilities-columns.json');
const bundleDirectory = path.join(root, 'public', 'caracoles', 'data', 'curricular-development');

const extracted = JSON.parse(fs.readFileSync(extractedPath, 'utf8')).records;
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

const results = [];
const statusCounts = {};

for (const file of fs.readdirSync(bundleDirectory).filter((name) => name.endsWith('.json'))) {
  const bundle = JSON.parse(fs.readFileSync(path.join(bundleDirectory, file), 'utf8'));
  for (const project of bundle.development?.academicProjects || []) {
    const pa = Number(project.academicProjectNumber || 0);
    const record = extractedByKey.get(keyFor(bundle.grade, bundle.field, pa));
    if (!record) continue;

    const currentConcepts = project.sourcePages?.conceptBook || [];
    const currentMultiples = project.sourcePages?.multiplesLenguajes || [];
    const currentPossibilities = project.sourceValidation?.possibilitiesPages || [];
    const videoStatus = project.academicProjectStrategy?.urlStatus || '(empty)';
    statusCounts[videoStatus] = (statusCounts[videoStatus] || 0) + 1;

    const missingConcepts = record.conceptBook.filter(
      (candidate) =>
        !currentConcepts.some(
          (entry) =>
            Number(entry.startPage) === Number(candidate.startPage) &&
            Number(entry.endPage || entry.startPage) >= Number(candidate.endPage),
        ),
    );
    const missingMultiples = record.multiplesLenguajes.filter(
      (candidate) =>
        !currentMultiples.some(
          (entry) =>
            Number(entry.startPage) === Number(candidate.startPage) &&
            Number(entry.endPage || entry.startPage) >= Number(candidate.endPage),
        ),
    );

    results.push({
      file,
      grade: String(bundle.grade),
      field: bundle.field,
      pa,
      title: project.title,
      column: record.column,
      expectedPossibilitiesPages: record.possibilitiesPages,
      currentPossibilitiesPages: currentPossibilities,
      possibilitiesMismatch:
        JSON.stringify(record.possibilitiesPages) !== JSON.stringify(currentPossibilities),
      missingConcepts,
      missingMultiples,
      videoStatus,
      videoUrl: project.academicProjectStrategy?.url || '',
    });
  }
}

const summary = {
  projectsCompared: results.length,
  onePageProjects: results.filter((item) => item.expectedPossibilitiesPages.length === 1).length,
  twoPageProjects: results.filter((item) => item.expectedPossibilitiesPages.length === 2).length,
  possibilitiesPageMismatches: results.filter((item) => item.possibilitiesMismatch).length,
  projectsWithMissingConceptRefs: results.filter((item) => item.missingConcepts.length).length,
  missingConceptRefs: results.reduce((sum, item) => sum + item.missingConcepts.length, 0),
  projectsWithMissingMultiplesRefs: results.filter((item) => item.missingMultiples.length).length,
  missingMultiplesRefs: results.reduce((sum, item) => sum + item.missingMultiples.length, 0),
  videoStatusCounts: statusCounts,
  hiddenRevalidatedVideos: results.filter(
    (item) => item.videoStatus === 'revalidated-specific' && item.videoUrl,
  ).length,
};

const output = { summary, projects: results };
const outputPath = path.join(root, 'tmp', 'caracoles-possibilities-column-coverage.json');
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(summary, null, 2));
