import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import AppShell from "./components/AppShell";
import type { NavKey } from "./components/BottomNav";
import HandoverFormScreen from "./screens/HandoverFormScreen";
import HistoryScreen from "./screens/HistoryScreen";
import PreviewScreen from "./screens/PreviewScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SecretBirthdayScreen from "./screens/SecretBirthdayScreen";
import TemplateSelectionScreen from "./screens/TemplateSelectionScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import type { HandoverData, TemplateType } from "./types/handover";
import { buildWhatsappMessage } from "./utils/buildWhatsappMessage";
import { getSampleHandover, isHandoverEmpty } from "./utils/createHandover";
import { addHistoryItem, loadProfile, type HistoryItem } from "./utils/storage";
import { useHandoverStore } from "./hooks/useHandoverStore";
import { useToast } from "./hooks/useToast";

type Screen =
  | "welcome"
  | "templates"
  | "form"
  | "preview"
  | "history"
  | "profile"
  | "secretBirthday";

/** id curto e único o suficiente para itens de histórico locais. */
function makeId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const store = useHandoverStore();
  const toast = useToast();
  const [screen, setScreen] = useState<Screen>("welcome");
  // Dados do plantão atual (usados ao editar a partir da prévia).
  const [previewData, setPreviewData] = useState<HandoverData>(store.handover);
  // Mensagem exibida na prévia (calculada ao navegar — estática na tela).
  const [previewMessage, setPreviewMessage] = useState("");
  // true quando a prévia veio do histórico (volta para o histórico, não edita).
  const [fromHistory, setFromHistory] = useState(false);
  // Assinatura padrão atual (recarregada quando o perfil muda).
  const [signature, setSignature] = useState(() => loadProfile().signature);

  function handleSettings() {
    toast.show("Configurações em breve 💗", "settings");
  }

  function goHome() {
    setScreen("welcome");
  }
  function goTemplates() {
    setScreen("templates");
  }
  function goHistory() {
    setScreen("history");
  }
  function goProfile() {
    setScreen("profile");
  }

  function navigate(key: NavKey) {
    if (key === "home") goHome();
    else if (key === "models") goTemplates();
    else if (key === "history") goHistory();
    else if (key === "profile") goProfile();
  }

  function selectTemplate(type: TemplateType) {
    store.loadTemplate(type);
    setScreen("form");
  }

  function generate() {
    if (isHandoverEmpty(store.handover)) {
      toast.show("Preencha ao menos um campo 🐾", "edit");
      return;
    }
    const message = buildWhatsappMessage(store.handover, signature);
    setPreviewData(store.handover);
    setPreviewMessage(message);
    setFromHistory(false);
    // Salva no histórico local (dedup de mensagem repetida é feito no storage).
    const item: HistoryItem = {
      id: makeId(),
      createdAt: new Date().toISOString(),
      templateType: store.handover.templateType,
      patientName: store.handover.identification.patientName,
      message,
    };
    addHistoryItem(item);
    setScreen("preview");
  }

  function viewSample() {
    const sample = getSampleHandover();
    setPreviewData(sample);
    setPreviewMessage(buildWhatsappMessage(sample, signature));
    setFromHistory(false);
    setScreen("preview");
  }

  function viewHistoryItem(item: HistoryItem) {
    setPreviewMessage(item.message);
    setFromHistory(true);
    setScreen("preview");
  }

  function editFromPreview() {
    store.setHandover(previewData);
    setScreen("form");
  }

  // "Voltar"/"Editar" da prévia: histórico volta ao histórico; fluxo normal edita.
  function leavePreview() {
    if (fromHistory) {
      setFromHistory(false);
      goHistory();
    } else {
      editFromPreview();
    }
  }

  function refreshSignature() {
    setSignature(loadProfile().signature);
  }

  // Reflete a tela-surpresa na URL como "/surpresa" para que o Vercel Analytics
  // registre uma visualização identificável — sem alterar o roteamento por
  // estado do app (continua SPA). Ao sair, restaura a URL para "/".
  useEffect(() => {
    if (screen === "secretBirthday") {
      if (window.location.pathname !== "/surpresa") {
        window.history.pushState({}, "", "/surpresa");
      }
      // Se o usuário usar o "voltar" do navegador, volta ao Perfil.
      const onPop = () => setScreen("profile");
      window.addEventListener("popstate", onPop);
      return () => window.removeEventListener("popstate", onPop);
    }
    if (window.location.pathname === "/surpresa") {
      window.history.pushState({}, "", "/");
    }
  }, [screen]);

  // Aba ativa do dock, derivada da tela atual.
  let navActive: NavKey;
  if (screen === "welcome") navActive = "home";
  else if (screen === "history") navActive = "history";
  else if (screen === "profile" || screen === "secretBirthday") navActive = "profile";
  else if (screen === "preview" && fromHistory) navActive = "history";
  else navActive = "models";

  let content;
  let background = "bg-pattern";
  let showBack = false;
  let onBack: () => void = goHome;
  let hideNav = false;

  switch (screen) {
    case "welcome":
      background = "bg-pattern";
      showBack = false;
      onBack = goHome;
      content = <WelcomeScreen onNew={goTemplates} onViewSample={viewSample} />;
      break;
    case "templates":
      background = "bg-primary-container";
      showBack = true;
      onBack = goHome;
      content = <TemplateSelectionScreen onSelectTemplate={selectTemplate} />;
      break;
    case "form":
      background = "bg-brand-mint";
      showBack = true;
      onBack = goTemplates;
      hideNav = true;
      content = (
        <HandoverFormScreen
          handover={store.handover}
          onFieldChange={store.updateField}
          onCustomChange={store.updateCustomFieldValue}
          onAddCustomField={store.addCustomField}
          onCustomRemove={store.removeCustomField}
          onClear={store.clearForm}
          onGenerate={generate}
        />
      );
      break;
    case "preview":
      background = "bg-inverse-primary";
      showBack = true;
      onBack = leavePreview;
      content = (
        <PreviewScreen message={previewMessage} onEdit={leavePreview} showToast={toast.show} />
      );
      break;
    case "history":
      background = "bg-primary-container";
      showBack = true;
      onBack = goHome;
      content = <HistoryScreen onView={viewHistoryItem} showToast={toast.show} />;
      break;
    case "profile":
      background = "bg-primary-container";
      showBack = true;
      onBack = goHome;
      content = (
        <ProfileScreen
          showToast={toast.show}
          onProfileChange={refreshSignature}
          onUnlockSecret={() => setScreen("secretBirthday")}
        />
      );
      break;
    case "secretBirthday":
      background = "bg-pattern";
      showBack = true;
      onBack = goProfile;
      hideNav = true;
      content = <SecretBirthdayScreen onBack={goProfile} />;
      break;
  }

  return (
    <>
      <AppShell
        background={background}
        showBack={showBack}
        onBack={onBack}
        onSettings={handleSettings}
        navActive={navActive}
        onNavigate={navigate}
        hideNav={hideNav}
        toastMessage={toast.message}
        toastIcon={toast.icon}
      >
        {content}
      </AppShell>
      <Analytics />
    </>
  );
}
