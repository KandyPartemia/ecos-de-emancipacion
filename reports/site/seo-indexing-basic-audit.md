# Auditoría SEO básica para indexación

Fecha: 2026-06-08  
Sitio: https://ecos-de-emancipacion.vercel.app/

## Archivos modificados

- `index.html`
- `public/favicon.svg`
- `public/sitemap.xml`
- `reports/site/seo-indexing-basic-audit.md`

No se modificó Caracoles Resonando, memorama, mapa mental, datos curriculares ni diseño visual general.

## Metadata agregada o ajustada

- `title`: Ecos de Emancipación | Educación crítica, conciencia y recursos pedagógicos
- `meta description`: Ecos de Emancipación es un proyecto pedagógico y espiritual que comparte recursos educativos, conciencia crítica, Caracoles Resonando, herramientas para docentes, familias y estudiantes.
- `meta robots`: index, follow
- `canonical`: https://ecos-de-emancipacion.vercel.app/
- `favicon`: /favicon.svg
- `og:title`: Ecos de Emancipación | Educación crítica, conciencia y recursos pedagógicos
- `og:description`: igual a la descripción principal
- `og:type`: website
- `og:url`: https://ecos-de-emancipacion.vercel.app/
- `og:image`: https://ecos-de-emancipacion.vercel.app/images/og-ecos-emancipacion.webp
- `og:image:alt`: Ecos de Emancipación, proyecto educativo y pedagógico de la Maestra Kandy Partemia
- `twitter:card`: summary_large_image
- `twitter:title`: Ecos de Emancipación | Educación crítica, conciencia y recursos pedagógicos
- `twitter:description`: igual a la descripción principal
- `twitter:image`: https://ecos-de-emancipacion.vercel.app/images/og-ecos-emancipacion.webp
- `twitter:image:alt`: Ecos de Emancipación, proyecto educativo y pedagógico de la Maestra Kandy Partemia

## Contenido de robots.txt

```txt
User-agent: *
Allow: /

Sitemap: https://ecos-de-emancipacion.vercel.app/sitemap.xml
```

## Rutas incluidas en sitemap.xml

- https://ecos-de-emancipacion.vercel.app/
- https://ecos-de-emancipacion.vercel.app/recursos/caracoles-resonando

## Confirmaciones técnicas

- No se encontró `noindex`.
- No se encontró bloqueo por robots.
- No aparece título genérico tipo `Vite + React` o `React App`.
- El canonical apunta a la home pública.
- La página principal contiene texto visible relacionado con Ecos de Emancipación, educación crítica, conciencia, recursos pedagógicos, Caracoles Resonando, docentes, estudiantes y familias.

## Build

Comando ejecutado:

```powershell
npm.cmd run build
```

Resultado: exitoso.

Observación: Vite conserva la advertencia de chunk mayor a 500 kB; no bloquea la compilación ni la indexación básica.

## Pasos manuales pendientes en Google Search Console

1. Agregar o verificar la propiedad del sitio `https://ecos-de-emancipacion.vercel.app/`.
2. Enviar el sitemap: `https://ecos-de-emancipacion.vercel.app/sitemap.xml`.
3. Usar "Inspección de URL" para solicitar indexación de:
   - `https://ecos-de-emancipacion.vercel.app/`
   - `https://ecos-de-emancipacion.vercel.app/recursos/caracoles-resonando`
4. Revisar después de unos días el informe de cobertura e indexación.
5. Si se configura un dominio propio más adelante, repetir canonical, sitemap y Search Console con el dominio definitivo.

