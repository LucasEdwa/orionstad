import { useTranslation } from 'react-i18next';
import { TermsOfService as TermsOfServiceFeature } from '../features/terms-of-service';
import { SEO, BASE_URL } from '../components/SEO';

const TermsOfService = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.terms.title')}
        description={t('seo.terms.description')}
        canonicalUrl={`${BASE_URL}/terms-of-service`}
        breadcrumbs={[
          { name: t('seo.breadcrumbs.home'), url: `${BASE_URL}/` },
          { name: t('seo.breadcrumbs.terms'), url: `${BASE_URL}/terms-of-service` },
        ]}
      />
      <TermsOfServiceFeature />
    </>
  );
};

export default TermsOfService;
