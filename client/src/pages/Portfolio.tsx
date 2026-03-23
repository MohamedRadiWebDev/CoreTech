import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Container, PageHero, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { usePortfolio } from '@/hooks/use-site-data';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export default function Portfolio() {
  const { t } = useTranslation();
  const portfolio = usePortfolio();
  const [location] = useLocation();
  const paramFilter = new URLSearchParams(location.split('?')[1] ?? '').get('filter') ?? 'all';
  const [activeFilter, setActiveFilter] = useState(paramFilter);

  useEffect(() => setActiveFilter(paramFilter), [paramFilter]);

  const categoryFilters = useMemo(() => {
    const records = portfolio.data ?? [];
    const seen = new Set<string>();
    return records
      .filter((item) => {
        if (!item.category || seen.has(item.category)) return false;
        seen.add(item.category);
        return true;
      })
      .map((item) => ({ value: item.category, label: item.categoryName }));
  }, [portfolio.data]);

  const items = useMemo(() => {
    const records = portfolio.data ?? [];
    if (activeFilter === 'all') return records;

    return records.filter((item) => item.category === activeFilter || item.id === activeFilter || item.services.some((service) => service === activeFilter));
  }, [portfolio.data, activeFilter]);

  const filterButtons = useMemo(
    () => [{ value: 'all', label: t('portfolio_page.filters.all') }, ...categoryFilters],
    [categoryFilters, t],
  );

  return (
    <>
      <SeoHead title={t('meta.portfolio_title')} description={t('meta.portfolio_description')} canonicalPath="/portfolio" jsonLd={breadcrumbSchema([{ name: t('nav.home'), path: '/' }, { name: t('nav.portfolio'), path: '/portfolio' }])} />
      <PageHero eyebrow={t('portfolio_page.eyebrow')} title={t('portfolio_page.title')} description={t('portfolio_page.description')} />
      <Section>
        <Container>
          <div className="flex flex-wrap gap-3">
            {filterButtons.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  'rounded-full border px-5 py-2 text-sm font-medium transition',
                  activeFilter === filter.value ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground',
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {portfolio.isLoading ? <div className="mt-10"><LoadingState /></div> : portfolio.isError ? <div className="mt-10"><ErrorState /></div> : items.length === 0 ? <div className="mt-10"><EmptyState title={t('portfolio_page.empty_title')} description={t('portfolio_page.empty_description')} /></div> : <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={item.image} alt={item.title} className="h-60 w-full object-cover" loading="lazy" decoding="async" /><div className="p-6"><p className="text-sm font-medium text-primary">{item.categoryName}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.shortDescription}</p><div className="mt-5 flex items-center justify-between text-sm text-muted-foreground"><span>{item.impact.value} {item.impact.label}</span><span>{item.year}</span></div><Link href={`/portfolio/${item.slug}`}><a className="mt-5 inline-flex items-center gap-2 font-medium text-primary">{t('portfolio_page.explore_case_study')} <ArrowRight className="h-4 w-4" /></a></Link></div></article>)}</div>}
        </Container>
      </Section>
    </>
  );
}
