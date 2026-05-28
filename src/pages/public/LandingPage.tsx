import { Button, Collapse } from 'antd';
import {
  ArrowRight,
  AlertTriangle,
  BadgeCheck,
  CarFront,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  Handshake,
  MapPin,
  Megaphone,
  Navigation,
  PlayCircle,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Truck,
  Wrench,
} from 'lucide-react';
import type { CSSProperties, TouchEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { SocialLinks } from '../../components/common/SocialLinks';
import { LandingTopBar } from '../../components/landing/LandingTopBar';
import { faqItems, galleryItems, mediaItems, testimonials } from '../../features/content/contentData';
import { getLanguage, localizeRoute } from '../../lib/language';
import { pickText } from '../../lib/localized';
import type { SupportedLanguage } from '../../types/i18n';
import heroImageUrl from '../../../images/bannerfix2.png';
import bannerFixTwoImageUrl from '../../../images/bannerfix2.png';
import bannerGsTporchImageUrl from '../../../images/bannergstporch.png';
import mehdiClaGrayImageUrl from '../../../images/mehdi_cla_gray.png';
import mehdiCarsLogoUrl from '../../../images/mehdi_cars_logo.svg';
import './landingPage.css';

export function LandingPage() {
  const { t } = useTranslation();
  const { lang = 'fr' } = useParams();
  const language = getLanguage(lang) as SupportedLanguage;
  const funnelPath = `/${language}/${localizeRoute(language, 'request')}`;
  const advisoryPath = `/${language}/${localizeRoute(language, 'advisory')}`;
  const privacyPath = `/${language}/${localizeRoute(language, 'privacy')}`;
  const heroStyle = {
    '--hero-image': `url(${heroImageUrl})`,
    '--hero-image-mobile': `url(${mehdiClaGrayImageUrl})`,
  } as CSSProperties;
  const advisoryCtaStyle = {
    '--advisory-cta-image': `url(${bannerGsTporchImageUrl})`,
  } as CSSProperties;

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [serviceExplanationVisible, setServiceExplanationVisible] = useState(false);
  const [serviceJourneyVisible, setServiceJourneyVisible] = useState(false);
  const serviceExplanationRef = useRef<HTMLElement | null>(null);
  const serviceJourneyRef = useRef<HTMLElement | null>(null);
  const touchIntentRef = useRef({ startX: 0, startY: 0, moved: false });

  const serviceDetailsSteps: Array<{
    id: number;
    label: Partial<Record<SupportedLanguage, string>>;
    description: Partial<Record<SupportedLanguage, string>>;
    title: Partial<Record<SupportedLanguage, string>>;
    bullets: Partial<Record<SupportedLanguage, string[]>>;
    links?: Array<{ href: string; label: string }>;
    note?: Partial<Record<SupportedLanguage, string>>;
  }> = [
    {
      id: 1,
      label: { de: 'SCHRITT 01', en: 'STEP 01', es: 'PASO 01', fr: 'ÉTAPE 01' },
      description: {
        de: 'Sie senden uns ein interessantes Fahrzeug oder wir definieren gemeinsam die passende Auswahl.',
        en: 'You send us an interesting vehicle or we define the right shortlist together.',
        es: 'Nos envía un vehículo interesante o definimos juntos la selección adecuada.',
        fr: 'Vous nous envoyez un véhicule intéressant ou nous cadrons ensemble la bonne sélection.',
      },
      title: { de: 'Suche & Auswahl', en: 'Search & selection', es: 'Búsqueda y selección', fr: 'Recherche & sélection' },
      bullets: {
        de: ['Fahrzeugwunsch klären', 'Link oder Inserat senden', 'Passende Angebote eingrenzen'],
        en: ['Clarify the vehicle goal', 'Send a link or listing', 'Narrow down the right offers'],
        es: ['Definir la necesidad', 'Enviar el enlace o anuncio', 'Seleccionar las mejores ofertas'],
        fr: ['Définir le besoin', 'Envoyer le lien ou l’annonce', 'Cibler les bonnes offres'],
      },
      links: [
        { href: 'https://www.mobile.de', label: 'mobile.de' },
        { href: 'https://www.autoscout24.de', label: 'AutoScout24' },
      ],
    },
    {
      id: 2,
      label: { de: 'SCHRITT 02', en: 'STEP 02', es: 'PASO 02', fr: 'ÉTAPE 02' },
      description: {
        de: 'Wir prüfen mit dem Händler die wichtigsten Informationen, bevor Zeit oder Geld investiert wird.',
        en: 'We verify the key information with the dealer before you invest time or money.',
        es: 'Verificamos con el vendedor la información clave antes de invertir tiempo o dinero.',
        fr: 'Nous validons avec le vendeur les points essentiels avant tout déplacement ou engagement.',
      },
      title: { de: 'Pruefung vorab', en: 'Pre-check', es: 'Verificación previa', fr: 'Pré-vérification' },
      bullets: {
        de: ['Historie und Dokumente', 'Kilometerstand und Zustand', 'Direkter Kontakt mit dem Händler'],
        en: ['History and documents', 'Mileage and condition', 'Direct contact with the dealer'],
        es: ['Historial y documentos', 'Kilometraje y estado', 'Contacto directo con el vendedor'],
        fr: ['Historique et documents', 'Kilométrage et état', 'Contact direct avec le vendeur'],
      },
    },
    {
      id: 3,
      label: { de: 'SCHRITT 03', en: 'STEP 03', es: 'PASO 03', fr: 'ÉTAPE 03' },
      description: {
        de: 'Wenn das Fahrzeug passt, schauen wir es vor Ort an und geben Ihnen eine klare Einschätzung.',
        en: 'If the vehicle is relevant, we inspect it on site and give you clear feedback.',
        es: 'Si el vehículo encaja, lo inspeccionamos en persona y le damos una valoración clara.',
        fr: 'Si le véhicule est pertinent, nous l’inspectons sur place et vous donnons un retour clair.',
      },
      title: { de: 'Inspektion vor Ort', en: 'On-site inspection', es: 'Inspección in situ', fr: 'Inspection sur place' },
      bullets: {
        de: ['Karosserie und Innenraum', 'Technischer Gesamteindruck', 'Fotos und ehrliches Feedback'],
        en: ['Bodywork and interior', 'Overall technical impression', 'Photos and honest feedback'],
        es: ['Carrocería e interior', 'Estado técnico general', 'Fotos y opinión honesta'],
        fr: ['Carrosserie et intérieur', 'État technique global', 'Photos et avis honnête'],
      },
    },
    {
      id: 4,
      label: { de: 'SCHRITT 04', en: 'STEP 04', es: 'PASO 04', fr: 'ÉTAPE 04' },
      description: {
        de: 'Nach Ihrer Freigabe begleiten wir Kauf, Abholung oder Transport bis zur sauberen Übergabe.',
        en: 'After your approval, we support the purchase, pickup or transport through to handover.',
        es: 'Tras su validación, acompañamos la compra, la recogida o el transporte hasta la entrega.',
        fr: 'Après votre validation, nous gérons l’achat, le retrait ou le transport jusqu’à la remise.',
      },
      title: { de: 'Kauf & Uebergabe', en: 'Purchase & handover', es: 'Compra y entrega', fr: 'Achat & remise' },
      bullets: {
        de: ['Kaufabwicklung mit dem Händler', 'Organisation von Abholung oder Transport', 'Begleitung bis zur Übergabe'],
        en: ['Purchase handling with the dealer', 'Pickup or transport organization', 'Support through final handover'],
        es: ['Gestión de la compra con el vendedor', 'Organización de recogida o transporte', 'Acompañamiento hasta la entrega'],
        fr: ['Gestion de l’achat avec le vendeur', 'Organisation du retrait ou du transport', 'Accompagnement jusqu’à la remise'],
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

  const handleMediaPrev = () => {
    setMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const handleMediaNext = () => {
    setMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : prev + 1));
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

  const selectedMedia = mediaItems[mediaIndex] ?? mediaItems[0];
  const mediaAlbumItems = mediaItems.map((media, index) => ({
    ...media,
    index,
  }));

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
    eyebrow: { de: 'Service-Details', en: 'Service details', es: 'Detalles del servicio', fr: 'Détails du service' },
    subtitle: {
      de: '4 klare Schritte von der Auswahl bis zur Übergabe.',
      en: '4 clear steps from selection to handover.',
      es: '4 pasos claros desde la selección hasta la entrega.',
      fr: '4 étapes claires, de la sélection jusqu’à la remise.',
    },
    title: {
      de: 'So funktioniert unser Fahrzeugservice',
      en: 'How our vehicle service works',
      es: 'Cómo funciona nuestro servicio de vehículos',
      fr: 'Comment fonctionne notre service véhicule',
    },
  };

  const serviceExplanationSectionCopy = {
    eyebrow: { de: 'WILLKOMMEN', en: 'WELCOME', es: 'BIENVENIDO', fr: 'BIENVENUE' },
    subtitle: {
      de: 'Ein einfacherer, persönlicherer und entspannterer Weg, Ihr Fahrzeug in Deutschland zu finden.',
      en: 'A simpler, more personal and more relaxed way to find your vehicle in Germany.',
      es: 'Una forma más simple, más personal y más tranquila de encontrar su vehículo en Alemania.',
      fr: 'Une approche plus simple, plus humaine et plus sereine pour trouver votre vehicule en Allemagne.',
    },
    title: {
      de: 'Willkommen bei Mehdi Cars',
      en: 'Welcome to Mehdi Cars',
      es: 'Bienvenido a Mehdi Cars',
      fr: 'Bienvenue chez Mehdi Cars',
    },
    imageAlt: {
      de: 'Mehdi Cars Beratung in Deutschland',
      en: 'Mehdi Cars consultation in Germany',
      es: 'Consulta de Mehdi Cars en Alemania',
      fr: 'Conseil Mehdi Cars en Allemagne',
    },
    premiumLabel: {
      de: 'PREMIUM BEGLEITUNG',
      en: 'PREMIUM SUPPORT',
      es: 'ACOMPANAMIENTO PREMIUM',
      fr: 'ACCOMPAGNEMENT PREMIUM',
    },
    prefix: {
      de: 'Wir finden Ihr ',
      en: 'We find your ',
      es: 'Encontramos su ',
      fr: 'Nous trouvons votre ',
    },
    highlight: {
      de: 'Wunschfahrzeug',
      en: 'ideal vehicle',
      es: 'vehículo ideal',
      fr: 'véhicule idéal',
    },
    suffix: {
      de: ' in Deutschland.',
      en: ' in Germany.',
      es: ' en Alemania.',
      fr: ' en Allemagne.',
    },
    body: {
      de: 'Von der Suche bis zur Fahrzeuguebergabe wird jeder Schritt vereinfacht - fuer eine transparente und entspannte Erfahrung.',
      en: 'From search to handover, every step is simplified for a transparent and stress-free experience.',
      es: 'Desde la búsqueda hasta la entrega, cada etapa se simplifica para ofrecer una experiencia transparente y tranquila.',
      fr: "De la recherche jusqu'a la remise des cles - chaque etape simplifiee pour une experience sereine et transparente.",
    },
    benefits: {
      de: [
        'Personalisierte Fahrzeugsuche',
        'Pruefung der besten Angebote',
        'Unterstuetzung und Verhandlung',
        'Komplette administrative Begleitung',
      ],
      en: [
        'Personalized vehicle search',
        'Review of the best offers',
        'Support and negotiation',
        'Complete administrative guidance',
      ],
      es: [
        'Búsqueda personalizada de vehículos',
        'Revisión de las mejores ofertas',
        'Acompañamiento y negociación',
        'Gestión administrativa completa',
      ],
      fr: [
        'Recherche personnalisée du véhicule',
        'Vérification des meilleures offres',
        'Assistance et négociation',
        'Accompagnement administratif complet',
      ],
    },
    primaryCta: {
      de: 'Suche starten',
      en: 'Start the search',
      es: 'Iniciar la búsqueda',
      fr: 'Commencer ma recherche',
    },
    secondaryCta: {
      de: 'Unsere Methode entdecken',
      en: 'Discover our method',
      es: 'Descubrir nuestro método',
      fr: 'Découvrir notre méthode',
    },
  };

  const featureMarqueeItems = [
    { icon: <ShieldCheck size={20} />, label: '' },
    { icon: <Truck size={20} />, label: '' },
    { icon: <Tag size={20} />, label: '' },
    { icon: <Settings2 size={20} />, label: '' },
    {
      highlight: true,
      icon: <Megaphone size={20} />,
      label: pickText(
        {
          de: 'Vor-Ort-Inspektion in Deutschland',
          en: 'On-site inspection in Germany',
          es: 'Inspección in situ en Alemania',
          fr: 'Inspection sur place en Allemagne',
        },
        language,
      ),
    },
    { icon: <MapPin size={20} />, label: '' },
    { icon: <Clock3 size={20} />, label: '' },
    { icon: <Wrench size={20} />, label: '' },
    { icon: <AlertTriangle size={20} />, label: '' },
    { icon: <Navigation size={20} />, label: '' },
    { icon: <CarFront size={20} />, label: '' },
    { icon: <Gauge size={20} />, label: '' },
    {
      highlight: true,
      icon: <Handshake size={20} />,
      label: pickText(
        {
          de: 'Suche, Verhandlung und Übergabe',
          en: 'Search, negotiation and handover',
          es: 'Búsqueda, negociación y entrega',
          fr: 'Recherche, négociation et remise',
        },
        language,
      ),
    },
  ];

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
      description: pickText({
        de: 'Fahrzeugwunsch in wenigen Minuten beschreiben',
        en: 'Describe your vehicle request in a few minutes',
        es: 'Describa su necesidad de vehículo en unos minutos',
        fr: 'Décrivez votre besoin véhicule en quelques minutes',
      }, language),
      number: '1',
      title: pickText({ de: 'Anfrage stellen', en: 'Send a request', es: 'Hacer una solicitud', fr: 'Faire une demande' }, language),
    },
    {
      description: pickText({
        de: 'Wir melden uns innerhalb von 24 Stunden',
        en: 'We get back to you within 24 hours',
        es: 'Le respondemos en 24 horas',
        fr: 'Nous revenons vers vous sous 24 heures',
      }, language),
      number: '2',
      title: pickText({ de: 'Rueckmeldung erhalten', en: 'Receive feedback', es: 'Recibir respuesta', fr: 'Recevoir un retour' }, language),
    },
    {
      description: pickText({
        de: 'Wir begleiten Sie bis zur Schluesseluebergabe',
        en: 'We support you until final handover',
        es: 'Le acompañamos hasta la entrega final',
        fr: "Nous vous accompagnons jusqu'à la remise des clés",
      }, language),
      number: '3',
      title: pickText({ de: 'Fahrzeug erhalten', en: 'Receive your vehicle', es: 'Recibir su vehículo', fr: 'Recevoir votre véhicule' }, language),
    },
  ];

  const advisorySectionCopy = {
    ariaLabel: { de: 'Beratungsaufruf', en: 'Consultation section', es: 'Sección de consulta', fr: 'Appel au conseil' },
    label: { de: 'Beratung', en: 'Consultation', es: 'Consulta', fr: 'Conseil' },
    titleStart: { de: 'Unsicher beim', en: 'Not sure about', es: '¿Dudas sobre', fr: 'Un doute avant' },
    titleStrong: { de: 'Fahrzeugkauf?', en: 'buying a vehicle?', es: 'la compra del vehículo?', fr: "l'achat du véhicule ?" },
    body: {
      de: 'Kein Problem - wir begleiten Sie Schritt fuer Schritt.',
      en: 'No problem. We guide you step by step.',
      es: 'No hay problema. Le guiamos paso a paso.',
      fr: 'Aucun souci - nous vous accompagnons pas à pas.',
    },
    cta: { de: 'Beratung buchen', en: 'Book a consultation', es: 'Reservar una consulta', fr: 'Réserver un conseil' },
  };

  const mediaSectionCopy = {
    eyebrow: { de: 'Video & Medien', en: 'Video & media', es: 'Video y medios', fr: 'Vidéo & Médias' },
    title: {
      de: 'Entdecken Sie unsere Video-Inhalte',
      en: 'Explore our video content',
      es: 'Descubra nuestros contenidos en video',
      fr: 'Découvrez nos contenus vidéo',
    },
    body: {
      de: 'Leitfaeden, Tipps und Einblicke in unser Fahrzeuginspektionsverfahren',
      en: 'Guides, tips and insights into our vehicle inspection process',
      es: 'Guías, consejos y una visión de nuestro proceso de inspección de vehículos',
      fr: "Guides, conseils et aperçus de notre processus d'inspection",
    },
    albumAria: { de: 'Video-Album', en: 'Video album', es: 'Álbum de videos', fr: 'Album vidéo' },
    prevVideo: { de: 'Vorheriges Video', en: 'Previous video', es: 'Video anterior', fr: 'Vidéo précédente' },
    nextVideo: { de: 'Naechstes Video', en: 'Next video', es: 'Siguiente video', fr: 'Vidéo suivante' },
    listAria: { de: 'Videoliste', en: 'Video list', es: 'Lista de videos', fr: 'Liste des vidéos' },
    carouselAria: { de: 'Video-Karussell', en: 'Video carousel', es: 'Carrusel de videos', fr: 'Carrousel vidéo' },
    closeLabel: { de: 'Schliessen', en: 'Close', es: 'Cerrar', fr: 'Fermer' },
    iframeTitle: { de: 'YouTube-Video', en: 'YouTube video', es: 'Video de YouTube', fr: 'Vidéo YouTube' },
  };

  const finalCtaCopy = {
    titlePrefix: {
      de: 'Bereit, Ihre Anfrage zu ',
      en: 'Ready to ',
      es: '¿Listo para ',
      fr: '',
    },
    titleHighlight: {
      de: 'starten?',
      en: 'start your request?',
      es: 'iniciar su solicitud?',
      fr: '',
    },
    socialLabel: {
      de: 'FOLGEN SIE UNS',
      en: 'FOLLOW US',
      es: 'SÍGUENOS',
      fr: 'SUIVEZ-NOUS',
    },
  };

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
                alt={pickText(serviceExplanationSectionCopy.imageAlt, language)}
                loading="lazy"
                src={mehdiClaGrayImageUrl}
              />
            </div>

          <div className="service-explanation-copy">
            <span className="eyebrow service-explanation-copy__eyebrow">
              {pickText(serviceExplanationSectionCopy.premiumLabel, language)}
            </span>
            <h2>
              <>
                {pickText(serviceExplanationSectionCopy.prefix, language)}
                <span>{pickText(serviceExplanationSectionCopy.highlight, language)}</span>
                {pickText(serviceExplanationSectionCopy.suffix, language)}
              </>
            </h2>
            <p>{pickText(serviceExplanationSectionCopy.body, language)}</p>

            <ul className="service-explanation-benefits">
              {pickText(serviceExplanationSectionCopy.benefits, language).map((benefit) => (
                <li key={benefit}>
                  <span className="service-explanation-benefits__icon" aria-hidden="true">
                    <Check size={12} />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <div className="service-explanation-actions">
              <Button className="primary-cta" type="primary" size="large" href={funnelPath}>
                {pickText(serviceExplanationSectionCopy.primaryCta, language)}
                <ArrowRight size={17} />
              </Button>
              <a className="service-explanation-link" href="#service-details">
                {pickText(serviceExplanationSectionCopy.secondaryCta, language)}
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
          </div>
        </div>
      </section>

      <section className="feature-marquee-section" aria-label={pickText({
        de: 'Leistungsbanner',
        en: 'Service banner',
        es: 'Banner de servicios',
        fr: 'Bannière de services',
      }, language)}>
        <div className="feature-marquee-shell">
          <div className="feature-marquee-track">
            {[...featureMarqueeItems, ...featureMarqueeItems].map((item, index) => (
              <div className="feature-marquee-fragment" key={`${item.label || 'icon'}-${index}`}>
                <div className={`feature-marquee-item ${item.highlight ? 'is-highlight' : ''}`}>
                  <span className="feature-marquee-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label ? <span>{item.label}</span> : null}
                </div>
                <span className="feature-marquee-separator" aria-hidden="true" />
              </div>
            ))}
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

      <section className="content-section advisory-cta-section" aria-label={pickText(advisorySectionCopy.ariaLabel, language)}>
        <div className="section-inner advisory-cta-shell" style={advisoryCtaStyle}>
          <div className="advisory-cta-copy">
            <span className="advisory-cta-label">{pickText(advisorySectionCopy.label, language)}</span>
            <h2>
              <span>{pickText(advisorySectionCopy.titleStart, language)}</span>
              <strong>{pickText(advisorySectionCopy.titleStrong, language)}</strong>
            </h2>
            <p>{pickText(advisorySectionCopy.body, language)}</p>
            <Button className="primary-cta advisory-cta-button" type="primary" size="large" href={advisoryPath}>
              {pickText(advisorySectionCopy.cta, language)}
              <ArrowRight size={18} />
            </Button>
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
              {pickText(mediaSectionCopy.eyebrow, language)}
            </span>
            <h2>{pickText(mediaSectionCopy.title, language)}</h2>
            <p>{pickText(mediaSectionCopy.body, language)}</p>
          </div>
          <div className="media-showcase media-showcase--desktop" aria-label={pickText(mediaSectionCopy.albumAria, language)}>
            <div className="media-album">
              <div className="media-album__main">
                <article className="media-album__feature" key={selectedMedia?.id}>
                  <button
                    className="media-album__frame"
                    type="button"
                    onClick={() => selectedMedia && openVideoWithIntent(selectedMedia.youtubeId)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    aria-label={selectedMedia ? pickText(selectedMedia.title, language) : undefined}
                  >
                    <img
                      alt={selectedMedia ? pickText(selectedMedia.title, language) : ''}
                      loading="lazy"
                      src={selectedMedia ? `https://img.youtube.com/vi/${selectedMedia.youtubeId}/maxresdefault.jpg` : ''}
                    />
                    <span className="media-album__overlay" />
                    <span className="media-card__category media-card__category--featured">
                      {selectedMedia ? pickText(selectedMedia.category, language) : ''}
                    </span>
                    <span className="media-card__play media-card__play--album">
                      <PlayCircle size={54} />
                    </span>
                    {selectedMedia?.duration && <span className="media-card__duration">{selectedMedia.duration}</span>}
                    <span className="media-album__details">
                      <h3>{selectedMedia ? pickText(selectedMedia.title, language) : ''}</h3>
                      <p>{selectedMedia ? pickText(selectedMedia.description, language) : ''}</p>
                    </span>
                  </button>
                </article>

                <div className="media-album__rail" role="tablist" aria-label={pickText(mediaSectionCopy.listAria, language)}>
                  {mediaAlbumItems.map((media) => (
                    <button
                      className={`media-album__thumb ${media.index === mediaIndex ? 'media-album__thumb--active' : ''}`}
                      key={media.id}
                      type="button"
                      onClick={() => setMediaIndex(media.index)}
                      aria-label={pickText(media.title, language)}
                      aria-pressed={media.index === mediaIndex}
                    >
                      <span className="media-album__thumb-image">
                        <img
                          alt={pickText(media.title, language)}
                          loading="lazy"
                          src={`https://img.youtube.com/vi/${media.youtubeId}/mqdefault.jpg`}
                        />
                        {media.duration && <em className="media-album__thumb-duration">{media.duration}</em>}
                      </span>
                      <span className="media-album__thumb-copy">
                        <span className="media-album__thumb-kicker">{pickText(media.category, language)}</span>
                        <strong>{pickText(media.title, language)}</strong>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="media-album__footer-nav">
                <div className="media-album__count">
                  {pickText(mediaSectionCopy.eyebrow, language)} <span>{String(mediaIndex + 1).padStart(2, '0')}</span> / {String(mediaItems.length).padStart(2, '0')}
                </div>
                <div className="media-album__actions">
                  <button
                    className="media-album__nav media-album__nav--prev"
                    type="button"
                    onClick={handleMediaPrev}
                    aria-label={pickText(mediaSectionCopy.prevVideo, language)}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    className="media-album__nav media-album__nav--next"
                    type="button"
                    onClick={handleMediaNext}
                    aria-label={pickText(mediaSectionCopy.nextVideo, language)}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="media-showcase media-showcase--mobile" aria-label={pickText(mediaSectionCopy.carouselAria, language)}>
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
                  aria-label={pickText(mediaSectionCopy.closeLabel, language)}
                >
                  ✕
                </button>
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                  title={pickText(mediaSectionCopy.iframeTitle, language)}
                />
              </div>
            </div>
          )}
        </div>
      </section>
          {/* <section className="content-section editorial-moment editorial-moment--primary" aria-label="Editorial statement">
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
      </section> */}
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

      <section id="faq" className="content-section faq-section section-tone-light">
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
      </section> 

      {/* <section id="contact" className="final-cta contact-section">
        <div className="section-inner final-cta-card contact-card contact-shell">
          <span className="contact-card__menu" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>

          <div className="contact-copy">
            <span className="eyebrow">{t('landing.nav.contact')}</span>
            <h2>
              {language === 'de' || language === 'en' || language === 'es' ? (
                <>
                  {pickText(finalCtaCopy.titlePrefix, language)}
                  <span>{pickText(finalCtaCopy.titleHighlight, language)}</span>
                </>
              ) : (
                <>{t('landing.contact.title')}</>
              )}
            </h2>
            <p>{t('landing.contact.text')}</p>

            <Button className="primary-cta contact-cta" type="primary" size="large" href={funnelPath}>
              {t('common.startRequest')}
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
              <span className="contact-social__label">{pickText(finalCtaCopy.socialLabel, language)}</span>
              <SocialLinks variant="dark" />
            </div>
          </div>
        </div>
      </section> */}

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
