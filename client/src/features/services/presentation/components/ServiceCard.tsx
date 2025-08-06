import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Service } from '../../domain/entities/Service';
import { useServiceCardCarousel } from '../hooks/useServiceCardCarousel';
import { ServiceCardService } from '../../application/ServiceCardService';

interface ServiceCardProps {
  service: Service;
  i18nNs?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  i18nNs = 'services' 
}) => {
  const { t } = useTranslation(i18nNs);
  const serviceCardService = new ServiceCardService();
  const { currentIndex } = useServiceCardCarousel(service.images.length);
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowIndicators = serviceCardService.shouldShowCarouselIndicators(service.images.length);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'home': return '🏠';
      case 'office': return '🏢';
      case 'specialized': return '⭐';
      default: return '✨';
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group bg-white rounded-3xl shadow-xl flex flex-col overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-2">
      {/* Image Carousel */}
      <div className="relative w-full h-64 overflow-hidden">
        {service.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={t(service.title) + ' image ' + (i + 1)}
            className={`w-full h-64 object-cover absolute top-0 left-0 transition-all duration-700 group-hover:scale-110 ${
              i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-20"></div>
        
        {/* Category badge */}
        <div className="absolute top-4 left-4 z-30">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-2 shadow-lg">
            <span className="text-lg">{getCategoryIcon(service.category)}</span>
            <span className="text-sm font-medium text-gray-700 capitalize">{t(`ui.categories.${service.category}`)}</span>
          </div>
        </div>

        {/* Carousel indicators */}
        {shouldShowIndicators && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {service.images.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
          {t(service.title)}
        </h2>
        
        {/* Content preview/expanded */}
        <div className={`flex-1 transition-all duration-300 ${isExpanded ? '' : 'line-clamp-4'}`}>
          {service.contents?.slice(0, isExpanded ? service.contents.length : 2).map((content, i) =>
            content.type === "text" ? (
              <p className="text-gray-600 mb-3 leading-relaxed" key={i}>
                {content.label && (
                  <span className="font-semibold text-purple-600">{t(content.label)} </span>
                )}
                {content.text && t(content.text)}
              </p>
            ) : (
              <div className="mb-4" key={i}>
                <ul className="space-y-2">
                  {content.items?.slice(0, isExpanded ? content.items.length : 3).map((item: string, j: number) => (
                    <li key={j} className="flex items-start space-x-2 text-gray-600">
                      <span className="text-purple-500 font-bold">•</span>
                      <span className="leading-relaxed">{t(item)}</span>
                    </li>
                  ))}
                  {!isExpanded && content.items && content.items.length > 3 && (
                    <li className="text-purple-500 font-medium">
                      +{content.items.length - 3} {t('ui.moreFeatures')}
                    </li>
                  )}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Expand/Collapse button */}
        {service.contents && service.contents.length > 2 && (
          <button
            onClick={toggleExpand}
            className="mt-4 text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300 flex items-center space-x-1 self-start"
          >
            <span>{isExpanded ? t('ui.showLess') : t('ui.learnMore')}</span>
            <span className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              ↓
            </span>
          </button>
        )}

        {/* Action button */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            {t('ui.getQuote')} {t(service.title)}
          </button>
        </div>
      </div>
    </div>
  );
};
