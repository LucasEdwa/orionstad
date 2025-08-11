import type { VideoConfig, BrandAssets } from '../domain/entities/Hero';
import orionLogo from '../../../assets/orion-logo.png';

export class AssetService {
  getVideoConfig(): VideoConfig {
    return {
      src: "https://myweblmp.s3.eu-north-1.amazonaws.com/6195525-uhd_3840_2160_25fps.mp4",
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
