import { ConfigProvider } from 'antd';
import deDE from 'antd/locale/de_DE';
import enUS from 'antd/locale/en_US';
import frFR from 'antd/locale/fr_FR';
import esES from 'antd/locale/es_ES';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { antdTheme } from '../styles/antdTheme';
import { getLanguage } from '../lib/language';

export function AppProviders({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const language = getLanguage(i18n.language);
  const localeByLanguage = {
    de: deDE,
    en: enUS,
    es: esES,
    fr: frFR,
  };
  const locale = localeByLanguage[language];

  return (
    <ConfigProvider locale={locale} theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}
