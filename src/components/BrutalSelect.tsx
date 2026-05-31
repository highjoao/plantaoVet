import { useId } from "react";
import type { SelectHTMLAttributes } from "react";

interface BrutalSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  label: string;
  options: string[];
  /** Texto exibido quando o valor é "" (opção vazia). */
  placeholder?: string;
}

/**
 * Select brutalista com seta retro. Uma opção de valor "" vira o placeholder
 * ("—"), permitindo deixar o campo vazio (ignorado na mensagem).
 */
export default function BrutalSelect({
  label,
  options,
  placeholder = "—",
  className = "",
  ...rest
}: BrutalSelectProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
      >
        {label}
      </label>
      <select id={id} className={`input-brutal ${className}`.trim()} {...rest}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === "" ? placeholder : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
