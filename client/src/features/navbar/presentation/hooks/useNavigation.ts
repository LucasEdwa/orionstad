import { useTranslation } from "react-i18next";
import { I18nNavigationRepository } from "../../infrastructure/I18nNavigationRepository";
import { StaticNavigationRepository } from "../../infrastructure/StaticNavigationRepository";
import type { NavLink, ContactInfo } from "../../domain/entities/NavLink";

export const useNavigation = () => {
  const { t, ready } = useTranslation("navbar");
  
  // Use static data if i18n is not ready or fails
  if (!ready) {
    const staticRepository = new StaticNavigationRepository();
    return {
      links: staticRepository.getNavigationLinks(),
      contactInfo: staticRepository.getContactInfo(),
    };
  }
  
  const links = t("links", { returnObjects: true }) as NavLink[];
  const contactInfo = t("contactInfo", { returnObjects: true }) as ContactInfo;
  
  // Validate translation data
  if (Array.isArray(links) && links.length > 0 && contactInfo && contactInfo.phone) {
    const navigationRepository = new I18nNavigationRepository(links, contactInfo);
    return {
      links: navigationRepository.getNavigationLinks(),
      contactInfo: navigationRepository.getContactInfo(),
    };
  }
  
  // Fallback to static data if translation data is invalid
  const staticRepository = new StaticNavigationRepository();
  return {
    links: staticRepository.getNavigationLinks(),
    contactInfo: staticRepository.getContactInfo(),
  };
};
