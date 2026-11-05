import React from 'react';
import { useAboutData } from './hooks/useAboutData';
import { AboutStorySection } from './components/AboutStorySection';
import { Container, PageHeader } from '../../../components/ui';

export const About: React.FC = () => {
  const { intro, story } = useAboutData();

  return (
    <div className="bg-white">
      <PageHeader eyebrow={intro.eyebrow} title={intro.title} subtitle={intro.subtitle} />

      <main>
        <Container className="pt-[1.125rem] pb-14">
          <AboutStorySection story={story} />
        </Container>
      </main>
    </div>
  );
};
