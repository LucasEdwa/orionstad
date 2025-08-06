import { useNotFound } from './hooks/useNotFound';
import { NotFoundHeader } from './components/NotFoundHeader';
import { ActionButtons } from './components/ActionButtons';
import { HelpfulLinks } from './components/HelpfulLinks';
import { CleaningFactCard } from './components/CleaningFactCard';
import { ContactInfoDisplay } from './components/ContactInfoDisplay';

export const NotFound = () => {
  const { navigationItems, contactInfo, cleaningFact, handleGoBack } = useNotFound();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <NotFoundHeader />
        
        <ActionButtons onGoBack={handleGoBack} />
        
        <HelpfulLinks items={navigationItems} />
        
        <CleaningFactCard
          title={cleaningFact.title}
          description={cleaningFact.description}
          ctaText={cleaningFact.ctaText}
          ctaPath={cleaningFact.ctaPath}
          icon={cleaningFact.icon}
        />
        
        <ContactInfoDisplay contacts={contactInfo} />
      </div>
    </div>
  );
};
