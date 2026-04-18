# Orion Städ

Professional cleaning services — [www.orionstad.se](https://www.orionstad.se)

## Repository Structure

```
orionstad/
└── client/          # React 19 + TypeScript frontend (Vite, Tailwind CSS 4)
    ├── src/
    │   ├── features/    # Clean Architecture feature modules
    │   ├── components/  # Shared components (promotions, SEO, chat)
    │   ├── locales/     # i18n translations (en, es, sv)
    │   ├── store/       # Redux slices (booking, language)
    │   └── pages/       # Route-level page components
    └── cypress/         # E2E test suite
```

See [client/README.md](client/README.md) for setup and architecture details.
