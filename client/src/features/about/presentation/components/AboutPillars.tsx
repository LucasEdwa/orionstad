import { memo } from 'react';
import type { AboutPillar } from '../../domain/entities/About';

interface AboutPillarsProps {
  pillars: AboutPillar[];
}

// Design PDF, page 2: three 295px columns 50px apart, each under a 2px rule
export const AboutPillars = memo<AboutPillarsProps>(({ pillars }) => (
  <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[3.125rem]">
    {pillars.map((pillar) => (
      <li key={pillar.title} className="border-t-2 border-line pt-6">
        <h3 className="text-[1.125rem] leading-[1.125rem] text-ink tracking-tight">{pillar.title}</h3>
        <p className="mt-[0.625rem] text-[0.8125rem] leading-[1.375rem] text-muted max-w-[16.25rem]">{pillar.text}</p>
      </li>
    ))}
  </ul>
));
