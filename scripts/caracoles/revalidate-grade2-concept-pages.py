import argparse
import difflib
import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import pdfplumber

ROOT = Path(__file__).resolve().parents[2]
BUNDLE_ROOT = ROOT / "public" / "caracoles" / "data" / "curricular-development"
SOURCE_ROOT = ROOT / "content" / "caracoles" / "source-pdfs" / "segundo-grado" / "conceptos"
INDEX_PATH = ROOT / "content" / "caracoles" / "generated-private" / "grade-2" / "pages-index.full.json"
REPORT_JSON = ROOT / "reports" / "caracoles" / "grade2-concept-page-revalidation.json"
REPORT_MD = ROOT / "reports" / "caracoles" / "grade2-concept-page-revalidation.md"
POSSIBILITIES_PATH = ROOT / "tmp" / "caracoles-possibilities-columns.json"

BOOKS = {
    "grade-2-conceptos-de-lo-humano-y-lo-comunitario-segundo-grado": SOURCE_ROOT / "de lo humano y lo comunitario segundo grado.pdf",
    "grade-2-conceptos-etica-naturaleza-y-sociedades-segundo-grado": SOURCE_ROOT / "ética, naturaleza y sociedades segundo grado.pdf",
    "grade-2-conceptos-lenguajes-segundo-grado": SOURCE_ROOT / "lenguajes segundo grado.pdf",
    "grade-2-conceptos-saberes-y-pensamiento-cientifico-segundo-grado": SOURCE_ROOT / "saberes y pensamiento cientifico segundo grado.pdf",
}

FIELD_BOOKS = {
    "de lo humano y lo comunitario": "grade-2-conceptos-de-lo-humano-y-lo-comunitario-segundo-grado",
    "etica naturaleza y sociedades": "grade-2-conceptos-etica-naturaleza-y-sociedades-segundo-grado",
    "lenguajes": "grade-2-conceptos-lenguajes-segundo-grado",
    "saberes y pensamiento cientifico": "grade-2-conceptos-saberes-y-pensamiento-cientifico-segundo-grado",
}


