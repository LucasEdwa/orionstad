export interface AboutHero {
  logoAlt: string;
  imgAlt: string;
  title: string;
  subtitle: string;
}

export interface AboutSection {
  title: string;
  paragraphs: string[];
  icon?: string;
  highlight?: boolean;
}

export interface AboutPageData {
  hero: AboutHero;
  sections: AboutSection[];
}

export interface TeamStats {
  yearsExperience: string;
  happyClients: string;
  teammembers: string;
  certifications: string;
}

export interface CompanyValues {
  title: string;
  description: string;
  icon: string;
}
