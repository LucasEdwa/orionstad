import { useTranslation } from 'react-i18next';
import type { ServicesPageData, ServiceCatalogEntry, ServicesPageIntro } from '../../domain/entities/Service';
import { ServicesDataService } from '../../application/ServicesDataService';
import { AssetsRepository } from '../../infrastructure/AssetsRepository';

// Module-level singletons — stateless
const servicesDataService = new ServicesDataService();
const assetsRepository = new AssetsRepository();

export const useServicesData = (): ServicesPageData => {
  const { t } = useTranslation('services');

  const page = t('page', { returnObjects: true }) as ServicesPageIntro;
  const catalog = t('catalog', { returnObjects: true }) as ServiceCatalogEntry[];

  const services = servicesDataService.transformCatalog(catalog, (id) => assetsRepository.getServiceImage(id));

  return servicesDataService.createServicesPageData(page, services);
};
