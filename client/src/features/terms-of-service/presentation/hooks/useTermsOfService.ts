import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TermsOfServiceService } from '../../application/TermsOfServiceService';
import { TermsOfServiceRepositoryImpl } from '../../infrastructure/TermsOfServiceRepositoryImpl';

export const useTermsOfService = () => {
  const navigate = useNavigate();
  // Subscribes to language changes so the copy below is re-read on every switch
  useTranslation('common');
  
  const service = useMemo(() => {
    const repository = new TermsOfServiceRepositoryImpl();
    return new TermsOfServiceService(repository);
  }, []);

  const termsContent = service.getTermsContent();
  const sections = service.getOrderedSections();
  const trustIndicators = service.getTrustIndicators();
  const contactActions = service.getContactActions();

  const handleGoBack = () => {
    navigate(-1);
  };

  const getSectionColorScheme = () => {
    return service.getSectionColorScheme();
  };

  return {
    termsContent,
    sections,
    trustIndicators,
    contactActions,
    handleGoBack,
    getSectionColorScheme
  };
};
