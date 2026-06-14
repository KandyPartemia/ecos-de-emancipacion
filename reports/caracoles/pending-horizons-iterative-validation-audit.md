# Auditoria iterativa de horizontes pendientes

Fecha: 2026-06-09

## Alcance

Muestra controlada sobre proyectos que aun aparecian como Horizonte pendiente de validacion en fuente. No se ejecuto un bucle infinito: se recorrio una lista finita de 15 casos, cinco por grado.

No se tocaron header movil, memorama, SEO, mapa mental, Ingles, videos, selector, package.json ni package-lock.json.

## Conteo de muestra

- Pendientes disponibles antes de seleccionar muestra: 116
- Pendientes revisados en la muestra: 15
- Confirmados: 8
- En revision: 7
- No encontrados: 0

## Reglas usadas

- Solo se leyo el rango exacto de `sourcePages.nuestroLibroProyectos` del PA.
- Se exigio coincidencia del titulo o numero de Proyecto Academico dentro del rango OCR.
- Se aceptaron `Horizonte de expectativas`, `Horizonte de expectativa`, `Objetivo`, `Objetivo 1` y `Objetivo 2` solo dentro del PA.
- Cuando aparecieron `Objetivo 1` y `Objetivo 2` como par, ambos textos se unieron y se conservaron los rotulos.
- Los casos con OCR mezclado, objetivo de PPA o sin separacion clara quedaron sin confirmar.

## Archivos modificados

- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-1.json`
- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-1.json`
- `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-3-de-lo-humano-y-lo-comunitario-ppa-3.json`
- `public/caracoles/data/curricular-development/grade-3-de-lo-humano-y-lo-comunitario-ppa-4.json`
- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-1.json`
- `reports/caracoles/pending-horizons-iterative-validation-audit.md`

## Casos revisados

### 1. 1o / De lo Humano y lo Comunitario / PPA 1 / PA1

- Titulo: Sin metas no hay futuro
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 264-268
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Redactar un borrador del proyecto de vida con el horizonte de expectativas a corto, mediano y largo plazo donde que consideren las habilidades, intereses y necesidades personales y colectivas. Objetivo 2: Reconocer qué es un proyecto de vida y definir las metas deseadas de manera individual y colectiva para redactar un borrador.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-1.json`

### 2. 1o / De lo Humano y lo Comunitario / PPA 1 / PA2

- Titulo: Me conozco, reconozco y lo expreso
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 269-272
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-1.json`

### 3. 1o / De lo Humano y lo Comunitario / PPA 1 / PA3

- Titulo: Un momento divertido para decidir
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 273-277
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-1.json`

### 4. 1o / De lo Humano y lo Comunitario / PPA 2 / PA4

- Titulo: La innovacion como medio de mejora
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 280-284
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Recabar información sobre los procesos tecnológicos y las herramientas locales para identificar sus ventajas. Objetivo 2: Presentar las ventajas de los procesos tecnológicos y las herramientas locales de la comunidad para superar prejuicios y estereotipos.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-2.json`

### 5. 1o / De lo Humano y lo Comunitario / PPA 2 / PA5

- Titulo: Un coloquio local
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 286-290
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-2.json`

### 6. 2o / De lo Humano y lo Comunitario / PPA 1 / PA2

- Titulo: ¡Para actuar necesitamos un plan!
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 253-256
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar las problemáticas de la comunidad para determinar un plan de acción que genere alternativas de solución. Objetivo 2: Buscar que la aplicación del plan de acción favorezca el bienestar individual y colectivo.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-1.json`

### 7. 2o / De lo Humano y lo Comunitario / PPA 2 / PA5

- Titulo: Alternativas para una solución
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 267-270
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-2.json`

### 8. 2o / De lo Humano y lo Comunitario / PPA 2 / PA6

- Titulo: ¡Pienso, reciclo y convierto!
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 271-275
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Establecer un plan económico de reutilización donde se promueva el consumo responsable de materiales dentro de la entidad con la finalidad de obtener bienestar social y personal. Objetivo 2: Diseñar las estrategias de un plan económico de reutilización orientado al consumo responsable y al desecho adecuado de sustancias.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-2.json`

### 9. 2o / De lo Humano y lo Comunitario / PPA 3 / PA7

- Titulo: ¡Adiós riesgos, hola prevención!
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 219-223
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-3.json`

### 10. 2o / De lo Humano y lo Comunitario / PPA 5 / PA14

- Titulo: Cambiemos el rol para pensar distinto
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 235-238
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-5.json`

### 11. 3o / De lo Humano y lo Comunitario / PPA 3 / PA7

- Titulo: Así lo identificamos, así lo prevenimos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 233-237
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar una tabla de reconocimiento de los riesgos que observamos en la comunidad para prevenir daños a nosotros, a la comunidad y al medio ambiente. Objetivo 2: Reconocer los factores de riesgo para la salud, la seguridad y el medio ambiente que están presentes en la comunidad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-de-lo-humano-y-lo-comunitario-ppa-3.json`

### 12. 3o / De lo Humano y lo Comunitario / PPA 4 / PA10

- Titulo: Una muestra de prevención
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 249-253
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar un muestrario funcional con los riesgos del entorno para prevenir daños para las personas, la comunidad y el medio ambiente. Objetivo 2: Difundir, por medio de un muestrario funcional, el tipo de riesgos a los que está expuesta la comunidad, con el fin de prevenirlos.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-de-lo-humano-y-lo-comunitario-ppa-4.json`

### 13. 3o / De lo Humano y lo Comunitario / PPA 4 / PA11

- Titulo: Energía disponible
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 254-257
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar un prototipo de energía sustentable que permita disminuir el uso de combustibles fósiles, para obtener mayor bienestar personal y social en diferentes situaciones y contextos. Objetivo 2: Compartir información acerca de los daños para la salud y el medio ambiente causados por el uso de combustibles fósiles.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-de-lo-humano-y-lo-comunitario-ppa-4.json`

### 14. 3o / Etica, Naturaleza y Sociedades / PPA 1 / PA1

- Titulo: Proceso de hominización
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 187-192
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-1.json`

### 15. 3o / Etica, Naturaleza y Sociedades / PPA 1 / PA2

- Titulo: El surgimiento de la civilización
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 193-197
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Identificar las características económicas, culturales y ambientales de las primeras civilizaciones del mundo, resultado de su relación con el agua y su gestión; además, dibujar imágenes o conseguir ilustraciones para visualizar esa relación. Objetivo 2: Reconocer el papel civilizatorio que tuvo la gestión del agua en las primeras civilizaciones del mundo, y su relación con el lugar donde se asentaron. También, necesitamos elaborar ilustraciones que ayuden a entender el contenido.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-1.json`

## Objetivo 1 + Objetivo 2 unidos

- 1o De lo Humano y lo Comunitario PA1: Sin metas no hay futuro
- 1o De lo Humano y lo Comunitario PA4: La innovacion como medio de mejora
- 2o De lo Humano y lo Comunitario PA2: ¡Para actuar necesitamos un plan!
- 2o De lo Humano y lo Comunitario PA6: ¡Pienso, reciclo y convierto!
- 3o De lo Humano y lo Comunitario PA7: Así lo identificamos, así lo prevenimos
- 3o De lo Humano y lo Comunitario PA10: Una muestra de prevención
- 3o De lo Humano y lo Comunitario PA11: Energía disponible
- 3o Etica, Naturaleza y Sociedades PA2: El surgimiento de la civilización

## Casos rechazados por PPA completo

- No se detectaron objetivos de PPA completo en esta muestra.

## Verificacion visual en localhost

- Build ejecutado con `npm.cmd run build`: correcto. Vite solo mostro advertencia de tamano de chunk.
- `1o / De lo Humano y lo Comunitario / PA1 - Sin metas no hay futuro`: muestra `HORIZONTE DE EXPECTATIVA CONFIRMADO`, texto de `Objetivo 1` y `Objetivo 2`, y fuente `Nuestro libro de proyectos Tomo I p. 266`.
- `1o / De lo Humano y lo Comunitario / PA4`: muestra horizonte confirmado, objetivos unidos y fuente `Nuestro libro de proyectos Tomo I p. 282`.
- `2o / De lo Humano y lo Comunitario / PA2`: muestra horizonte confirmado, objetivos unidos y fuente `Nuestro libro de proyectos Tomo I p. 254`.
- `2o / De lo Humano y lo Comunitario / PA6`: muestra horizonte confirmado, objetivos unidos y fuente `Nuestro libro de proyectos Tomo I p. 272`.
- `3o / De lo Humano y lo Comunitario / PA7`: muestra horizonte confirmado, objetivos unidos y fuente `Nuestro libro de proyectos Tomo II p. 234`.
- `3o / De lo Humano y lo Comunitario / PA10`: muestra horizonte confirmado, objetivos unidos y fuente `Nuestro libro de proyectos Tomo II p. 250`.
- `3o / De lo Humano y lo Comunitario / PA11`: muestra horizonte confirmado, objetivos unidos y fuente `Nuestro libro de proyectos Tomo II p. 255`.
- `1o / De lo Humano y lo Comunitario / PA2` se reviso como control de no confirmacion: permanece pendiente, sin contaminarse con PA1.
- `3o / Etica, Naturaleza y Sociedades / PA2` quedo confirmado en datos, pero la combinacion no aparece disponible en el selector publico actual; requiere revisar disponibilidad del selector antes de una verificacion visual directa.

## Recomendacion

Ampliar al resto de pendientes por lotes pequenos, conservando evidencia por caso. Los confirmados por Objetivo 1 + Objetivo 2 son aptos para publicacion; los casos `needsReview_*` requieren inspeccion visual de pagina antes de modificar bundles.

## Lote 1 - 2026-06-13

### Alcance del lote

Se procesaron los primeros 20 PA pendientes actuales, ordenados por grado, tomo, PPA y PA. Se mantuvieron las mismas reglas de la muestra inicial.

### Conteo del lote

- Pendientes disponibles al iniciar este lote: 100
- Pendientes revisados en este lote: 20
- Confirmados: 8
- En revision: 12
- No encontrados: 0

### Archivos modificados en este lote

- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-3.json`
- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-4.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-3.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-4.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-7.json`

### Casos revisados en este lote

#### 1. 1o / De lo Humano y lo Comunitario / PPA 1 / PA2

- Titulo: Me conozco, reconozco y lo expreso
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 269-272
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-1.json`

#### 2. 1o / De lo Humano y lo Comunitario / PPA 1 / PA3

- Titulo: Un momento divertido para decidir
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 273-277
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-1.json`

