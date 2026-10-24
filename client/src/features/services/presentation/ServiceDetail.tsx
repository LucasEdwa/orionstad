import { FaCheck } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import type { Service } from '../domain/entities/Service';
import { ServicesDataService } from '../application/ServicesDataService';
import { ServicesGrid } from './components/ServicesGrid';
import { ButtonLink, Container, PageHeader } from '../../../components/ui';

// Module-level singleton — pure helpers, no state
const servicesDataService = new ServicesDataService();

interface ServiceDetailProps {
  service: Service;
  services: Service[];
  eyebrow: string;
}

export const ServiceDetail = ({ service, services, eyebrow }: ServiceDetailProps) => {
  const { t } = useTranslation('services');
  const related = servicesDataService.getRelated(services, service.id);
  const quoteHref = `/contact?service=${service.id}`;

  return (
    <div className="bg-white">
      <PageHeader eyebrow={eyebrow} title={service.title} subtitle={service.short} />

      <main>
        {/* Same layout as the About story: 410x273 image, copy 45px to its right */}
        <Container className="pt-[1.125rem] pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-[25.625rem_minmax(0,1fr)] gap-8 lg:gap-[2.8125rem] items-start">
            <img
              src={service.image}
              alt={service.title}
              width={1200}
              height={800}
              fetchPriority="high"
              className="w-full h-[17.0625rem] object-cover rounded-[0.75rem]"
            />

            <div className="lg:pt-6">
              <p className="text-[0.875rem] leading-[1.46875rem] text-muted max-w-[32.5rem]">{service.intro}</p>

              <h2 className="mt-6 text-[1.125rem] leading-[1.125rem] text-ink tracking-tight">{t('ui.included')}</h2>
              <ul className="mt-3 border-t border-line divide-y divide-line">
                {service.included.map((item) => (
                  <li key={item} className="flex items-start gap-3 py-3 text-[0.875rem] leading-[1.375rem] text-muted">
                    <FaCheck className="w-3 h-3 mt-[0.3125rem] text-olive flex-shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center gap-x-[1.5625rem]">
                <ButtonLink to={quoteHref} className="w-[12rem]">
                  {t('ui.requestQuote')}
                </ButtonLink>
                <ButtonLink to="/services" variant="text">
                  {t('ui.allServices')}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>

        {/* Quote prompt */}
        <section className="bg-sage">
          <Container className="py-[1.6875rem] flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div>
              <h2 className="text-[1.625rem] leading-[1.625rem] text-ink tracking-tight">{t('ui.ctaTitle')}</h2>
              <p className="mt-3 text-[0.875rem] text-muted">{t('ui.ctaText')}</p>
            </div>
            <ButtonLink to={quoteHref} className="shrink-0 w-[12rem]">
              {t('ui.requestQuote')}
            </ButtonLink>
          </Container>
        </section>

        {/* Other services */}
        {related.length > 0 && (
          <Container className="pt-[1.9375rem] pb-14">
            <h2 className="text-[1.625rem] leading-[1.625rem] text-ink tracking-tight mb-[1.0625rem]">{t('ui.otherServices')}</h2>
            <ServicesGrid services={related} />
          </Container>
        )}
      </main>
    </div>
  );
};
