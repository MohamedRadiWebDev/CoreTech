import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useJsonQuery } from '@/lib/fetcher';
import { getLocalizedArray, getLocalizedField } from '@/lib/localization';
import { useContentStore } from '@/lib/content/content-store';
import type {
  BlogPostRecord,
  Language,
  LocalizedBlogPost,
  LocalizedPortfolioItem,
  LocalizedService,
  LocalizedServiceOption,
  LocalizedTestimonial,
  PortfolioRecord,
  ServiceOptionRecord,
  ServiceRecord,
  SiteConfig,
  SiteConfigRecord,
  SocialLinks,
  TestimonialRecord,
} from '@/types';

type DataResult<T> = {
  data: T;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

function localizeService(record: ServiceRecord, language: Language): LocalizedService {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedField(record, 'title', language),
    description: getLocalizedField(record, 'description', language),
    features: getLocalizedArray(record, 'features', language),
    image: record.image,
    iconKey: record.iconKey,
    featured: Boolean(record.featured),
    order: record.order ?? 999,
    seoTitle: getLocalizedField(record, 'seoTitle', language) || undefined,
    seoDescription: getLocalizedField(record, 'seoDescription', language) || undefined,
  };
}

function localizePortfolio(record: PortfolioRecord, language: Language): LocalizedPortfolioItem {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedField(record, 'title', language),
    category: record.category ?? '',
    categoryName: getLocalizedField(record, 'categoryName', language) || getLocalizedField(record, 'category', language),
    image: record.image,
    gallery: record.gallery ?? [record.image],
    shortDescription: getLocalizedField(record, 'shortDescription' as never, language),
    fullDescription: getLocalizedField(record, 'fullDescription' as never, language),
    client: getLocalizedField(record, 'client', language) || undefined,
    year: record.year,
    website: record.website,
    services: getLocalizedArray(record, 'services', language),
    technologies: getLocalizedArray(record, 'technologies', language),
    impact: { value: record.impact.value, label: language === 'ar' ? record.impact.label_ar : record.impact.label },
    featured: Boolean(record.featured),
    seoTitle: getLocalizedField(record, 'seoTitle', language) || undefined,
    seoDescription: getLocalizedField(record, 'seoDescription', language) || undefined,
  };
}

function localizeBlog(record: BlogPostRecord, language: Language): LocalizedBlogPost {
  return {
    id: record.id,
    slug: record.slug,
    title: getLocalizedField(record, 'title', language),
    excerpt: getLocalizedField(record, 'excerpt', language),
    content: getLocalizedField(record, 'content', language),
    categoryKey: record.category ?? '',
    category: getLocalizedField(record, 'category', language),
    author: language === 'ar' ? record.author_ar : record.author,
    authorRole: language === 'ar' ? record.authorRole_ar : record.authorRole,
    authorImage: record.authorImage,
    date: record.date,
    image: record.image,
    tags: language === 'ar' ? record.tags_ar : record.tags,
    featured: Boolean(record.featured),
    seoTitle: getLocalizedField(record, 'seoTitle', language) || undefined,
    seoDescription: getLocalizedField(record, 'seoDescription', language) || undefined,
  };
}

function localizeTestimonial(record: TestimonialRecord, language: Language): LocalizedTestimonial {
  return {
    id: record.id,
    name: language === 'ar' ? record.name_ar : record.name,
    role: language === 'ar' ? record.role_ar : record.role,
    company: language === 'ar' ? record.company_ar : record.company,
    image: record.image,
    text: language === 'ar' ? record.text_ar : record.text,
    rating: record.rating,
    date: record.date,
    projectId: record.projectId,
    projectName: language === 'ar' ? record.projectName_ar : record.projectName,
    featured: Boolean(record.featured),
  };
}

function localizeServiceOption(record: ServiceOptionRecord, language: Language): LocalizedServiceOption {
  return { id: record.id, label: language === 'ar' ? record.label_ar : record.label };
}

