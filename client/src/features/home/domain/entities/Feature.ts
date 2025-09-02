export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface ServiceOption {
  value: string;
  label: string;
}

export interface CustomerField {
  name: string;
  type: string;
  placeholder: string;
}
export interface Option {
  value: string;
  label: string;
}
