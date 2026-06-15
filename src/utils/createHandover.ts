import { SECTION_ORDER } from "../data/fields";
import { TEMPLATES } from "../data/templates";
import type { CustomFieldEntry, HandoverData, TemplateType } from "../types/handover";

/** true se nenhum campo (fixo ou personalizado) tiver valor preenchido. */
export function isHandoverEmpty(handover: HandoverData): boolean {
  for (const section of SECTION_ORDER) {
    const data = handover[section] as unknown as Record<string, string> | undefined;
    if (data && Object.values(data).some((v) => typeof v === "string" && v.trim().length > 0)) {
      return false;
    }
  }

  // Verifica seções específicas de Internação comum
  if (handover.templateType === "internacao") {
    const id = handover.identification;
    const extras = [
      id.admittingVet,
      id.partnerVet,
      id.firstHospitalizationDateTime,
      id.suspicionsDiagnosis,
      id.shiftResponsible,
    ];
    if (extras.some((v) => v && v.trim().length > 0)) return false;

    for (const sec of [handover.subjetivo, handover.objetivo, handover.avaliacaoInternacao, handover.planoInternacao]) {
      if (sec && Object.values(sec).some((v) => typeof v === "string" && v.trim().length > 0)) {
        return false;
      }
    }
  }

  return !handover.customFields.some((f) => f.value.trim().length > 0);
}

/** Mapeia os campos extras de um template em entradas de campo (valor vazio). */
function presetCustomFields(templateType: TemplateType): CustomFieldEntry[] {
  return TEMPLATES[templateType].extraFields.map((f) => ({ ...f, value: "" }));
}

/** Cria um HandoverData vazio para o template informado. */
export function createEmptyHandover(templateType: TemplateType): HandoverData {
  const base: HandoverData = {
    templateType,
    identification: {
      patientName: "",
      tutor: "",
      species: templateType === "internacao" ? "🐶 Canino" : "Canina",
      breed: "",
      weight: "",
      bed: "",
      admittingVet: "",
      partnerVet: "",
      firstHospitalizationDateTime: "",
      suspicionsDiagnosis: "",
      shiftResponsible: "",
    },
    clinical: { reason: "", generalState: "", consciousness: "", pain: "" },
    parameters: {
      temperature: "",
      heartRate: "",
      respiratoryRate: "",
      bloodPressure: "",
      glycemia: "",
      mucous: "",
      tpc: "",
      hydration: "",
    },
    feedingElimination: {
      feeding: "",
      water: "",
      urine: "",
      feces: "",
      vomit: "",
      diarrhea: "",
    },
    medications: { administered: "", schedules: "", nextDoses: "" },
    evolution: { evolution: "", intercurrences: "", importantNotes: "" },
    pending: { pendingExams: "", nextShiftConduct: "", attentionPoints: "" },
    customFields: presetCustomFields(templateType),
  };

  if (templateType === "internacao") {
    return {
      ...base,
      subjetivo: { behaviorConsciousness: "", feedingWaterIntake: "", urineFeces: "" },
      objetivo: {
        clinicalParameters: "",
        painAssessment: "",
        woundLesionAssessment: "",
        neurologicalExam: "",
        orthopedicExam: "",
        reticulocytes: "",
        bloodCount: "",
        biochemistry: "",
        venousBloodGas: "",
        imagingMorning: "",
        imagingAfternoon: "",
        imagingNight: "",
      },
      avaliacaoInternacao: {
        assessment: "",
        therapeuticConduct: "",
        fluidTherapy: "",
        continuousInfusion: "",
        medications: "",
        performedProcedures: "",
      },
      planoInternacao: {
        generalPlanClassification: "",
        nextStepsPatient: "",
        tutorAlignment: "",
        tutorBulletin: "",
      },
    };
  }

  return base;
}

/** Dados de exemplo para o botão "Ver modelo" da tela inicial (Internação comum). */
export function getSampleHandover(): HandoverData {
  const base = createEmptyHandover("internacao");
  return {
    ...base,
    identification: {
      patientName: "Luna",
      tutor: "Marina",
      species: "🐶 Canino",
      breed: "SRD",
      weight: "8,4",
      bed: "",
      admittingVet: "Dra. Vanessa",
      partnerVet: "M.V. João",
      firstHospitalizationDateTime: "02/06 10:14",
      suspicionsDiagnosis: "Gastroenterite aguda; desidratação",
      shiftResponsible: "M.V. noturno",
    },
    subjetivo: {
      behaviorConsciousness: "Alerta, levemente apática",
      feedingWaterIntake: "Recusou ração; ingestão hídrica presente",
      urineFeces: "Urina presente; fezes amolecidas",
    },
    objetivo: {
      clinicalParameters:
        "20h00 FC 110, FR 28, T° 38,4, PAS 100, mucosas normocoradas, TPC 2s, NH -\n22h00 FC 104, FR 24, T° 38,2, PAS 105, mucosas normocoradas, TPC 2s, NH -",
      painAssessment: "Leve — escala 3/10",
      woundLesionAssessment: "Sem lesões externas",
      neurologicalExam: "Sem alterações",
      orthopedicExam: "Sem alterações",
      reticulocytes: "1,8%",
      bloodCount:
        "Data: 02/06\nHe: 5,2; Hb: 12; HCT: 36; PT: 6,8; Leucócitos totais: 12.000; Segmentados: 75; Bastonetes: 0; Plaquetas: 280.000",
      biochemistry:
        "Data: 02/06\nALT: 45; Creatinina: 0,8; Ureia: 32; Albumina: 2,9; Globulina: 3,0",
      venousBloodGas: "",
      imagingMorning: "Rx abdominal: distensão de alças intestinais leve",
      imagingAfternoon: "",
      imagingNight: "",
    },
    avaliacaoInternacao: {
      assessment: "Gastroenterite aguda com desidratação leve. Quadro compatível com infecção alimentar.",
      therapeuticConduct: "Fluidoterapia de reposição + suporte sintomático",
      fluidTherapy: "Ringer Lactato 10ml/h IV",
      continuousInfusion: "",
      medications:
        "• Dipirona 25mg/kg TID IV — analgesia/antitérmico\n• Metronidazol 15mg/kg BID IV — antiparasitário/antibacteriano\n• Ondansetrona 0,5mg/kg TID IV — antiemético",
      performedProcedures: "Acesso venoso periférico em MTA",
    },
    planoInternacao: {
      generalPlanClassification: "LIGHT",
      nextStepsPatient: "Reavaliar parâmetros às 06h; oferecer água e dieta leve ao amanhecer",
      tutorAlignment: "Explicado quadro e plano de internação; tutora informada por mensagem",
      tutorBulletin:
        "Olá Marina! A Luna está estável e sendo monitorada. Ela recebeu medicação e fluidoterapia. Seguimos acompanhando. Qualquer novidade te avisamos!",
    },
  };
}
