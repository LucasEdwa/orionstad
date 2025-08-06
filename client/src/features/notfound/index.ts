// Main exports
export { NotFound } from './presentation/NotFound';

// Application layer
export { NotFoundService } from './application/NotFoundService';

// Domain layer
export type { NavigationItem, ContactInfo, CleaningFact } from './domain/entities/NavigationItem';
export type { NotFoundRepository } from './domain/repositories/NotFoundRepository';

// Infrastructure layer
export { NotFoundRepositoryImpl } from './infrastructure/NotFoundRepositoryImpl';

// Presentation layer
export { useNotFound } from './presentation/hooks/useNotFound';
export { NotFoundHeader } from './presentation/components/NotFoundHeader';
export { ActionButtons } from './presentation/components/ActionButtons';
export { HelpfulLinks } from './presentation/components/HelpfulLinks';
export { NavigationCard } from './presentation/components/NavigationCard';
export { CleaningFactCard } from './presentation/components/CleaningFactCard';
export { ContactInfoDisplay } from './presentation/components/ContactInfoDisplay';
