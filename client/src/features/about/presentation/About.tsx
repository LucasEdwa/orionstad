import React from 'react';
import { useAboutData } from './hooks/useAboutData';
import { AboutStorySection } from './components/AboutStorySection';
import { AboutPillars } from './components/AboutPillars';
import { AboutDetails } from './components/AboutDetails';
import { Container, PageHeader } from '../../../components/ui';

export const About: React.FC = () => {
  const { intro, story, pillars, sections } = useAboutData();

  return (
    <div className="bg-white">
      {/* Page intro */}
      <PageHeader eyebrow={intro.eyebrow} title={intro.title} subtitle={intro.subtitle} />

      <main>
        <Container className="pt-[1.125rem] space-y-[1.4375rem]">
          {/* Story with image */}
          <AboutStorySection story={story} />

          {/* Core values */}
          <AboutPillars pillars={pillars} />
        </Container>

        {/* Full company story */}
        <Container className="pt-14 pb-14">
          <AboutDetails sections={sections} />
        </Container>
      </main>
    </div>
  );
};
