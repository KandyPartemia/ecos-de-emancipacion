import type {
  AcademicConcept,
  AcademicProject,
  DetonatingStrategy,
  GradeId,
  ProjectTopic,
  SelfAssessmentItem,
  SuggestedProjectConcept,
} from '../types';

export type PagesIndex = {
  grade: string;
  gradeLabel: string;
  materials?: Array<{ id: string; field: string; type: string; status: string; title: string; pagesExtracted?: number; warnings?: string[] }>;
  pages?: Array<{ materialId: string; pageNumber: number; needsReview?: boolean; warnings?: string[]; hasText?: boolean; textLength?: number; reference?: string }>;
  warnings?: string[];
};

export type CurriculumIndex = {
  projects?: Array<Partial<AcademicProject> & { needsReview?: boolean; warnings?: string[] }>;
  needsReview?: Array<unknown>;
  warnings?: string[];
};

export type ConceptsIndex = {
  concepts?: Array<Partial<AcademicConcept> & { needsReview?: boolean; warnings?: string[] }>;
  needsReview?: Array<unknown>;
  warnings?: string[];
};

export type StrategiesIndex = {
  strategies?: Array<{ id: string; title: string; type: string; url?: string; needsReview?: boolean; warnings?: string[] }>;
  needsReview?: Array<unknown>;
  warnings?: string[];
};

export type CorpusSummary = {
  status?: string;
  metrics?: {
    projectCandidatesDetected?: number;
    projectsWithDetectedHorizon?: number;
    projectsConfirmed?: number;
    projectNeedsReview?: number;
    projectAverageConfidence?: number;
    confirmedProjects?: number;
    incompleteProjects?: number;
    readyForActivities?: number;
    pendingReviewProjects?: number;
    candidateTitlesNeedReview?: number;
    candidatesHiddenFromStudentView?: number;
  };
};

export type ProjectCandidatesIndex = {
  candidates?: Array<{
    id: string;
    grade?: GradeId;
    field?: string;
    bookVolume?: string;
    partialClassroomProject?: string;
    academicProjectNumber?: number;
    title: string;
    rawDetectedTitle?: string;
    confidence: number;
    detectionConfidence?: number;
    titleConfidence?: number;
    evidencePage?: number;
    evidenceSnippet?: string;
    detectionWarnings?: string[];
    needsReview: boolean;
    horizon?: string;
    sourcePages?: AcademicProject['sourcePages'];
    warnings?: string[];
  }>;
  candidatesWithHorizon?: number;
  needsReview?: number;
  averageConfidence?: number;
};

export type ConfirmedProjectsIndex = {
  projects?: Array<Partial<AcademicProject> & { status?: string; needsReview?: boolean; warnings?: string[]; notes?: string }>;
  confirmedProjects?: number;
  incompleteProjects?: number;
  readyForActivities?: number;
  pendingReviewProjects?: number;
};

export type ProjectRegistryEntry = {
  id: string;
  grade: GradeId;
  field: string;
  academicProjectNumber: number;
  title: string;
  partialClassroomProject?: string;
  bookVolume?: string;
  catalogStatus?: 'validated' | 'pending-validation' | 'in-development';
  linkedConfirmedProjectId?: string;
  studentVisible?: boolean;
  notes?: string;
};

export type ProjectRegistryIndex = {
  grade: string;
  gradeLabel: string;
  status?: string;
  notes?: string;
  projects?: ProjectRegistryEntry[];
};

type SelectableProjectEntry = Partial<AcademicProject> & {
  readinessLevel?: AcademicProject['readinessLevel'];
  readyForActivities?: boolean;
  warnings?: string[];
  catalogVisible?: boolean;
  summaryStatus?: string;
  missingFields?: string[];
  source?: string;
  linkedConfirmedProjectId?: string;
  studentVisible?: boolean;
  interactiveSelfAssessment?: SelfAssessmentItem[];
  interactiveSelfAssessmentNotice?: string;
  interactiveSelfAssessmentCaution?: string;
};

