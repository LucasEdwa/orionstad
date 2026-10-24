# About Feature - Clean Architecture

### 🏛️ Domain Layer (`/domain`)
- `entities/About.ts` - `AboutIntro`, `AboutStory`, `AboutPillar`, `AboutSection`, `AboutPageData`

### ⚙️ Application Layer (`/application`)
- `AboutDataService.ts` - Assembles page data and detects 💡 highlight paragraphs

### 🎨 Presentation Layer (`/presentation`)
- `About.tsx` - Page: sage `PageHeader`, story with image, three pillars, full company story
- `components/AboutStorySection.tsx` - Image + "Vår historia" text block
- `components/AboutPillars.tsx` - Three values with a top rule
- `components/AboutDetails.tsx` - Long-form sections, one row each
- `hooks/useAboutData.ts` - Reads `intro`, `story`, `pillars` and `sections` from the `about` namespace

Shared UI (buttons, cards, `PageHeader`, `Container`) lives in `src/components/ui`.
