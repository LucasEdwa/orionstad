export interface ServiceImageCarousel {
  currentIndex: number;
  autoPlayInterval: number;
  isAutoPlaying: boolean;
}

export interface ServiceCardState {
  isHovered: boolean;
  imageCarousel: ServiceImageCarousel;
}
