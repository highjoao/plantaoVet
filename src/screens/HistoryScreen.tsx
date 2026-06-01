import { useState } from "react";
import Icon from "../components/Icon";
import { getTemplateLabel } from "../data/templates";
import { copyToClipboard } from "../utils/clipboard";
import { loadHistory, type HistoryItem } from "../utils/storage";
import { openWhatsapp } from "../utils/whatsapp";

interface HistoryScreenProps {
  onView: (item: HistoryItem) => void;
  showToast: (message: string, icon?: string) => void;
}

/** Data/hora local amigável (ex: 31/05/2026 14:32). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Primeira linha "útil" da mensagem para a prévia (pula o cabeçalho). */
function preview(message: string): string {
  const clean = message.replace(/\*/g, "").trim();
  return clean.length > 120 ? `${clean.slice(0, 120)}…` : clean;
}

/**
 * Histórico local de passagens geradas neste dispositivo (até 20).
 * Mantém a linguagem visual: janela retro, botões brutalistas, estado vazio fofo.
 */
export default function HistoryScreen({ onView, showToast }: HistoryScreenProps) {
  // Carregado uma vez ao montar (a tela remonta a cada navegação).
  const [items] = useState<HistoryItem[]>(() => loadHistory());

  async function handleCopy(message: string) {
    const ok = await copyToClipboard(message);
    showToast(ok ? "Mensagem copiada! ✨" : "Não consegui copiar 😢", ok ? "content_copy" : "error");
  }

  return (
    <div className="flex flex-col px-container-padding max-w-2xl mx-auto w-full gap-4 pt-4 pb-28">
      {/* Cabeçalho */}
      <div className="bg-surface retro-border retro-shadow rounded-lg overflow-hidden mb-2">
        <div className="bg-secondary-container border-b-3 border-on-surface px-4 py-2 flex items-center justify-between">
          <h1 className="font-headline-md text-headline-md text-on-surface">Histórico</h1>
          <Icon name="history" />
        </div>
        <div className="p-4 bg-surface-bright font-body-md text-on-surface-variant">
          <p>Últimas passagens geradas neste dispositivo.</p>
        </div>
      </div>

      {items.length === 0 ? (
        // Estado vazio fofo
        <div className="bg-surface retro-border retro-shadow rounded-lg p-8 flex flex-col items-center text-center gap-3 animate-pop-in">
          <Icon name="pets" fill className="text-5xl text-on-surface-variant opacity-70" />
          <p className="font-body-lg text-body-lg font-bold text-on-surface">
            Nenhum plantão salvo ainda.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant">
            As passagens que você gerar aparecem aqui. 🐾
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {items.map((item) => (
            <article
              key={item.id}
              className="bg-surface retro-border retro-shadow rounded-lg overflow-hidden animate-pop-in"
            >
              <div className="bg-tertiary-container border-b-3 border-on-surface px-4 py-2 flex items-center justify-between gap-2">
                <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">
                  {item.patientName?.trim() || "Paciente sem nome"}
                </h2>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase shrink-0">
                  {getTemplateLabel(item.templateType)}
                </span>
              </div>
              <div className="p-4 bg-surface-bright flex flex-col gap-3">
                <p className="font-pixel-data text-pixel-data text-on-surface-variant">
                  {formatDate(item.createdAt)}
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant break-words">
                  {preview(item.message)}
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => onView(item)}
                    className="bg-[#FFF3C7] border-3 border-on-surface rounded-md px-4 py-2 font-headline-sm text-body-md text-on-surface shadow-[3px_3px_0px_0px_rgba(26,28,27,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(26,28,27,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-1"
                  >
                    <Icon name="visibility" className="text-lg" />
                    Ver
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.message)}
                    className="bg-[#FF9EC6] border-3 border-on-surface rounded-md px-4 py-2 font-headline-sm text-body-md text-on-surface shadow-[3px_3px_0px_0px_rgba(26,28,27,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(26,28,27,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-1"
                  >
                    <Icon name="content_copy" className="text-lg" />
                    Copiar
                  </button>
                  <button
                    type="button"
                    onClick={() => openWhatsapp(item.message)}
                    className="bg-[#FF7A45] border-3 border-on-surface rounded-md px-4 py-2 font-headline-sm text-body-md text-on-primary font-bold shadow-[3px_3px_0px_0px_rgba(26,28,27,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(26,28,27,1)] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all flex items-center gap-1"
                  >
                    <Icon name="send" className="text-lg" />
                    WhatsApp
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
