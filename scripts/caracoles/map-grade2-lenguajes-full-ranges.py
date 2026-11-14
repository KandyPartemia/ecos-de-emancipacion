import argparse
import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
INDEX = ROOT / "content" / "caracoles" / "generated-private" / "grade-2" / "pages-index.full.json"
POSSIBILITIES = ROOT / "tmp" / "caracoles-possibilities-columns.json"
BUNDLES = ROOT / "public" / "caracoles" / "data" / "curricular-development"


def normalize(value):
    value = unicodedata.normalize("NFD", str(value or ""))
    value = "".join(char for char in value if unicodedata.category(char) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def tokens(value):
    return {token for token in normalize(value).split() if len(token) >= 4}


def similarity(left, right):
    if not left or not right:
        return 0.0
    return len(left & right) / min(len(left), len(right))


def label(start, end):
    return f"p. {start}" if start == end else f"pp. {start}-{end}"


parser = argparse.ArgumentParser()
parser.add_argument("--field", default="Lenguajes")
parser.add_argument("--material-id", default="grade-2-conceptos-lenguajes-segundo-grado")
parser.add_argument("--current-text", default="tmp/leng2-current.txt")
parser.add_argument("--bundle-pattern", default="grade-2-lenguajes-*.json")
parser.add_argument("--report-name", default="grade2-lenguajes-full-range-map.json")
args = parser.parse_args()

material_id = args.material_id
current_text = ROOT / args.current_text
report_path = ROOT / "reports" / "caracoles" / args.report_name

index = json.loads(INDEX.read_text(encoding="utf-8-sig"))
old_pages = {
    int(page["pageNumber"]): page.get("text") or ""
    for page in index["pages"]
    if page.get("materialId") == material_id
}
current_pages = current_text.read_text(encoding="utf-8", errors="replace").split("\f")
current_tokens = [tokens(text) for text in current_pages]


def map_page(old_page):
    wanted = tokens(old_pages.get(old_page, ""))
    candidates = [
        (similarity(wanted, candidate), page_number)
        for page_number, candidate in enumerate(current_tokens, start=1)
    ]
    score, page_number = max(candidates)
    return page_number, round(score, 4)


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
        existing = project.setdefault("sourcePages", {}).get("conceptBook", [])
        rebuilt = []
        for position, item in enumerate(source.get("conceptBook", [])):
            mapped = [map_page(page) for page in range(int(item["startPage"]), int(item["endPage"]) + 1)]
            mapped_pages = [page for page, _ in mapped]
            scores = [score for _, score in mapped]
            contiguous = mapped_pages == list(range(mapped_pages[0], mapped_pages[-1] + 1))
            confirmed = contiguous and min(scores, default=0) >= 0.7
            current_reference = existing[position] if position < len(existing) else {}
            title = re.sub(r"[\x00-\x1f]+", "", str(current_reference.get("topicTitle") or item["title"])).strip()
            result = {
                "pa": pa,
                "topicTitle": title,
                "oldRange": [item["startPage"], item["endPage"]],
                "mappedPages": mapped_pages,
                "minimumScore": min(scores, default=0),
                "status": "confirmed" if confirmed else "needsReview",
            }
            results.append(result)
            if not confirmed:
                continue
            start, end = mapped_pages[0], mapped_pages[-1]
            rebuilt.append({
                "materialId": material_id,
                "topicTitle": title,
                "startPage": start,
                "endPage": end,
                "pagesLabel": label(start, end),
                "status": "confirmed-current-edition-full-range",
            })
        if project["sourcePages"].get("conceptBook", []) != rebuilt:
            project["sourcePages"]["conceptBook"] = rebuilt
            changed = True

    if changed:
        bundle_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        changed_files.append(bundle_path.name)

report = {
    "summary": {
        "references": len(results),
        "confirmed": sum(row["status"] == "confirmed" for row in results),
        "needsReview": sum(row["status"] != "confirmed" for row in results),
        "changedFiles": len(changed_files),
    },
    "changedFiles": changed_files,
    "needsReview": [row for row in results if row["status"] != "confirmed"],
    "results": results,
}
report_path.parent.mkdir(parents=True, exist_ok=True)
report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
