import { useTranslation } from "react-i18next";
import { FaMagic, FaShieldAlt, FaHeart, FaStar } from 'react-icons/fa';
import type { Feature } from "../../domain/entities/Feature";
import type { IconType } from "react-icons";

export interface FeatureWithIcon extends Feature {
  icon: IconType;
}

export const useFeatures = () => {
  const { t, ready } = useTranslation("home");
  const icons = [FaMagic, FaShieldAlt, FaHeart, FaStar];

  if (!ready) {
    return {
      features: undefined,
      benefits: undefined,
    };
  }

  const featuresData = t("features.items", { returnObjects: true }) as Feature[];
  const benefitsData = t("benefits.items", { returnObjects: true }) as string[];

  const features: FeatureWithIcon[] | undefined =
    Array.isArray(featuresData) && featuresData.length === 4
      ? featuresData.map((feature, index) => ({
          ...feature,
          icon: icons[index],
        }))
      : undefined;

  const benefits: string[] | undefined =
    Array.isArray(benefitsData) && benefitsData.length > 0 ? benefitsData : undefined;

  return { features, benefits };
};
