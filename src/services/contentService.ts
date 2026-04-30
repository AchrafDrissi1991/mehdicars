import { faqItems, processSteps, testimonials } from '../features/content/contentData';

export async function getPublicContent() {
  return {
    processSteps,
    testimonials,
    faqItems,
  };
}
