import { useState } from "react";
import BrutalButton from "../components/BrutalButton";
import CustomFieldModal from "../components/CustomFieldModal";
import FormSection from "../components/FormSection";
import {
  AVALIACAO_INTERNACAO_FIELDS,
  INTERNACAO_IDENTIFICATION_FIELDS,
  INTERNACAO_SECTION_ORDER,
  OBJETIVO_FIELDS,
  PLANO_INTERNACAO_FIELDS,
  SECTIONS,
  SECTION_FIELDS,
  SECTION_ORDER,
  SUBJETIVO_FIELDS,
} from "../data/fields";
import { TEMPLATES } from "../data/templates";
import type {
  AvaliacaoInternacaoData,
  CustomFieldEntry,
  FieldDef,
  HandoverData,
  ObjetivoData,
  PlanoInternacaoData,
  SectionKey,
  SubjetivoData,
} from "../types/handover";

interface HandoverFormScreenProps {
  handover: HandoverData;
  onFieldChange: (section: SectionKey, key: string, value: string) => void;
  onCustomChange: (id: string, value: string) => void;
  onAddCustomField: (field: CustomFieldEntry) => void;
  onCustomRemove: (id: string) => void;
  onClear: () => void;
  onGenerate: () => void;
}

// ── Defaults para seções opcionais (rascunhos antigos sem essas seções) ──

const EMPTY_SUBJETIVO: SubjetivoData = {
  behaviorConsciousness: "",
  feedingWaterIntake: "",
  urineFeces: "",
};

const EMPTY_OBJETIVO: ObjetivoData = {
  clinicalParameters: "",
  painAssessment: "",
  woundLesionAssessment: "",
  neurologicalExam: "",
  orthopedicExam: "",
  reticulocytes: "",
  bloodCount: "",
  biochemistry: "",
  venousBloodGas: "",
  imagingMorning: "",
  imagingAfternoon: "",
  imagingNight: "",
};

const EMPTY_AVALIACAO: AvaliacaoInternacaoData = {
  assessment: "",
  therapeuticConduct: "",
  fluidTherapy: "",
  continuousInfusion: "",
  medications: "",
  performedProcedures: "",
};

const EMPTY_PLANO: PlanoInternacaoData = {
  generalPlanClassification: "",
  nextStepsPatient: "",
  tutorAlignment: "",
  tutorBulletin: "",
};

// ── Barra de ação compartilhada ──────────────────────────────────────────

function ActionBar({ onClear, onGenerate }: { onClear: () => void; onGenerate: () => void }) {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface border-t-3 border-on-surface p-4 flex gap-4 z-40">
      <BrutalButton
        onClick={onClear}
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
  );
}

// ── View específica de Internação comum ──────────────────────────────────

function InternacaoFormView({
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
  const subjetivo = handover.subjetivo ?? EMPTY_SUBJETIVO;
  const objetivo = handover.objetivo ?? EMPTY_OBJETIVO;
  const avaliacaoInternacao = handover.avaliacaoInternacao ?? EMPTY_AVALIACAO;
  const planoInternacao = handover.planoInternacao ?? EMPTY_PLANO;

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
        <div className="mb-4 flex items-center gap-2 font-pixel-data text-pixel-data text-on-surface-variant">
          <span className="bg-surface border-2 border-on-surface rounded px-2 py-0.5 uppercase tracking-widest text-xs">
            {template.code}
          </span>
          <span className="font-bold">{template.title}</span>
        </div>

        {/* Card 1 — Identificação */}
        <FormSection
          meta={SECTIONS["identification"]}
          fields={INTERNACAO_IDENTIFICATION_FIELDS as unknown as FieldDef<Record<string, string>>[]}
          values={handover.identification as unknown as Record<string, string>}
          onFieldChange={(key, value) => onFieldChange("identification", key, value)}
          customFields={handover.customFields.filter((f) => f.section === "identification")}
          onCustomChange={onCustomChange}
          onCustomRemove={onCustomRemove}
          onAddField={() => openAddField("identification")}
        />

        {/* Card 2 — Subjetivo */}
        <FormSection
          meta={SECTIONS["subjetivo"]}
          fields={SUBJETIVO_FIELDS as unknown as FieldDef<Record<string, string>>[]}
          values={subjetivo as unknown as Record<string, string>}
          onFieldChange={(key, value) => onFieldChange("subjetivo", key, value)}
          customFields={handover.customFields.filter((f) => f.section === "subjetivo")}
          onCustomChange={onCustomChange}
          onCustomRemove={onCustomRemove}
          onAddField={() => openAddField("subjetivo")}
        />

        {/* Card 3 — Objetivo */}
        <FormSection
          meta={SECTIONS["objetivo"]}
          fields={OBJETIVO_FIELDS as unknown as FieldDef<Record<string, string>>[]}
          values={objetivo as unknown as Record<string, string>}
          onFieldChange={(key, value) => onFieldChange("objetivo", key, value)}
          customFields={handover.customFields.filter((f) => f.section === "objetivo")}
          onCustomChange={onCustomChange}
          onCustomRemove={onCustomRemove}
          onAddField={() => openAddField("objetivo")}
        />

        {/* Card 4 — Avaliação */}
        <FormSection
          meta={SECTIONS["avaliacaoInternacao"]}
          fields={AVALIACAO_INTERNACAO_FIELDS as unknown as FieldDef<Record<string, string>>[]}
          values={avaliacaoInternacao as unknown as Record<string, string>}
          onFieldChange={(key, value) => onFieldChange("avaliacaoInternacao", key, value)}
          customFields={handover.customFields.filter((f) => f.section === "avaliacaoInternacao")}
          onCustomChange={onCustomChange}
          onCustomRemove={onCustomRemove}
          onAddField={() => openAddField("avaliacaoInternacao")}
        />

        {/* Card 5 — Plano */}
        <FormSection
          meta={SECTIONS["planoInternacao"]}
          fields={PLANO_INTERNACAO_FIELDS as unknown as FieldDef<Record<string, string>>[]}
          values={planoInternacao as unknown as Record<string, string>}
          onFieldChange={(key, value) => onFieldChange("planoInternacao", key, value)}
          customFields={handover.customFields.filter((f) => f.section === "planoInternacao")}
          onCustomChange={onCustomChange}
          onCustomRemove={onCustomRemove}
          onAddField={() => openAddField("planoInternacao")}
        />
      </div>

      <ActionBar onClear={handleClear} onGenerate={onGenerate} />

      <CustomFieldModal
        open={modalOpen}
        defaultSection={modalSection}
        onClose={() => setModalOpen(false)}
        onAdd={onAddCustomField}
        sectionOrder={INTERNACAO_SECTION_ORDER}
      />
    </>
  );
}

// ── View genérica (UTI, Pós-cirúrgico, Observação, Personalizado) ─────────

function GenericFormView({
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

      <ActionBar onClear={handleClear} onGenerate={onGenerate} />

      <CustomFieldModal
        open={modalOpen}
        defaultSection={modalSection}
        onClose={() => setModalOpen(false)}
        onAdd={onAddCustomField}
      />
    </>
  );
}

// ── Componente principal — delega para a view correta ────────────────────

/**
 * Tela principal do formulário. Delega para InternacaoFormView quando o
 * template é "internacao", e para GenericFormView nos demais casos.
 */
export default function HandoverFormScreen(props: HandoverFormScreenProps) {
  if (props.handover.templateType === "internacao") {
    return <InternacaoFormView {...props} />;
  }
  return <GenericFormView {...props} />;
}
