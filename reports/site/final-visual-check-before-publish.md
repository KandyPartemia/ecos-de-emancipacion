# Verificacion visual final antes de publicar

Fecha: 2026-06-07

## Build

Comando ejecutado:

```powershell
npm.cmd run build
```

Resultado: correcto.

Notas:

- Vite transformo 1594 modulos.
- Se genero build de produccion.
- Persiste advertencia no bloqueante de chunk mayor a 500 kB.

## Mapa mental

### Escritorio

Evidencia revisada:

- `reports/site/final-visual-check/pa-desktop.png`
- `reports/site/visual-evidence/mind-map-desktop-full.png`

Resultado:

- No se observan textos cortados en los recuadros del mapa.
- No se observan recuadros encimados.
- La composicion conserva formato de panel en escritorio.
- Los recuadros crecen segun contenido.

### Tablet

Evidencia revisada:

- `reports/site/final-visual-check/pa-tablet.png`
- `reports/site/visual-evidence/mind-map-tablet-full.png`

Resultado:

- El mapa se acomoda en disposicion vertical fluida.
- No se observan textos truncados ni recuadros superpuestos.
- La lectura sigue siendo clara.

### Movil vertical

Evidencia revisada:

- `reports/site/visual-evidence/mind-map-mobile-full.png`

Resultado:

- El mapa se presenta en disposicion vertical.
- Los recuadros se apilan correctamente.
- No se observa scroll horizontal en la captura movil.
- No se observan textos cortados en los recuadros visibles del mapa.

### Reglas verificadas por codigo

Se reviso que en los componentes del mapa no queden:

- `compactMindMapItem`
- `items.slice(0, 8)` para recortar bullets del mapa
- `overflow-hidden` en el contenedor principal del mapa mental de PA
- `line-clamp`, `truncate` o `max-height` aplicado al mapa

La unica aparicion de puntos suspensivos detectada corresponde a una funcion auxiliar de etiquetas de otro modulo visual, no a los recuadros del mapa mental.

## Mapa mental de Ingles

Evidencia revisada:

- `reports/site/final-visual-check/english-desktop.png`
- `reports/site/final-visual-check/english-tablet.png`
- `reports/site/final-visual-check/english-mobile.png`

Resultado:

- El nucleo y las ramas del mapa de Ingles permiten salto de linea.
- No se observan tarjetas encimadas.
- En movil, la seccion se mantiene en lectura vertical.

## Memorama

URL final esperada:

```text
https://maestrakandy.my.canva.site/memorama
```

### Menu `Memorama`

Verificacion por codigo:

- `src/caracoles/CaracolesApp.tsx` usa `ENGLISH_MEMORY_GAME_URL`.
- El enlace externo del menu usa `target="_blank"` y `rel="noopener noreferrer"`.

Resultado: correcto.

### Seccion de Ingles

Verificacion por codigo:

- Boton `Abrir memorama`: `href={ENGLISH_MEMORY_GAME_URL}`.
- Iframe/embebido: `src={ENGLISH_MEMORY_GAME_URL}`.
- Boton bajo el iframe: `href={ENGLISH_MEMORY_GAME_URL}`.
- Texto visible del boton bajo el iframe: `Abrir Memory Quest – Caracoles Resonando`.

Resultado: correcto.

### URLs anteriores

Verificacion:

- No quedan referencias en `src/caracoles` a:
  - `memory-quest`
  - `DAHLYRcPB74`
  - `canva.com/design`
- En `dist/assets/*.js` no se encontraron URLs anteriores del memorama.

Resultado: correcto.

### Movil

Evidencia revisada:

- `reports/site/final-visual-check/english-mobile.png`

Resultado:

- La seccion del memorama no rompe el layout movil.
- El iframe conserva su marco responsivo.
- En Chrome headless el contenido externo de Canva aparece como documento no cargado, pero el marco y botones se mantienen correctamente. La URL final se verifico por codigo y build.

## Pendientes

No hay pendientes tecnicos bloqueantes para publicar.

Nota: quedan archivos locales no relacionados ya existentes en el entorno (`package.json`, `package-lock.json`, `tmp/`, logs y carpetas de trabajo). No forman parte de esta verificacion ni deben agregarse al commit de estos cambios.
