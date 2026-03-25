import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchJson } from '@/lib/fetcher';
import type { BlogPostRecord, PortfolioRecord, ServiceRecord, TestimonialRecord } from '@/types';
import { studioBundleSchema, type StudioBundle } from './studio-schemas';

type CollectionKey = 'blog' | 'portfolio' | 'services' | 'testimonials';

type StudioCollections = {
  blog: BlogPostRecord[];
  portfolio: PortfolioRecord[];
  services: ServiceRecord[];
  testimonials: TestimonialRecord[];
};

type StudioOverrides = Partial<StudioCollections>;

type ContentStoreValue = {
  collections: StudioCollections;
  overrides: StudioOverrides;
  loading: boolean;
  error: Error | null;
  hasOverride: (key: CollectionKey) => boolean;
  setCollection: <K extends CollectionKey>(key: K, value: StudioCollections[K]) => void;
  resetCollection: (key: CollectionKey) => void;
  resetAll: () => void;
  exportBundle: () => StudioBundle;
  importBundle: (bundle: unknown) => void;
  lastSavedAt: string | null;
};

const STORAGE_KEY = 'coretech-content-overrides-v1';
const STORAGE_META_KEY = 'coretech-content-overrides-meta-v1';

const ContentStoreContext = createContext<ContentStoreValue | null>(null);

function readStoredOverrides(): StudioOverrides {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as StudioOverrides;
  } catch {
    return {};
  }
}

function readStoredLastSavedAt(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(STORAGE_META_KEY);
}

function parseBundle(data: unknown): StudioBundle {
  const parsed = studioBundleSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.errors[0]?.message ?? 'Invalid content bundle');
  }
  return parsed.data;
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function ContentStoreProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<StudioOverrides>(() => readStoredOverrides());
  const [lastSavedAt, setLastSavedAt] = useState<string | null>(() => readStoredLastSavedAt());

  const blogQuery = useQuery({ queryKey: ['defaults-blog'], queryFn: () => fetchJson<BlogPostRecord[]>('/data/blog.json'), initialData: [] as BlogPostRecord[] });
  const portfolioQuery = useQuery({ queryKey: ['defaults-portfolio'], queryFn: () => fetchJson<PortfolioRecord[]>('/data/portfolio.json'), initialData: [] as PortfolioRecord[] });
  const servicesQuery = useQuery({ queryKey: ['defaults-services'], queryFn: () => fetchJson<ServiceRecord[]>('/data/services.json'), initialData: [] as ServiceRecord[] });
  const testimonialsQuery = useQuery({ queryKey: ['defaults-testimonials'], queryFn: () => fetchJson<TestimonialRecord[]>('/data/testimonials.json'), initialData: [] as TestimonialRecord[] });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  }, [overrides]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (lastSavedAt) window.localStorage.setItem(STORAGE_META_KEY, lastSavedAt);
  }, [lastSavedAt]);

  const collections = useMemo<StudioCollections>(() => ({
    blog: overrides.blog ?? blogQuery.data,
    portfolio: overrides.portfolio ?? portfolioQuery.data,
    services: overrides.services ?? servicesQuery.data,
    testimonials: overrides.testimonials ?? testimonialsQuery.data,
  }), [overrides, blogQuery.data, portfolioQuery.data, servicesQuery.data, testimonialsQuery.data]);

  const loading = blogQuery.isLoading || portfolioQuery.isLoading || servicesQuery.isLoading || testimonialsQuery.isLoading;
  const error = (blogQuery.error ?? portfolioQuery.error ?? servicesQuery.error ?? testimonialsQuery.error ?? null) as Error | null;

  const setCollection = useCallback(<K extends CollectionKey>(key: K, value: StudioCollections[K]) => {
    setOverrides((prev) => ({ ...prev, [key]: clone(value) }));
    setLastSavedAt(new Date().toISOString());
  }, []);

  const resetCollection = useCallback((key: CollectionKey) => {
    setOverrides((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setLastSavedAt(new Date().toISOString());
  }, []);

  const resetAll = useCallback(() => {
    setOverrides({});
    setLastSavedAt(new Date().toISOString());
  }, []);

  const hasOverride = useCallback((key: CollectionKey) => key in overrides, [overrides]);

  const exportBundle = useCallback((): StudioBundle => studioBundleSchema.parse({
    version: 1,
    exportedAt: new Date().toISOString(),
    data: {
      blog: clone(collections.blog),
      portfolio: clone(collections.portfolio),
      services: clone(collections.services),
      testimonials: clone(collections.testimonials),
    },
  }), [collections]);

  const importBundle = useCallback((bundle: unknown) => {
    const parsed = parseBundle(bundle);
    setOverrides(parsed.data as StudioOverrides);
    setLastSavedAt(new Date().toISOString());
  }, []);

  const value = useMemo<ContentStoreValue>(() => ({
    collections,
    overrides,
    loading,
    error,
    hasOverride,
    setCollection,
    resetCollection,
    resetAll,
    exportBundle,
    importBundle,
    lastSavedAt,
  }), [collections, overrides, loading, error, hasOverride, setCollection, resetCollection, resetAll, exportBundle, importBundle, lastSavedAt]);

  return <ContentStoreContext.Provider value={value}>{children}</ContentStoreContext.Provider>;
}

export function useContentStore() {
  const ctx = useContext(ContentStoreContext);
  if (!ctx) throw new Error('useContentStore must be used within ContentStoreProvider');
  return ctx;
}
