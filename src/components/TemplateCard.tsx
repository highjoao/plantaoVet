import type { TemplateMeta } from "../data/templates";
import Icon from "./Icon";

interface TemplateCardProps {
  template: TemplateMeta;
  onSelect: () => void;
}

/**
 * Card de seleção de modelo — janela retro clicável.
 * Barra de título: código monospace + ícone. Corpo: avatar redondo +
 * título/descrição + seta que aparece no hover. Réplica do Stitch.
 */
export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const arrowIcon = template.dashed ? "add" : "arrow_forward";

  const body = (
    <div className="p-4 flex items-center gap-4">
      <div className="bg-surface p-3 rounded-full retro-border shrink-0 group-hover:rotate-6 transition-transform">
        <Icon name={template.avatarIcon} fill className="text-2xl" />
      </div>
      <div className="flex flex-col text-left">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">{template.title}</h2>
        <span className="font-body-md text-on-surface-variant text-sm">
          {template.description}
        </span>
      </div>
      <div className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
        <Icon name={arrowIcon} />
      </div>
    </div>
  );

  return (
    <button
      type="button"
      onClick={onSelect}
      style={{ backgroundColor: template.cardBg }}
      className="w-full retro-border retro-shadow retro-shadow-hover retro-shadow-active rounded-lg overflow-hidden flex flex-col transition-all cursor-pointer text-left group"
    >
      <div
        className="border-b-3 border-on-surface px-4 py-2 flex items-center justify-between"
        style={{ backgroundColor: template.headerBg }}
      >
        <span className="font-pixel-data text-on-surface uppercase tracking-widest text-sm group-hover:tracking-[0.2em] transition-all">
          {template.code}
        </span>
        <Icon
          name={template.headerIcon}
          className="text-on-surface group-hover:scale-110 transition-transform"
        />
      </div>
      {template.dashed ? (
        <div className="m-2 border-2 border-dashed border-on-surface-variant rounded-md bg-surface-bright group-hover:border-on-surface transition-colors">
          {body}
        </div>
      ) : (
        body
      )}
    </button>
  );
}
