import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceFile = path.join(projectRoot, 'dist', 'index.html')
const outputFile = path.join(
  projectRoot,
  'dist',
  'recursos',
  'caracoles-resonando',
  'index.html',
)

const metadata = {
  title: 'Caracoles Resonando — Planea tu PA de Telesecundaria',
  description:
    'Ficha curricular, fuentes, mapa mental y autoevaluación para los 432 Proyectos Académicos de Telesecundaria NEM.',
  url: 'https://ecos-de-emancipacion.vercel.app/recursos/caracoles-resonando',
  image:
    'https://ecos-de-emancipacion.vercel.app/images/og-caracoles-resonando.png',
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`No se encontró ${label} en dist/index.html`)
  }

  return html.replace(pattern, replacement)
}

function replaceOpenGraph(html, property, value) {
  const tagPattern = new RegExp(
    `<meta\\b[^>]*\\bproperty=(['"])${property}\\1[^>]*>`,
    'i',
  )

  return replaceRequired(
    html,
    tagPattern,
    (tag) => {
      const contentPattern = /\bcontent=(['"])[\s\S]*?\1/i
      const content = `content="${escapeHtml(value)}"`

      if (contentPattern.test(tag)) {
        return tag.replace(contentPattern, content)
      }

      return tag.replace(/\s*\/?\s*>$/, ` ${content} />`)
    },
    `meta[property="${property}"]`,
  )
}

function replaceNamedMeta(html, name, value) {
  const tagPattern = new RegExp(
    `<meta\\b[^>]*\\bname=(['"])${name}\\1[^>]*>`,
    'i',
  )

  return replaceRequired(
    html,
    tagPattern,
    (tag) => {
      const contentPattern = /\bcontent=(['"])[\s\S]*?\1/i
      const content = `content="${escapeHtml(value)}"`

      if (contentPattern.test(tag)) {
        return tag.replace(contentPattern, content)
      }

      return tag.replace(/\s*\/?\s*>$/, ` ${content} />`)
    },
    `meta[name="${name}"]`,
  )
}

let html = await readFile(sourceFile, 'utf8')

html = replaceRequired(
  html,
  /<title>[\s\S]*?<\/title>/i,
  `<title>${escapeHtml(metadata.title)}</title>`,
  'el elemento title',
)
html = replaceOpenGraph(html, 'og:title', metadata.title)
html = replaceOpenGraph(html, 'og:description', metadata.description)
html = replaceOpenGraph(html, 'og:url', metadata.url)
html = replaceOpenGraph(html, 'og:image', metadata.image)
html = replaceNamedMeta(html, 'twitter:image', metadata.image)
html = replaceRequired(
  html,
  /<link\b[^>]*\brel=['"]canonical['"][^>]*>/i,
  `<link rel="canonical" href="${metadata.url}" />`,
  'link canonical',
)

await mkdir(path.dirname(outputFile), { recursive: true })
await writeFile(outputFile, html, 'utf8')

console.log(
  'Metadatos estáticos generados: dist/recursos/caracoles-resonando/index.html',
)
