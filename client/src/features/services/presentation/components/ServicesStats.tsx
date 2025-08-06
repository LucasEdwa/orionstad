import React from 'react';
import { useTranslation } from 'react-i18next';

export const ServicesStats: React.FC = () => {
  const { t } = useTranslation('services');

  const stats = [
    {
      number: t('stats.happyCustomers.number'),
      label: t('stats.happyCustomers.label'),
      icon: '👥',
      description: t('stats.happyCustomers.description')
    },
    {
      number: t('stats.experience.number'),
      label: t('stats.experience.label'),
      icon: '⭐',
      description: t('stats.experience.description')
    },
    {
      number: t('stats.support.number'),
      label: t('stats.support.label'),
      icon: '📞',
      description: t('stats.support.description')
    },
    {
      number: t('stats.satisfaction.number'),
      label: t('stats.satisfaction.label'),
      icon: '✅',
      description: t('stats.satisfaction.description')
    }
  ];

  return (
    <div className="bg-white py-16 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {t('ui.whyChooseUs')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('ui.whyChooseUsDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-2xl group-hover:shadow-lg transition-shadow duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-700 mb-2">
                {stat.label}
              </div>
              <div className="text-sm text-gray-500">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
