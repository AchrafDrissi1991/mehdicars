import { Button, Collapse } from 'antd';
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  ChevronLeft,
  ChevronRight,
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
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { faqItems, galleryItems, mediaItems, processSteps, testimonials } from '../../features/content/contentData';
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

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleGalleryPrev = () => {
    setGalleryIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const handleGalleryNext = () => {
    setGalleryIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

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

  const serviceDetailsSectionCopy = {
    eyebrow: { de: 'Service-Details', fr: 'Details du service' },
    title: { de: 'So funktioniert der Fahrzeugservice', fr: 'Comment fonctionne le service vehicule' },
  };

  const serviceDetailsSteps = [
    {
      description: {
        de: 'Fahrzeug auf mobile.de, AutoScout24 oder einer anderen Boerse finden und den Link zur Pruefung einsenden.',
        fr: 'Trouvez le vehicule sur mobile.de, AutoScout24 ou une autre bourse et envoyez le lien pour verification.',
      },
      title: { de: 'Fahrzeugsuche', fr: 'Recherche du vehicule' },
    },
    {
      description: {
        de: 'Der Haendler wird direkt kontaktiert und alle wichtigen Daten geprueft: Unfallhistorie, Servicehistorie, Vorbesitzer, technischer Zustand und Laufleistung.',
        fr: 'Le vendeur est contacte et les points cles verifies: historique des accidents, entretien, anciens proprietaires, etat technique et kilometrage.',
      },
      title: { de: 'Haendlerkontakt & Informationspruefung', fr: 'Contact vendeur & verification des informations' },
    },
    {
      description: {
        de: 'Das Fahrzeug wird persoenlich vor Ort geprueft: Karosserie, Motor, Innenraum, Reifen, Bremsen, Elektronik und eventuelle Maengel.',
        fr: 'Le vehicule est inspecte sur place: carrosserie, moteur, interieur, pneus, freins, electronique et eventuels defauts.',
      },
      note: {
        de: 'Zusaetzlich erhalten Sie Fotos, Videos sowie eine ehrliche Einschaetzung zum Fahrzeugzustand.',
        fr: 'En plus, vous recevez des photos, des videos et une evaluation honnete de l\'etat du vehicule.',
      },
      title: { de: 'Vor-Ort-Fahrzeugpruefung', fr: 'Inspection du vehicule sur place' },
    },
    {
      description: {
        de: 'Alle Unterlagen werden vorbereitet und der Kauf abgewickelt: Vertrag, Dokumente, Reservierung und Abstimmung bis zur Fahrzeugabholung.',
        fr: 'Tous les documents sont prepares et l\'achat finalise: contrat, documents, reservation et coordination jusqu\'au retrait du vehicule.',
      },
      title: { de: 'Kaufabwicklung', fr: 'Finalisation de l\'achat' },
    },
  ];

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

     

      <section className="content-section vehicle-section section-tone-light">
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

      <section className="content-section process-section service-details-section section-tone-soft">
        <div className="section-inner">
          <div className="section-heading section-heading--center service-details-heading">
            <span className="eyebrow">{pickText(serviceDetailsSectionCopy.eyebrow, language)}</span>
            <h2>{pickText(serviceDetailsSectionCopy.title, language)}</h2>
          </div>
          <div className="service-details-simple">
            <div className="service-details-list" role="list">
              {serviceDetailsSteps.map((step, index) => (
                <article className="service-details-item" key={step.title.de} role="listitem">
                  <span className="service-details-item__number">{index + 1}</span>
                  <div className="service-details-item__text">
                    <h3>{pickText(step.title, language).replace(/^\d+\.\s*/, '')}</h3>
                    <p>{pickText(step.description, language)}</p>
                    {step.note && <p>{pickText(step.note, language)}</p>}
                  </div>
                </article>
              ))}
            </div>

            <div className="service-details-visual" aria-hidden="true">
              <img alt="" loading="lazy" src={beratungFotoImageUrl} />
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="content-section process-section section-tone-light">
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

      {/* <section className="content-section services-section" id="services">
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
      </section> */}

    
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

     

      {/* <section className="content-section video-section section-tone-soft">
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

      <section className="content-section media-section section-tone-soft">
        <div className="section-inner">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">
              {language === 'de' ? 'Video & Medien' : 'Vidéo & Médias'}
            </span>
            <h2>
              {language === 'de' ? 'Entdecken Sie unsere Video-Inhalte' : 'Découvrez nos contenus vidéo'}
            </h2>
            <p>
              {language === 'de'
                ? 'Leitfäden, Tipps und Einblicke in unser Fahrzeuginspektionsverfahren'
                : 'Guides, conseils et aperçus de notre processus d\'inspection'}
            </p>
          </div>
          <div className="media-grid">
            {mediaItems.map((media) => (
              <article className="media-card card-hover" key={media.id}>
                <button
                  className="media-card__thumbnail"
                  type="button"
                  onClick={() => setActiveVideo(media.youtubeId)}
                  aria-label={pickText(media.title, language)}
                >
                  <img
                    alt={pickText(media.title, language)}
                    loading="lazy"
                    src={`https://img.youtube.com/vi/${media.youtubeId}/maxresdefault.jpg`}
                  />
                  <span className="media-card__play">
                    <PlayCircle size={48} />
                  </span>
                  {media.duration && <span className="media-card__duration">{media.duration}</span>}
                </button>
                <div className="media-card__content">
                  <span className="media-card__category">{pickText(media.category, language)}</span>
                  <h3>{pickText(media.title, language)}</h3>
                  <p>{pickText(media.description, language)}</p>
                </div>
              </article>
            ))}
          </div>

          {activeVideo && (
            <div className="video-modal-overlay" onClick={() => setActiveVideo(null)}>
              <div className="video-modal" onClick={(e) => e.stopPropagation()}>
                <button
                  className="video-modal__close"
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Schließen"
                >
                  ✕
                </button>
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                  title="YouTube video"
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="content-section gallery-section section-tone-light">
        <div className="section-inner">
          <div className="section-heading section-heading--center">
            <span className="eyebrow">{language === 'de' ? 'Album-Katalog' : 'Catalogue Album'}</span>
            <h2>{language === 'de' ? 'Unsere Fahrzeugalben' : 'Nos albums vehicules'}</h2>
            <p>
              {language === 'de'
                ? 'Entdecken Sie unser Album und erleben Sie besondere Momente rund um unsere Fahrzeuge.'
                : 'Découvrez notre album et explorez nos véhicules sous tous les angles.'}
            </p>
          </div>

          <div className="gallery-catalog">
            <button
              className="gallery-nav gallery-nav--prev"
              type="button"
              onClick={handleGalleryPrev}
              aria-label={language === 'de' ? 'Vorheriges Bild' : 'Image precedente'}
            >
              <ChevronLeft size={22} />
            </button>

            <div className="gallery-catalog__frame">
              <img
                alt={pickText(galleryItems[galleryIndex].alt, language)}
                loading="lazy"
                src={galleryItems[galleryIndex].image}
              />
              <span className="gallery-catalog__count">
                {galleryIndex + 1} / {galleryItems.length}
              </span>
            </div>

            <button
              className="gallery-nav gallery-nav--next"
              type="button"
              onClick={handleGalleryNext}
              aria-label={language === 'de' ? 'Naechstes Bild' : 'Image suivante'}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="gallery-strip" role="tablist" aria-label={language === 'de' ? 'Bilderliste' : 'Liste images'}>
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                className={`gallery-thumb ${index === galleryIndex ? 'gallery-thumb--active' : ''}`}
                type="button"
                onClick={() => setGalleryIndex(index)}
                aria-label={pickText(item.title, language)}
              >
                <img alt={pickText(item.alt, language)} loading="lazy" src={item.image} />
                <span>{pickText(item.title, language)}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="content-section faq-section section-tone-soft">
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
