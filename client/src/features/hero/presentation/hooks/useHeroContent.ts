import { useTranslation } from "react-i18next";
import { AssetService } from '../../application/AssetService';
import { StaticContentRepository } from '../../infrastructure/StaticContentRepository';
import { I18nContentRepository } from '../../infrastructure/I18nContentRepository';

export const useHeroContent = () => {
  const { t, ready } = useTranslation("home");
  const assetService = new AssetService();
  
  // Use static data if i18n is not ready or fails
  if (!ready) {
    const staticRepository = new StaticContentRepository();
    return {
      videoConfig: assetService.getVideoConfig(),
      brandAssets: assetService.getBrandAssets(),
      content: staticRepository.getHeroContent(),
    };
  }
  
  const welcome = t("hero.welcome");
  const subtitle = t("hero.subtitle");
  const bookNow = t("hero.bookNow");
  
  // Validate translation data
  if (welcome && subtitle && bookNow) {
    const i18nRepository = new I18nContentRepository(welcome, subtitle, bookNow);
    return {
      videoConfig: assetService.getVideoConfig(),
      brandAssets: assetService.getBrandAssets(),
      content: i18nRepository.getHeroContent(),
    };
  }
  
  // Fallback to static data if translation data is invalid
  const staticRepository = new StaticContentRepository();
  return {
    videoConfig: assetService.getVideoConfig(),
    brandAssets: assetService.getBrandAssets(),
    content: staticRepository.getHeroContent(),
  };
};
