import { useState } from "react";
import BrutalButton from "../components/BrutalButton";
import BrutalInput from "../components/BrutalInput";
import BrutalTextarea from "../components/BrutalTextarea";
import PixelPetMonitor from "../components/PixelPetMonitor";
import { clearProfile, loadProfile, saveProfile, type ProfileData } from "../utils/storage";

interface ProfileScreenProps {
  showToast: (message: string, icon?: string) => void;
  /** Notifica o App para recarregar a assinatura usada nas mensagens. */
  onProfileChange: () => void;
}

const EMPTY: ProfileData = { vetName: "", clinic: "", signature: "" };

/**
 * Perfil da veterinária. Personaliza detalhes exibidos na rotina.
 * Mantém a linguagem visual: card retro com o gatinho no monitor e inputs
 * brutalistas. Tudo persistido localmente (sem backend).
 */
export default function ProfileScreen({ showToast, onProfileChange }: ProfileScreenProps) {
  const [profile, setProfile] = useState<ProfileData>(() => loadProfile());

  function update(key: keyof ProfileData, value: string) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    saveProfile(profile);
    onProfileChange();
    showToast("Perfil salvo! 💗", "favorite");
  }

  function handleClear() {
    clearProfile();
    setProfile({ ...EMPTY });
    onProfileChange();
    showToast("Perfil limpo 🐾", "delete");
  }

  return (
    <div className="flex flex-col px-container-padding max-w-2xl mx-auto w-full gap-4 pt-4 pb-28">
      {/* Cabeçalho */}
      <div className="bg-surface retro-border retro-shadow rounded-lg overflow-hidden mb-2">
        <div className="bg-secondary-container border-b-3 border-on-surface px-4 py-2 flex items-center justify-between">
          <h1 className="font-headline-md text-headline-md text-on-surface">Perfil</h1>
        </div>
        <div className="p-4 bg-surface-bright font-body-md text-on-surface-variant">
          <p>Personalize os detalhes que aparecem na sua rotina.</p>
        </div>
      </div>

      {/* Card do perfil com o gatinho */}
      <div className="bg-secondary-container border-3 border-on-surface neo-shadow rounded-lg flex flex-col items-center p-6 gap-5 animate-pop-in">
        <div className="bg-surface border-3 border-on-surface p-2 neo-shadow rounded rotate-[-2deg] hover:rotate-0 transition-transform">
          <PixelPetMonitor className="w-28 h-20 border-2 border-on-surface block" />
        </div>

        <div className="w-full flex flex-col gap-4">
          <BrutalInput
            label="Nome da veterinária"
            value={profile.vetName}
            onChange={(e) => update("vetName", e.target.value)}
            placeholder="Ex: Dra. Bárbara"
          />
          <BrutalInput
            label="Clínica / Hospital"
            value={profile.clinic}
            onChange={(e) => update("clinic", e.target.value)}
            placeholder="Ex: Hospital +Pet"
          />
          <BrutalTextarea
            label="Assinatura padrão"
            value={profile.signature}
            onChange={(e) => update("signature", e.target.value)}
            placeholder="Ex: Dra. Bárbara — Hospital Vet Luna 🐾"
          />
        </div>

        <div className="w-full flex flex-col gap-3">
          <BrutalButton
            onClick={handleSave}
            colorClass="bg-primary text-on-primary"
            icon="save"
            iconFill
            fullWidth
          >
            Salvar perfil
          </BrutalButton>
          <BrutalButton
            onClick={handleClear}
            colorClass="bg-surface text-on-surface"
            icon="delete"
            fullWidth
          >
            Limpar perfil
          </BrutalButton>
        </div>

        <p className="font-pixel-data text-pixel-data text-on-surface-variant text-center opacity-80">
          A assinatura entra no final das mensagens geradas. 💗
        </p>
      </div>
    </div>
  );
}
