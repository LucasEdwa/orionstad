import { HeroContentSection } from "./components/HeroContent";
import { HeroErrorBoundary } from "./components/HeroErrorBoundary";

// Hooks
import { useHeroContent } from "./hooks/useHeroContent";

const HeroInner = () => {
  const { content, heroImage } = useHeroContent();

  return (
    <section className="bg-white">
      <HeroContentSection content={content} heroImage={heroImage} />
    </section>
  );
};

export const Hero = () => (
  <HeroErrorBoundary>
    <HeroInner />
  </HeroErrorBoundary>
);
