import { Home as CleanArchHome } from '../features/home';
import { SEO, BASE_URL } from '../components/SEO';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${BASE_URL}/#organization`,
  name: 'Orion Home',
  url: BASE_URL,
  logo: `${BASE_URL}/orion-logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+46704180597',
    contactType: 'customer service',
    availableLanguage: ['Swedish', 'English', 'Spanish'],
  },
  sameAs: [
    'https://www.facebook.com/people/Orion-Städ/pfbid032LTfFTwtW1M1Rjx4h1CSb3JXGQTonuXZyKpkZiu9j3ZXPUF6tc5KKqpVikBz5SDHl/',
    'https://www.instagram.com/orion.stad/',
    'https://www.linkedin.com/in/orion-städ-819995308/',
    'https://wa.me/message/I6GQY6OWYB5FH1',
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BASE_URL}/#business`,
  name: 'Orion Home',
  description: 'Professional cleaning services in Stockholm, Sweden. Home cleaning, office cleaning, deep cleaning, and move-in/move-out cleaning.',
  url: BASE_URL,
  telephone: '+46704180597',
  email: 'polly@orionstad.se',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Södervägen 18A',
    addressLocality: 'Stockholm',
    postalCode: '141 36',
    addressCountry: 'SE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 59.2858,
    longitude: 18.0050,
  },
  areaServed: {
    '@type': 'City',
    name: 'Stockholm',
  },
  priceRange: '$$',
  image: `${BASE_URL}/og-image.png`,
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
  url: BASE_URL,
  publisher: { '@id': `${BASE_URL}/#organization` },
  inLanguage: ['sv', 'en', 'es'],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What cleaning services do you offer in Stockholm?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer regular home cleaning, deep cleaning, move-in/move-out cleaning, and office cleaning throughout Stockholm and surrounding areas including Huddinge, Solna, and Sundbyberg.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your cleaning products eco-friendly?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We use eco-friendly, non-toxic cleaning products that are safe for children, pets, and people with allergies.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I book a cleaning service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can book online via our website booking form, call us at +46 70 418 05 97, or reach us on WhatsApp.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your cleaners insured and background-checked?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All Orion Home cleaners are fully insured and background-checked. We are a licensed, 5-star rated cleaning company.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between regular cleaning and deep cleaning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Regular cleaning covers routine maintenance — dusting, vacuuming, mopping, bathroom and kitchen cleaning. Deep cleaning goes further, targeting hard-to-reach areas, inside appliances, behind furniture, and built-up grime that regular cleaning does not address.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer a satisfaction guarantee?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer a 100% satisfaction guarantee. If you are not happy with any part of the cleaning, contact us within 24 hours and we will return to re-clean at no extra charge.',
      },
    },
  ],
};

const Home = () => (
  <>
    <SEO
      description="Professional cleaning services in Stockholm. Home cleaning, office cleaning, deep cleaning, and move-in/move-out. Eco-friendly products. Book online today!"
      keywords="städning Stockholm, hemstädning, kontorsstädning, flyttstädning, deep cleaning Stockholm, professional cleaning Sweden, Orion Home, städfirma Stockholm, eco-friendly cleaning, miljövänlig städning"
      canonicalUrl={BASE_URL}
      structuredData={[organizationSchema, localBusinessSchema, websiteSchema, faqSchema]}
    />
    <CleanArchHome />
  </>
);

export { Home };