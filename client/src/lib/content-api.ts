import { fetchJson } from '@/lib/fetcher';
import { supabase } from '@/lib/supabase';
import type { BlogPostRecord, PortfolioRecord, ServiceRecord, TestimonialRecord } from '@/types';

type TableName = 'blog_posts' | 'portfolio' | 'services' | 'testimonials';

type ContentRow<T> = {
  id: string;
  slug?: string;
  content: T;
  created_at?: string;
};

const localFallbackPaths: Record<TableName, string> = {
  blog_posts: '/data/blog.json',
  portfolio: '/data/portfolio.json',
  services: '/data/services.json',
  testimonials: '/data/testimonials.json',
};

async function readLocal<T>(table: TableName): Promise<T[]> {
  return fetchJson<T[]>(localFallbackPaths[table]);
}

async function seedFromLocal<T extends { id: string; slug?: string }>(table: TableName): Promise<void> {
  if (!supabase) return;
  const localData = await readLocal<T>(table);
  if (!localData.length) return;

  const rows = localData.map((item) => ({
    id: item.id,
    slug: item.slug,
    content: item,
  }));

  const { error } = await supabase.from<ContentRow<T>>(table).upsert(rows);
  if (error) throw error;
}

async function getCollection<T extends { id: string; slug?: string }>(table: TableName): Promise<T[]> {
  if (!supabase) return readLocal<T>(table);

  const { data, error } = await supabase.from<ContentRow<T>>(table).select('*');
  if (error) throw error;

  if (!data || data.length === 0) {
    await seedFromLocal<T>(table);
    const seeded = await supabase.from<ContentRow<T>>(table).select('*');
    if (seeded.error) throw seeded.error;
    return (seeded.data ?? []).map((item) => item.content);
  }

  return data.map((item) => item.content);
}

async function createItem<T extends { id: string; slug?: string }>(table: TableName, item: T): Promise<T> {
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.from<ContentRow<T>>(table).insert({ id: item.id, slug: item.slug, content: item });
  if (error) throw error;
  return item;
}

async function updateItem<T extends { id: string; slug?: string }>(table: TableName, item: T): Promise<T> {
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.from<ContentRow<T>>(table).update({ slug: item.slug, content: item }).eq('id', item.id);
  if (error) throw error;
  return item;
}

async function deleteItem(table: TableName, id: string): Promise<void> {
  if (!supabase) throw new Error('Supabase is not configured');
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}

async function syncCollection<T extends { id: string; slug?: string }>(table: TableName, items: T[]): Promise<void> {
  if (!supabase) return;

  const { data: existingRows, error: existingError } = await supabase.from<{ id: string }>(table).select('id');
  if (existingError) throw existingError;

  const payload = items.map((item) => ({ id: item.id, slug: item.slug, content: item }));
  const { error: upsertError } = await supabase.from<ContentRow<T>>(table).upsert(payload);
  if (upsertError) throw upsertError;

  const existingIds = new Set((existingRows ?? []).map((row) => row.id));
  const nextIds = new Set(items.map((item) => item.id));
  const deletedIds = Array.from(existingIds).filter((id) => !nextIds.has(id));

  if (deletedIds.length > 0) {
    const { error: deleteError } = await supabase.from(table).delete().in('id', deletedIds);
    if (deleteError) throw deleteError;
  }
}

export const getBlogPosts = () => getCollection<BlogPostRecord>('blog_posts');
export const createBlogPost = (post: BlogPostRecord) => createItem('blog_posts', post);
export const updateBlogPost = (post: BlogPostRecord) => updateItem('blog_posts', post);
export const deleteBlogPost = (id: string) => deleteItem('blog_posts', id);
export const syncBlogPosts = (posts: BlogPostRecord[]) => syncCollection('blog_posts', posts);

export const getPortfolioItems = () => getCollection<PortfolioRecord>('portfolio');
export const createPortfolioItem = (item: PortfolioRecord) => createItem('portfolio', item);
export const updatePortfolioItem = (item: PortfolioRecord) => updateItem('portfolio', item);
export const deletePortfolioItem = (id: string) => deleteItem('portfolio', id);
export const syncPortfolioItems = (items: PortfolioRecord[]) => syncCollection('portfolio', items);

export const getServices = () => getCollection<ServiceRecord>('services');
export const createService = (item: ServiceRecord) => createItem('services', item);
export const updateService = (item: ServiceRecord) => updateItem('services', item);
export const deleteService = (id: string) => deleteItem('services', id);
export const syncServices = (items: ServiceRecord[]) => syncCollection('services', items);

export const getTestimonials = () => getCollection<TestimonialRecord>('testimonials');
export const createTestimonial = (item: TestimonialRecord) => createItem('testimonials', item);
export const updateTestimonial = (item: TestimonialRecord) => updateItem('testimonials', item);
export const deleteTestimonial = (id: string) => deleteItem('testimonials', id);
export const syncTestimonials = (items: TestimonialRecord[]) => syncCollection('testimonials', items);
