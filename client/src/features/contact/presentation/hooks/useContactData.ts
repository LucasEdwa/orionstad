import { useTranslation } from 'react-i18next';
import type { ContactPageData, ContactHero, QuickAction, BusinessHours, ContactSection } from '../../domain/entities/Contact';
import { ContactDataService } from '../../application/ContactDataService';

// Module-level singleton — pure data transformer, no state
const contactDataService = new ContactDataService();

/** Resolves translated contact page data into a structured `ContactPageData` object. */
export const useContactData = (): ContactPageData => {
  const { t } = useTranslation('contact');

  const hero = t('hero', { returnObjects: true }) as ContactHero;
  const quickActions = t('quickActions', { returnObjects: true }) as QuickAction[];
  const businessHours = t('businessHours', { returnObjects: true }) as BusinessHours;
  const sections = t('sections', { returnObjects: true }) as ContactSection[];

  return contactDataService.createContactPageData(
    hero,
    quickActions,
    businessHours,
    sections
  );
};
