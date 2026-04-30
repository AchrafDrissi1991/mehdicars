import { ConfigProvider } from 'antd';
import deDE from 'antd/locale/de_DE';
import frFR from 'antd/locale/fr_FR';
import type { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';
import { antdTheme } from '../styles/antdTheme';

export function AppProviders({ children }: PropsWithChildren) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'de' ? deDE : frFR;

  return (
    <ConfigProvider locale={locale} theme={antdTheme}>
      {children}
    </ConfigProvider>
  );
}
