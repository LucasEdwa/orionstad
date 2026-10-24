import type { AboutPageData, AboutIntro, AboutStory, AboutPillar, AboutSection } from '../domain/entities/About';

export class AboutDataService {
  createAboutPageData(
    intro: AboutIntro,
    story: AboutStory,
    pillars: AboutPillar[],
    sections: AboutSection[]
  ): AboutPageData {
    return {
      intro,
      story,
      pillars: Array.isArray(pillars) ? pillars : [],
      sections: Array.isArray(sections) ? sections : [],
    };
  }

  /** Paragraphs starting with 💡 are rendered as a highlighted note */
  isHighlight(paragraph: string): boolean {
    return paragraph.startsWith('💡');
  }

  stripHighlight(paragraph: string): string {
    return paragraph.replace(/^💡\s*/, '');
  }
}
