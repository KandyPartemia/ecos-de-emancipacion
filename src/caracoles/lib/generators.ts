import type {
  AcademicConcept,
  AcademicProject,
  CrosswordItem,
  ExamQuestion,
  GeneratedActivities,
  MemoryCard,
  ResonanceQuestion,
  SelfAssessmentItem,
  SelfAssessmentOption,
  WordSearch,
} from '../types';

type WorkingConcept = {
  id: string;
  term: string;
  definition: string;
  studentExplanation: string;
  example: string;
  distractors: string[];
  crosswordClue: string;
  wordSearchTerm: string;
  memoryPair: {
    front: string;
    back: string;
  };
  status: 'confirmed' | 'suggested';
  sourcePage: string;
};

const SELF_ASSESSMENT_CAUTION =
  'Esta autoevaluación es una guía formativa. No sustituye la evaluación situada, las rúbricas ni el Programa analítico de cada comunidad de aprendizaje.';

const shuffle = <T,>(items: T[]): T[] => [...items].sort(() => Math.random() - 0.5);

function pickMany<T>(items: T[], count: number): T[] {
  return shuffle(items).slice(0, Math.min(count, items.length));
}

function normalizeAscii(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function primaryCriterionFor(project: AcademicProject) {
  if (project.primaryThinkingCriterion) return project.primaryThinkingCriterion;

  const field = normalizeAscii(project.field || '');
  if (field.includes('lenguajes') || field.includes('ingles')) {
    return 'Pensamiento lógico-lingüístico';
  }
  if (field.includes('saberes')) {
    return 'Lógica matemática y pensamiento científico';
  }
  if (field.includes('etica')) {
    return 'Conciencia de clase social';
  }
  if (field.includes('humano')) {
    return 'Visión nóstrica';
  }

  return 'Pensamiento crítico situado';
}

function learningHorizon(project: AcademicProject) {
  return project.studentHorizon || project.horizon || `revisar el Proyecto Académico ${project.academicProjectNumber || ''} ${project.title}`.trim();
}

function productFocus(project: AcademicProject) {
  return project.productGuide || project.finalProduct || 'el producto orientativo pendiente de confirmación';
}

function confirmedProjectConcepts(project: AcademicProject, concepts: AcademicConcept[]): WorkingConcept[] {
  return (concepts ?? [])
    .filter((concept) => (project.academicConceptIds ?? []).includes(concept.id))
    .map((concept) => ({
      id: concept.id,
      term: concept.term,
      definition: concept.definition,
      studentExplanation: concept.studentExplanation,
      example: concept.example,
      distractors: concept.distractors,
      crosswordClue: concept.crosswordClue,
      wordSearchTerm: concept.wordSearchTerm,
      memoryPair: concept.memoryPair,
      status: 'confirmed' as const,
      sourcePage: concept.sourcePage,
    }));
}

function suggestedProjectConcepts(project: AcademicProject): WorkingConcept[] {
  return (project.suggestedAcademicConcepts ?? [])
    .filter((concept) => concept.concept && concept.description)
    .map((concept, index) => ({
      id: `${project.id}-suggested-${index}`,
      term: concept.concept,
      definition: concept.description,
      studentExplanation: concept.useInProject || concept.relationshipToHorizon || concept.description,
      example: concept.relationshipToHorizon || concept.useInProject || concept.description,
      distractors: [
        'Se usa solo para copiar páginas del libro sin reflexionar.',
        'No tiene relación con el proyecto ni con la comunidad.',
        'Sirve únicamente para memorizar palabras aisladas.',
      ],
      crosswordClue: `Concepto sugerido desde ${concept.sourcePages}.`,
      wordSearchTerm: concept.concept
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^A-Za-z0-9]/g, '')
        .slice(0, 18)
        .toUpperCase(),
      memoryPair: {
        front: concept.concept,
        back: concept.sourcePages,
      },
      status: concept.status === 'confirmed' ? 'confirmed' : 'suggested',
      sourcePage: `${concept.sourceBook} · ${concept.sourcePages}`,
    }));
}

