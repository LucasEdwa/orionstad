import React from 'react';
import { useTranslation } from 'react-i18next';

export const ServicesCTA: React.FC = () => {
  const { t } = useTranslation('services');

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-white mb-6">
          {t('cta.title')}
        </h2>
        <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToContact}
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            {t('cta.getFreeQuote')}
          </button>
          
          <a
            href={`tel:${t('cta.phoneNumber')}`}
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300"
          >
            {t('cta.callNow')}: {t('cta.phoneNumber')}
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🕒</span>
            <div>
              <div className="font-semibold">{t('cta.features.quickResponse.title')}</div>
              <div className="text-sm text-purple-100">{t('cta.features.quickResponse.description')}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🏆</span>
            <div>
              <div className="font-semibold">{t('cta.features.qualityGuaranteed.title')}</div>
              <div className="text-sm text-purple-100">{t('cta.features.qualityGuaranteed.description')}</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">💰</span>
            <div>
              <div className="font-semibold">{t('cta.features.fairPricing.title')}</div>
              <div className="text-sm text-purple-100">{t('cta.features.fairPricing.description')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
