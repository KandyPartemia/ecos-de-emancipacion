import { useEffect, useMemo, useState } from 'react';
import CurricularSelector from './components/CurricularSelector';
import EnglishLessonDashboard from './components/EnglishLessonDashboard';
import ProjectDashboard from './components/ProjectDashboard';
import BuyMeACoffeeLink from '../components/BuyMeACoffeeLink';
import conceptsGrade1Data from './data/concepts-grade-1.json';
import { conceptsFromCorpus, loadGeneratedCorpus, projectsFromCorpus, type DataLoadState } from './lib/dataLoader';
import { ENGLISH_MEMORY_GAME_URL, getEnglishLessonsByGrade } from './lib/englishLessons';
import type { AcademicConcept, FieldName, GradeId } from './types';

const GRADE_OPTIONS: Array<{ value: GradeId; label: string }> = [
  { value: '1', label: '1°' },
  { value: '2', label: '2°' },
  { value: '3', label: '3°' },
];

const FIELD_OPTIONS = [
  'Lenguajes',
  'Saberes y Pensamiento Científico',
  'Ética, Naturaleza y Sociedades',
  'De lo Humano y lo Comunitario',
  'Inglés',
];

function normalizeKey(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function canonicalFieldName(value: string) {
  const normalized = normalizeKey(value);
  if (normalized === 'ingles') return 'Inglés';
  if (normalized === 'lenguajes') return 'Lenguajes';
  if (normalized === 'saberes y pensamiento cientifico') return 'Saberes y Pensamiento Científico';
  if (normalized === 'etica, naturaleza y sociedades') return 'Ética, Naturaleza y Sociedades';
  if (normalized === 'de lo humano y lo comunitario') return 'De lo Humano y lo Comunitario';
  return value;
}

function isEnglishField(value: string) {
  return normalizeKey(value) === 'ingles';
}

function readSelectionFromUrl() {
  if (typeof window === 'undefined') {
    return { grade: '1' as GradeId, field: 'Lenguajes', pa: '' };
  }

  const params = new URLSearchParams(window.location.search);
  const grade = (params.get('grado') || '1') as GradeId;
  const field = params.get('campo') || 'Lenguajes';
  const pa = params.get('pa') || '';

  return {
    grade: GRADE_OPTIONS.some((option) => option.value === grade) ? grade : ('1' as GradeId),
    field: FIELD_OPTIONS.find((option) => normalizeKey(option) === normalizeKey(field)) || 'Lenguajes',
    pa,
  };
}

function isVisibleProject(project: { catalogVisible?: boolean }) {
  return project.catalogVisible !== false;
}

function sortProjects<T extends { academicProjectNumber?: number; title?: string }>(projects: T[]) {
  return [...projects].sort(
    (left, right) =>
      (left.academicProjectNumber || 0) - (right.academicProjectNumber || 0) ||
      String(left.title || '').localeCompare(String(right.title || ''), 'es'),
  );
}

const PROJECT_TITLE_DISPLAY_OVERRIDES: Record<string, string> = {
  'saberes-y-pensamiento-cientifico-1-ppa-15-pa45': '¡Un tema candente que nos interesa a todxs!',
};

const CARACOLES_NAV_ITEMS = [
  { label: 'Selector', href: '#caracoles-selector' },
  { label: 'Ficha', href: '#caracoles-project-dashboard' },
  { label: 'Mapa mental', href: '#caracoles-mapa-mental' },
  { label: 'Memorama', href: ENGLISH_MEMORY_GAME_URL, external: true },
  { label: 'Autoevaluación', href: '#caracoles-autoevaluacion' },
];

function displayProjectTitle(project: { id?: string; title?: string }) {
  return PROJECT_TITLE_DISPLAY_OVERRIDES[project.id || ''] || project.title || 'Título pendiente';
}

function CaracolesApp() {
  const initialSelection = readSelectionFromUrl();
  const [selectedGrade, setSelectedGrade] = useState<GradeId>(initialSelection.grade);
  const [selectedField, setSelectedField] = useState<string>(initialSelection.field);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [requestedProjectNumber, setRequestedProjectNumber] = useState(initialSelection.pa);
  const [corpusState, setCorpusState] = useState<DataLoadState>({ status: 'loading', data: null, error: null });

  const sampleConcepts = conceptsGrade1Data as AcademicConcept[];
  const englishFieldSelected = isEnglishField(selectedField);
  const englishLessons = useMemo(() => getEnglishLessonsByGrade(selectedGrade), [selectedGrade]);

  useEffect(() => {
    document.title = 'Caracoles Resonando | Base de datos pedagógica';

    const manifest = document.createElement('link');
    manifest.rel = 'manifest';
    manifest.href = '/caracoles/manifest.webmanifest';
    document.head.appendChild(manifest);

    const theme = document.createElement('meta');
    theme.name = 'theme-color';
    theme.content = '#315344';
    document.head.appendChild(theme);

    return () => {
      document.head.removeChild(manifest);
      document.head.removeChild(theme);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setCorpusState({ status: 'loading', data: null, error: null });

    loadGeneratedCorpus(selectedGrade, { includeConcepts: true })
      .then((state) => {
        if (!cancelled) setCorpusState(state);
      })
      .catch((error) => {
        if (!cancelled) {
          setCorpusState({
            status: 'error',
            data: null,
            error: error instanceof Error ? error.message : 'No se pudieron cargar los datos curriculares.',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [selectedGrade]);

  const allProjects = useMemo(
    () => projectsFromCorpus(corpusState.data, []).filter(isVisibleProject),
    [corpusState.data],
  );
  const concepts = useMemo(() => conceptsFromCorpus(corpusState.data, sampleConcepts), [corpusState.data, sampleConcepts]);

  const gradeProjects = useMemo(
    () => sortProjects(allProjects.filter((project) => project.grade === selectedGrade)),
    [allProjects, selectedGrade],
  );
  const fieldProjects = useMemo(
    () =>
      gradeProjects.filter((project) => normalizeKey(canonicalFieldName(project.field)) === normalizeKey(selectedField)),
    [gradeProjects, selectedField],
  );

  useEffect(() => {
    if (englishFieldSelected) {
      if (!englishLessons.length) {
        setSelectedProjectId('');
        return;
      }

      if (requestedProjectNumber) {
        const requestedLesson = englishLessons.find((lesson) => String(lesson.lessonNumber) === requestedProjectNumber);
        if (requestedLesson) {
          setSelectedProjectId(requestedLesson.id);
          setRequestedProjectNumber('');
          return;
        }
      }

      if (!englishLessons.some((lesson) => lesson.id === selectedProjectId)) {
        setSelectedProjectId(englishLessons[0].id);
      }
      return;
    }

    if (!fieldProjects.length) {
      setSelectedProjectId('');
      return;
    }

    if (requestedProjectNumber) {
      const requestedProject = fieldProjects.find(
        (project) => String(project.academicProjectNumber || '') === requestedProjectNumber,
      );
      if (requestedProject) {
        setSelectedProjectId(requestedProject.id);
        setRequestedProjectNumber('');
        return;
      }
    }

    if (!fieldProjects.some((project) => project.id === selectedProjectId)) {
      setSelectedProjectId(fieldProjects[0].id);
    }
  }, [englishFieldSelected, englishLessons, fieldProjects, requestedProjectNumber, selectedProjectId]);

  const activeProject = useMemo(() => {
    if (englishFieldSelected) return null;
    return fieldProjects.find((project) => project.id === selectedProjectId) || null;
  }, [englishFieldSelected, fieldProjects, selectedProjectId]);

  const activeEnglishLesson = useMemo(() => {
    if (!englishFieldSelected) return null;
    return englishLessons.find((lesson) => lesson.id === selectedProjectId) || englishLessons[0] || null;
  }, [englishFieldSelected, englishLessons, selectedProjectId]);

  const linkedConcepts = useMemo(
    () =>
      activeProject
        ? concepts.filter((concept) => (activeProject.academicConceptIds ?? []).includes(concept.id))
        : [],
    [activeProject, concepts],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    params.set('grado', selectedGrade);
    params.set('campo', selectedField);
    if (activeEnglishLesson?.lessonNumber) {
      params.set('pa', String(activeEnglishLesson.lessonNumber));
    } else if (activeProject?.academicProjectNumber) {
      params.set('pa', String(activeProject.academicProjectNumber));
    } else {
      params.delete('pa');
    }
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', nextUrl);
  }, [activeEnglishLesson, activeProject, selectedField, selectedGrade]);

  const projectOptions = useMemo(() => {
    if (englishFieldSelected) {
      return [
        { value: '', label: englishLessons.length ? 'Selecciona una lección de Inglés' : 'Sin lecciones disponibles' },
        ...englishLessons.map((lesson) => ({
          value: lesson.id,
          label: `Lección ${lesson.lessonNumber} - ${lesson.title}`,
        })),
      ];
    }

    return [
      { value: '', label: fieldProjects.length ? 'Selecciona un proyecto académico' : 'Sin proyectos disponibles' },
      ...fieldProjects.map((project) => ({
        value: project.id,
        label: `PA${project.academicProjectNumber ? project.academicProjectNumber : ' pendiente'} — ${displayProjectTitle(
          project,
        )}`,
        readinessLevel: project.readinessLevel,
      })),
    ];
  }, [englishFieldSelected, englishLessons, fieldProjects]);

  const effectiveSelectorFooterMessage = englishFieldSelected
    ? `Hay ${englishLessons.length} lecciones de Inglés para este grado. Cada una se presenta con situación detonadora, vocabulario, algoritmo gramatical y evaluación bilingüe.`
    : undefined;
  const effectiveProjectSelectorNote = englishFieldSelected
    ? selectedProjectId
      ? 'Lección seleccionada para trabajar lectura, vocabulario, gramática y producción.'
      : 'Elige una lección de Inglés para abrir su ficha bilingüe.'
    : undefined;

  return (
    <main id="caracoles-top" className="min-h-screen bg-[#f8f1e6] px-4 pb-8 pt-28 text-[#241a12] md:px-6 lg:px-8">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#315344]/15 bg-[#f8f1e6]/94 px-4 py-3 shadow-[0_18px_55px_rgba(21,18,14,0.08)] backdrop-blur-xl sm:px-8 lg:px-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-sm" aria-label="Menú de Caracoles Resonando">
          <a className="shrink-0 font-serif text-xl leading-none text-[#315344] sm:text-2xl" href="/">
            Ecos de Emancipación
          </a>
          <div className="hidden items-center gap-2 lg:flex">
            {CARACOLES_NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                className="rounded-full px-3 py-2 font-bold text-[#315344] transition hover:bg-white hover:text-[#241a12] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <BuyMeACoffeeLink variant="header" className="hidden sm:inline-flex" />
            <a
              className="hidden rounded-full border border-[#315344]/20 bg-white px-4 py-2 font-black text-[#315344] shadow-sm transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35 sm:inline-flex"
              href="/#recursos"
            >
              Sitio principal
            </a>
            <a
              className="rounded-full bg-[#d9b56d] px-4 py-2 font-black text-[#241a12] shadow-sm transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
              href="#caracoles-selector"
            >
              Revisar PA
            </a>
          </div>
        </nav>
        <div className="mx-auto mt-3 flex max-w-7xl gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Menú auxiliar">
          {CARACOLES_NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#315344]"
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
            >
              {item.label}
            </a>
          ))}
          <BuyMeACoffeeLink variant="header" className="shrink-0 text-xs uppercase tracking-[0.12em]" />
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6">
        <section className="rounded-[2rem] border border-[#315344]/12 bg-white/88 p-5 shadow-[0_22px_70px_rgba(36,26,18,0.08)] md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8f4d32]">Caracoles Resonando</p>
          <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-4xl leading-tight text-[#315344] md:text-5xl">Base pedagógica de Proyectos Académicos</h1>
              <p className="mt-3 max-w-4xl text-base leading-8 text-[#675c51]">
                Selecciona grado, campo formativo y PA para revisar ficha curricular, fuentes, mapa mental integrado y autoevaluación.
              </p>
            </div>
            <a
              className="inline-flex self-start rounded-full border border-[#315344]/20 bg-[#f8f1e6] px-4 py-2 text-sm font-black text-[#315344] transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35 md:self-auto"
              href="/"
            >
              Volver a Ecos
            </a>
          </div>
        </section>

        <BuyMeACoffeeLink
          variant="inline"
          className="!bg-transparent !px-0 !py-0 [&>div]:border-[#315344]/12 [&>div]:bg-white/88 [&>div]:shadow-[0_22px_70px_rgba(36,26,18,0.08)]"
        />

        <div id="caracoles-selector" className="scroll-mt-32">
          <CurricularSelector
            gradeOptions={GRADE_OPTIONS}
            fieldOptions={FIELD_OPTIONS.map((field) => ({ value: field, label: field }))}
            projectOptions={projectOptions}
            selectedGrade={selectedGrade}
            selectedField={selectedField}
            selectedProjectId={selectedProjectId}
            availableCount={englishFieldSelected ? englishLessons.length : fieldProjects.length}
            projectDisabled={false}
            projectNote={effectiveProjectSelectorNote}
            footerMessage={effectiveSelectorFooterMessage}
            onGradeChange={setSelectedGrade}
            onFieldChange={(field) => {
              setSelectedField(field as FieldName);
              setSelectedProjectId('');
            }}
            onProjectChange={setSelectedProjectId}
          />
        </div>

        {englishFieldSelected && activeEnglishLesson ? <EnglishLessonDashboard lesson={activeEnglishLesson} /> : null}

        {!englishFieldSelected && corpusState.status === 'loading' ? (
          <div className="rounded-[2rem] border border-[#315344]/12 bg-white/88 p-6 text-base leading-8 text-[#675c51] shadow-[0_22px_70px_rgba(36,26,18,0.08)]">
            Cargando la base curricular para el grado seleccionado.
          </div>
        ) : null}

        {!englishFieldSelected && corpusState.status === 'error' ? (
          <div className="rounded-[2rem] border border-[#8f4d32]/12 bg-white/88 p-6 text-base leading-8 text-[#8f4d32] shadow-[0_22px_70px_rgba(36,26,18,0.08)]">
            {corpusState.error || 'No se pudo cargar la base curricular.'}
          </div>
        ) : null}

        {!englishFieldSelected && !activeProject && corpusState.status === 'loaded' ? (
          <div className="rounded-[2rem] border border-[#315344]/12 bg-white/88 p-6 text-base leading-8 text-[#675c51] shadow-[0_22px_70px_rgba(36,26,18,0.08)]">
            No hay proyectos académicos listos para consulta en esta combinación de grado y campo formativo.
          </div>
        ) : null}

        {!englishFieldSelected && activeProject ? <ProjectDashboard project={activeProject} linkedConcepts={linkedConcepts} /> : null}

        <footer className="rounded-[2rem] border border-[#315344]/12 bg-white/88 p-5 shadow-[0_22px_70px_rgba(36,26,18,0.08)]">
          <div className="flex flex-col gap-3 text-sm text-[#675c51] sm:flex-row sm:items-center sm:justify-between">
            <p>
              Caracoles Resonando forma parte de Ecos de Emancipación, propuesta pedagógica de la Maestra Kandy
              Partemia González Torreblanca.
            </p>
            <BuyMeACoffeeLink variant="footer" className="shrink-0" />
          </div>
        </footer>
      </div>

      <div className="fixed bottom-5 right-5 z-50 grid gap-2">
        <a
          href="#caracoles-project-dashboard"
          aria-label="Subir al inicio del proyecto"
          title="Subir al inicio del proyecto"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#315344] text-lg font-black text-[#f8f1e6] shadow-[0_16px_40px_rgba(36,26,18,0.22)] transition hover:bg-[#241a12] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
        >
          ↑
        </a>
        <a
          href="/"
          aria-label="Volver al sitio principal"
          title="Volver al sitio principal"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#d9b56d] text-sm font-black text-[#241a12] shadow-[0_16px_40px_rgba(36,26,18,0.18)] transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
        >
          Eco
        </a>
      </div>
    </main>
  );
}

export default CaracolesApp;
