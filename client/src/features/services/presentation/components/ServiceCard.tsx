import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../domain/entities/Service';
import { ButtonLink } from '../../../../components/ui';
import { ServiceCardImages } from './ServiceCardImages';

interface ServiceCardProps {
  service: Service;
}

// Design PDF, page 3: 310x218 card (10px radius), 75px image, 18px inset,
// 18px title, 12px text, 156x43 button 8px above the bottom edge.
// The image is taller than the PDF (176px, a slideshow when the service has
// several images) and the card grows to fit;
// h-full keeps cards in a grid row the same height with buttons aligned.
// Image and title open the service page; the button asks for a quote.
export const ServiceCard = memo<ServiceCardProps>(({ service }) => {
  const { t } = useTranslation('services');
  const detailHref = `/services/${service.id}`;

  return (
    <article className="group h-full flex flex-col bg-white border border-line rounded-[0.625rem] overflow-hidden hover:border-olive/40 transition-colors duration-200">
      <ServiceCardImages images={service.images} href={detailHref} />

      <div className="flex-1 flex flex-col px-[1.125rem] pb-[1.125rem]">
        <h2 className="mt-4 text-[1.125rem] leading-[1.125rem] text-ink">
          <Link to={detailHref} className="hover:text-olive transition-colors">
            {service.title}
          </Link>
        </h2>
        <p className="mt-[0.4375rem] text-[0.75rem] leading-[1.25rem] text-muted mb-5">{service.short}</p>

        <ButtonLink to={`/contact?service=${service.id}`} className="mt-auto w-[9.75rem]">
          {t('ui.requestQuote')}
        </ButtonLink>
      </div>
    </article>
  );
});
