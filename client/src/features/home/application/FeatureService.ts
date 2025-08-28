import { FaMagic, FaShieldAlt, FaHeart, FaStar } from 'react-icons/fa';
import type { Feature } from '../domain/entities/Feature';
import type { IconType } from 'react-icons';
export interface FeatureWithIcon extends Feature {
  icon: IconType;
}
export class FeatureService {
  getFeatures(featuresData: Feature[]): FeatureWithIcon[] | undefined {
    if (featuresData && Array.isArray(featuresData) && featuresData.length === 4) {
      const icons = [FaMagic, FaShieldAlt, FaHeart, FaStar];
      return featuresData.map((feature, index) => ({
        icon: icons[index],
        title: feature.title,
        description: feature.description
      }));
    }

  }

  getBenefits(benefitsData: string[]) {
    if (benefitsData && Array.isArray(benefitsData) && benefitsData.length > 0) {
      return benefitsData;
    }
    
  }
}
