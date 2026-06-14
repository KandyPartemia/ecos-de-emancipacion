# Capa de honestidad curricular en Caracoles Resonando

Fecha: 2026-06-08  
Base: `reports/caracoles/curricular-horizon-video-audit.md`

## Archivos modificados

- `src/caracoles/lib/academicProjectRecord.ts`
- `src/caracoles/lib/academicProjectRecordAdapter.ts`
- `src/caracoles/components/ProjectDashboard.tsx`
- `reports/caracoles/curricular-honesty-layer-audit.md`

No se modificaron masivamente:

- catálogo canónico;
- `selectable-projects.json`;
- `confirmed-projects.json`;
- bundles curriculares;
- datos de Inglés;
- juegos;
- mapa mental;
- memorama;
- SEO.

## Reglas aplicadas para horizonte

La ficha ahora muestra el estado del horizonte sin presentar textos provisionales como oficiales.

- `confirmed`: se presenta como **Horizonte de expectativa confirmado**.
- `teacher-orientation`: se presenta como **Orientación pedagógica provisional**.
- `pending`: se presenta como **Horizonte pendiente de validación en fuente**.
- `review`: queda disponible como estado para mostrar **Horizonte en revisión** si se detecta una asignación dudosa en una fase posterior.

Cuando el horizonte es provisional, se agrega la nota:

> Este texto orienta el trabajo docente, pero aún requiere validación directa en la fuente curricular.

Cuando falta el horizonte, no se inventa texto. Se muestra una tarjeta con estado pendiente y la nota:

> No se muestra un horizonte inventado; falta validarlo directamente en la fuente curricular.

## Reglas aplicadas para videos

Se agregó una clasificación derivada en la capa adaptadora, sin alterar las fuentes.

- Si la URL del PA es clara y no está repetida: **Video/recurso del Proyecto Académico**.
- Si el video corresponde al PPA: **Video detonador del Proyecto Parcial de Aula**.
- Si la URL del PA coincide con la URL del PPA: **Enlace pendiente de validación específica**.
- Si la URL del PA aparece asociada a varios PA: **Enlace pendiente de validación específica**.
- Si no hay URL directa: **Video específico pendiente de validación**.

La nota para PPA indica:

> Este video corresponde al PPA completo y puede orientar los Proyectos Académicos relacionados.

La nota para enlaces dudosos indica que no se presenta como video específico del PA hasta validarlo manualmente.

## Manejo de fallback, missing y duplicados

- `fallback`: se conserva el texto, pero se baja la etiqueta a orientación provisional.
- `missing`: se muestra estado pendiente sin texto inventado.
- duplicados de video: se conserva la URL disponible, pero no se confirma como video específico del PA.
- PA = PPA: se marca como pendiente de validación específica para evitar confundir el video detonador del PPA con el recurso propio del PA.

## Ejemplos revisados

1. 1° Lenguajes, PA 1, "Así lo expresan, así lo deben sentir y pensar"
   - Horizonte: confirmado desde fuente curricular.
   - Video PA: URL distinta de PPA y no duplicada.
   - Presentación esperada: **Horizonte de expectativa confirmado** y **Video/recurso del Proyecto Académico**.

2. 1° Lenguajes, PA 25, "Lo mejor de lo mejor"
   - Horizonte: orientación/fallback pedagógico.
   - Presentación esperada: **Orientación pedagógica provisional**.

3. 2° De lo Humano y lo Comunitario, PA 1, "Entrevistas para un proyecto de vida"
   - Video PA = Video PPA.
   - Presentación esperada: **Enlace pendiente de validación específica** para el PA y **Video detonador del Proyecto Parcial de Aula** para el PPA.

4. 2° De lo Humano y lo Comunitario, PA 2, "¡Para actuar necesitamos un plan!"
   - URL del PA repetida en varios PA.
   - Presentación esperada: **Enlace pendiente de validación específica**.

5. 3° Lenguajes, PA 1, "¡Mi opinión es muy valiosa!"
   - Horizonte faltante.
   - Video PA = Video PPA.
   - Presentación esperada: **Horizonte pendiente de validación en fuente** y **Enlace pendiente de validación específica**.

6. Inglés
   - No se modificó la lógica de Inglés.
   - Sigue separado de PPA/PA, Posibilidades de uso y mapas de videos curriculares.

## Verificación

- `npm.cmd run build`: exitoso.
- La verificación visual directa en el navegador integrado no pudo completarse porque localhost fue bloqueado por el navegador con `ERR_BLOCKED_BY_CLIENT`.
- Se realizó verificación funcional estática de casos representativos mediante lectura de mapas y catálogo, además del build de producción.

## Confirmación de no invención

No se inventaron horizontes ni enlaces. La implementación solo cambia cómo se presentan los estados derivados:

- confirmado;
- provisional;
- pendiente;
- dudoso por duplicación o coincidencia PA/PPA.

## Riesgos pendientes

- Un enlace duplicado puede ser válido como recurso de bloque, pero no debe confirmarse como video específico sin revisión humana.
- Algunos textos curriculares usan `official`; la capa lo trata como fuente confirmada cuando hay texto disponible.
- Tercer grado requiere validación manual de horizontes desde `Nuestro libro de proyectos`.

## Recomendaciones siguientes

1. Validar manualmente los 49 casos donde video PA = video PPA.
2. Validar los 165 PA afectados por URLs académicas duplicadas.
3. Completar horizontes de 3° desde los tomos y páginas correspondientes.
4. Después de esa validación, actualizar datos fuente de forma puntual, no masiva.

