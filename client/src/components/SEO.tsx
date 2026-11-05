import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
export const BASE_URL = 'https://www.orionstad.se';

const LANG_MAP: Record<string, string> = {
  sv: 'sv',
  en: 'en',
};

const LOCALE_MAP: Record<string, string> = {
  sv: 'sv_SE',
  en: 'en_GB',
};

export const SEO = ({
  title,
  description: descriptionProp,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = `${BASE_URL}/og-image.jpg`,
  structuredData,
  noindex = false,
  breadcrumbs,
}: SEOProps) => {
  const language = useSelector((state: RootState) => state.language.language);
  const { t } = useTranslation('common');
  const description = descriptionProp ?? t('seo.defaultDescription');
  const imageAlt = t('seo.imageAlt');
  const lang = LANG_MAP[language] || 'sv';
  const locale = LOCALE_MAP[language] || 'sv_SE';

  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : t('seo.defaultTitle');

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
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Structured Data */}
      {allStructuredData.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};
