import { useTranslation } from 'react-i18next';
import type { ContactPageData } from '../../domain/entities/Contact';
import { ContactDataService } from '../../application/ContactDataService';

export const useContactData = (): ContactPageData => {
  const { t } = useTranslation('contact');
  const contactDataService = new ContactDataService();

  const hero = t('hero', { returnObjects: true }) as any;
  const quickActions = t('quickActions', { returnObjects: true }) as any[];
  const businessHours = t('businessHours', { returnObjects: true }) as any;
  const sections = t('sections', { returnObjects: true }) as any[];

  return contactDataService.createContactPageData(
    hero,
    quickActions,
    businessHours,
    sections
  );
};
