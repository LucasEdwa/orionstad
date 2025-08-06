import type { HeroState } from '../domain/entities/Hero';

export class HeroStateService {
  getInitialState(): HeroState {
    return {
      showLogo: true,
      logoVisible: false,
      isVideoPlaying: true,
      isMuted: true,
    };
  }

  getLogoAnimationDuration(): number {
    return 3000; // 3 seconds
  }

  getFadeOutDuration(): number {
    return 600; // 0.6 seconds
  }
}
