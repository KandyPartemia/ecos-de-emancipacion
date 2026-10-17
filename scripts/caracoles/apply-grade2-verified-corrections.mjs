import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = path.join(root, "public", "caracoles", "data", "curricular-development");
const extractionPath = path.join(root, "tmp", "caracoles-possibilities-columns.json");

const normalize = (value = "") => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, " ")
  .trim();

const fieldKey = (field) => {
  const value = normalize(field);
  if (value.includes("humano")) return "dhc";
  if (value.includes("etica")) return "etica";
  if (value.includes("lenguajes")) return "lenguajes";
  if (value.includes("saberes")) return "saberes";
  return value;
};

const tokens = (value) => new Set(normalize(value).split(" ").filter((word) => word.length > 3));
const similarity = (left, right) => {
  const a = tokens(left);
  const b = tokens(right);
  if (!a.size || !b.size) return 0;
  const intersection = [...a].filter((item) => b.has(item)).length;
  return intersection / Math.max(a.size, b.size);
};

const products = new Map([
  ["dhc:1", "Representación gráfica de entrevistas"],
  ["dhc:3", "Brújula personal"],
  ["dhc:6", "Plan económico de reutilización"],
  ["dhc:9", "Galería con movimiento"],
  ["dhc:11", "Mapa de riesgos y peligros"],
  ["dhc:14", "Jornada de juegos de rol"],
  ["dhc:16", "Taller de actividades recreativas"],
  ["dhc:17", "Simulador de sistemas técnicos sustentables"],
  ["dhc:18", "Ensamble motriz-expresivo-socioemocional"],
]);

const videos = new Map([
  ["dhc:1", ["xTe0MGIbSBY", "Representación gráfica de entrevistas"]],
  ["dhc:3", ["9mvoEOcerWU", "Brújula personal"]],
  ["dhc:6", ["s6PQDpdEgRk", "Plan económico de reutilización"]],
  ["dhc:9", ["u-JMoHGRrPs", "Galería con movimiento"]],
  ["dhc:11", ["R3bSrsPiATM", "Mapa de riesgos y peligros"]],
  ["dhc:14", ["F8Q3gi0kuuQ", "Jornada de juegos de rol"]],
  ["dhc:16", ["wRnddSo9p04", "Taller de actividades recreativas"]],
  ["dhc:17", ["UuNzpp_TZQY", "Simulador de sistemas técnicos sustentables"]],
  ["dhc:18", ["9DTFVkw7E-0", "Ensamble motriz-expresivo-socioemocional"]],
  ["etica:5", ["YoBtK-fK5XA", "Encuentro de ideas"]],
  ["etica:6", ["a4gdqYjlZ4g", "Debate corto"]],
  ["etica:17", ["zrCbhp4lzWo", "Cronología de hechos"]],
  ["lenguajes:1", ["r0yI93An4E0", "Esquema ilustrado"]],
  ["lenguajes:3", ["J37PKa6f9gY", "Narración festiva"]],
  ["lenguajes:6", ["vPdSNK0npsw", "Exposición artística multicultural"]],
  ["lenguajes:7", ["_rpW18iGyDo", "Libro álbum narrativo"]],
  ["lenguajes:10", ["qiGkVhMNKTQ", "Pósteres monográficos ilustrados"]],
  ["lenguajes:15", ["tFt-GW2WNlY", "Cartel informativo tipo collage"]],
  ["lenguajes:22", ["ZiAlp3TqCL4", "Museo vivo"]],
  ["lenguajes:34", ["OlKjlNz_DBA", "Infografía de sensibilización"]],
  ["lenguajes:45", ["K6QzltdjRss", "Compendio de textos narrativos originales"]],
  ["saberes:10", ["YQYib7zObNo", "Modelos atómicos y moleculares"]],
  ["saberes:11", ["5w0avbUT92M", "Grupos de polígonos regulares"]],
]);

const extracted = JSON.parse(fs.readFileSync(extractionPath, "utf8")).records;
const extractedByProject = new Map(extracted.map((record) => [
  `${fieldKey(record.field)}:${record.academicProjectNumber}`,
  record,
]));

const summary = { files: 0, products: 0, videos: 0, conceptRanges: 0, unmatchedConcepts: [] };
const files = fs.readdirSync(dataDir).filter((name) => name.startsWith("grade-2-") && name.endsWith(".json"));

for (const file of files) {
  const fullPath = path.join(dataDir, file);
  const bundle = JSON.parse(fs.readFileSync(fullPath, "utf8"));
  let changed = false;
  const projects = bundle.development?.academicProjects ?? bundle.academicProjects ?? [];

  for (const project of projects) {
    const key = `${fieldKey(project.field ?? bundle.field)}:${Number(project.academicProjectNumber)}`;
    const product = products.get(key);
    if (product && project.finalProduct?.title !== product) {
      project.finalProduct.title = product;
      project.finalProduct.status = "confirmed-by-possibilities-column";
      const column = bundle.development?.partialClassroomProjectContext?.columnValidation?.columns?.find(
        (item) => item.projectId === project.projectId || Number(item.columnIndex) === Number(project.sourceValidation?.possibilitiesColumnIndex),
      );
      if (column) column.finalProduct = product;
      summary.products += 1;
      changed = true;
    }

    const video = videos.get(key);
    if (video) {
      const [id, title] = video;
      const next = {
        ...(project.academicProjectStrategy ?? {}),
        type: "video",
        title,
        url: `https://www.youtube.com/watch?v=${id}`,
        urlStatus: "revalidated-specific",
        scope: "academic-project",
        source: "Canal oficial @acervoaprendemx; búsqueda por estrategia detonadora, campo y segundo grado",
      };
      if (JSON.stringify(project.academicProjectStrategy) !== JSON.stringify(next)) {
        project.academicProjectStrategy = next;
        summary.videos += 1;
        changed = true;
      }
    }

    const sourceRecord = extractedByProject.get(key);
    const currentRefs = project.sourcePages?.conceptBook ?? [];
    if (sourceRecord?.conceptBook?.length && currentRefs.length) {
      for (const ref of currentRefs) {
        const refNorm = normalize(ref.topicTitle);
        const candidates = sourceRecord.conceptBook
          .map((candidate) => ({
            candidate,
            score: refNorm === normalize(candidate.title)
              ? 1
              : (refNorm.includes(normalize(candidate.title)) || normalize(candidate.title).includes(refNorm))
                ? 0.95
                : similarity(ref.topicTitle, candidate.title),
          }))
          .sort((a, b) => b.score - a.score);
        const best = candidates[0];
        if (!best || best.score < 0.72) {
          summary.unmatchedConcepts.push({ key, title: ref.topicTitle });
          continue;
        }
        const expected = best.candidate;
        if (ref.startPage !== expected.startPage || ref.endPage !== expected.endPage || ref.pagesLabel !== expected.pagesLabel) {
          ref.startPage = expected.startPage;
          ref.endPage = expected.endPage;
          ref.pagesLabel = expected.pagesLabel;
          ref.status = "confirmed-by-possibilities-column";
          summary.conceptRanges += 1;
          changed = true;
        }
      }
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath, `${JSON.stringify(bundle, null, 2)}\n`, "utf8");
    summary.files += 1;
  }
}

console.log(JSON.stringify(summary, null, 2));
