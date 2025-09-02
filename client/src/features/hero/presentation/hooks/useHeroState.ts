import { useState, useEffect, useMemo } from 'react';
import { HeroStateService } from '../../application/HeroStateService';

// Create service instance outside of hook to prevent recreation on every render
const heroStateService = new HeroStateService();

export const useHeroState = () => {
  // Get initial state once using useMemo
  const initialState = useMemo(() => heroStateService.getInitialState(), []);
  
  const [showLogo, setShowLogo] = useState(initialState.showLogo);
  const [logoVisible, setLogoVisible] = useState(initialState.logoVisible);
  const [isVideoPlaying, setIsVideoPlaying] = useState(initialState.isVideoPlaying);
  const [isMuted, setIsMuted] = useState(initialState.isMuted);

  useEffect(() => {
    const fadeOutDuration = heroStateService.getFadeOutDuration();
    const logoAnimationDuration = heroStateService.getLogoAnimationDuration();

    setLogoVisible(true);
    const logoTimer = setTimeout(() => {
      setLogoVisible(false);
      const fadeTimer = setTimeout(() => {
        setShowLogo(false);
      }, fadeOutDuration);
      return () => clearTimeout(fadeTimer);
    }, logoAnimationDuration);
    
    return () => clearTimeout(logoTimer);
  }, []); // Empty dependency array since we use the stable heroStateService instance


  return {
    showLogo,
    logoVisible,
    isVideoPlaying,
    setIsVideoPlaying,
    isMuted,
    setIsMuted,
  };
};
