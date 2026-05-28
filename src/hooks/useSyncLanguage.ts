import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { defaultLanguage, isSupportedLanguage } from '../lib/language';

export function useSyncLanguage(lang: string | undefined) {
  const { i18n } = useTranslation();

  useEffect(() => {
    const nextLanguage = isSupportedLanguage(lang) ? lang : defaultLanguage;

    if (i18n.language !== nextLanguage) {
      void i18n.changeLanguage(nextLanguage);
    }

    window.localStorage.setItem('appLanguage', nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, [i18n, lang]);
}
