import type { NavigationRepository } from '../domain/repositories/NavigationRepository';
import type { NavLink, ContactInfo } from '../domain/entities/NavLink';

// This will be used by the hook that calls useTranslation
export class I18nNavigationRepository implements NavigationRepository {
  private links: NavLink[];
  private contactInfo: ContactInfo;

  constructor(links: NavLink[], contactInfo: ContactInfo) {
    this.links = links;
    this.contactInfo = contactInfo;
  }

  getNavigationLinks(): NavLink[] {
    return this.links;
  }

  getContactInfo(): ContactInfo {
    return this.contactInfo;
  }
}
