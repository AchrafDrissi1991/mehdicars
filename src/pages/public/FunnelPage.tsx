import { useState } from 'react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { LeadFunnel } from '../../components/funnel/LeadFunnel';
import type { SupportedLanguage } from '../../types/i18n';
import designerHeroImageUrl from '../../../images/Designerimg.png';
import '../../components/funnel/funnel.css';
import './landingPage.css';

export function FunnelPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { lang = 'fr', token } = useParams();
  const language = lang as SupportedLanguage;
  const [currentStep, setCurrentStep] = useState(1);
  const source = searchParams.get('source') ?? 'landing';
  const funnelAdvantages = [
    {
      title: t('landing.advantages.time.title'),
      description: t('landing.advantages.time.description'),
    },
    {
      title: t('landing.advantages.selection.title'),
      description: t('landing.advantages.selection.description'),
    },
    {
      title: t('landing.advantages.support.title'),
      description: t('landing.advantages.support.description'),
    },
    {
      title: t('landing.advantages.summary.title'),
      description: t('landing.advantages.summary.description'),
    },
  ];

  return (
    <main className="landing-page funnel-page">
      <LandingTopBar />

      <section className="funnel-hero" style={{ '--funnel-hero-image': `url(${designerHeroImageUrl})` } as CSSProperties}>
        <div className="section-inner funnel-hero__inner">
          <div className="funnel-hero__copy">
            <span className="funnel-hero__eyebrow">Mehdi cars</span>
            <h1>{t('funnel.title')}</h1>
            <p>{t('funnel.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="funnel-content">
        <div className="lead-funnel-shell">
          <LeadFunnel language={language} source={source} token={token} onStepChange={setCurrentStep} />
        </div>
      </section>

      {/* <section className="funnel-advantages">
        <div className="section-inner">
          <div className="funnel-advantages__heading">
            <span>{t('landing.advantages.eyebrow')}</span>
            <h2>{t('landing.advantages.title')}</h2>
            <p>{t('landing.advantages.subtitle')}</p>
          </div>

          <div className="funnel-advantages__grid">
            {funnelAdvantages.map((item) => (
              <article className="funnel-advantages__item" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section> */}

      <footer className="funnel-footer">
        <div className="section-inner funnel-footer__inner">
          <SocialLinks />
        </div>
      </footer>
    </main>
  );
}
