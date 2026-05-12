import { TermsOfService as TermsOfServiceFeature } from '../features/terms-of-service';
import { SEO, BASE_URL } from '../components/SEO';

const TermsOfService = () => {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Read the terms of service and privacy policy for Orion Home professional cleaning services in Stockholm, Sweden."
        canonicalUrl={`${BASE_URL}/terms-of-service`}
        breadcrumbs={[
          { name: 'Home', url: BASE_URL },
          { name: 'Terms of Service', url: `${BASE_URL}/terms-of-service` },
        ]}
      />
      <TermsOfServiceFeature />
    </>
  );
};

export default TermsOfService;
