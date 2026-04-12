import { useTranslation } from "react-i18next";
import { FaMagic, FaShieldAlt, FaHeart, FaStar } from 'react-icons/fa';
import type { Feature } from "../../domain/entities/Feature";
import type { IconType } from "react-icons";
import { useMemo } from "react";

export interface FeatureWithIcon extends Feature {
  icon: IconType;
}

export const useFeatures = () => {
  const { t, ready } = useTranslation("home");
  const icons = useMemo(() => [FaMagic, FaShieldAlt, FaHeart, FaStar], []);

  const featuresData = ready ? (t("features.items", { returnObjects: true }) as Feature[]) : undefined;
  const benefitsData = ready ? (t("benefits.items", { returnObjects: true }) as string[]) : undefined;

  const features: FeatureWithIcon[] | undefined = useMemo(() => {
    if (!featuresData) return undefined;
    return Array.isArray(featuresData) && featuresData.length === 4
      ? featuresData.map((feature, index) => ({
          ...feature,
          icon: icons[index],
        }))
      : undefined;
  }, [featuresData, icons]);

  const benefits: string[] | undefined = useMemo(() => {
    if (!benefitsData) return undefined;
    return Array.isArray(benefitsData) && benefitsData.length > 0 ? benefitsData : undefined;
  }, [benefitsData]);

  return { features, benefits };
};
