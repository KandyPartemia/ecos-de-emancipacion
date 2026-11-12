import json
import re
import unicodedata
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
BUNDLES = ROOT / "public" / "caracoles" / "data" / "curricular-development"
MATERIAL_ID = "grade-2-conceptos-lenguajes-segundo-grado"


def normalize(value):
    value = unicodedata.normalize("NFD", str(value or ""))
    value = "".join(char for char in value if unicodedata.category(char) != "Mn")
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def reference(title, start, end):
    return {
        "materialId": MATERIAL_ID,
        "topicTitle": title,
        "startPage": start,
        "endPage": end,
        "pagesLabel": f"p. {start}" if start == end else f"pp. {start}-{end}",
        "status": "confirmed-current-edition-visual-and-page-map",
    }


overrides = {
    1: [reference("La interpretación de textos literarios: análisis y disfrute", 37, 41)],
    9: [reference("La literatura y el arte de la palabra en las lenguas originarias de México", 101, 109)],
    14: [reference("Acciones comunes para la solución de problemas comunitarios", 195, 201)],
    17: [
        reference("El comentario crítico de una obra literaria como instrumento para la reflexión personal", 12, 17),
        reference("La interpretación de textos literarios: análisis y disfrute", 37, 41),
    ],
    28: [
        reference("La interpretación de textos literarios: análisis y disfrute", 37, 37),
        reference("Elección entre medidas de tendencia central y de dispersión", 278, 282),
    ],
    32: [
        reference("Criterios para valorar la estética de obras culturales y artísticas, y cómo trascenderlos", 271, 273),
        reference("Los lenguajes artísticos desde una perspectiva descolonizadora", 291, 292),
    ],
    33: [reference("El trabajo de la milpa como práctica cultural de las comunidades indígenas", 135, 144)],
    41: [reference("El trabajo de la milpa como práctica cultural de las comunidades indígenas", 135, 144)],
}

match_fragments = {
    1: ["interpretacion de textos literarios"],
    9: ["literatura y el arte de la palabra"],
    14: ["acciones comunes para la solucion"],
    17: ["comentario critico de una obra literaria", "interpretacion de textos literarios"],
    28: ["interpretacion de textos literarios", "eleccion entre medidas"],
    32: ["criterios para valorar la estetica", "lenguajes artisticos desde una perspectiva"],
    33: ["trabajo de la milpa"],
    41: ["trabajo de la milpa"],
}

changed_files = []
for bundle_path in sorted(BUNDLES.glob("grade-2-lenguajes-*.json")):
    bundle = json.loads(bundle_path.read_text(encoding="utf-8-sig"))
    changed = False
    for project in bundle.get("development", {}).get("academicProjects", []):
        pa = int(project.get("academicProjectNumber") or 0)
        if pa not in overrides:
            continue
        references = project.setdefault("sourcePages", {}).setdefault("conceptBook", [])
        fragments = match_fragments[pa]
        kept = [
            item for item in references
            if not any(fragment in normalize(item.get("topicTitle")) for fragment in fragments)
        ]
        rebuilt = kept + overrides[pa]
        if references != rebuilt:
            project["sourcePages"]["conceptBook"] = rebuilt
            changed = True
    if changed:
        bundle_path.write_text(json.dumps(bundle, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        changed_files.append(bundle_path.name)

print(json.dumps({"visualOverrides": len(overrides), "changedFiles": changed_files}, ensure_ascii=False, indent=2))
