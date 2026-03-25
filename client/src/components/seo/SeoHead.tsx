import { Helmet } from 'react-helmet';
import { useLocation } from 'wouter';

type SeoHeadProps = {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  robots?: string;
  canonicalPath?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

const SITE_NAME = 'Core Tech';
const SITE_URL = 'https://coretech.com';
const DEFAULT_IMAGE = `${SITE_URL}/generated-icon.png`;

export function SeoHead({
  title,
  description,
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords,
  robots = 'index,follow',
  canonicalPath,
  jsonLd,
}: SeoHeadProps) {
  const [location] = useLocation();
  const canonical = `${SITE_URL}${canonicalPath ?? location}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#0f172a" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {keywords?.length ? <meta name="keywords" content={keywords.join(', ')} /> : null}
      <link rel="canonical" href={canonical} />
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export const seoSiteUrl = SITE_URL;
