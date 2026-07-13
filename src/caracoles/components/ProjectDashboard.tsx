import {
  BookOpen,
  Brain,
  CalendarCheck,
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  Compass,
  HelpCircle,
  Lightbulb,
  Download,
  Link as LinkIcon,
  Megaphone,
  MessageCircle,
  PenLine,
  Users,
  Wrench,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import type { AcademicConcept, AcademicProject } from '../types';
import { type AcademicProjectRecord, type ProjectStrategyRecord } from '../lib/academicProjectRecord';
import { buildAcademicProjectRecord } from '../lib/academicProjectRecordAdapter';
import {
  loadCurricularDevelopmentView,
  type CurricularDevelopmentProjectView,
} from '../lib/curricularDevelopmentLoader';
import { openPlanningPdf } from '../lib/printablePlanning';
import type { CrosswordEntry, CrosswordGameData } from '../lib/wordSearchGenerator';

function sectionPendingCopy() {
  return 'Este apartado requiere validación de fuentes.';
}

function horizonPendingCopy() {
  return 'Horizonte pendiente de validación en fuente.';
}

const WHATSAPP_REPORT_URL = 'https://wa.me/message/XRGTMKCKFGWZP1?src=qr';

function hasActiveVideo(strategy?: ProjectStrategyRecord) {
  return Boolean(
    strategy?.videoUrl && (strategy.urlStatus === 'active' || strategy.urlStatus === 'confirmed'),
  );
}

function isYouTubeUrl(url?: string) {
  return Boolean(url && /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//i.test(url));
}

type DisplayHorizon = AcademicProjectRecord['horizon'];

function resolveDisplayHorizon(
  record: AcademicProjectRecord,
  curricularView: CurricularDevelopmentProjectView | null,
): DisplayHorizon {
  const developmentProject = curricularView?.developmentProject;
  const expectation = developmentProject?.projectExpectationHorizon;
  const rawStatus = String(expectation?.status || '').trim().toLowerCase().replace(/[\s-]+/g, '_');
  const isPendingOrReview = rawStatus === 'pending' || rawStatus.startsWith('needsreview_') || rawStatus.startsWith('needs_review_');
  const confirmedStatuses = new Set([
    'confirmed',
    'confirmed_from_objective',
    'confirmed_from_horizon_label',
    'confirmed_from_fallback',
  ]);
  const isConfirmed = confirmedStatuses.has(rawStatus) || record.horizon.status === 'confirmed';
  const bookVolume = developmentProject?.bookVolume || record.sourcePages.nuestrosProyectos?.tomo || 'correspondiente';
  const reviewText = `Horizonte en revisión — consulta Nuestros Proyectos ${bookVolume}`;

  if (isPendingOrReview) {
    return {
      text: reviewText,
      status: 'review',
      source: record.horizon.source,
      displayLabel: 'Horizonte en revisión',
      note: 'El texto requiere validación directa en la fuente curricular.',
    };
  }

  if (isConfirmed && expectation?.officialText?.trim()) {
    return {
      text: expectation.officialText.trim(),
      status: 'confirmed',
      source: record.horizon.source,
      displayLabel: 'Horizonte de expectativa confirmado',
    };
  }

  if (expectation?.studentVersion?.trim()) {
    return {
      text: expectation.studentVersion.trim(),
      status: isConfirmed ? 'confirmed' : 'teacher-orientation',
      source: record.horizon.source,
      displayLabel: isConfirmed
        ? 'Horizonte de expectativa confirmado'
        : 'Orientación pedagógica provisional',
    };
  }

  if (developmentProject?.horizonOrPurpose?.text?.trim()) {
    return {
      text: developmentProject.horizonOrPurpose.text.trim(),
      status: record.horizon.status,
      source: developmentProject.horizonOrPurpose.source || record.horizon.source,
      displayLabel: record.horizon.displayLabel || 'Horizonte de expectativas',
      note: record.horizon.note,
    };
  }

  return {
    text: reviewText,
    status: 'review',
    source: record.horizon.source,
    displayLabel: 'Horizonte en revisión',
    note: 'El texto requiere validación directa en la fuente curricular.',
  };
}

function humanizePendingNote(text: string) {
  return text
    .replace(/\bactivities-ready\b/gi, 'actividades completas')
    .replace(/\breadyForActivities\b/gi, 'activación de actividades')
    .replace(/\bfull-games\b/gi, 'juegos completos')
    .replace(/\bsummative-exam\b/gi, 'evaluación sumativa');
}

function strategySummary(record: AcademicProjectRecord) {
  if (record.finalProduct) {
    return record.finalProduct;
  }

  const strategy = record.detonatingStrategy;
  const primaryLabel = strategy.displayTitle || strategy.title || strategy.text || '';
  if (!primaryLabel) {
    return 'Pendiente de validación';
  }
  return primaryLabel;
}

function videoResourceSummary(record: AcademicProjectRecord) {
  const strategy = record.detonatingStrategy;
  const primaryLabel = strategy.displayTitle || strategy.title || strategy.text || '';
  if (primaryLabel && primaryLabel !== record.finalProduct) {
    return primaryLabel;
  }

  const relatedLabel = record.relatedStrategies
    ?.map((entry) => entry.displayTitle || entry.title || entry.text || '')
    .find((entry) => entry && entry !== record.finalProduct);

  return relatedLabel || 'Recurso pendiente de validación';
}

function extractOpenableUrl(reference?: string) {
  if (!reference) return '';

  const directMatch = reference.match(/https?:\/\/\S+/i);
  if (directMatch) {
    return directMatch[0].replace(/[),.;]+$/, '');
  }

  const bitlyMatch = reference.match(/\bbit\.ly\/[A-Za-z0-9]+\b/i);
  if (bitlyMatch) {
    return `https://${bitlyMatch[0]}`;
  }

  return '';
}

function playFeedbackTone(kind: 'success' | 'error') {
  if (typeof window === 'undefined') return;

  const AudioCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioCtor) return;

  const context = new AudioCtor();
  const masterGain = context.createGain();
  masterGain.connect(context.destination);
  masterGain.gain.value = 0.06;

  const now = context.currentTime;
  const steps =
    kind === 'success'
      ? [
          { frequency: 880, offset: 0, duration: 0.12, gain: 0.08 },
          { frequency: 1174, offset: 0.14, duration: 0.18, gain: 0.09 },
        ]
      : [
          { frequency: 220, offset: 0, duration: 0.16, gain: 0.08 },
          { frequency: 180, offset: 0.17, duration: 0.22, gain: 0.07 },
        ];

  for (const step of steps) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = kind === 'success' ? 'sine' : 'sawtooth';
    oscillator.frequency.setValueAtTime(step.frequency, now + step.offset);
    gain.gain.setValueAtTime(0.0001, now + step.offset);
    gain.gain.exponentialRampToValueAtTime(step.gain, now + step.offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + step.offset + step.duration);
    oscillator.connect(gain);
    gain.connect(masterGain);
    oscillator.start(now + step.offset);
    oscillator.stop(now + step.offset + step.duration);
  }

  window.setTimeout(() => {
    context.close().catch(() => undefined);
  }, 700);
}

