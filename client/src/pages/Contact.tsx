import { useTranslation } from 'react-i18next';
import { Contact as ContactFeature } from '../features/contact';
import { SEO, BASE_URL } from '../components/SEO';

export const Contact = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.contact.title')}
        description={t('seo.contact.description')}
        keywords={t('seo.contact.keywords')}
        canonicalUrl={`${BASE_URL}/contact`}
        breadcrumbs={[
          { name: t('seo.breadcrumbs.home'), url: `${BASE_URL}/` },
          { name: t('seo.breadcrumbs.contact'), url: `${BASE_URL}/contact` },
        ]}
      />
      <ContactFeature />
    </>
  );
};
