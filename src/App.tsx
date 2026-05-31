import { useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import type { NavKey } from "./components/BottomNav";
import HandoverFormScreen from "./screens/HandoverFormScreen";
import PreviewScreen from "./screens/PreviewScreen";
import TemplateSelectionScreen from "./screens/TemplateSelectionScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import type { HandoverData, TemplateType } from "./types/handover";
import { buildWhatsappMessage } from "./utils/buildWhatsappMessage";
import { getSampleHandover, isHandoverEmpty } from "./utils/createHandover";
import { useHandoverStore } from "./hooks/useHandoverStore";
import { useToast } from "./hooks/useToast";

type Screen = "welcome" | "templates" | "form" | "preview";

export default function App() {
  const store = useHandoverStore();
  const toast = useToast();
  const [screen, setScreen] = useState<Screen>("welcome");
  // Dados exibidos na prévia (plantão atual ou exemplo de "Ver modelo").
  const [previewData, setPreviewData] = useState<HandoverData>(store.handover);

  const previewMessage = useMemo(() => buildWhatsappMessage(previewData), [previewData]);

  function handleSettings() {
    toast.show("Configurações em breve 💗", "settings");
  }
  function handleUnavailable(label: string) {
    toast.show(`${label}: em breve 💗`, "schedule");
  }

  function goHome() {
    setScreen("welcome");
  }
  function goTemplates() {
    setScreen("templates");
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
    setPreviewData(store.handover);
    setScreen("preview");
  }
  function viewSample() {
    setPreviewData(getSampleHandover());
    setScreen("preview");
  }
  function editFromPreview() {
    store.setHandover(previewData);
    setScreen("form");
  }

  const navActive: NavKey = screen === "welcome" ? "home" : "patients";

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
      onBack = editFromPreview;
      content = (
        <PreviewScreen message={previewMessage} onEdit={editFromPreview} showToast={toast.show} />
      );
      break;
  }

  return (
    <AppShell
      background={background}
      showBack={showBack}
      onBack={onBack}
      onSettings={handleSettings}
      navActive={navActive}
      onHome={goHome}
      onUnavailable={handleUnavailable}
      hideNav={hideNav}
      toastMessage={toast.message}
      toastIcon={toast.icon}
    >
      {content}
    </AppShell>
  );
}
