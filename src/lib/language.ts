import type { SupportedLanguage } from '../types/i18n';

export const defaultLanguage: SupportedLanguage = 'fr';

export const supportedLanguages: SupportedLanguage[] = ['de', 'fr', 'en', 'es'];

export const localizedRouteSegments: Record<SupportedLanguage, Record<string, string>> = {
  de: {
    advice: 'beratung',
    confidentialite: 'datenschutz',
    consejo: 'beratung',
    demande: 'anfrage',
    gracias: 'danke',
    merci: 'danke',
    privacy: 'datenschutz',
    request: 'anfrage',
    solicitud: 'anfrage',
  },
  fr: {
    advice: 'conseil',
    anfrage: 'demande',
    beratung: 'conseil',
    danke: 'merci',
    datenschutz: 'confidentialite',
    gracias: 'merci',
    privacy: 'confidentialite',
    request: 'demande',
    solicitud: 'demande',
  },
  en: {
    anfrage: 'request',
    beratung: 'advice',
    confidentialite: 'privacy',
    conseil: 'advice',
    danke: 'thanks',
    datenschutz: 'privacy',
    demande: 'request',
    gracias: 'thanks',
    merci: 'thanks',
    solicitud: 'request',
  },
  es: {
    advice: 'consejo',
    anfrage: 'solicitud',
    beratung: 'consejo',
    confidentialite: 'privacidad',
    conseil: 'consejo',
    danke: 'gracias',
    datenschutz: 'privacidad',
    demande: 'solicitud',
    merci: 'gracias',
    privacy: 'privacidad',
    request: 'solicitud',
    thanks: 'gracias',
  },
};

export function isSupportedLanguage(value: string | undefined): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage);
}

export function getLanguage(value: string | undefined): SupportedLanguage {
  return isSupportedLanguage(value) ? value : defaultLanguage;
}

export function getStoredLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') {
    return defaultLanguage;
  }

  return getLanguage(window.localStorage.getItem('appLanguage') ?? undefined);
}

export function localizeRoute(language: SupportedLanguage, segment: 'request' | 'advisory' | 'privacy' | 'thankYou') {
  const segmentMap = {
    advisory: { de: 'beratung', en: 'advice', es: 'consejo', fr: 'conseil' },
    privacy: { de: 'datenschutz', en: 'privacy', es: 'privacidad', fr: 'confidentialite' },
    request: { de: 'anfrage', en: 'request', es: 'solicitud', fr: 'demande' },
    thankYou: { de: 'danke', en: 'thanks', es: 'gracias', fr: 'merci' },
  } as const;

  return segmentMap[segment][language];
}
