
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

### React 19 Features in Use

- **`useActionState`** — The booking form submission is managed by `useActionState` in `useBookingSubmission`. It handles the async lifecycle (pending → success/error) and returns `[state, formAction, isPending]`. No manual `useState(false)` toggles.
- **`useFormStatus`** — The `SubmitButton` component reads pending state directly from the enclosing `<form>` context via `useFormStatus()`. The submit button disables and shows a spinner automatically — no prop drilling of `isSubmitting`.
- **Form `action` prop** — `BookingStepTwo` uses `<form action={formAction}>` instead of the legacy `onSubmit` + `e.preventDefault()` pattern.

### Why Redux Toolkit, not TanStack Query?

- **Booking state** spans two steps across two routes (`/` home section and `/booking` page). It must survive navigation without prop-drilling through the router. RTK's `createSlice` co-locates actions + reducers with zero boilerplate.
- **Language state** is global because a single language change must update: i18n translations, `<html lang>` attribute, OG locale meta tags, hreflang alternates, and localStorage persistence — all atomically.
- Both slices use RTK's `createSlice` (not legacy action types/reducers).
- **Why not TanStack Query?** There is no server. EmailJS is a client-side SDK — a fire-and-forget call that sends an email. There's no cache to invalidate, no data to refetch, no optimistic updates. TanStack Query solves server-state synchronization; this app has no server state.

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

**Why not URL-based i18n (`/en/booking`)?** Google's documentation confirms hreflang alternates are sufficient for language discovery. URL-based i18n would require duplicating every route with a `/:lang` prefix and adding server-side redirects — significant complexity for a 3-language SPA that already has proper hreflang, `og:locale`, and dynamic `<html lang>`.

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

## Submission Handling (React 19 Pattern)

The booking form uses React 19's native form action model:

1. **`useActionState`** in `useBookingSubmission` — manages the async action lifecycle. Returns `[submissionState, formAction, isPending]`. React handles the pending → resolved transition.
2. **`useFormStatus`** in `SubmitButton` — reads `{ pending }` directly from the form context. The button automatically disables and shows a spinner while the action is in-flight.
3. **`<form action={formAction}>`** — React 19's form action pattern. No `e.preventDefault()`, no manual state toggles. The framework manages the submission lifecycle.

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

## Handling Failure Cases

### 404 — Route Not Found

React Router's `errorElement` catches any unmatched URL and renders the `NotFound` feature. The page provides:
- A descriptive "page not found" header
- Navigation links back to key pages (Home, Services, Contact)
- Contact information so the user is never stranded
- SEO `<meta name="robots" content="noindex">` to prevent indexing

```tsx
// Router.tsx
{
  path: "/",
  element: <Layout />,
  errorElement: <NotFound />,  // catches both unmatched routes AND render errors
  children: [...]
}
```

### 500 / Runtime Errors

React Router's `errorElement` also functions as an **error boundary**. If any route component throws during render, the same `NotFound` page catches it and displays a recovery UI. No white screen.

### Form Submission Failures

Both booking and contact forms handle failure at two layers:

| Layer | Mechanism | User Feedback |
|-------|-----------|---------------|
| **Validation** | Zod schemas (`bookingStepOneSchema`, `customerFormSchema`, `contactFormSchema`) run before any network call | Per-field red border + inline error message via `<FieldError>` component |
| **Network** | `try/catch` around EmailJS `sendForm()` in repository classes | Sonner toast (`toast.error(...)`) with descriptive message |
| **Config** | `validateEnv()` runs at startup; `emailRepository.isConfigured()` checked before submit | Toast: "Email service is not configured" |

### Environment Variable Validation

At startup, `src/validation/env.ts` validates all required `VITE_EMAILJS_*` variables via a Zod schema. If any are missing:
- A `console.warn` logs the missing variable names
- Email features degrade gracefully (forms show "Email service is not configured" on submit)
- The app does **not** crash

### EmailJS Response Validation

After every `emailjs.sendForm()` call, the response is validated against `emailjsResponseSchema` (`{ status: number, text: string }`). Unexpected response shapes are logged via `console.warn` for debugging without crashing the user flow.

