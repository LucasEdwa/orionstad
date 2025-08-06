import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaWhatsapp, FaClock, FaCheckCircle } from 'react-icons/fa';
import type { QuickAction } from '../domain/entities/Contact';

export class ContactIconService {
  getIconComponent(iconName: string) {
    const iconMap = {
      'FaPhone': FaPhone,
      'FaWhatsapp': FaWhatsapp,
      'FaEnvelope': FaEnvelope,
      'FaMapMarkerAlt': FaMapMarkerAlt,
      'FaClock': FaClock,
      'FaCheckCircle': FaCheckCircle,
    };
    
    return iconMap[iconName as keyof typeof iconMap] || FaCheckCircle;
  }

  getIconColor(iconName: string): string {
    switch (iconName) {
      case 'FaWhatsapp':
        return 'text-green-600';
      case 'FaPhone':
      case 'FaEnvelope':
      case 'FaMapMarkerAlt':
      case 'FaClock':
      default:
        return 'text-purple-600';
    }
  }

  getBackgroundColor(iconName: string): string {
    switch (iconName) {
      case 'FaWhatsapp':
        return 'bg-green-100';
      case 'FaPhone':
      case 'FaEnvelope':
      case 'FaMapMarkerAlt':
      case 'FaClock':
      default:
        return 'bg-purple-100';
    }
  }

  getQuickActionStyles(action: QuickAction): { 
    iconColor: string; 
    backgroundColor: string; 
    hoverColor: string 
  } {
    const isWhatsApp = action.icon === 'FaWhatsapp';
    
    return {
      iconColor: this.getIconColor(action.icon),
      backgroundColor: this.getBackgroundColor(action.icon),
      hoverColor: isWhatsApp ? 'group-hover:bg-green-200' : 'group-hover:bg-purple-200'
    };
  }
}
