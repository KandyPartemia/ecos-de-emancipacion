# Publicar gratis en Vercel

Esta landing puede publicarse gratis en Vercel con una URL tipo `.vercel.app`, sin comprar dominio.

## Opción recomendada: desde GitHub

1. Sube este proyecto al repositorio `KandyPartemia/ecos-de-emancipacion`.
2. Entra a [Vercel](https://vercel.com/) e inicia sesión.
3. Elige **Add New Project**.
4. Importa el repositorio desde GitHub.
5. Vercel detectará Vite automáticamente.
6. Revisa que los campos queden así:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
7. Haz clic en **Deploy**.

Al terminar, Vercel entregará una URL gratuita parecida a:

```text
https://ecos-de-emancipacion.vercel.app
```

El nombre exacto puede variar según disponibilidad. No es necesario comprar dominio.

## Opción alternativa: Vercel CLI

```bash
npm install
npm run build
npx vercel
```

Sigue las preguntas de Vercel y acepta publicar el proyecto. Si Vercel pregunta por el comando de build, usa `npm run build`; si pregunta por la carpeta de salida, usa `dist`.

## Después de publicar

Cuando tengas la URL final `.vercel.app`, actualiza `public/sitemap.xml` reemplazando la URL de ejemplo por la URL real del proyecto.