function projectConcepts(project: AcademicProject, concepts: AcademicConcept[]): WorkingConcept[] {
  const confirmed = confirmedProjectConcepts(project, concepts);
  if (confirmed.length) return confirmed;
  return suggestedProjectConcepts(project);
}

function confirmedOnlyConcepts(project: AcademicProject, concepts: AcademicConcept[]): WorkingConcept[] {
  return confirmedProjectConcepts(project, concepts);
}

function selfAssessmentNotice(linkedConcepts: WorkingConcept[]) {
  return linkedConcepts.some((concept) => concept.status === 'suggested')
    ? 'Autoevaluación preliminar basada en conceptos sugeridos desde páginas fuente.'
    : 'Autoevaluación formativa del proyecto.';
}

function buildInteractiveOptions(
  concept: WorkingConcept,
  linkedConcepts: WorkingConcept[],
): SelfAssessmentOption[] {
  const alternatives = linkedConcepts
    .filter((candidate) => candidate.id !== concept.id && candidate.definition && candidate.definition !== concept.definition)
    .map((candidate) => candidate.definition);

  const genericWrong = [
    'Se refiere a copiar información sin relacionarla con el proyecto.',
    'Sirve para repetir palabras sin comprender su sentido en la comunidad.',
    'No tiene vínculo con el producto orientativo ni con el horizonte del proyecto.',
  ];

  const wrongPool = shuffle([...alternatives, ...genericWrong]).filter((value, index, array) => array.indexOf(value) === index);
  const options = [
    { text: concept.definition, isCorrect: true },
    ...wrongPool.slice(0, 2).map((text) => ({ text, isCorrect: false })),
  ];

  while (options.length < 3) {
    options.push({
      text: `No se relaciona con ${concept.term} dentro de este proyecto.`,
      isCorrect: false,
    });
  }

  return shuffle(options);
}

function buildInteractiveQuestion(
  project: AcademicProject,
  concept: WorkingConcept,
  linkedConcepts: WorkingConcept[],
  index: number,
): SelfAssessmentItem {
  const projectLabel = project.academicProjectNumber ? `PA ${project.academicProjectNumber}` : 'Proyecto Académico';
  const prompt = `En ${projectLabel} "${project.title}", ¿qué opción explica mejor el concepto "${concept.term}"?`;

  return {
    id: `${project.id}-self-${index}`,
    prompt,
    question: prompt,
    concept: concept.term,
    sourcePage: concept.sourcePage,
    status: concept.status,
    options: buildInteractiveOptions(concept, linkedConcepts),
    feedbackCorrect: `Bien. "${concept.term}" ayuda a comprender ${concept.studentExplanation.toLowerCase()} y se vincula con ${concept.sourcePage}.`,
    feedbackIncorrect: `Todavía no. Revisa ${concept.term} en ${concept.sourcePage} y compáralo con el horizonte y el producto del proyecto.`,
    mode: 'interactive-mcq',
  };
}

