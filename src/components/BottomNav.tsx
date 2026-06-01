import Icon from "./Icon";

export type NavKey = "home" | "models" | "history" | "profile";

interface BottomNavProps {
  active: NavKey;
  /** Navega para a aba escolhida. */
  onNavigate: (key: NavKey) => void;
}

interface NavItem {
  key: NavKey;
  label: string;
  icon: string;
}

const ITEMS: NavItem[] = [
  { key: "home", label: "Início", icon: "home" },
  { key: "models", label: "Modelos", icon: "list_alt" },
  { key: "history", label: "Histórico", icon: "history" },
  { key: "profile", label: "Perfil", icon: "pets" },
];

/**
 * Dock de navegação inferior (mobile). Item ativo "levanta" com pílula
 * mint, borda 3px e sombra offset. Versão compacta (~60px) — mesmo estilo
 * retro, porém menos intrusiva. Todas as abas são funcionais.
 */
export default function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-gutter py-1 bg-surface border-t-3 border-on-surface z-40 h-[60px]">
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onNavigate(item.key)}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-3 py-0.5 -translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(26,28,27,1)] border-3 border-on-surface transition-transform active:scale-95"
                : "flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:opacity-100 hover:-translate-y-0.5 transition-all active:scale-95"
            }
          >
            <Icon name={item.icon} fill={isActive} className="text-xl" />
            <span className="font-label-caps text-[10px] leading-3 mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
