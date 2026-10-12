import json
import logging
import re
import unicodedata
from difflib import SequenceMatcher
from pathlib import Path

import pdfplumber
from pypdf import PdfReader

logging.getLogger("pypdf").setLevel(logging.ERROR)


ROOT = Path(__file__).resolve().parents[2]
SOURCE_ROOT = ROOT / "content" / "caracoles" / "source-pdfs"
OUTPUT = ROOT / "tmp" / "caracoles-possibilities-columns.json"

GRADE_DIRS = {
    "primer-grado": "1",
    "segundo-grado": "2",
    "tercer-grado": "3",
}

FIELD_CODES = {
    "DHC": "De lo Humano y lo Comunitario",
    "ENS": "Ética, Naturaleza y Sociedades",
    "LEN": "Lenguajes",
    "SYPC": "Saberes y Pensamiento Científico",
}

INTRO_MARKERS = (
    "nombre del informático",
    "nombre del informatico",
    "correspondiente al proyecto académico",
    "correspondiente al proyecto academico",
    "estructura general",
)


def clean(value):
    return (
        str(value or "")
        .replace("ﬁ", "fi")
        .replace("ﬂ", "fl")
        .replace("´", "'")
        .replace("–", "-")
        .replace("—", "-")
    )


def compact(value):
    return re.sub(r"\s+", " ", clean(value)).strip()


def field_from_path(pdf_path):
    code_match = re.search(r"POS_([^_]+)_\d+", pdf_path.stem, re.I)
    code = code_match.group(1).upper() if code_match else ""
    return FIELD_CODES.get(code, code)


def is_real_start(plain_text):
    normalized = compact(plain_text).lower()
    if len(re.findall(r"Proyecto Acad[eé]mico\s+\d+", plain_text, re.I)) < 3:
        return False
    return not any(marker in normalized for marker in INTRO_MARKERS)


def header_positions(lines):
    for line in lines:
        matches = list(re.finditer(r"Proyecto Acad[eé]mico\s+(\d+)", line, re.I))
        if len(matches) == 3:
            return [(match.start(), int(match.group(1))) for match in matches]
    return []


def split_columns(pdf_page, top):
    width = float(pdf_page.width)
    boundaries = [width * 0.04, width * 0.35, width * 0.65, width * 0.96]
    columns = []
    for index in range(3):
        crop = pdf_page.crop((boundaries[index], top, boundaries[index + 1], float(pdf_page.height) * 0.93))
        columns.append(clean(crop.extract_text(x_tolerance=2, y_tolerance=3) or "").splitlines())
    return columns


def append_continuation(columns, pdf_page):
    continuation_columns = split_columns(pdf_page, float(pdf_page.height) * 0.03)
    for index in range(3):
        columns[index].extend(["", *continuation_columns[index]])


def meaningful_blocks(lines):
    blocks = []
    current = []
    for raw_line in lines:
        line = compact(raw_line)
        if not line:
            if current:
                blocks.append(current)
                current = []
            continue
        if current and current[-1].endswith("-"):
            current[-1] = current[-1][:-1] + line
        else:
            current.append(line)
    if current:
        blocks.append(current)
    return blocks


def page_range(text):
    matches = list(re.finditer(r"\bpp?\.\s*(\d+)(?:\s*-\s*(\d+))?", text, re.I))
    if not matches:
        return None
    starts = [int(match.group(1)) for match in matches]
    ends = [int(match.group(2) or match.group(1)) for match in matches]
    return min(starts), max(ends)


def parse_sources(lines):
    concepts = []
    multiples = []
    in_multiples = False
    buffer = []
    bullet_buffer = False

    for raw_line in lines:
        line = compact(raw_line)
        if not line:
            continue
        if re.search(r"Múltiples Lenguajes", line, re.I):
            in_multiples = True
            line = re.sub(r"^.*?Múltiples Lenguajes\s*:\s*", "", line, flags=re.I)
            buffer = []
            bullet_buffer = False
            if not line:
                continue

        if re.search(r"Proyecto Acad[eé]mico|Video PPA:|\bPPA\s*\d+|\b[12] de [12]\b", line, re.I):
            buffer = []
            bullet_buffer = False
            continue

        is_bullet = line.startswith(("•", "·", "�", "-"))
        pages = page_range(line)
        if pages:
            target = multiples if in_multiples else concepts
            if is_bullet or bullet_buffer:
                if target:
                    target[-1]["endPage"] = max(target[-1]["endPage"], pages[1])
                    target[-1]["pagesLabel"] = (
                        f"p. {target[-1]['startPage']}"
                        if target[-1]["startPage"] == target[-1]["endPage"]
                        else f"pp. {target[-1]['startPage']}-{target[-1]['endPage']}"
                    )
            else:
                prefix = re.split(r"\bpp?\.\s*\d+", line, maxsplit=1, flags=re.I)[0]
                prefix = re.sub(r"^[•·�\-\s]+", "", prefix).strip(" ,.;:")
                title_parts = []
                if len(prefix.split()) < 3:
                    title_parts.extend(buffer[-2:])
                title_parts.append(prefix)
                title = compact(" ".join(part for part in title_parts if part)).strip(" ,.;:")
                if title:
                    target.append(
                        {
                            "title": title,
                            "startPage": pages[0],
                            "endPage": pages[1],
                            "pagesLabel": f"p. {pages[0]}" if pages[0] == pages[1] else f"pp. {pages[0]}-{pages[1]}",
                        }
                    )
            buffer = []
            bullet_buffer = False
            continue

        if is_bullet:
            bullet_buffer = True
            buffer = [re.sub(r"^[•·�\-\s]+", "", line)]
        else:
            if buffer and buffer[-1].endswith("-"):
                buffer[-1] = buffer[-1][:-1] + line
            else:
                buffer.append(line)
                buffer = buffer[-3:]

    return concepts, multiples


