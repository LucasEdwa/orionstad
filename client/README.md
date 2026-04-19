
# Orion Städ — Client Application

React 19 + TypeScript frontend for [orionstad.se](https://www.orionstad.se), a professional cleaning services company based in Stockholm.

## Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | React, TypeScript | 19.1, 5.8 |
| Routing | React Router | 7.6 |
| State | Redux Toolkit (RTK) | 2.8 |
| i18n | react-i18next + i18next | 15.6 / 25.3 |
| Styling | Tailwind CSS | 4.1 |
| Build | Vite | 6.3 |
| E2E Testing | Cypress | 14.5 |
| Email | EmailJS | 4.4 |
| Linting | ESLint 9 + Husky + lint-staged | — |

## Architecture

Each feature follows **Clean Architecture** with four layers:

```
features/<feature>/
├── domain/          # Entities, interfaces — zero external dependencies
├── application/     # Business logic services — depends only on domain
├── infrastructure/  # Concrete implementations (EmailJS, browser APIs, i18n adapters)
└── presentation/    # React components (purely presentational) + custom hooks
```

### Feature Map

```
features/
├── hero/           # Landing hero — video background, logo animation, particles, error boundary
├── home/           # Home page orchestration + booking form (steps 1 & 2)
├── booking/        # Dedicated booking page — imports from home's public API
├── about/          # Company story, stats, values, CTA
├── services/       # Service cards with carousel, stats, CTA
├── contact/        # Contact form + EmailJS, quick actions, business hours
├── footer/         # Footer with reviews widget, social links
├── navbar/         # Animated navigation bar
├── notfound/       # 404 page
└── terms-of-service/
```

### Feature Isolation

Features communicate only through their public `index.ts` barrel exports. Internal presentation components, hooks, and services are never imported directly from outside. The only cross-feature dependency is `booking → home` (shared booking form components), and it goes through `home/index.ts`.

**Test**: Delete any feature folder → only its corresponding page breaks. The rest of the app compiles.

## Technical Decisions

### Why React 19 + Vite over Next.js?

This is a client-side interactive application: multi-step booking forms, video hero with play/mute controls, real-time language switching, and SweetAlert modals. SSR would add deployment complexity (Node server) with no measurable benefit since:
- SEO meta tags are handled per-route via `react-helmet-async`
- A static `sitemap.xml` and `robots.txt` serve crawlers
- `<html lang>`, hreflang alternates, and OG locale tags update dynamically on language switch

Vite provides sub-second HMR, native ESM dev serving, and faster production builds than webpack-based alternatives.

### Why Redux Toolkit for "just" language and booking?

- **Booking state** spans two steps across two routes (`/` home section and `/booking` page). It must survive navigation without prop-drilling through the router. RTK's `createSlice` co-locates actions + reducers with zero boilerplate.
- **Language state** is global because a single language change must update: i18n translations, `<html lang>` attribute, OG locale meta tags, hreflang alternates, and localStorage persistence — all atomically.
- Both slices use RTK's `createSlice` (not legacy action types/reducers).

### Why Tailwind CSS 4?

Utility-first approach with native CSS custom properties for theming (`bg-orion-gradient`). Zero runtime CSS-in-JS overhead. Tailwind 4 ships as a Vite plugin for even faster builds.

## i18n & SEO

| Feature | Implementation |
|---------|---------------|
| Dynamic `<html lang>` | Set via `react-helmet-async` based on Redux language state |
| Hreflang alternates | `<link rel="alternate" hrefLang="sv/en/es">` in SEO component |
| OG locale | `og:locale` + `og:locale:alternate` updated per language |
| Structured data | JSON-LD breadcrumbs and business schema per page |
| Noscript fallback | Full business info in `<noscript>` block in `index.html` |

Supported languages: Swedish (`sv`), English (`en`), Spanish (`es`).

## E2E Testing

The Cypress suite covers the **critical booking funnel** end-to-end:

| Test File | Coverage |
|-----------|----------|
| `booking-form.cy.ts` | Two-step booking form: field validation, step navigation, EmailJS submit (mocked), error handling, form data retention |
| `contact-form.cy.ts` | Contact form validation, EmailJS integration, accessibility, mobile responsiveness |
| `integration.cy.ts` | Full booking flow, cross-page navigation, security validation |

```bash
npm run test:e2e        # Headless Cypress
npm run test:e2e:open   # Interactive Cypress runner
```

## Double-Submit Prevention

The booking form prevents duplicate submissions at two levels:
1. **UI**: Submit button is `disabled={isSubmitting}` and shows a spinner
2. **Hook**: `useBookingSubmission` guards with `if (isSubmitting) return` before setting state

## Getting Started

```bash
npm install
npm run dev          # Start dev server on localhost:5173
npm run build        # Production build
npm run lint         # ESLint check
npm run test:e2e     # Headless Cypress E2E
```

## Environment Variables

Copy `.env.example` and fill in your EmailJS credentials:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_IDHOME=...
VITE_EMAILJS_TEMPLATE_IDCONTACT=...
VITE_EMAILJS_PUBLIC_KEY=...
```

