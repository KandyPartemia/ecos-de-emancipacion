# Reglas para agentes de IA

Este proyecto es una landing editorial para **Ecos de Emancipación**, propuesta educativa, cultural y pedagógica de la Maestra Kandy Partemia González Torreblanca.

## Tono

- Escribir en español claro, cálido y cuidado.
- Mantener una voz educativa, cultural, rural-contemporánea y esperanzadora.
- Evitar tono corporativo frío, publicitario agresivo o grandilocuente.
- No inventar datos biográficos, fechas, cargos, publicaciones, alianzas ni enlaces.

## Diseño

- Respetar la paleta: crema, tierra, terracota, dorado sobrio y verde profundo.
- Mantener tipografía elegante para títulos y legible para cuerpo.
- Cuidar contraste, jerarquía visual y legibilidad móvil.
- No usar imágenes externas con copyright.
- No añadir emojis.

## Accesibilidad y SEO

- Mantener `lang="es"` en `index.html`.
- Conservar estructura semántica de secciones, encabezados y enlaces.
- Usar textos descriptivos y reales.
- Actualizar metadatos solo con información confirmada.
- Si se agrega una imagen, incluir `alt` útil y evitar texto incrustado indispensable.

## Tecnología

- Mantener el proyecto sin backend.
- No agregar servicios de pago, analítica invasiva, formularios externos ni dependencias innecesarias.
- Debe seguir funcionando con:

```bash
npm install
npm run dev
npm run build
```

## Contenido editable

- Textos principales: `src/App.jsx`.
- Colores y estilos globales: `src/index.css`.
- Robots y sitemap: `public/robots.txt` y `public/sitemap.xml`.

Antes de entregar cambios, ejecutar `npm run build` y corregir errores.
