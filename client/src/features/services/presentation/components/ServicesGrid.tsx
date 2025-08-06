import React from 'react';
import type { Service } from '../../domain/entities/Service';
import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  services: Service[];
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ services }) => {
  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="opacity-0 translate-y-8 animate-fade-in-up"
            style={{
              animationDelay: `${index * 200}ms`,
              animationFillMode: 'both'
            }}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </div>
  );
};
