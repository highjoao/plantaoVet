import type { ReactNode } from "react";
import Icon from "./Icon";

interface RetroWindowProps {
  title: string;
  /** Ícone Material Symbols na barra de título. */
  icon?: string;
  /** Cor de fundo da barra de título (hex). */
  headerBg: string;
  /** Mostra os "botões de janela" (círculos) à direita da barra. */
  windowDots?: number;
  /** Ação extra à direita da barra (ex: "+ adicionar campo"). */
  headerAction?: ReactNode;
  className?: string;
  /** Estilo inline (ex: animation-delay do pop-in). */
  style?: React.CSSProperties;
  children: ReactNode;
}

/**
 * "Janela" retro estilo pop-up dos anos 90: borda 3px, sombra offset,
 * barra de título colorida com ícone + título, corpo off-white.
 * Base de todos os cards de seção do formulário.
 */
export default function RetroWindow({
  title,
  icon,
  headerBg,
  windowDots = 0,
  headerAction,
  className = "",
  style,
  children,
}: RetroWindowProps) {
  return (
    <section className={`window-card ${className}`} style={style}>
      <div className="window-title text-on-surface" style={{ backgroundColor: headerBg }}>
        {icon && <Icon name={icon} />}
        <h2 className="font-headline-sm text-headline-sm m-0">{title}</h2>
        <div className="ml-auto flex items-center gap-2">
          {headerAction}
          {windowDots > 0 && (
            <div className="flex gap-1" aria-hidden>
              {Array.from({ length: windowDots }).map((_, i) => (
                <span
                  key={i}
                  className="w-3 h-3 border-2 border-on-surface rounded-full bg-white"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="p-4">{children}</div>
    </section>
  );
}
