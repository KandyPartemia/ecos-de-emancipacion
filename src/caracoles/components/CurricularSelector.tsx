import { ChevronDown, Link, RotateCcw } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { GradeId } from '../types';

type SelectorOption = {
  value: string;
  label: string;
  readinessLevel?: string;
};

type CurricularHealthSummary = {
  totalProjects: number;
  confirmedHorizons: number;
  videosInReview: number;
  note: string;
};

function readinessDotClass(readinessLevel?: string) {
  if (readinessLevel === 'ready') return 'bg-[#315344]';
  if (readinessLevel === 'partial') return 'bg-[#d9b56d]';
  if (readinessLevel === 'needs-review') return 'bg-[#8f4d32]';
  return '';
}

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{label}</span>
      <select
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full min-w-0 rounded-2xl border border-[#315344]/18 bg-white px-4 py-3 text-sm leading-6 text-[#241a12] outline-none transition focus:border-[#315344] md:text-base disabled:cursor-not-allowed disabled:bg-[#f5efe4]"
      >
        {options.map((option) => (
          <option key={option.value || 'empty'} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextFilterField({
  label,
  value,
  placeholder,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="grid min-w-0 gap-2">
      <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{label}</span>
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full min-w-0 rounded-2xl border border-[#315344]/18 bg-white px-4 py-3 text-sm leading-6 text-[#241a12] outline-none transition placeholder:text-[#675c51]/60 focus:border-[#315344] md:text-base disabled:cursor-not-allowed disabled:bg-[#f5efe4]"
      />
    </label>
  );
}

function ProjectSelectField({
  value,
  options,
  onChange,
  disabled,
  note,
}: {
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  note?: string;
}) {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedOption = options.find((option) => option.value === value) || options[0];
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );
  const selectedDotClass = readinessDotClass(selectedOption?.readinessLevel);
  const activeOptionId = open ? `${listboxId}-option-${highlightedIndex}` : undefined;

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener('pointerdown', closeOnOutsideClick);
    return () => document.removeEventListener('pointerdown', closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (open) setHighlightedIndex(selectedIndex);
  }, [open, selectedIndex]);

  useEffect(() => {
    if (open) optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [open, highlightedIndex]);

  function selectOption(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
  }

  function moveHighlight(delta: number) {
    setOpen(true);
    setHighlightedIndex((current) => {
      const baseIndex = open ? current : selectedIndex;
      return Math.max(0, Math.min(options.length - 1, baseIndex + delta));
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (disabled || !options.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveHighlight(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveHighlight(-1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex(options.length - 1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (open) selectOption(highlightedIndex);
      else setOpen(true);
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative grid min-w-0 gap-2">
      <span className="text-sm font-bold uppercase tracking-[0.14em] text-[#8f4d32]">3. Proyecto académico</span>
      <button
        type="button"
        disabled={disabled}
        aria-label="Seleccionar Proyecto Académico"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-activedescendant={activeOptionId}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        className="flex min-h-14 w-full min-w-0 items-center gap-3 rounded-2xl border border-[#315344]/18 bg-white px-4 py-3 text-left text-sm leading-6 text-[#241a12] outline-none transition focus-visible:border-[#315344] focus-visible:ring-2 focus-visible:ring-[#315344]/20 md:text-base disabled:cursor-not-allowed disabled:bg-[#f5efe4]"
      >
        {selectedDotClass ? <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${selectedDotClass}`} /> : null}
        <span className="min-w-0 flex-1 break-words">{selectedOption?.label || 'Sin proyectos disponibles'}</span>
        <ChevronDown size={18} className={`shrink-0 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && !disabled ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Proyectos Académicos"
          className="absolute inset-x-0 top-[5.5rem] z-30 max-h-80 overflow-y-auto rounded-2xl border border-[#315344]/18 bg-white p-2 shadow-[0_18px_50px_rgba(36,26,18,0.18)]"
        >
          {options.map((option, index) => {
            const dotClass = readinessDotClass(option.readinessLevel);
            const isHighlighted = index === highlightedIndex;
            return (
              <button
                key={option.value || 'empty'}
                id={`${listboxId}-option-${index}`}
                ref={(node) => {
                  optionRefs.current[index] = node;
                }}
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => selectOption(index)}
                onFocus={() => setHighlightedIndex(index)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-sm leading-6 text-[#241a12] transition focus-visible:outline-none ${
                  isHighlighted ? 'bg-[#f5efe4]' : 'hover:bg-[#f5efe4] focus-visible:bg-[#f5efe4]'
                }`}
              >
                {dotClass ? <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${dotClass}`} /> : null}
                <span className="break-words">{option.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}

      {note ? <span className="text-sm leading-6 text-[#675c51]">{note}</span> : null}
    </div>
  );
}

function ReadinessLegend() {
  const items = [
    { label: 'Listo', className: readinessDotClass('ready') },
    { label: 'Parcial', className: readinessDotClass('partial') },
    { label: 'En revisión', className: readinessDotClass('needs-review') },
  ];

  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.12em] text-[#675c51]">
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${item.className}`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}

function CurricularHealthStrip({ summary }: { summary: CurricularHealthSummary }) {
  const items = [
    { label: 'Proyectos PA', value: summary.totalProjects },
    { label: 'Horizontes confirmados', value: summary.confirmedHorizons },
    { label: 'Videos en verificación', value: summary.videosInReview },
  ];

  return (
    <div className="mt-5 border-t border-[#315344]/12 pt-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="min-w-0">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[#8f4d32]">{item.label}</p>
            <p className="mt-1 font-serif text-2xl leading-none text-[#315344]">{item.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs leading-6 text-[#675c51]">{summary.note}</p>
    </div>
  );
}

function CurricularSelector({
  gradeOptions,
  fieldOptions,
  projectOptions,
  selectedGrade,
  selectedField,
  selectedProjectId,
  availableCount,
  projectDisabled,
  projectNote,
  footerMessage,
  healthSummary,
  searchQuery,
  volumeOptions,
  selectedVolume,
  ppaOptions,
  selectedPpa,
  totalProjectCount,
  hasActiveFilters,
  onSearchChange,
  onVolumeChange,
  onPpaChange,
  onClearFilters,
  onGradeChange,
  onFieldChange,
  onProjectChange,
}: {
  gradeOptions: Array<{ value: GradeId; label: string }>;
  fieldOptions: SelectorOption[];
  projectOptions: SelectorOption[];
  selectedGrade: GradeId | '';
  selectedField: string;
  selectedProjectId: string;
  availableCount: number;
  projectDisabled?: boolean;
  projectNote?: string;
  footerMessage?: string;
  healthSummary?: CurricularHealthSummary;
  searchQuery?: string;
  volumeOptions?: SelectorOption[];
  selectedVolume?: string;
  ppaOptions?: SelectorOption[];
  selectedPpa?: string;
  totalProjectCount?: number;
  hasActiveFilters?: boolean;
  onSearchChange?: (value: string) => void;
  onVolumeChange?: (value: string) => void;
  onPpaChange?: (value: string) => void;
  onClearFilters?: () => void;
  onGradeChange: (value: GradeId) => void;
  onFieldChange: (value: string) => void;
  onProjectChange: (value: string) => void;
}) {
  const selectedProjectLabel =
    projectOptions.find((option) => option.value === selectedProjectId)?.label ||
    (projectOptions.length ? projectOptions[0].label : '');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const showProjectFilters = Boolean(onSearchChange || onVolumeChange || onPpaChange);
  const filteredCountLabel =
    typeof totalProjectCount === 'number' && selectedField
      ? `Mostrando ${availableCount} de ${totalProjectCount} proyectos del campo seleccionado.`
      : '';

  useEffect(() => {
    setCopyStatus('idle');
  }, [selectedProjectId]);

  async function copyCurrentProjectLink() {
    if (typeof window === 'undefined' || !selectedProjectId) return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  }

  return (
    <section className="grid gap-5">
      <div className="rounded-[2rem] border border-[#315344]/12 bg-white/88 p-5 shadow-[0_22px_70px_rgba(36,26,18,0.08)] md:p-7">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8f4d32]">Consulta curricular</p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-[#315344] md:text-5xl">
            Caracoles Resonando como base de datos pedagógica
          </h1>
          <p className="mt-3 leading-8 text-[#675c51]">
            Elige grado, campo formativo y proyecto académico. Debajo aparecerá la ficha completa con horizonte,
            ubicación en libros, conceptos y autoevaluación formativa.
          </p>
        </div>

        {showProjectFilters ? (
          <div className="mt-6 grid gap-3">
            <div className="grid gap-4 md:grid-cols-3">
            <TextFilterField
              label="Buscar"
              value={searchQuery || ''}
              placeholder="Título, PA, producto o concepto"
              onChange={(value) => onSearchChange?.(value)}
              disabled={!selectedField}
            />
            <SelectField
              label="Tomo"
              value={selectedVolume || ''}
              options={volumeOptions || [{ value: '', label: 'Todos los tomos' }]}
              onChange={(value) => onVolumeChange?.(value)}
              disabled={!selectedField}
            />
            <SelectField
              label="PPA"
              value={selectedPpa || ''}
              options={ppaOptions || [{ value: '', label: 'Todos los PPA' }]}
              onChange={(value) => onPpaChange?.(value)}
              disabled={!selectedField}
            />
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-[#675c51]">
              {filteredCountLabel ? <span className="font-bold text-[#315344]">{filteredCountLabel}</span> : null}
              <button
                type="button"
                disabled={!hasActiveFilters}
                onClick={onClearFilters}
                className="inline-flex items-center gap-2 rounded-full border border-[#315344]/20 bg-white px-4 py-2 font-bold text-[#315344] transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <RotateCcw size={15} />
                Limpiar filtros
              </button>
              <button
                type="button"
                disabled={!selectedProjectId}
                onClick={copyCurrentProjectLink}
                className="inline-flex items-center gap-2 rounded-full bg-[#d9b56d] px-4 py-2 font-bold text-[#241a12] transition hover:bg-[#315344] hover:text-[#f8f1e6] focus:outline-none focus:ring-4 focus:ring-[#d9b56d]/35 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Link size={15} />
                Copiar enlace del PA
              </button>
              {copyStatus === 'copied' ? <span className="font-bold text-[#315344]">Enlace copiado.</span> : null}
              {copyStatus === 'error' ? <span className="font-bold text-[#8f4d32]">No se pudo copiar.</span> : null}
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,2.2fr)]">
          <SelectField
            label="1. Grado"
            value={selectedGrade}
            options={gradeOptions}
            onChange={(value) => onGradeChange(value as GradeId)}
          />
          <SelectField
            label="2. Campo formativo"
            value={selectedField}
            options={fieldOptions}
            onChange={onFieldChange}
            disabled={!selectedGrade}
          />
          <ProjectSelectField
            value={selectedProjectId}
            options={projectOptions}
            onChange={onProjectChange}
            disabled={projectDisabled || !selectedField || !projectOptions.length}
            note={
              projectNote
                ? projectNote
                : selectedProjectId && selectedProjectLabel
                  ? `Seleccionado: ${selectedProjectLabel}`
                  : 'Elige el proyecto para desplegar su ficha curricular.'
            }
          />
        </div>

        <div className="mt-5 rounded-[1.5rem] bg-[#f5efe4] p-4 text-sm leading-7 text-[#675c51]">
          {footerMessage ? (
            <p>{footerMessage}</p>
          ) : selectedField && projectOptions.length ? (
            <p>
              Hay <strong>{availableCount}</strong> proyectos académicos listos para consulta en este campo. La ficha
              mostrará información confirmada y marcará con claridad lo que aún requiere validación de fuentes.
            </p>
          ) : (
            <p>
              Esta interfaz funciona como una consulta guiada. Selecciona un grado y un campo para abrir la lista de
              proyectos disponibles.
            </p>
          )}
          {selectedField && projectOptions.length ? <ReadinessLegend /> : null}
          {healthSummary ? <CurricularHealthStrip summary={healthSummary} /> : null}
        </div>
      </div>
    </section>
  );
}

export default CurricularSelector;
