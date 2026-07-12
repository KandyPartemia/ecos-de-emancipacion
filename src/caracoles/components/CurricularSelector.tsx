import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { GradeId } from '../types';

type SelectorOption = {
  value: string;
  label: string;
  readinessLevel?: string;
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
  onGradeChange: (value: GradeId) => void;
  onFieldChange: (value: string) => void;
  onProjectChange: (value: string) => void;
}) {
  const selectedProjectLabel =
    projectOptions.find((option) => option.value === selectedProjectId)?.label ||
    (projectOptions.length ? projectOptions[0].label : '');

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
        </div>
      </div>
    </section>
  );
}

export default CurricularSelector;
