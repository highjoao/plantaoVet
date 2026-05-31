import { useId } from "react";
import type { TextareaHTMLAttributes } from "react";

interface BrutalTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> {
  label: string;
}

/** Área de texto brutalista (altura mínima 80px), com label monospace. */
export default function BrutalTextarea({ label, className = "", ...rest }: BrutalTextareaProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-label-caps text-label-caps text-on-surface-variant mb-1 uppercase"
      >
        {label}
      </label>
      <textarea id={id} className={`input-brutal min-h-[80px] ${className}`.trim()} {...rest} />
    </div>
  );
}