def normalize(value):
    value = unicodedata.normalize("NFD", str(value or ""))
    value = "".join(char for char in value if unicodedata.category(char) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def title_tokens(value):
    ignored = {
        "como", "para", "desde", "entre", "sobre", "hacia", "esta", "este", "estos", "estas",
        "de", "del", "la", "las", "el", "los", "una", "uno", "unos", "unas", "y", "e", "o", "en",
    }
    return [token for token in normalize(value).split() if len(token) >= 3 and token not in ignored]


def group_pages(pages, allowed_gap=2):
    groups = []
    for page in sorted(set(pages)):
        if not groups or page - groups[-1][-1] > allowed_gap:
            groups.append([page])
        else:
            groups[-1].append(page)
    return groups


def coverage(title, page_tokens):
    wanted = set(title_tokens(title))
    if not wanted:
        return 0.0
    return len(wanted & page_tokens) / len(wanted)


def title_similarity(left, right):
    left_normalized = normalize(left)
    right_normalized = normalize(right)
    if left_normalized == right_normalized:
        return 1.0
    left_tokens = set(title_tokens(left))
    right_tokens = set(title_tokens(right))
    if not left_tokens or not right_tokens:
        return 0.0
    return 2 * len(left_tokens & right_tokens) / (len(left_tokens) + len(right_tokens))


def extract_toc_entries(pdf_path):
    entries = []
    with pdfplumber.open(pdf_path) as pdf:
        for pdf_index in range(8, min(13, len(pdf.pages))):
            words = pdf.pages[pdf_index].extract_words(extra_attrs=["size"])
            lines = []
            for word in sorted(words, key=lambda item: (round(item["top"], 1), item["x0"])):
                if not lines or abs(word["top"] - lines[-1]["top"]) > 1.5:
                    lines.append({"top": word["top"], "words": [word]})
                else:
                    lines[-1]["words"].append(word)

            buffer = []
            for line in lines:
                line_words = sorted(line["words"], key=lambda item: item["x0"])
                text = " ".join(word["text"] for word in line_words).strip()
                size = max(float(word.get("size") or 0) for word in line_words)
                x0 = min(float(word["x0"]) for word in line_words)
                match = re.search(r"\.{2,}\s*(\d+)\s*$", text)
                if not match:
                    buffer.append({"text": text, "size": size, "x0": x0})
                    continue

                page_number = int(match.group(1))
                current_text = text[: match.start()].strip()
                compatible = [
                    item for item in buffer
                    if abs(item["size"] - size) <= 0.25 and abs(item["x0"] - x0) <= 28
                ]
                title_parts = [item["text"] for item in compatible]
                if current_text:
                    title_parts.append(current_text)
                title = re.sub(r"\s+", " ", " ".join(title_parts)).strip()
                buffer = []
                if not title or page_number < 14:
                    continue
                entries.append({
                    "title": title,
                    "startPage": page_number,
                    "fontSize": round(size, 2),
                    "indent": round(x0, 2),
                    "tocPage": pdf_index + 1,
                })

    entries.sort(key=lambda item: (item["startPage"], -item["fontSize"]))
    for index, entry in enumerate(entries):
        next_starts = [
            candidate["startPage"]
            for candidate in entries[index + 1 :]
            if candidate["startPage"] > entry["startPage"]
            and candidate["fontSize"] >= entry["fontSize"] - 0.2
        ]
        entry["endPage"] = (min(next_starts) - 1) if next_starts else entry["startPage"]
    return entries


def extract_ocr_toc_entries(pages):
    entries = []
    ignored_lines = {
        "indice", "lenguajes", "espanol", "ingles", "artes",
        "lengua indigena como lengua materna", "lengua indigena como segunda lengua",
    }
    for page_number in range(9, 14):
        page = pages.get(page_number)
        if not page:
            continue
        buffer = []
        for raw_line in page["text"].splitlines():
            line = re.sub(r"\s+", " ", raw_line).strip()
            if not line:
                continue
            match = re.search(r"[�\.]{2,}\s*(\d+)\s*$", line)
            if match:
                prefix = re.sub(r"[�\.]+", " ", line[: match.start()]).strip()
                title_parts = [*buffer, prefix] if prefix else buffer
                title = re.sub(r"\s+", " ", " ".join(title_parts)).strip()
                buffer = []
                if title and normalize(title) not in ignored_lines:
                    entries.append({
                        "title": title,
                        "startPage": int(match.group(1)),
                        "fontSize": 0,
                        "indent": 0,
                        "tocPage": page_number,
                    })
                continue
            if set(line) <= {"�", "."}:
                continue
            normalized = normalize(line)
            if normalized in ignored_lines:
                buffer = []
                continue
            if len(line) > 2 and not re.fullmatch(r"[A-Za-z]", line):
                buffer.append(line)

    entries.sort(key=lambda item: item["startPage"])
    for index, entry in enumerate(entries):
        next_starts = [
            candidate["startPage"]
            for candidate in entries[index + 1 :]
            if candidate["startPage"] > entry["startPage"]
        ]
        entry["endPage"] = (min(next_starts) - 1) if next_starts else entry["startPage"]
    return entries


def choose_range(title, pages, toc_entries):
    compact_title = normalize(title).replace(" ", "")
    embedded_candidates = []
    for entry in toc_entries:
        compact_entry = normalize(entry["title"]).replace(" ", "")
        if len(compact_entry) >= 8 and compact_entry in compact_title:
            embedded_candidates.append((len(compact_entry), entry))
    if embedded_candidates:
        _, embedded = max(embedded_candidates, key=lambda item: item[0])
        return {
            "startPage": embedded["startPage"],
            "endPage": embedded["endPage"],
            "matchPages": list(range(embedded["startPage"], embedded["endPage"] + 1)),
            "matchedTocTitle": embedded["title"],
            "tocSimilarity": round(title_similarity(title, embedded["title"]), 4),
            "method": "embedded-title-matched-in-source-book-toc",
            "confidence": "high",
            "status": "confirmed",
        }

    toc_candidates = sorted(
        (
            (title_similarity(title, entry["title"]), entry)
            for entry in toc_entries
        ),
        key=lambda item: item[0],
        reverse=True,
    )
    if toc_candidates:
        best_score, best_entry = toc_candidates[0]
        second_score = toc_candidates[1][0] if len(toc_candidates) > 1 else 0.0
        if best_score >= 0.9 and (best_score >= 0.97 or best_score - second_score >= 0.08):
            return {
                "startPage": best_entry["startPage"],
                "endPage": best_entry["endPage"],
                "matchPages": list(range(best_entry["startPage"], best_entry["endPage"] + 1)),
                "matchedTocTitle": best_entry["title"],
                "tocSimilarity": round(best_score, 4),
                "method": "title-matched-in-source-book-toc",
                "confidence": "high" if best_score >= 0.94 else "medium",
                "status": "confirmed",
            }

    character_candidates = sorted(
        (
            (
                difflib.SequenceMatcher(None, compact_title, normalize(entry["title"]).replace(" ", "")).ratio(),
                entry,
            )
            for entry in toc_entries
        ),
        key=lambda item: item[0],
        reverse=True,
    )
    if character_candidates and character_candidates[0][0] >= 0.9:
        score, entry = character_candidates[0]
        return {
            "startPage": entry["startPage"],
            "endPage": entry["endPage"],
            "matchPages": list(range(entry["startPage"], entry["endPage"] + 1)),
            "matchedTocTitle": entry["title"],
            "tocSimilarity": round(score, 4),
            "method": "character-matched-in-source-book-toc",
            "confidence": "high",
            "status": "confirmed",
        }

    normalized_title = normalize(title)
    exact_pages = [
        page_number
        for page_number, page in pages.items()
        if page_number > 13 and normalized_title and normalized_title in page["normalized"]
    ]
    exact_groups = group_pages(exact_pages)

    if len(exact_groups) == 1:
        group = exact_groups[0]
        next_starts = sorted(
            {
                entry["startPage"]
                for entry in toc_entries
                if entry["startPage"] > group[0]
            }
        )
        inferred_end = (next_starts[0] - 1) if next_starts else group[-1]
        return {
            "startPage": group[0],
            "endPage": max(group[-1], inferred_end),
            "matchPages": group,
            "method": "exact-title-in-source-book",
            "confidence": "high",
            "status": "confirmed",
        }

    if len(exact_groups) > 1:
        return {
            "matchPages": exact_pages,
            "candidateGroups": exact_groups,
            "method": "multiple-exact-title-groups",
            "confidence": "low",
            "status": "needsReview",
        }

    fuzzy_pages = [
        page_number
        for page_number, page in pages.items()
        if page_number > 13 and coverage(title, page["tokens"]) >= 0.85
    ]
    fuzzy_groups = group_pages(fuzzy_pages, allowed_gap=1)
    if len(fuzzy_groups) == 1 and len(fuzzy_groups[0]) >= 2:
        group = fuzzy_groups[0]
        return {
            "startPage": group[0],
            "endPage": group[-1],
            "matchPages": group,
            "method": "strong-token-match-in-source-book",
            "confidence": "medium",
            "status": "confirmed",
        }

    return {
        "matchPages": fuzzy_pages,
        "candidateGroups": fuzzy_groups,
        "method": "title-not-located-unambiguously",
        "confidence": "low",
        "status": "needsReview",
    }


def page_label(start, end):
    return f"p. {start}" if start == end else f"pp. {start}-{end}"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8-sig"))


def update_academic_concepts(project, old_start, old_end, new_start, new_end):
    updated = 0
    for concept in project.get("academicConcepts", []):
        raw_pages = concept.get("sourcePages")
        if not isinstance(raw_pages, list) or not raw_pages:
            continue
        numbers = [int(value) for value in raw_pages if str(value).isdigit()]
        if numbers and min(numbers) == old_start and max(numbers) == old_end:
            concept["sourcePages"] = [new_start, new_end]
            concept["sourcePagesLabel"] = page_label(new_start, new_end)
            concept["status"] = "confirmed-from-source-book"
            updated += 1
    return updated


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true")
    args = parser.parse_args()

    for pdf_path in BOOKS.values():
        if not pdf_path.exists():
            raise FileNotFoundError(f"No se localizó el libro fuente: {pdf_path}")
    if not POSSIBILITIES_PATH.exists():
        raise FileNotFoundError(
            "Primero ejecuta extract-possibilities-columns.py con TARGET_GRADE=2."
        )

    index = read_json(INDEX_PATH)
    book_pages = {material_id: {} for material_id in BOOKS}
    for page in index.get("pages", []):
        material_id = page.get("materialId")
        if material_id in book_pages:
            text = page.get("text") or ""
            normalized = normalize(text)
            book_pages[material_id][int(page["pageNumber"])] = {
                "text": text,
                "normalized": normalized,
                "tokens": set(normalized.split()),
            }

    missing = [material_id for material_id, pages in book_pages.items() if not pages]
    if missing:
        raise RuntimeError(f"El índice no contiene páginas para: {', '.join(missing)}")

    book_toc = {}
    for material_id, pdf_path in BOOKS.items():
        entries = extract_toc_entries(pdf_path)
        entries.extend(extract_ocr_toc_entries(book_pages[material_id]))
        book_toc[material_id] = entries

    possibilities = read_json(POSSIBILITIES_PATH)
    possibility_records = {}
    for record in possibilities.get("records", []):
        if str(record.get("grade")) != "2":
            continue
        key = (normalize(record.get("field")), int(record.get("academicProjectNumber") or 0))
        possibility_records[key] = record

    files = sorted(BUNDLE_ROOT.glob("grade-2-*.json"))
    records = []
    changed_files = []
    range_cache = {}
    summary = defaultdict(int)
    summary["bundleFiles"] = len(files)

    for bundle_path in files:
        bundle = read_json(bundle_path)
        changed = False
        for project in bundle.get("development", {}).get("academicProjects", []):
            summary["projects"] += 1
            pa_number = int(project.get("academicProjectNumber") or 0)
            field_key = normalize(bundle.get("field"))
            possibility = possibility_records.get((field_key, pa_number))
            material_id = FIELD_BOOKS.get(field_key)
            if not possibility or material_id not in BOOKS:
                summary["projectsWithoutPossibilities"] += 1
                continue

            old_references = project.get("sourcePages", {}).get("conceptBook", [])
            new_references = []
            for extracted in possibility.get("conceptBook", []):
                title = str(extracted.get("title") or "").strip()
                if not title:
                    continue
                summary["references"] += 1
                cache_key = (material_id, normalize(title))
                if cache_key not in range_cache:
                    range_cache[cache_key] = choose_range(
                        title,
                        book_pages[material_id],
                        book_toc[material_id],
                    )
                result = dict(range_cache[cache_key])
                record = {
                    "file": bundle_path.name,
                    "field": bundle.get("field"),
                    "pa": pa_number,
                    "projectTitle": project.get("title"),
                    "topicTitle": title,
                    "materialId": material_id,
                    "possibilitiesStart": extracted.get("startPage"),
                    "possibilitiesEnd": extracted.get("endPage"),
                    **result,
                }

                if result["status"] == "confirmed":
                    summary["confirmed"] += 1
                    new_start = int(result["startPage"])
                    new_end = int(result["endPage"])
                    canonical_title = str(result.get("matchedTocTitle") or title).strip()
                    record["canonicalTitle"] = canonical_title
                    reference = {
                        "materialId": material_id,
                        "topicTitle": canonical_title,
                        "startPage": new_start,
                        "endPage": new_end,
                        "pagesLabel": page_label(new_start, new_end),
                        "status": "confirmed-from-source-book",
                    }
                    new_references.append(reference)
                    old_match = next(
                        (
                            item for item in old_references
                            if normalize(item.get("topicTitle")) == normalize(title)
                        ),
                        None,
                    )
                    old_start = int((old_match or {}).get("startPage") or 0)
                    old_end = int((old_match or {}).get("endPage") or old_start)
                    if (old_start, old_end) != (new_start, new_end):
                        summary["changedRanges"] += 1
                        record["changed"] = True
                        record["oldStart"] = old_start
                        record["oldEnd"] = old_end
                        if args.apply and old_match:
                            summary["academicConceptsUpdated"] += update_academic_concepts(
                                project, old_start, old_end, new_start, new_end
                            )
                    else:
                        record["changed"] = False
                else:
                    summary["needsReview"] += 1
                records.append(record)

            if old_references != new_references:
                summary["projectsWithRebuiltReferences"] += 1
                summary["oldReferencesRemoved"] += max(0, len(old_references) - len(new_references))
                if args.apply:
                    project.setdefault("sourcePages", {})["conceptBook"] = new_references
                    changed = True

        if changed and args.apply:
            bundle_path.write_text(
                json.dumps(bundle, ensure_ascii=False, indent=2) + "\n",
                encoding="utf-8",
            )
            changed_files.append(bundle_path.name)

    summary["changedFiles"] = len(changed_files)
    report = {
        "mode": "apply" if args.apply else "dry-run",
        "method": (
            "Posibilidades de uso identifica el tema; el rango definitivo se obtiene por "
            "coincidencia del título dentro del PDF del libro de campo de segundo grado."
        ),
        "summary": dict(summary),
        "changedFiles": changed_files,
        "records": records,
    }
    REPORT_JSON.parent.mkdir(parents=True, exist_ok=True)
    REPORT_JSON.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    ambiguous = [record for record in records if record["status"] != "confirmed"]
    changed_records = [record for record in records if record.get("changed")]
    lines = [
        "# Revalidación de páginas de libros de campo - segundo grado",
        "",
        "Posibilidades de Uso se empleó únicamente para identificar el tema. Las páginas se localizaron en el PDF del libro de campo correspondiente.",
        "",
        f"- Referencias revisadas: {summary['references']}",
        f"- Referencias confirmadas en el libro: {summary['confirmed']}",
        f"- Rangos corregidos: {summary['changedRanges']}",
        f"- Referencias que requieren revisión visual: {summary['needsReview']}",
        f"- Archivos modificados: {summary['changedFiles']}",
        "",
        "## Rangos corregidos",
        "",
    ]
    for record in changed_records:
        lines.append(
            f"- {record['field']} PA{record['pa']} - {record['topicTitle']}: "
            f"{page_label(record['oldStart'], record['oldEnd']) if record.get('oldStart') else 'sin rango previo equivalente'} -> "
            f"{page_label(record['startPage'], record['endPage'])}."
        )
    lines.extend(["", "## Revisión visual pendiente", ""])
    for record in ambiguous:
        groups = record.get("candidateGroups") or []
        lines.append(
            f"- {record['field']} PA{record['pa']} - {record['topicTitle']}: "
            f"{record['method']}; candidatos {groups or record.get('matchPages', [])}."
        )
    REPORT_MD.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(json.dumps(report["summary"], ensure_ascii=False, indent=2))
    print(REPORT_JSON)
    print(REPORT_MD)


if __name__ == "__main__":
    main()