#### 3. 1o / Etica, Naturaleza y Sociedades / PPA 2 / PA4

- Titulo: Dos son mas peligrosos
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 209-212
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR mezcla texto curricular con cartografia u otros elementos visuales.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-2.json`

#### 4. 1o / De lo Humano y lo Comunitario / PPA 2 / PA5

- Titulo: Un coloquio local
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 286-290
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Rescatar las experiencias de diversos actores de la comunidad sobre el uso y construcción de las herramientas locales que sirvan para afrontar situaciones cotidianas individuales y colectivas. Objetivo 2: Identificar las necesidades y problemáticas del territorio susceptibles de resolverse a partir de herramientas locales.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-2.json`

#### 5. 1o / Etica, Naturaleza y Sociedades / PPA 2 / PA5

- Titulo: Movimiento bajo nuestros pies
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 213-217
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-2.json`

#### 6. 1o / Etica, Naturaleza y Sociedades / PPA 2 / PA6

- Titulo: Reduccion y prevencion de desastres
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 218-222
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-2.json`

#### 7. 1o / Etica, Naturaleza y Sociedades / PPA 3 / PA7

- Titulo: De la multitud a la comunidad
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 226-230
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-3.json`

#### 8. 1o / Etica, Naturaleza y Sociedades / PPA 3 / PA8

- Titulo: Paso de fronteras
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 232-235
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Reconocer los movimientos y flujos migratorios en la comunidad para presentarlos mediante una exposición donde se analicen las causas y las consecuencias en el espacio geográfico. Objetivo 2: Identificar los flujos migratorios a través de la historia de México, sus causas y consecuencias para presentarlos en una breve exposición.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-3.json`

#### 9. 1o / Etica, Naturaleza y Sociedades / PPA 3 / PA9

- Titulo: Celebrando la riqueza cultural de Mexico
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 236-240
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-3.json`

#### 10. 1o / Etica, Naturaleza y Sociedades / PPA 4 / PA11

- Titulo: Construir un futuro mas justo
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 250-253
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Plasmar en un periódico mural el vínculo entre desigualdad económica y los problemas medioambientales del entorno. Objetivo 2: Exponer en un periódico mural los diferentes problemas del medio ambiente y su relación con los problemas de salud de la población.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-4.json`

#### 11. 1o / Etica, Naturaleza y Sociedades / PPA 4 / PA12

- Titulo: Hacia un futuro sostenible
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 254-258
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Explicar el concepto de sustentabilidad en una mesa redonda, donde se den a conocer acciones y prácticas que sean amigables con el medio ambiente y el uso adecuado de los recursos naturales. Objetivo 2: Diferenciar los conceptos de sustentabilidad y sostenibilidad mediante una mesa redonda donde se dialogue sobre cómo algunas prácticas contribuyen al uso racional de los recursos y a minimizar el impacto sobre el medio ambiente.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-4.json`

#### 12. 1o / De lo Humano y lo Comunitario / PPA 3 / PA7

- Titulo: Taller estudiantil del autoconocimiento
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 228-232
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-3.json`

#### 13. 1o / De lo Humano y lo Comunitario / PPA 3 / PA8

- Titulo: Mi guia personal de prevencion de riesgos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 233-236
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar de manera colectiva sobre prejuicios, estereotipos, violencias y adicciones para identificar situaciones de riesgo para la salud, la seguridad y el medio ambiente con el propósito de elaborar una guía personal que promueva acciones para el cuidado de la integridad. Objetivo 2: Presentar en conjunto una guía personal sobre las acciones que deben atenderse en favor del bienestar personal y colectivo, superando los prejuicios, estereotipos, violencias y adicciones.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-3.json`

#### 14. 1o / De lo Humano y lo Comunitario / PPA 3 / PA9

- Titulo: Descubro mis fortalezas, debilidades y potencialidades
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 237-241
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-3.json`

#### 15. 1o / De lo Humano y lo Comunitario / PPA 4 / PA10

- Titulo: Herramientas y maquinas en mi comunidad
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 244-247
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-4.json`

#### 16. 1o / De lo Humano y lo Comunitario / PPA 4 / PA11

- Titulo: La prevencion ante riesgos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 248-251
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Realizar un encuentro estudiantil para identificar las situaciones de riesgo a las que se está expuesto en el trayecto a la escuela y en la vida cotidiana. Objetivo 2: Identificar, mediante un encuentro estudiantil, los factores socioambientales y factores bioclimáticos que afectan a la comunidad y reconocer la importancia de las herramientas que sirven como apoyo para prevenir los riesgos que ello ocasiona.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-4.json`

#### 17. 1o / De lo Humano y lo Comunitario / PPA 4 / PA12

- Titulo: Mi comunidad a traves de un mural
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 252-256
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar, desde fuentes directas, algunos procesos productivos relevantes en la comunidad. Objetivo 2: Además, sus formas de organización, medios materiales, energía, conocimientos y saberes. Seleccionar el proceso productivo más importante para expresarlo en un mural hecho con hojas de papel que muestre la vinculación con la sociedad, cultura y naturaleza. Elaborar, a partir de la investigación de procesos productivos artísticos, un mural que muestre las formas de organización, medios materiales, energía, conocimientos y saberes de los procesos artísticos relevantes en la comunidad; incluir la relación que guardan con la cultura social y la naturaleza.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-4.json`

#### 18. 1o / Etica, Naturaleza y Sociedades / PPA 6 / PA18

- Titulo: Que me cuenta la vestimenta?
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 186-190
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-6.json`

#### 19. 1o / Etica, Naturaleza y Sociedades / PPA 7 / PA19

- Titulo: Revisemos el pasado
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 194-197
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Determinar, en comunidad áulica, las fuentes de información confiables sobre los sucesos acontecidos en la comunidad. Objetivo 2: Construir un conocimiento amplio sobre los sucesos pasados de la comunidad, a partir del entendimiento de que existen diferentes perspectivas de un mismo acontecimiento, las cuales no se contraponen, sino que ofrecen diferentes ideas que enriquecen el entendimiento de dichos sucesos.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-7.json`

#### 20. 1o / Etica, Naturaleza y Sociedades / PPA 7 / PA20

- Titulo: El juego de pelota en Mesoamerica
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 198-202
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-7.json`

### Confirmados del lote

- 1o De lo Humano y lo Comunitario PA5: Un coloquio local. Texto: Objetivo 1: Rescatar las experiencias de diversos actores de la comunidad sobre el uso y construcción de las herramientas locales que sirvan para afrontar situaciones cotidianas individuales y colectivas. Objetivo 2: Identificar las necesidades y problemáticas del territorio susceptibles de resolverse a partir de herramientas locales.
- 1o Etica, Naturaleza y Sociedades PA8: Paso de fronteras. Texto: Objetivo 1: Reconocer los movimientos y flujos migratorios en la comunidad para presentarlos mediante una exposición donde se analicen las causas y las consecuencias en el espacio geográfico. Objetivo 2: Identificar los flujos migratorios a través de la historia de México, sus causas y consecuencias para presentarlos en una breve exposición.
- 1o Etica, Naturaleza y Sociedades PA11: Construir un futuro mas justo. Texto: Objetivo 1: Plasmar en un periódico mural el vínculo entre desigualdad económica y los problemas medioambientales del entorno. Objetivo 2: Exponer en un periódico mural los diferentes problemas del medio ambiente y su relación con los problemas de salud de la población.
- 1o Etica, Naturaleza y Sociedades PA12: Hacia un futuro sostenible. Texto: Objetivo 1: Explicar el concepto de sustentabilidad en una mesa redonda, donde se den a conocer acciones y prácticas que sean amigables con el medio ambiente y el uso adecuado de los recursos naturales. Objetivo 2: Diferenciar los conceptos de sustentabilidad y sostenibilidad mediante una mesa redonda donde se dialogue sobre cómo algunas prácticas contribuyen al uso racional de los recursos y a minimizar el impacto sobre el medio ambiente.
- 1o De lo Humano y lo Comunitario PA8: Mi guia personal de prevencion de riesgos. Texto: Objetivo 1: Investigar de manera colectiva sobre prejuicios, estereotipos, violencias y adicciones para identificar situaciones de riesgo para la salud, la seguridad y el medio ambiente con el propósito de elaborar una guía personal que promueva acciones para el cuidado de la integridad. Objetivo 2: Presentar en conjunto una guía personal sobre las acciones que deben atenderse en favor del bienestar personal y colectivo, superando los prejuicios, estereotipos, violencias y adicciones.
- 1o De lo Humano y lo Comunitario PA11: La prevencion ante riesgos. Texto: Objetivo 1: Realizar un encuentro estudiantil para identificar las situaciones de riesgo a las que se está expuesto en el trayecto a la escuela y en la vida cotidiana. Objetivo 2: Identificar, mediante un encuentro estudiantil, los factores socioambientales y factores bioclimáticos que afectan a la comunidad y reconocer la importancia de las herramientas que sirven como apoyo para prevenir los riesgos que ello ocasiona.
- 1o De lo Humano y lo Comunitario PA12: Mi comunidad a traves de un mural. Texto: Objetivo 1: Investigar, desde fuentes directas, algunos procesos productivos relevantes en la comunidad. Objetivo 2: Además, sus formas de organización, medios materiales, energía, conocimientos y saberes. Seleccionar el proceso productivo más importante para expresarlo en un mural hecho con hojas de papel que muestre la vinculación con la sociedad, cultura y naturaleza. Elaborar, a partir de la investigación de procesos productivos artísticos, un mural que muestre las formas de organización, medios materiales, energía, conocimientos y saberes de los procesos artísticos relevantes en la comunidad; incluir la relación que guardan con la cultura social y la naturaleza.
- 1o Etica, Naturaleza y Sociedades PA19: Revisemos el pasado. Texto: Objetivo 1: Determinar, en comunidad áulica, las fuentes de información confiables sobre los sucesos acontecidos en la comunidad. Objetivo 2: Construir un conocimiento amplio sobre los sucesos pasados de la comunidad, a partir del entendimiento de que existen diferentes perspectivas de un mismo acontecimiento, las cuales no se contraponen, sino que ofrecen diferentes ideas que enriquecen el entendimiento de dichos sucesos.

### Casos en revision del lote

