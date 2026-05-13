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

export interface MediaItem {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  youtubeId: string;
  thumbnail?: string;
  duration?: string;
  category: LocalizedText;
}

export interface GalleryItem {
  id: string;
  title: LocalizedText;
  image: string;
  alt: LocalizedText;
}
