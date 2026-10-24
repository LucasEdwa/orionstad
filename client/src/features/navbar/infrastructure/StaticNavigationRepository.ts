import type { NavigationRepository } from '../domain/repositories/NavigationRepository';
import type { NavLink, ContactInfo } from '../domain/entities/NavLink';

export class StaticNavigationRepository implements NavigationRepository {
  getNavigationLinks(): NavLink[] {
    return [
      { label: "Home", href: "/" },
      { label: "About us", href: "/about" },
      { label: "Our services", href: "/services" },
      { label: "Contact", href: "/contact" },
    ];
  }

  getContactInfo(): ContactInfo {
    return {
      phone: "+46763272283",
      whatsapp: "https://wa.me/46763272283",
      getQuote: "Get a quote"
    };
  }
}