function ConceptStatusBadge({ status }: { status: AcademicProjectRecord['academicConcepts'][number]['status'] }) {
  const copy =
    status === 'confirmed'
      ? 'Confirmado'
      : status === 'suggested'
      ? 'Sugerido'
      : status === 'needsReview'
      ? 'En revisión'
      : 'Descartado';
  const tone =
    status === 'confirmed'
      ? 'border-[#315344]/20 bg-[#e7f0e5] text-[#315344]'
      : status === 'suggested'
      ? 'border-[#d9b56d]/35 bg-[#fff8ee] text-[#8f4d32]'
      : 'border-[#8f4d32]/20 bg-[#f8ece6] text-[#8f4d32]';

  return <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tone}`}>{copy}</span>;
}

function SourceStatusBadge({ status }: { status: 'confirmed' | 'caution' | 'pending' }) {
  const copy = status === 'confirmed' ? 'Confirmada' : status === 'caution' ? 'Cautela' : 'Pendiente';
  const tone =
    status === 'confirmed'
      ? 'border-[#315344]/20 bg-[#e7f0e5] text-[#315344]'
      : status === 'caution'
      ? 'border-[#d9b56d]/35 bg-[#fff8ee] text-[#8f4d32]'
      : 'border-[#8f4d32]/20 bg-[#f8ece6] text-[#8f4d32]';

  return <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] ${tone}`}>{copy}</span>;
}

