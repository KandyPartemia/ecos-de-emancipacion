# Auditoria de horizonte por rotulo Objetivo

Fecha: 2026-06-08

## Alcance

Se audito la deteccion de horizonte/proposito en Caracoles Resonando para Proyectos Academicos no Ingles. La revision se centro en los tomos de Nuestro libro de proyectos y en variantes de rotulo:

- Horizonte de expectativas
- Horizonte de expectativa
- Objetivo
- Objetivo del proyecto

No se tocaron SEO, memorama, mapa mental, header movil, selector curricular, Ingles ni diseno general.

## Archivos revisados

- `src/caracoles/lib/academicProjectRecordAdapter.ts`
- `public/caracoles/data/curricular-development/*.json`
- `public/caracoles/data/generated/grade-*/confirmed-projects.json`
- `public/caracoles/data/generated/grade-*/selectable-projects.json`
- `content/caracoles/generated-private/grade-*/pages-index.full.json`
- `content/caracoles/source-pdfs/*/proyectos/*.pdf`

## Logica actual observada

La ficha obtiene el horizonte desde `buildHorizon()` en `src/caracoles/lib/academicProjectRecordAdapter.ts`.

Orden de prioridad actual:

1. `developmentProject.horizonOrPurpose.text`
2. `developmentProject.projectExpectationHorizon.officialText`
3. `developmentProject.projectExpectationHorizon.studentVersion`
4. `developmentProject.projectPurpose.text`
5. estado pendiente si no hay texto validado

La funcion `sourceStatus()` ya reconoce como confirmado cualquier estado que incluya:

- `confirmed`
- `official`
- `validated`

Por eso varios casos que una auditoria previa habia contado como fallback realmente se muestran como confirmados en la interfaz.

## Conteo con la regla real de la app

Total auditado sin Ingles: 432 PA.

- Horizontes confirmados por la capa actual: 166
- Horizontes faltantes: 264
- Orientaciones pedagogicas provisionales: 2
- Casos pendientes/provisionales auditados para rotulo `Objetivo`: 266

## Deteccion de Objetivo en paginas exactas del PA

Se cruzaron los rangos `sourcePages.nuestroLibroProyectos` de cada PA contra el OCR de `pages-index.full.json`.

Resultados conservadores:

- Casos pendientes/provisionales con algun `Objetivo` dentro del rango exacto del PA: 263
- Casos con `Objetivo 1` y `Objetivo 2` claramente recuperables cerca de Etapa 3: 150
- Casos con `Objetivo` dentro del PA pero con orden OCR dudoso o disposicion de columnas mezclada: 113
- Casos sin `Objetivo` localizado: 3

Importante: muchos de los 113 en revision probablemente son recuperables, pero el OCR coloca a veces `Objetivo 1 / Objetivo 2` antes de `Etapa 3` aunque visualmente pertenezcan a esa etapa. Por honestidad curricular deben pasar por validacion fina antes de una actualizacion masiva.

## Reglas usadas para no confundir PPA con PA

Se acepto un objetivo solo si:

- aparece dentro del rango de paginas del Proyecto Academico seleccionado;
- aparece en el contexto de Etapa 3 o de la propuesta de solucion del PA;
- contiene texto sustantivo posterior a `Objetivo 1` y `Objetivo 2`;
- las paginas coinciden con el tomo y rango declarados para ese PA.

Se rechazo o marco en revision si:

- aparece solo en paginas introductorias del Proyecto Parcial de Aula;
- pertenece a planeacion del PPA completo;
- esta fuera del rango de paginas del PA;
- el OCR mezcla columnas, etapas o proyectos contiguos;
- el texto no permite separar claramente el objetivo del PA.

## Ejemplos confirmables

### 1 grado, PA con horizonte confirmado usado como control

- Grado: 1
- Campo formativo: Lenguajes
- Tomo: II
- PPA: 9
- PA: 25
- Titulo: Lo mejor de lo mejor
- Paginas: Nuestro libro de proyectos Tomo II, pp. 60-63
- Estado: confirmado existente
- Accion: no se modifico; queda como control.

### 1 grado, PA que estaba provisional

- Grado: 1
- Campo formativo: Lenguajes
- Tomo: II
- PPA: 9
- PA: 26
- Titulo: Dilo como sea, pero aqui coincidimos
- Paginas: Nuestro libro de proyectos Tomo II, pp. 64-67
- Rotulo encontrado: Objetivo
- Evidencia: Etapa 3 indica determinar un horizonte de expectativas y presenta Objetivo 1 y Objetivo 2 en pp. 64-65.
- Estado aplicado en prueba controlada: confirmed.

