import type { NavigationRepository } from '../domain/repositories/NavigationRepository';
import type { NavLink, ContactInfo } from '../domain/entities/NavLink';

export class StaticNavigationRepository implements NavigationRepository {
  getNavigationLinks(): NavLink[] {
    return [
      { label: "Hem", href: "/" },
      { label: "Om oss", href: "/about" },
      { label: "Våra tjänster", href: "/services" },
      { label: "Kontakt", href: "/contact" },
    ];
  }

  getContactInfo(): ContactInfo {
    return {
      whatsapp: "https://wa.me/46763272283",
      getQuote: "Få en offert"
    };
  }
}
