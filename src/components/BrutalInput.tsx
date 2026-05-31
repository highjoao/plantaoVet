import { useId } from "react";
import type { InputHTMLAttributes } from "react";

interface BrutalInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
}

/** Campo de texto/número brutalista com label monospace em caixa alta. */
export default function BrutalInput({ label, className = "", ...rest }: BrutalInputProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
      >
        {label}
      </label>
      <input id={id} className={`input-brutal ${className}`.trim()} {...rest} />
    </div>
  );
}
