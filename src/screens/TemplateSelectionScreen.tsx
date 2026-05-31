import Icon from "../components/Icon";
import TemplateCard from "../components/TemplateCard";
import { TEMPLATES, TEMPLATE_ORDER } from "../data/templates";
import type { TemplateType } from "../types/handover";

interface TemplateSelectionScreenProps {
  onSelectTemplate: (type: TemplateType) => void;
}

/**
 * Tela de seleção de modelo. Card de cabeçalho + lista de 5 modelos +
 * FAB "+" (atalho para o modelo personalizado). Réplica de
 * sele_o_de_modelo_animado do Stitch.
 */
export default function TemplateSelectionScreen({
  onSelectTemplate,
}: TemplateSelectionScreenProps) {
  return (
    <div className="flex flex-col px-container-padding max-w-2xl mx-auto w-full gap-4 pt-4 pb-28">
      {/* Card de cabeçalho */}
      <div className="bg-surface retro-border retro-shadow rounded-lg overflow-hidden mb-2">
        <div className="bg-tertiary-container border-b-3 border-on-surface px-4 py-2 flex items-center justify-between">
          <h1 className="font-headline-md text-headline-md text-on-surface">Selecione o Tipo</h1>
          <Icon name="description" />
        </div>
        <div className="p-4 bg-surface-bright font-body-md text-on-surface-variant">
          <p>Escolha um modelo de prontuário para iniciar o registro do plantão.</p>
        </div>
      </div>

      {/* Lista de modelos */}
      <div className="flex flex-col gap-4 w-full">
        {TEMPLATE_ORDER.map((type) => (
          <TemplateCard
            key={type}
            template={TEMPLATES[type]}
            onSelect={() => onSelectTemplate(type)}
          />
        ))}
      </div>

      {/* FAB: atalho para o modelo personalizado */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          type="button"
          onClick={() => onSelectTemplate("personalizado")}
          aria-label="Criar modelo personalizado"
          className="bg-secondary text-on-secondary retro-border retro-shadow retro-shadow-hover retro-shadow-active w-14 h-14 rounded-full flex items-center justify-center transition-all"
        >
          <Icon name="add" className="text-3xl" />
        </button>
      </div>
    </div>
  );
}
