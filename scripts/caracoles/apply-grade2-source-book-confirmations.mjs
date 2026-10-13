import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const bundleDirectory = path.join(root, 'public', 'caracoles', 'data', 'curricular-development');

const confirmations = [
  ['De lo Humano y lo Comunitario', 7, 204, 233, 'Las situaciones de riesgo más comunes en la adolescencia'],
  ['De lo Humano y lo Comunitario', 13, 14, 24, 'Características de los sistemas técnicos'],
  ['Lenguajes', 2, 76, 81, 'La investigación en el arte'],
  ['Lenguajes', 2, 237, 245, 'Pueblos indígenas y afrodescendientes de México y el mundo'],
  ['Lenguajes', 5, 129, 131, 'Prácticas culturales de los pueblos indígenas y el cuidado mutuo'],
  ['Lenguajes', 22, 68, 75, 'Valoración de textos tradicionales y contemporáneos'],
  ['Lenguajes', 25, 246, 248, 'Los textos narrativos como formas para conocer el pasado'],
  ['Lenguajes', 28, 200, 202, 'Acciones comunes para la solución de problemas comunitarios'],
  ['Lenguajes', 30, 129, 138, 'Prácticas culturales de los pueblos indígenas y el cuidado mutuo'],
  ['Lenguajes', 31, 186, 189, 'Prácticas culturales y ceremoniales de los pueblos indígenas'],
  ['Lenguajes', 33, 129, 138, 'Prácticas culturales de los pueblos indígenas y el cuidado mutuo'],
  ['Lenguajes', 39, 221, 226, 'El lenguaje a través de hablantes nativos y no nativos'],
  ['Lenguajes', 41, 76, 81, 'La investigación en el arte'],
  ['Lenguajes', 45, 266, 270, 'Movimientos artísticos por la defensa de la diversidad sexual y con perspectiva de género'],
  ['Saberes y Pensamiento Científico', 13, 33, 40, 'Sistemas de dos ecuaciones lineales con dos incógnitas'],
];

const normalize = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const pending = new Map(
  confirmations.map(([field, pa, startPage, endPage, topicTitle]) => [
    `${normalize(field)}|${pa}|${startPage}`,
    { field, pa, startPage, endPage, topicTitle },
  ]),
);

const changedFiles = [];
const confirmed = [];

for (const file of fs.readdirSync(bundleDirectory).filter((name) => name.startsWith('grade-2-') && name.endsWith('.json'))) {
  const filePath = path.join(bundleDirectory, file);
  const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, ''));
  let changed = false;

  for (const project of bundle.development?.academicProjects || []) {
    const pa = Number(project.academicProjectNumber);
    for (const [key, confirmation] of pending) {
      if (confirmation.pa !== pa || normalize(confirmation.field) !== normalize(bundle.field)) continue;

      project.sourcePages ||= {};
      project.sourcePages.conceptBook ||= [];
      const existing = project.sourcePages.conceptBook.find(
        (entry) => Number(entry.startPage) === confirmation.startPage,
      );
      if (!existing) {
        project.sourcePages.conceptBook.push({
          materialId: conceptMaterialId(bundle.field),
          label: bundle.field,
          startPage: confirmation.startPage,
          endPage: confirmation.endPage,
          pagesLabel: pageLabel(confirmation.startPage, confirmation.endPage),
          topicTitle: confirmation.topicTitle,
          status: 'confirmed-from-source-book',
        });
      } else {
        existing.endPage = confirmation.endPage;
        existing.pagesLabel = pageLabel(confirmation.startPage, confirmation.endPage);
        existing.topicTitle = confirmation.topicTitle;
        existing.status = 'confirmed-from-source-book';
      }
      project.sourcePages.conceptBook.sort((left, right) => Number(left.startPage) - Number(right.startPage));
      pending.delete(key);
      confirmed.push({ file, pa, ...confirmation });
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8');
    changedFiles.push(file);
  }
}

if (pending.size) {
  throw new Error(`No se localizaron ${pending.size} confirmaciones: ${[...pending.keys()].join(', ')}`);
}

console.log(JSON.stringify({ changedFiles, confirmed }, null, 2));

function conceptMaterialId(field) {
  return `grade-2-conceptos-${normalize(field).replace(/ /g, '-')}-segundo-grado`;
}

function pageLabel(startPage, endPage) {
  return startPage === endPage ? `p. ${startPage}` : `pp. ${startPage}-${endPage}`;
}
