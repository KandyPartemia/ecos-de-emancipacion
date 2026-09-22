import fs from 'node:fs';
import path from 'node:path';

const bundleDirectory = path.resolve('public/caracoles/data/curricular-development');
const files = fs.readdirSync(bundleDirectory).filter((file) => file.endsWith('.json'));
const projects = [];
const encodingMatches = [];

function inspectStrings(value, jsonPath, file) {
  if (typeof value === 'string') {
    if (!/^https?:\/\//i.test(value) && /\p{L}\?\p{L}|\uFFFD|Ã/u.test(value)) {
      encodingMatches.push({ file, path: jsonPath, value });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item, index) => inspectStrings(item, `${jsonPath}[${index}]`, file));
    return;
  }

  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, item]) =>
      inspectStrings(item, `${jsonPath}.${key}`, file),
    );
  }
}

function inspectProjects(value, file) {
  if (Array.isArray(value)) {
    value.forEach((item) => inspectProjects(item, file));
    return;
  }

  if (!value || typeof value !== 'object') return;

  if (value.academicProjectNumber && value.title) {
    projects.push({
      file,
      pa: value.academicProjectNumber,
      title: value.title,
      sourcePages: value.sourcePages ?? {},
    });
  }

  Object.values(value).forEach((item) => inspectProjects(item, file));
}

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(bundleDirectory, file), 'utf8'));
  inspectProjects(data, file);
  inspectStrings(data, '$', file);
}

function isIncomplete(value) {
  if (!value) return true;
  const serialized = JSON.stringify(value);
  return (
    serialized === '{}' ||
    serialized === '[]' ||
    serialized === '""' ||
    /pending|not-found|sin validar|por validar/i.test(serialized)
  );
}

const sourceKeys = ['nuestroLibroProyectos', 'conceptBook', 'multiplesLenguajes'];
const incomplete = Object.fromEntries(
  sourceKeys.map((key) => [
    key,
    projects
      .filter((project) => isIncomplete(project.sourcePages[key]))
      .map(({ file, pa, title }) => ({ file, pa, title })),
  ]),
);

const report = {
  bundleFiles: files.length,
  projects: projects.length,
  incompleteCounts: Object.fromEntries(
    sourceKeys.map((key) => [key, incomplete[key].length]),
  ),
  incomplete,
  encodingMatchCount: encodingMatches.length,
  encodingMatches,
};

if (process.argv.includes('--tokens')) {
  const tokenCounts = new Map();
  for (const match of encodingMatches) {
    for (const token of match.value.match(/[\p{L}\?]+/gu) ?? []) {
      if (!token.includes('?')) continue;
      tokenCounts.set(token, (tokenCounts.get(token) ?? 0) + 1);
    }
  }
  console.log(
    [...tokenCounts.entries()]
      .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
      .map(([token, count]) => `${count}\t${token}`)
      .join('\n'),
  );
} else if (process.argv.includes('--summary')) {
  console.log(
    JSON.stringify(
      {
        bundleFiles: report.bundleFiles,
        projects: report.projects,
        incompleteCounts: report.incompleteCounts,
        encodingMatchCount: report.encodingMatchCount,
        encodingMatches: report.encodingMatches.slice(0, 80),
      },
      null,
      2,
    ),
  );
} else {
  console.log(JSON.stringify(report, null, 2));
}
