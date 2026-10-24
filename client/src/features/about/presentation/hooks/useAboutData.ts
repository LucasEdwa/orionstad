import { useTranslation } from 'react-i18next';
import type { AboutPageData, AboutIntro, AboutStory, AboutPillar, AboutSection } from '../../domain/entities/About';
import { AboutDataService } from '../../application/AboutDataService';

// Module-level singleton — pure data transformer, no state
const aboutDataService = new AboutDataService();

export const useAboutData = (): AboutPageData => {
  const { t } = useTranslation('about');

  const intro = t('intro', { returnObjects: true }) as AboutIntro;
  const story = t('story', { returnObjects: true }) as AboutStory;
  const pillars = t('pillars', { returnObjects: true }) as AboutPillar[];
  const sections = t('sections', { returnObjects: true }) as AboutSection[];

  return aboutDataService.createAboutPageData(intro, story, pillars, sections);
};
