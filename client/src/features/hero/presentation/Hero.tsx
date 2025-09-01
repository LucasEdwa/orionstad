import { useCallback } from "react";
import { LogoAnimation } from "./components/LogoAnimation";
import { VideoControls } from "./components/VideoControls";
import { HeroContentSection } from "./components/HeroContent";
import { ParticleEffect } from "./components/ParticleEffect";

// Hooks
import { useHeroState } from "./hooks/useHeroState";
import { useVideoControls } from "./hooks/useVideoControls";
import { useScrollActions } from "./hooks/useScrollActions";
import { useHeroContent } from "./hooks/useHeroContent";



export const Hero = () => {
  const { showLogo, logoVisible, isVideoPlaying, setIsVideoPlaying, isMuted, setIsMuted } = useHeroState();
  const { setVideoRef, toggleVideo, toggleMute } = useVideoControls(isVideoPlaying, setIsVideoPlaying, isMuted, setIsMuted);
  const { scrollToBooking, scrollToContent } = useScrollActions();
  const { videoConfig, brandAssets, content } = useHeroContent();

  const handleToggleVideo = useCallback(() => {
    toggleVideo();
  }, [toggleVideo]);
  const handleToggleMute = useCallback(() => {
    toggleMute();
  }, [toggleMute]);
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Enhanced video background */}
      <video
        ref={setVideoRef}
        src={videoConfig.src}
        autoPlay={videoConfig.autoPlay}
        loop={videoConfig.loop}
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-transparent z-10"></div>

      {/* Video controls */}
      {!showLogo && (
        <VideoControls
          isVideoPlaying={isVideoPlaying}
          isMuted={isMuted}
          onToggleVideo={handleToggleVideo}
          onToggleMute={handleToggleMute}
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
