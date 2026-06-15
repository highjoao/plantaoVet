import { SECTION_FIELDS, SECTION_ORDER, SECTIONS } from "../data/fields";
import { getTemplateLabel } from "../data/templates";
import type {
  AvaliacaoInternacaoData,
  HandoverData,
  ObjetivoData,
  PlanoInternacaoData,
  SectionKey,
  SubjetivoData,
} from "../types/handover";

function isFilled(value: string | undefined | null): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Linha rotulada no padrão WhatsApp: *Rótulo:* valor */
function labeledLine(label: string, value: string): string {
  return `*${label}:* ${value.trim()}`;
}

/** Bloco com rótulo na própria linha e valor na linha seguinte. */
function labeledBlock(label: string, value: string): string {
  return `*${label}:*\n${value.trim()}`;
}

// ─── Defaults para seções opcionais (rascunhos antigos) ─────────────

function emptySubjetivo(): SubjetivoData {
  return { behaviorConsciousness: "", feedingWaterIntake: "", urineFeces: "" };
}

function emptyObjetivo(): ObjetivoData {
  return {
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
}

function emptyAvaliacaoInternacao(): AvaliacaoInternacaoData {
  return {
    assessment: "",
    therapeuticConduct: "",
    fluidTherapy: "",
    continuousInfusion: "",
    medications: "",
    performedProcedures: "",
  };
}

function emptyPlanoInternacao(): PlanoInternacaoData {
  return {
    generalPlanClassification: "",
    nextStepsPatient: "",
    tutorAlignment: "",
    tutorBulletin: "",
  };
}

// ─── Builder específico para Internação comum ─────────────────────────

function buildInternacaoMessage(handover: HandoverData, signature?: string): string {
  const id = handover.identification;
  const subjetivo = handover.subjetivo ?? emptySubjetivo();
  const objetivo = handover.objetivo ?? emptyObjetivo();
  const avaliacao = handover.avaliacaoInternacao ?? emptyAvaliacaoInternacao();
  const plano = handover.planoInternacao ?? emptyPlanoInternacao();

  const parts: string[] = [];

  // ── Cabeçalho ──────────────────────────────────────────────────────
  parts.push("*INTERNAÇÃO COMUM*");

  // ── Identificação ──────────────────────────────────────────────────
  const idLines: string[] = [];
  if (isFilled(id.patientName)) idLines.push(labeledLine("Nome do paciente", id.patientName));
  if (isFilled(id.tutor)) idLines.push(labeledLine("Tutor", id.tutor));
  if (isFilled(id.species)) idLines.push(labeledLine("Espécie", id.species));
  if (isFilled(id.admittingVet)) idLines.push(labeledLine("Veterinário que internou", id.admittingVet!));
  if (isFilled(id.partnerVet)) idLines.push(labeledLine("Veterinário parceiro", id.partnerVet!));
  if (isFilled(id.firstHospitalizationDateTime))
    idLines.push(labeledLine("Data e hora da 1ª internação", id.firstHospitalizationDateTime!));
  if (idLines.length > 0) parts.push(idLines.join("\n"));

  if (isFilled(id.suspicionsDiagnosis))
    parts.push(labeledLine("Suspeitas/Diagnóstico", id.suspicionsDiagnosis!));
  if (isFilled(id.shiftResponsible))
    parts.push(labeledLine("Responsável pelo plantão diurno/noturno", id.shiftResponsible!));

  // ── Subjetivo ──────────────────────────────────────────────────────
  const subjetivoLines: string[] = [];
  if (isFilled(subjetivo.behaviorConsciousness))
    subjetivoLines.push(labeledBlock("Comportamento do paciente / escala de consciência", subjetivo.behaviorConsciousness));
  if (isFilled(subjetivo.feedingWaterIntake))
    subjetivoLines.push(labeledBlock("Alimentação e ingestão hídrica", subjetivo.feedingWaterIntake));
  if (isFilled(subjetivo.urineFeces))
    subjetivoLines.push(labeledBlock("Urina e fezes", subjetivo.urineFeces));

  if (subjetivoLines.length > 0) {
    parts.push(
      `*SUBJETIVO*\n*Informações subjetivas do paciente, necessidades fisiológicas*\n\n${subjetivoLines.join("\n\n")}`,
    );
  }

  // ── Objetivo ───────────────────────────────────────────────────────
  const objetivoLines: string[] = [];
  if (isFilled(objetivo.clinicalParameters))
    objetivoLines.push(labeledBlock("Parâmetros clínicos", objetivo.clinicalParameters));
  if (isFilled(objetivo.painAssessment))
    objetivoLines.push(labeledBlock("Avaliação da dor", objetivo.painAssessment));
  if (isFilled(objetivo.woundLesionAssessment))
    objetivoLines.push(labeledBlock("Avaliação de feridas/lesões", objetivo.woundLesionAssessment));
  if (isFilled(objetivo.neurologicalExam))
    objetivoLines.push(labeledBlock("Exame neurológico", objetivo.neurologicalExam));
  if (isFilled(objetivo.orthopedicExam))
    objetivoLines.push(labeledBlock("Exame ortopédico", objetivo.orthopedicExam));

  // Sub-bloco: Exames laboratoriais
  const labLines: string[] = [];
  if (isFilled(objetivo.reticulocytes))
    labLines.push(labeledBlock("Reticulócitos", objetivo.reticulocytes));
  if (isFilled(objetivo.bloodCount))
    labLines.push(labeledBlock("Hemograma", objetivo.bloodCount));
  if (isFilled(objetivo.biochemistry))
    labLines.push(labeledBlock("Bioquímicos", objetivo.biochemistry));
  if (isFilled(objetivo.venousBloodGas))
    labLines.push(labeledBlock("Hemogasometria venosa", objetivo.venousBloodGas));
  if (labLines.length > 0)
    objetivoLines.push(`*Exames laboratoriais*\n\n${labLines.join("\n\n")}`);

  // Sub-bloco: Exames de imagem
  const imagingLines: string[] = [];
  if (isFilled(objetivo.imagingMorning))
    imagingLines.push(labeledBlock("Manhã", objetivo.imagingMorning));
  if (isFilled(objetivo.imagingAfternoon))
    imagingLines.push(labeledBlock("Tarde", objetivo.imagingAfternoon));
  if (isFilled(objetivo.imagingNight))
    imagingLines.push(labeledBlock("Noite", objetivo.imagingNight));
  if (imagingLines.length > 0)
    objetivoLines.push(`*Exames de imagem*\n\n${imagingLines.join("\n\n")}`);

  if (objetivoLines.length > 0) {
    parts.push(
      `*OBJETIVO*\n*Informações objetivas de exame físico, exames laboratoriais e imagem*\n\n${objetivoLines.join("\n\n")}`,
    );
  }

  // ── Avaliação ──────────────────────────────────────────────────────
  const avaliacaoLines: string[] = [];
  if (isFilled(avaliacao.assessment))
    avaliacaoLines.push(labeledBlock("Avaliação / hipóteses / justificativa", avaliacao.assessment));
  if (isFilled(avaliacao.therapeuticConduct))
    avaliacaoLines.push(labeledBlock("Conduta terapêutica", avaliacao.therapeuticConduct));
  if (isFilled(avaliacao.fluidTherapy))
    avaliacaoLines.push(labeledBlock("Fluidoterapia", avaliacao.fluidTherapy));
  if (isFilled(avaliacao.continuousInfusion))
    avaliacaoLines.push(labeledBlock("Infusão contínua / drogas vasoativas", avaliacao.continuousInfusion));
  if (isFilled(avaliacao.medications))
    avaliacaoLines.push(labeledBlock("Medicações", avaliacao.medications));
  if (isFilled(avaliacao.performedProcedures))
    avaliacaoLines.push(labeledBlock("Procedimentos realizados", avaliacao.performedProcedures));

  if (avaliacaoLines.length > 0) {
    parts.push(
      `*AVALIAÇÃO*\n*Justificativa dos exames, condutas frente aos exames, hipóteses diagnósticas*\n\n${avaliacaoLines.join("\n\n")}`,
    );
  }

  // ── Plano ──────────────────────────────────────────────────────────
  const planoLines: string[] = [];
  if (isFilled(plano.generalPlanClassification))
    planoLines.push(labeledBlock("Classificação / plano geral", plano.generalPlanClassification));
  if (isFilled(plano.nextStepsPatient))
    planoLines.push(labeledBlock("Próximos passos com o paciente", plano.nextStepsPatient));
  if (isFilled(plano.tutorAlignment))
    planoLines.push(labeledBlock("O que foi alinhado com o tutor", plano.tutorAlignment));
  if (isFilled(plano.tutorBulletin))
    planoLines.push(labeledBlock("Boletim / mensagem enviada ao tutor", plano.tutorBulletin));

  if (planoLines.length > 0) {
    parts.push(
      `*PLANO*\n*Descrição do plano com o paciente e tutor*\n\n${planoLines.join("\n\n")}`,
    );
  }

  // ── Campos personalizados extras ───────────────────────────────────
  const extraLines: string[] = [];
  for (const field of handover.customFields) {
    if (isFilled(field.value)) {
      extraLines.push(labeledBlock(field.label, field.value));
    }
  }
  if (extraLines.length > 0) parts.push(extraLines.join("\n\n"));

  let message = parts.join("\n\n").trim();

  if (isFilled(signature)) {
    message += `\n\n—\n${signature!.trim()}`;
  }

  return message;
}

// ─── Builder genérico (UTI, Pós-cirúrgico, Observação, Personalizado) ──

/**
 * Constrói a mensagem de passagem de plantão formatada para o WhatsApp.
 *
 * Regras:
 * - markdown do WhatsApp (*negrito* para títulos e rótulos);
 * - campos vazios são ignorados (sem linhas em branco inúteis);
 * - campos personalizados entram na seção correta;
 * - inclui o tipo de modelo quando ajuda (exceto "Personalizado");
 * - se houver assinatura padrão (perfil), é anexada ao final.
 */
export function buildWhatsappMessage(handover: HandoverData, signature?: string): string {
  if (handover.templateType === "internacao") {
    return buildInternacaoMessage(handover, signature);
  }

  const blocks: string[] = [];

  // Cabeçalho
  let title = "🐾 *PASSAGEM DE PLANTÃO* 🐾";
  if (handover.templateType && handover.templateType !== "personalizado") {
    title += `\n_Modelo: ${getTemplateLabel(handover.templateType)}_`;
  }
  blocks.push(title);

  for (const sectionKey of SECTION_ORDER) {
    const lines: string[] = [];

    // 1) Campos fixos da seção, na ordem de definição.
    const sectionData = handover[sectionKey] as unknown as Record<string, string>;
    for (const def of SECTION_FIELDS[sectionKey]) {
      const value = sectionData?.[def.key];
      if (isFilled(value)) {
        lines.push(labeledLine(def.label, value));
      }
    }

    // 2) Campos personalizados (e extras de template) da seção.
    for (const field of handover.customFields) {
      if (field.section === (sectionKey as SectionKey) && isFilled(field.value)) {
        lines.push(labeledLine(field.label, field.value));
      }
    }

    if (lines.length > 0) {
      blocks.push([SECTIONS[sectionKey].messageHeader, ...lines].join("\n"));
    }
  }

  let message = blocks.join("\n\n").trim();

  // Assinatura padrão (opcional): só anexa quando preenchida.
  if (isFilled(signature)) {
    message += `\n\n—\n${signature!.trim()}`;
  }

  return message;
}
