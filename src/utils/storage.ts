import type { HandoverData, TemplateType } from "../types/handover";

// Chaves de localStorage usadas pelo app.
const DRAFT_KEY = "plantaovet:draft";
const TEMPLATE_KEY = "plantaovet:lastTemplate";
const CUSTOM_FIELDS_KEY = "plantaovet:customFieldDefs";
const HISTORY_KEY = "plantaovet:history";
const PROFILE_KEY = "plantaovet:profile";

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* localStorage indisponível (modo privado / quota) — ignora silenciosamente. */
  }
}

function safeRemove(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignora */
  }
}

/** Rascunho atual do plantão (formulário completo, incluindo campos custom). */
export function loadDraft(): HandoverData | null {
  const raw = safeGet(DRAFT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as HandoverData;
  } catch {
    return null;
  }
}

export function saveDraft(data: HandoverData): void {
  safeSet(DRAFT_KEY, JSON.stringify(data));
}

export function clearDraft(): void {
  safeRemove(DRAFT_KEY);
}

/** Último template selecionado. */
export function loadLastTemplate(): TemplateType | null {
  const raw = safeGet(TEMPLATE_KEY);
  return raw as TemplateType | null;
}

export function saveLastTemplate(type: TemplateType): void {
  safeSet(TEMPLATE_KEY, type);
}

/**
 * Definições de campos personalizados criados pelo usuário (persistem entre
 * rascunhos para reaparecerem em novos plantões). Guardamos só as definições,
 * sem valor.
 */
export interface StoredCustomFieldDef {
  id: string;
  label: string;
  type: HandoverData["customFields"][number]["type"];
  section: HandoverData["customFields"][number]["section"];
  options: string[];
}

export function loadCustomFieldDefs(): StoredCustomFieldDef[] {
  const raw = safeGet(CUSTOM_FIELDS_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as StoredCustomFieldDef[]) : [];
  } catch {
    return [];
  }
}

export function saveCustomFieldDefs(defs: StoredCustomFieldDef[]): void {
  safeSet(CUSTOM_FIELDS_KEY, JSON.stringify(defs));
}

/**
 * Histórico local de passagens geradas neste dispositivo. Guardamos apenas o
 * essencial para reexibir/copiar/enviar — não é um banco de pacientes.
 */
export interface HistoryItem {
  id: string;
  createdAt: string;
  templateType: TemplateType;
  patientName?: string;
  message: string;
}

const HISTORY_LIMIT = 20;

export function loadHistory(): HistoryItem[] {
  const raw = safeGet(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as HistoryItem[]) : [];
  } catch {
    return [];
  }
}

/**
 * Adiciona um item ao histórico (mais recente primeiro), limitando a 20.
 * Evita duplicar a mesma mensagem do item mais recente (ida e volta na prévia).
 */
export function addHistoryItem(item: HistoryItem): void {
  const list = loadHistory();
  if (list[0]?.message === item.message) return;
  const next = [item, ...list].slice(0, HISTORY_LIMIT);
  safeSet(HISTORY_KEY, JSON.stringify(next));
}

export function clearHistory(): void {
  safeRemove(HISTORY_KEY);
}

/** Perfil da veterinária (exibição/personalização). Tudo local. */
export interface ProfileData {
  vetName: string;
  clinic: string;
  signature: string;
}

const EMPTY_PROFILE: ProfileData = { vetName: "", clinic: "", signature: "" };

export function loadProfile(): ProfileData {
  const raw = safeGet(PROFILE_KEY);
  if (!raw) return { ...EMPTY_PROFILE };
  try {
    const parsed = JSON.parse(raw) as Partial<ProfileData>;
    return {
      vetName: parsed.vetName ?? "",
      clinic: parsed.clinic ?? "",
      signature: parsed.signature ?? "",
    };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export function saveProfile(data: ProfileData): void {
  safeSet(PROFILE_KEY, JSON.stringify(data));
}

export function clearProfile(): void {
  safeRemove(PROFILE_KEY);
}
