import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import type { IconType } from "react-icons";

export class SocialIconRepository {
  private iconMap: Record<string, IconType> = {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaWhatsapp
  };

  getIcon(iconName: string): IconType | null {
    return this.iconMap[iconName] || null;
  }

  getAllIcons(): Record<string, IconType> {
    return this.iconMap;
  }
}
