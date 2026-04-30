import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLanguage } from '../types/i18n';

const supportedLanguages: SupportedLanguage[] = ['fr', 'de'];

export function useSyncLanguage(lang: string | undefined) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const nextLanguage = supportedLanguages.includes(lang as SupportedLanguage)
      ? (lang as SupportedLanguage)
      : 'fr';

    if (i18n.language !== nextLanguage) {
      void i18n.changeLanguage(nextLanguage);
    }

    window.localStorage.setItem('appLanguage', nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, [i18n, lang]);
}
