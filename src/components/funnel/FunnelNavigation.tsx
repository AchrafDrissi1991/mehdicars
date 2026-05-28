import { Button } from 'antd';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';

interface FunnelNavigationProps {
  currentStep: number;
  isNextDisabled: boolean;
  isSubmitting: boolean;
  language: SupportedLanguage;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export function FunnelNavigation({
  currentStep,
  isNextDisabled,
  isSubmitting,
  language,
  totalSteps,
  onNext,
  onPrevious,
}: FunnelNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="lead-funnel-navigation">
      <Button className="funnel-prev-button" disabled={isFirstStep} onClick={onPrevious}>
        {pickText({ de: 'Zurueck', en: 'Back', es: 'Atras', fr: 'Précédent' }, language)}
      </Button>
      <span>
        {pickText({ de: 'SCHRITT', en: 'STEP', es: 'PASO', fr: 'ÉTAPE' }, language)} {currentStep} / {totalSteps}
      </span>
      <Button type="primary" disabled={isNextDisabled} loading={isSubmitting} onClick={onNext}>
        {isLastStep
          ? pickText({ de: 'Absenden', en: 'Submit', es: 'Enviar', fr: 'Envoyer' }, language)
          : pickText({ de: 'Weiter', en: 'Next', es: 'Siguiente', fr: 'Suivant' }, language)}
      </Button>
    </div>
  );
}
