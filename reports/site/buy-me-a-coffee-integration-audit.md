# Integracion Buy Me a Coffee

Fecha: 2026-06-07

## Enlace integrado

- URL oficial: https://buymeacoffee.com/maestrakandy
- Apertura: nueva pestana con `target="_blank"` y `rel="noopener noreferrer"`

## Archivos creados

- `src/components/BuyMeACoffeeLink.jsx`

## Archivos modificados

- `src/App.jsx`
- `src/caracoles/CaracolesApp.tsx`

## Ubicacion de la integracion

- Header del sitio principal: boton pequeno `Apoyame` con icono de cafe.
- Seccion intermedia del sitio principal: tarjeta solidaria despues del bloque inicial de presentacion.
- Footer del sitio principal: enlace `Buy Me a Coffee` junto a redes sociales.
- Header de Caracoles Resonando: boton pequeno de apoyo.
- Menu auxiliar movil de Caracoles Resonando: boton de apoyo accesible en desplazamiento horizontal.
- Seccion intermedia de Caracoles Resonando: tarjeta solidaria integrada antes del selector curricular.
- Footer de Caracoles Resonando: enlace `Buy Me a Coffee` junto al cierre institucional.

## Accesibilidad

- El enlace no depende solo del icono: todas las variantes tienen texto visible.
- Cada variante incluye `aria-label` descriptivo.
- Se agregaron estados `focus:ring` para navegacion con teclado.
- El estilo usa colores calidos del sitio y mantiene contraste con el fondo.

## Paginas revisadas

- Pagina principal: integracion en header, seccion intermedia y footer.
- Recursos dentro de pagina principal: el enlace permanece disponible por header/footer global.
- Caracoles Resonando: integracion propia en header, seccion intermedia y footer.
- Ingles dentro de Caracoles: conserva el memorama solo dentro de la capa de Ingles; no se agrego a los PA generales.

## Resultado de build

Comando ejecutado:

```powershell
npm.cmd run build
```

Resultado: correcto.

Notas del build:

- Vite transformo 1594 modulos.
- Se genero `dist/index.html`, CSS y JS de produccion.
- Persiste advertencia no bloqueante de chunk mayor a 500 kB.

## Verificacion visual

No habia servidor local respondiendo en `http://127.0.0.1:5173/` durante esta auditoria, por lo que no se hizo captura visual en navegador.

Se verifico estaticamente que el build generado contiene:

- `https://buymeacoffee.com/maestrakandy`
- `Apoyame`
- `Invitar un cafe`
- `Buy Me a Coffee`
- `Apoyo solidario`

## Pendientes

- Abrir el sitio localmente o en Vercel para una revision visual final en escritorio y movil.
