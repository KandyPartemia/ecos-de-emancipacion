import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('public/caracoles/data/curricular-development');

const corrections = [
  ['grade-3-lenguajes-ppa-15.json', 43, 'Narrativas de vida saludable por medio del lenguaje audiovisual', 45, 45],
  ['grade-3-lenguajes-ppa-8.json', 23, 'Creaciones literarias en inglés: de lo tradicional a lo contemporáneo', 178, 180],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-1.json', 2, 'Lectura, interpretación y comunicación de gráficas estadísticas', 63, 67],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-1.json', 3, 'Relación e interpretación de la variación de dos cantidades a partir de su representación tabular, gráfica y algebraica', 68, 72],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-13.json', 37, 'Lectura, interpretación y comunicación de gráficas estadísticas', 63, 67],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-13.json', 38, 'Lectura, interpretación y comunicación de gráficas estadísticas', 63, 67],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-13.json', 39, 'Lectura, interpretación y comunicación de gráficas estadísticas', 63, 67],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-3.json', 8, 'Desarrollos planos de figuras tridimensionales, cilindros, pirámides y conos', 30, 41],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-3.json', 9, 'Desarrollos planos de figuras tridimensionales, cilindros, pirámides y conos', 30, 41],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-8.json', 22, 'Lectura, interpretación y comunicación de gráficas estadísticas', 63, 67],
  ['grade-3-saberes-y-pensamiento-cientifico-ppa-8.json', 23, 'Lectura, interpretación y comunicación de gráficas estadísticas', 63, 67],
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

  const candidates = project.sourcePages.conceptBook.filter(
    (item) => item.endPage > 500 || item.endPage - item.startPage > 30,
  );
  if (candidates.length !== 1) {
    throw new Error(`${fileName}: PA ${paNumber} tiene ${candidates.length} referencias candidatas`);
  }

  Object.assign(candidates[0], {
    startPage,
    endPage,
    pagesLabel: pagesLabel(startPage, endPage),
    topicTitle,
    status: 'confirmed-against-2026-possibilities-column',
  });

  fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
  changed.add(fileName);
}

console.log(JSON.stringify({ correctedReferences: corrections.length, changedFiles: [...changed] }, null, 2));
