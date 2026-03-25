import { z } from 'zod';

const idSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imagePathRegex = /^(https?:\/\/|\/).+/;

const requiredLocalized = (min = 2) => z.string().trim().min(min);
const safeArray = z.array(z.string().trim().min(1)).min(1);

export const serviceIconKeys = ['monitor', 'rocket', 'video', 'film', 'play', 'messages-square'] as const;

export const serviceRecordSchema = z.object({
  id: z.string().regex(idSlugRegex),
  slug: z.string().regex(idSlugRegex),
  title: requiredLocalized(),
  title_ar: requiredLocalized(),
  description: requiredLocalized(8),
  description_ar: requiredLocalized(8),
  features: safeArray,
  features_ar: safeArray,
  image: z.string().regex(imagePathRegex),
  iconKey: z.enum(serviceIconKeys),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  seoTitle: z.string().optional(),
  seoTitle_ar: z.string().optional(),
  seoDescription: z.string().optional(),
  seoDescription_ar: z.string().optional(),
});

export const portfolioRecordSchema = z.object({
  id: z.string().regex(idSlugRegex),
  slug: z.string().regex(idSlugRegex),
  title: requiredLocalized(),
  title_ar: requiredLocalized(),
  category: z.string().regex(idSlugRegex),
  category_ar: requiredLocalized(),
  categoryName: requiredLocalized(),
  categoryName_ar: requiredLocalized(),
  image: z.string().regex(imagePathRegex),
  gallery: z.array(z.string().regex(imagePathRegex)).min(1),
  shortDescription: requiredLocalized(8),
  shortDescription_ar: requiredLocalized(8),
  fullDescription: requiredLocalized(12),
  fullDescription_ar: requiredLocalized(12),
  client: z.string().trim().min(1),
  client_ar: z.string().trim().min(1),
  website: z.string().url(),
  year: z.string().trim().min(4),
  services: safeArray,
  services_ar: safeArray,
  technologies: safeArray,
  technologies_ar: safeArray,
  impact: z.object({
    value: z.string().trim().min(1),
    label: z.string().trim().min(1),
    label_ar: z.string().trim().min(1),
  }),
  featured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoTitle_ar: z.string().optional(),
  seoDescription: z.string().optional(),
  seoDescription_ar: z.string().optional(),
});

export const blogRecordSchema = z.object({
  id: z.string().regex(idSlugRegex),
  slug: z.string().regex(idSlugRegex),
  title: requiredLocalized(),
  title_ar: requiredLocalized(),
  excerpt: requiredLocalized(8),
  excerpt_ar: requiredLocalized(8),
  content: requiredLocalized(16),
  content_ar: requiredLocalized(16),
  category: z.string().regex(idSlugRegex),
  category_ar: requiredLocalized(),
  author: requiredLocalized(),
  author_ar: requiredLocalized(),
  authorRole: requiredLocalized(),
  authorRole_ar: requiredLocalized(),
  authorImage: z.string().regex(imagePathRegex),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  image: z.string().regex(imagePathRegex),
  tags: safeArray,
  tags_ar: safeArray,
  featured: z.boolean().optional(),
  seoTitle: z.string().optional(),
  seoTitle_ar: z.string().optional(),
  seoDescription: z.string().optional(),
  seoDescription_ar: z.string().optional(),
});

export const testimonialRecordSchema = z.object({
  id: z.string().regex(idSlugRegex),
  name: requiredLocalized(),
  name_ar: requiredLocalized(),
  role: requiredLocalized(),
  role_ar: requiredLocalized(),
  company: requiredLocalized(),
  company_ar: requiredLocalized(),
  image: z.string().regex(imagePathRegex),
  text: requiredLocalized(12),
  text_ar: requiredLocalized(12),
  rating: z.number().min(0).max(5),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  projectId: z.string().optional(),
  projectName: z.string().optional(),
  projectName_ar: z.string().optional(),
  featured: z.boolean().optional(),
});

export const studioBundleSchema = z.object({
  version: z.literal(1),
  exportedAt: z.string(),
  data: z.object({
    blog: z.array(blogRecordSchema),
    portfolio: z.array(portfolioRecordSchema),
    services: z.array(serviceRecordSchema),
    testimonials: z.array(testimonialRecordSchema),
  }),
});

export type StudioBundle = z.infer<typeof studioBundleSchema>;
