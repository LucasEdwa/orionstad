
import { useTranslation } from 'react-i18next';
import orionLogo from '../assets/orion-logo.png';
import homeCleaningImg from '../assets/services6.jpg';
import officecleaningImg from '../assets/services8.jpg';
import specialCleaningImg from '../assets/services7.jpg';


export const Services = () => {
  const { t } = useTranslation('services');
  const hero = t('hero', { returnObjects: true }) as { logoAlt: string; imgAlt: string; title: string; subtitle: string };
  // Map each section to a service card with its own image
  const sections = t('sections', { returnObjects: true }) as Array<any>;
  const serviceImages = [homeCleaningImg, officecleaningImg, specialCleaningImg];

  return (
    <div className="min-h-screen bg-gray-50">
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
            <div
              key={section.title}
              className="bg-white rounded-2xl shadow-xl flex flex-col items-center p-6 hover:scale-105 transition-transform duration-300 border border-gray-100"
            >
              <img
                src={serviceImages[idx]}
                alt={section.title}
                className="w-full h-56 object-cover rounded-xl mb-4 shadow-md"
                loading="lazy"
              />
              <h2 className="text-2xl font-bold mb-2 text-[#6d3a7b] text-center">{section.title}</h2>
              {section.contents?.map((content: any, i: number) =>
                content.type === "text" ? (
                  <p className="text-gray-700 mb-3 text-center" key={i}>
                    {content.label && (
                      <span className="font-bold text-lg">{content.label} </span>
                    )}
                    {content.text}
                  </p>
                ) : (
                  <ul className="list-disc pl-5 mb-3 text-left" key={i}>
                    {content.items?.map((item: string, j: number) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
