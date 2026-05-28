import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultLanguage, getStoredLanguage } from './language';

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
          eyebrow: 'Conciergerie Automobile',
          title: 'Votre voiture de rêve vous attend.',
          subtitle:
            'Allemagne, sélection, accompagnement. Une expérience plus simple et plus sereine.',
          buyCta: 'Commencer ma recherche',
          advisoryCta: 'Consultation',
          imageAlt: 'SUV moderne sur une route en Allemagne',
          overlayKicker: 'Recherche active',
          overlayTitle: 'Allemagne vers Europe',
          overlayText: 'Critères clairs, suivi personnel et prochaines étapes structurées.',
          overlayMetaOne: 'Résumé structuré',
          overlayMetaTwo: 'Contact direct',
          proofOne: 'Marché allemand',
          proofTwo: 'Vérification complète',
          proofThree: 'Accompagnement de A à Z',
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
          legal: 'Legal',
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
  en: {
    translation: {
      common: {
        back: 'Back',
        next: 'Next',
        submit: 'Submit',
        startRequest: 'Start my request',
      },
      landing: {
        brand: 'Mehdi Cars',
        nav: {
          contact: 'Contact',
          faq: 'FAQ',
          home: 'Home',
          label: 'Main navigation',
          mobileLabel: 'Mobile navigation',
          openMenu: 'Open menu',
          process: 'Process',
          services: 'Services',
        },
        servicesMenu: {
          advisory: {
            title: 'Buy a car',
            description: 'Support to find, compare and buy the right vehicle.',
          },
          sell: {
            title: 'Book a consultation',
            description: 'Schedule a consultation to clarify your car project.',
          },
        },
        hero: {
          eyebrow: 'Automotive Concierge',
          title: 'Your dream car is waiting.',
          subtitle: 'Germany, selection and support. A calmer way to find the right car.',
          buyCta: 'Start my search',
          advisoryCta: 'Consultation',
          proofOne: 'German market',
          proofTwo: 'Full verification',
          proofThree: 'End-to-end support',
        },
        trust: {
          germany: 'Germany to Europe',
          guidance: 'Personal guidance',
          process: 'Transparent process',
          structured: 'Structured request',
        },
        funnelPreview: {
          eyebrow: 'Guided request',
          title: 'Tell us about your vehicle project',
          description: 'Answer a few essential questions so we can prepare a more targeted search.',
          stepHint: 'The same 4 steps as in your request',
          steps: {
            brand: {
              title: 'Brand and model',
              description: 'Choose a brand and add a model if you already have one in mind.',
            },
            criteria: {
              title: 'Search criteria',
              description: 'Set your budget, minimum year, mileage and delivery destination.',
            },
            technical: {
              title: 'Technical preferences',
              description: 'Add gearbox, fuel and your desired purchase timeline.',
            },
            contact: {
              title: 'Contact and details',
              description: 'Leave your contact details and useful notes for the next steps.',
            },
          },
        },
        explanation: {
          eyebrow: 'Support',
          title: 'Clear support for your car project',
          description: 'Buying a car remotely can be complex. Mehdi Cars helps you turn your needs into a clear and actionable request.',
          cardTitle: 'What your request clarifies',
          bullets: {
            communication: 'Simple communication',
            criteria: 'Clear criteria',
            personal: 'Personal support',
            structured: 'Structured request',
          },
        },
        advantages: {
          eyebrow: 'Why use a structured request?',
          title: 'More clarity before comparing vehicles',
          subtitle: 'A well-framed request saves time and makes the next steps easier to prepare.',
          selection: {
            description: 'Compare vehicles based on your real criteria instead of browsing endless listings.',
            title: 'Clearer selection',
          },
          support: {
            description: 'Move forward with a simple structure and easier follow-up.',
            title: 'Personal support',
          },
          summary: {
            description: 'Your information becomes a usable base for your vehicle project.',
            title: 'Structured summary',
          },
          time: {
            description: 'Focus the search on the information that matters most.',
            title: 'Save time',
          },
        },
        video: {
          eyebrow: 'Explanation',
          title: 'How does the Mehdi Cars request work?',
          text: 'A short explanation helps you understand what information is useful and what happens after submission.',
        },
        germany: {
          eyebrow: 'German market',
          title: 'Why look for a car in Germany?',
          text: 'Germany offers a large vehicle market with many brands, options and price ranges.',
          bullets: {
            choice: 'Large selection',
            communication: 'Help with communication and selection',
            search: 'Structured search',
            variants: 'Many equipment variants',
          },
        },
        faq: {
          eyebrow: 'FAQ',
          title: 'Frequently asked questions',
          subtitle: 'The key answers before starting your vehicle request in Germany.',
        },
        contact: {
          title: 'Ready to start your request?',
          text: 'Describe your project in a few minutes and receive the next steps.',
        },
        footer: {
          description: 'Personal support for customers looking for a vehicle in Germany.',
          imprint: 'Imprint',
          legal: 'Legal',
          navigation: 'Navigation',
          privacy: 'Privacy',
          rights: 'Release candidate. Legal texts should be finalized before production.',
          services: 'Services',
        },
        services: {
          advisory: { title: 'Buy a car' },
          sell: { title: 'Book a consultation' },
        },
      },
      funnel: {
        title: 'Your vehicle request',
        subtitle: 'Answer the essential questions. It takes about 2 minutes.',
        step: 'Step {{current}} of {{total}}',
        privacy: 'I agree that my information may be stored and used to process my request.',
        required: 'This field is required.',
      },
      advisory: {
        title: 'Book a consultation',
        subtitle: 'Schedule a call with our experts to discuss your vehicle project.',
        comingSoon: 'This page is being prepared. Please check back soon.',
      },
      thankYou: {
        title: 'Thank you for your request!',
        subtitle: 'We received your information and are preparing the next steps.',
      },
      report: {
        title: 'Internal report',
        copy: 'Copy report',
      },
    },
  },
  es: {
    translation: {
      common: {
        back: 'Atrás',
        next: 'Siguiente',
        submit: 'Enviar',
        startRequest: 'Iniciar mi solicitud',
      },
      landing: {
        brand: 'Mehdi Cars',
        nav: {
          contact: 'Contacto',
          faq: 'FAQ',
          home: 'Inicio',
          label: 'Navegación principal',
          mobileLabel: 'Navegación móvil',
          openMenu: 'Abrir menú',
          process: 'Proceso',
          services: 'Servicios',
        },
        servicesMenu: {
          advisory: {
            title: 'Comprar un coche',
            description: 'Acompañamiento para encontrar, comparar y comprar el vehículo adecuado.',
          },
          sell: {
            title: 'Reservar una consulta',
            description: 'Reserve una consulta para aclarar su proyecto de coche.',
          },
        },
        hero: {
          eyebrow: 'Conserjería automotriz',
          title: 'Tu coche ideal te espera.',
          subtitle: 'Alemania, selección y acompañamiento. Una forma más simple de encontrar el coche adecuado.',
          buyCta: 'Empezar mi búsqueda',
          advisoryCta: 'Consulta',
          proofOne: 'Mercado alemán',
          proofTwo: 'Verificación completa',
          proofThree: 'Acompañamiento integral',
        },
        trust: {
          germany: 'Alemania hacia Europa',
          guidance: 'Acompañamiento personal',
          process: 'Proceso transparente',
          structured: 'Solicitud estructurada',
        },
        funnelPreview: {
          eyebrow: 'Solicitud guiada',
          title: 'Cuéntanos tu proyecto de vehículo',
          description: 'Responde algunas preguntas esenciales para preparar una búsqueda más precisa.',
          stepHint: 'Los mismos 4 pasos que en tu solicitud',
          steps: {
            brand: {
              title: 'Marca y modelo',
              description: 'Elige una marca y añade un modelo si ya tienes una idea.',
            },
            criteria: {
              title: 'Criterios de búsqueda',
              description: 'Define presupuesto, año mínimo, kilometraje y destino de entrega.',
            },
            technical: {
              title: 'Preferencias técnicas',
              description: 'Añade caja de cambios, combustible y plazo de compra.',
            },
            contact: {
              title: 'Contacto y detalles',
              description: 'Deja tus datos y notas útiles para los siguientes pasos.',
            },
          },
        },
        explanation: {
          eyebrow: 'Acompañamiento',
          title: 'Acompañamiento claro para tu proyecto',
          description: 'Comprar un coche a distancia puede ser complejo. Mehdi Cars transforma tu necesidad en una solicitud clara y útil.',
          cardTitle: 'Lo que aclara tu solicitud',
          bullets: {
            communication: 'Comunicación sencilla',
            criteria: 'Criterios claros',
            personal: 'Acompañamiento personal',
            structured: 'Solicitud estructurada',
          },
        },
        advantages: {
          eyebrow: '¿Por qué una solicitud estructurada?',
          title: 'Más claridad antes de comparar vehículos',
          subtitle: 'Una solicitud bien definida ahorra tiempo y facilita los próximos pasos.',
          selection: {
            description: 'Compare vehículos según sus criterios reales en lugar de revisar demasiados anuncios.',
            title: 'Selección más clara',
          },
          support: {
            description: 'Avance con una estructura simple y un seguimiento más fácil.',
            title: 'Acompañamiento personal',
          },
          summary: {
            description: 'Su información se convierte en una base útil para su proyecto.',
            title: 'Resumen estructurado',
          },
          time: {
            description: 'Concentre la búsqueda en la información realmente importante.',
            title: 'Ahorro de tiempo',
          },
        },
        video: {
          eyebrow: 'Explicación',
          title: '¿Cómo funciona la solicitud con Mehdi Cars?',
          text: 'Una breve explicación ayuda a entender qué información es útil y qué ocurre después del envío.',
        },
        germany: {
          eyebrow: 'Mercado alemán',
          title: '¿Por qué buscar un coche en Alemania?',
          text: 'Alemania ofrece un mercado amplio con muchas marcas, opciones y rangos de precio.',
          bullets: {
            choice: 'Gran selección',
            communication: 'Ayuda con la comunicación y la selección',
            search: 'Búsqueda estructurada',
            variants: 'Muchas variantes de equipamiento',
          },
        },
        faq: {
          eyebrow: 'FAQ',
          title: 'Preguntas frecuentes',
          subtitle: 'Las respuestas clave antes de iniciar su solicitud de vehículo en Alemania.',
        },
        contact: {
          title: '¿Listo para empezar tu solicitud?',
          text: 'Describe tu proyecto en unos minutos y recibe los siguientes pasos.',
        },
        footer: {
          description: 'Acompañamiento personal para clientes que buscan un vehículo en Alemania.',
          imprint: 'Aviso legal',
          legal: 'Legal',
          navigation: 'Navegación',
          privacy: 'Privacidad',
          rights: 'Release candidate. Los textos legales deben finalizarse antes de producción.',
          services: 'Servicios',
        },
        services: {
          advisory: { title: 'Comprar un coche' },
          sell: { title: 'Reservar una consulta' },
        },
      },
      funnel: {
        title: 'Tu solicitud de vehículo',
        subtitle: 'Responde las preguntas esenciales. Toma unos 2 minutos.',
        step: 'Paso {{current}} de {{total}}',
        privacy: 'Acepto que mis datos se almacenen y se utilicen para procesar mi solicitud.',
        required: 'Este campo es obligatorio.',
      },
      advisory: {
        title: 'Reservar una consulta',
        subtitle: 'Agenda una cita con nuestros expertos para hablar de tu proyecto.',
        comingSoon: 'Esta página está en preparación. Vuelva pronto.',
      },
      thankYou: {
        title: 'Gracias por tu solicitud',
        subtitle: 'Hemos recibido tu información y estamos preparando los siguientes pasos.',
      },
      report: {
        title: 'Informe interno',
        copy: 'Copiar informe',
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
          eyebrow: 'Automobil-Concierge',
          title: 'Ihr Traumfahrzeug wartet.',
          subtitle:
            'Deutschland, Auswahl und Begleitung. Klarer, persönlicher und entspannter zum richtigen Fahrzeug.',
          buyCta: 'Suche starten',
          advisoryCta: 'Beratung',
          imageAlt: 'Moderner SUV auf einer Straße in Deutschland',
          overlayKicker: 'Aktive Suche',
          overlayTitle: 'Deutschland nach Europa',
          overlayText: 'Klare Kriterien, persönliche Begleitung und strukturierte nächste Schritte.',
          overlayMetaOne: 'Strukturierter Bericht',
          overlayMetaTwo: 'Direkter Kontakt',
          proofOne: 'Deutscher Markt',
          proofTwo: 'Vollständige Prüfung',
          proofThree: 'Rundum-Begleitung',
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
  fallbackLng: defaultLanguage,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
