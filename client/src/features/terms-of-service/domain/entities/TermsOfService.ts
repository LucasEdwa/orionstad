export interface TermsSection {
  id: string;
  heading: string;
  content?: string;
  items?: string[];
  order: number;
  type: 'privacy' | 'terms' | 'general';
}

export interface TermsOfService {
  id: string;
  title: string;
  lastUpdated: string;
  description: string;
  sections: TermsSection[];
}

export interface TrustIndicator {
  id: string;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface ContactAction {
  id: string;
  type: 'link' | 'phone' | 'email';
  label: string;
  value: string;
  icon: string;
  primary: boolean;
}
