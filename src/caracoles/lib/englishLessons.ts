import grade1EnglishData from '../../../content/caracoles/curricular-links/grade-1-english-book-source-links.json';
import grade2EnglishData from '../../../content/caracoles/curricular-links/grade-2-english-book-source-links.json';
import grade3EnglishData from '../../../content/caracoles/curricular-links/grade-3-english-book-source-links.json';
import type { GradeId } from '../types';

export const ENGLISH_MEMORY_GAME_URL =
  'https://maestrakandy.my.canva.site/memorama';

type EnglishRawLesson = {
  grade: GradeId;
  gradeLabel?: string;
  englishBookTitle?: string;
  englishBookProjectIndex: number;
  academicProjectTitle: string;
  englishBookLink?: {
    status?: string;
    confidence?: number;
    startPage?: number;
    endPage?: number;
  };
  sourcePages?: {
    englishBook?: string[];
  };
  introSpanish?: string;
  introEnglish?: string;
  expectedProduct?: {
    title?: string;
    status?: string;
  };
  associatedSections?: string[];
  associatedReadings?: string[];
  warnings?: string[];
  needsHumanReview?: boolean;
};

type EnglishSource = {
  projects?: EnglishRawLesson[];
};

export type EnglishLesson = {
  id: string;
  grade: GradeId;
  gradeLabel: string;
  lessonNumber: number;
  title: string;
  bookTitle: string;
  pagesLabel: string;
  startPage?: number;
  endPage?: number;
  sourceStatus: 'confirmed' | 'needsReview';
  sourceConfidence?: number;
  detonatingSituationEs: string;
  detonatingSituationEn: string;
  introSpanish: string;
  introEnglish: string;
  expectedProduct: string;
  academicContent: string[];
  vocabulary: string[];
  grammarFocus: {
    title: string;
    explanationEs: string;
    sequence: string[];
    model: string;
  };
  mindMap: {
    center: string;
    branches: Array<{ title: string; items: string[] }>;
    ideaForce: string;
  };
  selfAssessment: {
    resonanceQuestion: string;
    matchingPairs: Array<{ term: string; definition: string }>;
    productionChallenge: string;
  };
  evaluation: {
    vocabulary: string[];
    reading: string[];
    grammar: string[];
    production: string[];
    oralWritten: string[];
  };
  sections: string[];
  readings: string[];
  warnings: string[];
};

const gradeSources: Record<GradeId, EnglishSource> = {
  '1': grade1EnglishData as EnglishSource,
  '2': grade2EnglishData as EnglishSource,
  '3': grade3EnglishData as EnglishSource,
};

const ENGLISH_STOPWORDS = new Set([
  'about',
  'after',
  'also',
  'among',
  'being',
  'create',
  'during',
  'every',
  'final',
  'grade',
  'great',
  'living',
  'other',
  'people',
  'project',
  'promote',
  'purpose',
  'through',
  'using',
  'where',
  'which',
  'while',
  'will',
  'with',
  'world',
  'your',
]);

