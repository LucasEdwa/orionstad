import { useTranslation } from 'react-i18next';
import { Services as ServicesFeature } from '../features/services';
import { SEO, BASE_URL } from '../components/SEO';

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  provider: { '@id': `${BASE_URL}/#business` },
  serviceType: 'Cleaning Service',
  areaServed: { '@type': 'City', name: 'Stockholm' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Regular Home Cleaning', description: 'Weekly, bi-weekly, or monthly home cleaning including dusting, vacuuming, mopping, bathroom and kitchen cleaning.' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Deep Cleaning', description: 'Thorough deep cleaning including hard-to-reach areas, behind furniture, oven and fridge interior cleaning.' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Move-In/Move-Out Cleaning', description: 'Comprehensive cleaning for moving. Inside cabinets, closets, windows, and complete dust removal.' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Office Cleaning', description: 'Custom office cleaning plans including floor care, workspace disinfection, and restroom cleaning.' },
      },
    ],
  },
};

export const Services = () => {
  const { t } = useTranslation('common');

  return (
    <>
      <SEO
        title={t('seo.services.title')}
        description={t('seo.services.description')}
        keywords={t('seo.services.keywords')}
        canonicalUrl={`${BASE_URL}/services`}
        structuredData={servicesSchema}
        breadcrumbs={[
          { name: t('seo.breadcrumbs.home'), url: `${BASE_URL}/` },
          { name: t('seo.breadcrumbs.services'), url: `${BASE_URL}/services` },
        ]}
      />
      <ServicesFeature />
    </>
  );
}
