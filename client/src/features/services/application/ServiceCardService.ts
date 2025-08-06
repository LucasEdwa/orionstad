import type { ServiceImageCarousel } from '../domain/entities/ServiceCard';

export class ServiceCardService {
  getInitialCarouselState(): ServiceImageCarousel {
    return {
      currentIndex: 0,
      autoPlayInterval: 3000,
      isAutoPlaying: true
    };
  }

  getNextImageIndex(currentIndex: number, totalImages: number): number {
    return (currentIndex + 1) % totalImages;
  }

  shouldShowCarouselIndicators(imageCount: number): boolean {
    return imageCount > 1;
  }

  shouldAutoPlay(imageCount: number): boolean {
    return imageCount > 1;
  }
}
