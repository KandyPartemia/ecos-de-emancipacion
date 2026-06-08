# Auditoria de layout del mapa mental

Fecha: 2026-06-07

## Archivos modificados

- `src/caracoles/components/ProjectDashboard.tsx`
- `src/caracoles/components/EnglishLessonDashboard.tsx`

## Problema corregido

Los recuadros del mapa mental estaban compactando texto con puntos suspensivos y algunos listados limitaban la cantidad visible de elementos. Esto podia dejar incompleta la informacion pedagogica en tarjetas como:

- Conceptos academicos
- Paso a paso
- Situacion problematica
- Horizonte de expectativas
- Presentacion, trabajo comunitario y evaluacion

## Reglas corregidas

- Se elimino la funcion de compactacion que cortaba frases con `...`.
- Se quito el truncado visual dentro de los `MapBlock`.
- Se elimino el limite `items.slice(0, 8)` al renderizar los bullets del mapa.
- Se cambio el contenedor principal del mapa de `overflow-hidden` a `overflow-visible`.
- Se agregaron reglas de envoltura:
  - `min-w-0`
  - `break-words`
  - `whitespace-normal`
  - line-height mas comoda en listas
- Se redujo ligeramente el tamano de numero/titulos en movil.
- Los iconos decorativos quedaron con `shrink-0` y tamano menor para no invadir el texto.
- La fuente del libro dentro del nucleo central ahora puede envolver linea.

## Escritorio

El mapa conserva composicion tipo panel con tres columnas en escritorio. Las tarjetas pueden crecer en altura y el contenido ya no se recorta para mantener simetria rigida.

Evidencia:

- `reports/site/visual-evidence/mind-map-desktop-full.png`

## Tablet

El mapa se acomoda en una lectura vertical fluida. Las tarjetas quedan completas y legibles, sin cortes visibles.

Evidencia:

- `reports/site/visual-evidence/mind-map-tablet-full.png`

## Movil

El mapa se presenta en disposicion vertical. Los recuadros se apilan y el contenido queda completo; no se observa miniatura de escritorio ni scroll horizontal en la captura.

Evidencia:

- `reports/site/visual-evidence/mind-map-mobile-full.png`

## Ingles

Tambien se reforzo el mapa mental de Ingles para permitir saltos de linea en el nucleo, ramas, bullets e idea fuerza.

## Resultado de build

Comando ejecutado:

```powershell
npm.cmd run build
```

Resultado: correcto.

Notas:

- Vite transformo 1594 modulos.
- Se genero build de produccion.
- Persiste advertencia no bloqueante de chunk mayor a 500 kB.

## Limitaciones de verificacion

Chrome headless tuvo restricciones para capturar directamente el ancla del mapa con DevTools Protocol, por lo que se usaron capturas altas de pagina completa en escritorio, tablet y movil. Estas capturas si incluyen la seccion del mapa mental y permiten verificar visualmente la composicion.
