import type { BrandInfo } from '../domain/entities/NavLink';
import logoImg from '../../../assets/orion-logo.png';

export class BrandService {
  getBrandInfo(): BrandInfo {
    return {
      logoSrc: logoImg,
      name: "Orion Home",
      tagline: "Where cleaning becomes caring"
    };
  }
}
