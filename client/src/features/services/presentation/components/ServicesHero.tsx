import { memo } from 'react';
import type { ServiceHero } from '../../domain/entities/Service';
import { AssetsRepository } from '../../infrastructure/AssetsRepository';
import homeserviceImg from '../../../../assets/home-cleaning.png';
import officeServiceImg from '../../../../assets/office-cleaning.png';
import specializedserviceImg from '../../../../assets/customized-service.png';


interface ServicesHeroProps {
  hero: ServiceHero;
}

export const ServicesHero = memo<ServicesHeroProps>(({ hero }) => {
  const assetsRepository = new AssetsRepository();
  const orionLogo = assetsRepository.getOrionLogo();
  
  const t = (key: string) => key;

  const highlights = [
    {
      img: homeserviceImg,
      label: t(hero.highlights[0]),
      alt: t('Home Cleaning Icon')
    },
    {
      img: officeServiceImg,
      label: t(hero.highlights[1]),
      alt: t('Office Cleaning Icon')
    },
    {
      img: specializedserviceImg,
      label: t(hero.highlights[2]),
      alt: t('Specialized Services Icon')
    }
  ];

  return (
    <header className="w-full max-w-6xl mx-auto text-center pt-20 pb-12">
      {/* Animated Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-xl opacity-30 animate-pulse"></div>
        <img
          src={hero.logoAlt ? orionLogo : ''}
          alt={hero.logoAlt}
          className="relative mx-auto w-28 h-28 xl:w-44 xl:h-44 rounded-full shadow-2xl bg-white object-contain transform hover:scale-110 transition-transform duration-500 border-4 border-white"
        />
      </div>

      {/* Title with Gradient */}
      <h1 className="text-5xl xl:text-7xl font-extrabold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-sm">
        {hero.title}
      </h1>
      
      {/* Subtitle */}
      <p className="text-xl xl:text-3xl font-medium text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
        {hero.subtitle}
      </p>

      {/* Feature highlights with images */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {highlights.map((highlight) => (
          <div key={highlight.label} className="flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
            <img src={highlight.img} alt={highlight.alt} className="w-20 object-cover" />
            <span className="font-medium text-gray-700">{highlight.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
});
