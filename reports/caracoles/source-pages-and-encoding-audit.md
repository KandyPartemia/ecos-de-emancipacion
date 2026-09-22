# Auditoría de páginas fuente y codificación de Caracoles Resonando

Fecha: 2026-09-21

## Alcance

Se revisaron los 144 bundles públicos de desarrollo curricular y los 432 Proyectos Académicos. La auditoría contrastó las referencias guardadas en cada PA con el manifiesto de 39 materiales fuente localizados en `content/caracoles/source-pdfs/`.

## Cobertura de fuentes

- 432 de 432 PA conservan páginas de `Posibilidades de uso` en `sourceValidation.possibilitiesPages`.
- 432 referencias ubican el PA en el tomo correspondiente de `Nuestro libro de proyectos`.
- 858 referencias enlazan contenidos de los libros de campo formativo.
- 162 referencias enlazan lecturas de `Múltiples Lenguajes`.
- La ausencia de `Múltiples Lenguajes` en otros PA no se trató como error: solo se conserva cuando el archivo de posibilidades asigna una lectura al proyecto.

## Hallazgos y correcciones

1. Se detectaron 277 campos con caracteres dañados por codificación. Aparecían formas como `Validaci?n`, `investigaci?n`, `ling??stica`, `Espa?ola` y `dise?ar`.
2. Se restauraron vocales acentuadas, diéresis, signos de apertura y la letra `ñ` mediante un diccionario explícito y reproducible.
3. La auditoría posterior reporta cero coincidencias de caracteres dañados dentro de palabras.
4. Se encontraron seis referencias con el `materialId` inexistente `grade-1-conceptos-artes-primer-grado`.
5. Las seis referencias correspondían a páginas del libro de Lenguajes de primer grado y fueron reasignadas a `grade-1-conceptos-lenguajes-primer-grado`.
6. Los PA involucrados fueron 1° Lenguajes PA13, PA14, PA20 y PA21.
7. Después de la corrección, las 1,452 referencias estructuradas tienen un material fuente existente y rangos de páginas válidos.

## Criterios de conservación

- No se inventaron páginas ni lecturas.
- No se añadió `Múltiples Lenguajes` a proyectos sin evidencia.
- No se modificaron horizontes, productos, videos, selector ni diseño.
- Los PDF fuente permanecen en el corpus privado de trabajo; la aplicación pública consume únicamente las referencias de libro, tema y páginas necesarias para la ficha.

## Herramientas añadidas

- `scripts/caracoles/audit-source-pages-and-encoding.mjs`: comprueba cobertura y detecta caracteres dañados.
- `scripts/caracoles/repair-curricular-encoding.mjs`: aplica la reparación controlada de codificación sobre los bundles públicos.

## Resultado esperado en la aplicación

La sección `Ubicación en libros` debe mostrar, según corresponda, el tomo y páginas de `Nuestros proyectos`, las páginas del libro del campo formativo y las lecturas confirmadas de `Múltiples Lenguajes`. Los textos curriculares ya no deben presentar signos de interrogación en lugar de acentos o de la letra `ñ`.
