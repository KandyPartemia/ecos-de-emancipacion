import type { AcademicProject } from '../types';
import type {
  CurricularDevelopmentProjectView,
  CurricularDevelopmentSourcePages,
  CurricularOtherMaterialEntry,
  CurricularSourcePageEntry,
} from './curricularDevelopmentLoader';

export type DisplaySourceStatus = 'plain' | 'confirmed' | 'caution' | 'pending';

export type DisplaySourceItem = {
  text: string;
  note?: string;
  status: DisplaySourceStatus;
};

export type ProjectDisplayData = {
  finalProduct: {
    title: string;
    note?: string;
    status: DisplaySourceStatus;
  };
  sourceGroups: {
    nuestroLibroProyectos: DisplaySourceItem[];
    conceptBook: DisplaySourceItem[];
    multiplesLenguajes: DisplaySourceItem[];
    other: DisplaySourceItem[];
  };
};

function normalizeKey(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function displayStatus(status?: string): DisplaySourceStatus {
  const normalized = normalizeKey(status || '');
  if (!normalized) return 'plain';
  if (normalized.includes('confirmed')) return 'confirmed';
  if (normalized.includes('review') || normalized.includes('needsreview')) return 'caution';
  if (normalized.includes('pending')) return 'pending';
  return 'plain';
}

function dedupeItems(items: DisplaySourceItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = normalizeKey(`${item.text}|${item.note || ''}|${item.status}`);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pagesLabel(entry: CurricularSourcePageEntry) {
  if (entry.pagesLabel) return entry.pagesLabel;
  if (entry.startPage && entry.endPage && entry.startPage !== entry.endPage) return `pp. ${entry.startPage}-${entry.endPage}`;
  if (entry.startPage) return `p. ${entry.startPage}`;
  return '';
}

function toDisplayItem(entry: CurricularSourcePageEntry): DisplaySourceItem {
  const pages = pagesLabel(entry);
  return {
    text: [entry.label, pages].filter(Boolean).join(', ') || 'Fuente curricular',
    note: entry.topicTitle || '',
    status: displayStatus(entry.status),
  };
}

function otherMaterialItem(entry: CurricularOtherMaterialEntry): DisplaySourceItem {
  return {
    text: entry.label || 'Recurso complementario',
    note: entry.reference || entry.youtubeSearchQuery || '',
    status: displayStatus(entry.status),
  };
}

function supportMaterialItem(material: { title?: string; kind?: string; pages?: string; status?: string }): DisplaySourceItem {
  return {
    text: [material.kind, material.pages].filter(Boolean).join(', ') || 'Material de apoyo',
    note: material.title || '',
    status: displayStatus(material.status),
  };
}

function baseSourceItems(items: string[]) {
  return items.filter(Boolean).map((item) => ({ text: item, status: 'plain' as const }));
}

function fromBundleGroup(
  sourcePages: CurricularDevelopmentSourcePages | undefined,
  key: 'nuestroLibroProyectos' | 'conceptBook' | 'multiplesLenguajes',
) {
  return dedupeItems((sourcePages?.[key] ?? []).map(toDisplayItem));
}

function fromBundleOther(sourcePages: CurricularDevelopmentSourcePages | undefined) {
  return dedupeItems((sourcePages?.otherMaterials ?? []).map(otherMaterialItem));
}

function mergeSupportMaterials(
  items: DisplaySourceItem[],
  materials: Array<{ title?: string; kind?: string; pages?: string; status?: string }>,
) {
  return dedupeItems([...items, ...materials.map(supportMaterialItem)]);
}

export function buildProjectDisplayData(
  project: AcademicProject,
  curricularView: CurricularDevelopmentProjectView | null,
): ProjectDisplayData {
  const developmentProject = curricularView?.developmentProject;
  const sourcePages = developmentProject?.sourcePages;
  const supportMaterials = developmentProject?.supportMaterials ?? [];

  const base = {
    nuestroLibroProyectos: baseSourceItems(project.sourcePages?.nuestroLibroProyectos ?? []),
    conceptBook: baseSourceItems(project.sourcePages?.conceptBook ?? []),
    multiplesLenguajes: baseSourceItems(project.sourcePages?.multiplesLenguajes ?? []),
    other: baseSourceItems([...(project.sourcePages?.resources ?? []), ...(project.sourcePages?.other ?? [])]),
  };

  const sourceGroups = {
    nuestroLibroProyectos:
      fromBundleGroup(sourcePages, 'nuestroLibroProyectos').length || base.nuestroLibroProyectos.length
        ? fromBundleGroup(sourcePages, 'nuestroLibroProyectos').length
          ? fromBundleGroup(sourcePages, 'nuestroLibroProyectos')
          : base.nuestroLibroProyectos
        : [],
    conceptBook:
      fromBundleGroup(sourcePages, 'conceptBook').length || base.conceptBook.length
        ? fromBundleGroup(sourcePages, 'conceptBook').length
          ? fromBundleGroup(sourcePages, 'conceptBook')
          : base.conceptBook
        : [],
    multiplesLenguajes: mergeSupportMaterials(
      fromBundleGroup(sourcePages, 'multiplesLenguajes').length
        ? fromBundleGroup(sourcePages, 'multiplesLenguajes')
        : base.multiplesLenguajes,
      supportMaterials.filter((material) => normalizeKey(material.kind || '').includes('multiples lenguajes')),
    ),
    other: mergeSupportMaterials(
      fromBundleOther(sourcePages).length ? fromBundleOther(sourcePages) : base.other,
      supportMaterials.filter((material) => !normalizeKey(material.kind || '').includes('multiples lenguajes')),
    ),
  };

  const finalProduct = developmentProject?.finalProduct?.title || project.finalProduct || 'Producto final pendiente de confirmacion.';

  return {
    finalProduct: {
      title: finalProduct,
      note: developmentProject?.finalProduct?.source || '',
      status: displayStatus(developmentProject?.finalProduct?.status),
    },
    sourceGroups,
  };
}
