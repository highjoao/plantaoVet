import { SECTION_FIELDS, SECTION_ORDER, SECTIONS } from "../data/fields";
import { getTemplateLabel } from "../data/templates";
import type { HandoverData, SectionKey } from "../types/handover";

function isFilled(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Linha rotulada no padrão WhatsApp: *Rótulo:* valor */
function labeledLine(label: string, value: string): string {
  return `*${label}:* ${value.trim()}`;
}

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
  if (typeof signature === "string" && signature.trim().length > 0) {
    message += `\n\n—\n${signature.trim()}`;
  }

  return message;
}
