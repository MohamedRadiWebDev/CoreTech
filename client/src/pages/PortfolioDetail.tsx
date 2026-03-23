import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Container, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema, projectSchema } from '@/lib/seo';
import { usePortfolioItem } from '@/hooks/use-site-data';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/hooks/useTranslation';

export default function PortfolioDetail() {
  const [, params] = useRoute('/portfolio/:id');
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const portfolio = usePortfolioItem(params?.id);

  if (portfolio.isLoading) return <div className="pt-32 px-4"><LoadingState /></div>;
  if (portfolio.isError) return <div className="pt-32 px-4"><ErrorState /></div>;
  if (!portfolio.item) return <div className="pt-32 px-4"><EmptyState title={t('common.states.empty_title')} description={t('common.states.empty_description')} /></div>;

  const project = portfolio.item;
  const path = `/portfolio/${project.slug}`;
  return (
    <>
      <SeoHead title={project.seoTitle || project.title} description={project.seoDescription || project.shortDescription} canonicalPath={path} image={project.image.startsWith('http') ? project.image : `https://coretech.com${project.image}`} jsonLd={[breadcrumbSchema([{ name: t('nav.home'), path: '/' }, { name: t('portfolio_page.eyebrow'), path: '/portfolio' }, { name: project.title, path }]), projectSchema({ title: project.title, description: project.shortDescription, image: project.image, category: project.categoryName, path })]} />
      <Section className="pt-32 pb-12"><Container className="max-w-5xl"><Link href="/portfolio"><a className="inline-flex items-center gap-2 text-sm font-medium text-primary">{isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />} {t('common.actions.back_to_portfolio')}</a></Link><div className="mt-6 rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{project.categoryName}</p><h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1><p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{project.fullDescription}</p><div className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl bg-muted/50 p-5"><p className="text-sm text-muted-foreground">{t('common.labels.impact')}</p><p className="mt-2 text-2xl font-semibold">{project.impact.value}</p><p className="text-sm text-muted-foreground">{project.impact.label}</p></div><div className="rounded-2xl bg-muted/50 p-5"><p className="text-sm text-muted-foreground">{t('common.labels.year')}</p><p className="mt-2 text-2xl font-semibold">{project.year}</p></div><div className="rounded-2xl bg-muted/50 p-5"><p className="text-sm text-muted-foreground">{t('common.labels.client')}</p><p className="mt-2 text-lg font-semibold">{project.client ?? t('portfolio_detail.confidential_client')}</p></div></div></div><img src={project.image} alt={project.title} className="mt-8 h-[420px] w-full rounded-[2rem] object-cover shadow-xl" decoding="async" /><div className="mt-10 grid gap-8 lg:grid-cols-[1fr,0.9fr]"><article className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm"><h2 className="text-2xl font-semibold">{t('portfolio_detail.overview_title')}</h2><p className="mt-4 text-base leading-8 text-muted-foreground">{project.fullDescription}</p><h3 className="mt-10 text-xl font-semibold">{t('common.labels.services_delivered')}</h3><ul className="mt-4 space-y-3 text-muted-foreground">{project.services.map((service) => <li key={service}>• {service}</li>)}</ul></article><aside className="space-y-6"><div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm"><h3 className="text-xl font-semibold">{t('common.labels.technology_stack')}</h3><div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{tech}</span>)}</div><a href={project.website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-medium text-primary">{t('common.actions.view_live')} <ExternalLink className="h-4 w-4" /></a></div><div className="rounded-[2rem] border border-border/60 bg-slate-950 p-8 text-white shadow-sm"><h3 className="text-xl font-semibold">{t('portfolio_detail.cta_title')}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{t('portfolio_detail.cta_description')}</p><Link href="/contact"><a className="mt-6 inline-flex items-center gap-2 font-medium text-primary-foreground">{t('common.actions.start_project')} <ArrowRight className="h-4 w-4" /></a></Link></div></aside></div>{portfolio.related.length ? <div className="mt-12"><h2 className="text-2xl font-semibold">{t('common.labels.related_work')}</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{portfolio.related.map((item) => <Link key={item.id} href={`/portfolio/${item.slug}`}><a className="rounded-[1.5rem] border border-border/60 bg-card p-4 shadow-sm transition hover:-translate-y-1"><img src={item.image} alt={item.title} className="h-40 w-full rounded-2xl object-cover" loading="lazy" decoding="async" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.shortDescription}</p></a></Link>)}</div></div> : null}</Container></Section>
    </>
  );
}
