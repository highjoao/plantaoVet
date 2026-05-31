import { useId } from "react";
import type { SectionMeta } from "../data/fields";
import type { CustomFieldEntry, FieldDef } from "../types/handover";
import BrutalInput from "./BrutalInput";
import BrutalSelect from "./BrutalSelect";
import BrutalTextarea from "./BrutalTextarea";
import Icon from "./Icon";
import RetroWindow from "./RetroWindow";

interface FormSectionProps {
  meta: SectionMeta;
  fields: FieldDef<Record<string, string>>[];
  values: Record<string, string>;
  onFieldChange: (key: string, value: string) => void;
  customFields: CustomFieldEntry[];
  onCustomChange: (id: string, value: string) => void;
  onCustomRemove: (id: string) => void;
  onAddField: () => void;
}

/** Renderiza um controle fixo conforme o tipo do campo. */
function FixedControl({
  def,
  value,
  onChange,
}: {
  def: FieldDef<Record<string, string>>;
  value: string;
  onChange: (v: string) => void;
}) {
  if (def.type === "textarea") {
    return (
      <BrutalTextarea
        label={def.label}
        placeholder={def.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (def.type === "select") {
    return (
      <BrutalSelect
        label={def.label}
        options={def.options ?? []}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <BrutalInput
      label={def.label}
      type={def.type === "number" ? "number" : "text"}
      placeholder={def.placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

/** Campo personalizado: label com botão remover + controle conforme o tipo. */
function CustomControl({
  field,
  onChange,
  onRemove,
}: {
  field: CustomFieldEntry;
  onChange: (v: string) => void;
  onRemove: () => void;
}) {
  const id = useId();
  const labelRow = (
    <div className="flex items-center justify-between mb-1">
      <label htmlFor={id} className="font-label-caps text-label-caps text-on-surface-variant uppercase">
        {field.label}
      </label>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remover campo ${field.label}`}
        className="flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors"
      >
        <Icon name="delete" className="text-base" />
      </button>
    </div>
  );

  let control;
  if (field.type === "textarea") {
    control = (
      <textarea
        id={id}
        className="input-brutal min-h-[80px]"
        value={field.value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  } else if (field.type === "select") {
    control = (
      <select id={id} className="input-brutal" value={field.value} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? "—" : opt}
          </option>
        ))}
      </select>
    );
  } else {
    control = (
      <input
        id={id}
        type={field.type === "number" ? "number" : "text"}
        className="input-brutal"
        value={field.value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return (
    <div>
      {labelRow}
      {control}
    </div>
  );
}

/** Agrupa campos: "half" consecutivos viram pares 2-col; demais ocupam a linha. */
function renderFixedFields(
  fields: FieldDef<Record<string, string>>[],
  values: Record<string, string>,
  onFieldChange: (key: string, value: string) => void,
) {
  const rows: React.ReactNode[] = [];
  let i = 0;
  while (i < fields.length) {
    const field = fields[i];
    const next = fields[i + 1];
    if (field.half && next?.half) {
      rows.push(
        <div key={field.key} className="grid grid-cols-2 gap-2">
          <FixedControl def={field} value={values[field.key] ?? ""} onChange={(v) => onFieldChange(field.key, v)} />
          <FixedControl def={next} value={values[next.key] ?? ""} onChange={(v) => onFieldChange(next.key, v)} />
        </div>,
      );
      i += 2;
    } else {
      rows.push(
        <FixedControl
          key={field.key}
          def={field}
          value={values[field.key] ?? ""}
          onChange={(v) => onFieldChange(field.key, v)}
        />,
      );
      i += 1;
    }
  }
  return rows;
}

/** Janela retro de uma seção do formulário. */
export default function FormSection({
  meta,
  fields,
  values,
  onFieldChange,
  customFields,
  onCustomChange,
  onCustomRemove,
  onAddField,
}: FormSectionProps) {
  const addButton = (
    <button
      type="button"
      onClick={onAddField}
      className="flex items-center gap-1 bg-surface/70 border-2 border-on-surface rounded px-2 py-1 font-label-caps text-label-caps uppercase hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all"
    >
      <Icon name="add" className="text-base" />
      campo
    </button>
  );

  return (
    <RetroWindow title={meta.title} icon={meta.icon} headerBg={meta.headerBg} headerAction={addButton}>
      <div className="flex flex-col gap-4">
        {renderFixedFields(fields, values, onFieldChange)}
        {customFields.map((field) => (
          <CustomControl
            key={field.id}
            field={field}
            onChange={(v) => onCustomChange(field.id, v)}
            onRemove={() => onCustomRemove(field.id)}
          />
        ))}
      </div>
    </RetroWindow>
  );
}
