import { memo } from 'react';
import type { Service } from '../../domain/entities/Service';
import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  services: Service[];
}

export const ServicesGrid = memo<ServicesGridProps>(({ services }) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[1.875rem] gap-y-[0.875rem]">
      {services.map((service) => (
        <li key={service.id}>
          <ServiceCard service={service} />
        </li>
      ))}
    </ul>
  );
});
