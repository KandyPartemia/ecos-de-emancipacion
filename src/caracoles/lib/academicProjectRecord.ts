export type ProjectSourceStatus = 'confirmed' | 'caution' | 'pending';

export type ProjectStrategyRecord = {
  title?: string;
  displayTitle?: string;
  text?: string;
  videoUrl?: string;
  status: 'confirmed' | 'pending' | 'not-found';
  source?: string;
  scope?: 'academic-project' | 'partial-classroom-project' | 'complementary' | 'unknown';
  scopeLabel?: string;
  resourceLabel?: string;
  urlStatus?: 'confirmed' | 'pending' | 'not-found';
  relatedResource?: string;
};

export type AcademicProjectRecord = {
  id: string;
  grade: string;
  field: string;
  academicProjectNumber: string;
  academicProjectTitle: string;
  ppaNumber?: string;
  ppaTitle?: string;
  finalProduct?: string;
  horizon: {
    text?: string;
    status: 'confirmed' | 'teacher-orientation' | 'pending';
    source?: string;
    displayLabel?: string;
    note?: string;
  };
  sourcePages: {
    nuestrosProyectos?: {
      tomo?: string;
      pages?: string[];
      status?: ProjectSourceStatus;
    };
    fieldTextbook?: {
      book?: string;
      pages?: string[];
      status?: ProjectSourceStatus;
    };
    multiplesLenguajes?: {
      title?: string;
      pages?: string[];
      status?: ProjectSourceStatus;
    };
    contextual?: {
      description?: string;
      pages?: string[];
      status?: ProjectSourceStatus;
    }[];
  };
  complementaryResources?: {
    label: string;
    reference?: string;
    url?: string;
    status: ProjectSourceStatus;
  }[];
  detonatingStrategy: ProjectStrategyRecord;
  relatedStrategies?: ProjectStrategyRecord[];
  academicConcepts: {
    concept: string;
    description?: string;
    sourceBook?: string;
    pages?: string[];
    status: 'confirmed' | 'suggested' | 'needsReview' | 'discarded';
  }[];
  resonanceQuestion?: string;
  resonanceStatus?: 'confirmed' | 'suggested' | 'pending';
  matchingActivity?: {
    pairs: {
      concept: string;
      description: string;
      status: 'confirmed' | 'suggested';
    }[];
  };
  game?: {
    type: 'wordsearch' | 'crossword';
    status: 'ready' | 'pending';
    reason?: string;
    data?: unknown;
  };
  teacherOrientation?: string;
  pendingNotes?: string[];
  readiness: {
    fichaReady: boolean;
    resonanceReady: boolean;
    matchingReady: boolean;
    gameReady: boolean;
  };
};
