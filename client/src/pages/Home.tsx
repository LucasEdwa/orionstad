import { useTranslation } from 'react-i18next';
import { Home as CleanArchHome } from '../features/home';
import { SEO, BASE_URL } from '../components/SEO';
import { useFaqs } from '../features/home/presentation/components/useFaqs';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Orion Home',
  legalName: 'Atomus AB',
  url: `${BASE_URL}/`,
  logo: `${BASE_URL}/icon-512.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'polly@orionstad.se',
    availableLanguage: ['Swedish', 'English'],
  },
  sameAs: [
    'https://www.facebook.com/people/Orion-Städ/pfbid032LTfFTwtW1M1Rjx4h1CSb3JXGQTonuXZyKpkZiu9j3ZXPUF6tc5KKqpVikBz5SDHl/',
    'https://www.instagram.com/orion.stad/',
    'https://www.linkedin.com/in/orion-städ-819995308/',
    'https://wa.me/46763272283',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'Orion Home',
  legalName: 'Atomus AB',
  description: 'Professional cleaning services in Stockholm, Sweden. Home cleaning, office cleaning, deep cleaning, and move-in/move-out cleaning.',
  url: `${BASE_URL}/`,
  email: 'polly@orionstad.se',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Stockholm',
    addressCountry: 'SE',
  },
  areaServed: ['Stockholm', 'Huddinge', 'Solna', 'Sundbyberg'].map((name) => ({ '@type': 'City', name })),
  priceRange: '$$',
  image: `${BASE_URL}/og-image.jpg`,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  sameAs: organizationSchema.sameAs,
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Orion Home',
  url: `${BASE_URL}/`,
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['sv', 'en'],
};

const Home = () => {
  const { t } = useTranslation('common');
  const faqs = useFaqs();

  // Built from the visible FAQ text, so schema and page always match the chosen language
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <SEO
        description={t('seo.home.description')}
        keywords={t('seo.home.keywords')}
        canonicalUrl={`${BASE_URL}/`}
        structuredData={[organizationSchema, localBusinessSchema, websiteSchema, faqSchema]}
      />
      <CleanArchHome />
    </>
  );
};

export { Home };
