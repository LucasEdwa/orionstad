import { useTranslation } from 'react-i18next';
import { FooterDataService } from '../../application/FooterDataService';
import type { FooterData } from '../../domain/entities/Footer';

export const useFooterData = () => {
  const { t } = useTranslation('footer');
  const footerDataService = new FooterDataService();

  const rawData = {
    companyInfo: t('companyInfo', { returnObjects: true }),
    address: t('address'),
    copyright: t('copyright'),
    links: t('links', { returnObjects: true }),
    social: t('social', { returnObjects: true }),
    taglineBottom: t('taglineBottom')
  };

  const footerData: FooterData = footerDataService.organizeFooterData(rawData);
  const reviewsWidget = footerDataService.getReviewsWidget();

  return {
    footerData,
    reviewsWidget
  };
};
