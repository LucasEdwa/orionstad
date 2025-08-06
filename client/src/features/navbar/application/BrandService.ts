import type { BrandInfo } from '../domain/entities/NavLink';
import logoImg from '../../../assets/orion-logo.png';

export class BrandService {
  getBrandInfo(): BrandInfo {
    return {
      logoSrc: logoImg,
      name: "Orion Städ",
      tagline: "Where cleaning becomes caring"
    };
  }
}
