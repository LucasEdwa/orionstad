import type { ContentRepository } from '../domain/repositories/HeroRepository';
import type { HeroContent } from '../domain/entities/Hero';

export class I18nContentRepository implements ContentRepository {
  private welcome: string;
  private subtitle: string;
  private bookNow: string;

  constructor(welcome: string, subtitle: string, bookNow: string) {
    this.welcome = welcome;
    this.subtitle = subtitle;
    this.bookNow = bookNow;
  }

  getHeroContent(): HeroContent {
    return {
      welcome: this.welcome,
      subtitle: this.subtitle,
      bookNow: this.bookNow
    };
  }
}
