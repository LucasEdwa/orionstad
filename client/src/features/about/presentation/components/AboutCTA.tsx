import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const AboutCTA: React.FC = () => {
  const { t } = useTranslation('about');

  // Get trusts array with proper typing
  const trusts = t('cta.trusts', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  return (
    <section className="mt-20">
      <div className="bg-gradient-to-r from-purple-900 via-purple-700 to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-16 translate-y-16"></div>
        
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            {t('cta.title')}
          </h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed animate-fade-in-up delay-300">
            {t('cta.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-500">
            <Link 
              to="/#booking" 
              className="bg-white text-purple-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 inline-block text-center shadow-xl hover:shadow-2xl"
            >
              {t('cta.primaryButton')}
            </Link>
            <Link 
              to="/contact" 
              className="border-3 border-white text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {t('cta.secondaryButton')}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-purple-100">
            {trusts.map((trust, index) => (
              <div key={index} className="flex items-center justify-center space-x-3">
                <span className="text-2xl">{trust.icon}</span>
                <div>
                  <div className="font-semibold">{trust.title}</div>
                  <div className="text-sm">{trust.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