### 2 grado, PA con horizonte faltante

- Grado: 2
- Campo formativo: De lo Humano y lo Comunitario
- Tomo: I
- PPA: 1
- PA: 1
- Titulo: Entrevistas para un proyecto de vida
- Paginas: Nuestro libro de proyectos Tomo I, pp. 249-252
- Rotulo encontrado: Objetivo
- Evidencia: la p. 250 presenta Objetivo 1 y Objetivo 2 dentro del PA y la Etapa 3 pide construir el horizonte de expectativas mas adecuado.
- Estado aplicado en prueba controlada: confirmed.

### 3 grado, PA con horizonte faltante

- Grado: 3
- Campo formativo: Lenguajes
- Tomo: I
- PPA: 1
- PA: 1
- Titulo: Mi opinion es muy valiosa
- Paginas: Nuestro libro de proyectos Tomo I, pp. 39-43
- Rotulo encontrado: Objetivo
- Evidencia: la p. 40 presenta Objetivo 1 y Objetivo 2 despues de explicar que se debe determinar el horizonte de expectativas.
- Estado aplicado en prueba controlada: confirmed.

## Ejemplo donde no debe usarse como PA

- Grado: 2
- Campo formativo: De lo Humano y lo Comunitario
- Tomo: I
- PPA: 1
- Paginas: Nuestro libro de proyectos Tomo I, pp. 247-248
- Texto observado: la introduccion del Proyecto Parcial de Aula habla de horizontes personales y comunitarios y enumera lo que se realizara en el PPA completo.
- Clasificacion: `ppa-level-objective`
- Decision: no se usa como horizonte del PA 1, PA 2 ni PA 3. Solo se acepta el objetivo localizado dentro del rango del PA correspondiente.

## Prueba controlada aplicada

Se actualizaron solo tres registros publicos de desarrollo curricular:

- `public/caracoles/data/curricular-development/grade-1-lenguajes-ppa-9.json`
- `public/caracoles/data/curricular-development/grade-2-de-lo-humano-y-lo-comunitario-ppa-1.json`
- `public/caracoles/data/curricular-development/grade-3-lenguajes-ppa-1.json`

Campo actualizado:

- `projectExpectationHorizon.officialText`
- `projectExpectationHorizon.studentVersion`
- `projectExpectationHorizon.sourcePages`
- `projectExpectationHorizon.evidence`
- `projectExpectationHorizon.status`
- `projectExpectationHorizon.detectedLabel`
- `projectExpectationHorizon.validationScope`

No se modifico el catalogo completo ni se hizo relleno masivo.

## Propuesta tecnica

La actualizacion masiva segura no deberia hacerse en `ProjectDashboard` ni en la interfaz. Conviene ajustar el pipeline de extraccion o una capa derivada de evidencia curricular:

1. Script de extraccion:
   - detectar `Horizonte de expectativas`, `Horizonte de expectativa`, `Objetivo 1`, `Objetivo 2` y variantes OCR;
   - limitar la busqueda al rango `sourcePages.nuestroLibroProyectos` del PA;
   - registrar pagina, tomo, PPA, PA, titulo, rotulo y texto.

2. Bundle curricular:
   - escribir `projectExpectationHorizon` solo cuando la evidencia quede en el rango del PA;
   - marcar `confirmed-from-project-book` cuando sea claro;
   - marcar `needsReview` cuando el OCR mezcle columnas o etapas;
   - marcar `ppa-level-objective` cuando el texto venga del PPA.

3. Capa de honestidad:
   - conservar la distincion entre confirmado, provisional y pendiente;
   - no convertir `projectPurpose` en horizonte oficial si no viene de Etapa 3 u Objetivo del PA.

## Riesgos detectados

- El OCR puede reordenar columnas y colocar `Objetivo 1 / Objetivo 2` antes de `Etapa 3`.
- En algunos proyectos hay mas de dos objetivos o el texto queda mezclado con mapas, enlaces o actividades.
- Algunas paginas introductorias del PPA usan lenguaje de horizonte, pero no pertenecen a un PA especifico.
- Una actualizacion masiva sin validacion podria presentar como horizonte de PA un objetivo de PPA o una actividad general.

## Build

Comando:

```powershell
npm.cmd run build
```

Resultado:

- Build exitoso.
- Vite compilo correctamente.
- Advertencia existente: chunk JavaScript mayor a 500 kB.
