# About Feature - Clean Architecture

This feature follows clean architecture principles with enhanced user experience and modern design patterns.

## Architecture Layers

### 🏛️ Domain Layer (`/domain`)
Contains the core business entities and types that define the structure of about page data.

- `entities/About.ts` - Core about entities including hero, sections, stats, and values

### ⚙️ Application Layer (`/application`)
Contains business logic and use cases for managing about page data and animations.

- `AboutDataService.ts` - Business logic for transforming and organizing about page content
- `AboutAnimationService.ts` - Animation timing and CSS class management

### 🔌 Infrastructure Layer (`/infrastructure`)
Handles external concerns like asset management.

- `AboutAssetsRepository.ts` - Manages images and logo assets

### 🎨 Presentation Layer (`/presentation`)
Contains React components, hooks, and UI-related logic.

#### Components (`/presentation/components`)
- `About.tsx` - Main about page component with enhanced layout
- `AboutHeroSection.tsx` - Animated hero section with parallax effects
- `AboutStats.tsx` - Company statistics with animated counters
- `CompanyValues.tsx` - Values grid with hover animations
- `AboutSectionCard.tsx` - Individual content sections with staggered animations
- `AboutCTA.tsx` - Enhanced call-to-action with trust indicators

#### Hooks (`/presentation/hooks`)
- `useAboutData.ts` - Custom hook for fetching and transforming about page data

## Enhanced Features

### 🎨 User Experience Enhancements
- **Parallax Hero**: Background image with parallax scrolling effect
- **Floating Logo**: Animated logo with subtle floating motion
- **Staggered Animations**: Content appears with smooth, timed animations
- **Interactive Values**: Hover effects on company values cards
- **Section Highlights**: Special styling for mission-critical content
- **Smooth Scrolling**: Seamless transitions between sections

### 🚀 Interactive Elements
- **Hover Effects**: Cards and elements respond to user interaction
- **Scale Animations**: Elements grow and transform on hover
- **Color Transitions**: Smooth color changes for visual feedback
- **Scroll Indicators**: Visual cues for user navigation
- **Background Decorations**: Subtle animated elements for visual interest

### 📱 Mobile-First Design
- **Responsive Layout**: Adapts beautifully from mobile to desktop
- **Touch-Friendly**: Large interactive areas for mobile users
- **Optimized Animations**: Performance-optimized animations for mobile devices
- **Readable Typography**: Scalable fonts with proper line heights

### 🎯 Content Organization
- **Section Icons**: Visual identifiers for each content section
- **Highlighted Mission**: Special treatment for core values and mission
- **Categorized Content**: Logical grouping of story, values, and team information
- **Progressive Disclosure**: Information revealed as user scrolls

## Key Benefits

1. **Visual Storytelling**: Content is presented in an engaging, story-driven format
2. **Brand Consistency**: Consistent use of colors, fonts, and spacing
3. **Performance Optimized**: Efficient animations and lazy-loaded content
4. **Accessibility**: Semantic HTML and proper contrast ratios
5. **SEO Friendly**: Structured content with proper heading hierarchy
6. **Maintainable**: Clean separation of concerns and reusable components

## Usage

```tsx
import { About } from '../features/about';

// Use in your page component
export const AboutPage = () => {
  return <About />;
};
```

## Component Hierarchy

```
About
├── AboutHeroSection (parallax hero with floating logo)
├── AboutStats (animated company statistics)
├── CompanyValues (interactive values grid)
├── AboutSectionCard (content sections with animations)
│   └── Enhanced styling based on section type
└── AboutCTA (call-to-action with trust indicators)
```

## Animation Timeline

1. **Hero Section**: Fade-in with staggered text elements
2. **Stats**: Scale-in with delays for dramatic effect
3. **Values**: Grid appears with staggered timing
4. **Content Sections**: Alternating slide-in directions
5. **CTA**: Final fade-in with trust indicators
