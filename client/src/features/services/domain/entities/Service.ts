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
  /** Main image (the first of `images`) */
  image: string;
  /** Every image of the service; the card shows them as a slideshow when there are several */
  images: string[];
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
