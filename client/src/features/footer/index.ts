// Domain
export type { FooterLink, SocialLink, CompanyInfo, FooterData, ReviewsWidget } from './domain/entities/Footer';

// Application
export * from './application/FooterDataService';

// Infrastructure
export * from './infrastructure/SocialIconRepository';

// Presentation
export * from './presentation/hooks/useFooterData';
export { Footer } from './presentation/components/Footer';
