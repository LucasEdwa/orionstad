import { useServicesData } from './hooks/useServicesData';
import { ServicesGrid } from './components/ServicesGrid';
import { Container, PageHeader } from '../../../components/ui';

export const Services = () => {
  const { page, services } = useServicesData();

  return (
    <div className="bg-white">
      <PageHeader eyebrow={page.eyebrow} title={page.title} subtitle={page.subtitle} />

      <main>
        <Container className="pt-[0.9375rem] pb-14">
          <ServicesGrid services={services} />
        </Container>
      </main>
    </div>
  );
};
