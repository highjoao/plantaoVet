import type {
  ClinicalData,
  EvolutionData,
  FeedingEliminationData,
  FieldDef,
  IdentificationData,
  MedicationsData,
  ParametersData,
  PendingData,
  SectionKey,
} from "../types/handover";

/** Metadados visuais + de mensagem de cada seção (contrato Stitch: janela
 *  retro com barra de título colorida + emoji na mensagem do WhatsApp). */
export interface SectionMeta {
  key: SectionKey;
  title: string;
  /** Ícone Material Symbols da barra de título. */
  icon: string;
  /** Cor de fundo da barra de título (hex). */
  headerBg: string;
  /** Emoji + título da seção na mensagem do WhatsApp. */
  messageHeader: string;
}

export const SECTION_ORDER: SectionKey[] = [
  "identification",
  "clinical",
  "parameters",
  "feedingElimination",
  "medications",
  "evolution",
  "pending",
];

export const SECTIONS: Record<SectionKey, SectionMeta> = {
  identification: {
    key: "identification",
    title: "Identificação",
    icon: "badge",
    headerBg: "#FFA6C9",
    messageHeader: "📋 *IDENTIFICAÇÃO*",
  },
  clinical: {
    key: "clinical",
    title: "Quadro Clínico",
    icon: "medical_services",
    headerBg: "#FFF59D",
    messageHeader: "🩺 *QUADRO CLÍNICO*",
  },
  parameters: {
    key: "parameters",
    title: "Parâmetros",
    icon: "monitor_heart",
    headerBg: "#c7ebdd",
    messageHeader: "❤️ *PARÂMETROS*",
  },
  feedingElimination: {
    key: "feedingElimination",
    title: "Alimentação e Eliminações",
    icon: "restaurant",
    headerBg: "#efe3b8",
    messageHeader: "🍽️ *ALIMENTAÇÃO / ELIMINAÇÕES*",
  },
  medications: {
    key: "medications",
    title: "Medicações",
    icon: "medication",
    headerBg: "#fdd5e7",
    messageHeader: "💊 *MEDICAÇÕES*",
  },
  evolution: {
    key: "evolution",
    title: "Evolução",
    icon: "trending_up",
    headerBg: "#abcec1",
    messageHeader: "📈 *EVOLUÇÃO*",
  },
  pending: {
    key: "pending",
    title: "Pendências",
    icon: "warning",
    headerBg: "#FF8A65",
    messageHeader: "⚠️ *PENDÊNCIAS*",
  },
};

// Opção vazia para selects opcionais (mantém o campo "vazio" e fora da mensagem).
const EMPTY = "";

export const IDENTIFICATION_FIELDS: FieldDef<IdentificationData>[] = [
  { key: "patientName", label: "Nome do Paciente", type: "text", placeholder: "Ex: Luna" },
  { key: "tutor", label: "Tutor", type: "text", placeholder: "Ex: Marina" },
  {
    key: "species",
    label: "Espécie",
    type: "select",
    options: ["Canina", "Felina", "Outra"],
    half: true,
  },
  { key: "breed", label: "Raça", type: "text", placeholder: "Ex: SRD", half: true },
  { key: "weight", label: "Peso (kg)", type: "text", placeholder: "Ex: 8,4", half: true },
  { key: "bed", label: "Leito / Box", type: "text", placeholder: "Ex: Internação 02", half: true },
];

export const CLINICAL_FIELDS: FieldDef<ClinicalData>[] = [
  {
    key: "reason",
    label: "Motivo da Internação",
    type: "textarea",
    placeholder: "Descreva brevemente...",
  },
  {
    key: "generalState",
    label: "Estado Geral",
    type: "select",
    options: [EMPTY, "Estável", "Atenção", "Grave", "Crítico"],
  },
  {
    key: "consciousness",
    label: "Nível de Consciência",
    type: "select",
    options: [EMPTY, "Alerta", "Responsivo", "Apático", "Prostrado", "Comatoso"],
  },
  {
    key: "pain",
    label: "Dor / Desconforto",
    type: "select",
    options: [EMPTY, "Sem dor", "Leve", "Moderada", "Intensa"],
  },
];

