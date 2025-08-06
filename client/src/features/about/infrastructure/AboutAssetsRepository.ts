import orionLogo from '../../../assets/orion-logo.png';
import aboutImg from '../../../assets/header-cleaning.jpg';

export class AboutAssetsRepository {
  getOrionLogo(): string {
    return orionLogo;
  }

  getAboutImage(): string {
    return aboutImg;
  }

  getHeroBackgroundStyle(): React.CSSProperties {
    return {
      backgroundImage: `url(${this.getAboutImage()})`
    };
  }
}
