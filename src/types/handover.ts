// =====================================================================
// Modelo de dados — PlantãoVet
// =====================================================================

export type TemplateType =
  | "internacao"
  | "uti"
  | "pos_cirurgico"
  | "observacao"
  | "personalizado";

export type FieldType = "text" | "textarea" | "number" | "select";

/** Chaves das seções do formulário (e da mensagem gerada). */
export type SectionKey =
  | "identification"
  | "clinical"
  | "parameters"
  | "feedingElimination"
  | "medications"
  | "evolution"
  | "pending";

/** Campo dinâmico: tanto campos extras pré-carregados por template quanto
 *  campos criados pelo usuário ("+ adicionar campo"). */
export interface CustomFieldEntry {
  id: string;
  label: string;
  type: FieldType;
  section: SectionKey;
  /** Opções para type "select" (vazio para os demais tipos). */
  options: string[];
  value: string;
  /** true = pré-carregado por um template (vs. criado manualmente). */
  preset?: boolean;
}

export interface IdentificationData {
  patientName: string;
  tutor: string;
  species: string;
  breed: string;
  weight: string;
  bed: string;
}

export interface ClinicalData {
  reason: string;
  generalState: string;
  consciousness: string;
  pain: string;
}

export interface ParametersData {
  temperature: string;
  heartRate: string;
  respiratoryRate: string;
  bloodPressure: string;
  glycemia: string;
  mucous: string;
  tpc: string;
  hydration: string;
}

export interface FeedingEliminationData {
  feeding: string;
  water: string;
  urine: string;
  feces: string;
  vomit: string;
  diarrhea: string;
}

export interface MedicationsData {
  administered: string;
  schedules: string;
  nextDoses: string;
}

export interface EvolutionData {
  evolution: string;
  intercurrences: string;
  importantNotes: string;
}

export interface PendingData {
  pendingExams: string;
  nextShiftConduct: string;
  attentionPoints: string;
}

export interface HandoverData {
  templateType: TemplateType;
  identification: IdentificationData;
  clinical: ClinicalData;
  parameters: ParametersData;
  feedingElimination: FeedingEliminationData;
  medications: MedicationsData;
  evolution: EvolutionData;
  pending: PendingData;
  customFields: CustomFieldEntry[];
}

/** Definição de um campo fixo de uma seção, usada para render + mensagem. */
export interface FieldDef<S> {
  key: keyof S & string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  /** Ocupa metade da largura no grid (para pares lado a lado no mobile). */
  half?: boolean;
}
