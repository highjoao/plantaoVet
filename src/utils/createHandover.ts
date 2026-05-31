import { SECTION_ORDER } from "../data/fields";
import { TEMPLATES } from "../data/templates";
import type { CustomFieldEntry, HandoverData, TemplateType } from "../types/handover";

/** true se nenhum campo (fixo ou personalizado) tiver valor preenchido. */
export function isHandoverEmpty(handover: HandoverData): boolean {
  for (const section of SECTION_ORDER) {
    const data = handover[section] as unknown as Record<string, string>;
    if (Object.values(data).some((v) => typeof v === "string" && v.trim().length > 0)) {
      return false;
    }
  }
  return !handover.customFields.some((f) => f.value.trim().length > 0);
}

/** Mapeia os campos extras de um template em entradas de campo (valor vazio). */
function presetCustomFields(templateType: TemplateType): CustomFieldEntry[] {
  return TEMPLATES[templateType].extraFields.map((f) => ({ ...f, value: "" }));
}

/** Cria um HandoverData vazio para o template informado. */
export function createEmptyHandover(templateType: TemplateType): HandoverData {
  return {
    templateType,
    identification: {
      patientName: "",
      tutor: "",
      species: "Canina",
      breed: "",
      weight: "",
      bed: "",
    },
    clinical: { reason: "", generalState: "", consciousness: "", pain: "" },
    parameters: {
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      bloodPressure: "",
      glycemia: "",
      mucous: "",
      tpc: "",
      hydration: "",
    },
    feedingElimination: {
      feeding: "",
      water: "",
      urine: "",
      feces: "",
      vomit: "",
      diarrhea: "",
    },
    medications: { administered: "", schedules: "", nextDoses: "" },
    evolution: { evolution: "", intercurrences: "", importantNotes: "" },
    pending: { pendingExams: "", nextShiftConduct: "", attentionPoints: "" },
    customFields: presetCustomFields(templateType),
  };
}

/** Dados de exemplo para o botão "Ver modelo" da tela inicial. */
export function getSampleHandover(): HandoverData {
  const base = createEmptyHandover("internacao");
  return {
    ...base,
    identification: {
      patientName: "Luna",
      tutor: "Marina",
      species: "Canina",
      breed: "SRD",
      weight: "8,4",
      bed: "Internação 02",
    },
    clinical: {
      reason: "Observação pós-operatória.",
      generalState: "Estável",
      consciousness: "Alerta",
      pain: "Leve",
    },
    parameters: {
      temperature: "38,4°C",
      heartRate: "110 bpm",
      respiratoryRate: "28 irpm",
      bloodPressure: "120x80",
      glycemia: "92 mg/dL",
      mucous: "Normocoradas",
      tpc: "2s",
      hydration: "Adequada",
    },
    feedingElimination: {
      feeding: "Aceitou parcialmente",
      water: "Presente",
      urine: "Presente",
      feces: "Ausente",
      vomit: "Não",
      diarrhea: "Não",
    },
    medications: {
      administered: "Dipirona às 18h.",
      schedules: "Antibiótico conforme prescrição.",
      nextDoses: "Conforme prescrição.",
    },
    evolution: {
      evolution: "Paciente estável durante o plantão, sem intercorrências relevantes.",
      intercurrences: "",
      importantNotes: "",
    },
    pending: {
      pendingExams: "Conferir resultado do hemograma.",
      nextShiftConduct: "Reavaliar dor às 22h.",
      attentionPoints: "",
    },
    // Demonstra um campo extra do template preenchido.
    customFields: base.customFields.map((f) =>
      f.id === "preset:internacao:fluidoterapia"
        ? { ...f, value: "Ringer Lactato 10ml/h" }
        : f,
    ),
  };
}
