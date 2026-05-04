import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { SupportedLanguage } from '../types/i18n';

function getStoredLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return 'fr';
  }

  const storedLanguage = window.localStorage.getItem('appLanguage');
  return storedLanguage === 'de' || storedLanguage === 'fr' ? storedLanguage : 'fr';
}

export const resources = {
  fr: {
    translation: {
      common: {
        back: 'Retour',
        next: 'Suivant',
        submit: 'Envoyer',
        startRequest: 'Commencer ma demande',
      },
      landing: {
        brand: 'Mehdi Cars',
        brandMark: 'MC',
        nav: {
          contact: 'Contact',
          faq: 'FAQ',
          home: 'Accueil',
          label: 'Navigation principale',
          mobileLabel: 'Navigation mobile',
          openMenu: 'Ouvrir le menu',
          process: 'Fonctionnement',
          services: 'Services',
        },
        servicesMenu: {
          advisory: {
            title: 'Acheter une voiture',
            description: 'Accompagnement pour trouver, comparer et acheter le bon vehicule.',
          },
          sell: {
            title: 'Reserver un conseil',
            description: 'Prenez un rendez-vous de conseil pour clarifier votre projet auto.',
          },
        },
        hero: {
          eyebrow: 'Mehdi Cars',
          title: 'Trouvez votre voiture, simplement.',
          subtitle:
            'Décrivez votre projet en quelques minutes. Nous structurons votre demande et vous accompagnons dans la recherche du véhicule adapté.',
          buyCta: 'Acheter une voiture',
          advisoryCta: 'Reserver un conseil',
          imageAlt: 'SUV moderne sur une route en Allemagne',
          overlayKicker: 'Recherche active',
          overlayTitle: 'Allemagne vers Europe',
          overlayText: 'Critères clairs, suivi personnel et prochaines étapes structurées.',
          overlayMetaOne: 'Résumé structuré',
          overlayMetaTwo: 'Contact direct',
        },
        trust: {
          germany: 'Allemagne vers Europe',
          guidance: 'Accompagnement personnalisé',
          process: 'Processus transparent',
          structured: 'Demande structurée',
        },
        explanation: {
          eyebrow: 'Accompagnement',
          title: 'Un accompagnement clair pour votre projet automobile',
          description:
            'Acheter une voiture à distance peut être compliqué : annonces difficiles à comparer, informations incomplètes, budget, kilométrage, motorisation et livraison. Avec Mehdi Cars, vous décrivez votre besoin et nous transformons votre demande en un résumé clair pour vous accompagner efficacement.',
          cardTitle: 'Ce que votre demande clarifie',
          bullets: {
            communication: 'Communication simple',
            criteria: 'Critères clairement définis',
            personal: 'Accompagnement personnalisé',
            structured: 'Demande structurée',
          },
        },
        intro: {
          eyebrow: 'Bienvenue',
          title: 'Votre accompagnement automobile entre la France et l’Allemagne',
          description:
            'Vous nous indiquez le type de véhicule recherché, votre budget, le kilométrage souhaité et votre lieu de livraison. Nous transformons ces informations en un résumé clair pour vous accompagner efficacement.',
          mediaLabel: 'Aperçu',
          mediaTitle: 'Une demande claire avant la recherche',
          mediaText: 'Chaque réponse aide à préparer une recherche plus précise et plus rapide.',
          benefitsTitle: 'Ce qui change pour vous',
          benefits: {
            contact: 'Communication simple',
            france: 'Adapté aux clients en France',
            report: 'Résumé clair de votre demande',
            search: 'Recherche structurée',
          },
        },
        advantages: {
          eyebrow: 'Pourquoi passer par une demande structurée ?',
          title: 'Plus de clarté avant de comparer les véhicules',
          subtitle:
            'Une demande bien cadrée aide à gagner du temps, comparer les bonnes options et préparer les prochaines étapes avec plus de précision.',
          selection: {
            description: 'Comparer les véhicules selon vos critères réels plutôt que naviguer parmi trop d’annonces.',
            title: 'Sélection plus claire',
          },
          support: {
            description: 'Vous avancez avec un cadre simple, une demande lisible et une suite plus facile à préparer.',
            title: 'Accompagnement personnel',
          },
          summary: {
            description: 'Les informations deviennent une base exploitable pour comprendre votre projet automobile.',
            title: 'Rapport structuré',
          },
          time: {
            description: 'Vous concentrez la recherche sur les informations utiles : budget, modèle, usage et destination.',
            title: 'Gain de temps',
          },
        },
        process: {
          title: 'Vos avantages avec Mehdi',
          subtitle: 'Simple, rapide et fiable: nous rendons le marche auto d\'occasion plus clair, que vous achetiez ou vendiez.',
        },
        services: {
          eyebrow: 'Services',
          title: 'Deux services pour avancer sereinement',
          subtitle:
            'Que vous vouliez acheter une voiture ou reserver un conseil, le processus reste clair, personnel et structure.',
          advisory: {
            cta: 'Acheter une voiture',
            description:
              'Pour les clients qui recherchent un vehicule adapte et souhaitent etre accompagnes dans le choix et l’achat.',
            label: 'Achat',
            title: 'Acheter une voiture',
          },
          sell: {
            cta: 'Reserver un conseil',
            description:
              'Pour les clients qui veulent un accompagnement personnalise avant de lancer leur projet automobile.',
            label: 'Conseil',
            title: 'Reserver un conseil',
          },
        },
        funnelPreview: {
          eyebrow: 'Demande guidée',
          title: 'Parlez-nous de votre projet automobile',
          description:
            'Répondez à quelques questions essentielles. Votre demande est structurée pour préparer une recherche plus ciblée.',
          stepHint: 'Les mêmes 4 étapes que dans votre demande',
          steps: {
            brand: {
              title: 'Marque et modèle',
              description: 'Choisissez une marque et précisez le modèle recherché si vous avez déjà une idée.',
            },
            criteria: {
              title: 'Critères de recherche',
              description: 'Définissez le budget, l’année minimum, le kilométrage et le lieu de livraison.',
            },
            technical: {
              title: 'Préférences techniques',
              description: 'Indiquez vos préférences pour la boîte, le carburant et le délai d’achat.',
            },
            contact: {
              title: 'Contact et précisions',
              description: 'Ajoutez vos coordonnées et les détails utiles pour préparer la suite.',
            },
          },
        },
        vehicles: {
          eyebrow: 'Wunschauto',
          title: 'Des critères typiques pour une demande',
          subtitle:
            'Ces exemples montrent comment une demande peut être cadrée. Ils ne représentent pas des offres réelles.',
          cta: 'Démarrer avec mes critères',
          buy: {
            title: 'Votre voiture de rêve vous attend !',
            description: 'Dites-nous ce que vous cherchez – nous trouvons les meilleures offres pour vous. Sans stress, seulement des résultats qui correspondent.',
            cta: 'Acheter une voiture',
          },
          advisory: {
            title: 'Besoin de conseils ?',
            description: 'Réservez un entretien personnalisé pour clarifier votre projet automobile avec un expert.',
            cta: 'Réserver un conseil',
          },
          electric: {
            title: 'Électrique / hybride',
            specs: ['Usage quotidien', 'Équipement moderne', 'Budget défini'],
          },
          premium: {
            title: 'Premiumfahrzeug',
            specs: ['Automatique', 'Historique clair', 'Confort'],
          },
          suv: {
            title: 'SUV familial',
            specs: ['À partir de 2019', 'Max. 80 000 km', 'Livraison France'],
          },
        },
        video: {
          eyebrow: 'Explication',
          title: 'Comment fonctionne la demande avec Mehdi Cars ?',
          text: 'Une courte explication peut aider à comprendre quelles informations sont utiles et ce qui se passe après l’envoi.',
        },
        germany: {
          eyebrow: 'Marché allemand',
          title: 'Pourquoi chercher une voiture en Allemagne ?',
          text: 'L’Allemagne offre un grand marché automobile avec de nombreuses marques, équipements et gammes de prix. L’essentiel est de structurer la sélection et de comparer les annonces adaptées à votre projet.',
          bullets: {
            choice: 'Grande sélection',
            communication: 'Aide à la communication et au choix',
            search: 'Recherche structurée',
            variants: 'Nombreuses variantes d’équipement',
          },
        },
        reviews: {
          eyebrow: 'Avis clients',
          title: 'Déjà des clients accompagnés dans leur projet automobile',
        },
        faq: {
          eyebrow: 'FAQ',
          title: 'Questions fréquentes',
          subtitle:
            'Les réponses essentielles avant de lancer votre demande de véhicule en Allemagne.',
        },
        contact: {
          title: 'Prêt à commencer votre demande ?',
          text: 'Décrivez votre projet en quelques minutes et recevez les prochaines étapes.',
        },
        footer: {
          description:
            'Accompagnement personnel pour les clients en France qui recherchent un véhicule en Allemagne.',
          imprint: 'Impressum',
          legal: 'Liens',
          navigation: 'Navigation',
          privacy: 'Confidentialité',
          rights: 'Release candidate. Textes juridiques à finaliser avant production.',
          services: 'Services',
        },
      },
      funnel: {
        title: 'Votre demande véhicule',
        subtitle: 'Répondez aux questions essentielles. Cela prend environ 2 minutes.',
        step: 'Étape {{current}} sur {{total}}',
        privacy:
          'J’accepte que mes informations soient enregistrées et utilisées pour traiter ma demande et me contacter.',
        required: 'Ce champ est obligatoire.',
      },      advisory: {
        title: 'Reserver un conseil',
        subtitle: 'Prenez un rendez-vous avec nos experts pour clarifier votre projet automobile.',
        comingSoon: 'Cette page est en préparation. Veuillez revenir bientôt.',
      },      thankYou: {
        title: 'Merci pour votre demande !',
        subtitle: 'Nous avons reçu vos informations et préparons les prochaines étapes.',
      },
      report: {
        title: 'Rapport interne',
        copy: 'Copier le rapport',
      },
    },
  },
  de: {
    translation: {
      common: {
        back: 'Zurück',
        next: 'Weiter',
        submit: 'Absenden',
        startRequest: 'Jetzt anfragen',
      },
      landing: {
        brand: 'Mehdi Cars',
        brandMark: 'MC',
        nav: {
          contact: 'Kontakt',
          faq: 'FAQ',
          home: 'Home',
          label: 'Hauptnavigation',
          mobileLabel: 'Mobile Navigation',
          openMenu: 'Menü öffnen',
          process: 'Ablauf',
          services: 'Leistungen',
        },
        servicesMenu: {
          advisory: {
            title: 'Auto kaufen',
            description: 'Begleitung bei Suche, Vergleich und Kaufentscheidung.',
          },
          sell: {
            title: 'Beratung buchen',
            description: 'Buchen Sie ein Beratungsgespraech fuer Ihr Fahrzeugprojekt.',
          },
        },
        hero: {
          eyebrow: 'Mehdi Cars',
          title: 'Finden Sie Ihr Fahrzeug in Deutschland, einfach und transparent.',
          subtitle:
            'Beschreiben Sie Ihr Wunschfahrzeug in wenigen Minuten. Wir strukturieren Ihre Anfrage und begleiten Sie bei der Suche nach dem passenden Auto.',
          buyCta: 'Auto kaufen',
          advisoryCta: 'Beratung buchen',
          imageAlt: 'Moderner SUV auf einer Straße in Deutschland',
          overlayKicker: 'Aktive Suche',
          overlayTitle: 'Deutschland nach Europa',
          overlayText: 'Klare Kriterien, persönliche Begleitung und strukturierte nächste Schritte.',
          overlayMetaOne: 'Strukturierter Bericht',
          overlayMetaTwo: 'Direkter Kontakt',
        },
        trust: {
          germany: 'Deutschland nach Europa',
          guidance: 'Persönliche Begleitung',
          process: 'Transparenter Prozess',
          structured: 'Strukturierte Anfrage',
        },
        explanation: {
          eyebrow: 'Begleitung',
          title: 'Klare Begleitung für Ihre Fahrzeugsuche',
          description:
            'Ein Auto aus der Ferne zu suchen kann kompliziert sein: viele Anzeigen, unklare Informationen, Budgetfragen, Kilometerstand, Ausstattung und Zielort. Mit Mehdi Cars beschreiben Sie Ihren Bedarf, und wir erstellen daraus eine klare Anfrageübersicht.',
          cardTitle: 'Was Ihre Anfrage klärt',
          bullets: {
            communication: 'Einfache Kommunikation',
            criteria: 'Klare Fahrzeugkriterien',
            personal: 'Persönliche Begleitung',
            structured: 'Strukturierte Anfrage',
          },
        },
        intro: {
          eyebrow: 'Willkommen',
          title: 'Ihre persönliche Autovermittlung zwischen Frankreich und Deutschland',
          description:
            'Sie teilen uns Fahrzeugtyp, Budget, Kilometerwunsch und Zielort mit. Daraus erstellen wir eine klare Übersicht, damit wir Sie gezielt bei der Fahrzeugsuche unterstützen können.',
          mediaLabel: 'Einblick',
          mediaTitle: 'Eine klare Anfrage vor der Suche',
          mediaText: 'Jede Antwort hilft, die Suche präziser und schneller vorzubereiten.',
          benefitsTitle: 'Was Sie erhalten',
          benefits: {
            contact: 'Einfache Kommunikation',
            france: 'Geeignet für Kunden in Frankreich',
            report: 'Klarer Bericht Ihrer Anfrage',
            search: 'Strukturierte Fahrzeugsuche',
          },
        },
        advantages: {
          eyebrow: 'Warum strukturiert anfragen?',
          title: 'Mehr Klarheit vor dem Fahrzeugvergleich',
          subtitle:
            'Eine gut vorbereitete Anfrage spart Zeit, macht Kriterien vergleichbarer und hilft, die nächsten Schritte gezielter vorzubereiten.',
          selection: {
            description: 'Fahrzeuge nach Ihren echten Kriterien vergleichen, statt zu viele Anzeigen ungefiltert zu prüfen.',
            title: 'Klarere Auswahl',
          },
          support: {
            description: 'Sie behalten eine einfache Struktur, klare Angaben und eine gut vorbereitete weitere Abstimmung.',
            title: 'Persönliche Begleitung',
          },
          summary: {
            description: 'Ihre Angaben werden zu einer nutzbaren Grundlage für Ihr Fahrzeugprojekt.',
            title: 'Strukturierter Bericht',
          },
          time: {
            description: 'Die Suche konzentriert sich auf die relevanten Punkte: Budget, Modell, Nutzung und Zielort.',
            title: 'Zeit sparen',
          },
        },
        process: {
          title: 'Deine Vorteile mit Mehdi',
          subtitle: 'Stressfrei, schnell und zuverlaessig: Wir machen den Gebrauchtwagenmarkt fuer dich deutlich einfacher.',
        },
        services: {
          eyebrow: 'Leistungen',
          title: 'Zwei Services fuer Ihr Fahrzeugprojekt',
          subtitle:
            'Ob Sie ein Auto kaufen oder eine Beratung buchen moechten: Der Ablauf bleibt klar, persoenlich und strukturiert.',
          advisory: {
            cta: 'Auto kaufen',
            description:
              'Fuer Kunden, die ein passendes Fahrzeug suchen und Unterstuetzung bei Auswahl und Kaufentscheidung brauchen.',
            label: 'Kauf',
            title: 'Auto kaufen',
          },
          sell: {
            cta: 'Beratung buchen',
            description:
              'Fuer Kunden, die vor dem Start eine persoenliche Beratung zu Kriterien, Budget und naechsten Schritten wollen.',
            label: 'Beratung',
            title: 'Beratung buchen',
          },
        },
        funnelPreview: {
          eyebrow: 'Geführte Anfrage',
          title: 'Erzählen Sie uns von Ihrem Fahrzeugprojekt',
          description:
            'Beantworten Sie wenige wichtige Fragen. Daraus entsteht eine strukturierte Anfrage für die gezielte Vorbereitung.',
          stepHint: 'Dieselben 4 Schritte wie in Ihrer Anfrage',
          steps: {
            brand: {
              title: 'Marke und Modell',
              description: 'Wählen Sie eine Marke und nennen Sie ein Modell, falls Sie schon eines im Blick haben.',
            },
            criteria: {
              title: 'Suchkriterien',
              description: 'Legen Sie Budget, Mindestbaujahr, Kilometerstand und Zielort fest.',
            },
            technical: {
              title: 'Technische Wünsche',
              description: 'Ergänzen Sie Getriebe, Kraftstoffart und den gewünschten Kaufzeitraum.',
            },
            contact: {
              title: 'Kontakt und Details',
              description: 'Hinterlassen Sie Ihre Kontaktdaten und wichtige Hinweise für die nächsten Schritte.',
            },
          },
        },
        vehicles: {
          eyebrow: 'Wunschauto',
          title: 'Typische Kriterien für Ihre Anfrage',
          subtitle:
            'Diese Beispiele zeigen, wie eine Anfrage strukturiert werden kann. Sie sind keine echten Fahrzeugangebote.',
          cta: 'Mit meinen Kriterien starten',
          buy: {
            title: 'Dein Traumwagen wartet!',
            description: 'Sag uns, was du suchst – wir finden die besten Angebote für dich. Kein Stress, nur Ergebnisse die passen.',
            cta: 'Auto kaufen',
          },
          advisory: {
            title: 'Beratung buchen',
            description: 'Buche jetzt ein persönliches Beratungsgespräch und kläre dein Fahrzeugprojekt Schritt für Schritt.',
            cta: 'Beratung buchen',
          },
          electric: {
            title: 'Elektro / Hybrid',
            specs: ['Alltagstauglich', 'Moderne Ausstattung', 'Budget definiert'],
          },
          premium: {
            title: 'Premiumfahrzeug',
            specs: ['Automatik', 'Klare Historie', 'Komfort'],
          },
          suv: {
            title: 'Familien-SUV',
            specs: ['Ab 2019', 'Max. 80.000 km', 'Lieferort Frankreich'],
          },
        },
        video: {
          eyebrow: 'Erklärung',
          title: 'So funktioniert die Anfrage mit Mehdi Cars',
          text: 'Eine kurze Erklärung hilft zu verstehen, welche Informationen wichtig sind und was nach dem Absenden passiert.',
        },
        germany: {
          eyebrow: 'Deutscher Markt',
          title: 'Warum ein Fahrzeug aus Deutschland interessant sein kann',
          text: 'Deutschland bietet einen großen Fahrzeugmarkt mit vielen Marken, Ausstattungen und unterschiedlichen Preisbereichen. Wichtig ist dabei eine strukturierte Auswahl und Prüfung der passenden Angebote.',
          bullets: {
            choice: 'Große Auswahl',
            communication: 'Unterstützung bei Kommunikation und Auswahl',
            search: 'Strukturierte Suche',
            variants: 'Viele Ausstattungsvarianten',
          },
        },
        reviews: {
          eyebrow: 'Kundenstimmen',
          title: 'Kunden, die wir bei ihrer Fahrzeugsuche begleiten',
        },
        faq: {
          eyebrow: 'FAQ',
          title: 'Häufige Fragen',
          subtitle:
            'Die wichtigsten Antworten, bevor Sie Ihre Anfrage für ein Fahrzeug in Deutschland starten.',
        },
        contact: {
          title: 'Bereit, Ihre Anfrage zu starten?',
          text: 'Beschreiben Sie Ihr Wunschfahrzeug in wenigen Minuten und erhalten Sie die nächsten Schritte.',
        },
        footer: {
          description:
            'Persönliche Begleitung für Kunden in Frankreich, die ein Fahrzeug in Deutschland suchen.',
          imprint: 'Impressum',
          legal: 'Rechtliches',
          navigation: 'Navigation',
          privacy: 'Datenschutz',
          rights: 'Release Candidate. Rechtstexte vor Produktion finalisieren.',
          services: 'Leistungen',
        },
      },
      funnel: {
        title: 'Ihre Fahrzeuganfrage',
        subtitle: 'Beantworten Sie die wichtigsten Fragen. Das dauert ca. 2 Minuten.',
        step: 'Schritt {{current}} von {{total}}',
        privacy:
          'Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage gespeichert und zur Kontaktaufnahme verwendet werden.',
        required: 'Dieses Feld ist erforderlich.',
      },
      advisory: {
        title: 'Beratung buchen',
        subtitle: 'Vereinbaren Sie einen Termin mit unseren Experten, um Ihr Fahrzeugprojekt zu besprechen.',
        comingSoon: 'Diese Seite wird vorbereitet. Bitte versuchen Sie es später erneut.',
      },
      thankYou: {
        title: 'Danke fuer Ihre Anfrage!',
        subtitle: 'Wir haben Ihre Angaben erhalten und bereiten die nächsten Schritte vor.',
      },
      report: {
        title: 'Interner Bericht',
        copy: 'Bericht kopieren',
      },
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: getStoredLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
