import { useMemo } from 'react';
import { useTranslation } from "react-i18next";
import { AssetService } from '../../application/AssetService';
import { StaticContentRepository } from '../../infrastructure/StaticContentRepository';
import type { HeroContent } from '../../domain/entities/Hero';

// Module-level singletons — pure config, no state
const assetService = new AssetService();
const staticRepository = new StaticContentRepository();
const videoConfig = assetService.getVideoConfig();
const brandAssets = assetService.getBrandAssets();
const fallbackContent = staticRepository.getHeroContent();

export const useHeroContent = () => {
  const { t, ready } = useTranslation("home");

  const content = useMemo<HeroContent>(() => {
    if (!ready) return fallbackContent;

    const welcome = t("hero.welcome");
    const subtitle = t("hero.subtitle");
    const bookNow = t("hero.bookNow");

    if (!welcome || !subtitle || !bookNow) return fallbackContent;

    return {
      welcome,
      subtitle,
      bookNow,
      learnMore: t("hero.learnMore"),
      licensedInsured: t("hero.licensedInsured"),
      fiveStarService: t("hero.fiveStarService"),
      ecoFriendly: t("hero.eco-friendly"),
    };
  }, [t, ready]);

  return { videoConfig, brandAssets, content };
};