export function generateResonances(project: AcademicProject, concepts: AcademicConcept[]): ResonanceQuestion[] {
  const linkedConcepts = projectConcepts(project, concepts);
  const primaryCriterion = primaryCriterionFor(project);
  const criteria = (project.secondaryThinkingCriteria ?? []).length
    ? project.secondaryThinkingCriteria
    : [primaryCriterion];
  const horizon = learningHorizon(project);
  const projectNumber = project.academicProjectNumber ? `Proyecto Académico ${project.academicProjectNumber}` : 'Proyecto Académico seleccionado';
  const thinkingActions = criteria.length
    ? criteria.join(', ')
    : 'selección, valoración, comparación, interpretación y argumentación';
  const conceptText = linkedConcepts[0]?.term?.toLowerCase() ? 'los conceptos vinculados';

  const baseResonances: ResonanceQuestion[] = [
    {
      id: `resonance-${project.id}-understanding`,
      relatedCriterion: 'Comprensión del proyecto',
      prompt: `Después de revisar el ${projectNumber} "${project.title}", del campo ${project.field}, explica qué texto, expresión, recurso o situación del proyecto considerarías valioso compartir con otras personas. Argumenta tu elección con al menos dos razones y relaciónala con ${primaryCriterion.toLowerCase()}, ${thinkingActions.toLowerCase()} y una situación de tu vida cotidiana o comunidad.`,
    },
    {
      id: `resonance-${project.id}-community`,
      relatedCriterion: 'Vida cotidiana y comunidad',
      prompt: `¿Dónde aparece en tu vida cotidiana o comunidad una situación relacionada con "${project.title}", ${conceptText} y este horizonte de trabajo: ${horizon}?`,
    },
    {
      id: `resonance-${project.id}-criterion`,
      relatedCriterion: primaryCriterion,
      prompt: `¿Cómo te ayuda ${primaryCriterion.toLowerCase()} a pensar mejor lo que propone este proyecto y a interpretar ${conceptText}?`,
    },
  ];

  const criteriaResonances = pickMany(criteria, 3).map((criterion, index) => {
    const concept = linkedConcepts[index % Math.max(linkedConcepts.length, 1)];
    const currentConcept = concept ? concept.term.toLowerCase() : 'lo aprendido';
    return {
      id: `resonance-${project.id}-criterion-${index}`,
      relatedCriterion: criterion,
      prompt: `¿Cómo te ayuda ${criterion.toLowerCase()} a comprender mejor ${currentConcept} y a actuar con más conciencia en tu vida cotidiana o comunidad?`,
    };
  });

  return [...baseResonances, ...criteriaResonances].slice(0, 6);
}

export function generateSelfAssessment(project: AcademicProject, concepts: AcademicConcept[]): SelfAssessmentItem[] {
  const linkedConcepts = projectConcepts(project, concepts).filter((concept) => concept.definition);
  return pickMany(linkedConcepts, 6).map((concept, index) =>
    buildInteractiveQuestion(project, concept, linkedConcepts, index),
  );
}

export function generateExam(): ExamQuestion[] {
  return [];
}

export function generateCrossword(project: AcademicProject, concepts: AcademicConcept[]): CrosswordItem[] {
  return confirmedOnlyConcepts(project, concepts).map((concept) => ({
    term: concept.term,
    clue: concept.crosswordClue,
  }));
}

export function generateWordSearch(project: AcademicProject, concepts: AcademicConcept[]): WordSearch {
  const terms = confirmedOnlyConcepts(project, concepts).map((concept) => concept.wordSearchTerm);
  return {
    terms,
    hint: terms.length
      ? 'Busca términos del proyecto. Después explica cómo se conectan con el horizonte.'
      : 'Para generar una sopa completa faltan conceptos académicos confirmados.',
  };
}

export function generateMemory(project: AcademicProject, concepts: AcademicConcept[]): MemoryCard[] {
  return confirmedOnlyConcepts(project, concepts).flatMap((concept) => [
    {
      id: `${concept.id}-front`,
      front: concept.memoryPair.front,
      back: concept.memoryPair.back,
    },
  ]);
}

export function generateActivities(project: AcademicProject, concepts: AcademicConcept[]): GeneratedActivities {
  const linkedConcepts = projectConcepts(project, concepts);
  const selfAssessment = generateSelfAssessment(project, concepts);

  return {
    resonances: generateResonances(project, concepts),
    selfAssessment,
    selfAssessmentNotice: selfAssessmentNotice(linkedConcepts),
    selfAssessmentCaution: SELF_ASSESSMENT_CAUTION,
    exam: [],
    crossword: generateCrossword(project, concepts),
    wordSearch: generateWordSearch(project, concepts),
    memory: generateMemory(project, concepts),
  };
}
