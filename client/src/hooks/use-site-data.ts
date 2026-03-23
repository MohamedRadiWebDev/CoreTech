import { useMemo } from 'react';
import { useJsonQuery } from '@/lib/fetcher';
import type { BlogPost, PortfolioItem, Service, ServiceOption, SiteConfig, SocialLinks, Testimonial } from '@/types';
import { useTranslation } from './useTranslation';
import { useLanguage } from '@/context/LanguageContext';

const defaultSiteConfig: SiteConfig = {
  company: {
    name: 'Core Tech',
    tagline: 'Scaling ambitious brands with premium digital experiences.',
    email: 'info@coretech.com',
    phone: '+966123456789',
    address: 'Saudi Arabia',
  },
  stats: { projects: 150, clients: 89, experience: 5, satisfaction: 98 },
};

export const useSiteConfig = () =>
  useJsonQuery<SiteConfig>(['site-config'], '/data/site-config.json', { initialData: defaultSiteConfig });

export const useSocialLinks = () =>
  useJsonQuery<SocialLinks>(['social-links'], '/data/social-links.json', { initialData: {} });

export const useServiceOptions = () =>
  useJsonQuery<ServiceOption[]>(['service-options'], '/data/service-options.json', { initialData: [] });

export function useServices() {
  return useJsonQuery<Service[]>(['services'], '/data/services.json', { initialData: [] });
}

export function usePortfolio() {
  const { isRTL } = useLanguage();
  return useJsonQuery<PortfolioItem[]>(['portfolio'], '/data/portfolio.json', {
    initialData: [],
    select: (items) =>
      items.map((item) => ({
        ...item,
        shortDescription: isRTL ? item.shortDescription_ar : item.shortDescription,
        fullDescription: isRTL ? item.fullDescription_ar : item.fullDescription,
      })),
  });
}

export function usePortfolioItem(id?: string) {
  const portfolioQuery = usePortfolio();
  const item = useMemo(() => portfolioQuery.data?.find((entry) => entry.id === id) ?? null, [portfolioQuery.data, id]);
  const related = useMemo(
    () => portfolioQuery.data?.filter((entry) => entry.category === item?.category && entry.id !== item.id).slice(0, 3) ?? [],
    [portfolioQuery.data, item],
  );
  return { ...portfolioQuery, item, related };
}

export function useTestimonials() {
  return useJsonQuery<Testimonial[]>(['testimonials'], '/data/testimonials.json', { initialData: [] });
}

export function useBlogPosts() {
  const { t } = useTranslation();
  return useJsonQuery<BlogPost[]>(['blog-posts'], '/data/blog.json', {
    initialData: [],
    select: (posts) =>
      posts.map((post) => {
        const title = t(`blog.${post.id}_title`);
        const excerpt = t(`blog.${post.id}_excerpt`);
        const content = t(`blog.${post.id}_content`);
        const category = t(`blog.category_${post.category.toLowerCase()}`);
        return {
          ...post,
          title: title === `blog.${post.id}_title` ? post.title : title,
          excerpt: excerpt === `blog.${post.id}_excerpt` ? post.excerpt : excerpt,
          content: content === `blog.${post.id}_content` ? post.content : content,
          category: category === `blog.category_${post.category.toLowerCase()}` ? post.category : category,
        };
      }),
  });
}

export function useBlogPost(id?: string) {
  const blogQuery = useBlogPosts();
  const post = useMemo(() => blogQuery.data?.find((entry) => entry.id === id) ?? null, [blogQuery.data, id]);
  const related = useMemo(
    () => blogQuery.data?.filter((entry) => entry.category === post?.category && entry.id !== post.id).slice(0, 3) ?? [],
    [blogQuery.data, post],
  );
  return { ...blogQuery, post, related };
}
