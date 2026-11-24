import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const root = new URL('../../public/caracoles/data/curricular-development/', import.meta.url);
const replacement = ['San Julián', 54, 61, 'Un poeta con alas de pintor'];
const repairs = {
  lenguajes: { 6: [replacement], 19: [replacement], 30: [['David Lara', 50, 53], replacement], 39: [['Corales', 120], ['Estrellas de mar', 121]] },
  'etica-naturaleza-y-sociedades': { 15: [replacement], 30: [replacement] },
  'de-lo-humano-y-lo-comunitario': { 12: [['Se construyen robotbums', 142, 147]], 13: [['A. Vanegas Arroyo', 99, 101]] },
  'saberes-y-pensamiento-cientifico': {
    2: [['Los trucos de la abuela', 110]],
    3: [['Matilde, la primera médica mexicana', 128], ['Diversas formas de habitar el cuerpo', 68]],
    6: [['Cholula, la pirámide que se disfrazó de cerro', 18]],
    7: [['Teselaciones o cómo decorar el baño', 122]],
    9: [['Enormes cristales subterráneos', 46]],
    13: [['Los trucos de la abuela', 110]],
    14: [['Acertijos y retos', 64]],
    18: [['Jardines flotantes', 92]], 20: [['Jardines flotantes', 92]],
    26: [['El color negro más negro del mundo', 24]],
    32: [['Cortometrajes', 76, 77, 'Cubismo, el arte de la geometría']],
    37: [['Un suceso de otro mundo', 26]], 38: [['Un suceso de otro mundo', 26]],
    40: [['Jardines flotantes', 92]],
  },
};

let count = 0;
const writes = [];
for (const file of readdirSync(root)) {
  const field = /^grade-2-(.+)-ppa-\d+\.json$/.exec(file)?.[1];
  if (!repairs[field]) continue;
  const path = new URL(file, root);
  const raw = readFileSync(path, 'utf8');
  const bundle = JSON.parse(raw);
  const original = structuredClone(bundle);
  let changed = false;
  for (const project of bundle.development.academicProjects) {
    const rows = repairs[field][project.academicProjectNumber];
    if (!rows) continue;
    count++;
    changed = true;
    project.sourcePages.multiplesLenguajes = rows.map(([topicTitle, startPage, endPage = startPage, replaces]) => ({
      materialId: 'grade-2-apoyo-multiples-lenguajes-segundo-grado',
      label: 'Múltiples Lenguajes',
      startPage, endPage,
      pagesLabel: startPage === endPage ? `p. ${startPage}` : `pp. ${startPage}-${endPage}`,
      topicTitle,
      status: 'confirmed-current-edition',
      ...(replaces ? { replaces } : {}),
    }));
    project.supportMaterials = [
      ...(project.supportMaterials ?? []).filter(item => !/^m[uú]ltiples lenguajes$/i.test(item.kind ?? '')),
      ...project.sourcePages.multiplesLenguajes.map(({ topicTitle, pagesLabel, status }) => ({
        title: topicTitle, kind: 'Múltiples Lenguajes', pages: pagesLabel, status,
      })),
    ];
  }
  if (!changed) continue;
  const omit = (key, value) => ['multiplesLenguajes', 'supportMaterials'].includes(key) ? undefined : value;
  assert.equal(JSON.stringify(bundle, omit), JSON.stringify(original, omit), file);
  const output = JSON.stringify(bundle, null, 2) + '\n';
  writes.push([path, raw.includes('\r\n') ? output.replaceAll('\n', '\r\n') : output]);
}
assert.equal(count, 22);
for (const [path, output] of writes) writeFileSync(path, output);
console.log(`Verified ${count} projects across ${writes.length} bundles.`);
