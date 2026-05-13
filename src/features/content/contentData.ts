import type { FAQItem, GalleryItem, MediaItem, ProcessStep, Testimonial } from '../../types/content';
import banner2ImageUrl from '../../../images/banner2.png';
import bannerBmwImageUrl from '../../../images/bannerbmw.png';
import designerImageUrl from '../../../images/Designerimg.png';
import serviceImage1Url from '../../../images/imgservice1.png';
import serviceImage2Url from '../../../images/imgservice2.png';
import serviceImage3Url from '../../../images/imgservice3.png';

export const processSteps: ProcessStep[] = [
  {
    title: { fr: 'Gagner du temps', de: 'Zeit gewinnen' },
    description: {
      fr: 'Au lieu de comparer des annonces pendant des heures, nous filtrons le marche pour vous et retenons seulement les vehicules pertinents.',
      de: 'Statt endlos Angebote zu vergleichen, filtern wir den Markt fuer Sie vor und zeigen nur Fahrzeuge, die wirklich zu Ihrem Profil passen.',
    },
  },
  {
    title: { fr: 'Profiter d\'un regard expert', de: 'Expertenwissen nutzen' },
    description: {
      fr: 'Nous analysons les details qui font la difference: motorisation, finition, historique et potentiel de revente.',
      de: 'Sie profitieren von Marktkenntnis bei Motoren, Ausstattung, Historie und Preisentwicklung, um Fehlkaeufe zu vermeiden.',
    },
  },
  {
    title: { fr: 'Obtenir les meilleures opportunites', de: 'Top-Angebote sichern' },
    description: {
      fr: 'Que ce soit pour acheter ou vendre, l\'objectif reste le meme: trouver le meilleur prix avec une strategie claire.',
      de: 'Ob Kauf oder Verkauf: Wir arbeiten auf ein starkes Preis-Leistungs-Verhaeltnis hin und holen das beste Angebot fuer Sie heraus.',
    },
  },
  {
    title: { fr: 'Un service simple et direct', de: 'Einfacher Service' },
    description: {
      fr: 'Pas de processus complique: echanges rapides, suivi clair et coordination directe via WhatsApp.',
      de: 'Kurze Wege statt komplizierter Ablaufe: schnelle Abstimmung, klare Updates und direkte Kommunikation ueber WhatsApp.',
    },
  },
];
export const mediaItems: MediaItem[] = [
  {
    id: 'video-1',
    title: { fr: 'Inspection complète d\'un véhicule', de: 'Umfassende Fahrzeuginspection' },
    description: { fr: 'Découvrez notre processus complet d\'inspection', de: 'Entdecken Sie unseren umfassenden Inspektionsprozess' },
    youtubeId: '_My65ts9MA0',
    duration: '5:32',
    category: { fr: 'Inspection', de: 'Inspektion' },
  },
  {
    id: 'video-2',
    title: { fr: 'Guide d\'achat automobiles en Allemagne', de: 'Leitfaden zum Autokauf in Deutschland' },
    description: { fr: 'Conseils pratiques pour l\'achat en Allemagne', de: 'Praktische Tipps zum Kaufen in Deutschland' },
    youtubeId: 'qglmGWu16Rk',
    duration: '8:15',
    category: { fr: 'Guide', de: 'Anleitung' },
  },
  {
    id: 'video-3',
    title: { fr: 'Témoignages clients', de: 'Kundenbewertungen' },
    description: { fr: 'Écoutez nos clients satisfaits', de: 'Hören Sie von unseren zufriedenen Kunden' },
    youtubeId: 'wTpZaLVz2yk',
    duration: '6:48',
    category: { fr: 'Témoignage', de: 'Bewertung' },
  },
  {
    id: 'video-4',
    title: { fr: 'Guide d\'achat automobiles en Allemagne', de: 'Leitfaden zum Autokauf in Deutschland' },
    description: { fr: 'Conseils pratiques pour l\'achat en Allemagne', de: 'Praktische Tipps zum Kaufen in Deutschland' },
    youtubeId: 'qglmGWu16Rk',
    duration: '8:15',
    category: { fr: 'Guide', de: 'Anleitung' },
  },
];
export const testimonials: Testimonial[] = [
  {
    name: 'Jean D.',
    country: 'France',
    rating: 5,
    text: {
      fr: 'Processus clair, rapide et très rassurant.',
      de: 'Klarer, schneller und sehr vertrauenswürdiger Ablauf.',
    },
  },
  {
    name: 'Amel B.',
    country: 'France',
    rating: 5,
    text: {
      fr: 'J’ai reçu des propositions adaptées à mon budget.',
      de: 'Ich habe Vorschläge bekommen, die wirklich zum Budget passten.',
    },
  },
];

