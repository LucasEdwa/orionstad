import { useMemo } from 'react';
import { BrowserScrollService } from '../../infrastructure/BrowserScrollService';

export const useScrollActions = () => {
  const scrollService = useMemo(() => new BrowserScrollService(), []);

  const scrollToBooking = () => {
    scrollService.scrollToElement("booking");
  };

  const scrollToContent = () => {
    scrollService.scrollToSelector('main');
  };

  return {
    scrollToBooking,
    scrollToContent,
  };
};
