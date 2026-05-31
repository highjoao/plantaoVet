import FloatingDecorations from "../components/FloatingDecorations";
import Icon from "../components/Icon";
import { copyToClipboard } from "../utils/clipboard";
import { openWhatsapp } from "../utils/whatsapp";

interface PreviewScreenProps {
  message: string;
  onEdit: () => void;
  showToast: (message: string, icon?: string) => void;
}

const BURST_EMOJIS = ["✨", "💖", "⭐", "🐾"];

/** Dispara um pequeno burst de emojis a partir do centro do elemento. */
function celebrate(target: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement("div");
    particle.className = "celebrate-particle";
    particle.textContent = BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)];
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.5;
    const velocity = 50 + Math.random() * 40;
    particle.style.setProperty("--tx", `${Math.cos(angle) * velocity}px`);
    particle.style.setProperty("--ty", `${Math.sin(angle) * velocity}px`);
    particle.style.setProperty("--rot", `${Math.random() * 360}deg`);
    document.body.appendChild(particle);
    window.setTimeout(() => particle.remove(), 600);
  }
}

/**
 * Tela de prévia. Janela de chat Y2K (creme + barra rosa) com a mensagem
 * formatada e os botões Editar / Copiar / Enviar WhatsApp.
 * Réplica fiel de pr_via_da_mensagem_animado do Stitch.
 */
export default function PreviewScreen({ message, onEdit, showToast }: PreviewScreenProps) {
  async function handleCopy(e: React.MouseEvent<HTMLButtonElement>) {
    const button = e.currentTarget;
    const ok = await copyToClipboard(message);
    if (ok) {
      celebrate(button);
      showToast("Mensagem copiada! ✨", "content_copy");
    } else {
      showToast("Não consegui copiar 😢", "error");
    }
  }

  return (
    <div className="p-container-padding flex flex-col items-center w-full max-w-2xl mx-auto pb-28">
      <FloatingDecorations variant="corners" />

      {/* Janela de chat Y2K */}
      <div className="relative z-10 w-full bg-[#FFF3C7] rounded-lg border-3 border-on-surface shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] overflow-hidden flex flex-col max-h-[calc(100dvh-160px)] mt-4">
        {/* Barra de título */}
        <div className="bg-[#FF9EC6] border-b-3 border-on-surface px-4 py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Icon name="chat" className="text-on-surface" fill />
            <h2 className="font-headline-sm text-headline-sm text-on-surface uppercase tracking-wide">
              Prévia da Mensagem
            </h2>
          </div>
          <div className="flex gap-1" aria-hidden>
            <span className="w-3 h-3 rounded-full border-2 border-on-surface bg-surface" />
            <span className="w-3 h-3 rounded-full border-2 border-on-surface bg-surface" />
            <span className="w-3 h-3 rounded-full border-2 border-on-surface bg-surface" />
          </div>
        </div>

        {/* Mensagem */}
        <div className="p-4 md:p-6 overflow-y-auto bg-[#FFFDF7] flex-grow">
          <pre className="font-body-md text-body-md text-on-surface whitespace-pre-wrap break-words leading-relaxed animate-fade-in-up m-0 font-sans">
            {message}
          </pre>
        </div>

        {/* Botões */}
        <div className="bg-surface-container border-t-3 border-on-surface p-4 flex flex-col md:flex-row gap-3 md:justify-end items-stretch shrink-0">
          <button
            type="button"
            onClick={onEdit}
            className="w-full md:w-auto bg-[#FFF3C7] border-3 border-on-surface rounded-md px-6 py-3 font-headline-sm text-body-lg text-on-surface shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(26,28,27,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Icon name="edit" />
            Editar
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="w-full md:w-auto bg-[#FF9EC6] border-3 border-on-surface rounded-md px-6 py-3 font-headline-sm text-body-lg text-on-surface shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(26,28,27,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <Icon name="content_copy" />
            Copiar
          </button>
          <button
            type="button"
            onClick={() => openWhatsapp(message)}
            className="w-full md:w-auto bg-[#FF7A45] border-3 border-on-surface rounded-md px-8 py-3 font-headline-sm text-body-lg text-on-primary font-bold shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(26,28,27,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-2 btn-shimmer"
          >
            <Icon name="send" />
            Enviar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
