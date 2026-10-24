import { useTranslation } from 'react-i18next';
import type { ContactPageData, ContactPageIntro, ContactChannels, ContactFormCopy } from '../../domain/entities/Contact';
import { ContactDataService } from '../../application/ContactDataService';

// Module-level singleton — pure data transformer, no state
const contactDataService = new ContactDataService();

/** Resolves translated contact page data into a structured `ContactPageData` object. */
export const useContactData = (): ContactPageData => {
  const { t } = useTranslation('contact');

  const page = t('page', { returnObjects: true }) as ContactPageIntro;
  const channels = t('channels', { returnObjects: true }) as ContactChannels;
  const form = t('form', { returnObjects: true }) as ContactFormCopy;

  return contactDataService.createContactPageData(page, channels, form);
};
