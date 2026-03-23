import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Container, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema, projectSchema } from '@/lib/seo';
import { usePortfolioItem } from '@/hooks/use-site-data';
import { useLanguage } from '@/context/LanguageContext';

export default function PortfolioDetail() {
  const [, params] = useRoute('/portfolio/:id');
  const { isRTL } = useLanguage();
  const portfolio = usePortfolioItem(params?.id);

  if (portfolio.isLoading) return <div className="pt-32 px-4"><LoadingState title="Loading case study" description="Gathering project details and related work." /></div>;
  if (portfolio.isError) return <div className="pt-32 px-4"><ErrorState title="Unable to load project" /></div>;
  if (!portfolio.item) return <div className="pt-32 px-4"><EmptyState title="Project not found" description="This case study may have moved or no longer exists." /></div>;

  const project = portfolio.item;
  const path = `/portfolio/${project.id}`;
  return (
    <>
      <SeoHead
        title={project.title}
        description={project.shortDescription}
        canonicalPath={path}
        image={project.image.startsWith('http') ? project.image : `https://coretech.com${project.image}`}
        jsonLd={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/portfolio' }, { name: project.title, path }]),
          projectSchema({ title: project.title, description: project.shortDescription, image: project.image, category: project.categoryName, path }),
        ]}
      />
      <Section className="pt-32 pb-12">
        <Container className="max-w-5xl">
          <Link href="/portfolio"><a className="inline-flex items-center gap-2 text-sm font-medium text-primary">{isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />} Back to portfolio</a></Link>
          <div className="mt-6 rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{project.categoryName}</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{project.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{project.fullDescription}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-muted/50 p-5"><p className="text-sm text-muted-foreground">Impact</p><p className="mt-2 text-2xl font-semibold">{project.impact.value}</p><p className="text-sm text-muted-foreground">{project.impact.label}</p></div>
              <div className="rounded-2xl bg-muted/50 p-5"><p className="text-sm text-muted-foreground">Year</p><p className="mt-2 text-2xl font-semibold">{project.year}</p></div>
              <div className="rounded-2xl bg-muted/50 p-5"><p className="text-sm text-muted-foreground">Client</p><p className="mt-2 text-lg font-semibold">{project.client ?? 'Confidential / Growth partner'}</p></div>
            </div>
          </div>
          <img src={project.image} alt={project.title} className="mt-8 h-[420px] w-full rounded-[2rem] object-cover shadow-xl" decoding="async" />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,0.9fr]">
            <article className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">Project overview</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{project.fullDescription}</p>
              <h3 className="mt-10 text-xl font-semibold">Services delivered</h3>
              <ul className="mt-4 space-y-3 text-muted-foreground">{project.services.map((service) => <li key={service}>• {service}</li>)}</ul>
            </article>
            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm">
                <h3 className="text-xl font-semibold">Technology stack</h3>
                <div className="mt-5 flex flex-wrap gap-2">{project.technologies.map((tech) => <span key={tech} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">{tech}</span>)}</div>
                <a href={project.website} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-medium text-primary">Visit live project <ExternalLink className="h-4 w-4" /></a>
              </div>
              <div className="rounded-[2rem] border border-border/60 bg-slate-950 p-8 text-white shadow-sm">
                <h3 className="text-xl font-semibold">Need something similar?</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">We can help you scope, design, and launch a premium digital product with a performance-ready frontend foundation.</p>
                <Link href="/contact"><a className="mt-6 inline-flex items-center gap-2 font-medium text-primary-foreground">Start a project <ArrowRight className="h-4 w-4" /></a></Link>
              </div>
            </aside>
          </div>
          {portfolio.related.length ? <div className="mt-12"><h2 className="text-2xl font-semibold">Related work</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{portfolio.related.map((item) => <Link key={item.id} href={`/portfolio/${item.id}`}><a className="rounded-[1.5rem] border border-border/60 bg-card p-4 shadow-sm transition hover:-translate-y-1"><img src={item.image} alt={item.title} className="h-40 w-full rounded-2xl object-cover" loading="lazy" decoding="async" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.shortDescription}</p></a></Link>)}</div></div> : null}
        </Container>
      </Section>
    </>
  );
}
