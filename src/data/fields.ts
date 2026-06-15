import type {
  AvaliacaoInternacaoData,
  ClinicalData,
  EvolutionData,
  FeedingEliminationData,
  FieldDef,
  IdentificationData,
  MedicationsData,
  ObjetivoData,
  ParametersData,
  PendingData,
  PlanoInternacaoData,
  SectionKey,
  SubjetivoData,
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

/** Ordem das seções no formulário de Internação comum. */
export const INTERNACAO_SECTION_ORDER: SectionKey[] = [
  "identification",
  "subjetivo",
  "objetivo",
  "avaliacaoInternacao",
  "planoInternacao",
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
  // ── Internação Comum ─────────────────────────────────────────────
  subjetivo: {
    key: "subjetivo",
    title: "Subjetivo",
    icon: "psychology",
    headerBg: "#C8E6C9",
    messageHeader: "*SUBJETIVO*",
  },
  objetivo: {
    key: "objetivo",
    title: "Objetivo",
    icon: "monitor_heart",
    headerBg: "#BBDEFB",
    messageHeader: "*OBJETIVO*",
  },
  avaliacaoInternacao: {
    key: "avaliacaoInternacao",
    title: "Avaliação",
    icon: "analytics",
    headerBg: "#FFF9C4",
    messageHeader: "*AVALIAÇÃO*",
  },
  planoInternacao: {
    key: "planoInternacao",
    title: "Plano",
    icon: "assignment",
    headerBg: "#FFE0B2",
    messageHeader: "*PLANO*",
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

/** Campos de Identificação específicos para Internação comum. */
export const INTERNACAO_IDENTIFICATION_FIELDS: FieldDef<IdentificationData>[] = [
  { key: "patientName", label: "Nome do Paciente", type: "text", placeholder: "Ex: Luna" },
  { key: "tutor", label: "Tutor", type: "text", placeholder: "Ex: Marina" },
  {
    key: "species",
    label: "Espécie",
    type: "select",
    options: ["🐶 Canino", "🐱 Felino", "Outro"],
  },
  {
    key: "admittingVet",
    label: "Veterinário que internou",
    type: "text",
    placeholder: "Ex: Dra. Vanessa",
  },
  {
    key: "partnerVet",
    label: "Veterinário parceiro",
    type: "text",
    placeholder: "Ex: M.V. responsável",
  },
  {
    key: "firstHospitalizationDateTime",
    label: "Data e hora da 1ª internação",
    type: "text",
    placeholder: "Ex: 02/06 10:14",
  },
  {
    key: "suspicionsDiagnosis",
    label: "Suspeitas/Diagnóstico",
    type: "textarea",
    placeholder: "Ex: Sepse; neoplasia; gastroenterite",
  },
  {
    key: "shiftResponsible",
    label: "Responsável pelo plantão diurno/noturno",
    type: "text",
    placeholder: "Ex: M.V. João",
  },
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

// ── Internação Comum ─────────────────────────────────────────────────

export const SUBJETIVO_FIELDS: FieldDef<SubjetivoData>[] = [
  {
    key: "behaviorConsciousness",
    label: "Comportamento / escala de consciência",
    type: "text",
    placeholder: "Ex: Alerta, responsivo",
  },
  {
    key: "feedingWaterIntake",
    label: "Alimentação e ingestão hídrica",
    type: "text",
    placeholder: "Ex: Aceitou ração; bebeu água",
  },
  {
    key: "urineFeces",
    label: "Urina e fezes",
    type: "text",
    placeholder: "Ex: Urina presente; fezes ausentes",
  },
];

export const OBJETIVO_FIELDS: FieldDef<ObjetivoData>[] = [
  {
    key: "clinicalParameters",
    label: "Parâmetros clínicos",
    type: "textarea",
    placeholder:
      "20h00 FC __, FR __, T° __, PAS __, mucosas __, TPC __, NH __\n22h00 FC __, FR __, T° __, PAS __, mucosas __, TPC __, NH __\n00h00 FC __, FR __, T° __, PAS __, mucosas __, TPC __, NH __",
  },
  {
    key: "painAssessment",
    label: "Avaliação da dor",
    type: "text",
    placeholder: "Ex: Sem dor / Leve / Moderada",
  },
  {
    key: "woundLesionAssessment",
    label: "Avaliação de feridas/lesões",
    type: "text",
    placeholder: "Ex: Sem lesões",
  },
  {
    key: "neurologicalExam",
    label: "Exame neurológico",
    type: "text",
    placeholder: "Ex: Sem alterações",
  },
  {
    key: "orthopedicExam",
    label: "Exame ortopédico",
    type: "text",
    placeholder: "Ex: Sem alterações",
  },
  {
    key: "reticulocytes",
    label: "Reticulócitos",
    type: "text",
    placeholder: "Ex: 1,2%",
  },
  {
    key: "bloodCount",
    label: "Hemograma",
    type: "textarea",
    placeholder:
      "Data: **/**\nHe: __; Hb: __; HCT: __; PT: __; Leucócitos totais: __; Segmentados: __; Bastonetes: __; Plaquetas: __",
  },
  {
    key: "biochemistry",
    label: "Bioquímicos",
    type: "textarea",
    placeholder: "Data: **/**\nALT: __; Creatinina: __; Ureia: __; Albumina: __; Globulina: __",
  },
  {
    key: "venousBloodGas",
    label: "Hemogasometria venosa",
    type: "textarea",
    placeholder:
      "Data / hora: **/**\npH: __; CO2: __; pO2: __; HCO3: __; BE: __; SO2: __; Na: __; K: __; Ca: __; Cl: __; HCT: __; Hb: __; Glicose: __; Lactato: __",
  },
  {
    key: "imagingMorning",
    label: "Exames de imagem - manhã",
    type: "textarea",
    placeholder: "Ex: Rx tórax sem alterações",
  },
  {
    key: "imagingAfternoon",
    label: "Exames de imagem - tarde",
    type: "textarea",
    placeholder: "Ex: USG abdominal",
  },
  {
    key: "imagingNight",
    label: "Exames de imagem - noite",
    type: "textarea",
    placeholder: "Ex: Sem exames",
  },
];

export const AVALIACAO_INTERNACAO_FIELDS: FieldDef<AvaliacaoInternacaoData>[] = [
  {
    key: "assessment",
    label: "Avaliação / hipóteses / justificativa",
    type: "textarea",
    placeholder: "Ex: Paciente com suspeita de pancreatite...",
  },
  {
    key: "therapeuticConduct",
    label: "Conduta terapêutica",
    type: "text",
    placeholder: "Ex: Manutenção de fluidoterapia e suporte",
  },
  {
    key: "fluidTherapy",
    label: "Fluidoterapia",
    type: "text",
    placeholder: "Ex: Ringer Lactato 10ml/h",
  },
  {
    key: "continuousInfusion",
    label: "Infusão contínua / drogas vasoativas",
    type: "text",
    placeholder: "Ex: Fentanil 2mcg/kg/h",
  },
  {
    key: "medications",
    label: "Medicações",
    type: "textarea",
    placeholder:
      "• Medicação dose/frequência/via - justificativa\n• Ex: Dipirona 25mg/kg TID IV - analgesia",
  },
  {
    key: "performedProcedures",
    label: "Procedimentos realizados",
    type: "textarea",
    placeholder: "Ex: Sondagem, transfusão, centese, sutura, acesso venoso",
  },
];

export const PLANO_INTERNACAO_FIELDS: FieldDef<PlanoInternacaoData>[] = [
  {
    key: "generalPlanClassification",
    label: "Classificação / plano geral",
    type: "text",
    placeholder: "Ex: LIGHT, MODERADO, INTENSIVO, CRÍTICO",
  },
  {
    key: "nextStepsPatient",
    label: "Próximos passos com o paciente",
    type: "textarea",
    placeholder: "Ex: Reavaliar parâmetros às 06h",
  },
  {
    key: "tutorAlignment",
    label: "O que foi alinhado com o tutor",
    type: "textarea",
    placeholder: "Ex: Explicado quadro e plano de tratamento",
  },
  {
    key: "tutorBulletin",
    label: "Boletim / mensagem enviada ao tutor",
    type: "textarea",
    placeholder: "Ex: Luna está estável e sendo monitorada...",
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
  subjetivo: SUBJETIVO_FIELDS as unknown as FieldDef<Record<string, string>>[],
  objetivo: OBJETIVO_FIELDS as unknown as FieldDef<Record<string, string>>[],
  avaliacaoInternacao: AVALIACAO_INTERNACAO_FIELDS as unknown as FieldDef<Record<string, string>>[],
  planoInternacao: PLANO_INTERNACAO_FIELDS as unknown as FieldDef<Record<string, string>>[],
};
