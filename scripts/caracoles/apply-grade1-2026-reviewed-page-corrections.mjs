import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/caracoles/data/curricular-development');

const corrections = [
  ['grade-1-etica-naturaleza-y-sociedades-ppa-11.json', 33, 'Convivencia sin discriminación y racismo', 302, 307],
  ['grade-1-etica-naturaleza-y-sociedades-ppa-6.json', 16, 'Importancia de las fuentes históricas', 197, 200],
  ['grade-1-etica-naturaleza-y-sociedades-ppa-8.json', 23, 'Convivencia sin discriminación y racismo', 302, 307],
  ['grade-1-etica-naturaleza-y-sociedades-ppa-9.json', 27, 'Convivencia sin discriminación y racismo', 302, 307],
  ['grade-1-lenguajes-ppa-1.json', 2, 'La diversidad lingüística de México y América Latina', 149, 159],
  ['grade-1-lenguajes-ppa-3.json', 9, 'Las lenguas indígenas y sus recursos lingüísticos', 122, 126],
  ['grade-1-saberes-y-pensamiento-cientifico-ppa-3.json', 7, 'Medidas de tendencia central', 100, 107],
  ['grade-1-saberes-y-pensamiento-cientifico-ppa-3.json', 8, 'Medidas de tendencia central', 100, 107],
  ['grade-1-saberes-y-pensamiento-cientifico-ppa-5.json', 15, 'Probabilidad', 136, 143],
  ['grade-1-saberes-y-pensamiento-cientifico-ppa-6.json', 17, 'Obtención y representación de información', 108, 119],
  ['grade-1-saberes-y-pensamiento-cientifico-ppa-6.json', 18, 'Relaciones lineales', 154, 158],
];

function pagesLabel(startPage, endPage) {
  return startPage === endPage ? `p. ${startPage}` : `pp. ${startPage}-${endPage}`;
}

const changed = new Set();
for (const [fileName, paNumber, topicTitle, startPage, endPage] of corrections) {
  const filePath = path.join(root, fileName);
  const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const project = bundle.development.academicProjects.find(
    (item) => Number(item.academicProjectNumber) === paNumber,
  );
  if (!project) throw new Error(`${fileName}: PA ${paNumber} no encontrado`);

  const candidates = project.sourcePages.conceptBook.filter((item) => {
    if (item.startPage === startPage) return true;
    return item.endPage > 400 || item.endPage - item.startPage > 30;
  });
  if (candidates.length !== 1) {
    throw new Error(`${fileName}: PA ${paNumber} tiene ${candidates.length} referencias candidatas`);
  }

  Object.assign(candidates[0], {
    startPage,
    endPage,
    pagesLabel: pagesLabel(startPage, endPage),
    topicTitle,
    status: 'confirmed-against-2026-edition-index',
  });

  fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
  changed.add(fileName);
}

console.log(JSON.stringify({ correctedReferences: corrections.length, changedFiles: [...changed] }, null, 2));
