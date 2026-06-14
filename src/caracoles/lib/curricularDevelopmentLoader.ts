import type { AcademicProject } from '../types';

export type CurricularConceptStatus = 'confirmed' | 'suggested' | 'needsReview' | 'discarded';

export type CurricularSourcePageEntry = {
  materialId?: string;
  label?: string;
  startPage?: number;
  endPage?: number;
  pagesLabel?: string;
  topicTitle?: string;
  status?: string;
};

export type CurricularOtherMaterialEntry = {
  label?: string;
  reference?: string;
  status?: string;
  youtubeSearchQuery?: string;
};

export type CurricularStrategyEntry = {
  title?: string;
  text?: string;
  type?: string;
  url?: string;
  urlStatus?: string;
  source?: string;
  scope?: string;
  relatedResource?: string;
  reference?: string;
  youtubeSearchQuery?: string;
  status?: string;
};

export type CurricularDevelopmentSourcePages = {
  nuestroLibroProyectos?: CurricularSourcePageEntry[];
  conceptBook?: CurricularSourcePageEntry[];
  multiplesLenguajes?: CurricularSourcePageEntry[];
  otherMaterials?: CurricularOtherMaterialEntry[];
};

export type CurricularConceptEntry = {
  projectId: string;
  projectTitle: string;
  concept: string;
  status: CurricularConceptStatus;
  evidence?: {
    sourceBook?: string;
    pages?: number[];
    reason?: string;
  };
  pedagogicalUse?: string;
  activityReadiness?: string;
};

export type CurricularDevelopmentProject = {
  id?: string;
  projectId?: string;
  academicProjectNumber?: number;
  title?: string;
  projectTitle?: string;
  bookVolume?: string;
  partialClassroomProject?: string;
  partialClassroomProjectTitle?: string;
  finalProduct?: { title?: string; source?: string; status?: string };
  supportMaterials?: Array<{ title?: string; kind?: string; pages?: string; status?: string }>;
  sourcePages?: CurricularDevelopmentSourcePages;
  horizonOrPurpose?: { status?: string; text?: string; source?: string };
  projectPurpose?: { text?: string; sourcePages?: string[]; status?: string };
  projectExpectationHorizon?: {
    officialText?: string;
    studentVersion?: string;
    sourcePages?: string[];
    evidence?: string;
    status?: string;
  };
  detonatingStrategy?: CurricularStrategyEntry;
  academicProjectStrategy?: CurricularStrategyEntry;
  academicConcepts?: Array<{
    concept?: string;
    description?: string;
    sourceBook?: string;
    sourcePages?: number[] | string;
    sourcePagesLabel?: string;
    topicTitle?: string;
    status?: CurricularConceptStatus;
    reason?: string;
    pedagogicalUse?: string;
    activityReadiness?: string;
    validationEvidence?: {
      sourceBook?: string;
      pages?: number[];
      reason?: string;
    };
  }>;
  thinkingCriteria?: string[];
  validationStatus?: {
    readinessLevel?: string;
    readyForActivities?: boolean;
    needsReviewReasons?: string[];
  };
  readinessLevel?: string;
  readyForActivities?: boolean;
  needsReviewReasons?: string[];
};

export type CurricularProjectConnection = {
  projectId: string;
  projectTitle: string;
  roleInPpa?: string;
  confirmedConcepts?: string[];
  suggestedConcepts?: string[];
  pedagogicalUse?: string;
};

export type CurricularTeacherProject = {
  projectId: string;
  projectTitle: string;
  teacherNotes?: string[];
  confirmedConceptsToUse?: string[];
  suggestedConceptsToHandleCarefully?: string[];
  resonancePrompts?: Array<{
    type: 'individual' | 'collective' | 'closing' | 'community' | string;
    prompt: string;
    conceptsActivated?: string[];
    thinkingCriteria?: string[];
    suggestedUse?: string;
  }>;
  notReadyFor?: string[];
};

export type CurricularDevelopmentBundle = {
  grade: string;
  gradeLabel?: string;
  field: string;
  ppaNumber: string;
  partialClassroomProject?: string;
  partialClassroomProjectTitle?: string;
  source: string;
  generatedAt?: string;
  development?: {
    partialClassroomProjectContext?: {
      expectationHorizon?: { officialText?: string; evidence?: string; status?: string };
      ppaDetonatingStrategy?: CurricularStrategyEntry;
      ppaDigitalResource?: {
        title?: string;
        reference?: string;
        status?: string;
        source?: string;
      };
    };
    academicProjects?: CurricularDevelopmentProject[];
  };
  conceptsValidation?: {
    entries?: CurricularConceptEntry[];
  };
  pedagogicalArticulation?: {
    status?: string;
    officialHorizonStatus?: string;
    situatedPedagogicalOrientation?: string;
    integratingQuestions?: string[];
    possibleResonanceQuestion?: string;
    teacherNotes?: string[];
    projectConnections?: CurricularProjectConnection[];
  };
  teacherNotesAndResonances?: {
    status?: string;
    officialHorizonStatus?: string;
    ppaIntegratingResonance?: string;
    didacticWarnings?: string[];
    communityPrompts?: Record<string, string[]>;
    projects?: CurricularTeacherProject[];
  };
};

