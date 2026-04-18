export interface HeroState {
  showLogo: boolean;
  logoVisible: boolean;
  isVideoPlaying: boolean;
  isMuted: boolean;
}

export interface HeroContent {
  welcome: string;
  subtitle: string;
  bookNow: string;
  learnMore: string;
  licensedInsured: string;
  fiveStarService: string;
  ecoFriendly: string;
}

export interface VideoConfig {
  src: string;
  autoPlay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface BrandAssets {
  logoSrc: string;
  brandName: string;
  tagline: string;
}
