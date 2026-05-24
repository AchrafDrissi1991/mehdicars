import type { SupportedLanguage } from '../types/i18n';

export function pickText<T>(text: { de: T; fr: T }, language: SupportedLanguage) {
  return text[language] ?? text.fr;
}
