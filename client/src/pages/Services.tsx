
import { useTranslation } from 'react-i18next';
import orionLogo from '../assets/orion-logo.png';
import homeCleaningImg from '../assets/services6.jpg';
import homeCleaningImg2 from '../assets/services3.jpg';
import homeCleaningImg3 from '../assets/services2.jpg';
import officecleaningImg from '../assets/services8.jpg';
import officecleaningImg2 from '../assets/services5.jpg';
import specialCleaningImg from '../assets/services7.jpg';
import specialCleaningImg2 from '../assets/services4.jpg';
import { ServiceCard } from '../components/serviceCard';

// Carousel Service Card component


export const Services = () => {
  const { t } = useTranslation('services');
  const hero = t('hero', { returnObjects: true }) as { logoAlt: string; imgAlt: string; title: string; subtitle: string };
  // Map each section to a service card with its own images
  const sections = t('sections', { returnObjects: true }) as Array<any>;
  // Each service gets an array of images
  const serviceImages = [
    [homeCleaningImg, homeCleaningImg2, homeCleaningImg3],
    [officecleaningImg, officecleaningImg2],
    [specialCleaningImg, specialCleaningImg2],
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center justify-center text-gray-800  pb-16">
        <header className="w-full max-w-4xl mx-auto text-center pt-16 pb-8">
          <img
            src={hero.logoAlt ? orionLogo : ''}
            alt={hero.logoAlt}
            className="mx-auto w-24 h-24 xl:w-40 xl:h-40 rounded-full shadow-lg mb-4 bg-white object-contain"
          />
          <h1 className="text-4xl xl:text-6xl font-extrabold mb-2 text-[#333333] drop-shadow-md">{hero.title}</h1>
          <p className="text-xl xl:text-2xl font-medium text-[#555] mb-4">{hero.subtitle}</p>
        </header>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4">
          {sections.map((section, idx) => (
            <ServiceCard
              key={section.title}
              title={section.title}
              contents={section.contents}
              images={serviceImages[idx]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
