import { AlertTriangle, CheckCircle2, FileText, Layers3 } from 'lucide-react';
import type { DataLoadState, GeneratedCorpus } from '../lib/dataLoader';
import type { GradeId } from '../types';

const gradeLabels: Record<GradeId, string> = {
  '1': 'Primer grado',
  '2': 'Segundo grado',
  '3': 'Tercer grado',
};

function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

function CorpusDashboard({ selectedGrade, corpusState }: { selectedGrade: GradeId; corpusState: DataLoadState }) {
  const data = corpusState.data;

  return (
    <section className="rounded-[2rem] border border-[#315344]/12 bg-white/80 p-5 shadow-[0_22px_70px_rgba(36,26,18,0.08)] md:p-7">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f4d32]">Modo revisión</p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-[#315344] md:text-5xl">Corpus curricular</h2>
      <p className="mt-4 max-w-3xl leading-8 text-[#675c51]">
        Los índices públicos se cargan bajo demanda por grado. Los PDF y el texto completo extraído permanecen fuera del bundle público.
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {(['1', '2', '3'] as GradeId[]).map((grade) => (
          <div key={grade} className={`rounded-2xl border p-4 ${grade === selectedGrade ? 'border-[#315344] bg-[#315344] text-[#f8f1e6]' : 'border-[#315344]/12 bg-[#f5efe4] text-[#315344]'}`}>
            <p className="text-sm font-bold uppercase tracking-[0.14em]">{gradeLabels[grade]}</p>
            <p className="mt-1 text-sm opacity-80">{grade === selectedGrade ? 'Cargado para revisión' : 'Disponible al seleccionar grado'}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {corpusState.status === 'loading' && <StatusCard title="Cargando índices" text="Leyendo JSON públicos ligeros del grado seleccionado." />}
        {corpusState.status === 'empty' && <StatusCard title="Sin datos generados" text="No se encontraron índices públicos para este grado. La interfaz permanece activa mientras se completa la revisión curricular." />}
        {corpusState.status === 'error' && <StatusCard title="Error al cargar" text={corpusState.error ? 'No se pudieron cargar los índices.'} />}
        {corpusState.status === 'loaded' && data && <CorpusGradeCard data={data} />}
      </div>
    </section>
  );
}

function CorpusGradeCard({ data }: { data: GeneratedCorpus }) {
  const pagesIndex = data.pages ? { grade: '', gradeLabel: 'Grado sin datos', materials: [], pages: [], warnings: [] };
  const curriculum = data.curriculum ? { projects: [], needsReview: [], warnings: [] };
  const concepts = data.concepts ? { concepts: [], needsReview: [], warnings: [] };
  const strategies = data.strategies ? { strategies: [], needsReview: [], warnings: [] };
  const summary = data.summary ? { metrics: {} };
  const candidatesIndex = data.projectCandidates ? { candidates: [], averageConfidence: 0 };
  const confirmedIndex = data.confirmedProjects ? { confirmedProjects: 0, incompleteProjects: 0, readyForActivities: 0 };

  const materials = pagesIndex.materials ?? [];
  const processed = materials.filter((material) => ['processed', 'found', 'needsReview'].includes(material.status));
  const pending = materials.filter((material) => ['missing', 'error'].includes(material.status));
  const fields = unique(materials.map((material) => material.field));
  const reviewCount =
    (pagesIndex.pages ?? []).filter((page) => page.needsReview).length +
    (curriculum.needsReview ?? []).length +
    (concepts.needsReview ?? []).length +
    (strategies.needsReview ?? []).length;
  const warnings = [
    ...(pagesIndex.warnings ?? []),
    ...(curriculum.warnings ?? []),
    ...(concepts.warnings ?? []),
    ...(strategies.warnings ?? []),
  ];
  const projectMetrics = summary.metrics ? {};
  const candidates = candidatesIndex.candidates ?? [];

  return (
    <article className="rounded-[1.5rem] border border-[#315344]/10 bg-[#f5efe4] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{pagesIndex.gradeLabel}</p>
          <h3 className="mt-2 font-serif text-3xl text-[#315344]">Grado {pagesIndex.grade}</h3>
        </div>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#315344] text-[#f8f1e6]">
          <Layers3 size={20} aria-hidden="true" />
        </span>
      </div>

      <div className="mt-5 grid gap-2 text-sm text-[#675c51] sm:grid-cols-2 lg:grid-cols-4">
        <Metric icon={FileText} label="Materiales cargados" value={processed.length} />
        <Metric icon={AlertTriangle} label="Materiales pendientes" value={pending.length} />
        <Metric icon={CheckCircle2} label="Proyectos candidatos" value={projectMetrics.projectCandidatesDetected ? (curriculum.projects ?? []).length} />
        <Metric icon={AlertTriangle} label="Pendientes de revisión" value={projectMetrics.pendingReviewProjects ? projectMetrics.projectNeedsReview ? reviewCount} />
        <Metric icon={CheckCircle2} label="Horizontes detectados" value={projectMetrics.projectsWithDetectedHorizon ? 0} />
        <Metric icon={AlertTriangle} label="Confirmados" value={projectMetrics.confirmedProjects ? confirmedIndex.confirmedProjects ? 0} />
        <Metric icon={AlertTriangle} label="Incompletos" value={projectMetrics.incompleteProjects ? confirmedIndex.incompleteProjects ? 0} />
        <Metric icon={CheckCircle2} label="Listos para actividades" value={projectMetrics.readyForActivities ? confirmedIndex.readyForActivities ? 0} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/70 p-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Campos cubiertos</p>
          <p className="mt-2 text-sm leading-6 text-[#675c51]">{fields.length ? fields.join(', ') : 'Pendiente de registrar materiales.'}</p>
        </div>
        <div className="rounded-2xl bg-white/70 p-3">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Advertencias</p>
          <ul className="mt-2 grid max-h-36 gap-2 overflow-auto text-sm leading-6 text-[#675c51]">
            {warnings.length ? warnings.slice(0, 6).map((warning) => <li key={warning}>• {warning}</li>) : <li>Sin advertencias procesadas.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-white/70 p-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Detección asistida de proyectos</p>
        <p className="mt-2 text-sm leading-6 text-[#675c51]">
          Confianza promedio: {projectMetrics.projectAverageConfidence ? candidatesIndex.averageConfidence ? 0}. Los candidatos no se confirman hasta pasar por revisión humana.
        </p>
        <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#675c51]">
          {candidates.length ? candidates.slice(0, 4).map((candidate) => <li key={candidate.id}>• {candidate.title || 'Proyecto sin título'} · confianza {candidate.confidence}</li>) : <li>Ejecuta caracoles:detect-projects para generar candidatos.</li>}
        </ul>
      </div>
    </article>
  );
}

function StatusCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-[1.5rem] border border-[#315344]/10 bg-[#f5efe4] p-5">
      <h3 className="font-serif text-2xl text-[#315344]">{title}</h3>
      <p className="mt-2 leading-7 text-[#675c51]">{text}</p>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof FileText; label: string; value: number }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-3 py-2">
      <span className="flex items-center gap-2">
        <Icon size={16} aria-hidden="true" />
        {label}
      </span>
      <strong className="text-[#315344]">{value}</strong>
    </div>
  );
}

export default CorpusDashboard;
