import { memo } from 'react';
import type { AboutSection } from '../../domain/entities/About';
import { AboutDataService } from '../../application/AboutDataService';

// Module-level singleton — pure helpers, no state
const aboutDataService = new AboutDataService();

interface AboutDetailsProps {
  sections: AboutSection[];
}

/** The longer company story, one row per section */
export const AboutDetails = memo<AboutDetailsProps>(({ sections }) => (
  <div className="divide-y divide-line border-t border-line">
    {sections.map((section) => (
      <section key={section.title} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[3.125rem] py-8">
        <h2 className="text-[1.125rem] leading-[1.5rem] text-ink tracking-tight">{section.title}</h2>
        <div className="md:col-span-2 space-y-3">
          {section.paragraphs.map((paragraph, i) =>
            aboutDataService.isHighlight(paragraph) ? (
              <p key={i} className="bg-sage text-olive text-[0.8125rem] rounded-[0.4375rem] px-4 py-3">
                {aboutDataService.stripHighlight(paragraph)}
              </p>
            ) : (
              <p key={i} className="text-[0.8125rem] leading-[1.375rem] text-muted">{paragraph}</p>
            )
          )}
        </div>
      </section>
    ))}
  </div>
));
