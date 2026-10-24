import { memo } from 'react';
import type { AboutStory } from '../../domain/entities/About';
import { Eyebrow } from '../../../../components/ui';
import storyImage from '../../../../assets/design-house.jpg';

interface AboutStorySectionProps {
  story: AboutStory;
}

// Design PDF, page 2: 410x273 image, copy 45px to its right starting 24px lower
export const AboutStorySection = memo<AboutStorySectionProps>(({ story }) => (
  <div className="grid grid-cols-1 lg:grid-cols-[25.625rem_minmax(0,1fr)] gap-8 lg:gap-[2.8125rem] items-start">
    <img
      src={storyImage}
      alt={story.imageAlt}
      width={900}
      height={600}
      loading="lazy"
      className="w-full h-[17.0625rem] object-cover rounded-[0.75rem]"
    />
    <div className="lg:pt-6">
      <Eyebrow>{story.eyebrow}</Eyebrow>
      <h2 className="mt-[0.9375rem] text-[1.6875rem] leading-[2.25rem] text-ink tracking-tight">
        <span className="block">{story.titleLine1}</span>
        <span className="block">{story.titleLine2}</span>
      </h2>
      <p className="mt-[0.625rem] text-[0.875rem] leading-[1.46875rem] text-muted max-w-[32.5rem]">{story.text}</p>
    </div>
  </div>
));
