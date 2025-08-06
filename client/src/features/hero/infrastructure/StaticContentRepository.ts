import type { ContentRepository } from '../domain/repositories/HeroRepository';
import type { HeroContent } from '../domain/entities/Hero';

export class StaticContentRepository implements ContentRepository {
  getHeroContent(): HeroContent {
    return {
      welcome: "Premium Cleaning Services",
      subtitle: "Experience the difference of our unique cleaning method that transforms homes and lives",
      bookNow: "Book Now"
    };
  }
}
