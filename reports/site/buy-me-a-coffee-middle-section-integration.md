# Integracion Buy Me a Coffee en llamada intermedia

Fecha: 2026-06-07

## Archivos modificados

- `src/App.jsx`

## Como quedo el boton

Se agrego un cuarto boton en la seccion intermedia con el titulo:

> Si esta propuesta resono contigo, compartela.

El boton usa:

- Icono de cafe de `lucide-react`.
- Texto visible: `Invitarme un cafe`.
- Enlace: `https://buymeacoffee.com/maestrakandy`.
- Apertura en nueva pestana.
- `rel="noopener noreferrer"`.
- `aria-label="Apoyar a Maestra Kandy en Buy Me a Coffee"`.

## Orden final de botones

1. Seguir en YouTube: estilo neutro / contorno.
2. Escribirme por WhatsApp: estilo oro solido.
3. Ver Instagram: estilo neutro / contorno.
4. Invitarme un cafe: estilo oro solido.

La fila conserva alternancia visual entre botones neutros y botones oro. Se agrego `sm:flex-wrap` para que en pantallas angostas los botones puedan acomodarse en dos lineas sin romper la composicion.

## Accesibilidad

- El boton tiene texto visible.
- Tiene `aria-label` especifico.
- Hereda foco visible de las clases de boton del sitio.
- El tono oro usa texto oscuro para mantener contraste.

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

## Verificacion visual

No se levanto servidor nuevo. La revision se hizo por codigo y build:

- Header: conserva el boton `Apoyame` ya integrado.
- Seccion intermedia: ahora contiene el cuarto boton `Invitarme un cafe`.
- Footer/redes: conserva `Buy Me a Coffee`.
- Responsividad: la fila de la seccion intermedia permite ajuste con `sm:flex-wrap`.

Pendiente opcional: revisar en navegador local o Vercel con ancho movil para confirmar la percepcion visual final.
