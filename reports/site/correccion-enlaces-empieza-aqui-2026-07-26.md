# Corrección de enlaces en Empieza aquí

Fecha: 2026-07-26

## Causa

Tres botones utilizaban anclas locales. En la portada podían encontrar la sección correspondiente, pero dentro de `/empieza-aqui` esas secciones no forman parte del documento y los botones no producían navegación.

## Correcciones

- `Leer manifiesto`: ahora abre `/manifiesto`.
- `Ver mapa del universo Ecos`: ahora abre `/#mapa-universo`.
- Acceso a Jóvenes: ahora abre `/jovenes`.

## Revisión complementaria

Los enlaces `#escuela-rutas` y `#practica-docente` permanecen como anclas locales válidas porque sus destinos sí existen dentro del componente Escuela Ecos tanto en portada como en su ruta propia.
