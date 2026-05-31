import { useState } from "react";
import BrutalButton from "../components/BrutalButton";
import CustomFieldModal from "../components/CustomFieldModal";
import FormSection from "../components/FormSection";
import { SECTIONS, SECTION_FIELDS, SECTION_ORDER } from "../data/fields";
import { TEMPLATES } from "../data/templates";
import type { CustomFieldEntry, HandoverData, SectionKey } from "../types/handover";

interface HandoverFormScreenProps {
  handover: HandoverData;
  onFieldChange: (section: SectionKey, key: string, value: string) => void;
  onCustomChange: (id: string, value: string) => void;
  onAddCustomField: (field: CustomFieldEntry) => void;
  onCustomRemove: (id: string) => void;
  onClear: () => void;
  onGenerate: () => void;
}

/**
 * Tela principal do formulário. Janelas retro por seção, campos fixos +
 * personalizados, "+ campo" por seção e barra de ação fixa (Limpar / Gerar).
 * Réplica fiel de preencher_plant_o do Stitch (sem animações ociosas).
 */
export default function HandoverFormScreen({
  handover,
  onFieldChange,
  onCustomChange,
  onAddCustomField,
  onCustomRemove,
  onClear,
  onGenerate,
}: HandoverFormScreenProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSection, setModalSection] = useState<SectionKey>("identification");

  const template = TEMPLATES[handover.templateType];

  function openAddField(section: SectionKey) {
    setModalSection(section);
    setModalOpen(true);
  }

  function handleClear() {
    if (window.confirm("Limpar todos os campos deste plantão?")) {
      onClear();
    }
  }

  return (
    <>
      <div className="p-container-padding max-w-2xl mx-auto pb-32">
        {/* Etiqueta do modelo atual */}
        <div className="mb-4 flex items-center gap-2 font-pixel-data text-pixel-data text-on-surface-variant">
          <span className="bg-surface border-2 border-on-surface rounded px-2 py-0.5 uppercase tracking-widest text-xs">
            {template.code}
          </span>
          <span className="font-bold">{template.title}</span>
        </div>

        {SECTION_ORDER.map((sectionKey) => (
          <FormSection
            key={sectionKey}
            meta={SECTIONS[sectionKey]}
            fields={SECTION_FIELDS[sectionKey]}
            values={handover[sectionKey] as unknown as Record<string, string>}
            onFieldChange={(key, value) => onFieldChange(sectionKey, key, value)}
            customFields={handover.customFields.filter((f) => f.section === sectionKey)}
            onCustomChange={onCustomChange}
            onCustomRemove={onCustomRemove}
            onAddField={() => openAddField(sectionKey)}
          />
        ))}
      </div>

      {/* Barra de ação fixa */}
      <div className="fixed bottom-0 left-0 w-full bg-surface border-t-3 border-on-surface p-4 flex gap-4 z-40">
        <BrutalButton
          onClick={handleClear}
          colorClass="bg-surface-container-lowest text-on-surface"
          className="flex-1"
        >
          Limpar
        </BrutalButton>
        <BrutalButton
          onClick={onGenerate}
          colorClass="bg-brand-orange text-brand-dark"
          icon="send"
          className="flex-[2]"
        >
          Gerar Mensagem
        </BrutalButton>
      </div>

      <CustomFieldModal
        open={modalOpen}
        defaultSection={modalSection}
        onClose={() => setModalOpen(false)}
        onAdd={onAddCustomField}
      />
    </>
  );
}
