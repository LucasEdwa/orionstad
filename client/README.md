
# Orion Städ — Client Application

React 19 + TypeScript frontend for [orionstad.se](https://www.orionstad.se), a professional cleaning services company.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19, TypeScript |
| Routing | React Router 7 |
| State | Redux Toolkit, React-i18next |
| Styling | Tailwind CSS 4 |
| Build | Vite |
| Testing | Cypress (E2E), Vitest (unit) |
| Email | EmailJS |

## Architecture

Each feature follows **Clean Architecture** with four layers:

```
features/
├── hero/           # Landing hero with video, logo animation, particles
├── about/          # Company story, stats, values, CTA
├── services/       # Service cards, carousel, stats, CTA
├── contact/        # Contact form, quick actions, business hours
├── booking/        # Booking page
├── footer/         # Footer with reviews, links, social media
├── navbar/         # Navigation bar
├── home/           # Home page orchestration
├── notfound/       # 404 page
└── terms-of-service/
```

Each feature contains:
- **Domain** — Entities and repository interfaces (zero dependencies)
- **Application** — Business logic services
- **Infrastructure** — Concrete implementations (browser APIs, EmailJS, i18n adapters)
- **Presentation** — React components (purely presentational) and custom hooks

## i18n

Three supported languages: English (`en`), Spanish (`es`), Swedish (`sv`).  
Translations live in `src/locales/{lang}/` with namespaces per feature.

## Hero Feature — Performance Notes

The hero section underwent an enterprise-grade refactoring focused on:

- **Timer leak fix**: Nested `setTimeout` cleanup is tracked via `useRef` and properly cleared on unmount
- **Eliminated wasted renders**: Video DOM ref uses `useRef` + callback ref instead of `useState`; service instances are module-level singletons; particle positions are deterministic
- **Stable callback references**: All event handlers passed to `React.memo` children are wrapped in `useCallback`
- **Purely presentational components**: All i18n resolution happens in hooks — components receive data as props only
- **Error resilience**: `HeroErrorBoundary` catches render errors; video `onError` gracefully hides the player; `.play()` rejections are caught
- **Expanded type coverage**: `HeroContent` interface covers all 7 i18n keys (was 3)

See [`src/features/hero/README.md`](src/features/hero/README.md) for full details.

## Getting Started

```bash
npm install
npm run dev          # Start dev server on localhost:5173
npm run build        # Production build
npm run test:e2e     # Cypress E2E tests
```

## Environment Variables

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_IDHOME=...
VITE_EMAILJS_TEMPLATE_IDCONTACT=...
VITE_EMAILJS_PUBLIC_KEY=...
```

