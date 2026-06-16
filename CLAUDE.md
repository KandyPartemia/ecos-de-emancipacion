# Estado del proyecto - Caracoles Resonando

## Datos curriculares
- 432 PA totales (3 grados x 4 campos x 36 PA aprox)
- Horizontes confirmados: 376/432 (según sesión Codex del 2026-06-15)
- Horizontes en needsReview: 55 (requieren revisión manual del libro físico)
- Videos revalidados específicos: 180 (urlStatus: "revalidated-specific")
- Videos confirmados automáticamente: 250 (urlStatus: "confirmed")
- Videos not-found: 2
- Duplicados de video: 0

> Nota: Al verificar los archivos publicados en `public/caracoles/data/curricular-development/`
> los conteos reales son: horizons confirmed~359/432, pending:55, none:18.
> Los 432 PA tienen detonatingStrategy con urlStatus "confirmed" o "revalidated-specific".
> Si hay discrepancia, los números de Codex son los de referencia hasta nueva validación.

## Metodología de revalidación de videos
El video de cada PA se obtiene buscando en @acervoaprendemx:
[producto del PA desde Posibilidades de Uso] + [grado] + telesecundaria
Elegir siempre el primer resultado del canal oficial.

## Archivos clave y su función

| Archivo / Carpeta | Función |
|---|---|
| `content/caracoles/source-pdfs/` | PDFs fuente por grado (posibilidades, proyectos, conceptos, inglés, apoyos). No van a Git. |
| `content/caracoles/generated-private/grade-N/pages-index.full.json` | OCR completo y estructurado por grado. ~2500 páginas c/u. |
| `content/caracoles/curricular-catalog/all-projects-canonical.json` | Catálogo maestro de 491 entradas. Datos base sin enriquecer. |
| `content/caracoles/curricular-development/` | Bundles de desarrollo curricular fuente (144 archivos, 432 PA). Aquí están horizons, finalProduct, detonatingStrategy. |
| `public/caracoles/data/curricular-development/` | Bundles publicados (espejo del anterior, procesados para la app). |
| `public/caracoles/data/generated/grade-N/selectable-projects.json` | Lo que ve el usuario en la app (164/164/163 PA por grado). |
| `content/caracoles/manual-overrides/` | Overrides humanos revisados. Fuente de verdad para correcciones. |
| `scripts/caracoles/` | 70+ scripts Node.js de extracción, validación y publicación. |
| `src/caracoles/` | App React (CaracolesApp.tsx, dashboards, lib). |
| `src/App.jsx` | Landing page de Ecos de Emancipación. |
| `scripts/inject-meta.mjs` | Inyecta meta OG tags al HTML estático en dist/. |

## Comandos frecuentes

```bash
# Desarrollo local
npm run dev

# Build para producción
npm run build

# Publicar desarrollo curricular al bundle público
node scripts/caracoles/publish-curricular-development-bundles.mjs

# Publicar selectable-projects (lo que ve el usuario)
node scripts/caracoles/publish-selectable-projects.mjs

# Actualizar horizontes en masa
node scripts/caracoles/apply-horizon-objective-mass-update.mjs

# Generar / revalidar links de YouTube
node scripts/caracoles/generate-youtube-links-all-grades.mjs

# Deploy: push a master + merge a main
git push origin master
git checkout main && git merge master && git push origin main && git checkout master
```

## Cómo retomar trabajo en sesión nueva

1. **Leer este CLAUDE.md** — da el contexto del estado sin necesidad de re-explorar.
2. **Revisar últimos commits** con `git log --oneline -10` para ver qué se hizo en la sesión anterior.
3. **Ver pendientes activos** — la sección "Pendientes" de este archivo.
4. **Identificar qué falta completar**:
   - Horizons pendientes: buscar `"status": "pending"` en `content/caracoles/curricular-development/`
   - Videos sin URL: buscar `"urlStatus": "pending-url"` en los mismos archivos
   - PA sin finalProduct: buscar `"finalProduct": ""` en los bundles
   - Overrides sin aplicar: revisar `content/caracoles/manual-overrides/`
5. **Verificar estado de publicación**: comparar conteos de `content/caracoles/curricular-development/` vs `public/caracoles/data/curricular-development/` — si difieren, correr el script de publicación.

## Deploy
- Rama de producción: main
- Rama de trabajo: master
- Siempre hacer push a master Y merge a main para publicar
- vercel.json sirve HTML estático para /recursos/caracoles-resonando
- Meta OG inyectadas por `scripts/inject-meta.mjs` post-build

## Pendientes
- ~~Subir og-caracoles-resonando.png a public/images/ y conectarla en inject-meta.mjs~~ ✓ COMPLETADO (commit 381f52b)
- 55 horizontes needsReview requieren transcripción manual del libro físico
- 2° Ética PA15 sin video (not-found, producto duplicado con PA12)
- Verificar conteo exacto de urlStatus "revalidated-specific" (Codex reportó 180, archivos muestran 5 en bundles publicados — posible discrepancia de sesión)
