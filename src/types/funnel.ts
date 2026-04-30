import type { SupportedLanguage } from './i18n';

export type QuestionType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'single_select'
  | 'multi_select'
  | 'phone'
  | 'email'
  | 'city';

export interface LocalizedText {
  de: string;
  fr: string;
}

export interface FunnelOption {
  value: string;
  label: LocalizedText;
}

export interface FunnelQuestion {
  id: string;
  key: string;
  step: number;
  type: QuestionType;
  required: boolean;
  label: LocalizedText;
  placeholder?: Partial<Record<SupportedLanguage, string>>;
  helpText?: Partial<Record<SupportedLanguage, string>>;
  options?: FunnelOption[];
}

export type FunnelAnswers = Record<string, string | number | string[] | boolean | undefined>;
