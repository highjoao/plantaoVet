import BrutalButton from "../components/BrutalButton";
import FloatingDecorations from "../components/FloatingDecorations";
import PixelPetMonitor from "../components/PixelPetMonitor";

interface WelcomeScreenProps {
  onNew: () => void;
  onViewSample: () => void;
}

/**
 * Tela de boas-vindas. Card rosa com o gatinho no monitor, título, subtítulo,
 * CTAs "Novo plantão" / "Ver modelo" e nota afetuosa. Partículas fofas subindo.
 * Réplica fiel de boas_vindas_animado do Stitch.
 */
export default function WelcomeScreen({ onNew, onViewSample }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-container-padding pb-32 min-h-[calc(100dvh-64px)]">
      <FloatingDecorations variant="particles" />

      <div className="bg-secondary-container border-3 border-on-surface neo-shadow rounded-lg w-full max-w-sm flex flex-col items-center p-6 text-center animate-pop-in">
        <div className="bg-surface border-3 border-on-surface p-2 mb-6 neo-shadow rounded rotate-[-2deg] hover:rotate-0 transition-transform">
          <PixelPetMonitor className="w-32 h-24 border-2 border-on-surface block" />
        </div>

        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">PlantãoVet</h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant font-bold mb-4">
          Passe o plantão em poucos toques.
        </p>
        <p className="font-body-md text-body-md text-on-surface-variant mb-8 px-2">
          Preencha os dados do paciente e gere uma mensagem pronta para o WhatsApp.
        </p>

        <BrutalButton
          onClick={onNew}
          colorClass="bg-primary text-on-primary"
          icon="add_circle"
          iconFill
          fullWidth
          shine
          className="mb-4"
        >
          Novo plantão
        </BrutalButton>
        <BrutalButton
          onClick={onViewSample}
          colorClass="bg-tertiary-container text-on-tertiary-container"
          icon="visibility"
          fullWidth
          shine
        >
          Ver modelo
        </BrutalButton>
      </div>

      <p
        className="mt-8 font-pixel-data text-pixel-data text-on-surface-variant text-center opacity-80 animate-pop-in"
        style={{ animationDelay: "0.2s" }}
      >
        <b>feito com carinho para facilitar sua rotina 💗</b>
      </p>
    </div>
  );
}
