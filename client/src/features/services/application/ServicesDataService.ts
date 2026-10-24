import type { Service, ServiceCatalogEntry, ServicesPageIntro, ServicesPageData } from '../domain/entities/Service';
import { isServiceId, type ServiceId } from '../domain/serviceIds';

export class ServicesDataService {
  /** Drops catalog entries with unknown ids and attaches each service's image */
  transformCatalog(catalog: ServiceCatalogEntry[], getImage: (id: ServiceId) => string): Service[] {
    if (!Array.isArray(catalog)) return [];
    return catalog
      .filter((entry) => isServiceId(entry.id))
      .map((entry) => ({ ...entry, image: getImage(entry.id) }));
  }

  createServicesPageData(page: ServicesPageIntro, services: Service[]): ServicesPageData {
    return { page, services };
  }

  findById(services: Service[], id: ServiceId): Service | undefined {
    return services.find((service) => service.id === id);
  }

  /** The services that follow `id` in catalog order, wrapping around */
  getRelated(services: Service[], id: ServiceId, count = 3): Service[] {
    const index = services.findIndex((service) => service.id === id);
    if (index === -1) return services.slice(0, count);
    return Array.from({ length: Math.min(count, services.length - 1) }, (_, i) =>
      services[(index + 1 + i) % services.length]
    );
  }
}
