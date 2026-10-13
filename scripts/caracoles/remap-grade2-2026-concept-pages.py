import json
import os
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[2]
GRADE = int(os.environ.get("AUDIT_GRADE", "2"))
BOOK_ROOT = Path(
    os.environ.get(
        f"GRADE{GRADE}_BOOK_ROOT",
        r"C:\Users\KANDI\OneDrive\Documentos\TELES\2026-2027\SEGUNDO",
    )
)
INDEX_PATH = ROOT / f"content/caracoles/generated-private/grade-{GRADE}/pages-index.full.json"
BUNDLE_ROOT = ROOT / "public/caracoles/data/curricular-development"
AUDIT_PATH = ROOT / f"tmp/grade{GRADE}-2026-concept-page-remap.json"

BOOKS = (
    {"grade-2-conceptos-lenguajes-segundo-grado": "2_TS_LENGUAJES-BAJA.pdf"}
    if GRADE == 2
    else {
        "grade-1-conceptos-de-lo-humano-y-lo-comunitario-primer-grado": "1_TS-HC-BAJA.pdf",
        "grade-1-conceptos-etica-naturaleza-y-sociedades-primer-grado": "1_TS-ENS-BAJA.pdf",
        "grade-1-conceptos-lenguajes-primer-grado": "1_TS-LENGUAJES-BAJA.pdf",
        "grade-1-conceptos-saberes-y-pensamiento-cientifico-primer-grado": "1_TS_SPC-BAJA.pdf",
        "grade-1-apoyo-muiltiples-lenguajes-primer-grado": "1_TS-ML-BAJA.pdf",
        "grade-1-ingles-ingles-primer-grado": "1_TS-INGLES-BAJA.pdf",
    }
)


def normalize(value):
    value = unicodedata.normalize("NFD", str(value or ""))
    value = "".join(char for char in value if unicodedata.category(char) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def tokens(value):
    return {word for word in normalize(value).split() if len(word) >= 4}


def token_similarity(left_tokens, right_tokens):
    if len(left_tokens) < 8 or len(right_tokens) < 8:
        return 0.0
    return len(left_tokens & right_tokens) / min(len(left_tokens), len(right_tokens))


old_index = json.loads(INDEX_PATH.read_text(encoding="utf-8-sig"))
old_pages = defaultdict(dict)
for page in old_index["pages"]:
    old_pages[page["materialId"]][int(page["pageNumber"])] = page.get("text", "")

new_pages = {}
new_page_tokens = {}
for material_id, filename in BOOKS.items():
    reader = PdfReader(BOOK_ROOT / filename)
    new_pages[material_id] = {
        page_number: page.extract_text() or ""
        for page_number, page in enumerate(reader.pages, start=1)
    }
    new_page_tokens[material_id] = {
        page_number: tokens(text) for page_number, text in new_pages[material_id].items()
    }

# Each old page is matched once against the supplied 2026-2027 edition.
page_map = defaultdict(dict)
for material_id, pages in old_pages.items():
    if material_id not in new_pages:
        continue
    for old_number, old_text in pages.items():
        old_tokens = tokens(old_text)
        candidates = sorted(
            (
                (token_similarity(old_tokens, candidate_tokens), new_number)
                for new_number, candidate_tokens in new_page_tokens[material_id].items()
            ),
            reverse=True,
        )
        score, new_number = candidates[0]
        page_map[material_id][old_number] = {"page": new_number, "score": round(score, 4)}

results = []
changed_files = set()
for bundle_path in sorted(BUNDLE_ROOT.glob(f"grade-{GRADE}-*.json")):
    bundle = json.loads(bundle_path.read_text(encoding="utf-8-sig"))
    file_changed = False
    for project in bundle.get("development", {}).get("academicProjects", []):
        for section in ("conceptBook", "multiplesLenguajes", "englishBook"):
            for reference in project.get("sourcePages", {}).get(section, []):
                material_id = reference.get("materialId")
                if material_id not in BOOKS:
                    continue
                old_start = int(reference.get("startPage", 0))
                old_end = int(reference.get("endPage", old_start))
                old_length = old_end - old_start + 1
                mapped = [page_map[material_id].get(page) for page in range(old_start, old_end + 1)]
                mapped_pages = [item["page"] for item in mapped if item]
                scores = [item["score"] for item in mapped if item]
                valid = (
                    1 <= old_length <= 30
                    and len(mapped) == old_length
                    and all(mapped)
                    and min(scores, default=0) >= 0.8
                    and len(set(mapped_pages)) == old_length
                    and mapped_pages == list(range(mapped_pages[0], mapped_pages[0] + old_length))
                )
                record = {
                    "file": bundle_path.name,
                    "field": bundle.get("field"),
                    "pa": project.get("academicProjectNumber"),
                    "projectTitle": project.get("title"),
                    "section": section,
                    "materialId": material_id,
                    "topicTitle": reference.get("topicTitle"),
                    "oldRange": [old_start, old_end],
                    "mappedPages": mapped_pages,
                    "scores": scores,
                    "status": "confirmed" if valid else "needsReview",
                }
                if valid:
                    new_start, new_end = mapped_pages[0], mapped_pages[-1]
                    record["newRange"] = [new_start, new_end]
                    if [old_start, old_end] != [new_start, new_end]:
                        reference["startPage"] = new_start
                        reference["endPage"] = new_end
                        reference["pages"] = f"p. {new_start}" if new_start == new_end else f"pp. {new_start}-{new_end}"
                        file_changed = True
                results.append(record)
    if file_changed:
        bundle_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        changed_files.add(bundle_path.name)

audit = {
    "summary": {
        "referencesReviewed": len(results),
        "confirmed": sum(row["status"] == "confirmed" for row in results),
        "needsReview": sum(row["status"] == "needsReview" for row in results),
        "changedReferences": sum(row.get("newRange") != row["oldRange"] for row in results if row["status"] == "confirmed"),
        "changedFiles": len(changed_files),
    },
    "changedFiles": sorted(changed_files),
    "needsReview": [row for row in results if row["status"] == "needsReview"],
    "changes": [row for row in results if row.get("newRange") != row["oldRange"]],
}
AUDIT_PATH.parent.mkdir(parents=True, exist_ok=True)
AUDIT_PATH.write_text(json.dumps(audit, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(audit["summary"], ensure_ascii=False, indent=2))
print(AUDIT_PATH)
