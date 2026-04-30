import { Alert, Button, Checkbox } from 'antd';
import type { KeyboardEvent } from 'react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { FunnelTopBar } from '../../components/funnel/FunnelTopBar';
import { QuestionRenderer } from '../../components/funnel/QuestionRenderer';
import { funnelQuestions } from '../../features/funnel/questions';
import { createLead } from '../../services/leadService';
import type { FunnelAnswers, FunnelQuestion } from '../../types/funnel';
import type { SupportedLanguage } from '../../types/i18n';

export function FunnelPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang = 'fr', token } = useParams();
  const language = lang as SupportedLanguage;
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<FunnelAnswers>({});
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const groupedQuestions = useMemo(() => {
    return funnelQuestions.reduce<Record<number, FunnelQuestion[]>>((groups, question) => {
      groups[question.step] = [...(groups[question.step] ?? []), question];
      return groups;
    }, {});
  }, []);

  const totalSteps = Object.keys(groupedQuestions).length;
  const currentQuestions = groupedQuestions[currentStep] ?? [];
  const isLastStep = currentStep === totalSteps;

  function updateAnswer(key: string, value: FunnelAnswers[string]) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: '' }));
  }

  function validateStep() {
    const nextErrors: Record<string, string> = {};

    currentQuestions.forEach((question) => {
      const value = answers[question.key];
      const isEmpty = value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

      if (question.required && isEmpty) {
        nextErrors[question.key] = t('funnel.required');
      }
    });

    if (isLastStep && !privacyAccepted) {
      nextErrors.privacy = t('funnel.required');
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleNext() {
    if (!validateStep()) {
      return;
    }

    if (!isLastStep) {
      setCurrentStep((step) => step + 1);
      return;
    }

    const source = searchParams.get('source') ?? 'whatsapp';
    const createdLead = await createLead({ answers, language, source, token });
    navigate(`/${language}/${language === 'de' ? 'danke' : 'merci'}?report=${createdLead.reportToken}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    if (event.key !== 'Enter' || event.shiftKey || target.tagName === 'TEXTAREA') {
      return;
    }

    event.preventDefault();
    void handleNext();
  }

  return (
    <main className="funnel-page">
      <FunnelTopBar current={currentStep} total={totalSteps} />
      <section className="funnel-content">
        <div className="funnel-shell">
          <div className="question-card" onKeyDown={handleKeyDown}>
            <h1>{t('funnel.title')}</h1>
            <p>{t('funnel.subtitle')}</p>

            <div className="question-list">
              {currentQuestions.map((question) => (
                <div className="question-field" key={question.id}>
                  <label htmlFor={question.key}>
                    {question.label[language]} {question.required && <span className="required-dot">*</span>}
                  </label>
                  <QuestionRenderer
                    answers={answers}
                    language={language}
                    question={question}
                    onChange={updateAnswer}
                  />
                  {errors[question.key] && <span className="field-error">{errors[question.key]}</span>}
                </div>
              ))}
            </div>

            {isLastStep && (
              <div className="privacy-row">
                <Checkbox checked={privacyAccepted} onChange={(event) => setPrivacyAccepted(event.target.checked)}>
                  {t('funnel.privacy')}
                </Checkbox>
                {errors.privacy && <Alert type="error" showIcon message={errors.privacy} />}
              </div>
            )}

            <div className="funnel-actions">
              <Button disabled={currentStep === 1} onClick={() => setCurrentStep((step) => step - 1)}>
                {t('common.back')}
              </Button>
              <Button type="primary" onClick={() => void handleNext()}>
                {isLastStep ? t('common.submit') : t('common.next')}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
