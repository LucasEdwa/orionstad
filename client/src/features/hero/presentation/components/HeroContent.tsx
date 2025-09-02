import { FaArrowDown } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import type { HeroContent as HeroContentType } from "../../domain/entities/Hero";
import { memo } from 'react';

interface HeroContentProps {
  content: HeroContentType;
  onScrollToBooking: () => void;
  onScrollToContent: () => void;
}

export const HeroContentSection = memo<HeroContentProps>(({
  content,
  onScrollToBooking,
  onScrollToContent,
}) => {
  const { t } = useTranslation('home');

  // If these handlers are defined inside a parent, recommend parent to use useCallback
  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-6">
      <div className="text-center">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
            {content.welcome}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 font-light mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg animate-fadeInUp delay-200">
            {content.subtitle}
          </p>
        </div>

        {/* Enhanced CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp delay-400">
          <button
            onClick={onScrollToBooking}
            className="bg-orion-gradient text-white px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg font-semibold min-w-[200px] group"
            aria-label={content.bookNow}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{content.bookNow}</span>
              <FaArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
          
          <button
            onClick={onScrollToContent}
            className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full hover:bg-white/20 hover:border-white/50 transform hover:scale-105 transition-all duration-300 text-lg font-semibold min-w-[200px] group"
            aria-label={t('hero.learnMore')}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{t('hero.learnMore')}</span>
              <FaArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 animate-fadeInUp delay-600">
          <div className="flex flex-wrap justify-center items-center gap-6 text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm md:text-base">{t('hero.licensedInsured')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm md:text-base">{t('hero.fiveStarService')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm md:text-base">{t('hero.eco-friendly')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
