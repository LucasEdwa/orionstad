import { About as AboutFeature } from '../features/about';
import { SEO, BASE_URL } from '../components/SEO';

export const About = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Orion Städ – a professional, eco-friendly cleaning company based in Stockholm, Sweden. Our story, values, and commitment to excellence."
        keywords="om Orion Städ, städföretag Stockholm, eco-friendly cleaning company, professional cleaners Sweden, miljövänlig städfirma, hållbar städning"
        canonicalUrl={`${BASE_URL}/about`}
        breadcrumbs={[
          { name: 'Home', url: BASE_URL },
          { name: 'About', url: `${BASE_URL}/about` },
        ]}
      />
      <AboutFeature />
    </>
  );
};