- 1o De lo Humano y lo Comunitario PA2: Me conozco, reconozco y lo expreso (needsReview_ocr).
- 1o De lo Humano y lo Comunitario PA3: Un momento divertido para decidir (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA4: Dos son mas peligrosos (needsReview_visual_mix).
- 1o Etica, Naturaleza y Sociedades PA5: Movimiento bajo nuestros pies (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA6: Reduccion y prevencion de desastres (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA7: De la multitud a la comunidad (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA9: Celebrando la riqueza cultural de Mexico (needsReview_ocr).
- 1o De lo Humano y lo Comunitario PA7: Taller estudiantil del autoconocimiento (needsReview_ocr).
- 1o De lo Humano y lo Comunitario PA9: Descubro mis fortalezas, debilidades y potencialidades (needsReview_ocr).
- 1o De lo Humano y lo Comunitario PA10: Herramientas y maquinas en mi comunidad (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA18: Que me cuenta la vestimenta? (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA20: El juego de pelota en Mesoamerica (needsReview_ocr).

## Lote 2 - 2026-06-13

### Alcance del lote

Se procesaron los primeros 20 PA pendientes actuales, ordenados por grado, tomo, PPA y PA. Se mantuvieron las mismas reglas de la muestra inicial.

### Conteo del lote

- Pendientes disponibles al iniciar este lote: 100
- Pendientes revisados en este lote: 20
- Confirmados: 12
- En revision: 8
- No encontrados: 0

### Archivos modificados en este lote

- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-5.json`
- `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-6.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-10.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-12.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-8.json`
- `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-9.json`
- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-1.json`
- `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-1.json`

### Casos revisados en este lote

#### 1. 1o / Etica, Naturaleza y Sociedades / PPA 8 / PA22

- Titulo: El pez grande no se llena, siempre quiere comer mas
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 210-214
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Organizar un fichero portátil con información sobre los procesos de dominación que han vivido los pueblos originarios y afromexicanos. Objetivo 2: Entender por qué los procesos de dominación ocasionaron agravios hacia los pueblos originarios y afromexicanos.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-8.json`

#### 2. 1o / Etica, Naturaleza y Sociedades / PPA 8 / PA23

- Titulo: Respeto a la diversidad cultural
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 215-218
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-8.json`

#### 3. 1o / Etica, Naturaleza y Sociedades / PPA 8 / PA24

- Titulo: Aqui vivimos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 219-223
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-8.json`

#### 4. 1o / De lo Humano y lo Comunitario / PPA 5 / PA13

- Titulo: Un plan personal de vida activa y saludable
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 224-228
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar las características y los principios de los hábitos activos y saludables que se incluyen en el desarrollo de un plan personal, para llevarlos a la práctica, y así lograr una mejora en el bienestar colectivo. Objetivo 2: Diseñar y compartir, en comunidad, un plan personal de actividad física, con acciones novedosas, motivantes y dinámicas para incentivar la realización de actividad física en diversos lugares y momentos del día.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-5.json`

#### 5. 1o / De lo Humano y lo Comunitario / PPA 5 / PA14

- Titulo: Mi plan estrategico familiar de vida activa y saludable
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 229-232
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Diseñar un plan familiar estratégico de vida activa y saludable, donde se personalicen las acciones que realizará cada uno de los integrantes de la familia, de acuerdo con sus intereses, necesidades, posibilidades y potencialidades. Objetivo 2: Diseñar un plan familiar estratégico de vida activo y saludable, donde se generalicen las acciones que realizarán todos los integrantes de la familia, a partir de encontrar intereses, necesidades, posibilidades y potencialidades que les sean comunes.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-5.json`

#### 6. 1o / De lo Humano y lo Comunitario / PPA 5 / PA15

- Titulo: Un caso para reflexionar
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 233-237
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Identificar situaciones del entorno cercano que vulneren y dañen la dignidad, la libertad y el respeto a la diversidad. Objetivo 2: Determinar un estudio de caso para favorecer ambientes dignos caracterizados por la dignidad, la libertad y la diversidad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-5.json`

#### 7. 1o / De lo Humano y lo Comunitario / PPA 6 / PA16

- Titulo: Un momento para innovar
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 240-243
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar una dinámica alternativa para identificar los significados de potencial personal y potencial colectivo, y favorecer el bienestar personal y el de los demás. Objetivo 2: Recopilar información sobre algunas dinámicas alternativas de la comunidad para generar un bienestar personal y comunitario, con el fin de elaborar una propuesta propia.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-6.json`

#### 8. 1o / De lo Humano y lo Comunitario / PPA 6 / PA17

- Titulo: Evaluacion y mejora de un proceso tecnico
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 244-247
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Recabar información sobre los procesos técnicos, su desarrollo y su evaluación. Objetivo 2: Investigar los conceptos de eficiencia, eficacia, fiabilidad y factibilidad, para elaborar un proyecto de alternativas innovadoras de mejora. Presentar en plenaria el desarrollo de un proyecto de alternativas innovadoras donde se vean reflejados los procesos técnicos, su desarrollo, su evaluación y los conceptos de eficiencia, eficacia, fiabilidad y factibilidad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-de-lo-humano-y-lo-comunitario-ppa-6.json`

#### 9. 1o / Etica, Naturaleza y Sociedades / PPA 9 / PA25

- Titulo: Las mujeres en defensa de sus derechos!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 162-165
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Realizar un cuadro revelador sobre la participación de las mujeres en la sociedad en diversos momentos y lugares. Objetivo 2: Destacar su protagonismo social y los testimonios de algunas de ellas para ilustrar las luchas por sus derechos. Recopilar e integrar la información sobre la participación de las mujeres en la sociedad en diversos momentos y lugares, su protagonismo social y los testimonios de algunas de ellas para ilustrar las luchas por sus derechos en un cuadro revelador.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-9.json`

#### 10. 1o / Etica, Naturaleza y Sociedades / PPA 9 / PA26

- Titulo: Promovamos la igualdad!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 166-169
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-9.json`

#### 11. 1o / Etica, Naturaleza y Sociedades / PPA 9 / PA27

- Titulo: Voces contra la violencia
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 170-174
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-9.json`

#### 12. 1o / Etica, Naturaleza y Sociedades / PPA 10 / PA29

- Titulo: El quehacer de las personas a lo largo del tiempo!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 182-185
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Identificar, de manera cronológica, los diferentes roles y actividades que se han asignado a las personas de acuerdo con la edad. Objetivo 2: Reflexionar sobre cómo se han relacionado con las ideas y representaciones de la sociedad para presentarlo en una exposición alusiva. Analizar las representaciones, ideas, prejuicios y creencias en la comunidad con respecto a niñas, niños y jóvenes. Asimismo, exponer si han sido iguales o diferentes en otros tiempos por medio de una exposición alusiva.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-10.json`

#### 13. 1o / Etica, Naturaleza y Sociedades / PPA 10 / PA30

- Titulo: Celebremos la diversidad cultural: valoremos nuestras diferencias!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 186-190
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-10.json`

#### 14. 1o / Etica, Naturaleza y Sociedades / PPA 11 / PA31

- Titulo: Recordar la historia para no repetirla!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 194-197
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-11.json`

#### 15. 1o / Etica, Naturaleza y Sociedades / PPA 12 / PA34

- Titulo: Mis decisiones, mi democracia
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 208-211
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-12.json`

#### 16. 1o / Etica, Naturaleza y Sociedades / PPA 12 / PA35

- Titulo: Nuestros representantes, nos representan?
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 212-215
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Localizar información, en distintas fuentes, que permita identificar cuáles son las actividades desempeñadas por los servidores públicos en nuestra comunidad, para presentarla en diagramas de imágenes. Objetivo 2: Por medio de diagramas de imágenes, promover la participación ciudadana con base en el conocimiento de cómo los recursos públicos pueden beneficiar a la sociedad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-12.json`

#### 17. 1o / Etica, Naturaleza y Sociedades / PPA 12 / PA36

- Titulo: Me expreso y participo!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 216-220
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Crear una lista de compromisos como estudiantes, y algunas propuestas de acciones que nos lleven a ser ciudadanos participativos y presentes en las decisiones que competen a la comunidad, mediante la localización y el conocimiento de los organismos, instituciones y políticas nacionales que hacen posible la democracia. Objetivo 2: Localizar la información sobre organismos, instituciones y políticas nacionales que hacen posible la democracia y, a partir de ahí, elaborar una lista de compromisos que nos haga presentes en las decisiones comunitarias.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-1-etica-naturaleza-y-sociedades-ppa-12.json`

#### 18. 2o / Etica, Naturaleza y Sociedades / PPA 1 / PA1

- Titulo: Noticias del otro lado del Atlántico
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 187-191
- Estado: needsReview_visual_mix
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR mezcla texto curricular con cartografia u otros elementos visuales.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-1.json`

#### 19. 2o / Saberes y Pensamiento Cientifico / PPA 1 / PA1

- Titulo: Nuestra comunidad en gráficas
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 111-115
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Recabar información para contar con datos que permitan llevar a cabo la construcción de gráficas. Objetivo 2: Dominar el proceso de representar, por medio de gráficas, las medidas de tendencia central de los datos de nuestra comunidad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-1.json`

#### 20. 2o / Etica, Naturaleza y Sociedades / PPA 1 / PA2

- Titulo: El pensamiento de los pueblos originarios de América en 1492
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 192-195
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Analizar las acciones que llevaron a cabo los españoles en las Antillas, de acuerdo con sus ideales y valores, para identificar las repercusiones de sus actos hacia la población nativa. Objetivo 2: Conocer cómo actuaron los habitantes de los pueblos originarios de las Antillas ante la invasión europea, para identificar sus pensamientos y actos en defensa de su identidad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-1.json`

### Confirmados del lote

- 1o Etica, Naturaleza y Sociedades PA22: El pez grande no se llena, siempre quiere comer mas. Texto: Objetivo 1: Organizar un fichero portátil con información sobre los procesos de dominación que han vivido los pueblos originarios y afromexicanos. Objetivo 2: Entender por qué los procesos de dominación ocasionaron agravios hacia los pueblos originarios y afromexicanos.
- 1o De lo Humano y lo Comunitario PA13: Un plan personal de vida activa y saludable. Texto: Objetivo 1: Investigar las características y los principios de los hábitos activos y saludables que se incluyen en el desarrollo de un plan personal, para llevarlos a la práctica, y así lograr una mejora en el bienestar colectivo. Objetivo 2: Diseñar y compartir, en comunidad, un plan personal de actividad física, con acciones novedosas, motivantes y dinámicas para incentivar la realización de actividad física en diversos lugares y momentos del día.
- 1o De lo Humano y lo Comunitario PA14: Mi plan estrategico familiar de vida activa y saludable. Texto: Objetivo 1: Diseñar un plan familiar estratégico de vida activa y saludable, donde se personalicen las acciones que realizará cada uno de los integrantes de la familia, de acuerdo con sus intereses, necesidades, posibilidades y potencialidades. Objetivo 2: Diseñar un plan familiar estratégico de vida activo y saludable, donde se generalicen las acciones que realizarán todos los integrantes de la familia, a partir de encontrar intereses, necesidades, posibilidades y potencialidades que les sean comunes.
- 1o De lo Humano y lo Comunitario PA15: Un caso para reflexionar. Texto: Objetivo 1: Identificar situaciones del entorno cercano que vulneren y dañen la dignidad, la libertad y el respeto a la diversidad. Objetivo 2: Determinar un estudio de caso para favorecer ambientes dignos caracterizados por la dignidad, la libertad y la diversidad.
- 1o De lo Humano y lo Comunitario PA16: Un momento para innovar. Texto: Objetivo 1: Elaborar una dinámica alternativa para identificar los significados de potencial personal y potencial colectivo, y favorecer el bienestar personal y el de los demás. Objetivo 2: Recopilar información sobre algunas dinámicas alternativas de la comunidad para generar un bienestar personal y comunitario, con el fin de elaborar una propuesta propia.
- 1o De lo Humano y lo Comunitario PA17: Evaluacion y mejora de un proceso tecnico. Texto: Objetivo 1: Recabar información sobre los procesos técnicos, su desarrollo y su evaluación. Objetivo 2: Investigar los conceptos de eficiencia, eficacia, fiabilidad y factibilidad, para elaborar un proyecto de alternativas innovadoras de mejora. Presentar en plenaria el desarrollo de un proyecto de alternativas innovadoras donde se vean reflejados los procesos técnicos, su desarrollo, su evaluación y los conceptos de eficiencia, eficacia, fiabilidad y factibilidad.
- 1o Etica, Naturaleza y Sociedades PA25: Las mujeres en defensa de sus derechos!. Texto: Objetivo 1: Realizar un cuadro revelador sobre la participación de las mujeres en la sociedad en diversos momentos y lugares. Objetivo 2: Destacar su protagonismo social y los testimonios de algunas de ellas para ilustrar las luchas por sus derechos. Recopilar e integrar la información sobre la participación de las mujeres en la sociedad en diversos momentos y lugares, su protagonismo social y los testimonios de algunas de ellas para ilustrar las luchas por sus derechos en un cuadro revelador.
- 1o Etica, Naturaleza y Sociedades PA29: El quehacer de las personas a lo largo del tiempo!. Texto: Objetivo 1: Identificar, de manera cronológica, los diferentes roles y actividades que se han asignado a las personas de acuerdo con la edad. Objetivo 2: Reflexionar sobre cómo se han relacionado con las ideas y representaciones de la sociedad para presentarlo en una exposición alusiva. Analizar las representaciones, ideas, prejuicios y creencias en la comunidad con respecto a niñas, niños y jóvenes. Asimismo, exponer si han sido iguales o diferentes en otros tiempos por medio de una exposición alusiva.
- 1o Etica, Naturaleza y Sociedades PA35: Nuestros representantes, nos representan?. Texto: Objetivo 1: Localizar información, en distintas fuentes, que permita identificar cuáles son las actividades desempeñadas por los servidores públicos en nuestra comunidad, para presentarla en diagramas de imágenes. Objetivo 2: Por medio de diagramas de imágenes, promover la participación ciudadana con base en el conocimiento de cómo los recursos públicos pueden beneficiar a la sociedad.
- 1o Etica, Naturaleza y Sociedades PA36: Me expreso y participo!. Texto: Objetivo 1: Crear una lista de compromisos como estudiantes, y algunas propuestas de acciones que nos lleven a ser ciudadanos participativos y presentes en las decisiones que competen a la comunidad, mediante la localización y el conocimiento de los organismos, instituciones y políticas nacionales que hacen posible la democracia. Objetivo 2: Localizar la información sobre organismos, instituciones y políticas nacionales que hacen posible la democracia y, a partir de ahí, elaborar una lista de compromisos que nos haga presentes en las decisiones comunitarias.
- 2o Saberes y Pensamiento Cientifico PA1: Nuestra comunidad en gráficas. Texto: Objetivo 1: Recabar información para contar con datos que permitan llevar a cabo la construcción de gráficas. Objetivo 2: Dominar el proceso de representar, por medio de gráficas, las medidas de tendencia central de los datos de nuestra comunidad.
- 2o Etica, Naturaleza y Sociedades PA2: El pensamiento de los pueblos originarios de América en 1492. Texto: Objetivo 1: Analizar las acciones que llevaron a cabo los españoles en las Antillas, de acuerdo con sus ideales y valores, para identificar las repercusiones de sus actos hacia la población nativa. Objetivo 2: Conocer cómo actuaron los habitantes de los pueblos originarios de las Antillas ante la invasión europea, para identificar sus pensamientos y actos en defensa de su identidad.

### Casos en revision del lote

- 1o Etica, Naturaleza y Sociedades PA23: Respeto a la diversidad cultural (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA24: Aqui vivimos (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA26: Promovamos la igualdad! (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA27: Voces contra la violencia (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA30: Celebremos la diversidad cultural: valoremos nuestras diferencias! (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA31: Recordar la historia para no repetirla! (needsReview_ocr).
- 1o Etica, Naturaleza y Sociedades PA34: Mis decisiones, mi democracia (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA1: Noticias del otro lado del Atlántico (needsReview_visual_mix).

## Lote 3 - 2026-06-13

### Alcance del lote

Se procesaron los primeros 20 PA pendientes actuales, ordenados por grado, tomo, PPA y PA. Se mantuvieron las mismas reglas de la muestra inicial.

### Conteo del lote

- Pendientes disponibles al iniciar este lote: 88
- Pendientes revisados en este lote: 20
- Confirmados: 10
- En revision: 10
- No encontrados: 0

### Archivos modificados en este lote

- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-3.json`
- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-6.json`
- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-8.json`
- `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-1.json`
- `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-10.json`
- `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-8.json`

### Casos revisados en este lote

#### 1. 2o / Lenguajes / PPA 1 / PA2

- Titulo: ¡Expresémoslo en otro idioma!
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 44-47
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-lenguajes-ppa-1.json`

#### 2. 2o / Saberes y Pensamiento Cientifico / PPA 1 / PA2

- Titulo: La ciencia y sus cálculos
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 116-119
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Comprender la profunda relación existente entre la generación del conocimiento científico y los datos estadísticos, así como el proceso de elaboración de un artículo informativo. Objetivo 2: Conocer las características y el proceso de elaboración de artículos informativos y elaborar uno para compartir información de interés.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-1.json`

#### 3. 2o / Etica, Naturaleza y Sociedades / PPA 2 / PA4

- Titulo: Las tensiones políticas y sociales del México antiguo
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 201-205
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Reconocer las diferentes formas de violencia que causaron tensiones políticas y sociales en las sociedades prehispánicas para concientizar sobre las implicaciones de la violencia en las sociedades actuales. Objetivo 2: Conocer las causas y consecuencias de las tensiones políticas en el México antiguo para comprender la Conquista española.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-2.json`

#### 4. 2o / Etica, Naturaleza y Sociedades / PPA 2 / PA6

- Titulo: La conciencia histórica ante la violencia
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 210-215
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Conocer diferentes formas de violencia y cómo se manifiestan en hechos concretos de la vida cotidiana, lo cual permitirá comprender sus repercusiones y generar estrategias para actuar en consecuencia. Objetivo 2: Indagar sobre las formas de violencia ejercidas en el pasado para desarrollar conciencia histórica y plantear acciones concretas que evitan reproducirlas.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-2.json`

#### 5. 2o / Etica, Naturaleza y Sociedades / PPA 3 / PA8

- Titulo: Ayer y hoy: diferentes condiciones de vida
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 221-224
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Identificar las características de gobierno, económicas, sociales y culturales de la sociedad novohispana, además de las consecuentes formas de sometimiento de la Corona española sobre los diferentes grupos sociales, como el origen de las desigualdades socioeconómicas. Objetivo 2: Reconocer que la existencia de diferentes leyes para los distintos grupos sociales en la Nueva España contribuyó a la generación de desigualdades socioeconómicas, y cómo algunas de esas leyes siguen vigentes en nuestra sociedad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-3.json`

#### 6. 2o / Etica, Naturaleza y Sociedades / PPA 5 / PA14

- Titulo: ¡Lucha contra los invasores!
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 163-166
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-5.json`

#### 7. 2o / Etica, Naturaleza y Sociedades / PPA 5 / PA15

- Titulo: Principales organizaciones por la paz
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 167-171
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-5.json`

#### 8. 2o / Etica, Naturaleza y Sociedades / PPA 6 / PA16

- Titulo: La ideología que cambió a México
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 172-175
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Analizar, por medio de una historieta, el pensamiento político y social liberal mexicano con respecto de los derechos individuales y la forma de gobierno señalada en la Constitución de 1857. Objetivo 2: Identificar, a través de una historieta, el papel y las características de los liberales durante la Reforma mediante biografías, leyes y sucesos históricos.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-6.json`

#### 9. 2o / Etica, Naturaleza y Sociedades / PPA 6 / PA17

- Titulo: El triunfo del liberalismo mexicano
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 176-179
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Describir el periodo de la Guerra de Reforma mediante un organizador gráfico (en papel o digital); por ejemplo, una línea del tiempo en la cual se incluyan algunas imágenes propias que favorezcan el pensamiento creativo e innovador. Objetivo 2: Elaborar una cronología de hechos de la Guerra de Reforma librada entre liberales y conservadores, de modo que se favorezcan aprendizajes significativos en la población juvenil, al fomentar el desarrollo de su conciencia histórica.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-6.json`

#### 10. 2o / Etica, Naturaleza y Sociedades / PPA 6 / PA18

- Titulo: El Estado de derecho y el respeto de los derechos humanos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 180-185
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-6.json`

#### 11. 2o / Etica, Naturaleza y Sociedades / PPA 7 / PA19

- Titulo: Honor y libertad: la epopeya del 5 de Mayo de 1862
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 186-190
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-7.json`

#### 12. 2o / Etica, Naturaleza y Sociedades / PPA 7 / PA21

- Titulo: Las leyes por los derechos humanos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 195-202
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-7.json`

#### 13. 2o / Saberes y Pensamiento Cientifico / PPA 8 / PA22

- Titulo: ¡Electricidad por todas partes!
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 117-121
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Alcanzar un conocimiento integrado de las manifestaciones y aplicaciones de la electricidad, y de los protocolos de seguridad utilizados en su manejo; vincular nuestros saberes con la resolución de desigualdades con expresiones algebraicas. Objetivo 2: Recabar saberes y conocimientos sobre las manifestaciones y aplicaciones de la electricidad, los cuidados que se requieren para manejarla y el proceso de elaboración de folletos para compartir dicha información.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-8.json`

#### 14. 2o / Etica, Naturaleza y Sociedades / PPA 8 / PA23

- Titulo: La tierra es de quien la trabaja
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 207-210
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-8.json`

#### 15. 2o / Etica, Naturaleza y Sociedades / PPA 8 / PA24

- Titulo: Los derechos sociales
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 211-215
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Revisar fuentes documentales para conocer los aportes de la Revolución Mexicana en materia de leyes y derechos, y buscar la definición y las características de un debate grupal. Objetivo 2: Buscar información sobre el tema de los aportes de la Revolución Mexicana y estudiarlos; luego, analizar y expresar nuestras ideas para sentirnos confiados y sin pena para participar en el debate grupal ante la comunidad escolar.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-8.json`

#### 16. 2o / Saberes y Pensamiento Cientifico / PPA 8 / PA24

- Titulo: ¡Y se hizo la luz!
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 125-129
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Comprender la vinculación entre la electricidad y el magnetismo, y la manera como se comporta la luz con las representaciones de manera algebraica de sucesiones con progresión cuadrática de figuras y números. Objetivo 2: Elaborar un cómic sobre el comportamiento de la luz como resultado de la interacción entre electricidad y magnetismo, y su relación con el álgebra y las sucesiones con progresión cuadrática de figuras y números.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-8.json`

#### 17. 2o / Saberes y Pensamiento Cientifico / PPA 9 / PA26

- Titulo: ¡Así se ven el Universo y el Sistema Solar!
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 135-137
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-9.json`

#### 18. 2o / Saberes y Pensamiento Cientifico / PPA 10 / PA28

- Titulo: La humanidad y la temperatura en la que vive
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 143-146
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-10.json`

#### 19. 2o / Saberes y Pensamiento Cientifico / PPA 10 / PA29

- Titulo: El antes y el ahora de los gases de la atmósfera
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 147-150
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Llevar a cabo una investigación bibliográfica o de campo de los gases de efecto invernadero que se producen en la comunidad, ya sea por la manufactura de un producto o el desarrollo de un servicio, para representarlo en un mapa. Objetivo 2: Elaborar un cuadro en el que se muestre la concentración anual de los gases de efecto invernadero generados en la comunidad, y que especifique las principales zonas en donde se producen y concentran para trasladar dicha información a un mapa.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-saberes-y-pensamiento-cientifico-ppa-10.json`

#### 20. 2o / De lo Humano y lo Comunitario / PPA 5 / PA15

- Titulo: Vida nueva a los desechos
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 239-243
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-5.json`

### Confirmados del lote

- 2o Saberes y Pensamiento Cientifico PA2: La ciencia y sus cálculos. Texto: Objetivo 1: Comprender la profunda relación existente entre la generación del conocimiento científico y los datos estadísticos, así como el proceso de elaboración de un artículo informativo. Objetivo 2: Conocer las características y el proceso de elaboración de artículos informativos y elaborar uno para compartir información de interés.
- 2o Etica, Naturaleza y Sociedades PA4: Las tensiones políticas y sociales del México antiguo. Texto: Objetivo 1: Reconocer las diferentes formas de violencia que causaron tensiones políticas y sociales en las sociedades prehispánicas para concientizar sobre las implicaciones de la violencia en las sociedades actuales. Objetivo 2: Conocer las causas y consecuencias de las tensiones políticas en el México antiguo para comprender la Conquista española.
- 2o Etica, Naturaleza y Sociedades PA6: La conciencia histórica ante la violencia. Texto: Objetivo 1: Conocer diferentes formas de violencia y cómo se manifiestan en hechos concretos de la vida cotidiana, lo cual permitirá comprender sus repercusiones y generar estrategias para actuar en consecuencia. Objetivo 2: Indagar sobre las formas de violencia ejercidas en el pasado para desarrollar conciencia histórica y plantear acciones concretas que evitan reproducirlas.
- 2o Etica, Naturaleza y Sociedades PA8: Ayer y hoy: diferentes condiciones de vida. Texto: Objetivo 1: Identificar las características de gobierno, económicas, sociales y culturales de la sociedad novohispana, además de las consecuentes formas de sometimiento de la Corona española sobre los diferentes grupos sociales, como el origen de las desigualdades socioeconómicas. Objetivo 2: Reconocer que la existencia de diferentes leyes para los distintos grupos sociales en la Nueva España contribuyó a la generación de desigualdades socioeconómicas, y cómo algunas de esas leyes siguen vigentes en nuestra sociedad.
- 2o Etica, Naturaleza y Sociedades PA16: La ideología que cambió a México. Texto: Objetivo 1: Analizar, por medio de una historieta, el pensamiento político y social liberal mexicano con respecto de los derechos individuales y la forma de gobierno señalada en la Constitución de 1857. Objetivo 2: Identificar, a través de una historieta, el papel y las características de los liberales durante la Reforma mediante biografías, leyes y sucesos históricos.
- 2o Etica, Naturaleza y Sociedades PA17: El triunfo del liberalismo mexicano. Texto: Objetivo 1: Describir el periodo de la Guerra de Reforma mediante un organizador gráfico (en papel o digital); por ejemplo, una línea del tiempo en la cual se incluyan algunas imágenes propias que favorezcan el pensamiento creativo e innovador. Objetivo 2: Elaborar una cronología de hechos de la Guerra de Reforma librada entre liberales y conservadores, de modo que se favorezcan aprendizajes significativos en la población juvenil, al fomentar el desarrollo de su conciencia histórica.
- 2o Saberes y Pensamiento Cientifico PA22: ¡Electricidad por todas partes!. Texto: Objetivo 1: Alcanzar un conocimiento integrado de las manifestaciones y aplicaciones de la electricidad, y de los protocolos de seguridad utilizados en su manejo; vincular nuestros saberes con la resolución de desigualdades con expresiones algebraicas. Objetivo 2: Recabar saberes y conocimientos sobre las manifestaciones y aplicaciones de la electricidad, los cuidados que se requieren para manejarla y el proceso de elaboración de folletos para compartir dicha información.
- 2o Etica, Naturaleza y Sociedades PA24: Los derechos sociales. Texto: Objetivo 1: Revisar fuentes documentales para conocer los aportes de la Revolución Mexicana en materia de leyes y derechos, y buscar la definición y las características de un debate grupal. Objetivo 2: Buscar información sobre el tema de los aportes de la Revolución Mexicana y estudiarlos; luego, analizar y expresar nuestras ideas para sentirnos confiados y sin pena para participar en el debate grupal ante la comunidad escolar.
- 2o Saberes y Pensamiento Cientifico PA24: ¡Y se hizo la luz!. Texto: Objetivo 1: Comprender la vinculación entre la electricidad y el magnetismo, y la manera como se comporta la luz con las representaciones de manera algebraica de sucesiones con progresión cuadrática de figuras y números. Objetivo 2: Elaborar un cómic sobre el comportamiento de la luz como resultado de la interacción entre electricidad y magnetismo, y su relación con el álgebra y las sucesiones con progresión cuadrática de figuras y números.
- 2o Saberes y Pensamiento Cientifico PA29: El antes y el ahora de los gases de la atmósfera. Texto: Objetivo 1: Llevar a cabo una investigación bibliográfica o de campo de los gases de efecto invernadero que se producen en la comunidad, ya sea por la manufactura de un producto o el desarrollo de un servicio, para representarlo en un mapa. Objetivo 2: Elaborar un cuadro en el que se muestre la concentración anual de los gases de efecto invernadero generados en la comunidad, y que especifique las principales zonas en donde se producen y concentran para trasladar dicha información a un mapa.

### Casos en revision del lote

- 2o Lenguajes PA2: ¡Expresémoslo en otro idioma! (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA14: ¡Lucha contra los invasores! (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA15: Principales organizaciones por la paz (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA18: El Estado de derecho y el respeto de los derechos humanos (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA19: Honor y libertad: la epopeya del 5 de Mayo de 1862 (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA21: Las leyes por los derechos humanos (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA23: La tierra es de quien la trabaja (needsReview_ocr).
- 2o Saberes y Pensamiento Cientifico PA26: ¡Así se ven el Universo y el Sistema Solar! (needsReview_ocr).
- 2o Saberes y Pensamiento Cientifico PA28: La humanidad y la temperatura en la que vive (needsReview_ocr).
- 2o De lo Humano y lo Comunitario PA15: Vida nueva a los desechos (needsReview_ocr).

## Lote 4 - 2026-06-13

### Alcance del lote

Se procesaron los primeros 20 PA pendientes actuales, ordenados por grado, tomo, PPA y PA. Se mantuvieron las mismas reglas de la muestra inicial.

### Conteo del lote

- Pendientes disponibles al iniciar este lote: 78
- Pendientes revisados en este lote: 20
- Confirmados: 12
- En revision: 8
- No encontrados: 0

### Archivos modificados en este lote

- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-10.json`
- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-11.json`
- `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-9.json`
- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-4.json`
- `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-1.json`
- `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-2.json`
- `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-3.json`

### Casos revisados en este lote

#### 1. 2o / De lo Humano y lo Comunitario / PPA 6 / PA18

- Titulo: Ensamble motriz-expresivo-socioemocional
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 256-260
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-6.json`

#### 2. 2o / Etica, Naturaleza y Sociedades / PPA 9 / PA25

- Titulo: La promulgación de la Constitución de 1917 y los gobiernos sonorenses
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 165-169
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-9.json`

#### 3. 2o / Etica, Naturaleza y Sociedades / PPA 9 / PA26

- Titulo: Las políticas socioeconómicas del Cardenismo
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 170-173
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar cuáles fueron las políticas socioeconómicas del Cardenismo y su impacto en la sociedad mexicana, para plasmarla en un texto narrativo. Objetivo 2: Reconocer el papel de las políticas socioeconómicas del Cardenismo y su impacto en la sociedad, mediante la elaboración de un texto narrativo.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-9.json`

#### 4. 2o / Etica, Naturaleza y Sociedades / PPA 9 / PA27

- Titulo: La participación ciudadana en la democracia
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 174-180
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-9.json`

#### 5. 2o / Etica, Naturaleza y Sociedades / PPA 10 / PA28

- Titulo: La ruptura con el Cardenismo y el intento de industrialización
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 181-185
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar un cuadro descriptivo donde se reconozca, de manera sencilla, el proceso de industrialización de México en los años cuarenta y sus consecuencias, y su relación con la economía. Objetivo 2: Elaborar un cuadro descriptivo que señale a los personajes y a sus ideales políticos para lograr la industrialización de México en los años cuarenta.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-10.json`

#### 6. 2o / Etica, Naturaleza y Sociedades / PPA 10 / PA30

- Titulo: La resolución de conflictos sociales
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 190-195
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Difundir la cultura de paz a través de un periódico mural, con la intención de darla a conocer a la comunidad escolar y así promover la justicia social. Objetivo 2: Exponer en un periódico mural casos concretos de conflictos sociales y las soluciones encontradas que ayudaron a resolverlos mediante la cultura de paz y la justicia social.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-10.json`

#### 7. 2o / Etica, Naturaleza y Sociedades / PPA 11 / PA31

- Titulo: La revolución cultural y la necesidad de cambios sociales
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 196-200
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Conocer, mediante la elaboración de un cuento breve, el contexto político y social, y los cambios culturales y sociales que se produjeron en México entre 1950 y 1968. Objetivo 2: Conocer, mediante la elaboración de un cuento breve, los grupos sociales involucrados en las protestas, sus demandas y la respuesta del Estado a las movilizaciones que hubo en México entre 1950 y 1968.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-11.json`

#### 8. 2o / Etica, Naturaleza y Sociedades / PPA 11 / PA32

- Titulo: Las grandes acciones estudiantiles de 1968 y la respuesta represiva del gobierno
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 201-204
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Conocer, mediante una entrevista ficticia, las demandas del Movimiento estudiantil de 1968, y las transformaciones que produjo en la sociedad actual. Además, investigar cómo se lleva a cabo una entrevista. Objetivo 2: Explicar, en una entrevista ficticia, las acciones fundamentales del Movimiento estudiantil de 1968, y cómo fue reprimido por el gobierno.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-2-etica-naturaleza-y-sociedades-ppa-11.json`

#### 9. 3o / Saberes y Pensamiento Cientifico / PPA 1 / PA1

- Titulo: Las prácticas tradicionales en el hogar
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 113-116
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Contar con una base de datos acerca de las aportaciones de los pueblos y las culturas de México (así como de nuestra propia comunidad) a la ciencia y la tecnología para representar dicha información en una línea del tiempo con el apoyo de gráficas, a partir de la aplicación de la media, mediana, y moda, así como del rango y la desviación media. Objetivo 2: Elaborar un diseño innovador que cumpla con el formato de la línea del tiempo y establecer el tipo de material del que estará hecho, el tamaño de la fuente y la hoja, junto con la relación imágenesgráficas-texto, para representar las aportaciones de los pueblos y las culturas de México en la ciencia y la tecnología, así como de nuestra propia comunidad.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-1.json`

#### 10. 3o / Lenguajes / PPA 2 / PA4

- Titulo: Una colmena de culturas
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 54-58
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Conocer los principios y las características de la interculturalidad mediante una investigación con el fin de entender el concepto, relacionarlo con nuestro entorno e identificarlo en nuestras lecturas. Objetivo 2: Investigar en distintas bases de datos sobre las múltiples fuentes de consulta que albergan textos literarios e interculturales para su recopilación, lectura y revisión y, a partir de ello, organizar un encuentro de argumentos dramatizados.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-2.json`

#### 11. 3o / Saberes y Pensamiento Cientifico / PPA 2 / PA4

- Titulo: Propiedades de la materia
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 127-130
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Llevar a cabo una investigación bibliográfica de las propiedades extensivas e intensivas y del uso de cuerpos geométricos para plasmar la información en láminas descriptivas. Objetivo 2: Hacer una investigación bibliográfica o mediante entrevistas a maestras y maestros, familiares o personas de la comunidad para encontrar la sustancia o mezcla ideal que ayude a explicar las propiedades extensivas e intensivas de la materia.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-2.json`

#### 12. 3o / Etica, Naturaleza y Sociedades / PPA 2 / PA5

- Titulo: Roma y su decadencia
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 209-213
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Organizar un debate corto sobre las características de la sociedad romana y sus aportes científicos; además, proporcionar el contexto histórico para comprender mejor la Antigüedad clásica. Objetivo 2: Conocer la relación del Imperio romano con los pueblos germánicos y las causas de su decadencia mediante la realización de un debate corto.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-2.json`

#### 13. 3o / Saberes y Pensamiento Cientifico / PPA 2 / PA5

- Titulo: Nuestros instrumentos de medición
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 131-134
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-2.json`

#### 14. 3o / Etica, Naturaleza y Sociedades / PPA 2 / PA6

- Titulo: Los retos de la democracia
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 214-217
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-2.json`

#### 15. 3o / Lenguajes / PPA 2 / PA6

- Titulo: Encuentros para reflexionar
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 63-66
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Identificar los puntos clave para desarrollar un debate corto de la paz sobre la interculturalidad, las relaciones sociales y la diversidad cultural, con el fin de fomentar la comunicación asertiva. Objetivo 2: Investigar y reconocer los rasgos que identifican a la sociedad intercultural, con la finalidad de reconocerlos dentro de su comunidad y, a partir de ello, realizar un debate corto en las lenguas de su elección.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-2.json`

#### 16. 3o / Saberes y Pensamiento Cientifico / PPA 2 / PA6

- Titulo: Lo mensurable de nuestro entorno
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 135-138
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-2.json`

#### 17. 3o / Saberes y Pensamiento Cientifico / PPA 3 / PA7

- Titulo: Mundo homogéneo y heterogéneo
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 141-144
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-3.json`

#### 18. 3o / Saberes y Pensamiento Cientifico / PPA 3 / PA8

- Titulo: Dividir lo uniforme
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 145-149
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Realizar una investigación bibliográfica o de campo de los principales equipos de separación de mezclas para diseñar y elaborar el prototipo 3D. Objetivo 2: Investigar y aprender lo relacionado con la construcción de desarrollos planos de diferentes figuras tridimensionales para construir el prototipo 3D de equipo de separación de mezclas.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-3.json`

#### 19. 3o / Etica, Naturaleza y Sociedades / PPA 4 / PA10

- Titulo: Las rutas comerciales marítimas y la colonización
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 236-241
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar un mapa de rutas que identifique las rutas marítimas que siguieron los países europeos entre los siglos XV y XVI para llegar a América y explotar sus recursos. Objetivo 2: Relacionar la llegada de los europeos al Nuevo Mundo con los inventos marítimos y los avances tecnológicos de las potencias de Europa, elaborando un mapa de rutas que nos muestre los caminos y los momentos de las travesías durante los siglos XV y XVI.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-4.json`

#### 20. 3o / Saberes y Pensamiento Cientifico / PPA 4 / PA11

- Titulo: Esferas multicolor
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 161-164
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-4.json`

### Confirmados del lote

- 2o Etica, Naturaleza y Sociedades PA26: Las políticas socioeconómicas del Cardenismo. Texto: Objetivo 1: Investigar cuáles fueron las políticas socioeconómicas del Cardenismo y su impacto en la sociedad mexicana, para plasmarla en un texto narrativo. Objetivo 2: Reconocer el papel de las políticas socioeconómicas del Cardenismo y su impacto en la sociedad, mediante la elaboración de un texto narrativo.
- 2o Etica, Naturaleza y Sociedades PA28: La ruptura con el Cardenismo y el intento de industrialización. Texto: Objetivo 1: Elaborar un cuadro descriptivo donde se reconozca, de manera sencilla, el proceso de industrialización de México en los años cuarenta y sus consecuencias, y su relación con la economía. Objetivo 2: Elaborar un cuadro descriptivo que señale a los personajes y a sus ideales políticos para lograr la industrialización de México en los años cuarenta.
- 2o Etica, Naturaleza y Sociedades PA30: La resolución de conflictos sociales. Texto: Objetivo 1: Difundir la cultura de paz a través de un periódico mural, con la intención de darla a conocer a la comunidad escolar y así promover la justicia social. Objetivo 2: Exponer en un periódico mural casos concretos de conflictos sociales y las soluciones encontradas que ayudaron a resolverlos mediante la cultura de paz y la justicia social.
- 2o Etica, Naturaleza y Sociedades PA31: La revolución cultural y la necesidad de cambios sociales. Texto: Objetivo 1: Conocer, mediante la elaboración de un cuento breve, el contexto político y social, y los cambios culturales y sociales que se produjeron en México entre 1950 y 1968. Objetivo 2: Conocer, mediante la elaboración de un cuento breve, los grupos sociales involucrados en las protestas, sus demandas y la respuesta del Estado a las movilizaciones que hubo en México entre 1950 y 1968.
- 2o Etica, Naturaleza y Sociedades PA32: Las grandes acciones estudiantiles de 1968 y la respuesta represiva del gobierno. Texto: Objetivo 1: Conocer, mediante una entrevista ficticia, las demandas del Movimiento estudiantil de 1968, y las transformaciones que produjo en la sociedad actual. Además, investigar cómo se lleva a cabo una entrevista. Objetivo 2: Explicar, en una entrevista ficticia, las acciones fundamentales del Movimiento estudiantil de 1968, y cómo fue reprimido por el gobierno.
- 3o Saberes y Pensamiento Cientifico PA1: Las prácticas tradicionales en el hogar. Texto: Objetivo 1: Contar con una base de datos acerca de las aportaciones de los pueblos y las culturas de México (así como de nuestra propia comunidad) a la ciencia y la tecnología para representar dicha información en una línea del tiempo con el apoyo de gráficas, a partir de la aplicación de la media, mediana, y moda, así como del rango y la desviación media. Objetivo 2: Elaborar un diseño innovador que cumpla con el formato de la línea del tiempo y establecer el tipo de material del que estará hecho, el tamaño de la fuente y la hoja, junto con la relación imágenesgráficas-texto, para representar las aportaciones de los pueblos y las culturas de México en la ciencia y la tecnología, así como de nuestra propia comunidad.
- 3o Lenguajes PA4: Una colmena de culturas. Texto: Objetivo 1: Conocer los principios y las características de la interculturalidad mediante una investigación con el fin de entender el concepto, relacionarlo con nuestro entorno e identificarlo en nuestras lecturas. Objetivo 2: Investigar en distintas bases de datos sobre las múltiples fuentes de consulta que albergan textos literarios e interculturales para su recopilación, lectura y revisión y, a partir de ello, organizar un encuentro de argumentos dramatizados.
- 3o Saberes y Pensamiento Cientifico PA4: Propiedades de la materia. Texto: Objetivo 1: Llevar a cabo una investigación bibliográfica de las propiedades extensivas e intensivas y del uso de cuerpos geométricos para plasmar la información en láminas descriptivas. Objetivo 2: Hacer una investigación bibliográfica o mediante entrevistas a maestras y maestros, familiares o personas de la comunidad para encontrar la sustancia o mezcla ideal que ayude a explicar las propiedades extensivas e intensivas de la materia.
- 3o Etica, Naturaleza y Sociedades PA5: Roma y su decadencia. Texto: Objetivo 1: Organizar un debate corto sobre las características de la sociedad romana y sus aportes científicos; además, proporcionar el contexto histórico para comprender mejor la Antigüedad clásica. Objetivo 2: Conocer la relación del Imperio romano con los pueblos germánicos y las causas de su decadencia mediante la realización de un debate corto.
- 3o Lenguajes PA6: Encuentros para reflexionar. Texto: Objetivo 1: Identificar los puntos clave para desarrollar un debate corto de la paz sobre la interculturalidad, las relaciones sociales y la diversidad cultural, con el fin de fomentar la comunicación asertiva. Objetivo 2: Investigar y reconocer los rasgos que identifican a la sociedad intercultural, con la finalidad de reconocerlos dentro de su comunidad y, a partir de ello, realizar un debate corto en las lenguas de su elección.
- 3o Saberes y Pensamiento Cientifico PA8: Dividir lo uniforme. Texto: Objetivo 1: Realizar una investigación bibliográfica o de campo de los principales equipos de separación de mezclas para diseñar y elaborar el prototipo 3D. Objetivo 2: Investigar y aprender lo relacionado con la construcción de desarrollos planos de diferentes figuras tridimensionales para construir el prototipo 3D de equipo de separación de mezclas.
- 3o Etica, Naturaleza y Sociedades PA10: Las rutas comerciales marítimas y la colonización. Texto: Objetivo 1: Elaborar un mapa de rutas que identifique las rutas marítimas que siguieron los países europeos entre los siglos XV y XVI para llegar a América y explotar sus recursos. Objetivo 2: Relacionar la llegada de los europeos al Nuevo Mundo con los inventos marítimos y los avances tecnológicos de las potencias de Europa, elaborando un mapa de rutas que nos muestre los caminos y los momentos de las travesías durante los siglos XV y XVI.

### Casos en revision del lote

- 2o De lo Humano y lo Comunitario PA18: Ensamble motriz-expresivo-socioemocional (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA25: La promulgación de la Constitución de 1917 y los gobiernos sonorenses (needsReview_ocr).
- 2o Etica, Naturaleza y Sociedades PA27: La participación ciudadana en la democracia (needsReview_ocr).
- 3o Saberes y Pensamiento Cientifico PA5: Nuestros instrumentos de medición (needsReview_ocr).
- 3o Etica, Naturaleza y Sociedades PA6: Los retos de la democracia (needsReview_ocr).
- 3o Saberes y Pensamiento Cientifico PA6: Lo mensurable de nuestro entorno (needsReview_ocr).
- 3o Saberes y Pensamiento Cientifico PA7: Mundo homogéneo y heterogéneo (needsReview_ocr).
- 3o Saberes y Pensamiento Cientifico PA11: Esferas multicolor (needsReview_ocr).

## Lote 5 - 2026-06-13

### Alcance del lote

Se procesaron los primeros 24 PA pendientes actuales, ordenados por grado, tomo, PPA y PA. Se mantuvieron las mismas reglas de la muestra inicial.

### Conteo del lote

- Pendientes disponibles al iniciar este lote: 66
- Pendientes revisados en este lote: 24
- Confirmados: 11
- En revision: 13
- No encontrados: 0

### Archivos modificados en este lote

- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-11.json`
- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-12.json`
- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-7.json`
- `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-8.json`
- `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-12.json`
- `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-14.json`
- `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-5.json`
- `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-7.json`
- `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-10.json`
- `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-7.json`

### Casos revisados en este lote

#### 1. 3o / Lenguajes / PPA 5 / PA14

- Titulo: Costumbres sociales, sus problemas y soluciones
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 101-104
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Llevar a cabo una investigación de las prácticas sociales y las costumbres que restringen los derechos de algunos colectivos, para hallar propuestas de solución o alternativas a dichas prácticas y, a partir de ello, realizar una historieta costumbrista en distintas lenguas. Objetivo 2: Escribir el guion y trazar una historieta costumbrista en distintas lenguas (a partir de una investigación y traducción con apoyo de personas de la comunidad) que exponga prácticas o tradiciones injustas y problemáticas en la comunidad, esto con el fin de generar conciencia de los problemas que acarrean.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-5.json`

#### 2. 3o / Saberes y Pensamiento Cientifico / PPA 5 / PA14

- Titulo: Poner límites a la contaminación
- Paginas revisadas: Nuestro libro de proyectos Tomo I pp. 175-178
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-5.json`

#### 3. 3o / Lenguajes / PPA 6 / PA18

- Titulo: ¡Te lo digo y expreso con imaginación!
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 22-25
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-6.json`

#### 4. 3o / Etica, Naturaleza y Sociedades / PPA 7 / PA19

- Titulo: La Revolución Francesa y su trascendencia
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 199-203
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-7.json`

#### 5. 3o / Lenguajes / PPA 7 / PA20

- Titulo: Valoración, comprensión y opinión sobre una manifestación artística
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 33-36
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Indagar y recopilar ejemplos de las manifestaciones artísticas representativas de su comunidad para comprenderlas y valorarlas mediante el uso de las categorías y los juicios estéticos. Objetivo 2: Investigar y utilizar las categorías y los juicios estéticos en la redacción de un ensayo con emojis que comente y valore alguna manifestación artística de su comunidad para comprenderla y difundirla.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-7.json`

#### 6. 3o / Etica, Naturaleza y Sociedades / PPA 7 / PA21

- Titulo: Las múltiples dimensiones de los derechos humanos
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 209-212
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar sobre las múltiples dimensiones de los derechos humanos para darlas a conocer a la comunidad escolar a través de banners rectangulares informativos, y así, cuando se requieran, la comunidad haga valer esos derechos. Objetivo 2: Elaborar banners rectangulares informativos que permitan visualizar los derechos a la educación, destacando la importancia de exigir su cumplimiento y respeto, asimismo, los movimientos que promueven su defensa.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-7.json`

#### 7. 3o / Saberes y Pensamiento Cientifico / PPA 7 / PA21

- Titulo: Son como un sistema solar, pero en miniatura
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 117-120
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Planificar una asesoría con una persona que tenga conocimientos sobre el modelo atómico de Bohr y el diagrama de Lewis para conocer las principales semejanzas y diferencias entre los trabajos y postulados que hicieron ambos científicos. Objetivo 2: Buscar ejemplos sobre los modelos atómicos de Bohr y diagramas de Lewis de algunos elementos químicos con baja masa molecular para darle sentido al contenido del volumen de pirámides, cilindros, conos y esferas, y relacionarlos de manera adecuada.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-7.json`

#### 8. 3o / Etica, Naturaleza y Sociedades / PPA 8 / PA22

- Titulo: La consolidación del capitalismo como sistema económico dominante
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 215-221
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Identificar, por medio de un guion de radio o podcast histórico, las repercusiones de la guerra civil de Estados Unidos o guerra de Secesión. Objetivo 2: Reconocer por medio de un guion de radio o podcast histórico, la expansión territorial que tuvo Estados Unidos en el siglo xix, y el efecto de las diferencias regionales sobre los modelos económicos diferenciados, lo que ocasionó la guerra de Secesión entre 1861 y 1865.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-8.json`

#### 9. 3o / Etica, Naturaleza y Sociedades / PPA 8 / PA23

- Titulo: El ascenso de Estados Unidos como potencia mundial
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 222-223
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: El rango existe, pero el OCR no confirma con claridad el titulo o numero del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-8.json`

#### 10. 3o / Lenguajes / PPA 9 / PA26

- Titulo: Creamos y dirigimos historias de vida
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 63-67
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-9.json`

#### 11. 3o / Lenguajes / PPA 9 / PA27

- Titulo: Melodías comunitarias
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 68-71
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-9.json`

#### 12. 3o / Saberes y Pensamiento Cientifico / PPA 10 / PA28

- Titulo: Reacciones químicas en el entorno
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 153-156
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Proponer una explicación sobre las características de las reacciones químicas y de las mezclas, en la cual se usen gráficas acompañadas de párrafos breves y coherentes. Objetivo 2: Elaborar la cápsula informativa, con distintas gráficas, para presentar los datos más relevantes de las mezclas de diferentes productos y las reacciones químicas que las producen.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-10.json`

#### 13. 3o / Lenguajes / PPA 10 / PA29

- Titulo: Un día grabando al mundo
- Paginas revisadas: Nuestro libro de proyectos Tomo II pp. 79-83
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-10.json`

#### 14. 3o / Etica, Naturaleza y Sociedades / PPA 9 / PA25

- Titulo: La Primera Guerra Mundial y la Revolución Rusa
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 158-163
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-9.json`

#### 15. 3o / Etica, Naturaleza y Sociedades / PPA 9 / PA26

- Titulo: Periodo de entreguerras
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 164-169
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-9.json`

#### 16. 3o / Etica, Naturaleza y Sociedades / PPA 11 / PA32

- Titulo: La lucha de las superpotencias y la caída del bloque socialista
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 199-203
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-11.json`

#### 17. 3o / Lenguajes / PPA 11 / PA32

- Titulo: Nuestro escenario comunal
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 17-20
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-11.json`

#### 18. 3o / Etica, Naturaleza y Sociedades / PPA 11 / PA33

- Titulo: Los grupos y organizaciones a favor de la cultura de paz
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 204-207
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar y valorar las acciones de grupos y organizaciones en México y América Latina a favor de la resolución de conflictos y la cultura de paz, mediante la elaboración de una infografía inspiradora. Objetivo 2: Investigar y recabar información sobre algunos grupos y organizaciones de México y América Latina que hayan participado en la resolución de conflictos en nuestro estado, para integrar la información en una infografía inspiradora.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-11.json`

#### 19. 3o / Lenguajes / PPA 12 / PA34

- Titulo: Narrativas delatadoras
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 27-30
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elaborar narrativas sobre la erradicación de la violencia, a fin de presentar imágenes delatadoras a la comunidad. Objetivo 2: Presentar imágenes delatadoras a la comunidad sobre la erradicación de la violencia.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-12.json`

#### 20. 3o / Etica, Naturaleza y Sociedades / PPA 12 / PA35

- Titulo: Los movimientos sociales y políticos actuales
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 217-221
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Comprender mejor nuestros derechos fundamentales al conocer los movimientos políticos y sociales que trabajan en favor de los derechos humanos y en la erradicación o disminución de las desigualdades, por medio de la creación de pancartas alusivas. Objetivo 2: Estimular nuestra participación ciudadana al averiguar cuáles son los movimientos sociales y políticos que trabajan en la promoción y protección de los derechos humanos y en la erradicación o disminución de las desigualdades. Asimismo, integrar esa información en pancartas alusivas.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-etica-naturaleza-y-sociedades-ppa-12.json`

#### 21. 3o / Lenguajes / PPA 12 / PA36

- Titulo: ¡Que se escuche tu voz!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 35-38
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Investigar los pasos a seguir para realizar una pequeña campaña contra la violencia que beneficie a la comunidad, con el fin de concientizar no sólo a sus compañeras, compañeros y comunidad escolar, sino también a sus vecinos y amigos. Objetivo 2: Identificar los tipos de violencia que existen en la comunidad por medio de entrevistas e investigación de campo, para difundir dicha información y proponer soluciones mediante una pequeña campaña de concientización.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-12.json`

#### 22. 3o / Lenguajes / PPA 14 / PA42

- Titulo: ¡Bienvenidos a la feria de la ciencia!
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 63-66
- Estado: confirmed_from_objective
- Rotulo encontrado: Objetivo 1 + Objetivo 2
- Texto extraido: Objetivo 1: Elegir, en asamblea, qué experimentos presentarán en la feria escolar con la intención de fomentar el conocimiento de las ciencias en la comunidad escolar y establecer cómo conseguir los insumos necesarios para cada uno. Objetivo 2: Investigar, en fuentes de información o con expertos en el tema, cómo organizar la feria escolar de experimentos en vivo, en un espacio y tiempo apropiados, que motiven a la comunidad a acercarse a las ciencias.
- Razon: Objetivo 1 y Objetivo 2 aparecen como par dentro del rango exacto del PA.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-14.json`

#### 23. 3o / Lenguajes / PPA 15 / PA45

- Titulo: Escritores incluyentes, diversidad de textos
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 78-81
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-15.json`

#### 24. 3o / Saberes y Pensamiento Cientifico / PPA 15 / PA45

- Titulo: Observar las razones trigonométricas
- Paginas revisadas: Nuestro libro de proyectos Tomo III pp. 150-153
- Estado: needsReview_ocr
- Rotulo encontrado: No confirmado
- Texto extraido: No confirmado
- Razon: Hay menciones de Objetivo, pero el OCR no permite separar un texto confiable.
- Archivo bundle: `public/caracoles/data/curricular-development/grade-3-saberes-y-pensamiento-cientifico-ppa-15.json`

### Confirmados del lote

- 3o Lenguajes PA14: Costumbres sociales, sus problemas y soluciones. Texto: Objetivo 1: Llevar a cabo una investigación de las prácticas sociales y las costumbres que restringen los derechos de algunos colectivos, para hallar propuestas de solución o alternativas a dichas prácticas y, a partir de ello, realizar una historieta costumbrista en distintas lenguas. Objetivo 2: Escribir el guion y trazar una historieta costumbrista en distintas lenguas (a partir de una investigación y traducción con apoyo de personas de la comunidad) que exponga prácticas o tradiciones injustas y problemáticas en la comunidad, esto con el fin de generar conciencia de los problemas que acarrean.
- 3o Lenguajes PA20: Valoración, comprensión y opinión sobre una manifestación artística. Texto: Objetivo 1: Indagar y recopilar ejemplos de las manifestaciones artísticas representativas de su comunidad para comprenderlas y valorarlas mediante el uso de las categorías y los juicios estéticos. Objetivo 2: Investigar y utilizar las categorías y los juicios estéticos en la redacción de un ensayo con emojis que comente y valore alguna manifestación artística de su comunidad para comprenderla y difundirla.
- 3o Etica, Naturaleza y Sociedades PA21: Las múltiples dimensiones de los derechos humanos. Texto: Objetivo 1: Investigar sobre las múltiples dimensiones de los derechos humanos para darlas a conocer a la comunidad escolar a través de banners rectangulares informativos, y así, cuando se requieran, la comunidad haga valer esos derechos. Objetivo 2: Elaborar banners rectangulares informativos que permitan visualizar los derechos a la educación, destacando la importancia de exigir su cumplimiento y respeto, asimismo, los movimientos que promueven su defensa.
- 3o Saberes y Pensamiento Cientifico PA21: Son como un sistema solar, pero en miniatura. Texto: Objetivo 1: Planificar una asesoría con una persona que tenga conocimientos sobre el modelo atómico de Bohr y el diagrama de Lewis para conocer las principales semejanzas y diferencias entre los trabajos y postulados que hicieron ambos científicos. Objetivo 2: Buscar ejemplos sobre los modelos atómicos de Bohr y diagramas de Lewis de algunos elementos químicos con baja masa molecular para darle sentido al contenido del volumen de pirámides, cilindros, conos y esferas, y relacionarlos de manera adecuada.
- 3o Etica, Naturaleza y Sociedades PA22: La consolidación del capitalismo como sistema económico dominante. Texto: Objetivo 1: Identificar, por medio de un guion de radio o podcast histórico, las repercusiones de la guerra civil de Estados Unidos o guerra de Secesión. Objetivo 2: Reconocer por medio de un guion de radio o podcast histórico, la expansión territorial que tuvo Estados Unidos en el siglo xix, y el efecto de las diferencias regionales sobre los modelos económicos diferenciados, lo que ocasionó la guerra de Secesión entre 1861 y 1865.
- 3o Saberes y Pensamiento Cientifico PA28: Reacciones químicas en el entorno. Texto: Objetivo 1: Proponer una explicación sobre las características de las reacciones químicas y de las mezclas, en la cual se usen gráficas acompañadas de párrafos breves y coherentes. Objetivo 2: Elaborar la cápsula informativa, con distintas gráficas, para presentar los datos más relevantes de las mezclas de diferentes productos y las reacciones químicas que las producen.
- 3o Etica, Naturaleza y Sociedades PA33: Los grupos y organizaciones a favor de la cultura de paz. Texto: Objetivo 1: Investigar y valorar las acciones de grupos y organizaciones en México y América Latina a favor de la resolución de conflictos y la cultura de paz, mediante la elaboración de una infografía inspiradora. Objetivo 2: Investigar y recabar información sobre algunos grupos y organizaciones de México y América Latina que hayan participado en la resolución de conflictos en nuestro estado, para integrar la información en una infografía inspiradora.
- 3o Lenguajes PA34: Narrativas delatadoras. Texto: Objetivo 1: Elaborar narrativas sobre la erradicación de la violencia, a fin de presentar imágenes delatadoras a la comunidad. Objetivo 2: Presentar imágenes delatadoras a la comunidad sobre la erradicación de la violencia.
- 3o Etica, Naturaleza y Sociedades PA35: Los movimientos sociales y políticos actuales. Texto: Objetivo 1: Comprender mejor nuestros derechos fundamentales al conocer los movimientos políticos y sociales que trabajan en favor de los derechos humanos y en la erradicación o disminución de las desigualdades, por medio de la creación de pancartas alusivas. Objetivo 2: Estimular nuestra participación ciudadana al averiguar cuáles son los movimientos sociales y políticos que trabajan en la promoción y protección de los derechos humanos y en la erradicación o disminución de las desigualdades. Asimismo, integrar esa información en pancartas alusivas.
- 3o Lenguajes PA36: ¡Que se escuche tu voz!. Texto: Objetivo 1: Investigar los pasos a seguir para realizar una pequeña campaña contra la violencia que beneficie a la comunidad, con el fin de concientizar no sólo a sus compañeras, compañeros y comunidad escolar, sino también a sus vecinos y amigos. Objetivo 2: Identificar los tipos de violencia que existen en la comunidad por medio de entrevistas e investigación de campo, para difundir dicha información y proponer soluciones mediante una pequeña campaña de concientización.
- 3o Lenguajes PA42: ¡Bienvenidos a la feria de la ciencia!. Texto: Objetivo 1: Elegir, en asamblea, qué experimentos presentarán en la feria escolar con la intención de fomentar el conocimiento de las ciencias en la comunidad escolar y establecer cómo conseguir los insumos necesarios para cada uno. Objetivo 2: Investigar, en fuentes de información o con expertos en el tema, cómo organizar la feria escolar de experimentos en vivo, en un espacio y tiempo apropiados, que motiven a la comunidad a acercarse a las ciencias.

### Casos en revision del lote

- 3o Saberes y Pensamiento Cientifico PA14: Poner límites a la contaminación (needsReview_ocr).
- 3o Lenguajes PA18: ¡Te lo digo y expreso con imaginación! (needsReview_ocr).
- 3o Etica, Naturaleza y Sociedades PA19: La Revolución Francesa y su trascendencia (needsReview_ocr).
- 3o Etica, Naturaleza y Sociedades PA23: El ascenso de Estados Unidos como potencia mundial (needsReview_ocr).
- 3o Lenguajes PA26: Creamos y dirigimos historias de vida (needsReview_ocr).
- 3o Lenguajes PA27: Melodías comunitarias (needsReview_ocr).
- 3o Lenguajes PA29: Un día grabando al mundo (needsReview_ocr).
- 3o Etica, Naturaleza y Sociedades PA25: La Primera Guerra Mundial y la Revolución Rusa (needsReview_ocr).
- 3o Etica, Naturaleza y Sociedades PA26: Periodo de entreguerras (needsReview_ocr).
- 3o Etica, Naturaleza y Sociedades PA32: La lucha de las superpotencias y la caída del bloque socialista (needsReview_ocr).
- 3o Lenguajes PA32: Nuestro escenario comunal (needsReview_ocr).
- 3o Lenguajes PA45: Escritores incluyentes, diversidad de textos (needsReview_ocr).
- 3o Saberes y Pensamiento Cientifico PA45: Observar las razones trigonométricas (needsReview_ocr).

## Resumen global de toda la auditoria

- Proyectos Academicos no ingleses en la base: 432
- Horizontes confirmados: 376
- Horizontes que siguen en needsReview o pendientes: 55
- Orientaciones pedagogicas provisionales: 1
- Casos revisados en muestra y lotes: 116

Los casos pendientes no fueron rellenados ni convertidos en confirmados sin evidencia suficiente. La orientacion provisional se mantiene separada de los horizontes confirmados.
