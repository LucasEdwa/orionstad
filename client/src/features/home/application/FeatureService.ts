import type { Feature } from '../domain/entities/Feature';
import { FaMagic, FaShieldAlt, FaHeart, FaStar } from 'react-icons/fa';

export class FeatureService {
  getFeatures(featuresData?: any[]): Feature[] {
    if (featuresData && Array.isArray(featuresData) && featuresData.length === 4) {
      const icons = [FaMagic, FaShieldAlt, FaHeart, FaStar];
      return featuresData.map((feature, index) => ({
        icon: icons[index],
        title: feature.title,
        description: feature.description
      }));
    }
    
    // Fallback to static data
    return [
      { 
        icon: FaMagic, 
        title: "Premium Quality", 
        description: "Professional cleaning with attention to every detail" 
      },
      { 
        icon: FaShieldAlt, 
        title: "Trusted & Insured", 
        description: "Fully insured service with background-checked cleaners" 
      },
      { 
        icon: FaHeart, 
        title: "Caring Approach", 
        description: "We treat your home with respect and presence" 
      },
      { 
        icon: FaStar, 
        title: "5-Star Service", 
        description: "Consistently rated excellent by our satisfied clients" 
      }
    ];
  }

  getBenefits(benefitsData?: string[]): string[] {
    if (benefitsData && Array.isArray(benefitsData) && benefitsData.length > 0) {
      return benefitsData;
    }
    
    // Fallback to static data
    return [
      "Free consultation and customized cleaning plan",
      "Professional, trained, and trusted cleaners",
      "Eco-friendly products safe for family and pets",
      "Flexible scheduling that works with your life",
      "100% satisfaction guarantee",
      "Same cleaner for consistency and trust"
    ];
  }
}