export type GeneratedCorpus = {
  pages: PagesIndex;
  curriculum: CurriculumIndex;
  concepts: ConceptsIndex;
  strategies: StrategiesIndex;
  summary: CorpusSummary | null;
  projectCandidates: ProjectCandidatesIndex | null;
  confirmedProjects: ConfirmedProjectsIndex | null;
  projectRegistry: ProjectRegistryIndex | null;
  selectableProjects?: SelectableProjectEntry[] | { projects?: SelectableProjectEntry[] } | null;
  diagnostics: string[];
};

export type DataLoadState =
  | { status: 'loading'; data: null; error: null }
  | { status: 'loaded'; data: GeneratedCorpus; error: null }
  | { status: 'empty'; data: null; error: null }
  | { status: 'error'; data: null; error: string };

const gradeFolder = (grade: GradeId) => `grade-${grade}`;

function repairMojibakeText(value: string) {
  if (!value || !/[ÃƒÃ‚Ã¢]/.test(value)) {
    return value;
  }

  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

function normalizePageList(pages: unknown): string[] {
  if (!Array.isArray(pages)) return [];
  return pages.map((page) => {
    if (typeof page === 'string') return page;
    if (page && typeof page === 'object') {
      const value = page as { materialId?: string; pageNumber?: number };
      return [value.materialId, value.pageNumber ? `p. ${value.pageNumber}` : ''].filter(Boolean).join(', ');
    }
    return String(page);
  });
}

function normalizeFlatSourcePages(pages: unknown[]): AcademicProject['sourcePages'] {
  const bucketed = {
    nuestroLibroProyectos: [] as string[],
    conceptBook: [] as string[],
    multiplesLenguajes: [] as string[],
    resources: [] as string[],
    other: [] as string[],
  };

  for (const page of normalizePageList(pages)) {
    const normalized = page
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (normalized.includes('nuestro libro de proyectos')) {
      bucketed.nuestroLibroProyectos.push(page);
      continue;
    }

    if (normalized.includes('multiples lenguajes')) {
      bucketed.multiplesLenguajes.push(page);
      continue;
    }

    if (
      normalized.startsWith('lenguajes ') ||
      normalized.startsWith('saberes ') ||
      normalized.startsWith('etica, naturaleza y sociedades') ||
      normalized.startsWith('de lo humano y lo comunitario')
    ) {
      bucketed.conceptBook.push(page);
      continue;
    }

    if (
      normalized.startsWith('ingles ') ||
      normalized.startsWith('english ') ||
      normalized.startsWith('projects and readings') ||
      normalized.includes('youtube') ||
      normalized.includes('youtu.be') ||
      normalized.includes('bit.ly') ||
      normalized.startsWith('video ') ||
      normalized.startsWith('recurso ')
    ) {
      bucketed.other.push(page);
      continue;
    }

    bucketed.other.push(page);
  }

  return bucketed;
}

function normalizeSourcePages(sourcePages: unknown): AcademicProject['sourcePages'] {
  if (Array.isArray(sourcePages)) return normalizeFlatSourcePages(sourcePages);
  const source = (sourcePages && typeof sourcePages === 'object' ? sourcePages : {}) as Record<string, unknown>;
  return {
    nuestroLibroProyectos: normalizePageList(source.nuestroLibroProyectos),
    conceptBook: normalizePageList(source.conceptBook),
    multiplesLenguajes: normalizePageList(source.multiplesLenguajes),
    resources: normalizePageList(source.resources),
    other: normalizePageList([
      ...(Array.isArray(source.resources) ? source.resources : []),
      ...(Array.isArray(source.other) ? source.other : []),
    ]),
  };
}

function normalizeInteractiveSelfAssessment(items: unknown): SelfAssessmentItem[] {
  if (!Array.isArray(items)) return [];
  return items.map((item, index) => {
    const source = (item && typeof item === 'object' ? item : {}) as Record<string, unknown>;
    return {
      id: typeof source.id === 'string' ? source.id : `interactive-self-${index}`,
      prompt: typeof source.prompt === 'string' ? source.prompt : '',
      question: typeof source.question === 'string' ? source.question : '',
      concept: typeof source.concept === 'string' ? source.concept : '',
      sourcePage: typeof source.sourcePage === 'string' ? source.sourcePage : '',
      status: source.status === 'confirmed' ? 'confirmed' : 'suggested',
      options: Array.isArray(source.options)
        ? source.options.map((option) => {
            const candidate = (option && typeof option === 'object' ? option : {}) as Record<string, unknown>;
            return {
              text: typeof candidate.text === 'string' ? candidate.text : '',
              isCorrect: Boolean(candidate.isCorrect),
            };
          })
        : [],
      feedbackCorrect: typeof source.feedbackCorrect === 'string' ? source.feedbackCorrect : '',
      feedbackIncorrect: typeof source.feedbackIncorrect === 'string' ? source.feedbackIncorrect : '',
      mode: 'interactive-mcq',
    };
  });
}

function normalizeDetonatingStrategy(strategy: unknown): DetonatingStrategy {
  const source = (strategy && typeof strategy === 'object' ? strategy : {}) as Record<string, unknown>;
  return {
    id: typeof source.id === 'string' ? source.id : '',
    title: typeof source.title === 'string' ? source.title : '',
    type: typeof source.type === 'string' ? (source.type as DetonatingStrategy['type']) : 'pregunta',
    url: typeof source.url === 'string' ? source.url : '',
    observationQuestions: Array.isArray(source.observationQuestions)
      ? source.observationQuestions.map((item) => String(item))
      : [],
    source: typeof source.source === 'string' ? source.source : '',
    urlStatus: typeof source.urlStatus === 'string' ? source.urlStatus : '',
    youtubeSearchQuery: typeof source.youtubeSearchQuery === 'string' ? source.youtubeSearchQuery : '',
    scope: typeof source.scope === 'string' ? source.scope : '',
    relatedProject: typeof source.relatedProject === 'string' ? source.relatedProject : '',
    relatedResource: typeof source.relatedResource === 'string' ? source.relatedResource : '',
    transcriptAvailable: Boolean(source.transcriptAvailable),
    pedagogicalMeaning: typeof source.pedagogicalMeaning === 'string' ? source.pedagogicalMeaning : '',
    status: typeof source.status === 'string' ? source.status : '',
  };
}

function normalizeSuggestedAcademicConcepts(concepts: unknown): SuggestedProjectConcept[] {
  if (!Array.isArray(concepts)) return [];
  return concepts.map((concept) => {
    const source = (concept && typeof concept === 'object' ? concept : {}) as Record<string, unknown>;
    return {
      concept: typeof source.concept === 'string' ? source.concept : '',
      description: typeof source.description === 'string' ? source.description : '',
      sourceBook: typeof source.sourceBook === 'string' ? source.sourceBook : '',
      sourcePages: typeof source.sourcePages === 'string' ? source.sourcePages : '',
      relationshipToHorizon: typeof source.relationshipToHorizon === 'string' ? source.relationshipToHorizon : '',
      useInProject: typeof source.useInProject === 'string' ? source.useInProject : '',
      status: typeof source.status === 'string' ? (source.status as SuggestedProjectConcept['status']) : 'pending',
      evidence: Array.isArray(source.evidence) ? source.evidence.map((item) => String(item)) : [],
    };
  });
}

function normalizeProjectTopics(topics: unknown): ProjectTopic[] {
  if (!Array.isArray(topics)) return [];
  return topics.map((topic) => {
    const source = (topic && typeof topic === 'object' ? topic : {}) as Record<string, unknown>;
    return {
      title: typeof source.title === 'string' ? source.title : '',
      sourceBook: typeof source.sourceBook === 'string' ? source.sourceBook : '',
      sourcePages: typeof source.sourcePages === 'string' ? source.sourcePages : '',
      summaryForMindMap: typeof source.summaryForMindMap === 'string' ? source.summaryForMindMap : '',
      relationshipToHorizon: typeof source.relationshipToHorizon === 'string' ? source.relationshipToHorizon : '',
      status: typeof source.status === 'string' ? (source.status as ProjectTopic['status']) : 'pending',
      evidence: Array.isArray(source.evidence) ? source.evidence.map((item) => String(item)) : [],
    };
  });
}

function normalizeLoadedProject(project: SelectableProjectEntry & { status?: string; needsReview?: boolean }): AcademicProject & {
  catalogVisible?: boolean;
  summaryStatus?: string;
  missingFields?: string[];
  source?: string;
} {
  return {
    id: project.id ?? '',
    sampleNotice: project.sampleNotice ?? 'Proyecto confirmado por revisión manual.',
    grade: project.grade ?? '1',
    gradeLabel: project.gradeLabel,
    field: project.field ?? 'Lenguajes',
    bookVolume: project.bookVolume ?? '',
    partialClassroomProject: project.partialClassroomProject ?? '',
    partialClassroomProjectTitle: project.partialClassroomProjectTitle ?? '',
    academicProjectNumber: Number(project.academicProjectNumber ?? 0),
    title: project.title ?? 'Proyecto sin título',
    horizon: project.horizon ?? '',
    studentHorizon: project.studentHorizon ?? '',
    horizonData: project.horizonData,
    sourcePages: normalizeSourcePages(project.sourcePages),
    ppaDetonatingStrategy: project.ppaDetonatingStrategy
      ? normalizeDetonatingStrategy(project.ppaDetonatingStrategy)
      : undefined,
    academicProjectStrategy: project.academicProjectStrategy
      ? normalizeDetonatingStrategy(project.academicProjectStrategy)
      : undefined,
    detonatingStrategy: normalizeDetonatingStrategy(project.detonatingStrategy),
    academicConceptIds: project.academicConceptIds ?? [],
    suggestedAcademicConcepts: normalizeSuggestedAcademicConcepts(project.suggestedAcademicConcepts),
    projectTopics: normalizeProjectTopics(project.projectTopics),
    primaryThinkingCriterion: project.primaryThinkingCriterion ?? '',
    secondaryThinkingCriteria: project.secondaryThinkingCriteria ?? [],
    thinkingCriteriaData: project.thinkingCriteriaData,
    finalProduct: project.finalProduct ?? '',
    productGuide: project.productGuide ?? '',
    expectedProductData: project.expectedProductData,
    concentratedMap: project.concentratedMap,
    resonanceQuestionSeeds: project.resonanceQuestionSeeds ?? [],
    generatorsReadiness: project.generatorsReadiness,
    interactiveSelfAssessment: normalizeInteractiveSelfAssessment(project.interactiveSelfAssessment),
    interactiveSelfAssessmentNotice:
      typeof project.interactiveSelfAssessmentNotice === 'string' ? project.interactiveSelfAssessmentNotice : '',
    interactiveSelfAssessmentCaution:
      typeof project.interactiveSelfAssessmentCaution === 'string' ? project.interactiveSelfAssessmentCaution : '',
    checklist: project.checklist ?? [],
    status: project.status,
    needsReview: project.needsReview,
    readyForActivities: (project as Partial<AcademicProject> & { readyForActivities?: boolean }).readyForActivities,
    readinessLevel: (project as Partial<AcademicProject> & { readinessLevel?: AcademicProject['readinessLevel'] }).readinessLevel,
    warnings: (project as Partial<AcademicProject> & { warnings?: string[] }).warnings ?? [],
    catalogStatus: project.catalogStatus,
    linkedConfirmedProjectId: project.linkedConfirmedProjectId,
    studentVisible: project.studentVisible,
    registryId: project.registryId,
    catalogVisible: project.catalogVisible !== false,
    summaryStatus: project.summaryStatus ?? '',
    missingFields: Array.isArray(project.missingFields) ? project.missingFields.map((item) => String(item)) : [],
    source: project.source ?? '',
  } as AcademicProject & {
    catalogVisible?: boolean;
    summaryStatus?: string;
    missingFields?: string[];
    source?: string;
  };
}

function projectFromRegistry(entry: ProjectRegistryEntry, confirmed?: AcademicProject): AcademicProject {
  if (confirmed) {
    return {
      ...confirmed,
      id: entry.id,
      registryId: entry.id,
      linkedConfirmedProjectId: entry.linkedConfirmedProjectId,
      catalogStatus: entry.catalogStatus,
      studentVisible: entry.studentVisible,
      grade: entry.grade,
      field: entry.field as AcademicProject['field'],
      academicProjectNumber: entry.academicProjectNumber,
      title: entry.title,
      partialClassroomProject: entry.partialClassroomProject ?? confirmed.partialClassroomProject,
      bookVolume: entry.bookVolume ?? confirmed.bookVolume,
      catalogVisible: true,
      summaryStatus: 'Guía disponible',
      source: 'project-registry',
    } as AcademicProject;
  }

  return {
    id: entry.id,
    registryId: entry.id,
    sampleNotice: 'Proyecto registrado en catálogo. Requiere desarrollo curricular validado.',
    grade: entry.grade,
    field: entry.field as AcademicProject['field'],
    bookVolume: entry.bookVolume ?? '',
    partialClassroomProject: entry.partialClassroomProject ?? '',
    academicProjectNumber: entry.academicProjectNumber,
    title: entry.title || 'Título pendiente de validación',
    horizon: '',
    studentHorizon: '',
    sourcePages: { nuestroLibroProyectos: [], conceptBook: [], multiplesLenguajes: [], other: [] },
    detonatingStrategy: { id: '', title: '', type: 'pregunta', url: '', observationQuestions: [] },
    academicConceptIds: [],
    suggestedAcademicConcepts: [],
    projectTopics: [],
    primaryThinkingCriterion: '',
    secondaryThinkingCriteria: [],
    finalProduct: '',
    productGuide: '',
    checklist: [],
    status: 'catalog',
    needsReview: true,
    readyForActivities: false,
    readinessLevel: 'incomplete',
    warnings: ['Proyecto registrado en catálogo, pendiente de desarrollo curricular validado.'],
    catalogStatus: entry.catalogStatus ?? 'pending-validation',
    linkedConfirmedProjectId: entry.linkedConfirmedProjectId,
    studentVisible: entry.studentVisible,
    catalogVisible: true,
    summaryStatus: 'Guía en construcción',
    source: 'project-registry',
  } as AcademicProject;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, { cache: 'no-cache' });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`No se pudo cargar ${url}: ${response.status}`);
  return (await response.json()) as T;
}

