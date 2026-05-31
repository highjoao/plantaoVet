import type { ReactNode } from "react";
import BottomNav, { type NavKey } from "./BottomNav";
import Toast from "./Toast";
import TopBar from "./TopBar";

interface AppShellProps {
  /** Classe(s) de fundo da página (ex: "bg-pattern" ou "bg-brand-mint"). */
  background: string;
  showBack?: boolean;
  onBack?: () => void;
  onSettings?: () => void;
  navActive: NavKey;
  onHome: () => void;
  onUnavailable: (label: string) => void;
  /** Oculta o dock inferior (tela de formulário usa barra de ação própria). */
  hideNav?: boolean;
  toastMessage: string | null;
  toastIcon?: string;
  /** Classes extras para o <main>. */
  mainClassName?: string;
  children: ReactNode;
}

/**
 * Esqueleto do app: fundo + TopBar fixa + área principal + dock inferior + toast.
 * Cada tela injeta seu fundo, conteúdo e estado de navegação.
 */
export default function AppShell({
  background,
  showBack = false,
  onBack,
  onSettings,
  navActive,
  onHome,
  onUnavailable,
  hideNav = false,
  toastMessage,
  toastIcon,
  mainClassName = "",
  children,
}: AppShellProps) {
  return (
    <div className={`relative min-h-[100dvh] flex flex-col text-on-surface ${background}`}>
      <TopBar showBack={showBack} onBack={onBack} onSettings={onSettings} />
      <main className={`flex-1 relative z-10 ${mainClassName}`}>{children}</main>
      {!hideNav && <BottomNav active={navActive} onHome={onHome} onUnavailable={onUnavailable} />}
      <Toast message={toastMessage} icon={toastIcon} />
    </div>
  );
}
