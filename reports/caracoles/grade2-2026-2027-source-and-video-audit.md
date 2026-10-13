# Auditoría de fuentes y videos de segundo grado 2026-2027

Fecha: 2026-10-12

## Alcance

Se revisaron los 144 Proyectos Académicos de segundo grado a partir de los cuatro libros de Posibilidades de uso, los tres tomos de *Nuestro libro de proyectos*, los libros de conceptos de los campos formativos, *Múltiples Lenguajes* e Inglés proporcionados para el ciclo 2026-2027.

La intervención se limitó a segundo grado. No se modificaron horizontes, proyectos de primero o tercero, componentes de interfaz ni asignaciones de video que ya estaban confirmadas.

## Resultado general

- PA revisados: 144.
- Fichas de Posibilidades verificadas: 144.
- PA cuya dosificación ocupa una página: 60.
- PA cuya dosificación ocupa dos páginas: 84.
- Rangos imposibles después de la corrección: 0.
- Etiquetas visibles de página desfasadas: 0.
- Archivos con caracteres de reemplazo `�`: 0.
- Palabras con `?` incrustado en lugar de `ñ`: 0.
- Grupos de videos PA duplicados: 0.

## Paginación de fuentes

Los tres tomos de *Nuestro libro de proyectos* conservan la paginación utilizada por los bundles. La principal variación editorial se encontró en el libro 2026-2027 de Lenguajes: numerosos contenidos fueron reordenados aunque conservaron su texto.

Se actualizaron 128 referencias de Lenguajes mediante coincidencia página a página. La aceptación automática exigió una secuencia completa, consecutiva y una coincidencia mínima de 80 %. Otras 21 referencias de Lenguajes se resolvieron manualmente mediante los encabezados y el índice del libro.

También se corrigieron ocho rangos antiguos claramente dañados por concatenación u OCR, entre ellos:

- De lo Humano y lo Comunitario, PA17: `127-1230` pasó a `127-130`.
- Ética, PA1: `28-234` pasó a `28-35`.
- Lenguajes, PA14: `200-2002` pasó a `195-197` en la edición nueva.
- Saberes, PA15: `27-289` pasó a `278-289` para el apartado “Dinámica”.

Se añadieron 15 referencias de conceptos que estaban omitidas en la estructura. Las referencias de Lenguajes añadidas también fueron trasladadas a la paginación de la edición 2026-2027.

Se completaron títulos truncados como:

- “La interpretación de textos literarios: análisis y disfrute”.
- “La autobiografía y la crónica como vehículos para el conocimiento personal y comunitario”.
- “Recolección, registro, análisis y comunicación de datos”.

## Videos de Proyecto Académico

- `confirmed`: 40.
- `revalidated-specific`: 103.
- `not-found`: 1.

El único caso sin video es 2° Ética, PA12, “La igualdad en el marco de la interculturalidad”. El video anterior fue dado de baja. Se conserva `not-found`, sin URL, para no sustituirlo con un recurso no validado.

Los PDF de *Nuestro libro de proyectos* no contienen anotaciones o hipervínculos directos que permitan recuperar un reemplazo específico para ese PA. Por ello no se inventó ni reasignó ningún video.

## Archivos modificados

Se actualizaron 25 bundles de segundo grado:

- 3 bundles de De lo Humano y lo Comunitario.
- 1 bundle de Ética, Naturaleza y Sociedades.
- 15 bundles de Lenguajes.
- 6 bundles de Saberes y Pensamiento Científico.

Scripts de auditoría y aplicación:

- `scripts/caracoles/apply-grade2-source-book-confirmations.mjs`
- `scripts/caracoles/remap-grade2-2026-concept-pages.py`
- `scripts/caracoles/apply-grade2-2026-reviewed-page-corrections.mjs`

## Verificación

`npm.cmd run build` terminó correctamente con Vite 7.3.3 y generó el HTML estático de Caracoles Resonando.

El verificador curricular global revisó 432 PA. Reportó tres inconsistencias preexistentes de video PPA en 3° Ética, PPA 5, 6 y 7. No corresponden al alcance de segundo grado y no fueron modificadas en esta auditoría.

## Criterio de conservación

No se cambió una referencia cuando la evidencia no permitía asignarla con seguridad. No se usaron objetivos, páginas o videos de otro PA para completar fichas. Las asignaciones ya confirmadas se conservaron, salvo correcciones demostrables de paginación o texto truncado.
