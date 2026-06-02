import { useState } from "react";
import BrutalButton from "../components/BrutalButton";
import Icon from "../components/Icon";

interface SecretBirthdayScreenProps {
  onBack: () => void;
}

const VIDEO_SRC = "/assets/secret/aniversario-jotaba.mp4";

/**
 * Tela-surpresa de aniversário (acesso por código). Mantém a identidade visual:
 * janela retrô com borda grossa e sombra offset, tons pastel. Carrega um vídeo
 * dentro de uma moldura retrô; se ele falhar/estiver ausente, mostra um aviso
 * carinhoso sem quebrar nada.
 */
export default function SecretBirthdayScreen({ onBack }: SecretBirthdayScreenProps) {
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <div className="flex flex-col px-container-padding max-w-2xl mx-auto w-full gap-4 pt-4 pb-10">
      {/* Janela retrô */}
      <div className="bg-secondary-container border-3 border-on-surface neo-shadow rounded-lg overflow-hidden animate-pop-in">
        <div className="bg-[#FF9EC6] border-b-3 border-on-surface px-4 py-4 min-h-[96px] flex items-center justify-center text-center">
          <h1 className="font-headline-md text-[24px] leading-[30px] text-on-surface m-0 max-w-[240px] mx-auto text-center">
            Uma mensagem só pra você
            <span className="block text-[26px] leading-none mt-1">🎂 💗</span>
          </h1>
        </div>

        <div className="p-5 bg-surface-bright flex flex-col items-center gap-5 text-center">
          <p className="font-body-lg text-body-lg text-on-surface font-bold">
            Feliz aniversário, minha veterinária favorita.
          </p>

          {/* Moldura retrô do vídeo */}
          <div className="w-full max-w-full overflow-hidden bg-[#FFF3C7] border-3 border-on-surface neo-shadow rounded-md p-2">
            {videoFailed ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 px-4">
                <Icon name="favorite" fill className="text-4xl text-[#FF7A45]" />
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Não consegui carregar o vídeo ainda, mas a surpresa está preparada 💗
                </p>
              </div>
            ) : (
              <video
                className="w-full max-w-full h-auto block rounded border-2 border-on-surface bg-on-surface"
                controls
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            )}
          </div>

          <BrutalButton
            onClick={onBack}
            colorClass="bg-primary text-on-primary"
            icon="arrow_back"
            fullWidth
          >
            Voltar
          </BrutalButton>
        </div>
      </div>
    </div>
  );
}