export type CurricularDevelopmentProjectView = {
  bundle: CurricularDevelopmentBundle;
  developmentProject: CurricularDevelopmentProject | null;
  projectConnection: CurricularProjectConnection | null;
  teacherProject: CurricularTeacherProject | null;
  confirmedConcepts: CurricularConceptEntry[];
  cautionConcepts: CurricularConceptEntry[];
  pendingReasons: string[];
};

const bundleCache = new Map<string, Promise<CurricularDevelopmentBundle | null>>();

function normalizeKey(value: string) {
  const source = /[ÃƒÃ‚Ã¢]/.test(value || '')
    ? (() => {
        try {
          return decodeURIComponent(escape(value));
        } catch {
          return value;
        }
      })()
    : value;

  return source
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function fieldSlug(field: string) {
  return normalizeKey(field).replace(/[^a-z0-9]+/g, '-');
}

function ppaNumber(project: AcademicProject) {
  const fromPpa = String(project.partialClassroomProject || '').match(/(\d+)/)?.[1];
  if (fromPpa) return fromPpa;
  const fromId = String(project.id || '').match(/ppa-?(\d+)/i)?.[1];
  return fromId || '';
}

function bundlePath(project: AcademicProject) {
  const ppa = ppaNumber(project);
  if (!project.grade || !project.field || !ppa) return null;
  return `/caracoles/data/curricular-development/grade-${project.grade}-${fieldSlug(project.field)}-ppa-${ppa}.json`;
}

async function fetchBundle(url: string): Promise<CurricularDevelopmentBundle | null> {
  const response = await fetch(url, { cache: 'no-cache' });
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`No se pudo cargar la capa curricular ${url}: ${response.status}`);
  }
  return (await response.json()) as CurricularDevelopmentBundle;
}

function cachedBundle(url: string) {
  if (!bundleCache.has(url)) {
    bundleCache.set(url, fetchBundle(url));
  }
  return bundleCache.get(url)!;
}

function matchesProjectId(candidate: string | undefined, project: AcademicProject) {
  if (!candidate) return false;
  return normalizeKey(candidate) === normalizeKey(project.id);
}

function matchesProjectNumber(candidate: CurricularDevelopmentProject | CurricularProjectConnection | CurricularTeacherProject, project: AcademicProject) {
  const projectNumber = project.academicProjectNumber || 0;
  if (!projectNumber) return false;
  const value =
    'academicProjectNumber' in candidate && typeof candidate.academicProjectNumber === 'number'
      ? candidate.academicProjectNumber
      : Number(String(candidate.projectId || '').match(/pa(\d+)/i)?.[1] || 0);
  return value === projectNumber;
}

function findDevelopmentProject(bundle: CurricularDevelopmentBundle, project: AcademicProject) {
  const candidates = bundle.development?.academicProjects ?? [];
  return (
    candidates.find((candidate) => matchesProjectId(candidate.projectId || candidate.id, project)) ||
    candidates.find((candidate) => matchesProjectNumber(candidate, project)) ||
    null
  );
}

function findProjectConnection(bundle: CurricularDevelopmentBundle, project: AcademicProject) {
  const candidates = bundle.pedagogicalArticulation?.projectConnections ?? [];
  return (
    candidates.find((candidate) => matchesProjectId(candidate.projectId, project)) ||
    candidates.find((candidate) => matchesProjectNumber(candidate, project)) ||
    null
  );
}

function findTeacherProject(bundle: CurricularDevelopmentBundle, project: AcademicProject) {
  const candidates = bundle.teacherNotesAndResonances?.projects ?? [];
  return (
    candidates.find((candidate) => matchesProjectId(candidate.projectId, project)) ||
    candidates.find((candidate) => matchesProjectNumber(candidate, project)) ||
    null
  );
}

function conceptEntries(bundle: CurricularDevelopmentBundle, project: AcademicProject) {
  const entries = bundle.conceptsValidation?.entries ?? [];
  return entries.filter(
    (entry) =>
      matchesProjectId(entry.projectId, project) ||
      Number(String(entry.projectId || '').match(/pa(\d+)/i)?.[1] || 0) === (project.academicProjectNumber || 0),
  );
}

function uniqueList(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

export async function loadCurricularDevelopmentView(
  project: AcademicProject,
): Promise<CurricularDevelopmentProjectView | null> {
  const url = bundlePath(project);
  if (!url) return null;

  const bundle = await cachedBundle(url);
  if (!bundle) return null;

  const developmentProject = findDevelopmentProject(bundle, project);
  const projectConnection = findProjectConnection(bundle, project);
  const teacherProject = findTeacherProject(bundle, project);
  const relatedConcepts = conceptEntries(bundle, project);

  if (!developmentProject && !projectConnection && !teacherProject && !relatedConcepts.length) {
    return null;
  }

  const pendingReasons = uniqueList([
    ...(developmentProject?.validationStatus?.needsReviewReasons ?? []),
    ...(developmentProject?.needsReviewReasons ?? []),
  ]);

  return {
    bundle,
    developmentProject,
    projectConnection,
    teacherProject,
    confirmedConcepts: relatedConcepts.filter((entry) => entry.status === 'confirmed'),
    cautionConcepts: relatedConcepts.filter((entry) => entry.status === 'suggested' || entry.status === 'needsReview'),
    pendingReasons,
  };
}
