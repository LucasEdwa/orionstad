import  { memo } from 'react';
import type { AboutHero } from '../../domain/entities/About';
import { AboutAssetsRepository } from '../../infrastructure/AboutAssetsRepository';

interface AboutHeroProps {
  hero: AboutHero;
}

export const AboutHeroSection = memo<AboutHeroProps>(({ hero }) => {
  const assetsRepository = new AboutAssetsRepository();

  return (
    <div className="relative flex flex-col justify-center min-h-[70vh] xl:min-h-[80vh] overflow-hidden">
      {/* Background with parallax effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={assetsRepository.getHeroBackgroundStyle()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-purple-900/50 z-10"></div>
        
        {/* Floating logo */}
        <div className="absolute top-8 left-8 z-20 animate-float">
          <img
            src={assetsRepository.getOrionLogo()}
            alt={hero.logoAlt}
            className="w-24 h-24 xl:w-40 xl:h-40 rounded-full shadow-2xl border-4 border-white/30 backdrop-blur-sm"
          />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>
      
      <header className="relative z-30 text-center px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl md:text-6xl xl:text-8xl font-extrabold text-white mb-8 leading-tight animate-fade-in-up">
            <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>
          <p className="text-xl md:text-2xl xl:text-4xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            {hero.subtitle}
          </p>
          
          {/* Scroll indicator */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div> */}
        </div>
      </header>
    </div>
  );
});