export const faqItems: FAQItem[] = [
  {
    question: {
      fr: 'Comment fonctionne la recherche de voiture ?',
      de: 'Wie funktioniert die Fahrzeugsuche?',
    },
    answer: {
      fr: 'Vous remplissez une demande guidée. Nous résumons vos critères, vérifions les points essentiels et vous recontactons avec les prochaines étapes.',
      de: 'Sie füllen eine geführte Anfrage aus. Wir strukturieren Ihre Kriterien, prüfen die wichtigsten Punkte und melden uns mit den nächsten Schritten.',
    },
  },
  {
    question: {
      fr: 'Est-ce que je peux faire une demande depuis la France ?',
      de: 'Kann ich aus Frankreich anfragen?',
    },
    answer: {
      fr: 'Oui. Le service est pensé pour les clients en France qui recherchent un véhicule en Allemagne.',
      de: 'Ja. Der Service ist besonders für Kunden in Frankreich gedacht, die ein Fahrzeug in Deutschland suchen.',
    },
  },
  {
    question: {
      fr: 'Combien de temps faut-il pour recevoir une réponse ?',
      de: 'Wie schnell bekomme ich eine Rückmeldung?',
    },
    answer: {
      fr: 'Après votre demande, nous revenons vers vous dès que les informations ont été vérifiées et que les prochaines étapes sont claires.',
      de: 'Nach Ihrer Anfrage melden wir uns, sobald die Angaben geprüft sind und die nächsten Schritte sinnvoll vorbereitet wurden.',
    },
  },
  {
    question: {
      fr: 'Quelles informations dois-je fournir ?',
      de: 'Welche Informationen muss ich angeben?',
    },
    answer: {
      fr: 'Les informations utiles sont le type de véhicule, le budget, le kilométrage souhaité, la destination et vos coordonnées de contact.',
      de: 'Wichtig sind Fahrzeugtyp, Budget, Kilometerwunsch, Zielort und Ihre Kontaktdaten.',
    },
  },
  {
    question: {
      fr: 'Est-ce que je dois créer un compte ?',
      de: 'Muss ich ein Konto erstellen?',
    },
    answer: {
      fr: 'Non. Pour le release candidate, vous pouvez lancer la demande sans espace client.',
      de: 'Nein. Für den Release Candidate können Sie die Anfrage ohne Kundenkonto starten.',
    },
  },
  {
    question: {
      fr: 'Comment mes informations sont-elles utilisées ?',
      de: 'Wie werden meine Informationen verwendet?',
    },
    answer: {
      fr: 'Vos informations servent à comprendre votre projet automobile, structurer la demande et préparer une réponse adaptée.',
      de: 'Ihre Angaben werden genutzt, um Ihren Fahrzeugwunsch zu verstehen, die Anfrage zu strukturieren und eine passende Rückmeldung vorzubereiten.',
    },
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: { fr: 'Inspection voiture 1', de: 'Fahrzeuginspection 1' },
    image: serviceImage1Url,
    alt: { fr: 'Vue avant du véhicule', de: 'Vorderansicht des Fahrzeugs' },
  },
  {
    id: 'gallery-2',
    title: { fr: 'Inspection voiture 2', de: 'Fahrzeuginspection 2' },
    image: serviceImage2Url,
    alt: { fr: 'Vue intérieure du véhicule', de: 'Innenansicht des Fahrzeugs' },
  },
  {
    id: 'gallery-3',
    title: { fr: 'Inspection voiture 3', de: 'Fahrzeuginspection 3' },
    image: serviceImage3Url,
    alt: { fr: 'Détails du moteur', de: 'Motordetails' },
  },
  {
    id: 'gallery-4',
    title: { fr: 'Inspection voiture 4', de: 'Fahrzeuginspection 4' },
    image: bannerBmwImageUrl,
    alt: { fr: 'Vue arrière du véhicule', de: 'Hinteransicht des Fahrzeugs' },
  },
  {
    id: 'gallery-5',
    title: { fr: 'Inspection voiture 5', de: 'Fahrzeuginspection 5' },
    image: banner2ImageUrl,
    alt: { fr: 'Intérieur luxe', de: 'Luxus-Interieur' },
  },
  {
    id: 'gallery-6',
    title: { fr: 'Inspection voiture 6', de: 'Fahrzeuginspection 6' },
    image: designerImageUrl,
    alt: { fr: 'Inspection des pneus', de: 'Reifeninspektion' },
  },
];
