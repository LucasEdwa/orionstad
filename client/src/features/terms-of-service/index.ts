// Main exports
export { TermsOfService } from './presentation/TermsOfService';

// Application layer
export { TermsOfServiceService } from './application/TermsOfServiceService';

// Domain layer
export type { 
  TermsOfService as TermsOfServiceEntity, 
  TermsSection, 
  TrustIndicator, 
  ContactAction 
} from './domain/entities/TermsOfService';
export type { TermsOfServiceRepository } from './domain/repositories/TermsOfServiceRepository';

// Infrastructure layer
export { TermsOfServiceRepositoryImpl } from './infrastructure/TermsOfServiceRepositoryImpl';

// Presentation layer
export { useTermsOfService } from './presentation/hooks/useTermsOfService';
export { TermsHeader } from './presentation/components/TermsHeader';
export { QuickSummary } from './presentation/components/QuickSummary';
export { TermsSectionCard } from './presentation/components/TermsSectionCard';
export { ContactSection } from './presentation/components/ContactSection';
export { TrustIndicators } from './presentation/components/TrustIndicators';
