import type { Service, ServiceCategory, ServicesPageData } from '../domain/entities/Service';

export class ServicesDataService {
  transformRawData(rawSections: any[], serviceImages: string[][]): Service[] {
    return rawSections.map((section, index) => ({
      id: `service-${index}`,
      title: section.title,
      contents: section.contents,
      images: serviceImages[index] || [],
      category: this.getCategoryByIndex(index)
    }));
  }

  private getCategoryByIndex(index: number): ServiceCategory {
    const categories: ServiceCategory[] = ['home', 'office', 'specialized'];
    return categories[index] || 'home';
  }

  createServicesPageData(hero: any, services: Service[]): ServicesPageData {
    return {
      hero,
      services
    };
  }

  getServicesByCategory(services: Service[], category: ServiceCategory): Service[] {
    return services.filter(service => service.category === category);
  }
}
