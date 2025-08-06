import React from 'react';
import type { ContactHero } from '../../domain/entities/Contact';
import { ContactAssetsRepository } from '../../infrastructure/ContactAssetsRepository';

interface ContactHeroProps {
  hero: ContactHero;
}

export const ContactHeroSection: React.FC<ContactHeroProps> = ({ hero }) => {
  const assetsRepository = new ContactAssetsRepository();

  return (
    <div className="relative flex flex-col justify-center min-h-[60vh] xl:min-h-[70vh]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={assetsRepository.getHeroBackgroundStyle()}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 to-purple-600/50 z-10"></div>
        <img
          src={assetsRepository.getOrionLogo()}
          alt={hero.logoAlt}
          className="absolute top-6 left-6 w-20 h-20 xl:w-32 xl:h-32 rounded-full shadow-lg z-20 border-4 border-white/20"
        />
      </div>
      
      <header className="relative z-30 text-center px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-6 leading-tight">
            {hero.title}
          </h1>
          <p className="text-xl md:text-2xl xl:text-3xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
            {hero.subtitle}
          </p>
        </div>
      </header>
    </div>
  );
};
