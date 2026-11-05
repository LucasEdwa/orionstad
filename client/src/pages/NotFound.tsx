import { useTranslation } from 'react-i18next';
import { NotFound as NotFoundFeature } from '../features/notfound';
import { SEO } from '../components/SEO';

export const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO title={t('seo.notFound.title')} noindex />
      <NotFoundFeature />
    </>
  );
};