export const PARAMETERS_FIELDS: FieldDef<ParametersData>[] = [
  { key: "temperature", label: "Temperatura", type: "text", placeholder: "Ex: 38,4°C", half: true },
  {
    key: "heartRate",
    label: "Frequência Cardíaca",
    type: "text",
    placeholder: "Ex: 110 bpm",
    half: true,
  },
  {
    key: "respiratoryRate",
    label: "Frequência Respiratória",
    type: "text",
    placeholder: "Ex: 28 irpm",
    half: true,
  },
  {
    key: "bloodPressure",
    label: "Pressão Arterial",
    type: "text",
    placeholder: "Ex: 120x80",
    half: true,
  },
  { key: "glycemia", label: "Glicemia", type: "text", placeholder: "Ex: 92 mg/dL", half: true },
  { key: "tpc", label: "TPC", type: "text", placeholder: "Ex: 2s", half: true },
  {
    key: "mucous",
    label: "Mucosas",
    type: "select",
    options: [EMPTY, "Normocoradas", "Hipocoradas", "Congestas", "Ictéricas", "Cianóticas"],
  },
  {
    key: "hydration",
    label: "Hidratação",
    type: "select",
    options: [
      EMPTY,
      "Adequada",
      "Levemente desidratado",
      "Moderadamente desidratado",
      "Severamente desidratado",
    ],
  },
];

export const FEEDING_FIELDS: FieldDef<FeedingEliminationData>[] = [
  {
    key: "feeding",
    label: "Alimentação",
    type: "select",
    options: [EMPTY, "Aceitou", "Aceitou parcialmente", "Não aceitou", "Jejum"],
    half: true,
  },
  {
    key: "water",
    label: "Água",
    type: "select",
    options: [EMPTY, "Presente", "Reduzida", "Ausente"],
    half: true,
  },
  {
    key: "urine",
    label: "Urina",
    type: "select",
    options: [EMPTY, "Presente", "Ausente", "Alterada"],
    half: true,
  },
  {
    key: "feces",
    label: "Fezes",
    type: "select",
    options: [EMPTY, "Presente", "Ausente", "Alterada"],
    half: true,
  },
  { key: "vomit", label: "Vômito", type: "select", options: [EMPTY, "Não", "Sim"], half: true },
  {
    key: "diarrhea",
    label: "Diarreia",
    type: "select",
    options: [EMPTY, "Não", "Sim"],
    half: true,
  },
];

export const MEDICATIONS_FIELDS: FieldDef<MedicationsData>[] = [
  {
    key: "administered",
    label: "Medicações administradas",
    type: "textarea",
    placeholder: "Ex: Dipirona às 18h.",
  },
  {
    key: "schedules",
    label: "Horários",
    type: "textarea",
    placeholder: "Ex: Antibiótico conforme prescrição.",
  },
  {
    key: "nextDoses",
    label: "Próximas doses",
    type: "textarea",
    placeholder: "Ex: Conforme prescrição.",
  },
];

export const EVOLUTION_FIELDS: FieldDef<EvolutionData>[] = [
  {
    key: "evolution",
    label: "Evolução durante o plantão",
    type: "textarea",
    placeholder: "Como o paciente evoluiu ao longo do plantão...",
  },
  {
    key: "intercurrences",
    label: "Intercorrências",
    type: "textarea",
    placeholder: "Houve alguma intercorrência?",
  },
  {
    key: "importantNotes",
    label: "Observações importantes",
    type: "textarea",
    placeholder: "Algo que merece destaque...",
  },
];

export const PENDING_FIELDS: FieldDef<PendingData>[] = [
  {
    key: "pendingExams",
    label: "Exames pendentes",
    type: "textarea",
    placeholder: "Ex: Conferir resultado do hemograma.",
  },
  {
    key: "nextShiftConduct",
    label: "Condutas para o próximo plantão",
    type: "textarea",
    placeholder: "Ex: Reavaliar dor às 22h.",
  },
  {
    key: "attentionPoints",
    label: "Pontos de atenção",
    type: "textarea",
    placeholder: "Ex: Acesso venoso na pata dianteira direita.",
  },
];

/** Mapa seção -> defs de campos fixos (tipado de forma frouxa para iterar). */
export const SECTION_FIELDS: Record<SectionKey, FieldDef<Record<string, string>>[]> = {
  identification: IDENTIFICATION_FIELDS as unknown as FieldDef<Record<string, string>>[],
  clinical: CLINICAL_FIELDS as unknown as FieldDef<Record<string, string>>[],
  parameters: PARAMETERS_FIELDS as unknown as FieldDef<Record<string, string>>[],
  feedingElimination: FEEDING_FIELDS as unknown as FieldDef<Record<string, string>>[],
  medications: MEDICATIONS_FIELDS as unknown as FieldDef<Record<string, string>>[],
  evolution: EVOLUTION_FIELDS as unknown as FieldDef<Record<string, string>>[],
  pending: PENDING_FIELDS as unknown as FieldDef<Record<string, string>>[],
};
