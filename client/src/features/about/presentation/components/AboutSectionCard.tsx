import { memo } from 'react';
import type { AboutSection } from '../../domain/entities/About';
import { AboutAnimationService } from '../../application/AboutAnimationService';

interface AboutSectionProps {
  section: AboutSection;
  index: number;
}

export const AboutSectionCard = memo<AboutSectionProps>(({ section, index }) => {
  const animationService = new AboutAnimationService();
  const isHighlighted = section.highlight;

  return (
    <section
      className={`
        ${isHighlighted
          ? 'bg-orion-gradient'
          : 'bg-white'
        }
        rounded-3xl shadow-xl p-8 md:p-12 
        ${animationService.getCardHoverClass()}
        ${animationService.getSectionAnimationClass(index)}
        ${index % 2 === 1 ? 'lg:ml-12' : 'lg:mr-12'}
        border ${isHighlighted ? 'border-[#CDB697]' : 'border-gray-100'}
        relative overflow-hidden
      `}
      style={{ animationDelay: animationService.getStaggeredDelay(index) }}
    >
      {/* Background decoration for highlighted sections */}
      {isHighlighted && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10  rounded-full -translate-y-16 translate-x-16"></div>
      )}

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center mb-8">
          {section.icon && (
            <div className={`text-4xl mr-4 ${isHighlighted ? 'filter drop-shadow-lg ' : ''}`}>
              <img src={section.icon} alt={section.title} className={`w-28 `} />
            </div>
          )}
          <h2 className={`text-3xl md:text-4xl font-bold ${isHighlighted ? 'text-white' : 'text-gray-800'
            } flex-1`}>
            {section.title}
          </h2>
        </div>

        <div className="space-y-6">
          {section.paragraphs.map((paragraph: string, i: number) => {
            const isSpecialMessage = paragraph.startsWith('💡');

            if (isSpecialMessage) {
              return (
                <div key={i} className="mt-8 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center text-white">
                    <span className="text-2xl mr-3">💡</span>
                    <span className="font-semibold text-xxs">
                      {paragraph.replace('💡 ', '')}
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <p
                key={i}
                className={`text-lg md:text-xl leading-relaxed ${isHighlighted ? 'text-purple-100' : 'text-gray-700'
                  }`}
                style={{ animationDelay: `${(index * 300) + (i * 100)}ms` }}
              >
                {paragraph}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
});
