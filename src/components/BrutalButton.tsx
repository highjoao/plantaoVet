import type { ButtonHTMLAttributes, ReactNode } from "react";
import Icon from "./Icon";

interface BrutalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /** Classes de cor de fundo/texto (ex: "bg-primary text-on-primary"). */
  colorClass?: string;
  /** Ícone Material Symbols à esquerda do texto. */
  icon?: string;
  iconFill?: boolean;
  fullWidth?: boolean;
  /** Brilho deslizante (Home). */
  shine?: boolean;
  /** Shimmer contínuo (CTA da Prévia). */
  shimmer?: boolean;
  /** Pulso sutil (CTA Gerar Mensagem). */
  pulse?: boolean;
}

/**
 * Botão neo-brutalista: borda 3px, sombra offset 4px.
 * hover → translada 2px e encolhe a sombra; active → translada 4px e zera a
 * sombra (clique físico). Comportamento fiel ao contrato Stitch.
 */
export default function BrutalButton({
  children,
  colorClass = "bg-primary text-on-primary",
  icon,
  iconFill = false,
  fullWidth = false,
  shine = false,
  shimmer = false,
  pulse = false,
  className = "",
  type = "button",
  ...rest
}: BrutalButtonProps) {
  const classes = [
    "relative inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-3",
    "border-3 border-on-surface rounded-lg",
    "font-headline-sm text-headline-sm",
    "shadow-[4px_4px_0px_0px_rgba(26,28,27,1)]",
    "hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(26,28,27,1)]",
    "active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
    "transition-all",
    colorClass,
    fullWidth ? "w-full" : "",
    pulse ? "animate-pulse-subtle" : "",
    shine ? "btn-shine" : "",
    shimmer ? "btn-shimmer" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...rest}>
      {icon && <Icon name={icon} fill={iconFill} className="relative z-10" />}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
