import React from 'react';
import { useAboutData } from './hooks/useAboutData';
import { AboutHeroSection } from './components/AboutHeroSection';
import { AboutStats } from './components/AboutStats';
import { CompanyValues } from './components/CompanyValues';
import { AboutSectionCard } from './components/AboutSectionCard';
import { AboutCTA } from './components/AboutCTA';

export const About: React.FC = () => {
  const { hero, sections } = useAboutData();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <AboutHeroSection hero={hero} />

      {/* Stats Section */}
      <AboutStats />

      {/* Company Values */}
      <CompanyValues />

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid gap-16 lg:gap-20">
          {sections.map((section, idx) => (
            <AboutSectionCard
              key={section.title}
              section={section}
              index={idx}
            />
          ))}
        </div>

        {/* Call to Action */}
        <AboutCTA />
      </main>
    </div>
  );
};