function localizeSiteConfig(record: SiteConfigRecord, language: Language): SiteConfig {
  return {
    company: {
      name: language === 'ar' ? record.company.name_ar : record.company.name,
      tagline: language === 'ar' ? record.company.tagline_ar : record.company.tagline,
      email: record.company.email,
      phone: record.company.phone,
      address: language === 'ar' ? record.company.address_ar : record.company.address,
    },
    stats: record.stats,
  };
}

export function useServices(): DataResult<LocalizedService[]> {
  const { language } = useLanguage();
  const store = useContentStore();

  return {
    data: store.collections.services.map((record) => localizeService(record, language)).sort((a, b) => a.order - b.order),
    isLoading: store.loading,
    isError: Boolean(store.error),
    error: store.error,
  };
}

export function usePortfolio(): DataResult<LocalizedPortfolioItem[]> {
  const { language } = useLanguage();
  const store = useContentStore();

  return {
    data: store.collections.portfolio.map((record) => localizePortfolio(record, language)),
    isLoading: store.loading,
    isError: Boolean(store.error),
    error: store.error,
  };
}

export function usePortfolioItem(idOrSlug?: string) {
  const query = usePortfolio();
  const item = useMemo(() => query.data.find((record) => record.id === idOrSlug || record.slug === idOrSlug) ?? null, [query.data, idOrSlug]);
  const related = useMemo(() => query.data.filter((record) => item && record.category === item.category && record.id !== item.id).slice(0, 3), [query.data, item]);
  return { ...query, item, related };
}

export function useBlogPosts(): DataResult<LocalizedBlogPost[]> {
  const { language } = useLanguage();
  const store = useContentStore();

  return {
    data: store.collections.blog.map((record) => localizeBlog(record, language)),
    isLoading: store.loading,
    isError: Boolean(store.error),
    error: store.error,
  };
}

export function useBlogPost(idOrSlug?: string) {
  const query = useBlogPosts();
  const post = useMemo(() => query.data.find((record) => record.id === idOrSlug || record.slug === idOrSlug) ?? null, [query.data, idOrSlug]);
  const related = useMemo(() => query.data.filter((record) => post && record.categoryKey === post.categoryKey && record.id !== post.id).slice(0, 3), [query.data, post]);
  return { ...query, post, related };
}

export function useTestimonials(): DataResult<LocalizedTestimonial[]> {
  const { language } = useLanguage();
  const store = useContentStore();

  return {
    data: store.collections.testimonials.map((record) => localizeTestimonial(record, language)),
    isLoading: store.loading,
    isError: Boolean(store.error),
    error: store.error,
  };
}

export function useServiceOptions() {
  const { language } = useLanguage();
  return useJsonQuery<ServiceOptionRecord[], LocalizedServiceOption[]>(['service-options'], '/data/service-options.json', {
    initialData: [],
    select: (records) => records.map((record) => localizeServiceOption(record, language)),
  });
}

export function useSiteConfig() {
  const { language } = useLanguage();
  return useJsonQuery<SiteConfigRecord, SiteConfig>(['site-config'], '/data/site-config.json', {
    initialData: {
      company: {
        name: 'Core Tech', name_ar: 'كور تك', tagline: 'Scaling ambitious brands with premium digital experiences.', tagline_ar: 'نساعد العلامات الطموحة على التوسع عبر تجارب رقمية احترافية.', email: 'info@coretech.com', phone: '+966123456789', address: 'Riyadh, Saudi Arabia', address_ar: 'الرياض، المملكة العربية السعودية',
      },
      stats: { projects: 150, clients: 89, experience: 5, satisfaction: 98 },
    },
    select: (record) => localizeSiteConfig(record, language),
  });
}

export function useSocialLinks() {
  return useJsonQuery<SocialLinks>(['social-links'], '/data/social-links.json', { initialData: {} });
}
