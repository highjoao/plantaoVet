import { useCallback, useEffect, useRef, useState } from "react";
import type { CustomFieldEntry, HandoverData, SectionKey, TemplateType } from "../types/handover";
import { createEmptyHandover } from "../utils/createHandover";
import {
  loadCustomFieldDefs,
  loadDraft,
  saveCustomFieldDefs,
  saveDraft,
  saveLastTemplate,
  type StoredCustomFieldDef,
} from "../utils/storage";

/** Anexa as definições de campos personalizados do usuário (persistidas) a um
 *  handover recém-criado, evitando duplicar ids já presentes. */
function withStoredCustomFields(base: HandoverData): HandoverData {
  const defs = loadCustomFieldDefs();
  if (defs.length === 0) return base;
  const present = new Set(base.customFields.map((f) => f.id));
  const extras: CustomFieldEntry[] = defs
    .filter((d) => !present.has(d.id))
    .map((d) => ({ ...d, value: "", preset: false }));
  return { ...base, customFields: [...base.customFields, ...extras] };
}

function initialHandover(): HandoverData {
  const draft = loadDraft();
  if (draft) return draft;
  return withStoredCustomFields(createEmptyHandover("internacao"));
}

export interface HandoverStore {
  handover: HandoverData;
  updateField: (section: SectionKey, key: string, value: string) => void;
  updateCustomFieldValue: (id: string, value: string) => void;
  addCustomField: (field: CustomFieldEntry) => void;
  removeCustomField: (id: string) => void;
  loadTemplate: (type: TemplateType) => void;
  setHandover: (data: HandoverData) => void;
  clearForm: () => void;
}

export function useHandoverStore(): HandoverStore {
  const [handover, setHandoverState] = useState<HandoverData>(initialHandover);

  // Persiste o rascunho a cada mudança (pula a primeira execução).
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    saveDraft(handover);
  }, [handover]);

  const updateField = useCallback((section: SectionKey, key: string, value: string) => {
    setHandoverState((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as unknown as Record<string, string>), [key]: value },
    }));
  }, []);

  const updateCustomFieldValue = useCallback((id: string, value: string) => {
    setHandoverState((prev) => ({
      ...prev,
      customFields: prev.customFields.map((f) => (f.id === id ? { ...f, value } : f)),
    }));
  }, []);

  const addCustomField = useCallback((field: CustomFieldEntry) => {
    setHandoverState((prev) => ({ ...prev, customFields: [...prev.customFields, field] }));
    if (!field.preset) {
      const def: StoredCustomFieldDef = {
        id: field.id,
        label: field.label,
        type: field.type,
        section: field.section,
        options: field.options,
      };
      const existing = loadCustomFieldDefs();
      if (!existing.some((d) => d.id === def.id)) {
        saveCustomFieldDefs([...existing, def]);
      }
    }
  }, []);

  const removeCustomField = useCallback((id: string) => {
    setHandoverState((prev) => ({
      ...prev,
      customFields: prev.customFields.filter((f) => f.id !== id),
    }));
    const existing = loadCustomFieldDefs();
    const filtered = existing.filter((d) => d.id !== id);
    if (filtered.length !== existing.length) {
      saveCustomFieldDefs(filtered);
    }
  }, []);

  const loadTemplate = useCallback((type: TemplateType) => {
    saveLastTemplate(type);
    setHandoverState(withStoredCustomFields(createEmptyHandover(type)));
  }, []);

  const setHandover = useCallback((data: HandoverData) => {
    setHandoverState(data);
  }, []);

  const clearForm = useCallback(() => {
    setHandoverState((prev) => withStoredCustomFields(createEmptyHandover(prev.templateType)));
  }, []);

  return {
    handover,
    updateField,
    updateCustomFieldValue,
    addCustomField,
    removeCustomField,
    loadTemplate,
    setHandover,
    clearForm,
  };
}
