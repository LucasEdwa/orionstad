import { useTranslation } from 'react-i18next';
import type { AboutPageData, AboutHero, AboutSection } from '../../domain/entities/About';
import { AboutDataService } from '../../application/AboutDataService';

export const useAboutData = (): AboutPageData => {
  const { t } = useTranslation('about');
  const aboutDataService = new AboutDataService();

  const hero = t('hero', { returnObjects: true }) as AboutHero;
  const sections = t('sections', { returnObjects: true }) as AboutSection[];

  return aboutDataService.createAboutPageData(hero, sections);
};
