import { useEffect, useId, useState } from "react";
import BrutalButton from "./BrutalButton";
import Icon from "./Icon";

interface SecretCodeModalProps {
  open: boolean;
  onClose: () => void;
  /** Disparado quando o código digitado confere. */
  onSuccess: () => void;
}

// Código canônico (comparado em minúsculas, sem espaços). Não é exibido na UI
// nem persistido em nenhum storage.
const CANONICAL = "jotaba";

/**
 * Modal retrô discreto para abrir uma surpresa via código.
 * Mesmo estilo das janelas brutalistas do app. Não persiste nada.
 */
export default function SecretCodeModal({ open, onClose, onSuccess }: SecretCodeModalProps) {
  const titleId = useId();
  const inputId = `${titleId}-code`;
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Limpa estado ao (re)abrir.
  useEffect(() => {
    if (open) {
      setCode("");
      setError(null);
    }
  }, [open]);

  // Fecha com ESC.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim().toLowerCase() === CANONICAL) {
      setError(null);
      onSuccess();
    } else {
      setError("Código incorreto 💔");
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-container-padding"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fechar"
        onClick={onClose}
        className="absolute inset-0 bg-on-surface/40 cursor-default"
      />

      {/* Janela */}
      <div className="relative w-full max-w-sm bg-brand-offwhite border-3 border-on-surface rounded-lg shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] overflow-hidden animate-pop-in">
        <div className="bg-secondary-container border-b-3 border-on-surface px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="lock" />
            <h2 id={titleId} className="font-headline-sm text-headline-sm m-0">
              Código especial
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-7 h-7 flex items-center justify-center bg-error-container border-2 border-on-surface rounded hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] transition-all"
          >
            <Icon name="close" className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Digite o código para abrir uma surpresa.
          </p>

          <div>
            <label
              htmlFor={inputId}
              className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
            >
              Código
            </label>
            <input
              id={inputId}
              type="password"
              autoComplete="off"
              className="input-brutal"
              placeholder="código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              autoFocus
            />
          </div>

          {error && (
            <p className="font-body-md text-sm text-error font-bold flex items-center gap-1">
              <Icon name="heart_broken" className="text-base" />
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <BrutalButton
              type="button"
              onClick={onClose}
              colorClass="bg-surface-container-lowest text-on-surface"
              fullWidth
              className="!text-body-lg"
            >
              Cancelar
            </BrutalButton>
            <BrutalButton
              type="submit"
              colorClass="bg-primary text-on-primary"
              icon="card_giftcard"
              fullWidth
              className="!text-body-lg"
            >
              Abrir surpresa
            </BrutalButton>
          </div>
        </form>
      </div>
    </div>
  );
}
