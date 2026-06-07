import type { GradeId } from '../types';

type SelectorOption = {
  value: string;
  label: string;
};

function SelectField({
  label,
  value,
  options,
  onChange,
  disabled,
  note,
}: {
  label: string;
  value: string;
  options: SelectorOption[];
  onChange: (value: string) => void;
  disabled?: boolean;
  note?: string;
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
      {note ? <span className="text-sm leading-6 text-[#675c51]">{note}</span> : null}
    </label>
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
          <SelectField
            label="3. Proyecto académico"
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
        </div>
      </div>
    </section>
  );
}

export default CurricularSelector;
