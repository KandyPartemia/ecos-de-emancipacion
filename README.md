# Ecos de Emancipación

Ecos de Emancipación: un espacio de la Maestra Kandy Partemia con reflexiones, recursos y rutas para docentes, familias y jóvenes que buscan pensar la educación con conciencia y esperanza.

Proyecto creado con Vite, React y Tailwind CSS para presentar la propuesta educativa, cultural y pedagógica de la Maestra Kandy Partemia González Torreblanca.

## Requisitos

- Node.js 20 o superior.
- npm.

## Uso local

```bash
npm install
npm run dev
```

Para generar la versión de producción:

```bash
npm run build
```

## Cómo editar textos

Los textos principales están en `src/App.jsx`.

- `pillars`: edita los pilares pedagógicos.
- `projects`: edita los proyectos vivos.
- `paths`: edita las rutas de "Empieza aquí".
- Los textos del hero, manifiesto, invitación final y footer están en sus componentes correspondientes dentro del mismo archivo.

## Cómo editar enlaces

Los enlaces están declarados como constantes editables en `src/App.jsx`, dentro de `LINKS`.

No añadas enlaces externos si no están confirmados.

## Cómo editar colores

La paleta vive en `src/index.css`, dentro del bloque `@theme`.

Colores principales:

- `cream`: fondo cálido.
- `clay`: tierra clara.
- `earth`: texto secundario.
- `terracotta`: acentos editoriales.
- `gold`: dorado sobrio.
- `forest`: verde profundo.
- `ink`: texto principal.

Mantén una estética cálida, editorial, rural-contemporánea y esperanzadora.

## Estructura

```text
public/
  robots.txt
  sitemap.xml
src/
  App.jsx
  index.css
  main.jsx
index.html
package.json
```

## Notas de contenido

Evita inventar fechas, publicaciones, enlaces, biografías o datos no confirmados.
