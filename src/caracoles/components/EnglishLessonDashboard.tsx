import {
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Languages,
  MessageCircle,
  PenLine,
  Puzzle,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useMemo, useState, type ReactNode } from 'react';
import { ENGLISH_MEMORY_GAME_URL, type EnglishLesson } from '../lib/englishLessons';

function LessonSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-32 rounded-[1.75rem] border border-[#315344]/12 bg-white/90 p-5 shadow-[0_18px_60px_rgba(36,26,18,0.06)] md:p-6"
    >
      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8f4d32]">{eyebrow}</p>
      <h3 className="mt-2 font-serif text-3xl leading-tight text-[#315344]">{title}</h3>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function PillList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-[#315344]/15 bg-[#f5efe4] px-3 py-2 text-sm font-bold text-[#315344]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

function EvaluationBlock({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl bg-[#f5efe4] p-4">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#315344]">
          {icon}
        </span>
        <h4 className="font-serif text-2xl text-[#315344]">{title}</h4>
      </div>
      <ul className="mt-4 grid gap-3 text-sm leading-7 text-[#241a12]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#315344]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function playFeedbackTone(kind: 'success' | 'error') {
  if (typeof window === 'undefined') return;
  const AudioCtor =
    window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtor) return;

  const context = new AudioCtor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = kind === 'success' ? 'sine' : 'sawtooth';
  oscillator.frequency.value = kind === 'success' ? 880 : 180;
  gain.gain.value = 0.05;
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  window.setTimeout(() => {
    oscillator.stop();
    context.close().catch(() => undefined);
  }, kind === 'success' ? 180 : 260);
}

function EnglishMindMap({ lesson }: { lesson: EnglishLesson }) {
  const branchTones = ['#e7f0e5', '#fff8ee', '#f5efe4', '#f8ece6', '#edf3f6', '#f2efe8'];

  return (
    <LessonSection id="caracoles-mapa-mental" eyebrow="Organizador visual / Mind map" title="Mapa mental integrado de la leccion">
      <div className="grid gap-4 lg:grid-cols-[minmax(240px,0.75fr)_minmax(0,1.25fr)]">
        <div className="rounded-[1.5rem] border border-[#315344]/16 bg-[#315344] p-5 text-[#f8f1e6]">
          <div className="flex items-center gap-3">
            <Brain className="h-6 w-6" aria-hidden="true" />
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#d9b56d]">Nucleo</p>
          </div>
          <h4 className="mt-3 font-serif text-3xl leading-tight">{lesson.mindMap.center}</h4>
          <p className="mt-3 text-sm leading-7 text-[#f5efe4]">{lesson.pagesLabel}</p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {lesson.mindMap.branches.map((branch, index) => (
            <article
              key={branch.title}
              className="rounded-[1.25rem] border border-[#315344]/12 p-4"
              style={{ backgroundColor: branchTones[index % branchTones.length] }}
            >
              <h5 className="font-serif text-xl leading-tight text-[#315344]">{branch.title}</h5>
              <ul className="mt-3 grid gap-2 text-sm leading-6 text-[#241a12]">
                {branch.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8f4d32]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-[1.25rem] border border-[#d9b56d]/35 bg-[#fff8ee] p-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8f4d32]">Idea fuerza</p>
        <p className="mt-2 leading-8 text-[#241a12]">{lesson.mindMap.ideaForce}</p>
      </div>
    </LessonSection>
  );
}

function EnglishInteractiveAssessment({ lesson }: { lesson: EnglishLesson }) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(0);
  const pairs = lesson.selfAssessment.matchingPairs;
  const options = useMemo(() => {
    if (!pairs.length) return [];
    const offset = shuffleSeed % pairs.length;
    return [...pairs.slice(offset), ...pairs.slice(0, offset)].map((pair) => pair.term);
  }, [pairs, shuffleSeed]);

  const availableOptions = (definition: string) => {
    const current = answers[definition] ?? '';
    const used = new Set(Object.entries(answers).filter(([key]) => key !== definition).map(([, value]) => value));
    return options.filter((option) => option === current || !used.has(option));
  };

  const wrongDefinitions = checked
    ? pairs.filter((pair) => answers[pair.definition] !== pair.term).map((pair) => pair.definition)
    : [];
  const allCorrect = checked && pairs.length > 0 && wrongDefinitions.length === 0;

  const checkAnswers = () => {
    setChecked(true);
    const hasError = pairs.some((pair) => answers[pair.definition] !== pair.term);
    playFeedbackTone(hasError ? 'error' : 'success');
  };

  const reset = () => {
    setAnswers({});
    setChecked(false);
    setShuffleSeed((value) => value + 1);
  };

  return (
    <div className="grid gap-5">
      <div className="rounded-2xl bg-[#f5efe4] p-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8f4d32]">Momento 1 / Resonance</p>
        <h4 className="mt-2 font-serif text-2xl text-[#315344]">Pregunta para resonar</h4>
        <p className="mt-3 leading-8 text-[#241a12]">{lesson.selfAssessment.resonanceQuestion}</p>
        <p className="mt-3 text-sm leading-7 text-[#675c51]">
          Retoma la situacion detonadora, el vocabulario, el algoritmo gramatical y el producto de la leccion antes de responder.
        </p>
      </div>

      <div className="rounded-2xl bg-[#fff8ee] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8f4d32]">Momento 2 / Matching</p>
            <h4 className="mt-2 font-serif text-2xl text-[#315344]">Relaciona vocabulario y significado</h4>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full border border-[#315344]/18 bg-white px-4 py-2 text-sm font-black text-[#315344] transition hover:bg-[#315344] hover:text-[#f8f1e6]"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Limpiar todo
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          {pairs.map((pair) => {
            const isWrong = checked && answers[pair.definition] !== pair.term;
            return (
              <label
                key={pair.definition}
                className={`grid gap-3 rounded-2xl border p-4 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.55fr)] ${
                  isWrong ? 'border-[#8f4d32]/35 bg-[#f8ece6]' : 'border-[#315344]/12 bg-white'
                }`}
              >
                <span className={isWrong ? 'font-bold text-[#8f4d32]' : 'text-[#241a12]'}>{pair.definition}</span>
                <select
                  value={answers[pair.definition] ?? ''}
                  onChange={(event) => {
                    setAnswers((current) => ({ ...current, [pair.definition]: event.target.value }));
                    setChecked(false);
                  }}
                  className="min-h-12 rounded-2xl border border-[#315344]/18 bg-white px-4 py-3 text-sm text-[#241a12] outline-none focus:border-[#315344]"
                >
                  <option value="">Selecciona concepto</option>
                  {availableOptions(pair.definition).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={checkAnswers}
            className="rounded-full bg-[#315344] px-5 py-3 text-sm font-black text-[#f8f1e6] transition hover:bg-[#241a12]"
          >
            Comprobar respuestas
          </button>
          {wrongDefinitions.length ? (
            <p className="text-sm font-bold text-[#8f4d32]">Revisa las filas marcadas en rojo y vuelve a intentarlo.</p>
          ) : null}
          {allCorrect ? <p className="text-sm font-bold text-[#315344]">Excelente. Todo esta correcto.</p> : null}
        </div>
      </div>

      <div className="rounded-2xl bg-[#e7f0e5] p-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-[#315344]">Momento 3 / Production</p>
        <h4 className="mt-2 font-serif text-2xl text-[#315344]">Reto oral o escrito</h4>
        <p className="mt-3 leading-8 text-[#241a12]">{lesson.selfAssessment.productionChallenge}</p>
        <p className="mt-3 text-sm leading-7 text-[#675c51]">
          Usa al menos tres palabras del vocabulario y una estructura del algoritmo gramatical.
        </p>
      </div>
    </div>
  );
}

function CanvaMemoramaEmbed() {
  return (
    <div className="rounded-[1.5rem] border border-[#315344]/12 bg-white p-4">
      <h4 className="font-serif text-2xl text-[#315344]">Memorama interactivo</h4>
      <div
        className="relative mt-4 h-0 w-full overflow-hidden rounded-lg shadow-[0_2px_8px_rgba(63,69,81,0.16)]"
        style={{ paddingTop: '56.2225%' }}
      >
        <iframe
          loading="lazy"
          title="Memory Quest: English Vocabulary Challenge (Memorama)"
          className="absolute left-0 top-0 h-full w-full border-0"
          src="https://www.canva.com/design/DAHLYRcPB74/LSrA8-pThbcCJjwEvf5nHQ/view?embed"
          allowFullScreen
          allow="fullscreen"
        />
      </div>
      <a
        href="https://www.canva.com/design/DAHLYRcPB74/LSrA8-pThbcCJjwEvf5nHQ/view?utm_content=DAHLYRcPB74&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#315344] px-4 py-2 text-sm font-black text-[#f8f1e6] transition hover:bg-[#241a12]"
      >
        Abrir Memory Quest: English Vocabulary Challenge
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

function EnglishLessonDashboard({ lesson }: { lesson: EnglishLesson }) {
  return (
    <article id="caracoles-project-dashboard" className="grid gap-6">
      <section className="rounded-[2rem] border border-[#315344]/12 bg-white/90 p-5 shadow-[0_22px_70px_rgba(36,26,18,0.08)] md:p-7">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-[#315344] px-4 py-2 text-sm font-black uppercase tracking-[0.12em] text-[#f8f1e6]">
            Lección {lesson.lessonNumber}
          </span>
          <span className="rounded-full border border-[#d9b56d]/35 bg-[#fff8ee] px-4 py-2 text-sm font-black text-[#8f4d32]">
            {lesson.gradeLabel}
          </span>
          <span className="rounded-full border border-[#315344]/15 bg-[#e7f0e5] px-4 py-2 text-sm font-black text-[#315344]">
            Inglés / English
          </span>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#8f4d32]">Ficha bilingüe de aprendizaje</p>
            <h2 className="mt-2 font-serif text-4xl leading-tight text-[#315344] md:text-5xl">{lesson.title}</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-[#675c51]">
              Esta lección se trabaja como proyecto de Inglés: lectura, vocabulario, gramática funcional, producción oral
              y escrita, con apoyo permanente del memorama.
            </p>
          </div>

          <aside className="rounded-[1.5rem] bg-[#f5efe4] p-5">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8f4d32]">Ubicación en libro</p>
            <p className="mt-2 font-serif text-2xl text-[#315344]">{lesson.bookTitle}</p>
            <p className="mt-2 leading-7 text-[#241a12]">{lesson.pagesLabel}</p>
            <p className="mt-3 text-sm leading-6 text-[#675c51]">
              Estado: {lesson.sourceStatus === 'confirmed' ? 'fuente localizada' : 'requiere revisión docente fina'}
              {lesson.sourceConfidence ? ` · confianza ${lesson.sourceConfidence}` : ''}
            </p>
          </aside>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-[#315344] px-5 py-3 text-sm font-black text-[#f8f1e6] transition hover:bg-[#241a12] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
            href={ENGLISH_MEMORY_GAME_URL}
            target="_blank"
            rel="noreferrer"
          >
            <Puzzle className="h-4 w-4" aria-hidden="true" />
            Abrir memorama
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-[#315344]/20 bg-white px-5 py-3 text-sm font-black text-[#315344] transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35"
            href="#caracoles-autoevaluacion"
          >
            <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
            Ir a evaluación
          </a>
        </div>
      </section>

      <LessonSection id="english-detonadora" eyebrow="Momento inicial / Starting point" title="Situación detonadora didáctica">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-[#f5efe4] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#8f4d32]">Español</p>
            <p className="mt-2 leading-8 text-[#241a12]">{lesson.detonatingSituationEs}</p>
          </div>
          <div className="rounded-2xl bg-[#e7f0e5] p-4">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#315344]">English</p>
            <p className="mt-2 leading-8 text-[#241a12]">{lesson.detonatingSituationEn}</p>
          </div>
        </div>
      </LessonSection>

      <LessonSection id="english-content" eyebrow="Contenido académico / Academic content" title="Vocabulario, lectura y producto">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.8fr)]">
          <div className="grid gap-4">
            <div className="rounded-2xl bg-[#f5efe4] p-4">
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-[#315344]" aria-hidden="true" />
                <h4 className="font-serif text-2xl text-[#315344]">Conceptos y contenidos</h4>
              </div>
              <ul className="mt-4 grid gap-2 text-sm leading-7 text-[#241a12]">
                {lesson.academicContent.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-[#fff8ee] p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-[#8f4d32]" aria-hidden="true" />
                <h4 className="font-serif text-2xl text-[#315344]">Producto de la lección</h4>
              </div>
              <p className="mt-3 leading-8 text-[#241a12]">{lesson.expectedProduct}</p>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#315344]/12 bg-white p-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-[#d9b56d]" aria-hidden="true" />
              <h4 className="font-serif text-2xl text-[#315344]">Vocabulary</h4>
            </div>
            <div className="mt-4">
              <PillList items={lesson.vocabulary} />
            </div>
          </aside>
        </div>
      </LessonSection>

      <EnglishMindMap lesson={lesson} />

      <LessonSection id="english-grammar" eyebrow="Grammar path" title="Algoritmo gramatical">
        <div className="rounded-2xl bg-[#f5efe4] p-5">
          <div className="flex items-center gap-3">
            <PenLine className="h-5 w-5 text-[#315344]" aria-hidden="true" />
            <h4 className="font-serif text-2xl text-[#315344]">{lesson.grammarFocus.title}</h4>
          </div>
          <p className="mt-3 leading-8 text-[#241a12]">{lesson.grammarFocus.explanationEs}</p>
          <ol className="mt-4 grid gap-3 text-sm leading-7 text-[#241a12] md:grid-cols-2">
            {lesson.grammarFocus.sequence.map((step, index) => (
              <li key={step} className="rounded-xl bg-white p-3">
                <strong className="text-[#8f4d32]">{index + 1}.</strong> {step}
              </li>
            ))}
          </ol>
          <p className="mt-4 rounded-xl bg-white p-3 text-sm font-bold leading-7 text-[#315344]">
            Modelo / Model: {lesson.grammarFocus.model}
          </p>
        </div>
      </LessonSection>

      <LessonSection id="caracoles-autoevaluacion" eyebrow="Evaluacion especial de Ingles" title="Autoevaluacion interactiva">
        <div className="grid gap-5">
          <EnglishInteractiveAssessment lesson={lesson} />
          <div className="grid gap-4 md:grid-cols-2">
            <EvaluationBlock icon={<Puzzle className="h-5 w-5" aria-hidden="true" />} title="Vocabulary" items={lesson.evaluation.vocabulary} />
            <EvaluationBlock icon={<BookOpen className="h-5 w-5" aria-hidden="true" />} title="Reading comprehension" items={lesson.evaluation.reading} />
            <EvaluationBlock icon={<PenLine className="h-5 w-5" aria-hidden="true" />} title="Grammar" items={lesson.evaluation.grammar} />
            <EvaluationBlock icon={<MessageCircle className="h-5 w-5" aria-hidden="true" />} title="Oral and written production" items={lesson.evaluation.production.concat(lesson.evaluation.oralWritten)} />
          </div>
          <CanvaMemoramaEmbed />
          <div className="rounded-[1.5rem] border border-[#315344]/12 bg-[#f5efe4] p-5">
            <h4 className="font-serif text-2xl text-[#315344]">Mas recursos oficiales</h4>
            <p className="mt-2 leading-8 text-[#675c51]">
              En la Nueva Escuela Mexicana Digital puedes encontrar mas recursos oficiales del Gobierno de Mexico para apoyar el trabajo escolar.
            </p>
            <a
              href="https://nemd.aprende.gob.mx/"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#315344] px-4 py-2 text-sm font-black text-[#f8f1e6] transition hover:bg-[#241a12]"
            >
              Abrir sitio oficial de la NEMD
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
          <div className="rounded-[1.5rem] border border-[#d9b56d]/35 bg-[#fff8ee] p-5 text-sm leading-7 text-[#675c51]">
            Esta aplicacion fue desarrollada para el entorno de Ecos de Emancipacion, propuesta pedagogica de la maestra
            Kandy Partemia Gonzalez Torreblanca. La herramienta sigue en proceso de construccion y mejora continua.
            <a className="ml-1 font-black text-[#315344] underline" href="/">
              Volver a la pagina principal del sitio.
            </a>
          </div>
        </div>
      </LessonSection>
    </article>
  );
}

export default EnglishLessonDashboard;
