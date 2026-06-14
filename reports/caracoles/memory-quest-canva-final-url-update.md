# Actualizacion de URL final del memorama

Fecha: 2026-06-07

## Archivos modificados

- `src/caracoles/lib/englishLessons.ts`
- `src/caracoles/components/EnglishLessonDashboard.tsx`
- `src/caracoles/CaracolesApp.tsx`

## URLs anteriores encontradas

- `https://maestrakandy.my.canva.site/memory-quest-english-vocabulary-challenge-memorama`
- `https://www.canva.com/design/DAHLYRcPB74/LSrA8-pThbcCJjwEvf5nHQ/view?embed`
- `https://www.canva.com/design/DAHLYRcPB74/LSrA8-pThbcCJjwEvf5nHQ/view?utm_content=DAHLYRcPB74&utm_campaign=designshare&utm_medium=embeds&utm_source=link`

## URL nueva integrada

- `https://maestrakandy.my.canva.site/memorama`

## Donde quedo integrada

- Constante `ENGLISH_MEMORY_GAME_URL` en `src/caracoles/lib/englishLessons.ts`.
- Menu superior de Caracoles, item `Memorama`, porque usa `ENGLISH_MEMORY_GAME_URL`.
- Boton `Abrir memorama` en la ficha de Ingles.
- Iframe del memorama en la seccion de Ingles.
- Boton bajo el iframe, ahora visible como `Abrir Memory Quest – Caracoles Resonando`.

## Iframe / embed

Si habia iframe. Se actualizo su `src` para usar:

```text
https://maestrakandy.my.canva.site/memorama
```

## Enlaces externos

Los enlaces externos del memorama quedaron con:

```html
target="_blank"
rel="noopener noreferrer"
```

Tambien se ajusto el `rel` del menu externo de Caracoles para cumplir la misma regla.

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

## Verificacion

- En `src/caracoles` ya no quedan referencias a:
  - `memory-quest`
  - `DAHLYRcPB74`
  - `canva.com/design`
- La unica URL Canva del memorama en `src/caracoles` es:
  - `https://maestrakandy.my.canva.site/memorama`
- En `dist/assets/*.js` no se encontraron las URLs anteriores del memorama.

## Nota

No se redisenaron menus, selector, juegos, autoevaluacion ni datos curriculares. El cambio se limito a la URL final del memorama, su iframe y sus enlaces asociados.
