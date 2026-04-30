import type { SupportedLanguage } from '../types/i18n';

export function pickText(text: { de: string; fr: string }, language: SupportedLanguage) {
  return text[language] ?? text.fr;
}
