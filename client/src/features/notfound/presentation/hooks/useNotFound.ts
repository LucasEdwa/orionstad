import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundService } from '../../application/NotFoundService';
import { NotFoundRepositoryImpl } from '../../infrastructure/NotFoundRepositoryImpl';

export const useNotFound = () => {
  const navigate = useNavigate();
  
  const service = useMemo(() => {
    const repository = new NotFoundRepositoryImpl();
    return new NotFoundService(repository);
  }, []);

  const navigationItems = useMemo(() => service.getHelpfulNavigation(), [service]);
  const contactInfo = useMemo(() => service.getContactOptions(), [service]);
  const cleaningFact = useMemo(() => service.getMotivationalContent(), [service]);

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
