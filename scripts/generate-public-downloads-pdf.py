from pathlib import Path
import re

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    HRFlowable,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "public" / "descargables"

FILES = [
    "guia-docente-semillero-conciencia",
    "guia-familias-acompanar-sin-vigilar",
    "bitacora-jovenes-resonancia",
    "cuaderno-breve-de-resonancias",
    "brujula-cognitologica-vida-cotidiana",
    "bitacora-docente-practica-con-conciencia",
]

FOREST = colors.HexColor("#234D3C")
DEEP_FOREST = colors.HexColor("#17382D")
GOLD = colors.HexColor("#C69A3C")
CREAM = colors.HexColor("#FAF5EA")
EARTH = colors.HexColor("#68584C")
TERRACOTTA = colors.HexColor("#9A4E3C")
SOFT_LINE = colors.HexColor("#D9CDBA")


def register_fonts():
    fonts = Path("C:/Windows/Fonts")
    serif = fonts / "georgia.ttf"
    serif_bold = fonts / "georgiab.ttf"
    sans = fonts / "arial.ttf"
    sans_bold = fonts / "arialbd.ttf"
    if all(path.exists() for path in (serif, serif_bold, sans, sans_bold)):
        pdfmetrics.registerFont(TTFont("EcosSerif", str(serif)))
        pdfmetrics.registerFont(TTFont("EcosSerifBold", str(serif_bold)))
        pdfmetrics.registerFont(TTFont("EcosSans", str(sans)))
        pdfmetrics.registerFont(TTFont("EcosSansBold", str(sans_bold)))
        return "EcosSerif", "EcosSerifBold", "EcosSans", "EcosSansBold"
    return "Times-Roman", "Times-Bold", "Helvetica", "Helvetica-Bold"


SERIF, SERIF_BOLD, SANS, SANS_BOLD = register_fonts()


def styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName=SERIF,
            fontSize=23,
            leading=28,
            textColor=FOREST,
            alignment=TA_LEFT,
            spaceAfter=5 * mm,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["Normal"],
            fontName=SANS_BOLD,
            fontSize=8.5,
            leading=12,
            textColor=TERRACOTTA,
            tracking=1.2,
            spaceAfter=6 * mm,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName=SERIF_BOLD,
            fontSize=14.5,
            leading=18,
            textColor=FOREST,
            spaceBefore=5 * mm,
            spaceAfter=2.5 * mm,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName=SANS,
            fontSize=10.2,
            leading=15.5,
            textColor=EARTH,
            spaceAfter=2.5 * mm,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName=SANS,
            fontSize=9.8,
            leading=14.5,
            textColor=EARTH,
            leftIndent=5 * mm,
            firstLineIndent=-3.5 * mm,
            spaceAfter=1.5 * mm,
        ),
        "closing": ParagraphStyle(
            "Closing",
            parent=base["BodyText"],
            fontName=SERIF,
            fontSize=11.5,
            leading=17,
            textColor=FOREST,
            alignment=TA_CENTER,
            borderColor=GOLD,
            borderWidth=0.8,
            borderPadding=8,
            backColor=CREAM,
            spaceBefore=4 * mm,
            spaceAfter=3 * mm,
        ),
        "note": ParagraphStyle(
            "Note",
            parent=base["BodyText"],
            fontName=SANS,
            fontSize=8.2,
            leading=12,
            textColor=EARTH,
            alignment=TA_CENTER,
        ),
    }


def escape(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def inline_markup(text):
    escaped = escape(text)
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", escaped)


def header_footer(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(FOREST)
    canvas.rect(0, height - 17 * mm, width, 17 * mm, fill=1, stroke=0)
    canvas.setFillColor(GOLD)
    canvas.circle(17 * mm, height - 8.5 * mm, 3.2 * mm, fill=1, stroke=0)
    canvas.setFont(SERIF, 10)
    canvas.setFillColor(CREAM)
    canvas.drawString(24 * mm, height - 11 * mm, "Ecos de Emancipación")
    canvas.setStrokeColor(SOFT_LINE)
    canvas.line(18 * mm, 15 * mm, width - 18 * mm, 15 * mm)
    canvas.setFont(SANS, 7.5)
    canvas.setFillColor(EARTH)
    canvas.drawString(18 * mm, 10 * mm, "Material público de acompañamiento pedagógico")
    canvas.drawRightString(width - 18 * mm, 10 * mm, f"Página {doc.page}")
    canvas.restoreState()


def parse_markdown(text, style):
    lines = text.splitlines()
    title = lines[0].removeprefix("# ").strip()
    story = [Spacer(1, 5 * mm), Paragraph(inline_markup(title), style["title"])]
    in_closing = False

    for raw in lines[1:]:
        line = raw.strip()
        if not line:
            story.append(Spacer(1, 1.4 * mm))
            continue
        if line == "---":
            story.append(Spacer(1, 2 * mm))
            story.append(HRFlowable(width="100%", thickness=0.8, color=GOLD, spaceBefore=2 * mm, spaceAfter=3 * mm))
            in_closing = True
            continue
        if line.startswith("## "):
            story.append(Paragraph(inline_markup(line[3:]), style["h2"]))
            continue
        if line.startswith("**") and line.endswith("**"):
            story.append(Paragraph(inline_markup(line), style["subtitle"]))
            continue
        if re.match(r"^\d+\.\s", line):
            number, content = line.split(". ", 1)
            story.append(Paragraph(f"<b>{number}.</b> {inline_markup(content)}", style["bullet"]))
            continue
        if line.startswith("- "):
            story.append(Paragraph(f"•&nbsp;&nbsp;{inline_markup(line[2:])}", style["bullet"]))
            continue
        if set(line) == {"."}:
            story.append(Spacer(1, 2 * mm))
            story.append(HRFlowable(width="100%", thickness=0.55, color=SOFT_LINE, spaceAfter=4 * mm))
            continue
        paragraph_style = style["closing"] if in_closing else style["body"]
        story.append(Paragraph(inline_markup(line), paragraph_style))
        if in_closing:
            in_closing = False
    return story


def build_pdf(stem):
    source = DOWNLOADS / f"{stem}.md"
    target = DOWNLOADS / f"{stem}.pdf"
    doc = BaseDocTemplate(
        str(target),
        pagesize=A4,
        rightMargin=18 * mm,
        leftMargin=18 * mm,
        topMargin=24 * mm,
        bottomMargin=20 * mm,
        title=source.read_text(encoding="utf-8").splitlines()[0].removeprefix("# "),
        author="Maestra Kandy Partemia González Torreblanca",
        subject="Ecos de Emancipación - recurso pedagógico",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="content")
    doc.addPageTemplates([PageTemplate(id="ecos", frames=[frame], onPage=header_footer)])
    story = parse_markdown(source.read_text(encoding="utf-8"), styles())
    doc.build(story)
    print(target.relative_to(ROOT))


if __name__ == "__main__":
    for file_stem in FILES:
        build_pdf(file_stem)
