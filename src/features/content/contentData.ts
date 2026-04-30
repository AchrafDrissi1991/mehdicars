import type { FAQItem, ProcessStep, Testimonial } from '../../types/content';

export const processSteps: ProcessStep[] = [
  {
    title: { fr: 'Commencer la demande', de: 'Anfrage starten' },
    description: {
      fr: 'Vous lancez une demande guidée avec les informations essentielles.',
      de: 'Sie starten eine geführte Anfrage mit den wichtigsten Angaben.',
    },
  },
  {
    title: { fr: 'Décrire le véhicule recherché', de: 'Fahrzeugwunsch beschreiben' },
    description: {
      fr: 'Vous précisez marque, modèle, budget, kilométrage et destination.',
      de: 'Sie beschreiben Marke, Modell, Budget, Kilometer und Zielort.',
    },
  },
  {
    title: { fr: 'Résumé interne généré', de: 'Bericht wird intern erstellt' },
    description: {
      fr: 'Votre demande devient un résumé clair pour préparer les prochaines étapes.',
      de: 'Aus Ihrer Anfrage entsteht eine klare Übersicht für die nächsten Schritte.',
    },
  },
  {
    title: { fr: 'Recevoir les prochaines étapes', de: 'Persönliche Rückmeldung erhalten' },
    description: {
      fr: 'Vous recevez une réponse personnalisée et les points à clarifier.',
      de: 'Sie erhalten eine persönliche Rückmeldung und die offenen Punkte.',
    },
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
