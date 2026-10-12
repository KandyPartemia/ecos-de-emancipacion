# Auditoría de columnas de Posibilidades de uso y videos de PA

Fecha: 2026-10-11

## Alcance

Se revisaron los 432 Proyectos Académicos de los tres grados. La lectura se realizó desde los doce PDF de Posibilidades de uso, respetando las tres columnas físicas de cada tabla y la continuidad indicada como `1 de 2 / 2 de 2`.

## Resultado de dosificación

- PA revisados: 432.
- PA cuya dosificación ocupa una página: 210.
- PA cuya dosificación ocupa dos páginas: 222.
- Rangos de páginas corregidos: 176.
- Discrepancias de rango después de la corrección: 0.
- Referencias nuevas de libros de campo formativo: 616.
- Rangos existentes de libros de campo ampliados: 52.
- Referencias nuevas de Múltiples Lenguajes: 110.
- Fragmentos OCR excluidos por no constituir títulos completos: 41.

La asignación se hizo por geometría de columna. No se reutilizó el texto corrido de la página completa, porque ese procedimiento mezcla referencias de PA vecinos.

## Resultado de videos

- Videos con estado `confirmed`: 250.
- Videos con estado `revalidated-specific`: 181.
- Video sin URL: 1, correspondiente a 2° Ética, Naturaleza y Sociedades, PA12, que permanece como `not-found`.

El adaptador de la interfaz no reconocía `revalidated-specific` como una confirmación válida. Se corrigió esa equivalencia para que los 181 videos revalidados vuelvan a mostrar su acceso a YouTube. No se cambiaron URLs.

## Reglas conservadoras

- Una ficha `1 de 1` recibe solo su página física.
- Una ficha `1 de 2` recibe también la página siguiente únicamente cuando mantiene la misma estructura de tres columnas.
- Cada PA toma referencias exclusivamente de su propia columna.
- No se incorporan fragmentos OCR con encabezados, texto incompleto o mezcla visible.
- Las referencias ya existentes se conservan; solo se amplía un rango cuando comparte la misma página inicial.

## Verificación

- Auditoría posterior: 432 PA comparados y 0 discrepancias de páginas.
- Build: correcto con Vite 7.3.3.
- El verificador curricular mantiene tres incidencias preexistentes sobre consistencia del recurso general de PPA en 3° Ética, Naturaleza y Sociedades, PPA 5, 6 y 7. Estas incidencias son distintas de los videos específicos de PA y no se modificaron en esta fase.
