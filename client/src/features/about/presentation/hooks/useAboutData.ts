import { useTranslation } from 'react-i18next';
import type { AboutPageData } from '../../domain/entities/About';
import { AboutDataService } from '../../application/AboutDataService';

export const useAboutData = (): AboutPageData => {
  const { t } = useTranslation('about');
  const aboutDataService = new AboutDataService();

  const hero = t('hero', { returnObjects: true }) as any;
  const sections = t('sections', { returnObjects: true }) as any[];

  return aboutDataService.createAboutPageData(hero, sections);
};
