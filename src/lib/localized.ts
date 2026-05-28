import type { SupportedLanguage } from '../types/i18n';

export function pickText<T>(text: Partial<Record<SupportedLanguage, T>>, language: SupportedLanguage): T {
  const value = text[language] ?? text.fr ?? text.de ?? text.en ?? text.es;

  if (value === undefined) {
    throw new Error('Missing localized text value.');
  }

  return value;
}
