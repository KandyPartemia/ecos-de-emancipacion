import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve('public/caracoles/data/curricular-development')

const corrections = [
  ['grade-2-de-lo-humano-y-lo-comunitario-ppa-6.json', 17, 'conceptBook', 'El desarrollo sustentable en diversos contextos', 127, 130],
  ['grade-2-etica-naturaleza-y-sociedades-ppa-1.json', 1, 'conceptBook', 'La caída de México-Tenochtitlán', 28, 35],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-10.json', 29, 'conceptBook', 'Efecto invernadero', 169, 176],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-13.json', 38, 'conceptBook', 'Recolección, registro, análisis y comunicación de datos', 80, 84],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-14.json', 41, 'conceptBook', 'La proporcionalidad inversa de dos magnitudes o cantidades y su representación', 41, 46],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-15.json', 45, 'conceptBook', 'Estructura de la materia', 198, 203],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-3.json', 9, 'conceptBook', 'nicación de datos', 80, 84],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-5.json', 15, 'conceptBook', 'Dinámica', 278, 289],
  ['grade-2-lenguajes-ppa-1.json', 3, 'conceptBook', 'Prácticas culturales y ceremoniales de los pueblos indígenas', 181, 186],
  ['grade-2-lenguajes-ppa-11.json', 31, 'conceptBook', 'Prácticas culturales y ceremoniales de los pueblos indígenas', 181, 184],
  ['grade-2-lenguajes-ppa-11.json', 33, 'conceptBook', 'Prácticas culturales y ceremoniales de los pueblos indígenas', 181, 186],
  ['grade-2-lenguajes-ppa-12.json', 34, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-12.json', 35, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-12.json', 36, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-15.json', 43, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-15.json', 44, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-2.json', 4, 'conceptBook', 'Las identidades plurales en las sociedades contemporáneas', 167, 173],
  ['grade-2-lenguajes-ppa-2.json', 5, 'conceptBook', 'Las identidades plurales en las sociedades contemporáneas', 167, 173],
  ['grade-2-lenguajes-ppa-2.json', 6, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-5.json', 14, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-5.json', 14, 'conceptBook', 'Acciones comunes para la solución de problemas comunitarios', 195, 197],
  ['grade-2-lenguajes-ppa-5.json', 15, 'conceptBook', 'La expresión de ideas para la construcción de una sociedad incluyente', 163, 173],
  ['grade-2-lenguajes-ppa-1.json', 1, 'conceptBook', 'análisis y disfrute', 37, 41],
  ['grade-2-lenguajes-ppa-10.json', 28, 'conceptBook', 'análisis y disfrute', 37, 41],
  ['grade-2-lenguajes-ppa-3.json', 9, 'conceptBook', 'La literatura y el arte de la palabra en las lenguas originarias de México', 101, 109],
  ['grade-2-lenguajes-ppa-11.json', 32, 'conceptBook', 'Criterios para valorar la estética de obras culturales y artísticas, y cómo trascenderlos', 271, 276],
  ['grade-2-lenguajes-ppa-11.json', 33, 'conceptBook', 'El trabajo de la milpa como práctica cultural de las comunidades indígenas', 135, 144],
  ['grade-2-lenguajes-ppa-14.json', 41, 'conceptBook', 'El trabajo de la milpa como práctica cultural de las comunidades indígenas', 135, 144],
  ['grade-2-lenguajes-ppa-14.json', 42, 'conceptBook', 'El trabajo de la milpa como práctica cultural de las comunidades indígenas', 135, 144],
]

const titleCorrections = [
  ['grade-2-lenguajes-ppa-1.json', 1, 'conceptBook', 'análisis y disfrute', 'La interpretación de textos literarios: análisis y disfrute'],
  ['grade-2-lenguajes-ppa-10.json', 28, 'conceptBook', 'análisis y disfrute', 'La interpretación de textos literarios: análisis y disfrute'],
  ['grade-2-lenguajes-ppa-10.json', 28, 'conceptBook', 'personal y comunitario', 'La autobiografía y la crónica como vehículos para el conocimiento personal y comunitario'],
  ['grade-2-saberes-y-pensamiento-cientifico-ppa-3.json', 9, 'conceptBook', 'nicación de datos', 'Recolección, registro, análisis y comunicación de datos'],
]

const changedFiles = new Set()
const applied = []

for (const [file, pa, section, title, startPage, endPage] of corrections) {
  const filePath = path.join(root, file)
  const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const project = bundle.development.academicProjects.find(
    (entry) => Number(entry.academicProjectNumber) === pa,
  )
  if (!project) throw new Error(`No se encontró PA${pa} en ${file}`)
  const reference = (project.sourcePages?.[section] || []).find(
    (entry) => entry.topicTitle === title,
  )
  if (!reference) throw new Error(`No se encontró "${title}" en PA${pa}, ${file}`)
  reference.startPage = startPage
  reference.endPage = endPage
  const pagesLabel = startPage === endPage ? `p. ${startPage}` : `pp. ${startPage}-${endPage}`
  if ('pages' in reference) reference.pages = pagesLabel
  if ('pagesLabel' in reference) reference.pagesLabel = pagesLabel
  fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  changedFiles.add(file)
  applied.push({ file, pa, title, startPage, endPage })
}

for (const [file, pa, section, oldTitle, newTitle] of titleCorrections) {
  const filePath = path.join(root, file)
  const bundle = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const project = bundle.development.academicProjects.find(
    (entry) => Number(entry.academicProjectNumber) === pa,
  )
  const reference = (project?.sourcePages?.[section] || []).find(
    (entry) => entry.topicTitle === oldTitle,
  )
  if (!reference) throw new Error(`No se encontró "${oldTitle}" para completar su título en PA${pa}, ${file}`)
  reference.topicTitle = newTitle
  fs.writeFileSync(filePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
  changedFiles.add(file)
}

// The automated remap records the new label in `pages`; keep the public label in sync.
for (const filePath of fs.readdirSync(root).filter((name) => name.startsWith('grade-2-') && name.endsWith('.json'))) {
  const absolutePath = path.join(root, filePath)
  const bundle = JSON.parse(fs.readFileSync(absolutePath, 'utf8'))
  let changed = false
  for (const project of bundle.development?.academicProjects || []) {
    for (const section of ['conceptBook', 'multiplesLenguajes', 'englishBook']) {
      for (const reference of project.sourcePages?.[section] || []) {
        if (reference.pages && reference.pagesLabel !== reference.pages) {
          reference.pagesLabel = reference.pages
          changed = true
        }
      }
    }
  }
  if (changed) {
    fs.writeFileSync(absolutePath, `${JSON.stringify(bundle, null, 2)}\n`, 'utf8')
    changedFiles.add(filePath)
  }
}

console.log(JSON.stringify({ changedFiles: [...changedFiles].sort(), applied }, null, 2))
