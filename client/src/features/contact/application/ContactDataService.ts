import type { ContactPageData, ContactPageIntro, ContactChannels, ContactFormCopy } from '../domain/entities/Contact';

export class ContactDataService {
  createContactPageData(
    page: ContactPageIntro,
    channels: ContactChannels,
    form: ContactFormCopy
  ): ContactPageData {
    return { page, channels, form };
  }

  /** Accepts a `?service=` value only if it is one of the offered options */
  getInitialService(requested: string | null, optionValues: string[]): string {
    return requested && optionValues.includes(requested) ? requested : '';
  }
}
