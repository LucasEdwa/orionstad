import orionLogo from '../../../assets/orion-logo.png';
import contactImg from '../../../assets/service-2.jpg';

export class ContactAssetsRepository {
  getOrionLogo(): string {
    return orionLogo;
  }

  getContactImage(): string {
    return contactImg;
  }

  getHeroBackgroundStyle(): React.CSSProperties {
    return {
      backgroundImage: `url(${this.getContactImage()})`
    };
  }
}
