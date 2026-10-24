import type { HeroContent } from '../entities/Hero';

export interface ContentRepository {
  getHeroContent(): HeroContent;
}
