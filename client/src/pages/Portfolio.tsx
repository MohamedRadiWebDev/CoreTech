import { useMemo, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Container, PageHero, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { usePortfolio } from '@/hooks/use-site-data';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

const filters = ['all', 'web-design', 'digital-marketing', 'video-production'];

export default function Portfolio() {
  const { t } = useTranslation();
  const portfolio = usePortfolio();
  const [location] = useLocation();
  const paramFilter = new URLSearchParams(location.split('?')[1] ?? '').get('filter') ?? 'all';
  const [activeFilter, setActiveFilter] = useState(paramFilter);

  const items = useMemo(() => {
    if (!portfolio.data) return [];
    if (activeFilter === 'all') return portfolio.data;
    return portfolio.data.filter((item) => item.category === activeFilter || item.id === activeFilter);
  }, [portfolio.data, activeFilter]);

  return (
    <>
      <SeoHead title={t('meta.portfolio_title')} description={t('meta.portfolio_description')} canonicalPath="/portfolio" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }])} />
      <PageHero eyebrow="Portfolio" title={t('portfolio_page.title')} description={t('portfolio_page.description')} />
      <Section>
        <Container>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button key={filter} onClick={() => setActiveFilter(filter)} className={cn('rounded-full border px-5 py-2 text-sm font-medium transition', activeFilter === filter ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground')}>
                {filter === 'all' ? t('portfolio.filter_all') : filter === 'web-design' ? t('portfolio.filter_web') : filter === 'digital-marketing' ? t('portfolio.filter_marketing') : t('portfolio.filter_video')}
              </button>
            ))}
          </div>

          {portfolio.isLoading ? <div className="mt-10"><LoadingState /></div> : portfolio.isError ? <div className="mt-10"><ErrorState /></div> : items.length === 0 ? <div className="mt-10"><EmptyState title="No matching case studies" description="Try another category or browse all work." /></div> : (
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <img src={item.image} alt={item.title} className="h-60 w-full object-cover" loading="lazy" decoding="async" />
                  <div className="p-6">
                    <p className="text-sm font-medium text-primary">{item.categoryName}</p>
                    <h2 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.shortDescription}</p>
                    <div className="mt-5 flex items-center justify-between text-sm text-muted-foreground">
                      <span>{item.impact.value} {item.impact.label}</span>
                      <span>{item.year}</span>
                    </div>
                    <Link href={`/portfolio/${item.id}`}><a className="mt-5 inline-flex items-center gap-2 font-medium text-primary">Explore case study <ArrowRight className="h-4 w-4" /></a></Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
