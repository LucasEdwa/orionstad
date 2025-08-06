import orionLogo from '../assets/orion-logo.png';
import aboutImg from '../assets/header-cleaning.jpg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const About = () => {
  const { t } = useTranslation('about');
  const hero = t('hero', { returnObjects: true }) as { logoAlt: string; imgAlt: string; title: string; subtitle: string };
  const sections = t('sections', { returnObjects: true }) as Array<any>;
  
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with improved styling */}
      <div className="relative flex flex-col justify-center min-h-[60vh] xl:min-h-[70vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-10"></div>
          <img
            src={orionLogo}
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

      {/* Main Content with improved layout */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid gap-12 lg:gap-16">
          {sections.map((section, idx) => (
            <section
              key={section.title}
              className={`
                bg-white rounded-2xl shadow-lg p-8 md:p-12 
                transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${idx % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'}
              `}
            >
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center lg:text-left">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.paragraphs.map((paragraph: string, i: number) => (
                    <p 
                      key={i} 
                      className="text-lg md:text-xl text-gray-700 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Call to Action Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-purple-900 to-purple-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Experience the Orion difference. Let us bring peace, beauty, and clarity to your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/#booking" 
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 inline-block text-center"
              >
                Get Your Free Quote
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-300">
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
