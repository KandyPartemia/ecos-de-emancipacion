import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const root = new URL('../../public/caracoles/data/curricular-development/', import.meta.url);
const animals = ['¿Los animales tienen derechos?', 40, 45, 'Man Ray: pintar con fotografías'];
const grade1 = {
  lenguajes: {
    21: [['El samba: música y baile de resistencia y dignidad', 96, 99]],
    26: [animals],
    39: [animals],
    42: [['Diversidad de esqueletos de equinodermos del Golfo de México', 153]],
  },
  'etica-naturaleza-y-sociedades': { 31: [['Vive el cantar de los viejos', 46, 47]] },
  'saberes-y-pensamiento-cientifico': {
    1: [['El cerebro de Einstein', 70]],
    10: [['La flor nacional de México', 28]],
    11: [['El asombroso mundo de los arrecifes de coral', 10]],
    13: [['La flor nacional de México', 28]],
    24: [['Flexágonos', 114]],
  },
};
const replacement = ['San Julián', 54, 61, 'Un poeta con alas de pintor'];
const grade2 = {
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
const grade3 = {
  lenguajes: {},
  'etica-naturaleza-y-sociedades': {
    2: [['Cuentan que el maíz...', 142, 147], ['Huehuetéotl, dios viejo del fuego', 81], ['Cajete funerario de Calakmul', 49], ['Árbol sagrado: La ceiba', 36, 37]],
    3: [['Mujeres', 30, 33], ['Cortometrajes', 26, 27]],
    4: [['El origen del teatro griego', 148, 151], ['Hipatia de Alejandría', 28, 29], ['Las otras vidas de Ychi', 118, 121]],
    15: [['Los celos no son amor', 122, 127]],
    16: [['Sueños de José', 18, 21]],
    18: [['Ramón Cano Manilla, cuéntanos más, abuelo...', 58, 63], ['Tradiciones', 68, 71]],
    19: [['Cortometrajes', 26, 27]],
    21: [['Cortometrajes', 26, 27], ['Sueños de José', 18, 21]],
  },
  'de-lo-humano-y-lo-comunitario': {
    14: [['Árbol sagrado: La ceiba', 36, 37]],
    18: [['A. Vanegas Arroyo', 104, 111]],
  },
  'saberes-y-pensamiento-cientifico': {
    1: [['¿Cuánto vale el pasado de un pueblo?', 136, 141]],
    2: [['Hipatia de Alejandría', 28, 29]],
    6: [['Relojes de arena', 42]],
    25: [['Cuentan que el maíz...', 142]],
    38: [['La verdadera historia de la muerte de un planeta', 114]],
  },
};
const grade = process.argv[2] ?? '2';
const repairs = { 1: grade1, 2: grade2, 3: grade3 }[grade];
assert.ok(repairs);

let count = 0;
const writes = [];
for (const file of readdirSync(root)) {
  const field = new RegExp(`^grade-${grade}-(.+)-ppa-\\d+\\.json$`).exec(file)?.[1];
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
      materialId: {
        1: 'grade-1-apoyo-muiltiples-lenguajes-primer-grado',
        2: 'grade-2-apoyo-multiples-lenguajes-segundo-grado',
        3: 'grade-3-apoyo-multiples-lenguajes-tercer-grado',
      }[grade],
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
assert.equal(count, Object.values(repairs).reduce((total, field) => total + Object.keys(field).length, 0));
for (const [path, output] of writes) writeFileSync(path, output);
console.log(`Verified ${count} projects across ${writes.length} bundles.`);
