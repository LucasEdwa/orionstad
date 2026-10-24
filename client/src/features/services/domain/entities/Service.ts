import type { ServiceId } from '../serviceIds';

/** One entry of the `catalog` array in the services namespace */
export interface ServiceCatalogEntry {
  id: ServiceId;
  title: string;
  short: string;
  intro: string;
  included: string[];
}

export interface Service extends ServiceCatalogEntry {
  image: string;
}

export interface ServicesPageIntro {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface ServicesPageData {
  page: ServicesPageIntro;
  services: Service[];
}
