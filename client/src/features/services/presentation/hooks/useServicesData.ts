import { useTranslation } from 'react-i18next';
import type { ServicesPageData, ServiceContent } from '../../domain/entities/Service';
import { ServicesDataService } from '../../application/ServicesDataService';
import { AssetsRepository } from '../../infrastructure/AssetsRepository';

export const useServicesData = (): ServicesPageData => {
  const { t } = useTranslation('services');
  const servicesDataService = new ServicesDataService();
  const assetsRepository = new AssetsRepository();

  const hero = t('hero', { returnObjects: true }) as {
    highlights: string[];
    logoAlt: string;
    imgAlt: string;
    title: string;
    subtitle: string;
  };

  const rawSections = t('sections', { returnObjects: true }) as Array<{ title: string; contents: ServiceContent[] }>;
  const serviceImages = assetsRepository.getServiceImages();
  
  const services = servicesDataService.transformRawData(rawSections, serviceImages);
  
  return servicesDataService.createServicesPageData(hero, services);
};
