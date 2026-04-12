import type { ContactPageData, ContactHero, QuickAction, BusinessHours, ContactSection, ContactField } from '../domain/entities/Contact';

export class ContactDataService {
  createContactPageData(
    hero: ContactHero,
    quickActions: QuickAction[],
    businessHours: BusinessHours,
    sections: ContactSection[]
  ): ContactPageData {
    return {
      hero,
      quickActions,
      businessHours,
      sections
    };
  }

  getContactSection(sections: ContactSection[], index: number): ContactSection | null {
    return sections[index] || null;
  }

  getFormFields(sections: ContactSection[]): ContactField[] {
    const formSection = this.getContactSection(sections, 1);
    return formSection?.fields || [];
  }

  getContactInfo(sections: ContactSection[]): ContactSection | null {
    return this.getContactSection(sections, 2);
  }

  getWhyContactUs(sections: ContactSection[]): ContactSection | null {
    return this.getContactSection(sections, 0);
  }
}
