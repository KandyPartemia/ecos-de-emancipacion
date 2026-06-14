import type { AcademicProject } from '../types';
import type { CurricularConceptEntry, CurricularDevelopmentProjectView } from './curricularDevelopmentLoader';
import { buildProjectDisplayData } from './projectDisplayAdapter';

function unique(items: string[]) {
  return [...new Set(items.filter(Boolean))];
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function formatSourceItems(items: Array<{ text: string; note?: string; status: string }>) {
  if (!items.length) return 'pendiente';
  return unique(
    items.map((item) => {
      const caution = item.status === 'caution' ? ' [cautela]' : item.status === 'pending' ? ' [pendiente]' : '';
      return normalizeText([item.text, item.note].filter(Boolean).join(' - ')) + caution;
    }),
  ).join('; ');
}

function formatConceptEntries(entries: CurricularConceptEntry[], emptyLabel: string) {
  if (!entries.length) return emptyLabel;
  return entries
    .map((entry) => {
      const pages = entry.evidence?.pages?.length ? ` (pp. ${entry.evidence.pages.join(', ')})` : '';
      const status =
        entry.status === 'needsReview' ? ' [en revision]' : entry.status === 'suggested' ? ' [sugerido]' : '';
      return `${entry.concept}${pages}${status}`;
    })
    .join('; ');
}

function curricularStateLabel(project: AcademicProject, curricularView: CurricularDevelopmentProjectView | null) {
  if (!curricularView) return 'desarrollo curricular pendiente de validacion';

  const readiness =
    curricularView?.developmentProject?.validationStatus?.readinessLevel ||
    curricularView?.developmentProject?.readinessLevel ||
    project.readinessLevel ||
    'catalog-only';

  if (readiness === 'activities-partial') return 'actividades preliminares disponibles; juegos completos bloqueados';
  if (readiness === 'development-partial') return 'desarrollo parcial validado';
  if (readiness === 'guide-ready') return 'orientacion docente disponible';
  if (curricularView) return 'orientacion docente disponible';
  return 'desarrollo curricular pendiente de validacion';
}

function promptValue(value: string | number | null | undefined) {
  if (value === null || value === undefined) return 'pendiente';
  if (typeof value === 'number') return String(value);
  const clean = normalizeText(value);
  return clean || 'pendiente';
}

export function buildGptProjectPrompt(project: AcademicProject, curricularView: CurricularDevelopmentProjectView | null) {
  const displayData = buildProjectDisplayData(project, curricularView);
  const developmentProject = curricularView?.developmentProject;
  const teacherProject = curricularView?.teacherProject;
  const teacherOrientation =
    curricularView?.bundle.pedagogicalArticulation?.situatedPedagogicalOrientation || 'pendiente';
  const integratingResonance =
    curricularView?.bundle.teacherNotesAndResonances?.ppaIntegratingResonance ||
    curricularView?.bundle.pedagogicalArticulation?.possibleResonanceQuestion ||
    'pendiente';
  const projectResonances =
    teacherProject?.resonancePrompts?.map((prompt) => `${prompt.type}: ${prompt.prompt}`) ?? [];
  const teacherNotes = teacherProject?.teacherNotes ?? [];
  const supportMaterials = developmentProject?.supportMaterials ?? [];
  const otherSupport = supportMaterials
    .map((material) => normalizeText([material.title, material.kind, material.pages].filter(Boolean).join(' - ')))
    .filter(Boolean);

  const confirmedConcepts = formatConceptEntries(curricularView?.confirmedConcepts ?? [], 'pendiente');
  const fallbackSuggestedConcepts = (project.suggestedAcademicConcepts ?? []).map((concept) => ({
    projectId: project.id,
    projectTitle: project.title,
    concept: concept.concept,
    status: concept.status === 'confirmed' ? 'suggested' : concept.status === 'pending' ? 'needsReview' : 'suggested',
    evidence: {
      sourceBook: concept.sourceBook,
      pages: [],
      reason: concept.description,
    },
    pedagogicalUse: concept.useInProject,
    activityReadiness: 'not-usable-yet',
  })) as CurricularConceptEntry[];
  const cautionConcepts = formatConceptEntries(
    (curricularView?.cautionConcepts?.length ? curricularView.cautionConcepts : fallbackSuggestedConcepts),
    'pendiente',
  );
  const projectNumber = project.academicProjectNumber ? `PA${project.academicProjectNumber}` : 'pendiente';
  const ppaNumber = project.partialClassroomProject || 'pendiente';

  const prompt = [
    'Quiero desarrollar este proyecto de telesecundaria con enfoque situado y pedagogico.',
    '',
    'Datos del proyecto:',
    `- Grado: ${promptValue(project.grade)}`,
    `- Campo formativo: ${promptValue(project.field)}`,
    `- PPA: ${promptValue(ppaNumber)}`,
    `- Proyecto Academico: ${promptValue(projectNumber)}`,
    `- Titulo: ${promptValue(project.title)}`,
    `- Producto final: ${promptValue(displayData.finalProduct.title)}`,
    `- Tomo: ${promptValue(project.bookVolume || developmentProject?.bookVolume)}`,
    `- Paginas de Nuestro libro de proyectos: ${formatSourceItems(displayData.sourceGroups.nuestroLibroProyectos)}`,
    `- Paginas del libro del campo: ${formatSourceItems(displayData.sourceGroups.conceptBook)}`,
    `- Apoyos de Multiples Lenguajes: ${formatSourceItems(displayData.sourceGroups.multiplesLenguajes)}`,
    `- Recursos complementarios: ${promptValue(formatSourceItems([...displayData.sourceGroups.other, ...otherSupport.map((item) => ({ text: item, status: 'plain' as const }))]))}`,
    `- Estado curricular: ${promptValue(curricularStateLabel(project, curricularView))}`,
    `- Conceptos confirmados: ${confirmedConcepts}`,
    `- Conceptos sugeridos o en revision: ${cautionConcepts}`,
    `- Orientacion docente situada disponible: ${promptValue(teacherOrientation)}`,
    `- Resonancia integradora disponible: ${promptValue(integratingResonance)}`,
    `- Resonancias por proyecto: ${promptValue(projectResonances.join(' | '))}`,
    `- Notas docentes disponibles: ${promptValue(teacherNotes.join(' | '))}`,
    '',
    'Necesito que me ayudes a construir:',
    '1. Horizonte u orientacion pedagogica situada, sin inventar horizonte oficial.',
    '2. Conceptos academicos explicados para estudiantes.',
    '3. Secuencia didactica breve.',
    '4. Pregunta de resonancia.',
    '5. Autoevaluacion formativa.',
    '6. Adecuaciones para comunidad rural o semiurbana.',
    '7. Producto final con criterios claros.',
    '',
    'Reglas:',
    '- No inventes fuentes.',
    '- Si falta informacion, marcalo como pendiente.',
    '- No lo llames examen.',
    '- Manten un enfoque critico, comunitario y formativo.',
  ].join('\n');

  return prompt;
}

export function buildGptPromptPreview(prompt: string, maxLines = 12) {
  const lines = prompt.split('\n');
  if (lines.length <= maxLines) return prompt;
  return `${lines.slice(0, maxLines).join('\n')}\n...`;
}
