import { useTermsOfService } from './hooks/useTermsOfService';
import { TermsHeader } from './components/TermsHeader';
import { QuickSummary } from './components/QuickSummary';
import { TermsSectionCard } from './components/TermsSectionCard';
import { ContactSection } from './components/ContactSection';
import { TrustIndicators } from './components/TrustIndicators';

export const TermsOfService = () => {
  const { 
    termsContent, 
    sections, 
    trustIndicators, 
    contactActions, 
    handleGoBack, 
    getSectionColorScheme 
  } = useTermsOfService();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f5f0] via-white to-[#f5efe8]">
      <TermsHeader
        title={termsContent.title}
        description={termsContent.description}
        lastUpdated={termsContent.lastUpdated}
        onGoBack={handleGoBack}
      />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <QuickSummary />
        
        <div className="space-y-10">
          {sections.map((section) => (
            <TermsSectionCard
              key={section.id}
              section={section}
              colorScheme={getSectionColorScheme(section.type)}
            />
          ))}
          
          <ContactSection actions={contactActions} />
          
          <TrustIndicators indicators={trustIndicators} />
        </div>
      </div>
    </div>
  );
};
