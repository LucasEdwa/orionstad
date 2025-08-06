import React from 'react';
import { useTranslation } from 'react-i18next';

export const CompanyValues: React.FC = () => {
  const { t } = useTranslation('about');
  const valuesData = t('values', { returnObjects: true }) as {
    title: string;
    subtitle: string;
    description: string;
    items: Array<{
      emoji: string;
      title: string;
      description: string;
    }>;
  };

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl xl:text-5xl font-bold text-gray-800 mb-6 animate-fade-in-up">
            {valuesData.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4 animate-fade-in-up animation-delay-200">
            {valuesData.subtitle}
          </p>
          <p className="text-lg text-purple-600 font-medium animate-fade-in-up animation-delay-300">
            {valuesData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuesData.items.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-purple-100 group animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="text-center">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.emoji}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
