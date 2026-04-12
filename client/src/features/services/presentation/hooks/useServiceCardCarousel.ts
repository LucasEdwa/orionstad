import { useEffect, useState, useMemo } from 'react';
import type { ServiceImageCarousel } from '../../domain/entities/ServiceCard';
import { ServiceCardService } from '../../application/ServiceCardService';

export const useServiceCardCarousel = (imagesCount: number): ServiceImageCarousel & {
  nextImage: () => void;
} => {
  const serviceCardService = useMemo(() => new ServiceCardService(), []);
  const [carousel, setCarousel] = useState<ServiceImageCarousel>(
    serviceCardService.getInitialCarouselState()
  );

  useEffect(() => {
    if (!serviceCardService.shouldAutoPlay(imagesCount)) {
      return;
    }

    const interval = setInterval(() => {
      setCarousel(prev => ({
        ...prev,
        currentIndex: serviceCardService.getNextImageIndex(prev.currentIndex, imagesCount)
      }));
    }, carousel.autoPlayInterval);

    return () => clearInterval(interval);
  }, [imagesCount, carousel.autoPlayInterval, serviceCardService]);

  const nextImage = () => {
    setCarousel(prev => ({
      ...prev,
      currentIndex: serviceCardService.getNextImageIndex(prev.currentIndex, imagesCount)
    }));
  };

  return {
    ...carousel,
    nextImage
  };
};
