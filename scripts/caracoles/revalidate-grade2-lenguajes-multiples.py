import argparse
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
POSSIBILITIES = ROOT / "tmp" / "caracoles-possibilities-columns.json"
BUNDLES = ROOT / "public" / "caracoles" / "data" / "curricular-development"
MATERIAL_ID = "grade-2-apoyo-multiples-lenguajes-segundo-grado"
MISSING_CURRENT_EDITION = {"un poeta con alas de pintor", "un poeta con las alas de pintor"}


def normalize(value):
    value = unicodedata.normalize("NFD", str(value or ""))
    value = "".join(char for char in value if unicodedata.category(char) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def page_label(start, end):
    return f"p. {start}" if start == end else f"pp. {start}-{end}"


parser = argparse.ArgumentParser()
parser.add_argument("--field", default="Lenguajes")
parser.add_argument("--bundle-pattern", default="grade-2-lenguajes-*.json")
parser.add_argument("--report-name", default="grade2-lenguajes-multiples-2026-validation.json")
args = parser.parse_args()
report_path = ROOT / "reports" / "caracoles" / args.report_name

possibilities = json.loads(POSSIBILITIES.read_text(encoding="utf-8-sig"))
records = {
    int(record["academicProjectNumber"]): record
    for record in possibilities["records"]
    if str(record.get("grade")) == "2" and record.get("field") == args.field
}

results = []
changed_files = []
for bundle_path in sorted(BUNDLES.glob(args.bundle_pattern)):
    bundle = json.loads(bundle_path.read_text(encoding="utf-8-sig"))
    changed = False
    for project in bundle.get("development", {}).get("academicProjects", []):
        pa = int(project.get("academicProjectNumber") or 0)
        source = records.get(pa)
        if not source:
            continue

        source_validation = project.setdefault("sourceValidation", {})
        reviewed_pages = source.get("possibilitiesPages", [])
        if source_validation.get("possibilitiesPages") != reviewed_pages:
            source_validation["possibilitiesPages"] = reviewed_pages
            source_validation["columnEvidence"] = (
                f"Columna {source.get('column')} revisada completa en Posibilidades de uso, "
                f"pp. {reviewed_pages[0]}-{reviewed_pages[-1]}."
            )
            changed = True

        references = []
        supports = []
        missing = []
        for item in source.get("multiplesLenguajes", []):
            title = str(item.get("title") or "").strip()
            if normalize(title) in MISSING_CURRENT_EDITION:
                missing.append(title)
                results.append({"pa": pa, "title": title, "status": "not-in-2026-2027-edition"})
                continue
            start = int(item["startPage"])
            end = int(item.get("endPage") or start)
            label = page_label(start, end)
            references.append({
                "materialId": MATERIAL_ID,
                "label": "Múltiples Lenguajes",
                "startPage": start,
                "endPage": end,
                "pagesLabel": label,
                "topicTitle": title,
                "status": "confirmed-current-edition",
            })
            supports.append({
                "title": title,
                "kind": "Múltiples Lenguajes",
                "pages": label,
                "status": "confirmed-current-edition",
            })
            results.append({"pa": pa, "title": title, "pages": label, "status": "confirmed"})

        source_pages = project.setdefault("sourcePages", {})
        if source_pages.get("multiplesLenguajes", []) != references:
            source_pages["multiplesLenguajes"] = references
            changed = True
        if project.get("supportMaterials", []) != supports:
            project["supportMaterials"] = supports
            changed = True

        validation = project.setdefault("validationStatus", {})
        reasons = [
            reason for reason in validation.get("needsReviewReasons", [])
            if "Múltiples Lenguajes" not in reason and "Multiples Lenguajes" not in reason
        ]
        if missing:
            reasons.append(
                f"La dosificación menciona {', '.join(missing)}, pero la lectura no aparece "
                "en el PDF 2026-2027 disponible de Múltiples Lenguajes."
            )
        if validation.get("needsReviewReasons") != reasons:
            validation["needsReviewReasons"] = reasons
            changed = True

    if changed:
        bundle_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        changed_files.append(bundle_path.name)

report = {
    "summary": {
        "references": len(results),
        "confirmed": sum(row["status"] == "confirmed" for row in results),
        "notInCurrentEdition": sum(row["status"] != "confirmed" for row in results),
        "changedFiles": len(changed_files),
    },
    "changedFiles": changed_files,
    "results": results,
}
report_path.parent.mkdir(parents=True, exist_ok=True)
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