export async function loadGeneratedCorpus(grade: GradeId, options: { includeConcepts?: boolean } = {}): Promise<DataLoadState> {
  const base = `/caracoles/data/generated/${gradeFolder(grade)}`;

  try {
    const [pages, curriculum, concepts, strategies, summary, projectCandidates, confirmedProjects, projectRegistry, selectableProjects] = await Promise.all([
      fetchJson<PagesIndex>(`${base}/pages-index.json`),
      fetchJson<CurriculumIndex>(`${base}/curriculum-index.json`),
      options.includeConcepts ? fetchJson<ConceptsIndex>(`${base}/concepts-index.json`) : Promise.resolve(null),
      fetchJson<StrategiesIndex>(`${base}/strategies-index.json`),
      fetchJson<CorpusSummary>(`${base}/corpus-summary.json`),
      fetchJson<ProjectCandidatesIndex>(`${base}/project-candidates.json`),
      fetchJson<ConfirmedProjectsIndex>(`${base}/confirmed-projects.json`),
      fetchJson<ProjectRegistryIndex>(`${base}/project-registry.json`),
      fetchJson(`${base}/selectable-projects.json`),
    ]);

    if (!pages && !curriculum && !concepts && !strategies) {
      return { status: 'empty', data: null, error: null };
    }

    const diagnostics = [];
    if (confirmedProjects && !Array.isArray(confirmedProjects.projects)) {
      diagnostics.push('confirmed-projects.json se cargó, pero no contiene un arreglo projects válido.');
    }
    if (confirmedProjects?.projects?.some((project) => project.status === 'confirmed' && !project.id)) {
      diagnostics.push('confirmed-projects.json contiene al menos un proyecto confirmado sin id.');
    }
    if (!confirmedProjects) {
      diagnostics.push('confirmed-projects.json no está disponible para este grado. El catálogo puede mostrar proyectos sin mesa curricular validada.');
    }
    if (projectRegistry && !Array.isArray(projectRegistry.projects)) {
      diagnostics.push('project-registry.json se cargó, pero no contiene un arreglo projects válido.');
    }
    if (!projectRegistry) {
      diagnostics.push('project-registry.json no está disponible para este grado. No hay catálogo público de proyectos.');
    }

    return {
      status: 'loaded',
      data: {
        pages: pages ?? { grade, gradeLabel: `Grado ${grade}`, pages: [], materials: [], warnings: ['pages-index no disponible'] },
        curriculum: curriculum ?? { projects: [], needsReview: [], warnings: ['curriculum-index no disponible'] },
        concepts: concepts ?? { concepts: [], needsReview: [], warnings: ['concepts-index no disponible'] },
        strategies: strategies ?? { strategies: [], needsReview: [], warnings: ['strategies-index no disponible'] },
        summary,
        projectCandidates,
        confirmedProjects,
        projectRegistry,
        selectableProjects: selectableProjects ?? null,
        diagnostics,
      },
      error: null,
    };
  } catch (error) {
    return { status: 'error', data: null, error: error instanceof Error ? error.message : 'Error desconocido al cargar datos' };
  }
}

