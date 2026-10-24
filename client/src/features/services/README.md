# Services Feature - Clean Architecture

### 🏛️ Domain Layer (`/domain`)
- `serviceIds.ts` - `SERVICE_IDS` (URL slugs, e.g. `hemstadning`) and `isServiceId`; import-free so the router can use it
- `entities/Service.ts` - `ServiceCatalogEntry`, `Service`, `ServicesPageIntro`, `ServicesPageData`

### ⚙️ Application Layer (`/application`)
- `ServicesDataService.ts` - Attaches images to catalog entries, looks services up by id, picks related services

### 🔌 Infrastructure Layer (`/infrastructure`)
- `AssetsRepository.ts` - Image per service id

### 🎨 Presentation Layer (`/presentation`)
- `Services.tsx` - `/services`: sage `PageHeader` + card grid
- `ServiceDetail.tsx` - `/services/:serviceId`: header, image, what's included, quote prompt, related services
- `components/ServiceCard.tsx` - Image, title, short text, "Request a quote" (`/contact?service=<id>`) and "Read more"
- `components/ServicesGrid.tsx` - Responsive card grid
- `hooks/useServicesData.ts` - Reads `page` and `catalog` from the `services` namespace

Adding a service: add its slug to `SERVICE_IDS`, an image in `AssetsRepository`, a `catalog` entry in each `locales/*/services.json`, and a `<url>` in `public/sitemap.xml`.
