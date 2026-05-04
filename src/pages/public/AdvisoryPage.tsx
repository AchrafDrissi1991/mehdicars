import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { FunnelTopBar } from '../../components/funnel/FunnelTopBar';
import type { SupportedLanguage } from '../../types/i18n';
import designerHeroImageUrl from '../../../images/Designerimg.png';

export function AdvisoryPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = lang as SupportedLanguage;

  return (
    <main className="funnel-page">
      <FunnelTopBar current={1} total={1} showProgress={false} />

      <section className="funnel-hero" style={{ '--funnel-hero-image': `url(${designerHeroImageUrl})` } as CSSProperties}>
        <div className="section-inner funnel-hero__inner">
          <div className="funnel-hero__copy">
            <span className="funnel-hero__eyebrow">Mehdi cars</span>
            <h1>{t('advisory.title')}</h1>
            <p>{t('advisory.subtitle')}</p>
          </div>
        </div>
      </section>

      <section className="funnel-content">
        <div className="lead-funnel-shell">
          <div className="advisory-placeholder">
            <p>{t('advisory.comingSoon')}</p>
          </div>
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
