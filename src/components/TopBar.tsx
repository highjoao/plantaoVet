import Icon from "./Icon";

interface TopBarProps {
  /** Mostra a seta de voltar à esquerda (em vez do ícone de patinha). */
  showBack?: boolean;
  onBack?: () => void;
  onSettings?: () => void;
}

/**
 * Barra superior "PLANTÃO_VET.EXE" — identidade do app.
 * Fundo secondary (roxo), borda inferior 3px, sombra offset. Sticky no topo.
 * Réplica fiel do header do export Stitch.
 */
export default function TopBar({ showBack = false, onBack, onSettings }: TopBarProps) {
  return (
    <header className="bg-secondary text-on-secondary flex justify-between items-center w-full px-container-padding h-16 border-b-3 border-on-surface shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] sticky top-0 z-50">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="flex items-center justify-center p-2 -ml-2 hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:translate-x-[4px] active:translate-y-[4px]"
        >
          <Icon name="arrow_back" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onBack}
          aria-label="Início"
          className="flex items-center justify-center p-2 -ml-2 hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:translate-x-[4px] active:translate-y-[4px]"
        >
          <Icon name="pets" fill />
        </button>
      )}

      <h1 className="font-pixel-data text-headline-sm text-on-secondary uppercase tracking-widest font-bold">
        PLANTÃO_VET.EXE
      </h1>

      <button
        type="button"
        onClick={onSettings}
        aria-label="Configurações"
        className="flex items-center justify-center p-2 -mr-2 hover:translate-x-[2px] hover:translate-y-[2px] transition-all active:translate-x-[4px] active:translate-y-[4px]"
      >
        <Icon name="settings" />
      </button>
    </header>
  );
}
