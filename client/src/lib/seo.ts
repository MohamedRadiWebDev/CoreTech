import { seoSiteUrl } from '@/components/seo/SeoHead';

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Core Tech',
  url: seoSiteUrl,
  logo: `${seoSiteUrl}/generated-icon.png`,
  sameAs: [
    'https://facebook.com/coretechsa',
    'https://instagram.com/coretech.sa',
    'https://twitter.com/coretechsa',
    'https://linkedin.com/company/coretech-sa',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Core Tech',
  url: seoSiteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${seoSiteUrl}/blog?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: Array<{ name: string; path: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${seoSiteUrl}${item.path}`,
  })),
});

export const articleSchema = (article: { title: string; description: string; image: string; datePublished: string; author: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  author: { '@type': 'Person', name: article.author },
  publisher: { '@type': 'Organization', name: 'Core Tech', logo: { '@type': 'ImageObject', url: `${seoSiteUrl}/generated-icon.png` } },
  mainEntityOfPage: `${seoSiteUrl}${article.path}`,
});

export const projectSchema = (project: { title: string; description: string; image: string; path: string; category: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: project.title,
  description: project.description,
  image: project.image,
  url: `${seoSiteUrl}${project.path}`,
  genre: project.category,
  creator: { '@type': 'Organization', name: 'Core Tech' },
});
