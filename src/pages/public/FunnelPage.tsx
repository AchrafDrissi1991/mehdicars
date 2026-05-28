import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { LeadFunnel } from '../../components/funnel/LeadFunnel';
import { getLanguage } from '../../lib/language';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import '../../components/funnel/funnel.css';
import './landingPage.css';

export function FunnelPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { lang = 'fr', token } = useParams();
  const language = getLanguage(lang) as SupportedLanguage;
  const source = searchParams.get('source') ?? 'landing';

  return (
    <main className="landing-page funnel-page">
      <LandingTopBar />

      <section className="funnel-content">
        <div className="lead-funnel-shell lead-funnel-shell--redesign">
          <div className="funnel-intro">
            <span className="eyebrow">{pickText({ de: 'Gefuehrte Anfrage', en: 'Guided request', es: 'Solicitud guiada', fr: 'Demande guidée' }, language)}</span>
            <h1>{t('funnel.title')}</h1>
            <p>{t('funnel.subtitle')}</p>
          </div>

          <LeadFunnel language={language} source={source} token={token} />
        </div>
      </section>

      <footer className="funnel-footer">
        <div className="section-inner funnel-footer__inner">
          <SocialLinks />
        </div>
      </footer>
    </main>
  );
}
