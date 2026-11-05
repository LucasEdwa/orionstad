import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotFoundService } from '../../application/NotFoundService';
import { NotFoundRepositoryImpl } from '../../infrastructure/NotFoundRepositoryImpl';

export const useNotFound = () => {
  const navigate = useNavigate();
  // Subscribes to language changes so the copy below is re-read on every switch
  useTranslation('common');
  
  const service = useMemo(() => {
    const repository = new NotFoundRepositoryImpl();
    return new NotFoundService(repository);
  }, []);

  const navigationItems = service.getHelpfulNavigation();
  const contactInfo = service.getContactOptions();
  const cleaningFact = service.getMotivationalContent();

  const handleGoBack = () => {
    navigate(-1);
  };

  return {
    navigationItems,
    contactInfo,
    cleaningFact,
    handleGoBack
  };
};
