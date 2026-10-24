import { useParams } from 'react-router-dom';
import { ServiceDetail as ServiceDetailFeature, isServiceId, useServicesData } from '../features/services';
import { SEO, BASE_URL } from '../components/SEO';
import { NotFound } from './NotFound';

export const ServiceDetail = () => {
  const { serviceId } = useParams();
  const { page, services } = useServicesData();
  const service = isServiceId(serviceId) ? services.find((s) => s.id === serviceId) : undefined;

  if (!service) return <NotFound />;

  const url = `${BASE_URL}/services/${service.id}`;
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.intro,
    provider: { '@id': `${BASE_URL}/#business` },
    serviceType: 'Cleaning Service',
    areaServed: { '@type': 'City', name: 'Stockholm' },
    url,
  };

  return (
    <>
      <SEO
        title={service.title}
        description={`${service.short} ${service.intro}`}
        canonicalUrl={url}
        structuredData={serviceSchema}
        breadcrumbs={[
          { name: 'Home', url: `${BASE_URL}/` },
          { name: 'Services', url: `${BASE_URL}/services` },
          { name: service.title, url },
        ]}
      />
      <ServiceDetailFeature service={service} services={services} eyebrow={page.eyebrow} />
    </>
  );
};
