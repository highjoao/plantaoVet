import Icon from "./Icon";

export type NavKey = "home" | "patients" | "history" | "profile";

interface BottomNavProps {
  active: NavKey;
  onHome: () => void;
  /** Disparado ao tocar em itens ainda não implementados. */
  onUnavailable: (label: string) => void;
}

interface NavItem {
  key: NavKey;
  label: string;
  icon: string;
}

const ITEMS: NavItem[] = [
  { key: "home", label: "Início", icon: "home" },
  { key: "patients", label: "Pacientes", icon: "list_alt" },
  { key: "history", label: "Histórico", icon: "history" },
  { key: "profile", label: "Perfil", icon: "person" },
];

/**
 * Dock de navegação inferior (mobile). Item ativo "levanta" com pílula
 * mint, borda 3px e sombra offset. Réplica do BottomNav do Stitch.
 * Apenas "Início" é funcional; os demais exibem um aviso "em breve".
 */
export default function BottomNav({ active, onHome, onUnavailable }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-gutter py-2 bg-surface border-t-3 border-on-surface z-40 h-[72px]">
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        const handleClick = item.key === "home" ? onHome : () => onUnavailable(item.label);
        return (
          <button
            key={item.key}
            type="button"
            onClick={handleClick}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(26,28,27,1)] border-3 border-on-surface transition-transform active:scale-95"
                : "flex flex-col items-center justify-center text-on-surface-variant opacity-70 hover:opacity-100 hover:-translate-y-0.5 transition-all active:scale-95"
            }
          >
            <Icon name={item.icon} fill={isActive} className="text-2xl" />
            <span className="font-label-caps text-label-caps mt-1">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
