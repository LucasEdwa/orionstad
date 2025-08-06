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
      phone: "+4670418097",
      whatsapp: "https://wa.me/message/I6GQY6OWYB5FH1",
      bookNow: "Book Now"
    };
  }
}
