import fs from 'node:fs';
import path from 'node:path';

const bundleDirectory = path.resolve('public/caracoles/data/curricular-development');
const baselineDirectory = process.argv.includes('--from-head-snapshot')
  ? path.resolve('tmp/head-curricular-bundles/public/caracoles/data/curricular-development')
  : bundleDirectory;
const replacements = new Map(
  String.raw`
revalidaci?n|revalidación
Gonz?lez|González
Validaci?n|Validación
informaci?n|información
trav?s|través
expresi?n|expresión
c?mo|cómo
art?sticas|artísticas
caracter?sticas|características
ind?genas|indígenas
investigaci?n|investigación
peri?dico|periódico
representaci?n|representación
todav?a|todavía
esc?nicas|escénicas
relaci?n|relación
validaci?n|validación
pr?ctica|práctica
Campa?a|Campaña
confirm?|confirmó
conformaci?n|conformación
Demostraci?n|Demostración
fotograf?as|fotografías
gr?ficas|gráficas
Gr?ficas|Gráficas
hist?rico|histórico
M?xico|México
period?stica|periodística
prevenci?n|prevención
problem?ticas|problemáticas
comprensi?n|comprensión
construcci?n|construcción
ingl?s|inglés
a?n|aún
as?|así
creaci?n|creación
di?logo|diálogo
exposici?n|exposición
mec?nica|mecánica
participaci?n|participación
reflexi?n|reflexión
ret?ricas|retóricas
s?|sí
selecci?n|selección
?lbum|Álbum
?mbito|ámbito
?tiles|útiles
a?os|años
acci?n|acción
art?culos|artículos
art?sticos|artísticos
astron?micas|astronómicas
b?lica|bélica
biograf?a|biografía
C?mic|Cómic
campa?a|campaña
cient?fica|científica
cient?ficas|científicas
cient?fico|científico
cient?ficos|científicos
Colecci?n|Colección
comunicaci?n|comunicación
condici?n|condición
Constituci?n|Constitución
contaminaci?n|contaminación
cronolog?a|cronología
cu?l|cuál
cu?les|cuáles
d?|dé
degradaci?n|degradación
democr?tica|democrática
despu?s|después
Despu?s|Después
Diagn?stico|Diagnóstico
din?mica|dinámica
dram?tica|dramática
econ?mica|económica
econ?micos|económicos
elaboraci?n|elaboración
elegir?|elegirá
erradicaci?n|erradicación
Escenificaci?n|Escenificación
Espa?ola|Española
expansi?n|expansión
Exposici?n|Exposición
f?sica|física
formaci?n|formación
g?nero|género
geogr?fico|geográfico
geom?trica|geométrica
gesti?n|gestión
hist?ricos|históricos
l?nea|línea
L?nea|Línea
matem?ticos|matemáticos
medici?n|medición
Mediterr?neo|Mediterráneo
Mesoam?rica|Mesoamérica
Mon?logos|Monólogos
naci?n|nación
ocasion?|ocasionó
orientaci?n|orientación
peque?a|pequeña
Peri?dico|Periódico
pol?ticas|políticas
pol?tico|político
pr?cticas|prácticas
promulgaci?n|promulgación
qu?micos|químicos
realizaci?n|realización
recuperaci?n|recuperación
regi?n|región
Revoluci?n|Revolución
Secesi?n|Secesión
soluci?n|solución
t?cnicas|técnicas
t?cnicos|técnicos
tr?nsito|tránsito
votaci?n|votación
categor?as|categorías
comparaci?n|comparación
di?logos|diálogos
did?ctico|didáctico
funci?n|función
hip?rbole|hipérbole
l?dica|lúdica
ling??stica|lingüística
M?ltiples|Múltiples
m?s|más
mediaci?n|mediación
met?fora|metáfora
mostr?|mostró
presentaci?n|presentación
revitalizaci?n|revitalización
?nfasis|énfasis
?qu?|¿qué
argumentaci?n|argumentación
art?stica|artística
autoexpresi?n|autoexpresión
dise?ar|diseñar
eligi?|eligió
est?|está
exploraci?n|exploración
im?genes|imágenes
memor?stica|memorística
n?cleo|núcleo
p?blicos|públicos
p?ginas|páginas
pedag?gico|pedagógico
qu?|qué
redacci?n|redacción
tambi?n|también
valoraci?n|valoración`
    .trim()
    .split('\n')
    .map((line) => line.split('|')),
);

const orderedReplacements = [...replacements.entries()].sort(
  ([left], [right]) => right.length - left.length,
);

function repairString(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return orderedReplacements.reduce(
    (result, [damaged, repaired]) => {
      const escaped = damaged.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const pattern = new RegExp(`(?<!\\p{L})${escaped}(?!\\p{L})`, 'gu');
      return result.replace(pattern, repaired);
    },
    value,
  );
}

function repair(value) {
  if (typeof value === 'string') return repairString(value);
  if (Array.isArray(value)) return value.map(repair);
  if (!value || typeof value !== 'object') return value;
  const repaired = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, repair(item)]),
  );

  if (repaired.materialId === 'grade-1-conceptos-artes-primer-grado') {
    repaired.materialId = 'grade-1-conceptos-lenguajes-primer-grado';
    repaired.label = 'Lenguajes';
  }

  return repaired;
}

let changedFiles = 0;
let changedStrings = 0;

function writeWithRetry(filePath, content) {
  let lastError;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      fs.writeFileSync(filePath, content, 'utf8');
      return;
    } catch (error) {
      lastError = error;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 250);
    }
  }
  throw lastError;
}

for (const file of fs.readdirSync(baselineDirectory).filter((name) => name.endsWith('.json'))) {
  const filePath = path.join(bundleDirectory, file);
  const original = JSON.parse(fs.readFileSync(path.join(baselineDirectory, file), 'utf8'));
  const repaired = repair(original);
  const current = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const before = JSON.stringify(current);
  const after = JSON.stringify(repaired);
  if (before === after) continue;

  changedStrings += [...before].reduce((count, char, index) => count + (char !== after[index]), 0);
  writeWithRetry(filePath, `${JSON.stringify(repaired, null, 2)}\n`);
  changedFiles += 1;
}

console.log(JSON.stringify({ changedFiles, changedStrings }, null, 2));
