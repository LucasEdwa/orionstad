export interface NavigationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  order: number;
}

export interface ContactInfo {
  id: string;
  type: 'phone' | 'email';
  value: string;
  displayValue: string;
  icon: string;
}

export interface CleaningFact {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaPath: string;
  icon: string;
}
