import { Button } from 'antd';
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
        {language === 'fr' ? 'Précédent' : 'Zurück'}
      </Button>
      <span>
        {language === 'fr' ? 'ÉTAPE' : 'SCHRITT'} {currentStep} / {totalSteps}
      </span>
      <Button type="primary" disabled={isNextDisabled} loading={isSubmitting} onClick={onNext}>
        {isLastStep ? (language === 'fr' ? 'Envoyer' : 'Absenden') : language === 'fr' ? 'Suivant' : 'Weiter'}
      </Button>
    </div>
  );
}
