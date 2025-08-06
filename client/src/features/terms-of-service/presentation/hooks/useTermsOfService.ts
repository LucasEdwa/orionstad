import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TermsOfServiceService } from '../../application/TermsOfServiceService';
import { TermsOfServiceRepositoryImpl } from '../../infrastructure/TermsOfServiceRepositoryImpl';

export const useTermsOfService = () => {
  const navigate = useNavigate();
  
  const service = useMemo(() => {
    const repository = new TermsOfServiceRepositoryImpl();
    return new TermsOfServiceService(repository);
  }, []);

  const termsContent = useMemo(() => service.getTermsContent(), [service]);
  const sections = useMemo(() => service.getOrderedSections(), [service]);
  const trustIndicators = useMemo(() => service.getTrustIndicators(), [service]);
  const contactActions = useMemo(() => service.getContactActions(), [service]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const getSectionColorScheme = (type: string) => {
    return service.getSectionColorScheme(type);
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
