import { useState, useEffect, useMemo } from "react";
import { NavbarStateService } from "../../application/NavbarStateService";

export const useNavbarState = () => {
  const navbarStateService = useMemo(() => new NavbarStateService(), []);
  const initialState = navbarStateService.getInitialState();
  
  const [isScrolled, setIsScrolled] = useState(initialState.isScrolled);
  const [sidebarOpen, setSidebarOpen] = useState(initialState.sidebarOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(navbarStateService.shouldShowScrolledStyle(window.scrollY));
      if (window.scrollY < 20) {
        setSidebarOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navbarStateService]);

  return {
    isScrolled,
    sidebarOpen,
    setSidebarOpen,
  };
};
