import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  structuredData?: object | object[];
  noindex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
}

const SITE_NAME = 'Orion Home';
const DEFAULT_DESCRIPTION =
  'Professional cleaning services in Stockholm, Sweden. Home cleaning, office cleaning, deep cleaning, and move-in/move-out cleaning. Eco-friendly and affordable.';
export const BASE_URL = 'https://www.orionstad.se';
const OG_IMAGE_ALT = 'Orion Home – professional cleaning services in Stockholm';

const LANG_MAP: Record<string, string> = {
  sv: 'sv',
  en: 'en',
  es: 'es',
};

const LOCALE_MAP: Record<string, string> = {
  sv: 'sv_SE',
  en: 'en_GB',
  es: 'es_ES',
};

export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = `${BASE_URL}/og-image.jpg`,
  structuredData,
  noindex = false,
  breadcrumbs,
}: SEOProps) => {
  const language = useSelector((state: RootState) => state.language.language);
  const lang = LANG_MAP[language] || 'en';
  const locale = LOCALE_MAP[language] || 'en_GB';

  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} – Professional Cleaning Services in Stockholm`;

  const canonical = canonicalUrl || `${BASE_URL}/`;

  const allStructuredData: object[] = [];

  // Add provided structured data
  if (structuredData) {
    if (Array.isArray(structuredData)) {
      allStructuredData.push(...structuredData);
    } else {
      allStructuredData.push(structuredData);
    }
  }

  // Add breadcrumb structured data
  if (breadcrumbs && breadcrumbs.length > 0) {
    allStructuredData.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    });
  }

  return (
    <Helmet>
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'} />
      {/* A noindex page (e.g. 404) must not claim another URL as its canonical */}
      {!noindex && <link rel="canonical" href={canonical} />}

      {/* No hreflang: all languages share one URL (language is switched client-side),
          and hreflang pointing every language at the same URL is invalid. */}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={OG_IMAGE_ALT} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={OG_IMAGE_ALT} />

      {/* Structured Data */}
      {allStructuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
