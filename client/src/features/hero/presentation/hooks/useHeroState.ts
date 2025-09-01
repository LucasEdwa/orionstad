import { useState, useEffect } from 'react';
import { HeroStateService } from '../../application/HeroStateService';

export const useHeroState = () => {
  const heroStateService = new HeroStateService();
  const initialState = heroStateService.getInitialState();
  
  const [showLogo, setShowLogo] = useState(initialState.showLogo);
  const [logoVisible, setLogoVisible] = useState(initialState.logoVisible);
  const [isVideoPlaying, setIsVideoPlaying] = useState(initialState.isVideoPlaying);
  const [isMuted, setIsMuted] = useState(initialState.isMuted);

  useEffect(() => {
    setLogoVisible(true);
    const timer = setTimeout(() => {
      setLogoVisible(false);
      setTimeout(() => {
        setShowLogo(false);
      }, heroStateService.getFadeOutDuration());
    }, heroStateService.getLogoAnimationDuration());
    return () => clearTimeout(timer);
  }, [heroStateService]);


  return {
    showLogo,
    logoVisible,
    isVideoPlaying,
    setIsVideoPlaying,
    isMuted,
    setIsMuted,
  };
};
