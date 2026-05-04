import { Button, Collapse } from 'antd';
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Handshake,
  MapPin,
  PlayCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react';
import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { faqItems, processSteps, testimonials } from '../../features/content/contentData';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import heroImageUrl from '../../../images/banner.png';
import cardAutoKaufenImageUrl from '../../../images/cardautokaufen.png';
import beratungFotoImageUrl from '../../../images/beratungfoto.png';
import './landingPage.css';

export function LandingPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = lang as SupportedLanguage;
  const funnelPath = `/${language}/${language === 'de' ? 'anfrage' : 'demande'}`;
  const privacyPath = `/${language}/${language === 'de' ? 'datenschutz' : 'confidentialite'}`;
  const heroStyle = { '--hero-image': `url(${heroImageUrl})` } as CSSProperties;

  const trustItems = [
    { icon: <MapPin size={19} />, key: 'germany', label: t('landing.trust.germany') },
    { icon: <Handshake size={19} />, key: 'guidance', label: t('landing.trust.guidance') },
    { icon: <ClipboardCheck size={19} />, key: 'structured', label: t('landing.trust.structured') },
    { icon: <ShieldCheck size={19} />, key: 'process', label: t('landing.trust.process') },
  ];

  const introBenefits = [
    t('landing.explanation.bullets.structured'),
    t('landing.explanation.bullets.criteria'),
    t('landing.explanation.bullets.communication'),
    t('landing.explanation.bullets.personal'),
  ];

  const advantageCards = [
    {
      description: t('landing.advantages.time.description'),
      icon: <Search size={28} />,
      title: t('landing.advantages.time.title'),
    },
    {
      description: t('landing.advantages.selection.description'),
      icon: <BadgeCheck size={28} />,
      title: t('landing.advantages.selection.title'),
    },
    {
      description: t('landing.advantages.support.description'),
      icon: <Handshake size={28} />,
      title: t('landing.advantages.support.title'),
    },
    {
      description: t('landing.advantages.summary.description'),
      icon: <FileText size={28} />,
      title: t('landing.advantages.summary.title'),
    },
  ];

  const landingFunnelSteps = [
    {
      description: t('landing.funnelPreview.steps.brand.description'),
      icon: <CarFront size={22} />,
      step: '01',
      title: t('landing.funnelPreview.steps.brand.title'),
    },
    {
      description: t('landing.funnelPreview.steps.criteria.description'),
      icon: <Search size={22} />,
      step: '02',
      title: t('landing.funnelPreview.steps.criteria.title'),
    },
    {
      description: t('landing.funnelPreview.steps.technical.description'),
      icon: <BadgeCheck size={22} />,
      step: '03',
      title: t('landing.funnelPreview.steps.technical.title'),
    },
    {
      description: t('landing.funnelPreview.steps.contact.description'),
      icon: <FileText size={22} />,
      step: '04',
      title: t('landing.funnelPreview.steps.contact.title'),
    },
  ];



  const germanyBullets = [
    t('landing.germany.bullets.choice'),
    t('landing.germany.bullets.variants'),
    t('landing.germany.bullets.search'),
    t('landing.germany.bullets.communication'),
  ];

  const processIcons = [ClipboardCheck, BadgeCheck, Search, FileText];

  return (
    <main className="page-shell landing-page">
      <LandingTopBar />

      <section className="hero-section" id="home" style={heroStyle}>
        <div className="section-inner hero-grid">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <Sparkles size={16} />
              {t('landing.hero.eyebrow')}
            </span>
            <h1>{t('landing.hero.title')}</h1>
            <p>{t('landing.hero.subtitle')}</p>
            <div className="hero-actions">
              <Button className="primary-cta hero-primary" type="primary" size="large" href={funnelPath}>
                {t('landing.hero.buyCta')}
                <ArrowRight size={18} />
              </Button>
              <Button className="ghost-cta hero-secondary" size="large" href="#contact">
                {t('landing.hero.advisoryCta')}
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
      </section>

     

      <section className="content-section vehicle-section">
        <div className="section-inner">
          <div className="vehicle-grid">
            <article className="vehicle-card vehicle-card--buy card-hover">
              <div className="vehicle-card__media" aria-hidden="true">
                <img alt="" loading="lazy" src={cardAutoKaufenImageUrl} />
              </div>
              <div className="vehicle-card__body">
                <h3 className="vehicle-card__title">{t('landing.vehicles.buy.title')}</h3>
                <p>{t('landing.vehicles.buy.description')}</p>
                <Button className="ghost-cta" size="large" href={funnelPath}>
                  {t('landing.vehicles.buy.cta')}
                  <ArrowRight size={17} />
                </Button>
              </div>
            </article>
            <article className="vehicle-card vehicle-card--advisory card-hover">
              <div className="vehicle-card__media" aria-hidden="true">
                <img alt="" loading="lazy" src={beratungFotoImageUrl} />
              </div>
              <div className="vehicle-card__body">
                <h3 className="vehicle-card__title">{t('landing.vehicles.advisory.title')}</h3>
                <p>{t('landing.vehicles.advisory.description')}</p>
                <Button className="ghost-cta" size="large" href="#contact">
                  {t('landing.vehicles.advisory.cta')}
                  <ArrowRight size={17} />
                </Button>
              </div>
            </article>
          </div>
        </div>
      </section>
          <section id="process" className="content-section process-section">
        <div className="section-inner">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">{t('landing.nav.process')}</span>
            <h2>{t('landing.process.title')}</h2>
            <p>{t('landing.process.subtitle')}</p>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => {
              const StepIcon = processIcons[index] ?? ClipboardCheck;

              return (
                <article className={`process-item ${index % 2 === 1 ? 'process-item--right' : ''}`} key={step.title.fr}>
                  <h3>
                    <span className="process-title-icon">
                      <StepIcon size={20} />
                    </span>
                    {pickText(step.title, language)}
                  </h3>
                  <p>{pickText(step.description, language)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      {/* <section className="intro-section explanation-section">
        <div className="section-inner intro-card explanation-card">
          <div className="intro-copy">
            <span className="eyebrow">{t('landing.explanation.eyebrow')}</span>
            <h2>{t('landing.explanation.title')}</h2>
            <p>{t('landing.explanation.description')}</p>
          </div>
          <div className="intro-panel">
            <div className="intro-benefits">
              <strong>{t('landing.explanation.cardTitle')}</strong>
              {introBenefits.map((benefit) => (
                <span key={benefit}>
                  <CheckCircle2 size={18} />
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      <section className="content-section services-section" id="services">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">{t('landing.advantages.eyebrow')}</span>
            <h2>{t('landing.advantages.title')}</h2>
            <p>{t('landing.advantages.subtitle')}</p>
          </div>
          <div className="advantages-grid">
            {advantageCards.map((item) => (
              <article className="advantage-card card-hover" key={item.title}>
                <span className="advantage-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
{/* 
      <section className="content-section funnel-preview-section">
        <div className="section-inner funnel-preview-grid">
          <div className="funnel-preview-copy">
            <span className="eyebrow">{t('landing.funnelPreview.eyebrow')}</span>
            <h2>{t('landing.funnelPreview.title')}</h2>
            <p>{t('landing.funnelPreview.description')}</p>
            <Button className="lift-button" type="primary" size="large" href={funnelPath}>
              {t('common.startRequest')}
              <ArrowRight size={18} />
            </Button>
          </div>
          <div className="funnel-steps-preview" aria-label={t('landing.funnelPreview.stepHint')}>
            <div className="funnel-steps-preview__header">
              <span>{t('landing.funnelPreview.stepHint')}</span>
              <strong>4</strong>
            </div>
            <div className="funnel-step-list">
              {landingFunnelSteps.map((item) => (
                <article className="funnel-step-preview" key={item.step}>
                  <span className="funnel-step-preview__number">{item.step}</span>
                  <span className="funnel-step-preview__icon">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section> */}

     

      <section className="content-section video-section">
        <div className="section-inner video-grid">
          <div className="video-placeholder">
            <PlayCircle size={48} />
            <span>{t('landing.video.eyebrow')}</span>
            <strong>{t('landing.video.title')}</strong>
            <p>{t('landing.video.text')}</p>
          </div>
          <div className="video-copy">
            <span className="eyebrow">{t('landing.video.eyebrow')}</span>
            <h2>{t('landing.video.title')}</h2>
            <p>{t('landing.video.text')}</p>
            <Button className="lift-button" type="primary" href={funnelPath}>
              {t('common.startRequest')}
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </section>

      <section className="content-section reviews-section">
        <div className="section-inner">
          <div className="section-heading">
            <span className="eyebrow">{t('landing.reviews.eyebrow')}</span>
            <h2>{t('landing.reviews.title')}</h2>
          </div>
          <div className="reviews-grid">
            {testimonials.map((testimonial) => (
              <article className="review-card card-hover" key={testimonial.name}>
                <div className="stars" aria-label={`${testimonial.rating}/5`}>
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <Star fill="currentColor" key={index} size={17} />
                  ))}
                </div>
                <p>{pickText(testimonial.text, language)}</p>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.country}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* <section className="content-section germany-section">
        <div className="section-inner germany-grid">
          <div className="germany-panel">
            <Search size={34} />
          </div>
          <div>
            <span className="eyebrow">{t('landing.germany.eyebrow')}</span>
            <h2>{t('landing.germany.title')}</h2>
            <p>{t('landing.germany.text')}</p>
            <div className="germany-bullets">
              {germanyBullets.map((bullet) => (
                <span key={bullet}>
                  <CheckCircle2 size={17} />
                  {bullet}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      

      <section id="faq" className="content-section faq-section">
        <div className="section-inner faq-grid">
          <div className="faq-copy">
            <span className="eyebrow">{t('landing.faq.eyebrow')}</span>
            <h2>{t('landing.faq.title')}</h2>
            <p>{t('landing.faq.subtitle')}</p>
          </div>
          <Collapse
            bordered={false}
            className="faq-collapse"
            expandIconPosition="end"
            items={faqItems.map((item, index) => ({
              key: index,
              label: pickText(item.question, language),
              children: <p>{pickText(item.answer, language)}</p>,
            }))}
          />
        </div>
      </section>

      <section id="contact" className="final-cta">
        <div className="section-inner final-cta-card">
          <div>
            <span className="eyebrow">{t('landing.nav.contact')}</span>
            <h2>{t('landing.contact.title')}</h2>
            <p>{t('landing.contact.text')}</p>
          </div>
          <div className="final-cta-actions">
            <Button className="primary-cta" type="primary" size="large" href={funnelPath}>
              {t('common.startRequest')}
              <ArrowRight size={18} />
            </Button>
            <SocialLinks variant="dark" />
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="section-inner footer-grid">
          <div className="footer-brand">
            <Link className="brand brand--footer" to={`/${language}`}>
              <span className="brand-mark">{t('landing.brandMark')}</span>
              <span>{t('landing.brand')}</span>
            </Link>
            <p>{t('landing.footer.description')}</p>
            <SocialLinks variant="dark" />
          </div>
          <div>
            <h3>{t('landing.footer.navigation')}</h3>
            <a href="#home">{t('landing.nav.home')}</a>
            <a href="#process">{t('landing.nav.process')}</a>
            <a href="#faq">{t('landing.nav.faq')}</a>
            <a href="#contact">{t('landing.nav.contact')}</a>
          </div>
          <div>
            <h3>{t('landing.footer.services')}</h3>
            <a href={funnelPath}>{t('landing.services.advisory.title')}</a>
            <a href="#services">{t('landing.services.sell.title')}</a>
          </div>
          <div>
            <h3>{t('landing.footer.legal')}</h3>
            <Link to={`/${language}/impressum`}>{t('landing.footer.imprint')}</Link>
            <Link to={privacyPath}>{t('landing.footer.privacy')}</Link>
            <p className="footer-note">{t('landing.footer.rights')}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
