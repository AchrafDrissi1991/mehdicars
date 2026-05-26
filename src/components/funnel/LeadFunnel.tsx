import { Progress } from 'antd';
import type { KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';
import { createLead } from '../../services/leadService';
import type { SupportedLanguage } from '../../types/i18n';
import type { LeadFormData, LeadFormDraft } from '../../types/lead';
import { FunnelNavigation } from './FunnelNavigation';
import { StepBrand } from './StepBrand';
import { StepContact } from './StepContact';
import { StepTechnicalPreferences } from './StepTechnicalPreferences';
import { SuccessStep } from './SuccessStep';

interface LeadFunnelProps {
  language: SupportedLanguage;
  source?: string;
  token?: string;
  onStepChange?: (step: number) => void;
}

const totalSteps = 3;
const currentYear = new Date().getFullYear();
const initialMaxMileage = 80000;
const initialBudget = 30000;

function isBlank(value: unknown) {
  return typeof value !== 'string' || value.trim().length === 0;
}

export function LeadFunnel({ language, source, token, onStepChange }: LeadFunnelProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormDraft>({
    brand: '',
    gearbox: [],
    fuel: [],
    fullName: '',
    language,
    minYear: currentYear,
    maxMileage: initialMaxMileage,
    budget: initialBudget,
    phone: '',
    privacyConsent: false,
    purchaseTimeline: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReportToken, setSubmittedReportToken] = useState<string>();

  const progress = useMemo(() => Math.round((currentStep / totalSteps) * 100), [currentStep]);
  const requiredMessage = language === 'fr' ? 'Ce champ est obligatoire.' : 'Dieses Feld ist erforderlich.';

  function setStep(step: number) {
    setCurrentStep(step);
    onStepChange?.(step);
  }

  function updateFormData(partialData: Partial<LeadFormDraft>) {
    setFormData((current) => ({ ...current, ...partialData }));
    setErrors((current) => {
      const nextErrors = { ...current };
      Object.keys(partialData).forEach((key) => {
        delete nextErrors[key];
      });
      delete nextErrors.criteria;
      return nextErrors;
    });
  }

  function validateStep(step: number) {
    const nextErrors: Record<string, string> = {};

    if (step === 1) {
      if (isBlank(formData.brand)) {
        nextErrors.brand = requiredMessage;
      }
      if (formData.brand === 'Autre' && isBlank(formData.otherBrand)) {
        nextErrors.otherBrand = requiredMessage;
      }
    }

    if (step === 2 && isBlank(formData.vehicleTypeOrModel) && !formData.budget) {
      nextErrors.criteria =
        language === 'fr'
          ? 'Veuillez indiquer un véhicule recherché ou un budget.'
          : 'Bitte geben Sie einen Fahrzeugwunsch oder ein Budget an.';
    }

    if (step === 2) {
      if (!formData.gearbox?.length) {
        nextErrors.gearbox = requiredMessage;
      }
      if (!formData.fuel?.length) {
        nextErrors.fuel = requiredMessage;
      }
    }

    if (step === 3) {
      if (isBlank(formData.fullName)) {
        nextErrors.fullName = requiredMessage;
      }
      if (isBlank(formData.email)) {
        nextErrors.email = requiredMessage;
      }
      if (isBlank(formData.phone)) {
        nextErrors.phone = requiredMessage;
      }
      if (!formData.privacyConsent) {
        nextErrors.privacyConsent =
          language === 'fr'
            ? 'Veuillez accepter la politique de confidentialité avant l’envoi.'
            : 'Bitte akzeptieren Sie vor dem Absenden die Datenschutzhinweise.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit() {
    const lead: LeadFormData = {
      ...formData,
      brand: formData.brand,
      fullName: formData.fullName ?? '',
      language,
      phone: formData.phone ?? '',
      createdAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    try {
      const createdLead = await createLead({ lead, language, source, token });
      setSubmittedReportToken(createdLead.reportToken);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNext() {
    if (!validateStep(currentStep)) {
      return;
    }

    if (currentStep < totalSteps) {
      setStep(currentStep + 1);
      return;
    }

    void handleSubmit();
  }

  function handlePrevious() {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    if (event.key !== 'Enter' || event.shiftKey || target.tagName === 'TEXTAREA') {
      return;
    }

    event.preventDefault();
    handleNext();
  }

  if (submittedReportToken) {
    return <SuccessStep language={language} reportToken={submittedReportToken} />;
  }

  return (
    <div className="lead-funnel-card" onKeyDown={handleKeyDown}>
      <div className="lead-funnel-progress">
        <span>
          {language === 'fr' ? 'ÉTAPE' : 'SCHRITT'} {currentStep} / {totalSteps}
        </span>
        <Progress percent={progress} showInfo={false} />
      </div>

      {currentStep === 1 && <StepBrand data={formData} errors={errors} language={language} updateFormData={updateFormData} />}
      {currentStep === 2 && <StepTechnicalPreferences data={formData} errors={errors} language={language} updateFormData={updateFormData} />}
      {currentStep === 3 && <StepContact data={formData} errors={errors} language={language} updateFormData={updateFormData} />}

      <FunnelNavigation
        currentStep={currentStep}
        isNextDisabled={isSubmitting}
        isSubmitting={isSubmitting}
        language={language}
        totalSteps={totalSteps}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}
