import { useCallback } from 'react';
import { BrowserScrollService } from '../../infrastructure/BrowserScrollService';

// Module-level singleton — no state, pure side-effect service
const scrollService = new BrowserScrollService();

export const useScrollActions = () => {
  const scrollToBooking = useCallback(() => {
    scrollService.scrollToElement("booking");
  }, []);

  const scrollToContent = useCallback(() => {
    scrollService.scrollToSelector('main');
  }, []);

  return { scrollToBooking, scrollToContent };
};
