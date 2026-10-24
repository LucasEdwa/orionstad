export interface ContactPageIntro {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface ContactChannels {
  title: string;
  subtitle: string;
  callTitle: string;
  writeTitle: string;
  whatsappTitle: string;
  whatsappAction: string;
  area: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  whatsapp: string;
}

export interface ContactFormCopy {
  title: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  serviceLabel: string;
  servicePlaceholder: string;
  serviceOther: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  sending: string;
}

export interface ContactPageData {
  page: ContactPageIntro;
  channels: ContactChannels;
  form: ContactFormCopy;
}
