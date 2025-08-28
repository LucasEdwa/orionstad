import type { VideoConfig, BrandAssets } from '../domain/entities/Hero';
import orionLogo from '../../../assets/orion-logo.png';

export class AssetService {
  getVideoConfig(): VideoConfig {
    return {
      src: "https://myweblmp.s3.eu-north-1.amazonaws.com/Timeline+1.mov",
      autoPlay: true,
      loop: true,
      muted: true,
    };
  }

  getBrandAssets(): BrandAssets {
    return {
      logoSrc: orionLogo,
      brandName: "Orion Städ",
      tagline: "Where cleaning becomes caring"
    };
  }
}
