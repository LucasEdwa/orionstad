import React from 'react';
import { useTranslation } from 'react-i18next';

export const AboutStats: React.FC = () => {
  const { t } = useTranslation('about');

  // Get stats data from translations
  const statsData = t('stats', { returnObjects: true }) as {
    years: { emoji: string; number: string; title: string; description: string; };
    clients: { emoji: string; number: string; title: string; description: string; };
    team: { emoji: string; number: string; title: string; description: string; };
    certifications: { emoji: string; number: string; title: string; description: string; };
  };

  const statsArray = [
    statsData.years,
    statsData.clients,
    statsData.team,
    statsData.certifications
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 -mt-20 relative z-40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsArray.map((stat, index) => (
            <div 
              key={index}
              className="text-center text-white animate-scale-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-2">{stat.emoji}</div>
              <div className="text-4xl xl:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-lg font-semibold mb-1">{stat.title}</div>
              <div className="text-sm text-purple-100">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
