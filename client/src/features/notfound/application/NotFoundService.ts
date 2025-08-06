import type { NotFoundRepository } from '../domain/repositories/NotFoundRepository';
import type { NavigationItem, ContactInfo, CleaningFact } from '../domain/entities/NavigationItem';

export class NotFoundService {
  private repository: NotFoundRepository;

  constructor(repository: NotFoundRepository) {
    this.repository = repository;
  }

  getHelpfulNavigation(): NavigationItem[] {
    return this.repository.getNavigationItems()
      .sort((a, b) => a.order - b.order);
  }

  getContactOptions(): ContactInfo[] {
    return this.repository.getContactInfo();
  }

  getMotivationalContent(): CleaningFact {
    return this.repository.getCleaningFact();
  }

  handleGoBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }
}
