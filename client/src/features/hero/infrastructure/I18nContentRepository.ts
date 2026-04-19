import type { ContentRepository } from '../domain/repositories/HeroRepository';
import type { HeroContent } from '../domain/entities/Hero';

export class I18nContentRepository implements ContentRepository {
  private welcome: string;
  private subtitle: string;
  private bookNow: string;
  private learnMore: string;
  private licensedInsured: string;
  private fiveStarService: string;
  private ecoFriendly: string;

  constructor(
    welcome: string,
    subtitle: string,
    bookNow: string,
    learnMore: string,
    licensedInsured: string,
    fiveStarService: string,
    ecoFriendly: string
  ) {
    this.welcome = welcome;
    this.subtitle = subtitle;
    this.bookNow = bookNow;
    this.learnMore = learnMore;
    this.licensedInsured = licensedInsured;
    this.fiveStarService = fiveStarService;
    this.ecoFriendly = ecoFriendly;
  }

  getHeroContent(): HeroContent {
    return {
      welcome: this.welcome,
      subtitle: this.subtitle,
      bookNow: this.bookNow,
      learnMore: this.learnMore,
      licensedInsured: this.licensedInsured,
      fiveStarService: this.fiveStarService,
      ecoFriendly: this.ecoFriendly,
    };
  }
}
