import type { TermsOfService, TrustIndicator, ContactAction } from '../entities/TermsOfService';

export interface TermsOfServiceRepository {
  getTermsOfService(): TermsOfService;
  getTrustIndicators(): TrustIndicator[];
  getContactActions(): ContactAction[];
}
