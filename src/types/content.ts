import type { LocalizedText } from './funnel';

export interface ProcessStep {
  title: LocalizedText;
  description: LocalizedText;
}

export interface Testimonial {
  name: string;
  country: string;
  rating: number;
  text: LocalizedText;
}

export interface FAQItem {
  question: LocalizedText;
  answer: LocalizedText;
}
