import type { NavigationItem, ContactInfo, CleaningFact } from '../entities/NavigationItem';

export interface NotFoundRepository {
  getNavigationItems(): NavigationItem[];
  getContactInfo(): ContactInfo[];
  getCleaningFact(): CleaningFact;
}
