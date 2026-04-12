import { useTranslation } from 'react-i18next';
import type { ContactPageData, ContactHero, QuickAction, BusinessHours, ContactSection } from '../../domain/entities/Contact';
import { ContactDataService } from '../../application/ContactDataService';

export const useContactData = (): ContactPageData => {
  const { t } = useTranslation('contact');
  const contactDataService = new ContactDataService();

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
