export type GradeId = '1' | '2' | '3';

export type FieldName =
  | 'Lenguajes'
  | 'Inglés'
  | 'Ingles'
  | 'Saberes y Pensamiento Científico'
  | 'Saberes y Pensamiento Cientifico'
  | 'Ética, Naturaleza y Sociedades'
  | 'Etica, Naturaleza y Sociedades'
  | 'De lo Humano y lo Comunitario'
  | 'Múltiples Lenguajes';

export type SourcePages = {
  nuestroLibroProyectos: string[];
  conceptBook: string[];
  multiplesLenguajes: string[];
  resources?: string[];
  other: string[];
};

export type StrategyStatus =
  | 'confirmed'
  | 'suggested'
  | 'suggested-from-title-and-project'
  | 'pending'
  | 'needs-human-review';

export type DetonatingStrategy = {
  id?: string;
  title: string;
  type: 'video' | 'lectura' | 'pregunta' | 'interactivo' | 'recurso' | 'project-resource' | 'actividad' | 'pendiente';
  url: string;
  observationQuestions: string[];
  source?: string;
  urlStatus?: 'confirmed' | 'pending-url' | 'not-found' | string;
  youtubeSearchQuery?: string;
  scope?: 'partial-classroom-project' | 'academic-project' | string;
  relatedProject?: string;
  relatedResource?: string;
  transcriptAvailable?: boolean;
  pedagogicalMeaning?: string;
  status?: StrategyStatus | string;
};

export type ProjectTopic = {
  title: string;
  sourceBook: string;
  sourcePages: string;
  summaryForMindMap: string;
  relationshipToHorizon: string;
  status: 'confirmed' | 'suggested' | 'pending';
  evidence: string[];
};

export type SuggestedProjectConcept = {
  concept: string;
  description: string;
  sourceBook: string;
  sourcePages: string;
  relationshipToHorizon: string;
  useInProject: string;
  status: 'confirmed' | 'suggested' | 'pending';
  evidence: string[];
};

export type HorizonData = {
  officialText: string;
  studentVersion: string;
  source?: {
    materialId?: string;
    pages?: string;
    confidence?: number;
  };
  status?: 'confirmed' | 'suggested' | 'pending';
};

export type ThinkingCriteriaData = {
  primary: string;
  secondary: string[];
  fieldRule?: string;
  relationshipToProject?: string;
};

export type ExpectedProductData = {
  sourceProduct: string;
  orientationExample: string;
  adaptationWarning: string;
  status?: 'confirmed' | 'suggested' | 'pending';
};

export type ResonanceSeed = {
  type: string;
  question: string;
  basedOn: string[];
  status: 'confirmed' | 'suggested';
};

export type GeneratorsReadiness = {
  guide: boolean;
  mindMap: boolean;
  resonanceQuestions: boolean;
  preliminarySelfAssessment: boolean;
  multipleChoiceEvaluation: boolean;
  memoryGame: boolean;
  wordSearch: boolean;
  crossword: boolean;
  reason: string;
};

export type AcademicProject = {
  id: string;
  sampleNotice: string;
  grade: GradeId;
  gradeLabel?: string;
  field: FieldName;
  bookVolume: string;
  partialClassroomProject: string;
  partialClassroomProjectTitle?: string;
  academicProjectNumber: number;
  title: string;
  horizon: string;
  studentHorizon: string;
  horizonData?: HorizonData;
  sourcePages: SourcePages;
  ppaDetonatingStrategy?: DetonatingStrategy;
  academicProjectStrategy?: DetonatingStrategy;
  detonatingStrategy: DetonatingStrategy;
  academicConceptIds: string[];
  suggestedAcademicConcepts?: SuggestedProjectConcept[];
  projectTopics?: ProjectTopic[];
  primaryThinkingCriterion: string;
  secondaryThinkingCriteria: string[];
  thinkingCriteriaData?: ThinkingCriteriaData;
  finalProduct: string;
  productGuide: string;
  expectedProductData?: ExpectedProductData;
  concentratedMap?: {
    type?: string;
    centralNode?: string;
    branches?: Array<{ label: string; items: string[] }>;
  };
  resonanceQuestionSeeds?: ResonanceSeed[];
  generatorsReadiness?: GeneratorsReadiness;
  checklist: string[];
  status?: string;
  needsReview?: boolean;
  readyForActivities?: boolean;
  readinessLevel?: 'identity-confirmed' | 'guide-ready' | 'activities-partial' | 'activities-ready' | 'catalog-only' | 'incomplete';
  warnings?: string[];
  catalogStatus?: 'validated' | 'pending-validation' | 'in-development';
  linkedConfirmedProjectId?: string;
  studentVisible?: boolean;
  registryId?: string;
  catalogVisible?: boolean;
  summaryStatus?: string;
  missingFields?: string[];
  source?: string;
  interactiveSelfAssessment?: SelfAssessmentItem[];
  interactiveSelfAssessmentNotice?: string;
  interactiveSelfAssessmentCaution?: string;
  confidence?: number;
  detectionConfidence?: number;
  titleConfidence?: number;
  rawDetectedTitle?: string;
  evidencePage?: number;
  evidenceSnippet?: string;
  detectionWarnings?: string[];
};

export type AcademicConcept = {
  id: string;
  term: string;
  field: FieldName;
  sourcePage: string;
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
  relatedProjectIds: string[];
};

export type ResonanceQuestion = {
  id: string;
  prompt: string;
  relatedCriterion: string;
};

export type SelfAssessmentOption = {
  text: string;
  isCorrect: boolean;
};

export type SelfAssessmentItem = {
  id: string;
  prompt: string;
  question: string;
  concept: string;
  sourcePage: string;
  status: 'suggested' | 'confirmed';
  options: SelfAssessmentOption[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
  mode: 'interactive-mcq';
};

export type ExamQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  relatedTo: string;
};

export type CrosswordItem = {
  term: string;
  clue: string;
};

export type WordSearch = {
  terms: string[];
  hint: string;
};

export type MemoryCard = {
  id: string;
  front: string;
  back: string;
};

export type GeneratedActivities = {
  resonances: ResonanceQuestion[];
  selfAssessment: SelfAssessmentItem[];
  selfAssessmentNotice: string;
  selfAssessmentCaution: string;
  exam: ExamQuestion[];
  crossword: CrosswordItem[];
  wordSearch: WordSearch;
  memory: MemoryCard[];
};

export type StudentProgress = {
  selectedGrade: GradeId;
  alias?: string;
  snailName?: string;
  startedProjectIds: string[];
  completedProjectIds: string[];
  consultedPages: string[];
  watchedStrategyIds: string[];
  reviewedConceptIds: string[];
  workedCriteria: string[];
  completedGames: string[];
  answeredSelfAssessments: string[];
  answeredExams: string[];
  examResults: Record<string, number>;
  achievements: string[];
  lastUpdated: string;
};
