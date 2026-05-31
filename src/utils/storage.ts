import type { HandoverData, TemplateType } from "../types/handover";

// Chaves de localStorage usadas pelo app.
const DRAFT_KEY = "plantaovet:draft";
const TEMPLATE_KEY = "plantaovet:lastTemplate";
const CUSTOM_FIELDS_KEY = "plantaovet:customFieldDefs";

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
