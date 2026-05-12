import { LogoAnimation } from "./components/LogoAnimation";
import { VideoControls } from "./components/VideoControls";
import { HeroContentSection } from "./components/HeroContent";
import { ParticleEffect } from "./components/ParticleEffect";
import { HeroErrorBoundary } from "./components/HeroErrorBoundary";

// Hooks
import { useHeroState } from "./hooks/useHeroState";
import { useVideoControls } from "./hooks/useVideoControls";
import { useScrollActions } from "./hooks/useScrollActions";
import { useHeroContent } from "./hooks/useHeroContent";

const HeroInner = () => {
  const { showLogo, logoVisible } = useHeroState();
  const { isVideoPlaying, isMuted, hasError, setVideoRef, toggleVideo, toggleMute, handleVideoError } = useVideoControls();
  const { scrollToBooking, scrollToContent } = useScrollActions();
  const { videoConfig, brandAssets, content } = useHeroContent();

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Video background with error resilience */}
      {!hasError && (
        <video
          ref={setVideoRef}
          src={videoConfig.src}
          autoPlay={videoConfig.autoPlay}
          loop={videoConfig.loop}
          muted={isMuted}
          playsInline
          poster="/orion-logo.png"
          aria-label="Orion Home professional cleaning services promotional video"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ pointerEvents: 'none' }}
          onError={handleVideoError}
        />
      )}
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFD700/30] via-transparent to-[rgba(0,0,0,0.5)] z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700/30] to-transparent z-10" />

      {/* Video controls — hidden during logo intro and when video fails */}
      {!showLogo && !hasError && (
        <VideoControls
          isVideoPlaying={isVideoPlaying}
          isMuted={isMuted}
          onToggleVideo={toggleVideo}
          onToggleMute={toggleMute}
        />
      )}

      {/* Main content */}
      {showLogo ? (
        <LogoAnimation brandAssets={brandAssets} logoVisible={logoVisible} />
      ) : (
        <HeroContentSection
          content={content}
          onScrollToBooking={scrollToBooking}
          onScrollToContent={scrollToContent}
        />
      )}

      {/* Enhanced particles effect */}
      <ParticleEffect />
    </div>
  );
};

export const Hero = () => (
  <HeroErrorBoundary>
    <HeroInner />
  </HeroErrorBoundary>
);