function projectDeduplicationKey(project: AcademicProject): string {
  // Canonical key: grade + field + ppa (if exists) + academicProjectNumber
  const ppa = project.partialClassroomProject ? project.partialClassroomProject.trim() : '';
  if (ppa || project.academicProjectNumber) {
    return [project.grade, project.field, ppa, project.academicProjectNumber].filter(Boolean).join('|');
  }
  return project.id ? `id|${project.id}` : [project.grade, project.field, project.title].filter(Boolean).join('|');
}

function projectCanonicalKey(project: AcademicProject): string {
  if (project.academicProjectNumber) {
    return [project.grade, project.field, project.academicProjectNumber].filter(Boolean).join('|');
  }
  return project.id ? `id|${project.id}` : [project.grade, project.field, project.title].filter(Boolean).join('|');
}

function isCatalogVisible(project: AcademicProject & { catalogVisible?: boolean }) {
  return project.catalogVisible !== false;
}

function readinessRank(project: AcademicProject) {
  const order: Record<string, number> = {
    incomplete: -1,
    'catalog-only': 0,
    'identity-confirmed': 1,
    'guide-ready': 2,
    'activities-partial': 3,
    'activities-ready': 4,
  };
  return order[project.readinessLevel ?? 'catalog-only'] ?? 0;
}

