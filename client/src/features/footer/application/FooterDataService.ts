import type { FooterData, ReviewsWidget } from '../domain/entities/Footer';

export class FooterDataService {
  getReviewsWidget(): ReviewsWidget {
    return {
      src: "https://widget.reco.se/v2/venues/5868926/horizontal/small?inverted=false&border=true",
      title: "Orion Städ AB - Omdömen på Reco",
      height: 27
    };
  }

  organizeFooterData(footerData: any): FooterData {
    return {
      companyInfo: footerData.companyInfo,
      address: footerData.address,
      copyright: footerData.copyright,
      links: footerData.links,
      social: footerData.social,
      taglineBottom: footerData.taglineBottom
    };
  }

  getSocialIconMap(): Record<string, string> {
    return {
      FaFacebook: 'FaFacebook',
      FaInstagram: 'FaInstagram',
      FaLinkedin: 'FaLinkedin',
      FaWhatsapp: 'FaWhatsapp'
    };
  }
}
