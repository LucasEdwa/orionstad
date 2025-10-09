import React from 'react';
import { useTranslation } from 'react-i18next';
import happyCostumersImg from '../../../../assets/happyCostumers.png';
import yearsExperienceImg from '../../../../assets/yearsExperience.png';
import supportImg from '../../../../assets/24_7 support.png';
import satisfactionImg from '../../../../assets/satisfaction.png';

type StatKey = 'happyCustomers' | 'experience' | 'support' | 'satisfaction';

const statImages: Record<StatKey, string> = {
  happyCustomers: happyCostumersImg,
  experience: yearsExperienceImg,
  support: supportImg,
  satisfaction: satisfactionImg,
};

export const ServicesStats: React.FC = () => {
  const { t } = useTranslation('services');

  const stats = [
    {
      key: 'happyCustomers' as StatKey,
      number: t('stats.happyCustomers.number'),
      label: t('stats.happyCustomers.label'),
      description: t('stats.happyCustomers.description'),
    },
    {
      key: 'experience' as StatKey,
      number: t('stats.experience.number'),
      label: t('stats.experience.label'),
      description: t('stats.experience.description'),
    },
    {
      key: 'support' as StatKey,
      number: t('stats.support.number'),
      label: t('stats.support.label'),
      description: t('stats.support.description'),
    },
    {
      key: 'satisfaction' as StatKey,
      number: t('stats.satisfaction.number'),
      label: t('stats.satisfaction.label'),
      description: t('stats.satisfaction.description'),
    },
  ];

  const StatCard = ({ stat }: { stat: typeof stats[0] }) => (
    <div className="text-center group hover:scale-105 transition-transform duration-300">
      <img src={statImages[stat.key]} alt={stat.label} className="w-36  object-contain mx-auto" />
      <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-[#CDB697] transition-colors duration-300">
        {stat.number}
      </div>
      <div className="text-lg font-semibold text-gray-700 mb-2">
        {stat.label}
      </div>
      <div className="text-sm text-gray-500">
        {stat.description}
      </div>
    </div>
  );

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
          {stats.map((stat) => (
            <StatCard key={stat.key} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};
