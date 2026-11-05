import { useTranslation } from 'react-i18next';
import { About as AboutFeature } from '../features/about';
import { SEO, BASE_URL } from '../components/SEO';

export const About = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.about.title')}
        description={t('seo.about.description')}
        keywords={t('seo.about.keywords')}
        canonicalUrl={`${BASE_URL}/about`}
        breadcrumbs={[
          { name: t('seo.breadcrumbs.home'), url: `${BASE_URL}/` },
          { name: t('seo.breadcrumbs.about'), url: `${BASE_URL}/about` },
        ]}
      />
      <AboutFeature />
    </>
  );
};
