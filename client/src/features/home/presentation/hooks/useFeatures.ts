import { useTranslation } from "react-i18next";
import { FeatureService } from "../../application/FeatureService";

export const useFeatures = () => {
  const { t, ready } = useTranslation("home");
  const featureService = new FeatureService();
  
  // Use static data if i18n is not ready or fails
  if (!ready) {
    return {
      features: featureService.getFeatures(),
      benefits: featureService.getBenefits(),
    };
  }
  
  const featuresData = t("features.items", { returnObjects: true }) as any[];
  const benefitsData = t("benefits.items", { returnObjects: true }) as string[];
  
  // Validate translation data before using
  const validFeaturesData = Array.isArray(featuresData) ? featuresData : undefined;
  const validBenefitsData = Array.isArray(benefitsData) ? benefitsData : undefined;
  
  return {
    features: featureService.getFeatures(validFeaturesData),
    benefits: featureService.getBenefits(validBenefitsData),
  };
};
