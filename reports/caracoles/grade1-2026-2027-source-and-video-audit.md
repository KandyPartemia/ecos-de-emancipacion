# Auditoría de fuentes y videos de primer grado 2026-2027

Fecha: 2026-10-12

## Alcance

Se revisaron los 144 Proyectos Académicos de primer grado a partir de los cuatro libros de Posibilidades de uso, los tres tomos de Nuestro libro de proyectos, los libros de los campos formativos y Múltiples Lenguajes proporcionados para el ciclo 2026-2027.

La revisión conservó los datos ya confirmados. Solo se corrigieron referencias con rangos estructuralmente imposibles o con textos unidos por error durante la extracción.

## Posibilidades de uso

- 144 PA vinculados a una ficha y columna identificable.
- 69 PA utilizan una página de Posibilidades de uso.
- 75 PA utilizan dos páginas del mismo bloque.
- Distribución de columnas: 48 PA en columna 1, 48 en columna 2 y 48 en columna 3.
- No se reasignaron columnas ni productos finales ya confirmados.

## Libros de conceptos

La comparación automatizada revisó 547 referencias:

- 471 referencias confirmadas con coincidencia suficiente.
- 76 referencias se conservaron sin cambios por baja confianza de extracción o composición visual.
- 11 referencias imposibles se contrastaron con el índice de la edición 2026-2027 y se corrigieron manualmente.

Correcciones:

| Campo | PPA | PA | Tema | Rango corregido |
| --- | ---: | ---: | --- | --- |
| Ética, Naturaleza y Sociedades | 11 | 33 | Convivencia sin discriminación y racismo | pp. 302-307 |
| Ética, Naturaleza y Sociedades | 6 | 16 | Importancia de las fuentes históricas | pp. 197-200 |
| Ética, Naturaleza y Sociedades | 8 | 23 | Convivencia sin discriminación y racismo | pp. 302-307 |
| Ética, Naturaleza y Sociedades | 9 | 27 | Convivencia sin discriminación y racismo | pp. 302-307 |
| Lenguajes | 1 | 2 | La diversidad lingüística de México y América Latina | pp. 149-159 |
| Lenguajes | 3 | 9 | Las lenguas indígenas y sus recursos lingüísticos | pp. 122-126 |
| Saberes y Pensamiento Científico | 3 | 7 | Medidas de tendencia central | pp. 100-107 |
| Saberes y Pensamiento Científico | 3 | 8 | Medidas de tendencia central | pp. 100-107 |
| Saberes y Pensamiento Científico | 5 | 15 | Probabilidad | pp. 136-143 |
| Saberes y Pensamiento Científico | 6 | 17 | Obtención y representación de información | pp. 108-119 |
| Saberes y Pensamiento Científico | 6 | 18 | Relaciones lineales | pp. 154-158 |

## Nuestro libro de proyectos y videos

- Se conservaron las páginas exactas de los PA en los tomos I, II y III porque no se detectó un cambio general de paginación.
- 142 videos de PA permanecen con estado `confirmed`.
- 2 videos permanecen con estado `revalidated-specific`.
- No hay PA de primer grado sin video.
- No se detectaron URLs de video repetidas entre dos PA de primer grado.

## Escritura y codificación

- No se detectó el carácter de sustitución Unicode `U+FFFD` en los 48 bundles de primer grado.
- Se restauraron acentos y la letra ñ en los títulos corregidos.
- Los signos de interrogación restantes corresponden a puntuación de títulos o a parámetros legítimos de URLs de YouTube.

## Verificación técnica

- `npm.cmd run build`: correcto.
- Vite 7.3.3 transformó 1596 módulos y generó el HTML estático de Caracoles Resonando.
- La verificación curricular global revisó 144 bundles y 432 PA. Conserva tres incidencias preexistentes en videos PPA de tercer grado (Ética PPA 5, 6 y 7), fuera del alcance de esta auditoría de primer grado.

## Criterio de conservación

No se modificaron horizontes, diseño, selector, videos confirmados ni referencias ambiguas. Los 76 casos de baja confianza permanecen visibles tal como estaban hasta contar con evidencia visual suficiente.
