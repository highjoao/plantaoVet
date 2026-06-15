import { useEffect, useId, useState } from "react";
import { SECTIONS, SECTION_ORDER } from "../data/fields";
import type { CustomFieldEntry, FieldType, SectionKey } from "../types/handover";
import BrutalButton from "./BrutalButton";
import Icon from "./Icon";

interface CustomFieldModalProps {
  open: boolean;
  /** Seção pré-selecionada (quando aberto a partir de "+ adicionar campo"). */
  defaultSection?: SectionKey;
  onClose: () => void;
  onAdd: (field: CustomFieldEntry) => void;
  /** Seções disponíveis no seletor (padrão: SECTION_ORDER genérico). */
  sectionOrder?: SectionKey[];
}

const TYPE_OPTIONS: { value: FieldType; label: string }[] = [
  { value: "text", label: "Texto curto" },
  { value: "textarea", label: "Texto longo" },
  { value: "number", label: "Número" },
  { value: "select", label: "Seleção simples" },
];

function makeId(): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return `custom:${crypto.randomUUID()}`;
    }
  } catch {
    /* fallback abaixo */
  }
  return `custom:${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Modal para criar um campo personalizado: nome, tipo, seção e (para
 * seleção) opções separadas por vírgula. Janela retro brutalista.
 */
export default function CustomFieldModal({
  open,
  defaultSection = "identification",
  onClose,
  onAdd,
  sectionOrder,
}: CustomFieldModalProps) {
  const effectiveSectionOrder = sectionOrder ?? SECTION_ORDER;
  const titleId = useId();
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>("text");
  const [section, setSection] = useState<SectionKey>(defaultSection);
  const [optionsRaw, setOptionsRaw] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Reseta o formulário e a seção ao (re)abrir.
  useEffect(() => {
    if (open) {
      setLabel("");
      setType("text");
      setSection(defaultSection);
      setOptionsRaw("");
      setError(null);
    }
  }, [open, defaultSection]);

  // Fecha com ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const labelInputId = `${titleId}-label`;
  const typeInputId = `${titleId}-type`;
  const sectionInputId = `${titleId}-section`;
  const optionsInputId = `${titleId}-options`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = label.trim();
    if (!trimmed) {
      setError("Dê um nome ao campo.");
      return;
    }
    let options: string[] = [];
    if (type === "select") {
      options = optionsRaw
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
      if (options.length === 0) {
        setError("Informe ao menos uma opção (separadas por vírgula).");
        return;
      }
      // Inclui opção vazia para permitir "não preenchido".
      options = ["", ...options];
    }
    onAdd({
      id: makeId(),
      label: trimmed,
      type,
      section,
      options,
      value: "",
    });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-container-padding"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/40 cursor-default"
      />

      {/* Janela */}
      <div className="relative w-full max-w-sm bg-brand-offwhite border-3 border-on-surface rounded-lg shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] overflow-hidden animate-pop-in">
        <div className="bg-secondary-container border-b-3 border-on-surface px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="add_box" />
            <h2 id={titleId} className="font-headline-sm text-headline-sm m-0">
              Adicionar campo
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-7 h-7 flex items-center justify-center bg-error-container border-2 border-on-surface rounded hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Icon name="close" className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <div>
            <label
              htmlFor={labelInputId}
              className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
            >
              Nome do campo
            </label>
            <input
              id={labelInputId}
              className="input-brutal"
              placeholder="Ex: Escala de Glasgow"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor={typeInputId}
                className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
              >
                Tipo
              </label>
              <select
                id={typeInputId}
                className="input-brutal"
                value={type}
                onChange={(e) => setType(e.target.value as FieldType)}
              >
                {TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={sectionInputId}
                className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
              >
                Seção
              </label>
              <select
                id={sectionInputId}
                className="input-brutal"
                value={section}
                onChange={(e) => setSection(e.target.value as SectionKey)}
              >
                {effectiveSectionOrder.map((key) => (
                  <option key={key} value={key}>
                    {SECTIONS[key].title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {type === "select" && (
            <div>
              <label
                htmlFor={optionsInputId}
                className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
              >
                Opções (separadas por vírgula)
              </label>
              <input
                id={optionsInputId}
                className="input-brutal"
                placeholder="Ex: Leve, Moderado, Grave"
                value={optionsRaw}
                onChange={(e) => setOptionsRaw(e.target.value)}
              />
            </div>
          )}

          {error && (
            <p className="font-body-md text-sm text-error font-bold flex items-center gap-1">
              <Icon name="error" className="text-base" />
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <BrutalButton
              type="button"
              onClick={onClose}
              colorClass="bg-surface-container-lowest text-on-surface"
              fullWidth
              className="!text-body-lg"
            >
              Cancelar
            </BrutalButton>
            <BrutalButton
              type="submit"
              colorClass="bg-primary text-on-primary"
              icon="check"
              fullWidth
              className="!text-body-lg"
            >
              Adicionar
            </BrutalButton>
          </div>
        </form>
      </div>
    </div>
  );
}