function repairText(value = '') {
  if (!value) return '';

  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

function sentenceCase(value: string) {
  const clean = repairText(value).trim();
  return clean ? clean.charAt(0).toUpperCase() + clean.slice(1) : '';
}

function extractPageLabel(lesson: EnglishRawLesson) {
  const explicit = lesson.sourcePages?.englishBook?.[0];
  if (explicit) return repairText(explicit);

  const start = lesson.englishBookLink?.startPage;
  const end = lesson.englishBookLink?.endPage;
  if (start && end) return `${repairText(lesson.englishBookTitle || 'Libro de Inglés')} pp. ${start}-${end}`;
  return repairText(lesson.englishBookTitle || 'Libro de Inglés');
}

function getExpectedProduct(lesson: EnglishRawLesson) {
  const product = repairText(lesson.expectedProduct?.title || '');
  if (product) return sentenceCase(product);

  const intro = repairText(lesson.introEnglish || lesson.introSpanish || '');
  const match = intro.match(/(?:will|crearás|elaborarás|propondrás|presentarás)\s+(.+?)(?:\.|$)/i);
  if (match?.[1]) return sentenceCase(match[1]);
  return 'Producto de aprendizaje derivado de la lección.';
}

function inferVocabulary(lesson: EnglishRawLesson) {
  const text = [
    lesson.academicProjectTitle,
    lesson.introEnglish,
    lesson.expectedProduct?.title,
    ...(lesson.associatedReadings || []),
  ]
    .map(repairText)
    .join(' ');

  const candidates = text
    .replace(/[^A-Za-z\s-]/g, ' ')
    .split(/\s+/)
    .map((word) => word.toLowerCase())
    .filter((word) => word.length >= 5 && !ENGLISH_STOPWORDS.has(word));

  const unique = Array.from(new Set(candidates))
    .slice(0, 10)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  return unique.length ? unique : ['Vocabulary', 'Reading', 'Question', 'Answer', 'Project'];
}

function inferAcademicContent(lesson: EnglishRawLesson, vocabulary: string[]) {
  const sections = (lesson.associatedSections || []).map(repairText).filter(Boolean);
  const readings = (lesson.associatedReadings || []).map(repairText).filter(Boolean);
  return Array.from(
    new Set([
      'Vocabulario temático / Thematic vocabulary',
      'Comprensión lectora / Reading comprehension',
      'Producción oral y escrita / Oral and written production',
      ...sections.slice(0, 4).map((section) => `${section} / etapa de trabajo`),
      ...readings.slice(0, 3).map((reading) => `Lectura asociada: ${reading}`),
      ...vocabulary.slice(0, 3).map((term) => `Palabra clave: ${term}`),
    ]),
  ).slice(0, 9);
}

function inferGrammarFocus(grade: GradeId, lessonNumber: number, title: string) {
  const progression: Record<GradeId, Array<{ title: string; explanationEs: string; sequence: string[]; model: string }>> = {
    '1': [
      {
        title: 'Simple present with be / Presente simple con be',
        explanationEs: 'Sirve para presentarse, describir identidades, lugares, hábitos y características básicas.',
        sequence: ['Identificar el sujeto.', 'Elegir am, is o are.', 'Agregar complemento.', 'Comprobar si la oración describe una idea actual.'],
        model: 'I am a student. / We are part of a community.',
      },
      {
        title: 'Simple present and routines / Presente simple y rutinas',
        explanationEs: 'Permite expresar acciones frecuentes, hábitos saludables y prácticas comunitarias.',
        sequence: ['Elegir sujeto.', 'Usar verbo base.', 'Agregar -s con he, she o it.', 'Añadir frecuencia o contexto.'],
        model: 'She practices dance. / People protect coral reefs.',
      },
      {
        title: 'Wh- questions / Preguntas con wh-',
        explanationEs: 'Ayuda a investigar, recuperar información y formular preguntas sobre textos.',
        sequence: ['Elegir palabra interrogativa.', 'Agregar auxiliar o verbo be.', 'Colocar sujeto.', 'Cerrar con idea específica.'],
        model: 'What do you know? / Why is it important?',
      },
    ],
    '2': [
      {
        title: 'Past simple / Pasado simple',
        explanationEs: 'Permite narrar hechos, procesos históricos, experiencias y cambios.',
        sequence: ['Ubicar el hecho en el pasado.', 'Elegir verbo regular o irregular.', 'Usar forma pasada.', 'Agregar tiempo, causa o consecuencia.'],
        model: 'They organized the information. / The article explained the problem.',
      },
      {
        title: 'Comparatives and superlatives / Comparativos y superlativos',
        explanationEs: 'Sirve para comparar datos, opiniones, lugares, textos y soluciones.',
        sequence: ['Identificar dos o más elementos.', 'Elegir adjetivo.', 'Usar -er/more o -est/most.', 'Explicar la comparación con evidencia.'],
        model: 'This source is more reliable than that one.',
      },
      {
        title: 'Modal verbs / Verbos modales',
        explanationEs: 'Ayuda a expresar posibilidad, recomendación, obligación y acuerdos.',
        sequence: ['Definir intención.', 'Elegir can, should, must o may.', 'Usar verbo base.', 'Añadir razón o condición.'],
        model: 'We should verify the information.',
      },
    ],
    '3': [
      {
        title: 'Connectors and argumentation / Conectores y argumentación',
        explanationEs: 'Permite construir opiniones, explicaciones y posturas con razones claras.',
        sequence: ['Presentar idea principal.', 'Añadir evidencia.', 'Usar conector lógico.', 'Cerrar con conclusión o propuesta.'],
        model: 'I agree because the evidence is clear.',
      },
      {
        title: 'Passive voice / Voz pasiva',
        explanationEs: 'Sirve para explicar procesos, hechos sociales y resultados cuando importa más la acción que quien la realiza.',
        sequence: ['Identificar objeto o resultado.', 'Usar be en el tiempo adecuado.', 'Agregar participio pasado.', 'Incluir agente solo si es necesario.'],
        model: 'The mural was created by the students.',
      },
      {
        title: 'Conditionals and proposals / Condicionales y propuestas',
        explanationEs: 'Ayuda a plantear consecuencias, alternativas y acciones posibles.',
        sequence: ['Plantear condición con if.', 'Expresar resultado.', 'Usar presente o futuro según el caso.', 'Revisar coherencia de causa y efecto.'],
        model: 'If we share our stories, we can promote inclusion.',
      },
    ],
  };

  const gradeProgression = progression[grade];
  const step = Math.min(gradeProgression.length - 1, Math.floor((lessonNumber - 1) / Math.ceil(20 / gradeProgression.length)));
  const base = gradeProgression[step];
  return {
    ...base,
    sequence: [...base.sequence, `Aplicar la estructura al tema de la lección: ${repairText(title)}.`],
  };
}

function buildDetonatingSituation(lesson: EnglishRawLesson, title: string) {
  const introEs = repairText(lesson.introSpanish || '');
  const introEn = repairText(lesson.introEnglish || '');
  const product = getExpectedProduct(lesson);

  return {
    es: introEs
      ? `Antes de iniciar, observa tu comunidad y pregúntate: ¿cómo se relaciona esta lección con ${introEs.replace(/^En este proyecto,\s*/i, '').replace(/\.$/, '')}?`
      : `Antes de iniciar, pregúntate: ¿qué sabes sobre "${title}" y cómo podrías explicarlo con vocabulario en inglés?`,
    en: introEn
      ? `Before starting, connect the lesson with your context: ${introEn}`
      : `Before starting, ask yourself: What do you know about "${title}" and how can you explain it in English?`,
    product,
  };
}

function buildEvaluation(lesson: EnglishRawLesson, vocabulary: string[], product: string, grammarTitle: string) {
  const title = repairText(lesson.academicProjectTitle);
  const pages = extractPageLabel(lesson);
  return {
    vocabulary: [
      `Practica las palabras clave de la lección en el memorama: ${vocabulary.slice(0, 5).join(', ')}.`,
      'Escribe una oración breve en inglés con tres palabras nuevas.',
      'Clasifica las palabras en personas, acciones, lugares, ideas o productos.',
    ],
    reading: [
      `Lee la sección del libro (${pages}) y subraya la idea principal.`,
      `Responde: What is the lesson "${title}" about?`,
      'Identifica una evidencia del texto que te ayude a explicar el tema en español y en inglés.',
    ],
    grammar: [
      `Aplica el algoritmo gramatical: ${grammarTitle}.`,
      'Construye tres oraciones: afirmativa, negativa e interrogativa.',
      'Revisa sujeto, verbo, complemento y coherencia con el tema.',
    ],
    production: [
      `Elabora o prepara: ${product}`,
      'Incluye vocabulario de la lección y al menos una estructura gramatical trabajada.',
      'Cuida claridad, pronunciación, ortografía y relación con tu comunidad.',
    ],
    oralWritten: [
      'Oral: explica en inglés una idea central de la lección en 30 a 60 segundos.',
      'Escrita: redacta un párrafo breve con inicio, desarrollo y cierre.',
      'Autoevalúa: What did I learn? What do I need to practice again?',
    ],
  };
}

function shortItem(value: string, fallback: string) {
  const clean = repairText(value).replace(/\s+/g, ' ').trim();
  if (!clean) return fallback;
  return clean.length > 82 ? `${clean.slice(0, 79).trim()}...` : clean;
}

function buildMindMap(
  lesson: EnglishRawLesson,
  title: string,
  vocabulary: string[],
  grammarFocus: ReturnType<typeof inferGrammarFocus>,
  expectedProduct: string,
) {
  const sections = (lesson.associatedSections || []).map(repairText).filter(Boolean);
  const readings = (lesson.associatedReadings || []).map(repairText).filter(Boolean);
  const pages = extractPageLabel(lesson);
  return {
    center: `Leccion ${lesson.englishBookProjectIndex}: ${title}`,
    branches: [
      {
        title: '1. Situacion detonadora',
        items: [
          shortItem(lesson.introSpanish || lesson.introEnglish, 'Activar saberes previos sobre el tema de la leccion.'),
          'Conectar el tema con la comunidad.',
        ],
      },
      {
        title: '2. Vocabulary',
        items: vocabulary.slice(0, 6),
      },
      {
        title: '3. Reading',
        items: [pages, ...readings.slice(0, 2).map((reading) => `Lectura: ${reading}`)],
      },
      {
        title: '4. Grammar',
        items: [grammarFocus.title, grammarFocus.model],
      },
      {
        title: '5. Product',
        items: [shortItem(expectedProduct, 'Producto de aprendizaje de la leccion.')],
      },
      {
        title: '6. Process',
        items: sections.length ? sections.slice(0, 5) : ['Read', 'Practice', 'Write', 'Speak', 'Share'],
      },
    ],
    ideaForce: `Usar el ingles para comprender "${title}", practicar vocabulario y comunicar una idea propia con claridad.`,
  };
}

function buildSelfAssessment(
  lesson: EnglishRawLesson,
  title: string,
  vocabulary: string[],
  grammarFocus: ReturnType<typeof inferGrammarFocus>,
  expectedProduct: string,
) {
  const pairs = vocabulary.slice(0, 6).map((term, index) => ({
    term,
    definition:
      index === 0
        ? `Palabra clave para explicar el tema central de "${title}".`
        : index === 1
        ? 'Concepto util para construir una oracion breve en ingles.'
        : index === 2
        ? 'Vocabulario que puede aparecer en la lectura o producto.'
        : index === 3
        ? 'Termino que ayuda a participar oralmente en clase.'
        : index === 4
        ? 'Palabra para practicar en el memorama y recordar significado.'
        : 'Concepto de apoyo para comprender y producir mensajes.',
  }));

  return {
    resonanceQuestion: `Como puedes usar el vocabulario de "${title}" y la estructura "${grammarFocus.title}" para explicar una idea de tu comunidad en ingles?`,
    matchingPairs: pairs,
    productionChallenge: `Produce una respuesta oral o escrita breve relacionada con: ${expectedProduct}`,
  };
}

export function getEnglishLessonsByGrade(grade: GradeId): EnglishLesson[] {
  return (gradeSources[grade].projects || []).map((lesson) => {
    const title = repairText(lesson.academicProjectTitle);
    const lessonNumber = lesson.englishBookProjectIndex;
    const vocabulary = inferVocabulary(lesson);
    const grammarFocus = inferGrammarFocus(grade, lessonNumber, title);
    const detonating = buildDetonatingSituation(lesson, title);
    const expectedProduct = detonating.product;
    const mindMap = buildMindMap(lesson, title, vocabulary, grammarFocus, expectedProduct);
    const selfAssessment = buildSelfAssessment(lesson, title, vocabulary, grammarFocus, expectedProduct);

    return {
      id: `english-${grade}-lesson-${lessonNumber}`,
      grade,
      gradeLabel: repairText(lesson.gradeLabel || `${grade}°`),
      lessonNumber,
      title,
      bookTitle: repairText(lesson.englishBookTitle || `Inglés ${grade}°`),
      pagesLabel: extractPageLabel(lesson),
      startPage: lesson.englishBookLink?.startPage,
      endPage: lesson.englishBookLink?.endPage,
      sourceStatus: lesson.englishBookLink?.status === 'linked' && !lesson.needsHumanReview ? 'confirmed' : 'needsReview',
      sourceConfidence: lesson.englishBookLink?.confidence,
      detonatingSituationEs: detonating.es,
      detonatingSituationEn: detonating.en,
      introSpanish: repairText(lesson.introSpanish || ''),
      introEnglish: repairText(lesson.introEnglish || ''),
      expectedProduct,
      academicContent: inferAcademicContent(lesson, vocabulary),
      vocabulary,
      grammarFocus,
      mindMap,
      selfAssessment,
      evaluation: buildEvaluation(lesson, vocabulary, expectedProduct, grammarFocus.title),
      sections: (lesson.associatedSections || []).map(repairText).filter(Boolean),
      readings: (lesson.associatedReadings || []).map(repairText).filter(Boolean),
      warnings: (lesson.warnings || []).map(repairText),
    };
  });
}
