import type { CustomFieldEntry, SectionKey, TemplateType } from "../types/handover";

/** Campo extra pré-carregado por um template (sem valor ainda). */
type PresetField = Omit<CustomFieldEntry, "value">;

export interface TemplateMeta {
  type: TemplateType;
  /** Rótulo monospace exibido na barra do card (ex: TEMPLATE_01). */
  code: string;
  title: string;
  description: string;
  /** Ícone Material Symbols na barra de título do card. */
  headerIcon: string;
  /** Ícone Material Symbols no avatar redondo do card. */
  avatarIcon: string;
  /** Cor de fundo do corpo do card (hex). */
  cardBg: string;
  /** Cor de fundo da barra de título do card (hex). */
  headerBg: string;
  /** Card "Personalizado" usa moldura tracejada interna. */
  dashed?: boolean;
  /** Campos extras carregados ao escolher o template. */
  extraFields: PresetField[];
}

function preset(
  templateType: TemplateType,
  section: SectionKey,
  label: string,
  type: PresetField["type"] = "text",
  options: string[] = [],
): PresetField {
  const slug = label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");
  return {
    id: `preset:${templateType}:${slug}`,
    label,
    type,
    section,
    options,
    preset: true,
  };
}

export const TEMPLATES: Record<TemplateType, TemplateMeta> = {
  internacao: {
    type: "internacao",
    code: "TEMPLATE_01",
    title: "Internação comum",
    description: "Rotina geral e monitoramento",
    headerIcon: "local_hospital",
    avatarIcon: "pets",
    cardBg: "#fdd5e7",
    headerBg: "#e3bcce",
    extraFields: [],
  },
  uti: {
    type: "uti",
    code: "TEMPLATE_02",
    title: "UTI",
    description: "Cuidados intensivos e críticos",
    headerIcon: "monitor_heart",
    avatarIcon: "ecg",
    cardBg: "#ffdad6",
    headerBg: "#ffb4ab",
    extraFields: [
      preset("uti", "parameters", "Saturação / SpO2"),
      preset("uti", "parameters", "Oxigenioterapia"),
      preset("uti", "parameters", "Lactato"),
      preset("uti", "parameters", "Débito urinário"),
      preset("uti", "parameters", "Perfusão"),
      preset("uti", "parameters", "Monitorização contínua", "textarea"),
      preset("uti", "medications", "Drogas vasoativas", "textarea"),
      preset("uti", "pending", "Alertas críticos", "textarea"),
    ],
  },
  pos_cirurgico: {
    type: "pos_cirurgico",
    code: "TEMPLATE_03",
    title: "Pós-cirúrgico",
    description: "Recuperação anestésica e dor",
    headerIcon: "healing",
    avatarIcon: "content_cut",
    cardBg: "#efe3b8",
    headerBg: "#eee3b7",
    extraFields: [
      preset("pos_cirurgico", "clinical", "Procedimento realizado"),
      preset("pos_cirurgico", "clinical", "Horário da cirurgia"),
      preset("pos_cirurgico", "clinical", "Recuperação anestésica"),
      preset("pos_cirurgico", "evolution", "Curativo"),
      preset("pos_cirurgico", "evolution", "Pontos / incisão"),
      preset("pos_cirurgico", "evolution", "Dreno"),
      preset("pos_cirurgico", "medications", "Analgesia", "textarea"),
      preset("pos_cirurgico", "medications", "Antibiótico", "textarea"),
      preset("pos_cirurgico", "pending", "Restrições", "textarea"),
    ],
  },
  observacao: {
    type: "observacao",
    code: "TEMPLATE_04",
    title: "Observação",
    description: "Curto período e fluidoterapia",
    headerIcon: "visibility",
    avatarIcon: "hourglass_empty",
    cardBg: "#c6eadc",
    headerBg: "#c7ebdd",
    extraFields: [
      preset("observacao", "clinical", "Queixa principal", "textarea"),
      preset("observacao", "clinical", "Tempo de observação"),
      preset("observacao", "medications", "Conduta inicial", "textarea"),
      preset("observacao", "evolution", "Resposta ao tratamento", "textarea"),
      preset("observacao", "pending", "Critério de alta", "textarea"),
      preset("observacao", "pending", "Orientações ao tutor", "textarea"),
    ],
  },
  personalizado: {
    type: "personalizado",
    code: "TEMPLATE_CUSTOM",
    title: "Personalizado",
    description: "Crie seu próprio modelo",
    headerIcon: "tune",
    avatarIcon: "draw",
    cardBg: "#e3e2e0",
    headerBg: "#e8e8e6",
    dashed: true,
    extraFields: [],
  },
};

/** Ordem de exibição dos templates na tela de seleção. */
export const TEMPLATE_ORDER: TemplateType[] = [
  "internacao",
  "uti",
  "pos_cirurgico",
  "observacao",
  "personalizado",
];

export function getTemplateLabel(type: TemplateType): string {
  return TEMPLATES[type].title;
}
