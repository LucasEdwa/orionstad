import type { NavigationRepository } from '../domain/repositories/NavigationRepository';
import type { NavLink, ContactInfo } from '../domain/entities/NavLink';

export class StaticNavigationRepository implements NavigationRepository {
  getNavigationLinks(): NavLink[] {
    return [
      { label: "Home", href: "/" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ];
  }

  getContactInfo(): ContactInfo {
    return {
      phone: "+46763272283",
      whatsapp: "https://wa.me/46763272283",
      bookNow: "Book Now"
    };
  }
}
