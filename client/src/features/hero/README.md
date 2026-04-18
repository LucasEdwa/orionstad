# Hero Feature - Clean Architecture

This feature follows clean architecture principles with enterprise-grade performance optimizations, robust error handling, and strict type safety.

## Architecture Layers

### 🏛️ Domain Layer (`/domain`)
Contains core business entities and repository interfaces.

- `entities/Hero.ts` - Core interfaces: `HeroState`, `HeroContent`, `VideoConfig`, `BrandAssets`
- `repositories/HeroRepository.ts` - Contracts: `ContentRepository`, `ScrollService`

### ⚙️ Application Layer (`/application`)
Contains pure business logic with no framework dependencies.

- `HeroStateService.ts` - Logo animation timing configuration (durations, initial state)
- `AssetService.ts` - Video and brand asset configuration (S3 video URL, logo, tagline)

### 🔌 Infrastructure Layer (`/infrastructure`)
Implements domain contracts with concrete browser/i18n integrations.

- `StaticContentRepository.ts` - Fallback English content when i18n is unavailable
- `I18nContentRepository.ts` - Wraps i18n-translated content into domain entities
- `BrowserScrollService.ts` - Smooth scroll to elements/selectors via native browser API

### 🎨 Presentation Layer (`/presentation`)
React components and hooks — all components are purely presentational (no direct i18n calls).

#### Components (`/presentation/components`)
- `HeroContent.tsx` - Main hero text, CTA buttons, and trust indicators (memo'd, purely presentational)
- `LogoAnimation.tsx` - Brand name and tagline with fade transition (memo'd)
- `VideoControls.tsx` - Play/Pause and Mute/Unmute buttons (memo'd)
- `ParticleEffect.tsx` - Deterministic animated particles with memoized positions (memo'd)
- `HeroErrorBoundary.tsx` - Localized error boundary with "Try again" recovery UI

#### Hooks (`/presentation/hooks`)
- `useHeroState.ts` - Logo animation sequencing with proper timer cleanup via `useRef`
- `useVideoControls.ts` - Co-located video state (`isVideoPlaying`, `isMuted`, `hasError`) with stable `useCallback` handlers
- `useHeroContent.ts` - i18n content with `useMemo`, module-level singletons, and static fallback
- `useScrollActions.ts` - Stable scroll callbacks backed by a module-level `BrowserScrollService` singleton

## Performance Optimizations

- **No unnecessary re-renders**: Video DOM ref uses `useRef` + callback ref instead of `useState`
- **Stable callback references**: `toggleVideo`, `toggleMute`, `scrollToBooking`, `scrollToContent` are all wrapped in `useCallback`, enabling `React.memo` to skip child re-renders
- **Module-level singletons**: `AssetService`, `StaticContentRepository`, `BrowserScrollService`, and `HeroStateService` are instantiated once at module scope — not recreated per render
- **Deterministic particle positions**: `ParticleEffect` uses a seeded algorithm instead of `Math.random()` — no new style objects on re-render, SSR-safe
- **Memoized content derivation**: `useHeroContent` wraps i18n resolution in `useMemo([t, ready])`

## Error Handling & Resiliency

- **Timer leak prevention**: Both `setTimeout` timers in the logo sequence are tracked via `useRef` and cleared in the cleanup function
- **Video error resilience**: `onError` handler hides the `<video>` element and controls on failure; `.play()` rejections are caught
- **Error boundary**: `HeroErrorBoundary` catches any render error in the subtree and shows a recovery UI instead of crashing the page
- **i18n fallback**: If translations aren't ready or return empty strings, the component falls back to static English content

## Animation Timeline

1. **Mount**: `showLogo=true`, `logoVisible=false` → video starts playing in background
2. **Immediate**: `logoVisible=true` → brand name fades in (1000ms CSS transition)
3. **After 3000ms**: `logoVisible=false` → brand name fades out
4. **After 3600ms**: `showLogo=false` → hero content section renders with staggered animations
5. **User interaction**: Video play/pause and mute/unmute via `VideoControls`

## Usage

```tsx
import { Hero } from '../features/hero';

export const HomePage = () => {
  return <Hero />;
};
```

## Component Hierarchy

```
Hero (ErrorBoundary wrapper)
└── HeroInner
    ├── <video> (conditional on !hasError, with onError handler)
    ├── Gradient overlays
    ├── VideoControls (conditional on !showLogo && !hasError)
    ├── LogoAnimation | HeroContentSection (conditional on showLogo)
    └── ParticleEffect (deterministic positions, memo'd)
```

## i18n Keys (namespace: `home`)

| Key | Description |
|-----|-------------|
| `hero.welcome` | Main heading |
| `hero.subtitle` | Sub-heading |
| `hero.bookNow` | Primary CTA button |
| `hero.learnMore` | Secondary CTA button |
| `hero.licensedInsured` | Trust indicator |
| `hero.fiveStarService` | Trust indicator |
| `hero.eco-friendly` | Trust indicator |
