import type { ContentRepository } from '../domain/repositories/HeroRepository';
import type { HeroContent } from '../domain/entities/Hero';

export class StaticContentRepository implements ContentRepository {
  getHeroContent(): HeroContent {
    return {
      eyebrow: "Cleaning in Stockholm",
      titleLine1: "A clean home.",
      titleLine2: "More time for life.",
      subtitle: "We take care of the cleaning with care and precision. You get time for what matters most.",
      primaryCta: "Get a free quote",
      secondaryCta: "See our services",
      imageAlt: "Bright, tidy living room",
      trust: ["Personal contact", "Cleaning tailored to you", "Easy booking request"],
    };
  }
}
