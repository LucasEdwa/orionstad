export interface ServiceContent {
  type: 'text' | 'list';
  label?: string;
  text?: string;
  items?: string[];
}

export interface Service {
  id: string;
  title: string;
  contents: ServiceContent[];
  images: string[];
  category: ServiceCategory;
}

export interface ServiceHero {
  highlights: any;
  logoAlt: string;
  imgAlt: string;
  title: string;
  subtitle: string;
}

export type ServiceCategory = 'home' | 'office' | 'specialized';

export interface ServicesPageData {
  hero: ServiceHero;
  services: Service[];
}
