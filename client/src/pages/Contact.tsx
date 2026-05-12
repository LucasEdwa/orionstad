import { Contact as ContactFeature } from '../features/contact';
import { SEO, BASE_URL } from '../components/SEO';

export const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Orion Home. Call +46 70 418 05 97 or email polly@orionstad.se. Located at Södervägen 18A, 141 36 Stockholm, Sweden."
        keywords="kontakta Orion Home, städföretag kontakt Stockholm, cleaning service contact, book cleaning Stockholm, offert städning"
        canonicalUrl={`${BASE_URL}/contact`}
        breadcrumbs={[
          { name: 'Home', url: BASE_URL },
          { name: 'Contact', url: `${BASE_URL}/contact` },
        ]}
      />
      <ContactFeature />
    </>
  );
}