def fuzzy_key(value):
    normalized = unicodedata.normalize("NFD", clean(value).replace("�", ""))
    return re.sub(r"[^a-z0-9]+", " ", normalized.encode("ascii", "ignore").decode("ascii").lower()).strip()


def restore_titles(records, candidates):
    restored = []
    for record in records:
        same_pages = [
            candidate
            for candidate in candidates
            if candidate["startPage"] == record["startPage"]
            and candidate["endPage"] == record["endPage"]
        ]
        if not same_pages:
            same_pages = [candidate for candidate in candidates if candidate["startPage"] == record["startPage"]]
        if same_pages:
            target = fuzzy_key(record["title"])
            best = max(
                same_pages,
                key=lambda candidate: SequenceMatcher(None, target, fuzzy_key(candidate["title"])).ratio(),
            )
            restored.append({**record, "title": best["title"]})
        else:
            restored.append(record)
    return restored


def parse_title_and_product(lines, project_number):
    blocks = meaningful_blocks(lines)
    flat = [compact(" ".join(block)) for block in blocks]
    marker = re.compile(rf"Proyecto Acad[eé]mico\s+{project_number}\b", re.I)
    marker_index = next((index for index, text in enumerate(flat) if marker.search(text)), -1)
    if marker_index < 0:
        return "", ""

    candidates = []
    for text in flat[marker_index + 1 :]:
        if re.search(r"Video PPA:|\bpp?\.\s*\d+|Múltiples Lenguajes", text, re.I):
            break
        text = re.sub(r"\b1 de [12]\b", "", text).strip()
        if text:
            candidates.append(text)
        if len(candidates) >= 2:
            break
    return (candidates + ["", ""])[:2]


records = []
warnings = []

for grade_dir, grade in GRADE_DIRS.items():
    possibility_dir = SOURCE_ROOT / grade_dir / "posibilidades"
    for pdf_path in sorted(possibility_dir.glob("POS_*.pdf")):
        reader = PdfReader(str(pdf_path))
        layout_reader = pdfplumber.open(str(pdf_path))
        field = field_from_path(pdf_path)
        seen_project_numbers = set()
        page_index = 0
        while page_index < len(reader.pages):
            page = reader.pages[page_index]
            plain = clean(page.extract_text() or "")
            if not is_real_start(plain):
                page_index += 1
                continue

            layout = clean(page.extract_text(extraction_mode="layout") or "")
            positions = header_positions(layout.splitlines())
            if len(positions) != 3:
                warnings.append(f"{pdf_path.name} p. {page_index + 1}: no se localizaron tres columnas")
                page_index += 1
                continue

            detected_numbers = [number for _, number in positions]
            if any(number in seen_project_numbers for number in detected_numbers):
                next_number = max(seen_project_numbers, default=0) + 1
                positions = [
                    (position, next_number + index)
                    for index, (position, _) in enumerate(positions)
                ]
            seen_project_numbers.update(number for _, number in positions)

            columns = split_columns(layout_reader.pages[page_index], float(layout_reader.pages[page_index].height) * 0.18)
            page_count_match = re.search(r"\b1 de ([12])\b", plain)
            table_page_count = int(page_count_match.group(1)) if page_count_match else 1
            reviewed_pages = [page_index + 1]

            if table_page_count == 2 and page_index + 1 < len(reader.pages):
                append_continuation(columns, layout_reader.pages[page_index + 1])
                reviewed_pages.append(page_index + 2)

            unicode_source = plain
            if table_page_count == 2 and page_index + 1 < len(reader.pages):
                unicode_source += "\n\n" + clean(reader.pages[page_index + 1].extract_text() or "")
            unicode_concepts, unicode_multiples = parse_sources(unicode_source.splitlines())

            volume_match = re.search(r"Tomo\s+(I{1,3})", plain, re.I)
            ppa_match = re.search(r"PPA\s*(\d+)\s*:\s*([^\n\r]+)", plain, re.I)

            for column_index, (_, project_number) in enumerate(positions):
                title, product = parse_title_and_product(columns[column_index], project_number)
                concepts, multiples = parse_sources(columns[column_index])
                concepts = restore_titles(concepts, unicode_concepts)
                multiples = restore_titles(multiples, unicode_multiples)
                records.append(
                    {
                        "grade": grade,
                        "field": field,
                        "bookVolume": volume_match.group(1).upper() if volume_match else "",
                        "ppaNumber": int(ppa_match.group(1)) if ppa_match else None,
                        "ppaTitle": compact(ppa_match.group(2)) if ppa_match else "",
                        "academicProjectNumber": project_number,
                        "academicProjectTitle": title,
                        "product": product,
                        "column": column_index + 1,
                        "possibilitiesPages": reviewed_pages,
                        "conceptBook": concepts,
                        "multiplesLenguajes": multiples,
                        "sourcePdf": str(pdf_path.relative_to(ROOT)).replace("\\", "/"),
                    }
                )

            page_index += table_page_count
        layout_reader.close()

OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(
    json.dumps(
        {
            "records": records,
            "warnings": warnings,
            "summary": {
                "records": len(records),
                "onePageProjects": sum(len(record["possibilitiesPages"]) == 1 for record in records),
                "twoPageProjects": sum(len(record["possibilitiesPages"]) == 2 for record in records),
                "withConcepts": sum(bool(record["conceptBook"]) for record in records),
                "withMultiples": sum(bool(record["multiplesLenguajes"]) for record in records),
            },
        },
        ensure_ascii=False,
        indent=2,
    )
    + "\n",
    encoding="utf-8",
)

print(OUTPUT)
