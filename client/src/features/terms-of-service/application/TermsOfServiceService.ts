import type { TermsOfServiceRepository } from '../domain/repositories/TermsOfServiceRepository';
import type { TermsOfService, TermsSection, TrustIndicator, ContactAction } from '../domain/entities/TermsOfService';

export class TermsOfServiceService {
  private repository: TermsOfServiceRepository;

  constructor(repository: TermsOfServiceRepository) {
    this.repository = repository;
  }

  getTermsContent(): TermsOfService {
    return this.repository.getTermsOfService();
  }

  getOrderedSections(): TermsSection[] {
    const terms = this.repository.getTermsOfService();
    return terms.sections.sort((a, b) => a.order - b.order);
  }

  getTrustIndicators(): TrustIndicator[] {
    return this.repository.getTrustIndicators()
      .sort((a, b) => a.order - b.order);
  }

  getContactActions(): ContactAction[] {
    return this.repository.getContactActions()
      .sort((a, b) => (a.primary ? 0 : 1) - (b.primary ? 0 : 1));
  }

  getSectionIcon(type: string): string {
    switch (type) {
      case 'privacy':
        return 'FaShieldAlt';
      case 'terms':
        return 'FaInfoCircle';
      default:
        return 'FaCheckCircle';
    }
  }

  getSectionColorScheme(): { from: string; to: string } {
    return { from: 'from-[#3C0C0C]', to: 'to-[#98754C]' };
  }

  handleGoBack(): void {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  }
}