function completenessScore(project: AcademicProject & { missingFields?: string[] }) {
  let score = 0;
  if (project.bookVolume) score += 2;
  if (project.partialClassroomProject) score += 2;
  if (project.finalProduct) score += 2;
  if (project.horizon || project.studentHorizon) score += 2;
  if (project.primaryThinkingCriterion) score += 2;
  if (project.sourcePages?.nuestroLibroProyectos?.length) score += 2;
  if (project.sourcePages?.conceptBook?.length) score += 2;
  if (project.suggestedAcademicConcepts?.length) score += 2;
  if (project.projectTopics?.length) score += 1;
  score -= Array.isArray(project.missingFields) ? project.missingFields.length : 0;
  return score;
}

function mergeTextLists(a: string[] = [], b: string[] = []) {
  return [...new Set([...(a ?? []), ...(b ?? [])])];
}

function mergeSelectableWithConfirmed(
  selectable: AcademicProject & { catalogVisible?: boolean; summaryStatus?: string; missingFields?: string[]; source?: string },
  confirmed: AcademicProject,
) {
  return normalizeLoadedProject({
    ...selectable,
    ...confirmed,
    id: confirmed.id || selectable.id,
    registryId: selectable.id !== confirmed.id ? selectable.id : confirmed.registryId,
    linkedConfirmedProjectId: confirmed.id,
    catalogVisible: selectable.catalogVisible !== false,
    studentVisible: selectable.studentVisible ?? confirmed.studentVisible,
    warnings: mergeTextLists(selectable.warnings ?? [], confirmed.warnings ?? []),
    missingFields: mergeTextLists(selectable.missingFields ?? [], ((confirmed as unknown as { missingFields?: string[] }).missingFields ?? [])),
    summaryStatus: selectable.summaryStatus ?? '',
    source: selectable.source ?? 'selectable-projects',
    interactiveSelfAssessment: selectable.interactiveSelfAssessment ?? [],
    interactiveSelfAssessmentNotice: selectable.interactiveSelfAssessmentNotice ?? '',
    interactiveSelfAssessmentCaution: selectable.interactiveSelfAssessmentCaution ?? '',
  });
}