function Section({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-[#315344]/12 bg-white/88 p-4 shadow-[0_18px_60px_rgba(36,26,18,0.06)] sm:p-5">
      <div className="flex min-w-0 items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#315344] text-sm font-black text-[#f8f1e6]">
          {index}
        </span>
        <h3 className="min-w-0 break-words font-serif text-2xl text-[#315344] sm:text-3xl">{title}</h3>
      </div>
      <div className="mt-5 min-w-0 max-w-full">{children}</div>
    </section>
  );
}

function DataRow({
  label,
  value,
  extra,
}: {
  label: string;
  value: string;
  extra?: ReactNode;
}) {
  return (
    <div className="min-w-0 max-w-full rounded-2xl bg-[#f5efe4] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{label}</p>
      <p className="mt-2 break-words text-base leading-7 text-[#241a12] [overflow-wrap:anywhere]">{value}</p>
      {extra ? <div className="mt-3 min-w-0 max-w-full">{extra}</div> : null}
    </div>
  );
}

function HorizonCard({ horizon }: { horizon: DisplayHorizon }) {
  const label = horizon.displayLabel || (horizon.text ? 'Horizonte de expectativas' : horizonPendingCopy());
  const note =
    horizon.note ||
    (horizon.status === 'pending'
      ? 'No se muestra un horizonte inventado; falta validarlo directamente en la fuente curricular.'
      : '');

  return (
    <div className="min-w-0 max-w-full rounded-[1.5rem] bg-[#f5efe4] p-5">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{label}</p>
        {horizon.status === 'confirmed' ? <SourceStatusBadge status="confirmed" /> : null}
        {horizon.status === 'teacher-orientation' ? <SourceStatusBadge status="caution" /> : null}
        {horizon.status === 'pending' || horizon.status === 'review' ? (
          <SourceStatusBadge status="pending" />
        ) : null}
      </div>
      <p className="mt-2 break-words leading-8 text-[#241a12] [overflow-wrap:anywhere]">{horizon.text || horizonPendingCopy()}</p>
      {note ? <p className="mt-2 text-sm leading-7 text-[#675c51]">{note}</p> : null}
      {horizon.source ? (
        <p className="mt-2 break-words text-sm font-semibold text-[#8f4d32] [overflow-wrap:anywhere]">Fuente: {horizon.source}</p>
      ) : null}
    </div>
  );
}

function BookGroup({
  label,
  title,
  pages,
  status,
}: {
  label: string;
  title?: string;
  pages?: string[];
  status?: 'confirmed' | 'caution' | 'pending';
}) {
  if (!title && !pages?.length) {
    return (
      <div className="min-w-0 max-w-full rounded-2xl bg-[#f5efe4] p-4 text-sm leading-7 text-[#675c51]">
        <p className="font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{label}</p>
        <p className="mt-2">{sectionPendingCopy()}</p>
      </div>
    );
  }

  return (
    <div className="min-w-0 max-w-full rounded-2xl bg-[#f5efe4] p-4">
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{label}</p>
        {status ? <SourceStatusBadge status={status} /> : null}
      </div>
      {title ? <p className="mt-2 break-words text-base font-semibold text-[#241a12] [overflow-wrap:anywhere]">{title}</p> : null}
      {pages?.length ? <p className="mt-2 break-words text-sm leading-7 text-[#675c51] [overflow-wrap:anywhere]">{pages.join(' · ')}</p> : null}
    </div>
  );
}

function StrategyCard({ strategy }: { strategy: ProjectStrategyRecord }) {
  if (!strategy.title && !strategy.text) return null;

  return (
    <article className="min-w-0 max-w-full rounded-[1.5rem] bg-[#f5efe4] p-5">
      <div className="flex flex-wrap items-center gap-3">
        {strategy.scopeLabel ? (
          <span className="rounded-full border border-[#315344]/20 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#315344]">
            {strategy.scopeLabel}
          </span>
        ) : null}
        {strategy.resourceLabel ? (
          <span className="rounded-full border border-[#d9b56d]/35 bg-[#fff8ee] px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">
            {strategy.resourceLabel}
          </span>
        ) : null}
      </div>

      <h4 className="mt-3 break-words font-serif text-2xl text-[#315344] [overflow-wrap:anywhere]">{strategy.displayTitle || strategy.title || strategy.text}</h4>
      {strategy.text && strategy.text !== (strategy.displayTitle || strategy.title) ? (
        <p className="mt-2 leading-8 text-[#241a12]">{strategy.text}</p>
      ) : null}
      {strategy.relatedResource ? (
        <p className="mt-2 break-words text-sm leading-7 text-[#675c51] [overflow-wrap:anywhere]">Referencia asociada: {strategy.relatedResource}</p>
      ) : null}
      {strategy.validationNote ? (
        <p className="mt-2 rounded-2xl bg-white/70 p-3 text-sm leading-7 text-[#675c51]">{strategy.validationNote}</p>
      ) : null}
      {strategy.source ? <p className="mt-2 text-sm font-semibold text-[#8f4d32]">Fuente: {strategy.source}</p> : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {hasActiveVideo(strategy) ? (
          <a
            href={strategy.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#315344] px-5 py-3 text-center text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338]"
          >
            <LinkIcon size={16} />
            {isYouTubeUrl(strategy.videoUrl) ? 'Ver en YouTube' : 'Ver video'}
          </a>
        ) : (
          <p className="text-sm font-semibold leading-7 text-[#675c51]">Video en verificación</p>
        )}
      </div>
    </article>
  );
}

function MatchingActivity({ record }: { record: AcademicProjectRecord }) {
  const pairs = record.matchingActivity?.pairs ?? [];
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const promptPairs = useMemo(() => {
    if (!pairs.length) return [];
    const offset = shuffleSeed % pairs.length;
    return [...pairs.slice(offset), ...pairs.slice(0, offset)];
  }, [pairs, shuffleSeed]);
  const conceptOptions = useMemo(() => {
    const concepts = pairs.map((pair) => pair.concept);
    if (concepts.length <= 1) return concepts;
    const offset = (shuffleSeed + 1) % concepts.length;
    return [...concepts.slice(offset), ...concepts.slice(0, offset)];
  }, [pairs, shuffleSeed]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const availableConcepts = useMemo(() => {
    return Object.fromEntries(
      promptPairs.map((pair) => {
        const currentSelection = answers[pair.concept] ?? '';
        const reservedByOthers = new Set(
          promptPairs
            .filter((candidate) => candidate.concept !== pair.concept)
            .filter((candidate) => {
              const selected = answers[candidate.concept];
              if (!selected) return false;
              if (!checked) return true;
              return selected === candidate.concept;
            })
            .map((candidate) => answers[candidate.concept])
            .filter(Boolean),
        );

        const options = conceptOptions.filter(
          (concept) => concept === currentSelection || !reservedByOthers.has(concept),
        );

        return [pair.concept, options];
      }),
    ) as Record<string, string[]>;
  }, [answers, checked, conceptOptions, promptPairs]);

  useEffect(() => {
    setAnswers({});
    setChecked(false);
    setShuffleSeed(0);
  }, [record.id]);

  if (!pairs.length) {
    return (
      <p className="rounded-2xl bg-[#f5efe4] p-4 text-sm leading-7 text-[#675c51]">
        Actividad pendiente: faltan conceptos confirmados suficientes.
      </p>
    );
  }

  const correctCount = promptPairs.filter((pair) => answers[pair.concept] === pair.concept).length;
  const answeredCount = promptPairs.filter((pair) => answers[pair.concept]).length;
  const wrongPrompts = checked
    ? promptPairs
        .filter((pair) => answers[pair.concept] && answers[pair.concept] !== pair.concept)
        .map((pair) => pair.description)
    : [];
  const missingPrompts = checked
    ? promptPairs.filter((pair) => !answers[pair.concept]).map((pair) => pair.description)
    : [];
  const allCorrect = checked && correctCount === promptPairs.length;
  const setAnswer = (pairConcept: string, nextValue: string) => {
    setAnswers((current) => {
      const nextAnswers = Object.fromEntries(
        Object.entries(current).map(([concept, value]) => {
          if (concept !== pairConcept && value === nextValue) {
            return [concept, ''];
          }
          return [concept, value];
        }),
      ) as Record<string, string>;

      nextAnswers[pairConcept] = nextValue;
      return nextAnswers;
    });
    setChecked(false);
  };

  return (
    <div className="grid gap-4">
      <p className="text-sm leading-7 text-[#675c51]">
        Lee cada descripcion y elige el concepto académico que mejor la representa. Esta actividad usa solo conceptos
        confirmados y está pensada como apoyo formativo.
      </p>
      <p className="text-sm leading-7 text-[#675c51]">
        Cada concepto solo puede usarse una vez. Si te equivocas, puedes cambiar tu respuesta en cualquier momento o
        limpiar toda la actividad para volver a empezar con otro orden.
      </p>
      <p className="text-sm leading-7 text-[#675c51]">
        Si eliges un concepto que ya estaba ocupado en otra descripcion, esa respuesta anterior se libera para que
        puedas corregir sin empezar de cero.
      </p>
      <div className="grid gap-3">
        {promptPairs.map((pair) => (
          <div key={pair.concept} className="grid min-w-0 max-w-full gap-3 rounded-2xl bg-[#f5efe4] p-4 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div
              className={`rounded-2xl px-4 py-4 transition ${
                !checked
                  ? 'bg-white'
                  : answers[pair.concept] === pair.concept
                  ? 'bg-[#e7f0e5] ring-1 ring-[#315344]/18'
                  : 'bg-[#f8ece6] ring-1 ring-[#8f4d32]/18'
              }`}
            >
              <p className="font-semibold leading-7 text-[#241a12]">{pair.description}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Descripción</p>
              {checked && answers[pair.concept] === pair.concept ? (
                <p className="mt-3 text-sm leading-7 text-[#315344]">Relación correcta. Muy bien.</p>
              ) : null}
              {checked && answers[pair.concept] && answers[pair.concept] !== pair.concept ? (
                <p className="mt-3 text-sm leading-7 text-[#8f4d32]">
                  Revisa esta descripcion con calma y vuelve a elegir el concepto que mejor la explica.
                </p>
              ) : null}
              {checked && !answers[pair.concept] ? (
                <p className="mt-3 text-sm leading-7 text-[#8f4d32]">
                  Aún falta elegir un concepto para esta descripcion.
                </p>
              ) : null}
            </div>
            <select
              value={answers[pair.concept] ?? ''}
              onChange={(event) => setAnswer(pair.concept, event.target.value)}
              className="min-h-12 w-full min-w-0 max-w-full rounded-2xl border border-[#315344]/18 bg-white px-4 py-3 text-sm text-[#241a12] outline-none transition focus:border-[#315344]"
            >
              <option value="">Selecciona un concepto</option>
              {(availableConcepts[pair.concept] ?? conceptOptions).map((concept) => (
                <option key={concept} value={concept}>
                  {concept}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="rounded-full bg-[#315344] px-5 py-3 text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338]"
          onClick={() => {
            setChecked(true);
            const hasAnyError = promptPairs.some((pair) => answers[pair.concept] !== pair.concept);
            playFeedbackTone(hasAnyError ? 'error' : 'success');
          }}
        >
          Comprobar relaciones
        </button>
        <button
          type="button"
          className="rounded-full border border-[#315344]/20 bg-white px-5 py-3 text-sm font-bold text-[#315344] transition hover:border-[#315344]/45"
          onClick={() => {
            setAnswers({});
            setChecked(false);
            setShuffleSeed((current) => current + 1);
          }}
        >
          Limpiar todo
        </button>
        <p className="text-sm leading-7 text-[#675c51]">
          {answeredCount} de {promptPairs.length} relaciones contestadas.
        </p>
      </div>
      {checked ? (
        allCorrect ? (
          <p className="rounded-2xl bg-[#e7f0e5] p-4 text-sm leading-7 text-[#315344]">
            Felicidades. Relacionaste correctamente los {promptPairs.length} conceptos. Ya puedes pasar al juego interactivo.
          </p>
        ) : (
          <div className="rounded-2xl bg-[#fff8ee] p-4 text-sm leading-7 text-[#8f4d32]">
            <p>
              Acertaste {correctCount} de {promptPairs.length}. Revisa con calma las descripciones marcadas en rojo y vuelve a intentarlo.
            </p>
            {wrongPrompts.length ? (
              <p className="mt-2">Necesitan una nueva revisión: {wrongPrompts.join(' | ')}.</p>
            ) : null}
            {missingPrompts.length ? (
              <p className="mt-2">Aún falta elegir concepto para: {missingPrompts.join(' | ')}.</p>
            ) : null}
          </div>
        )
      ) : null}
    </div>
  );
}

function crosswordSolutionMap(entries: CrosswordEntry[], revealedTerms: string[], showSolution: boolean) {
  const solved = new Set(revealedTerms);
  const cells = new Map<string, { letter: string; number?: number }>();

  for (const entry of entries) {
    const shouldReveal = showSolution || solved.has(entry.term);
    entry.cells.forEach((cell, index) => {
      const key = `${cell.row}-${cell.col}`;
      const current = cells.get(key) || { letter: '' };
      cells.set(key, {
        letter: shouldReveal ? entry.term[index] : current.letter || '',
          number: current.number ?? (index === 0 ? entry.number : undefined),
      });
    });
  }

  return cells;
}

function CrosswordGame({ data }: { data: CrosswordGameData }) {
  const [showSolution, setShowSolution] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setShowSolution(false);
    setAnswers({});
    setChecked(false);
  }, [data]);

  const correctEntries = useMemo(
    () =>
      data.entries.filter((entry) => {
        const answer = answers[entry.term] || '';
        return answer.trim().toUpperCase() === entry.term;
      }),
    [answers, data.entries],
  );
  const solvedTerms = correctEntries.map((entry) => entry.term);
  const allSolved = solvedTerms.length === data.entries.length;
  const visibleCells = useMemo(
    () => crosswordSolutionMap(data.entries, solvedTerms, showSolution),
    [data.entries, showSolution, solvedTerms],
  );

  useEffect(() => {
    if (allSolved && data.entries.length) {
      playFeedbackTone('success');
    }
  }, [allSolved, data.entries.length]);

  return (
    <div className="grid min-w-0 max-w-full gap-5 overflow-x-hidden">
      <div className="min-w-0 max-w-full rounded-[1.5rem] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Cómo jugar</p>
            <p className="mt-2 text-sm leading-7 text-[#675c51]">
              Lee las pistas, escribe la palabra que responde a cada una y comprueba tu avance. Cuando una respuesta es correcta, aparece en el crucigrama.
            </p>
          </div>
          <div className="rounded-2xl bg-[#f5efe4] px-4 py-3 text-sm leading-7 text-[#675c51]">
            <p>
              Avance: <strong>{solvedTerms.length}</strong> de <strong>{data.entries.length}</strong> respuestas correctas.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-full border border-[#315344]/20 bg-white px-4 py-2 text-sm font-bold text-[#315344] transition hover:border-[#315344]/45"
            onClick={() => setShowSolution((current) => !current)}
          >
            {showSolution ? 'Ocultar solución' : 'Mostrar solución'}
          </button>
          <button
            type="button"
            className="rounded-full border border-[#315344]/20 bg-white px-4 py-2 text-sm font-bold text-[#315344] transition hover:border-[#315344]/45"
            onClick={() => {
              setAnswers({});
              setChecked(false);
              setShowSolution(false);
            }}
          >
            Limpiar crucigrama
          </button>
          <p className="text-sm leading-7 text-[#675c51]">La solución se puede mostrar u ocultar para acompañarte sin perder el reto.</p>
        </div>
      </div>

      <div className="grid min-w-0 max-w-full gap-4 lg:grid-cols-[minmax(0,0.56fr)_minmax(17rem,1fr)]">
        <div className="max-w-full overflow-hidden rounded-[1.5rem] border border-[#315344]/12 bg-[#efe6d8] p-2.5 shadow-inner">
          <div
            className="mx-auto grid h-auto w-full max-w-full gap-0.5 rounded-[1rem] bg-[#f8f1e6] p-2"
            style={{ gridTemplateColumns: `repeat(${data.width}, minmax(0, 1fr))`, maxWidth: '100%', height: 'auto' }}
          >
            {data.grid.flatMap((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const key = `${rowIndex}-${colIndex}`;
                const visibleCell = visibleCells.get(key);
                return (
                  <span
                    key={key}
                    className={`relative inline-flex aspect-square h-auto w-full min-w-0 items-center justify-center rounded-md border text-[9px] font-black shadow-sm transition ${
                      cell
                        ? 'border-[#d9c7ae] bg-white text-[#241a12]'
                        : 'border-transparent bg-[#cfbea5]'
                    }`}
                  >
                    {cell ? (
                      <>
                        {visibleCell?.number ? (
                          <span className="absolute left-0.5 top-0.5 text-[8px] font-black text-[#8f4d32]">
                            {visibleCell.number}
                          </span>
                        ) : null}
                        <span>{visibleCell?.letter || ''}</span>
                      </>
                    ) : null}
                  </span>
                );
              }),
            )}
          </div>
        </div>

        <div className="min-w-0 max-w-full rounded-[1.5rem] bg-[#f5efe4] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Pistas del crucigrama</p>
          <div className="mt-3 grid gap-4">
            {(['across', 'down'] as const).map((direction) => {
              const clues = data.entries.filter((entry) => entry.direction === direction);
              if (!clues.length) return null;

              return (
                <div key={direction} className="grid gap-3">
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#315344]">
                    {direction === 'across' ? 'Horizontales' : 'Verticales'}
                  </p>
                  {clues.map((entry) => {
                    const answer = (answers[entry.term] || '').trim().toUpperCase();
                    const isCorrect = answer === entry.term;
                    const isWrong = Boolean(checked && answer && !isCorrect);

                    return (
                      <div
                        key={`${entry.direction}-${entry.number}-${entry.term}`}
                        className={`rounded-2xl p-4 ${
                          isCorrect
                            ? 'bg-[#e7f0e5] ring-1 ring-[#315344]/18'
                            : isWrong
                            ? 'bg-[#f8ece6] ring-1 ring-[#8f4d32]/18'
                            : 'bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="rounded-full bg-[#efe6d8] px-3 py-1 text-xs font-black text-[#8f4d32]">
                            {entry.number}
                          </span>
                          <div className="grid min-w-0 gap-1">
                            <p className="break-words text-sm leading-7 text-[#241a12] [overflow-wrap:anywhere]">{entry.clue}</p>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8f4d32]">
                              {entry.term.length} letras
                            </p>
                          </div>
                        </div>
                        <input
                          value={answers[entry.term] ?? ''}
                          onChange={(event) => {
                            setAnswers((current) => ({
                              ...current,
                              [entry.term]: event.target.value.toUpperCase(),
                            }));
                            setChecked(false);
                          }}
                          placeholder={`Escribe una palabra de ${entry.term.length} letras`}
                          autoComplete="off"
                          className="mt-3 min-h-11 w-full min-w-0 max-w-full rounded-2xl border border-[#315344]/18 bg-[#fffdf8] px-4 py-2.5 text-sm text-[#241a12] outline-none transition focus:border-[#315344]"
                        />
                        {isCorrect ? (
                          <p className="mt-2 text-sm leading-7 text-[#315344]">Respuesta correcta.</p>
                        ) : isWrong ? (
                          <p className="mt-2 text-sm leading-7 text-[#8f4d32]">
                            Aún no coincide. Revisa la pista y vuelve a intentarlo.
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-[#315344] px-5 py-3 text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338]"
              onClick={() => {
                setChecked(true);
                const hasAnyError = data.entries.some(
                  (entry) => (answers[entry.term] || '').trim().toUpperCase() !== entry.term,
                );
                playFeedbackTone(hasAnyError ? 'error' : 'success');
              }}
            >
              Comprobar crucigrama
            </button>
            <p className="text-sm leading-7 text-[#675c51]">
              {solvedTerms.length} de {data.entries.length} respuestas correctas.
            </p>
          </div>
        </div>
      </div>

      {allSolved ? (
        <p className="rounded-2xl bg-[#e7f0e5] p-4 text-sm leading-7 text-[#315344]">
          Felicidades. Completaste correctamente el crucigrama.
        </p>
      ) : null}
    </div>
  );
}

function gradeWord(grade: string) {
  if (grade === '1') return 'primer';
  if (grade === '2') return 'segundo';
  if (grade === '3') return 'tercer';
  return `${grade}°`;
}

function wrapMindMapLabel(label: string, maxChars = 20, maxLines = 3) {
  const words = label.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
    }
    current = word;
    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  const usedWordCount = lines.join(' ').split(/\s+/).filter(Boolean).length;
  if (usedWordCount < words.length && lines.length) {
    const lastLine = lines[lines.length - 1];
    lines[lines.length - 1] = lastLine.endsWith('…') ? lastLine : `${lastLine}…`;
  }

  return lines.slice(0, maxLines);
}

function normalizeMindMapText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function splitMindMapText(value?: string, fallback: string[] = []) {
  const text = (value || '').replace(/\s+/g, ' ').trim();
  if (!text) return fallback;
  const parts = text
    .split(/(?<=[.!?])\s+/)
    .map((item) => normalizeMindMapText(item.replace(/[.!?]+$/, '')))
    .filter(Boolean);
  return parts.length ? parts.slice(0, 4) : fallback;
}

function fieldThinkingCriteria(field: string) {
  const normalized = field
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  if (normalized.includes('saberes')) {
    return [
      'Lógica matemática: ordenar relaciones y cantidades.',
      'Pensamiento científico: observar, explicar y comprobar.',
      'Pensamiento analítico: distinguir datos y procesos.',
      'Resolución de problemas: proponer rutas de solución.',
      'Interpretación de datos: leer evidencias con cuidado.',
    ];
  }

  if (normalized.includes('etica')) {
    return [
      'Conciencia social: reconocer condiciones de vida.',
      'Pensamiento histórico: ubicar cambios y permanencias.',
      'Pensamiento crítico: analizar la realidad social.',
      'Mirada socioambiental: relacionar territorio y comunidad.',
      'Interculturalidad: valorar diferencias y desigualdades.',
    ];
  }

  if (normalized.includes('humano')) {
    return [
      'Visión nóstrica: pensar desde el nosotros.',
      'Reconocimiento del otro: cuidar vínculos y acuerdos.',
      'Decisiones colectivas: dialogar y actuar con responsabilidad.',
      'Pensamiento estratégico: planear mejoras posibles.',
      'Bien común: orientar acciones comunitarias.',
    ];
  }

  return [
    'Pensamiento lógico-lingüístico: ordenar ideas con lenguaje.',
    'Pensamiento comunicativo: expresar con intención clara.',
    'Pensamiento creativo: representar y crear significados.',
    'Pensamiento crítico: interpretar discursos y mensajes.',
  ];
}

function sourceLine(record: AcademicProjectRecord) {
  const source = record.sourcePages.nuestrosProyectos;
  const tomo = source?.tomo ? ', ' + source.tomo : '';
  const pages = source?.pages?.length ? ', ' + source.pages.join(' · ') : '';
  return 'Nuestro libro de proyectos' + tomo + pages;
}

function conceptBullets(concepts: AcademicProjectRecord['academicConcepts']) {
  return concepts
    .filter((concept) => concept.status === 'confirmed')
    .map((concept) => normalizeMindMapText(concept.concept))
    .filter(Boolean)
    .slice(0, 8);
}

function presentationBullets(record: AcademicProjectRecord) {
  const product = record.finalProduct || 'estrategia detonadora';
  return {
    before: ['Revisar información y fuentes.', 'Organizar materiales para ' + product.toLowerCase() + '.'],
    during: ['Presentar con claridad y respeto.', 'Compartir hallazgos y acuerdos.'],
    after: ['Valorar aprendizajes del proyecto.', 'Recibir retroalimentación y mejorar.'],
  };
}

function MapNumber({ value, color }: { value: string; color: string }) {
  return (
    <span
      className="grid size-8 shrink-0 place-items-center rounded-full text-base font-black text-white shadow-sm sm:size-9 sm:text-lg"
      style={{ backgroundColor: color }}
    >
      {value}
    </span>
  );
}

function MapBlock({
  number,
  title,
  items,
  color,
  icon,
  className = '',
}: {
  number: string;
  title: string;
  items: string[];
  color: string;
  icon: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={'min-w-0 rounded-[1.35rem] border-4 bg-white/95 p-4 shadow-[0_8px_0_rgba(36,26,18,0.04)] ' + className}
      style={{ borderColor: color }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <MapNumber value={number} color={color} />
          <h4 className="min-w-0 break-words font-serif text-lg leading-6 text-[#1f2b4d] sm:text-xl md:text-2xl">{title}</h4>
        </div>
        <div className="hidden shrink-0 rounded-2xl bg-[#f7efe0] p-2 text-[#315344] sm:block [&_svg]:size-6 md:[&_svg]:size-7">{icon}</div>
      </div>
      <ul className="mt-3 grid gap-2 text-[0.84rem] font-semibold leading-6 text-[#241a12] md:text-sm md:leading-6">
        {items.map((item) => (
          <li key={item} className="flex min-w-0 gap-2">
            <span className="mt-2 size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
            <span className="min-w-0 whitespace-normal break-words">{normalizeMindMapText(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function PresentationMapBlock({
  items,
}: {
  items: { before: string[]; during: string[]; after: string[] };
}) {
  const color = '#2563a8';
  return (
    <section className="min-w-0 rounded-[1.35rem] border-4 border-[#2563a8] bg-white/95 p-4 shadow-[0_8px_0_rgba(36,26,18,0.04)] xl:col-span-2">
      <div className="flex items-center gap-2">
        <MapNumber value="8" color={color} />
        <h4 className="min-w-0 break-words font-serif text-lg leading-6 text-[#1f2b4d] sm:text-xl md:text-2xl">Presentación, trabajo comunitario y evaluación</h4>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        {[
          ['Antes', items.before],
          ['Durante', items.during],
          ['Después', items.after],
        ].map(([label, list]) => (
          <div key={label as string} className="rounded-2xl border border-[#2563a8]/35 bg-[#f7fbff] p-3">
            <p className="mb-2 rounded-full bg-[#2563a8] px-3 py-1 text-center text-sm font-black text-white">{label as string}</p>
            <ul className="grid gap-2 text-[0.82rem] font-semibold leading-6 text-[#241a12]">
              {(list as string[]).map((item) => (
                <li key={item} className="whitespace-normal break-words">• {normalizeMindMapText(item)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function ConceptMindMap({
  record,
  concepts,
}: {
  record: AcademicProjectRecord;
  concepts: AcademicProjectRecord['academicConcepts'];
}) {
  const confirmedConcepts = conceptBullets(concepts);
  if (confirmedConcepts.length < 3) return null;

  const source = sourceLine(record);
  const product = record.finalProduct || 'Estrategia detonadora pendiente';
  const horizonItems =
    record.horizon.text && record.horizon.status !== 'pending'
      ? splitMindMapText(record.horizon.text).slice(0, 2)
      : ['Pendiente de transcripción literal desde ' + source + '.'];
  const purposeItems = splitMindMapText(record.teacherOrientation, [
    'Comprender el sentido del proyecto "' + record.academicProjectTitle + '".',
    'Retomar conceptos académicos y fuentes del campo formativo.',
    'Construir evidencias para desarrollar: ' + product + '.',
  ]).slice(0, 4);
  const situationItems = splitMindMapText(record.resonanceQuestion, [
    'Identificar una situación del entorno relacionada con el proyecto.',
    'Reconocer dudas, necesidades o problemas que orientan la indagación.',
    'Conectar el desafío inicial con la estrategia detonadora.',
  ]).slice(0, 4);
  const stepItems = [
    'Seleccionar información clave.',
    'Investigar en fuentes confiables.',
    'Registrar hallazgos y conceptos.',
    'Comparar ideas y evidencias.',
    'Organizar la estrategia detonadora.',
    'Revisar y mejorar la propuesta.',
    'Socializar resultados.',
  ];
  const ideaForce =
    record.horizon.text && record.horizon.status !== 'pending'
      ? normalizeMindMapText(record.horizon.text)
      : 'El proyecto ' + record.academicProjectNumber + ' permite usar conceptos, fuentes y trabajo comunitario para desarrollar ' + product.toLowerCase() + '.';
  const presentation = presentationBullets(record);

  return (
    <article id="caracoles-mapa-mental" className="min-w-0 max-w-full overflow-hidden rounded-[2rem] border-2 border-[#e0c492] bg-[#fffdf7] p-3 shadow-[0_18px_55px_rgba(36,26,18,0.08)] md:p-5">
      <div className="mb-4 flex flex-col gap-2 rounded-[1.4rem] bg-[#315344] px-5 py-4 text-[#f8f1e6] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#d9b56d]">Recurso visual del proyecto</p>
          <h4 className="mt-1 font-serif text-3xl leading-tight md:text-4xl">Mapa mental integrado del PA</h4>
        </div>
        <p className="max-w-xl text-sm font-semibold leading-6 text-[#f8f1e6]/88">
          Síntesis didáctica para leer, comentar, imprimir o proyectar durante el trabajo del Proyecto Académico.
        </p>
      </div>
      <div className="relative min-w-0 max-w-full overflow-hidden rounded-[1.7rem] bg-[#fffaf0] p-3 md:p-5">
        <div className="pointer-events-none absolute inset-4 hidden rounded-[2rem] border-2 border-dashed border-[#d7b779]/55 xl:block" />
        <div className="relative grid gap-4 xl:hidden">
          <MapBlock number="1" title="Propósito" color="#1f63b5" icon={<Lightbulb size={30} />} items={purposeItems} />
          <MapBlock number="2" title="Estrategia detonadora / producto final" color="#1c8a2f" icon={<ClipboardList size={30} />} items={[product, 'Organización clara de evidencias.', 'Comunicación del aprendizaje logrado.', 'Socialización con la comunidad escolar.']} />
          <MapBlock number="3" title="Situación problemática" color="#d7266b" icon={<HelpCircle size={30} />} items={situationItems} />
          <MapBlock number="4" title="Horizonte de expectativas" color="#f26b21" icon={<Compass size={30} />} items={horizonItems} />
          <MapBlock number="5" title="Conceptos académicos" color="#6d35a8" icon={<Wrench size={30} />} items={confirmedConcepts} />
          <MapBlock
            number="6"
            title="Criterios de pensamiento que se desarrollan"
            color="#168b90"
            icon={<Brain size={30} />}
            items={fieldThinkingCriteria(record.field)}
          />
          <MapBlock number="7" title="Paso a paso" color="#e6a21a" icon={<PenLine size={30} />} items={stepItems} />
          <PresentationMapBlock items={presentation} />

          <section className="rounded-[2rem] border-4 border-[#1f63b5] bg-white px-5 py-6 text-center shadow-[0_10px_0_rgba(31,99,181,0.08)]">
            <p className="font-serif text-2xl font-black leading-tight text-[#12346b] md:text-4xl">
              Proyecto Académico {record.academicProjectNumber}
            </p>
            <p className="mt-2 text-lg font-black text-[#5b2e91] md:text-2xl">
              {record.field} {record.grade}°
            </p>
            <h3 className="mt-3 font-serif text-3xl font-black leading-tight text-[#d22f72] md:text-5xl">
              {record.academicProjectTitle}
            </h3>
            <div className="mx-auto mt-4 flex max-w-md flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#f7efe0] px-4 py-2 text-sm font-black text-[#241a12]">
              <BookOpen size={24} className="shrink-0 text-[#315344]" />
              <span className="min-w-0 break-words">{source}</span>
            </div>
          </section>
        </div>

        <div className="relative hidden gap-4 xl:grid xl:grid-cols-[1fr_1.08fr_1fr] xl:items-center">
          <div className="grid gap-4">
            <MapBlock number="1" title="Propósito" color="#1f63b5" icon={<Lightbulb size={30} />} items={purposeItems} />
            <MapBlock number="5" title="Conceptos académicos" color="#6d35a8" icon={<Wrench size={30} />} items={confirmedConcepts} />
          </div>

          <div className="grid gap-4">
            <section className="rounded-[2rem] border-4 border-[#1f63b5] bg-white px-5 py-6 text-center shadow-[0_10px_0_rgba(31,99,181,0.08)]">
              <p className="font-serif text-2xl font-black leading-tight text-[#12346b] md:text-4xl">
                Proyecto Académico {record.academicProjectNumber}
              </p>
              <p className="mt-2 text-lg font-black text-[#5b2e91] md:text-2xl">
                {record.field} {record.grade}°
              </p>
              <h3 className="mt-3 font-serif text-3xl font-black leading-tight text-[#d22f72] md:text-5xl">
                {record.academicProjectTitle}
              </h3>
              <div className="mx-auto mt-4 flex max-w-md flex-wrap items-center justify-center gap-2 rounded-2xl bg-[#f7efe0] px-4 py-2 text-sm font-black text-[#241a12]">
                <BookOpen size={24} className="shrink-0 text-[#315344]" />
                <span className="min-w-0 break-words">{source}</span>
              </div>
            </section>
            <MapBlock number="7" title="Paso a paso" color="#e6a21a" icon={<PenLine size={30} />} items={stepItems} />
          </div>

          <div className="grid gap-4">
            <MapBlock number="2" title="Estrategia detonadora / producto final" color="#1c8a2f" icon={<ClipboardList size={30} />} items={[product, 'Organización clara de evidencias.', 'Comunicación del aprendizaje logrado.', 'Socialización con la comunidad escolar.']} />
            <MapBlock number="3" title="Situación problemática" color="#d7266b" icon={<HelpCircle size={30} />} items={situationItems} />
            <MapBlock number="4" title="Horizonte de expectativas" color="#f26b21" icon={<Compass size={30} />} items={horizonItems} />
          </div>

          <PresentationMapBlock items={presentation} />
          <MapBlock
            number="6"
            title="Criterios de pensamiento que se desarrollan"
            color="#168b90"
            icon={<Brain size={30} />}
            items={fieldThinkingCriteria(record.field)}
          />
        </div>

        <div className="relative mt-4 flex flex-col gap-3 rounded-[1.4rem] border-2 border-dashed border-[#6d35a8] bg-white px-4 py-4 md:flex-row md:items-center">
          <div className="flex shrink-0 items-center gap-3 rounded-2xl bg-[#6d35a8] px-4 py-2 text-xl font-black text-white">
            <Megaphone size={28} />
            IDEA FUERZA
          </div>
          <p className="text-base font-black leading-7 text-[#241a12] md:text-xl">{ideaForce}</p>
          <div className="ml-auto hidden items-center gap-2 text-[#315344] md:flex">
            <Users size={30} />
            <CalendarCheck size={30} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Autoevaluation({ record }: { record: AcademicProjectRecord }) {
  const confirmedConcepts = record.academicConcepts
    .filter((concept) => concept.status === 'confirmed')
    .slice(0, 4)
    .map((concept) => concept.concept);
  const strategyName = record.detonatingStrategy.title || record.detonatingStrategy.text || 'la estrategia detonadora';

  return (
    <div className="grid gap-6">
      <div className="rounded-[1.5rem] bg-[#f5efe4] p-5">
        <div className="flex items-center gap-3">
          <BookOpen className="text-[#315344]" size={20} />
          <h4 className="font-serif text-2xl text-[#315344]">Momento 1. Resonancia</h4>
        </div>
        <p className="mt-3 leading-8 text-[#241a12]">{record.resonanceQuestion || sectionPendingCopy()}</p>
        <div className="mt-4 rounded-2xl bg-white p-4 text-sm leading-7 text-[#675c51]">
          <p className="font-semibold text-[#315344]">Para responder:</p>
          <ul className="mt-2 grid gap-2">
            <li>Retoma al menos dos conceptos académicos del proyecto.</li>
            <li>Explica que te aporta la estrategia detonadora: {strategyName}.</li>
            <li>Relaciona tu respuesta con la estrategia detonadora y con una situación de tu comunidad o vida cotidiana.</li>
            {confirmedConcepts.length ? (
              <li>Te pueden ayudar especialmente estos conceptos: {confirmedConcepts.join(' · ')}.</li>
            ) : null}
          </ul>
        </div>
        {record.resonanceStatus === 'suggested' ? (
          <p className="mt-3 text-sm leading-7 text-[#8f4d32]">Pregunta sugerida pendiente de validación docente.</p>
        ) : null}
      </div>

      <div className="rounded-[1.5rem] bg-[#f5efe4] p-5">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="text-[#315344]" size={20} />
          <h4 className="font-serif text-2xl text-[#315344]">Momento 2. Relacionar dos columnas</h4>
        </div>
        <div className="mt-4">
          <MatchingActivity record={record} />
        </div>
      </div>

      <div className="rounded-[1.5rem] bg-[#f5efe4] p-5">
        <div className="flex items-center gap-3">
          <CircleDashed className="text-[#315344]" size={20} />
          <h4 className="font-serif text-2xl text-[#315344]">Momento 3. Juego interactivo</h4>
        </div>
        <div className="mt-4">
          {record.game?.status === 'ready' && record.game.type === 'crossword' && record.game.data ? (
            <CrosswordGame data={record.game.data as CrosswordGameData} />
          ) : (
            <p className="rounded-2xl bg-white p-4 text-sm leading-7 text-[#675c51]">
              {record.game?.reason || 'Juego pendiente: faltan conceptos confirmados suficientes.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
function ProjectDashboard({
  project,
  linkedConcepts,
}: {
  project: AcademicProject;
  linkedConcepts: AcademicConcept[];
}) {
  const [curricularView, setCurricularView] = useState<CurricularDevelopmentProjectView | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    loadCurricularDevelopmentView(project)
      .then((nextView) => {
        if (!cancelled) {
          setCurricularView(nextView);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setCurricularView(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [project.id, project.grade, project.field, project.academicProjectNumber, project.partialClassroomProject]);

  const record = useMemo(
    () => buildAcademicProjectRecord(project, curricularView, linkedConcepts),
    [curricularView, linkedConcepts, project],
  );
  const displayHorizon = useMemo(
    () => resolveDisplayHorizon(record, curricularView),
    [curricularView, record],
  );

  const visibleConcepts = record.academicConcepts.filter((concept) => concept.status !== 'discarded');
  const strategyVideo =
    (record.detonatingStrategy.scope === 'academic-project' &&
    hasActiveVideo(record.detonatingStrategy)
      ? record.detonatingStrategy
      : undefined) ||
    record.relatedStrategies?.find(
      (strategy) => strategy.scope === 'academic-project' && hasActiveVideo(strategy),
    ) ||
    (record.detonatingStrategy.scope === 'partial-classroom-project' && hasActiveVideo(record.detonatingStrategy)
      ? record.detonatingStrategy
      : undefined) ||
    record.relatedStrategies?.find(
      (strategy) => strategy.scope === 'partial-classroom-project' && hasActiveVideo(strategy),
    );
  const reportVolume =
    curricularView?.developmentProject?.bookVolume ||
    project.bookVolume ||
    record.sourcePages.nuestrosProyectos?.tomo ||
    'Tomo pendiente';
  const reportMessage = `Hola Kandy, encontré un dato incorrecto en el PA: ${record.academicProjectTitle}, Grado ${record.grade}, ${reportVolume}: `;
  const reportUrl = `${WHATSAPP_REPORT_URL}&text=${encodeURIComponent(reportMessage)}`;

  return (
    <section className="grid min-w-0 max-w-full gap-5 overflow-x-hidden" id="caracoles-project-dashboard">
      <div className="min-w-0 max-w-full overflow-hidden rounded-[2rem] border border-[#315344]/12 bg-white/88 p-4 shadow-[0_22px_70px_rgba(36,26,18,0.08)] sm:p-5 md:p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f4d32]">Ficha curricular del proyecto</p>
        <h2 className="mt-2 break-words font-serif text-3xl leading-tight text-[#315344] [overflow-wrap:anywhere] sm:text-4xl md:text-5xl">
          PA {record.academicProjectNumber || 'pendiente'} — {record.academicProjectTitle}
        </h2>
        <button
          type="button"
          onClick={() => openPlanningPdf(record, displayHorizon)}
          className="mt-5 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#d9b56d] px-5 py-3 text-center text-sm font-black text-[#241a12] transition hover:bg-[#caa55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315344]"
        >
          <Download size={17} />
          Descargar planeación en PDF
        </button>

        {loading ? (
          <p className="mt-3 max-w-4xl leading-8 text-[#675c51]">
            Cargando la mejor información curricular disponible para este proyecto.
          </p>
        ) : (
          <div className="mt-4 max-w-5xl">
            <HorizonCard horizon={displayHorizon} />
          </div>
        )}
      </div>

      <Section index={1} title="Datos generales">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <DataRow label="Grado" value={`${record.grade}°`} />
          <DataRow label="Campo formativo" value={record.field} />
          <DataRow
            label="Proyecto Académico"
            value={record.academicProjectNumber ? `PA ${record.academicProjectNumber}` : 'Pendiente'}
          />
          <DataRow label="Título" value={record.academicProjectTitle || 'Pendiente'} />
          <DataRow
            label="Proyecto Parcial de Aula"
            value={[record.ppaNumber, record.ppaTitle].filter(Boolean).join(' — ') || 'Pendiente de validación'}
          />
          <DataRow label="Estrategia detonadora / producto final" value={strategySummary(record)} />
          <DataRow
            label="Horizonte u orientación"
            value={displayHorizon.text || horizonPendingCopy()}
          />
          <DataRow
            label="Video o recurso asociado"
            value={videoResourceSummary(record)}
            extra={
              strategyVideo?.videoUrl ? (
                <a
                  href={strategyVideo.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#315344] px-4 py-2 text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338]"
                >
                  <LinkIcon size={16} />
                  Abrir video
                </a>
              ) : (
                <p className="text-sm font-semibold leading-7 text-[#675c51]">Video en verificación</p>
              )
            }
          />
        </div>
      </Section>

      <Section index={2} title="Horizonte de expectativas">
        <div className="grid gap-3">
          <HorizonCard horizon={displayHorizon} />
        </div>
      </Section>

      <Section index={3} title="Ubicación en libros">
        <div className="grid gap-4 md:grid-cols-2">
          <BookGroup
            label="Nuestros proyectos"
            title={record.sourcePages.nuestrosProyectos?.tomo}
            pages={record.sourcePages.nuestrosProyectos?.pages}
            status={record.sourcePages.nuestrosProyectos?.status}
          />
          <BookGroup
            label="Libro del campo formativo"
            title={record.sourcePages.fieldTextbook?.book}
            pages={record.sourcePages.fieldTextbook?.pages}
            status={record.sourcePages.fieldTextbook?.status}
          />
          <BookGroup
            label="Múltiples lenguajes"
            title={record.sourcePages.multiplesLenguajes?.title}
            pages={record.sourcePages.multiplesLenguajes?.pages}
            status={record.sourcePages.multiplesLenguajes?.status}
          />
          <div className="min-w-0 max-w-full rounded-2xl bg-[#f5efe4] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Apoyos</p>
            {record.complementaryResources?.length ? (
              <div className="mt-3 grid gap-3">
                {record.complementaryResources.map((resource) => (
                  <div key={`${resource.label}-${resource.reference}`} className="min-w-0 max-w-full rounded-2xl bg-white p-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="min-w-0 break-words font-semibold text-[#241a12] [overflow-wrap:anywhere]">{resource.label}</p>
                      <SourceStatusBadge status={resource.status} />
                    </div>
                    {resource.reference ? <p className="mt-2 break-words text-sm leading-7 text-[#675c51] [overflow-wrap:anywhere]">{resource.reference}</p> : null}
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#315344] px-4 py-2 text-center text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338]"
                      >
                        <LinkIcon size={16} />
                        {resource.urlStatus === 'active' || resource.urlStatus === 'confirmed'
                          ? 'Ver en YouTube'
                          : 'Abrir vínculo'}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm leading-7 text-[#675c51]">{sectionPendingCopy()}</p>
            )}
          </div>
        </div>

        {record.sourcePages.contextual?.length ? (
          <div className="mt-4 rounded-[1.5rem] bg-[#fff8ee] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Fuentes contextuales o en cautela</p>
            <div className="mt-3 grid gap-3">
              {record.sourcePages.contextual.map((entry, index) => (
                <div key={`${entry.description}-${index}`} className="rounded-2xl bg-white p-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-semibold text-[#241a12]">{entry.description || 'Referencia contextual'}</p>
                    <SourceStatusBadge status={entry.status || 'pending'} />
                  </div>
                  {entry.pages?.length ? <p className="mt-2 text-sm leading-7 text-[#675c51]">{entry.pages.join(' · ')}</p> : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Section>

      <Section index={4} title="Video y recursos de la estrategia detonadora">
        <div className="mb-4 rounded-[1.5rem] border border-[#d9b56d]/35 bg-[#fff8ee] p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Estrategia detonadora / producto final</p>
          <p className="mt-2 break-words font-serif text-2xl leading-8 text-[#315344] [overflow-wrap:anywhere]">
            {strategySummary(record)}
          </p>
          <p className="mt-2 text-sm leading-7 text-[#675c51]">
            Este producto es la referencia principal para identificar el video específico del Proyecto Académico.
          </p>
        </div>
        {record.detonatingStrategy.title || record.detonatingStrategy.text ? (
          <div className="grid gap-4">
            <StrategyCard strategy={record.detonatingStrategy} />
            {record.relatedStrategies?.length ? (
              <div className="grid gap-4">
                {record.relatedStrategies.map((strategy) => (
                  <StrategyCard
                    key={`${strategy.scopeLabel}-${strategy.title}-${strategy.videoUrl || strategy.source || ''}`}
                    strategy={strategy}
                  />
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <p className="rounded-2xl bg-[#f5efe4] p-4 text-sm leading-7 text-[#675c51]">{sectionPendingCopy()}</p>
        )}
      </Section>

      <Section index={5} title="Conceptos académicos">
        {visibleConcepts.length ? (
          <div className="grid gap-4">
            {visibleConcepts.map((concept) => (
              <article key={`${concept.concept}-${concept.sourceBook}`} className="min-w-0 max-w-full rounded-[1.5rem] bg-[#f5efe4] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h4 className="break-words font-serif text-2xl text-[#315344] [overflow-wrap:anywhere]">{concept.concept}</h4>
                    <p className="mt-2 break-words leading-7 text-[#241a12] [overflow-wrap:anywhere]">
                      {concept.description || 'Descripción pendiente de validación.'}
                    </p>
                  </div>
                  <ConceptStatusBadge status={concept.status} />
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-sm leading-7 text-[#675c51]">
                  {concept.sourceBook ? <span>{concept.sourceBook}</span> : null}
                  {concept.pages?.length ? <span>{concept.pages.join(' · ')}</span> : null}
                </div>
              </article>
            ))}
            <ConceptMindMap record={record} concepts={visibleConcepts} />
          </div>
        ) : (
          <p className="rounded-2xl bg-[#f5efe4] p-4 text-sm leading-7 text-[#675c51]">{sectionPendingCopy()}</p>
        )}
      </Section>

      <div id="caracoles-autoevaluacion" className="scroll-mt-32">
        <Section index={6} title="Autoevaluación formativa">
          <Autoevaluation record={record} />
        </Section>
      </div>

      <div className="min-w-0 max-w-full overflow-hidden rounded-[1.75rem] border border-[#315344]/12 bg-white/88 p-5 shadow-[0_18px_60px_rgba(36,26,18,0.06)]">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Materiales oficiales de apoyo</p>
        <p className="mt-3 max-w-4xl leading-8 text-[#241a12]">
          En la Nueva Escuela Mexicana Digital puedes encontrar más recursos oficiales del Gobierno de México para
          acompañar este y otros proyectos académicos.
        </p>
        <a
          href="https://nemd.aprende.gob.mx/"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#315344] px-5 py-3 text-center text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338]"
        >
          <LinkIcon size={16} />
          Abrir sitio oficial de la NEMD
        </a>
        <a
          href="https://telesecundaria.sep.gob.mx/#/home"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#315344]/30 bg-white px-5 py-3 text-center text-sm font-bold text-[#315344] transition hover:bg-[#315344]/10"
        >
          <LinkIcon size={16} />
          Portal oficial de Telesecundaria SEP
        </a>
      </div>

      <div className="min-w-0 max-w-full overflow-hidden rounded-[1.5rem] border border-[#d9b56d]/35 bg-[#fff8ee] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Aviso</p>
        <p className="mt-3 max-w-4xl leading-8 text-[#241a12]">
          Esta aplicación fue elaborada para el entorno de Ecos de Emancipación, propuesta de la maestra Kandy
          Partemia González Torreblanca, y sigue en proceso de construcción.
        </p>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-[#675c51]">
          Si quieres conocer más sobre el proyecto, sus recursos y su contexto pedagógico, puedes volver a la página
          principal del sitio.
        </p>
        <a
          href="/"
          className="mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#315344]/20 bg-white px-5 py-3 text-center text-sm font-bold text-[#315344] transition hover:border-[#315344]/45"
        >
          <BookOpen size={16} />
          Volver al sitio principal
        </a>
      </div>

      <div className="min-w-0 max-w-full overflow-hidden rounded-[1.5rem] border border-[#d9b56d]/35 bg-[#fff8ee] p-5">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8f4d32]">Planeación descargable</p>
        <p className="mt-3 max-w-4xl leading-8 text-[#241a12]">
          Genera una versión imprimible de este Proyecto Académico con formato de planeación: ficha curricular,
          horizonte, estrategia detonadora, fuentes, conceptos y autoevaluación.
        </p>
        <button
          type="button"
          onClick={() => openPlanningPdf(record, displayHorizon)}
          className="mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#d9b56d] px-5 py-3 text-center text-sm font-black text-[#241a12] transition hover:bg-[#caa55e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315344]"
        >
          <Download size={17} />
          Descargar planeación en PDF
        </button>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[#675c51]">
          Se abrirá una vista lista para imprimir; en el cuadro del navegador elige Guardar como PDF.
        </p>
      </div>

      <div className="min-w-0 max-w-full overflow-hidden rounded-[1.5rem] border border-[#315344]/15 bg-white/88 p-5">
        <p className="font-serif text-2xl text-[#315344]">¿Encontraste un dato incorrecto?</p>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#675c51]">
          Ayúdanos a mantener esta ficha clara y confiable. El mensaje incluirá el proyecto, grado y tomo que estás consultando.
        </p>
        <a
          href={reportUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex max-w-full flex-wrap items-center justify-center gap-2 rounded-full bg-[#315344] px-5 py-3 text-center text-sm font-bold text-[#f8f1e6] transition hover:bg-[#274338] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8f4d32]"
        >
          <MessageCircle size={17} />
          Reportar dato por WhatsApp
        </a>
      </div>
    </section>
  );
}

export default ProjectDashboard;




