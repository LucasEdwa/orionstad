# Services Feature - Clean Architecture

This feature follows clean architecture principles with clear separation of concerns across different layers.

## Architecture Layers

### 🏛️ Domain Layer (`/domain`)
Contains the core business entities and types that define the structure of services.

- `entities/Service.ts` - Core service entities and types
- `entities/ServiceCard.ts` - Service card state and carousel types

### ⚙️ Application Layer (`/application`)
Contains business logic and use cases for managing services data and service card behavior.

- `ServicesDataService.ts` - Business logic for transforming and managing services data
- `ServiceCardService.ts` - Business logic for service card carousel and interactions

### 🔌 Infrastructure Layer (`/infrastructure`)
Handles external concerns like asset management and data access.

- `AssetsRepository.ts` - Manages service images and logo assets

### 🎨 Presentation Layer (`/presentation`)
Contains React components, hooks, and UI-related logic.

#### Components (`/presentation/components`)
- `Services.tsx` - Main services page component with enhanced layout
- `ServicesHero.tsx` - Animated hero section with gradient effects
- `ServicesGrid.tsx` - Responsive grid with staggered animations
- `ServiceCard.tsx` - Interactive service cards with expand/collapse and hover effects
- `ServicesStats.tsx` - Statistics section showing company achievements
- `ServicesCTA.tsx` - Call-to-action section with contact buttons

#### Hooks (`/presentation/hooks`)
- `useServicesData.ts` - Custom hook for fetching and transforming services data
- `useServiceCardCarousel.ts` - Custom hook for managing carousel state

## Key Benefits

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Business logic is isolated and easily testable
3. **Maintainability**: Changes to one layer don't affect others
4. **Reusability**: Components and services can be reused across the application
5. **Scalability**: Easy to extend with new features and services
6. **User-Friendly Design**: Enhanced UX with animations, hover effects, and interactive elements
7. **Responsive Layout**: Optimized for all device sizes
8. **Accessibility**: Semantic HTML and proper ARIA attributes

## Usage

```tsx
import { Services } from '../features/services';

// Use in your page component
export const ServicesPage = () => {
  return <Services />;
};
```

## Data Flow

1. **UI Request** → `useServicesData` hook
2. **Hook** → `ServicesDataService` (business logic)
3. **Service** → `AssetsRepository` (asset management)
4. **Repository** → Returns processed data
5. **Data** → Rendered in components

## Component Hierarchy

```
Services
├── ServicesHero (animated hero with gradient effects)
├── ServicesStats (company statistics with hover animations)
├── ServicesGrid (responsive grid with staggered animations)
│   └── ServiceCard (interactive cards with expand/collapse)
│       └── useServiceCardCarousel (image carousel management)
└── ServicesCTA (call-to-action with contact buttons)
```

## Enhanced Features

### 🎨 User Experience Enhancements
- **Gradient Backgrounds**: Beautiful gradient overlays and backgrounds
- **Smooth Animations**: Staggered fade-in animations for service cards
- **Interactive Cards**: Expandable service cards with hover effects
- **Image Carousels**: Automatic image rotation with indicators
- **Category Badges**: Visual category identification with icons
- **Responsive Design**: Optimized layouts for all screen sizes

### 🚀 Interactive Elements
- **Expand/Collapse**: Service cards can show more/less content
- **Hover Effects**: Cards lift and scale on hover
- **Click Actions**: Call-to-action buttons with smooth transitions
- **Auto-scroll**: Smooth scrolling to contact section
- **Visual Feedback**: Button states and loading indicators

### 📱 Mobile-First Design
- **Touch-Friendly**: Large touch targets for mobile devices
- **Responsive Grid**: Adapts from 1 column on mobile to 3 on desktop
- **Optimized Images**: Lazy loading and proper sizing
- **Readable Typography**: Scalable fonts and proper contrast
