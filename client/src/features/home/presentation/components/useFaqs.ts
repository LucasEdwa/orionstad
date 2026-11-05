import { useTranslation } from 'react-i18next';

export interface FAQItem {
  question: string;
  answer: string;
}

/** FAQ entries in the active language; also feeds the FAQPage structured data on the home page */
export const useFaqs = (): FAQItem[] => {
  const { t } = useTranslation('home');
  const items = t('faq.items', { returnObjects: true });
  return Array.isArray(items) ? (items as FAQItem[]) : [];
};
