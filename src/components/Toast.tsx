import Icon from "./Icon";

interface ToastProps {
  message: string | null;
  /** Ícone Material Symbols à esquerda (default: favorite). */
  icon?: string;
}

/**
 * Aviso flutuante brutalista (canto inferior, acima do dock).
 * Aparece com pop-in quando há mensagem. Visibilidade controlada pelo App.
 */
export default function Toast({ message, icon = "favorite" }: ToastProps) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed left-1/2 -translate-x-1/2 bottom-[88px] z-[100] max-w-[calc(100%-32px)] animate-pop-in"
    >
      <div className="flex items-center gap-2 bg-secondary-container text-on-surface border-3 border-on-surface rounded-lg shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] px-4 py-3">
        <Icon name={icon} fill className="text-on-secondary-container" />
        <span className="font-body-md text-body-md font-bold">{message}</span>
      </div>
    </div>
  );
}
