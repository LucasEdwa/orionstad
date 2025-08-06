import type { HeroContent } from '../entities/Hero';

export interface ContentRepository {
  getHeroContent(): HeroContent;
}

export interface ScrollService {
  scrollToElement(elementId: string): void;
  scrollToSelector(selector: string): void;
}
