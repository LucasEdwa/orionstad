# Orion Home ✨

Orion Home is a professional cleaning company based in Stockholm, Sweden. This repo powers their entire web presence: a multilingual marketing site with an integrated booking system that sends real service requests via email.

🔗 **Live at** [www.orionstad.se](https://www.orionstad.se)

---

## What is this?

Orion Home is a professional cleaning company based in Stockholm, Sweden. This repo powers their entire web presence: a multilingual marketing site with an integrated booking system that sends real service requests via email.

Customers pick a cleaning service, fill out a two-step booking form, and hit submit. That's it — the request lands in the company inbox through EmailJS, and the customer gets instant feedback via SweetAlert. No backend server needed.

The site supports **Swedish**, **English**, and **Spanish** — and every language switch updates not just the UI text but also the `<html lang>` attribute, Open Graph locale tags, and hreflang alternates for search engines. SEO isn't an afterthought here.

## Why I built it this way

I made deliberate trade-offs based on what this project actually needs, not what's trendy:

**React 19 + Vite instead of Next.js** — This is a client-side interactive app. The booking form spans multiple steps, the hero section has a video player with controls, and language switching happens in real time. SSR would add a Node server to deploy and maintain for zero practical benefit. Meta tags are handled by `react-helmet-async`, and crawlers get a static `sitemap.xml`. Vite gives me sub-second hot reloads during development and fast production builds.

**React 19 features, not just the version number** — The booking form uses `useActionState` for async submission and `useFormStatus` so the submit button reads pending state directly from the form context — no prop drilling. This isn't React 17 code with a bumped version number.

**Redux Toolkit for global state** — Only two slices: booking and language. But both need to be global. Booking state survives navigation between the home page and the dedicated `/booking` route. Language state drives five systems at once (i18n translations, HTML lang attr, OG tags, hreflang links, and localStorage). RTK's `createSlice` keeps this clean with zero boilerplate. I considered TanStack Query, but there's no server to query — EmailJS is a client-side SDK call, not a REST API. There's nothing to cache, refetch, or invalidate.

**Clean Architecture per feature** — Every feature (hero, booking, contact, services, etc.) has its own Domain → Application → Infrastructure → Presentation layers. Every feature exposes a public `index.ts` barrel — no outside code can import internal files. You can delete any feature folder and only its page breaks — the rest of the app compiles fine. The only cross-feature dependency is `booking → home` (shared booking form components), and it goes through `home/index.ts`, not into internal paths.

**Tailwind CSS 4** — Utility-first styling with native CSS variables for theming. No runtime CSS-in-JS overhead. Ships as a Vite plugin so it doesn't add build time.

## Things I'm proud of

- **The booking funnel actually works.** Two-step form using React 19's `useActionState` for async submission and `useFormStatus` for the submit button. The hook handles the entire lifecycle: pending state, success/error result, and Redux cleanup — no manual `useState(false)` toggles.
- **Real E2E tests running in CI.** Cypress covers the full booking flow, contact form, and cross-page navigation. Tests mock EmailJS so they run without network dependencies. The GitHub Actions pipeline runs lint → typecheck → build → Cypress E2E → Lighthouse audit on every push.
- **Lighthouse CI on every PR.** The pipeline runs Lighthouse against the production build and fails if performance, accessibility, or SEO scores drop below 90. The report is uploaded as a build artifact.
- **Error boundaries that recover.** The hero feature has its own `ErrorBoundary` with a "Try again" button. If the video fails to load, it hides gracefully instead of crashing the page.
- **i18n that goes beyond text.** Language switching updates the HTML lang attribute, OG locale, hreflang alternates, and structured data — all dynamically via `react-helmet-async`. I chose state-based language switching over URL-based (`/en/booking`) because Google's documentation confirms hreflang alternates are sufficient for language discovery, and this avoids duplicating every route with a `/:lang` prefix for a 3-language site.
- **Feature isolation you can verify.** Every feature has a public `index.ts` barrel. No file outside a feature imports from its `presentation/`, `infrastructure/`, or `domain/` subdirectories. Grep the imports — zero boundary violations.

## Project structure

```
orionstad/
└── client/                 # The entire frontend lives here
    ├── src/
    │   ├── features/       # Clean Architecture modules (hero, booking, contact, etc.)
    │   ├── components/     # Shared UI (SEO, promotions, chat widget)
    │   ├── locales/        # Translations — sv, en, es
    │   ├── store/          # Redux Toolkit slices
    │   └── pages/          # Route-level page components
    └── cypress/            # E2E tests (booking funnel, contact form, integration)
```

## Get it running

```bash
cd client
npm install
npm run dev          # http://localhost:5173
npm run build        # Production build
npm run test:e2e     # Headless Cypress
```

You'll need EmailJS credentials in a `.env` file — see [client/README.md](client/README.md) for details.

## Want the deep dive?

The [client/README.md](client/README.md) has the full architecture breakdown: tech stack table, feature map, i18n/SEO implementation details, E2E test coverage, and environment setup.
