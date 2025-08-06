import React from 'react';
import { useTranslation } from 'react-i18next';
import { useServicesData } from './hooks/useServicesData';
import { ServicesHero } from './components/ServicesHero';
import { ServicesGrid } from './components/ServicesGrid';
import { ServicesStats } from './components/ServicesStats';
import { ServicesCTA } from './components/ServicesCTA';

export const Services: React.FC = () => {
  const { t } = useTranslation('services');
  const { hero, services } = useServicesData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center text-gray-800 pb-16">
          <ServicesHero hero={hero} />
        </div>
      </div>

      {/* Stats Section */}
      <ServicesStats />

      {/* Services Grid Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold text-gray-800 mb-4">
              {t('ui.whatWeOffer')}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('ui.whatWeOfferDescription')}
            </p>
          </div>
          <ServicesGrid services={services} />
        </div>
      </div>

      {/* Call to Action Section */}
      <ServicesCTA />
    </div>
  );
};
