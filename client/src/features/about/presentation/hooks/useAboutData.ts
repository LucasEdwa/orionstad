import { useTranslation } from 'react-i18next';
import type { AboutIntro, AboutStory } from '../../domain/entities/About';

export const useAboutData = (): { intro: AboutIntro; story: AboutStory } => {
  const { t } = useTranslation('about');

  return {
    intro: t('intro', { returnObjects: true }) as AboutIntro,
    story: t('story', { returnObjects: true }) as AboutStory,
  };
};
