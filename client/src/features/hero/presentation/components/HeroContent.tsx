import { memo } from 'react';
import type { HeroContent as HeroContentType } from "../../domain/entities/Hero";
import { ButtonLink, Container, Eyebrow } from '../../../../components/ui';

interface HeroContentProps {
  content: HeroContentType;
  heroImage: string;
}

// Design PDF, page 1: image 480x350 (12px radius) 22px below the nav rule;
// copy column starts 24px lower. Sizes in rem = px / 16.
export const HeroContentSection = memo<HeroContentProps>(function HeroContentSection({
  content,
  heroImage,
}) {
  return (
    <>
      <Container className="pt-[1.375rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_30rem] gap-8 items-start">
          <div className="lg:pt-6 animate-fade-in-up">
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h1 className="mt-[1.8125rem] text-[2.125rem] leading-[2.625rem] sm:text-[2.625rem] sm:leading-[3.25rem] text-ink tracking-tight">
              <span className="block">{content.titleLine1}</span>
              <span className="block">{content.titleLine2}</span>
            </h1>
            <p className="mt-[0.9375rem] text-[0.9375rem] leading-[1.5rem] text-muted max-w-[26.875rem]">
              {content.subtitle}
            </p>
            <div className="mt-[2.75rem] flex flex-wrap items-center gap-x-[1.5625rem]">
              <ButtonLink to="/contact" className="w-[14.375rem]">
                {content.primaryCta}
              </ButtonLink>
              <ButtonLink to="/services" variant="text">
                {content.secondaryCta}
              </ButtonLink>
            </div>
          </div>

          <img
            src={heroImage}
            alt={content.imageAlt}
            width={580}
            height={400}
            fetchPriority="high"
            className="w-full h-[15rem] sm:h-[21.875rem] object-cover rounded-[0.75rem] lg:relative lg:left-[0.625rem]"
          />
        </div>
      </Container>

      {/* Trust strip: full-width sage band, 48px tall, 22px below the image */}
      <div className="bg-sage mt-[1.375rem]">
        <Container>
          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-[21.25rem_23.75rem_1fr] gap-2 sm:gap-0 py-3 sm:py-0 sm:h-[3rem] sm:items-center lg:px-[1.5625rem] text-olive text-[0.75rem]">
            {content.trust.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Container>
      </div>
    </>
  );
});
