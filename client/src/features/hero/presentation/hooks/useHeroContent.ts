import { useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { StaticContentRepository } from '../../infrastructure/StaticContentRepository';
import type { HeroContent } from '../../domain/entities/Hero';
import heroImage from '../../../../assets/design-living-room.jpg';

// Module-level singleton — pure config, no state
const fallbackContent = new StaticContentRepository().getHeroContent();

export const useHeroContent = () => {
  const { t, ready } = useTranslation("home");

  const content = useMemo<HeroContent>(() => {
    if (!ready) return fallbackContent;

    const hero = t("hero", { returnObjects: true }) as Partial<HeroContent>;
    if (!hero?.titleLine1 || !Array.isArray(hero.trust)) return fallbackContent;

    return { ...fallbackContent, ...hero };
  }, [t, ready]);

  return { content, heroImage };
};
