# Correccion estable del menu movil del header

Fecha: 2026-06-08

## Archivos modificados

- `src/App.jsx`
- `reports/site/mobile-header-menu-fix-audit.md`

## Causa probable de la regresion

El header movil no tenia reglas suficientemente defensivas para proteger el boton hamburguesa cuando algun elemento auxiliar del header cambiaba de visibilidad o competia por espacio. Aunque Buy Me a Coffee ya estaba marcado para escritorio, el contenedor de acciones moviles y el boton hamburguesa no tenian prioridad explicita de ancho, z-index y no encogimiento.

Esto podia provocar que, en algunos anchos moviles o despues de cambios publicados, el espacio del header se resolviera de forma fragil y la accion de apoyo pareciera desplazar o sustituir el control del menu.

## Solucion aplicada

- Se mantuvo Buy Me a Coffee del header como elemento solo de escritorio con `hidden shrink-0 xl:inline-flex`.
- Se dio prioridad al grupo movil con `ml-auto`, `shrink-0` y z-index.
- Se hizo que el boton hamburguesa sea `flex-shrink-0`, tenga fondo propio, z-index superior y foco visible.
- Se agrego `aria-controls="site-mobile-menu"` al boton para relacionarlo con el menu desplegable.
- Se identifico el menu desplegable con `id="site-mobile-menu"` y z-index propio.
- Se oculto el boton auxiliar `Empieza Aqui` en anchos moviles pequenos, dejandolo visible desde `sm`, para que no compita en 360px o 390px.

## Regla preventiva para Buy Me a Coffee

Buy Me a Coffee no se muestra dentro del header movil. Permanece disponible en:

- header de escritorio;
- seccion intermedia de apoyo;
- footer.

Con esto, en movil el header prioriza:

1. identidad del sitio;
2. boton hamburguesa;
3. menu desplegable.

## Verificacion responsive

### Escritorio

- La navegacion principal se mantiene en la barra superior.
- Buy Me a Coffee permanece visible como accion de escritorio.

### Tablet

- El header usa el menu movil mientras no entre el breakpoint `xl`.
- El boton hamburguesa conserva posicion al extremo derecho.
- El boton auxiliar puede mostrarse sin desplazar la hamburguesa.

### Movil 390px y 360px

- El boton hamburguesa tiene `flex-shrink-0` y z-index propio.
- Buy Me a Coffee no se renderiza en la fila superior movil.
- No hay duplicacion de "Apoyame" en el header movil.
- La accion auxiliar `Empieza Aqui` queda oculta en esos anchos para liberar espacio.
- El menu desplegable conserva sus enlaces y queda asociado al boton con `aria-controls`.

## Alcance

No se modifico:

- Caracoles Resonando;
- memorama;
- mapa mental;
- datos curriculares;
- SEO;
- contenido de paginas internas.

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

- La usuaria debe confirmar visualmente en celular antes de hacer commit.
