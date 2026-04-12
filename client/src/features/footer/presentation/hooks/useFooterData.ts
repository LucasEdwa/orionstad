import { useTranslation } from 'react-i18next';
import { FooterDataService } from '../../application/FooterDataService';
import type { FooterData, CompanyInfo, FooterLink, SocialLink } from '../../domain/entities/Footer';

export const useFooterData = () => {
  const { t } = useTranslation('footer');
  const footerDataService = new FooterDataService();

  const rawData: FooterData = {
    companyInfo: t('companyInfo', { returnObjects: true }) as unknown as CompanyInfo,
    address: t('address'),
    copyright: t('copyright'),
    links: t('links', { returnObjects: true }) as unknown as FooterLink[],
    social: t('social', { returnObjects: true }) as unknown as SocialLink[],
    taglineBottom: t('taglineBottom')
  };

  const footerData: FooterData = footerDataService.organizeFooterData(rawData);
  const reviewsWidget = footerDataService.getReviewsWidget();

  return {
    footerData,
    reviewsWidget
  };
};
