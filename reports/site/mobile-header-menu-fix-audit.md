# Correccion del menu movil del header

Fecha: 2026-06-08

## Archivos modificados

- `src/App.jsx`
- `reports/site/mobile-header-menu-fix-audit.md`

## Causa del problema

El header tenia mas de una instancia de Buy Me a Coffee en el entorno movil:

- una visible en escritorio;
- una segunda visible en la fila movil a partir de `min-[520px]`;
- una tercera dentro del menu desplegable movil.

Esa combinacion podia desplazar o competir visualmente con el boton hamburguesa en pantallas pequenas.

## Solucion aplicada

- Se dejo Buy Me a Coffee en el header solo para escritorio con `hidden xl:inline-flex`.
- Se retiro Buy Me a Coffee de la fila superior movil.
- Se retiro Buy Me a Coffee del menu desplegable movil.
- Se ajusto el nombre del sitio con `min-w-0 truncate` para que no empuje el boton hamburguesa en anchos estrechos.

Buy Me a Coffee se conserva en el sitio fuera del header movil:

- seccion intermedia de apoyo;
- footer;
- header de escritorio.

## Verificacion

### Escritorio

- El header conserva la navegacion principal.
- Buy Me a Coffee permanece visible en escritorio.

### Movil

- El boton hamburguesa conserva su `aria-label` de apertura/cierre.
- En el header movil ya no se renderiza Buy Me a Coffee.
- No queda duplicacion de "Apoyame" dentro del header movil.
- El menu desplegable movil conserva los enlaces principales.

### Limitacion de verificacion visual automatica

Se intento abrir el sitio local para comprobacion visual automatizada. El navegador integrado bloqueo `http://127.0.0.1:5173/` con `ERR_BLOCKED_BY_CLIENT`. Tambien se intento tomar capturas headless con Edge, pero el proceso quedo colgado y no produjo capturas utiles. Los procesos temporales fueron cerrados y los archivos temporales propios fueron retirados.

## Build

Comando ejecutado:

```powershell
npm.cmd run build
```

Resultado:

- Build exitoso.
- Vite compilo correctamente.
- Advertencia existente: chunk JavaScript mayor a 500 kB.

## Pendientes

- Hacer una revision visual manual en navegador local para confirmar el despliegue del menu hamburguesa en el dispositivo de la usuaria.
