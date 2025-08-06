export interface ContactHero {
  logoAlt: string;
  imgAlt: string;
  title: string;
  subtitle: string;
}

export interface ContactField {
  name: string;
  type: 'text' | 'email' | 'textarea';
  placeholder: string;
}

export interface ContactSection {
  title: string;
  intro?: string;
  paragraphs?: string[];
  fields?: ContactField[];
  submitLabel?: string;
  email?: string;
  emailHref?: string;
  phone?: string;
  address?: string;
  whatsapp?: string;
  whatsappLabel?: string;
}

export interface QuickAction {
  title: string;
  description: string;
  icon: string;
  action: string;
  href: string;
}

export interface BusinessHours {
  title: string;
  weekdays: string;
  weekends: string;
  note: string;
}

export interface ContactPageData {
  hero: ContactHero;
  quickActions: QuickAction[];
  businessHours: BusinessHours;
  sections: ContactSection[];
}
