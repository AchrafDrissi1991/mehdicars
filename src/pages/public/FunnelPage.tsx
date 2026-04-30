import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { FunnelTopBar } from '../../components/funnel/FunnelTopBar';
import { LeadFunnel } from '../../components/funnel/LeadFunnel';
import type { SupportedLanguage } from '../../types/i18n';

export function FunnelPage() {
  const [searchParams] = useSearchParams();
  const { lang = 'fr', token } = useParams();
  const language = lang as SupportedLanguage;
  const [currentStep, setCurrentStep] = useState(1);
  const source = searchParams.get('source') ?? 'landing';

  return (
    <main className="funnel-page">
      <FunnelTopBar current={currentStep} total={4} />
      <section className="funnel-content">
        <div className="lead-funnel-shell">
          <LeadFunnel language={language} source={source} token={token} onStepChange={setCurrentStep} />
        </div>
      </section>
    </main>
  );
}
