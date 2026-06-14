# Memory Quest como tarjeta externa

Fecha: 2026-06-08

## Archivos modificados

- `src/caracoles/components/EnglishLessonDashboard.tsx`
- `reports/caracoles/memory-quest-external-card-fallback.md`

## Causa del cambio

En produccion, el memorama publicado en Canva no cargaba correctamente dentro de un `iframe`. En movil aparecia un recuadro gris con icono de archivo roto dentro de la seccion "Memorama interactivo". Esto indica que el sitio de Canva puede bloquear el embebido directo o requerir un mecanismo de insercion distinto.

## Solucion aplicada

- Se retiro el `iframe` del memorama en la seccion de Ingles.
- Se sustituyo por una tarjeta visual estable que no depende de cargar Canva embebido.
- La seccion conserva el titulo "Memorama interactivo".
- La tarjeta muestra el titulo "Memory Quest – Caracoles Resonando".
- La descripcion indica que es un memorama interactivo para reforzar vocabulario en ingles con niveles, puntaje y caracoles simbolicos.
- El boton principal dice "Abrir memorama".

## Enlace externo

La URL final se mantiene sin cambios:

`https://maestrakandy.my.canva.site/memorama`

El boton abre en una pestaña nueva con:

- `target="_blank"`
- `rel="noopener noreferrer"`

## Menu Memorama

El menu de Caracoles mantiene el enlace externo a `ENGLISH_MEMORY_GAME_URL`, que apunta a la misma URL final del memorama.

## Verificacion movil

La seccion ya no renderiza iframe, por lo que no debe aparecer el recuadro gris roto en movil. En su lugar aparece una tarjeta con icono de juego, texto descriptivo y boton externo.

## Build

Comando:

```powershell
npm.cmd run build
```

Resultado:

- Build exitoso.
- Vite compilo correctamente.
- Advertencia existente: chunk JavaScript mayor a 500 kB.

## Pendientes

- Revision visual manual en produccion o preview para confirmar que la tarjeta sustituye correctamente el recuadro roto.
