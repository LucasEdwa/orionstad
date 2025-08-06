export interface FooterLink {
  href: string;
  label: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
}

export interface FooterData {
  companyInfo: CompanyInfo;
  address: string;
  copyright: string;
  links: FooterLink[];
  social: SocialLink[];
  taglineBottom?: string;
}

export interface ReviewsWidget {
  src: string;
  title: string;
  height: number;
}
