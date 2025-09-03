export interface NavLink {
  label: string;
  href: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  bookNow: string;
}
export interface ContactAction {
  label: string;
  href: string;
}

export interface NavbarState {
  isScrolled: boolean;
  sidebarOpen: boolean;
}

export interface BrandInfo {
  logoSrc: string;
  name: string;
  tagline: string;
}
