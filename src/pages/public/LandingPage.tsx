import { Button, Collapse } from 'antd';
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Check,
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
import type { CSSProperties, TouchEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { faqItems, galleryItems, mediaItems, testimonials } from '../../features/content/contentData';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import heroImageUrl from '../../../images/bannerfix2.png';
import bannerFixTwoImageUrl from '../../../images/bannerfix2.png';
import mehdiClaGrayImageUrl from '../../../images/mehdi_cla_gray.png';
import mehdiCarsLogoUrl from '../../../images/mehdi_cars_logo.svg';
import './landingPage.css';

export function LandingPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = lang as SupportedLanguage;
  const funnelPath = `/${language}/${language === 'de' ? 'anfrage' : 'demande'}`;
  const advisoryPath = `/${language}/${language === 'de' ? 'beratung' : 'conseil'}`;
  const privacyPath = `/${language}/${language === 'de' ? 'datenschutz' : 'confidentialite'}`;
  const heroStyle = {
    '--hero-image': `url(${heroImageUrl})`,
    '--hero-image-mobile': `url(${mehdiClaGrayImageUrl})`,
  } as CSSProperties;

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [serviceExplanationVisible, setServiceExplanationVisible] = useState(false);
  const [serviceJourneyVisible, setServiceJourneyVisible] = useState(false);
  const serviceExplanationRef = useRef<HTMLElement | null>(null);
  const serviceJourneyRef = useRef<HTMLElement | null>(null);
  const touchIntentRef = useRef({ startX: 0, startY: 0, moved: false });

  const serviceDetailsSteps = [
    {
      id: 1,
      label: { de: 'SCHRITT 01', fr: 'ÉTAPE 01' },
      description: {
        de: 'Sie finden Ihr Wunschfahrzeug über bekannte Fahrzeugbörsen und senden uns einfach den Link zur Prüfung.',
        fr: 'Vous trouvez votre véhicule idéal sur une plateforme reconnue et nous envoyez simplement le lien pour vérification.',
      },
      title: { de: 'Fahrzeugsuche', fr: 'Recherche du véhicule' },
      bullets: {
        de: ['mobile.de', 'AutoScout24', 'Vergleichbare Fahrzeugbörsen', 'Link direkt an uns senden'],
        fr: ['mobile.de', 'AutoScout24', 'Plateformes similaires', 'Envoi direct du lien'],
      },
      links: [
        { href: 'https://www.mobile.de', label: 'mobile.de' },
        { href: 'https://www.autoscout24.de', label: 'AutoScout24' },
      ],
    },
    {
      id: 2,
      label: { de: 'SCHRITT 02', fr: 'ÉTAPE 02' },
      description: {
        de: 'Wir kontaktieren den Händler direkt und prüfen alle wesentlichen Fahrzeuginformationen vorab.',
        fr: 'Nous contactons directement le vendeur et vérifions en amont toutes les informations essentielles du véhicule.',
      },
      title: { de: 'Händlerkontakt & Fahrzeugprüfung', fr: 'Contact vendeur & vérification' },
      bullets: {
        de: ['Unfallhistorie', 'Wartungs- und Servicehistorie', 'Vorbesitzer', 'Technischer Zustand', 'Laufleistung und Dokumentation'],
        fr: ['Historique d’accident', 'Historique d’entretien', 'Nombre de propriétaires', 'État technique', 'Kilométrage et documents'],
      },
    },
    {
      id: 3,
      label: { de: 'SCHRITT 03', fr: 'ÉTAPE 03' },
      description: {
        de: 'Nach positiver Vorprüfung besichtigen wir das Fahrzeug persönlich vor Ort und dokumentieren alles transparent.',
        fr: 'Après une pré-vérification positive, nous inspectons personnellement le véhicule sur place et documentons tout avec transparence.',
      },
      title: { de: 'Vor-Ort-Besichtigung', fr: 'Inspection sur place' },
      bullets: {
        de: ['Karosserie und Lackzustand', 'Motor und Getriebe', 'Innenraumzustand', 'Reifen und Bremsen', 'Elektronik und Ausstattung', 'Schäden oder Mängel'],
        fr: ['Carrosserie et peinture', 'Moteur et boîte', 'État intérieur', 'Pneus et freins', 'Électronique et équipements', 'Défauts éventuels'],
      },
      note: {
        de: 'Zusätzlich erhalten Sie Fotos, Videos und eine ehrliche Einschätzung zum Fahrzeugzustand.',
        fr: 'Vous recevez en plus des photos, des vidéos et une évaluation honnête de l’état du véhicule.',
      },
    },
    {
      id: 4,
      label: { de: 'SCHRITT 04', fr: 'ÉTAPE 04' },
      description: {
        de: 'Auf Grundlage unserer Prüfung entscheiden Sie in Ruhe, ob das Fahrzeug gekauft werden soll.',
        fr: 'Sur la base de notre contrôle, vous décidez sereinement si le véhicule doit être acheté ou non.',
      },
      title: { de: 'Kaufentscheidung', fr: 'Décision d’achat' },
      bullets: {
        de: ['Transparente Entscheidungsgrundlage', 'Alle Ergebnisse übersichtlich', 'Ohne Kaufdruck', 'Sie geben die finale Freigabe'],
        fr: ['Base de décision claire', 'Résultats présentés de façon structurée', 'Sans pression', 'Validation finale par vous'],
      },
    },
    {
      id: 5,
      label: { de: 'SCHRITT 05', fr: 'ÉTAPE 05' },
      description: {
        de: 'Bei positiver Entscheidung kümmern wir uns um die komplette Kaufabwicklung mit dem Händler.',
        fr: 'En cas de validation, nous gérons l’ensemble de la procédure d’achat avec le vendeur.',
      },
      title: { de: 'Kaufabwicklung', fr: 'Gestion de l’achat' },
      bullets: {
        de: ['Kaufvertrag', 'Fahrzeugdokumente', 'Reservierung des Fahrzeugs', 'Abstimmung mit dem Händler'],
        fr: ['Contrat de vente', 'Documents du véhicule', 'Réservation du véhicule', 'Coordination avec le vendeur'],
      },
    },
    {
      id: 6,
      label: { de: 'SCHRITT 06', fr: 'ÉTAPE 06' },
      description: {
        de: 'Nach Abschluss aller Formalitäten organisieren wir die Abholung oder auf Wunsch den weiteren Transport.',
        fr: 'Après la finalisation des démarches, nous organisons l’enlèvement du véhicule ou, sur demande, son transport.',
      },
      title: { de: 'Fahrzeugabholung & Transport', fr: 'Enlèvement & transport' },
      bullets: {
        de: ['Abholung nach Termin', 'Organisation des Transports', 'Saubere Übergabe', 'Begleitung bis zum nächsten Schritt'],
        fr: ['Retrait sur rendez-vous', 'Organisation du transport', 'Remise structurée', 'Accompagnement jusqu’à la suite'],
      },
    },
  ];

  const handleTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    touchIntentRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      moved: false,
    };
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) {
      return;
    }

    const deltaX = Math.abs(touch.clientX - touchIntentRef.current.startX);
    const deltaY = Math.abs(touch.clientY - touchIntentRef.current.startY);

    if (deltaX > 8 || deltaY > 8) {
      touchIntentRef.current.moved = true;
    }
  };

  const openVideoWithIntent = (youtubeId: string) => {
    if (touchIntentRef.current.moved) {
      return;
    }

    setActiveVideo(youtubeId);
  };

  useEffect(() => {
    const sectionNode = serviceExplanationRef.current;
    if (!sectionNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServiceExplanationVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionNode = serviceJourneyRef.current;
    if (!sectionNode) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setServiceJourneyVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22 }
    );

    observer.observe(sectionNode);

    return () => observer.disconnect();
  }, []);

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

  const serviceDetailsSectionCopy = {
    eyebrow: { de: 'Service-Details', fr: 'Détails du service' },
    subtitle: {
      de: '6 klar strukturierte Schritte von der Fahrzeugsuche bis zur Abholung oder zum Transport.',
      fr: '6 étapes claires, de la recherche du véhicule jusqu’au retrait ou au transport.',
    },
    title: { de: 'So funktioniert unser Fahrzeugservice', fr: 'Comment fonctionne notre service véhicule' },
  };

  const serviceExplanationSectionCopy = {
    eyebrow: { de: 'WILLKOMMEN', fr: 'BIENVENUE' },
    subtitle: {
      de: 'Ein einfacherer, persönlicherer und entspannterer Weg, Ihr Fahrzeug in Deutschland zu finden.',
      fr: 'Une approche plus simple, plus humaine et plus sereine pour trouver votre vehicule en Allemagne.',
    },
    title: { de: 'Willkommen bei Mehdi Cars', fr: 'Bienvenue chez Mehdi Cars' },
  };

  const editorialMetrics = [
    {
      key: 'inspected',
      label: { de: 'Fahrzeuge geprueft', fr: 'vehicules inspectes' },
      value: '500+',
    },
    {
      key: 'satisfaction',
      label: { de: 'Kundenzufriedenheit', fr: 'satisfaction client' },
      value: '4.9★',
    },
    {
      key: 'response',
      label: { de: 'Antwortzeit', fr: 'delai de reponse' },
      value: '48h',
    },
  ];

  const contactSteps = [
    {
      description:
        language === 'de'
          ? 'Fahrzeugwunsch in wenigen Minuten beschreiben'
          : 'Décrivez votre besoin véhicule en quelques minutes',
      number: '1',
      title: language === 'de' ? 'Anfrage stellen' : 'Faire une demande',
    },
    {
      description:
        language === 'de'
          ? 'Wir melden uns innerhalb von 24 Stunden'
          : 'Nous revenons vers vous sous 24 heures',
      number: '2',
      title: language === 'de' ? 'Rückmeldung erhalten' : 'Recevoir un retour',
    },
    {
      description:
        language === 'de'
          ? 'Wir begleiten Sie bis zur Schlüsselübergabe'
          : 'Nous vous accompagnons jusqu\'à la remise des clés',
      number: '3',
      title: language === 'de' ? 'Fahrzeug erhalten' : 'Recevoir votre véhicule',
    },
  ];

  return (
    <main className="page-shell landing-page">
      <LandingTopBar />

      <section className="hero-section" id="home" style={heroStyle}>
        <div className="hero-section__inner">
          <div className="hero-copy">
            <span className="eyebrow hero-eyebrow">
              <Sparkles size={14} />
              {t('landing.hero.eyebrow')}
            </span>

            <h1 className="hero-headline" lang={language}>
              {t('landing.hero.title')}
            </h1>

            <p className="hero-subline">{t('landing.hero.subtitle')}</p>

            <div className="hero-proof">
              <span className="hero-proof__item">
                <CheckCircle2 size={15} />
                {t('landing.hero.proofOne')}
              </span>
              <span className="hero-proof__sep" aria-hidden="true" />
              <span className="hero-proof__item">
                <CheckCircle2 size={15} />
                {t('landing.hero.proofTwo')}
              </span>
              <span className="hero-proof__sep" aria-hidden="true" />
              <span className="hero-proof__item">
                <CheckCircle2 size={15} />
                {t('landing.hero.proofThree')}
              </span>
            </div>

            <div className="hero-actions">
              <Button className="primary-cta hero-primary" type="primary" size="large" href={funnelPath}>
                {t('landing.hero.buyCta')}
                <ArrowRight size={17} />
              </Button>
              <Button className="ghost-cta hero-secondary" size="large" href={advisoryPath}>
                {t('landing.hero.advisoryCta')}
                <ArrowRight size={17} />
              </Button>
            </div>
          </div>
        </div>

        <div className="hero-scroll-hint" aria-hidden="true">
          <span />
        </div>
      </section>

     

      <section
        ref={serviceExplanationRef}
        className={`content-section service-explanation-section section-tone-light ${serviceExplanationVisible ? 'is-visible' : ''}`}
      >
        <div className="section-inner">
          <div className="section-heading section-heading--center service-explanation-heading">
            <span className="eyebrow">{pickText(serviceExplanationSectionCopy.eyebrow, language)}</span>
            <h2>{pickText(serviceExplanationSectionCopy.title, language)}</h2>
            <p>{pickText(serviceExplanationSectionCopy.subtitle, language)}</p>
          </div>

          <div className="service-explanation-shell">
            <div className="service-explanation-visual" aria-hidden="true">
              <img
                alt={language === 'de' ? 'Mehdi Cars Beratung in Deutschland' : 'Conseil Mehdi Cars en Allemagne'}
                loading="lazy"
                src={mehdiClaGrayImageUrl}
              />
            </div>

          <div className="service-explanation-copy">
            <span className="eyebrow service-explanation-copy__eyebrow">
              {language === 'de' ? 'PREMIUM BEGLEITUNG' : 'ACCOMPAGNEMENT PREMIUM'}
            </span>
            <h2>
              {language === 'de'
                ? <>Wir finden Ihr <span>Wunschfahrzeug</span> in Deutschland.</>
                : <>Nous trouvons votre <span>véhicule idéal</span> en Allemagne.</>}
            </h2>
            <p>
              {language === 'de'
                ? 'Von der Suche bis zur Fahrzeuguebergabe wird jeder Schritt vereinfacht - fuer eine transparente und entspannte Erfahrung.'
                : 'De la recherche jusqu\'a la remise des cles - chaque etape simplifiee pour une experience sereine et transparente.'}
            </p>

            <ul className="service-explanation-benefits">
              <li>
                <span className="service-explanation-benefits__icon" aria-hidden="true">
                  <Check size={12} />
                </span>
                {language === 'de' ? 'Personalisierte Fahrzeugsuche' : 'Recherche personnalisée du véhicule'}
              </li>
              <li>
                <span className="service-explanation-benefits__icon" aria-hidden="true">
                  <Check size={12} />
                </span>
                {language === 'de' ? 'Pruefung der besten Angebote' : 'Vérification des meilleures offres'}
              </li>
              <li>
                <span className="service-explanation-benefits__icon" aria-hidden="true">
                  <Check size={12} />
                </span>
                {language === 'de' ? 'Unterstuetzung und Verhandlung' : 'Assistance et négociation'}
              </li>
              <li>
                <span className="service-explanation-benefits__icon" aria-hidden="true">
                  <Check size={12} />
                </span>
                {language === 'de' ? 'Komplette administrative Begleitung' : 'Accompagnement administratif complet'}
              </li>
            </ul>

            <div className="service-explanation-actions">
              <Button className="primary-cta" type="primary" size="large" href={funnelPath}>
                {language === 'de' ? 'Suche starten' : 'Commencer ma recherche'}
                <ArrowRight size={17} />
              </Button>
              <a className="service-explanation-link" href="#service-details">
                {language === 'de' ? 'Unsere Methode entdecken' : 'Découvrir notre méthode'}
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section
        id="service-details"
        ref={serviceJourneyRef}
        className={`content-section service-journey-section section-tone-soft ${serviceJourneyVisible ? 'is-visible' : ''}`}
      >
        <div className="section-inner">
          <div className="section-heading section-heading--center service-details-heading">
            <span className="eyebrow">{pickText(serviceDetailsSectionCopy.eyebrow, language)}</span>
            <h2>{pickText(serviceDetailsSectionCopy.title, language)}</h2>
            <p>{pickText(serviceDetailsSectionCopy.subtitle, language)}</p>
          </div>
          <div className="service-details-editorial-grid" role="list">
            {serviceDetailsSteps.map((step, index) => (
              <article
                className="service-details-editorial-card"
                key={step.id}
                role="listitem"
                style={{ '--step-index': String(index) } as CSSProperties}
              >
                <div className="service-details-editorial-card__number" aria-hidden="true">
                  {step.id}
                </div>
                <div className="service-details-editorial-card__media">
                  <img alt={pickText(step.title, language)} loading="lazy" src={bannerFixTwoImageUrl} />
                </div>
                <div className="service-details-editorial-card__body">
                  <span className="service-details-editorial-card__label">{pickText(step.label, language)}</span>
                  <h3>{pickText(step.title, language).replace(/^\d+\.\s*/, '')}</h3>
                  <p>{pickText(step.description, language)}</p>
                  <ul className="service-details-editorial-card__list">
                    {pickText(step.bullets, language).map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  {step.links && (
                    <div className="service-details-editorial-card__links">
                      {step.links.map((link) => (
                        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {step.note && <span className="service-details-editorial-card__note">{pickText(step.note, language)}</span>}
                </div>
              </article>
            ))}
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
            <div className="media-showcase media-showcase--desktop">
                <div className="media-grid media-grid--desktop-cards">
                  {mediaItems.slice(1, 3).map((media) => (
                  <article className="media-card media-card--secondary card-hover" key={media.id}>
                    <button
                      className="media-card__thumbnail"
                      type="button"
                      onClick={() => openVideoWithIntent(media.youtubeId)}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
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

              <article className="media-card media-card--featured card-hover" key={mediaItems[0]?.id}>
                <button
                  className="media-card__thumbnail media-card__thumbnail--featured"
                  type="button"
                  onClick={() => mediaItems[0] && openVideoWithIntent(mediaItems[0].youtubeId)}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  aria-label={mediaItems[0] ? pickText(mediaItems[0].title, language) : undefined}
                >
                  <img
                    alt={mediaItems[0] ? pickText(mediaItems[0].title, language) : ''}
                    loading="lazy"
                    src={mediaItems[0] ? `https://img.youtube.com/vi/${mediaItems[0].youtubeId}/maxresdefault.jpg` : ''}
                  />
                  <span className="media-card__play">
                    <PlayCircle size={48} />
                  </span>
                  {mediaItems[0]?.duration && <span className="media-card__duration">{mediaItems[0].duration}</span>}
                </button>
                <div className="media-card__content media-card__content--featured">
                  <span className="media-card__category">{mediaItems[0] ? pickText(mediaItems[0].category, language) : ''}</span>
                  <h3>{mediaItems[0] ? pickText(mediaItems[0].title, language) : ''}</h3>
                  <p>{mediaItems[0] ? pickText(mediaItems[0].description, language) : ''}</p>
                </div>
              </article>
            </div>

            <div className="media-showcase media-showcase--mobile" aria-label={language === 'de' ? 'Video-Karussell' : 'Carrousel vidéo'}>
              {mediaItems.map((media) => (
                <article className="media-card media-card--mobile card-hover" key={media.id}>
                  <button
                    className="media-card__thumbnail"
                    type="button"
                    onClick={() => openVideoWithIntent(media.youtubeId)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
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
            <div className="media-carousel__dots" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
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
          <section className="content-section editorial-moment editorial-moment--primary" aria-label="Editorial statement">
        <div className="section-inner">
          <span className="editorial-moment__mark" aria-hidden="true">
            DE
          </span>
          <p className="editorial-moment__eyebrow">
            {language === 'de' ? 'Premium Begleitung' : 'Accompagnement premium'}
          </p>
          <h2>
            {language === 'de' ? 'Der deutsche Markt.' : 'Le marche allemand.'}
            <span>{language === 'de' ? 'Ohne Komplikationen.' : 'Sans complications.'}</span>
          </h2>
          <div
            className="editorial-moment__metrics"
            role="list"
            aria-label={language === 'de' ? 'Vertrauenskennzahlen' : 'Indicateurs de confiance'}
          >
            {editorialMetrics.map((metric, index) => (
              <div
                className={`editorial-moment__metric ${index === 1 ? 'editorial-moment__metric--featured' : ''}`}
                key={metric.key}
                role="listitem"
              >
                <strong>{metric.value}</strong>
                <span>{pickText(metric.label, language)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <section className="content-section gallery-section section-tone-light">
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
      </section> */}

      {/* <section id="faq" className="content-section faq-section section-tone-light">
        <div className="section-inner faq-grid">
          <span className="faq-deco-number" aria-hidden="true">06</span>
          <div className="faq-copy">
            <span className="eyebrow">{t('landing.faq.eyebrow')}</span>
            <h2>{t('landing.faq.title')}</h2>
            <p>{t('landing.faq.subtitle')}</p>
          </div>
          <Collapse
            bordered={false}
            className="faq-collapse"
            expandIcon={({ isActive }) => <span className={`faq-plus ${isActive ? 'is-active' : ''}`} aria-hidden="true" />}
            expandIconPosition="end"
            items={faqItems.map((item, index) => ({
              key: index,
              label: pickText(item.question, language),
              children: <p>{pickText(item.answer, language)}</p>,
            }))}
          />
        </div>
      </section> */}

      <section id="contact" className="final-cta contact-section">
        <div className="section-inner final-cta-card contact-card">
          <span className="contact-card__menu" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>

          <div className="contact-copy">
            <span className="eyebrow">{t('landing.nav.contact')}</span>
            <h2>
              {language === 'de' ? (
                <>
                  Bereit, Ihre Anfrage zu <span>starten?</span>
                </>
              ) : (
                <>{t('landing.contact.title')}</>
              )}
            </h2>
            <p>{t('landing.contact.text')}</p>

            <Button className="primary-cta contact-cta" type="primary" size="large" href={funnelPath}>
              {language === 'de' ? 'Jetzt anfragen' : t('common.startRequest')}
              <ArrowRight size={18} />
            </Button>
          </div>

          <div className="contact-details">
            <ol className="contact-steps" role="list" aria-label={t('landing.nav.contact')}>
              {contactSteps.map((step) => (
                <li className="contact-step" key={step.number} role="listitem">
                  <span className="contact-step__number">{step.number}</span>
                  <div className="contact-step__copy">
                    <strong>{step.title}</strong>
                    <span>{step.description}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="contact-social">
              <span className="contact-social__label">{language === 'de' ? 'FOLGEN SIE UNS' : 'SUIVEZ-NOUS'}</span>
              <SocialLinks variant="dark" />
            </div>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="section-inner footer-grid">
          <div className="footer-brand footer-column">
            <Link className="brand brand--footer" to={`/${language}`}>
              <img alt={t('landing.brand')} className="brand-logo" src={mehdiCarsLogoUrl} />
            </Link>
            <p>{t('landing.footer.description')}</p>
            <SocialLinks variant="dark" />
          </div>
          <div className="footer-column">
            <h3>{t('landing.footer.navigation')}</h3>
            <a href="#home">{t('landing.nav.home')}</a>
            <a href="#service-details">{t('landing.nav.process')}</a>
            <a href="#faq">{t('landing.nav.faq')}</a>
            <a href="#contact">{t('landing.nav.contact')}</a>
          </div>
          <div className="footer-column">
            <h3>{t('landing.footer.services')}</h3>
            <a href={funnelPath}>{t('landing.services.advisory.title')}</a>
            <a href={advisoryPath}>{t('landing.services.sell.title')}</a>
          </div>
          <div className="footer-column">
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
