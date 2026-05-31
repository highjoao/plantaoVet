interface IconProps {
  name: string;
  /** Preenche o glifo (FILL 1). */
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  "aria-hidden"?: boolean;
}

/** Ícone Material Symbols Outlined. Decorativo por padrão (aria-hidden). */
export default function Icon({
  name,
  fill = false,
  className = "",
  style,
  "aria-hidden": ariaHidden = true,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined${fill ? " fill" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={style}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
}
