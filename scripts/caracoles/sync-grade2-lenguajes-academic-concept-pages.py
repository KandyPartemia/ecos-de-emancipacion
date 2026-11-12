import json
import re
import subprocess
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
INDEX = ROOT / "content" / "caracoles" / "generated-private" / "grade-2" / "pages-index.full.json"
CURRENT_TEXT = ROOT / "tmp" / "leng2-current.txt"
BUNDLES = ROOT / "public" / "caracoles" / "data" / "curricular-development"
MATERIAL_ID = "grade-2-conceptos-lenguajes-segundo-grado"


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


def groups(numbers):
    result = []
    for number in sorted(set(numbers)):
        if not result or number != result[-1][-1] + 1:
            result.append([number])
        else:
            result[-1].append(number)
    return result


def pages_label(numbers):
    parts = []
    for group in groups(numbers):
        parts.append(f"p. {group[0]}" if len(group) == 1 else f"pp. {group[0]}-{group[-1]}")
    return "; ".join(parts)


index = json.loads(INDEX.read_text(encoding="utf-8-sig"))
old_pages = {
    int(page["pageNumber"]): page.get("text") or ""
    for page in index["pages"]
    if page.get("materialId") == MATERIAL_ID
}
current_pages = CURRENT_TEXT.read_text(encoding="utf-8", errors="replace").split("\f")
current_tokens = [tokens(text) for text in current_pages]
page_map = {}
for old_number, text in old_pages.items():
    wanted = tokens(text)
    score, current_number = max(
        (similarity(wanted, candidate), number)
        for number, candidate in enumerate(current_tokens, start=1)
    )
    page_map[old_number] = (current_number, score)


def remap_pages(values):
    numbers = [int(value) for value in values if str(value).isdigit()]
    if not numbers:
        return None
    old_range = range(min(numbers), max(numbers) + 1)
    mapped = [page_map.get(number) for number in old_range]
    if not all(mapped) or min(score for _, score in mapped) < 0.7:
        return None
    pages = sorted(set(number for number, _ in mapped))
    return pages, pages_label(pages)


changed_files = []
updated = 0
for bundle_path in sorted(BUNDLES.glob("grade-2-lenguajes-*.json")):
    relative = bundle_path.relative_to(ROOT).as_posix()
    original_text = subprocess.run(
        ["git", "show", f"HEAD:{relative}"],
        cwd=ROOT,
        check=True,
        capture_output=True,
        text=True,
        encoding="utf-8",
    ).stdout
    original = json.loads(original_text)
    original_projects = {
        int(project.get("academicProjectNumber") or 0): project
        for project in original.get("development", {}).get("academicProjects", [])
    }
    bundle = json.loads(bundle_path.read_text(encoding="utf-8-sig"))
    changed = False
    for project in bundle.get("development", {}).get("academicProjects", []):
        pa = int(project.get("academicProjectNumber") or 0)
        source_project = original_projects.get(pa, {})
        concepts = json.loads(json.dumps(source_project.get("academicConcepts", []), ensure_ascii=False))
        for concept in concepts:
            if normalize(concept.get("sourceBook")) != "lenguajes":
                continue
            mapped = remap_pages(concept.get("sourcePages") or [])
            if not mapped:
                continue
            pages, label = mapped
            concept["sourcePages"] = pages
            concept["sourcePagesLabel"] = label
            concept["status"] = "confirmed-current-edition"
            updated += 1
        if project.get("academicConcepts", []) != concepts:
            project["academicConcepts"] = concepts
            changed = True
    if changed:
        bundle_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        changed_files.append(bundle_path.name)

print(json.dumps({"academicConceptsUpdated": updated, "changedFiles": changed_files}, ensure_ascii=False, indent=2))
