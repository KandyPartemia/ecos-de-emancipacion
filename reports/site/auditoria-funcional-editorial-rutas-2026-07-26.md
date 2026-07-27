# Auditoría funcional y editorial de rutas

Fecha: 2026-07-26

## Correcciones públicas

- Escuela Ecos se movió a una posición más visible en la portada.
- Las rutas docente, familias y jóvenes dejaron de mostrarse como pendientes y ahora incluyen accesos directos.
- Se retiró de la interfaz el panel de porcentajes de desarrollo por ruta.
- Se sustituyó la explicación interna del estado de Escuela por una orientación útil para elegir recorrido.
- La información de seguimiento permanece únicamente en reportes internos.

## Criterio editorial

La interfaz pública debe explicar beneficios, destinatarios, formas de uso, disponibilidad real y siguientes pasos. Los porcentajes, prioridades de implementación, notas de desarrollo y control técnico no forman parte de la experiencia pública.

## Verificación realizada

- Build de producción correcto con Vite 7.3.3.
- Respuesta HTTP 200 confirmada para 14 rutas: inicio, Empieza aquí, Manifiesto, Resonancias, Pilares, Cognitología, Escuela, Recursos, Universo musical, Tienda, Familias, Jóvenes, Proyectos y Caracoles Resonando.
- Escuela Ecos confirmada en la portada y en `/escuela`.
- Accesos directos confirmados hacia ruta docente, Familias y Jóvenes.
- Revisión móvil a 390 px mediante captura de producción.
- Panel público de porcentajes eliminado.

## Pendientes internos

Los porcentajes y prioridades de desarrollo continuarán registrándose en documentos internos y no se mostrarán a visitantes.