function shouldReplaceProject(
  current: AcademicProject & { linkedConfirmedProjectId?: string; missingFields?: string[] },
  incoming: AcademicProject & { linkedConfirmedProjectId?: string; missingFields?: string[] },
) {
  const currentHasConfirmed = Boolean(current.linkedConfirmedProjectId) || current.status === 'confirmed';
  const incomingHasConfirmed = Boolean(incoming.linkedConfirmedProjectId) || incoming.status === 'confirmed';
  if (currentHasConfirmed !== incomingHasConfirmed) return incomingHasConfirmed;

  const currentReadiness = readinessRank(current);
  const incomingReadiness = readinessRank(incoming);
  if (currentReadiness !== incomingReadiness) return incomingReadiness > currentReadiness;

  return completenessScore(incoming) > completenessScore(current);
}

export function projectsFromCorpus(data: GeneratedCorpus | null, fallback: AcademicProject[]): AcademicProject[] {
  // Prefer the curated selectable-projects layer when available.
  const selectable = data?.selectableProjects ?? null;
  const selectableList: Array<SelectableProjectEntry & { status?: string; needsReview?: boolean }> | null =
    selectable && Array.isArray(selectable)
      ? selectable
      : selectable && typeof selectable === 'object' && Array.isArray((selectable as any).projects)
      ? (selectable as any).projects
      : null;

  if (selectableList && selectableList.length) {
    const confirmed = data?.confirmedProjects?.projects ?? [];
    const normalizedConfirmed = confirmed.filter((project) => project.id).map((project) => normalizeLoadedProject(project));
    const confirmedById = new Map(normalizedConfirmed.map((project) => [project.id, project]));
    const confirmedByCanonical = new Map<string, AcademicProject>();
    for (const project of normalizedConfirmed) {
      confirmedByCanonical.set(projectDeduplicationKey(project), project);
      confirmedByCanonical.set(projectCanonicalKey(project), project);
    }
    const projectsByKey = new Map<string, AcademicProject & { catalogVisible?: boolean; summaryStatus?: string; missingFields?: string[]; source?: string }>();

    for (const rawProject of selectableList.filter((project) => project && typeof project === 'object')) {
      const normalized = normalizeLoadedProject(rawProject);
      if (!isCatalogVisible(normalized)) continue;

      const confirmedMatch =
        (normalized.linkedConfirmedProjectId ? confirmedById.get(normalized.linkedConfirmedProjectId) : undefined) ??
        confirmedById.get(normalized.id) ??
        confirmedByCanonical.get(projectDeduplicationKey(normalized)) ??
        confirmedByCanonical.get(projectCanonicalKey(normalized));

      const merged = confirmedMatch ? mergeSelectableWithConfirmed(normalized, confirmedMatch) : normalized;
      const key = projectDeduplicationKey(merged);
      const existing = projectsByKey.get(key);
      if (!existing || shouldReplaceProject(existing, merged)) {
        projectsByKey.set(key, merged);
      }
    }
    return Array.from(projectsByKey.values()).sort(
      (left, right) =>
        String(left.grade).localeCompare(String(right.grade)) ||
        String(left.field).localeCompare(String(right.field)) ||
        (left.academicProjectNumber || 0) - (right.academicProjectNumber || 0) ||
        String(left.title || '').localeCompare(String(right.title || '')),
    );
  }

  // Fallback to registry (visible items) when selectable layer is not present.
  const confirmed = data?.confirmedProjects?.projects ?? [];
  const normalizedManual = confirmed.filter((project) => project.id).map((project) => normalizeLoadedProject(project));
  const confirmedById = new Map(normalizedManual.map((project) => [project.id, project]));
  const registryProjects = (data?.projectRegistry?.projects ?? [])
    .map((entry) => projectFromRegistry(entry, entry.linkedConfirmedProjectId ? confirmedById.get(entry.linkedConfirmedProjectId) : undefined));

  if (data?.projectRegistry) return registryProjects as AcademicProject[];

  return fallback.map((project) => ({ ...project, status: 'sample', needsReview: true })) as AcademicProject[];
}

export function conceptsFromCorpus(data: GeneratedCorpus | null, fallback: AcademicConcept[]): AcademicConcept[] {
  const generated = data?.concepts.concepts ?? [];
  const usable = generated.filter((concept) => concept.id && concept.term && concept.definition && concept.studentExplanation);
  return usable.length ? (usable as AcademicConcept[]) : fallback;
}
