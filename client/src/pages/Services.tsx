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
  return (
    <>
      <SEO
        title="Cleaning Services"
        description="Explore our professional cleaning services: regular home cleaning, deep cleaning, move-in/move-out cleaning, office cleaning, and specialized services in Stockholm."
        keywords="hemstädning Stockholm, kontorsstädning, flyttstädning Stockholm, storstädning, fönsterputsning, städtjänster Stockholm, cleaning services Stockholm, office cleaning Sweden, städfirma"
        canonicalUrl={`${BASE_URL}/services`}
        structuredData={servicesSchema}
        breadcrumbs={[
          { name: 'Home', url: BASE_URL },
          { name: 'Services', url: `${BASE_URL}/services` },
        ]}
      />
      <ServicesFeature />
    </>
  );
}
