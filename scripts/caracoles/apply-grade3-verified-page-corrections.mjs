import { execFileSync } from "node:child_process";
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

const extracted = JSON.parse(fs.readFileSync(extractionPath, "utf8")).records;
const extractedByProject = new Map(extracted.map((record) => [
  `${fieldKey(record.field)}:${record.academicProjectNumber}`,
  record,
]));

const summary = { files: 0, exactMatches: 0, containmentMatches: 0, correctedRanges: 0, preservedWithoutMatch: 0 };
const files = fs.readdirSync(dataDir).filter((name) => name.startsWith("grade-3-") && name.endsWith(".json"));

for (const file of files) {
  const relativePath = `public/caracoles/data/curricular-development/${file}`;
  const original = execFileSync("git", ["show", `HEAD:${relativePath}`], { cwd: root, encoding: "utf8" });
  const bundle = JSON.parse(original);
  let changed = false;
  const projects = bundle.development?.academicProjects ?? bundle.academicProjects ?? [];

  for (const project of projects) {
    const key = `${fieldKey(project.field ?? bundle.field)}:${Number(project.academicProjectNumber)}`;
    const sourceRecord = extractedByProject.get(key);
    const currentRefs = project.sourcePages?.conceptBook ?? [];
    if (!sourceRecord?.conceptBook?.length || !currentRefs.length) continue;

    for (const ref of currentRefs) {
      const refNorm = normalize(ref.topicTitle);
      const exact = sourceRecord.conceptBook.find((candidate) => normalize(candidate.title) === refNorm);
      const match = exact ?? sourceRecord.conceptBook.find((candidate) => {
        const candidateNorm = normalize(candidate.title);
        return refNorm.length >= 12 && candidateNorm.length >= 12
          && (refNorm.includes(candidateNorm) || candidateNorm.includes(refNorm));
      });
      if (!match) {
        summary.preservedWithoutMatch += 1;
        continue;
      }

      if (exact) summary.exactMatches += 1;
      else summary.containmentMatches += 1;
      if (ref.startPage !== match.startPage || ref.endPage !== match.endPage || ref.pagesLabel !== match.pagesLabel) {
        ref.startPage = match.startPage;
        ref.endPage = match.endPage;
        ref.pagesLabel = match.pagesLabel;
        ref.status = "confirmed-by-possibilities-column";
        summary.correctedRanges += 1;
        changed = true;
      }
    }
  }

  fs.writeFileSync(path.join(dataDir, file), `${JSON.stringify(bundle, null, 2)}\n`, "utf8");
  if (changed) summary.files += 1;
}

console.log(JSON.stringify(summary, null, 2));
