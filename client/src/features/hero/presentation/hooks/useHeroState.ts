import { useState, useEffect, useRef } from 'react';
import { HeroStateService } from '../../application/HeroStateService';

// Create service instance outside of hook to prevent recreation on every render
const heroStateService = new HeroStateService();

export const useHeroState = () => {
  const [showLogo, setShowLogo] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const fadeOutDuration = heroStateService.getFadeOutDuration();
    const logoAnimationDuration = heroStateService.getLogoAnimationDuration();

    setLogoVisible(true);
    const logoTimer = setTimeout(() => {
      setLogoVisible(false);
      fadeTimerRef.current = setTimeout(() => {
        setShowLogo(false);
      }, fadeOutDuration);
    }, logoAnimationDuration);
    
    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimerRef.current);
    };
  }, []);

  return { showLogo, logoVisible };
};
