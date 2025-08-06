import type { NavLink, ContactInfo } from '../entities/NavLink';

export interface NavigationRepository {
  getNavigationLinks(): NavLink[];
  getContactInfo(): ContactInfo;
}
