import { ArrowRight, CheckCircle2, Sparkles, Star } from 'lucide-react';
import { Link } from 'wouter';
import { SeoHead } from '@/components/seo/SeoHead';
import { organizationSchema, websiteSchema } from '@/lib/seo';
import { Container, Section, SectionHeader } from '@/components/common/section';
import { ErrorState, LoadingState } from '@/components/common/states';
import { FadeIn, Stagger, StaggerItem } from '@/components/motion/reveal';
import { useBlogPosts, usePortfolio, useServices, useSiteConfig, useTestimonials } from '@/hooks/use-site-data';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { t } = useTranslation();
  const services = useServices();
  const portfolio = usePortfolio();
  const testimonials = useTestimonials();
  const posts = useBlogPosts();
  const siteConfig = useSiteConfig();

  const dashboardItems = [
    { title: t('home.dashboard.items.vitals_title'), description: t('home.dashboard.items.vitals_description') },
    { title: t('home.dashboard.items.seo_title'), description: t('home.dashboard.items.seo_description') },
    { title: t('home.dashboard.items.ui_title'), description: t('home.dashboard.items.ui_description') },
    { title: t('home.dashboard.items.ux_title'), description: t('home.dashboard.items.ux_description') },
  ];

  return (
    <>
      <SeoHead title={t('meta.home_title')} description={t('meta.home_description')} canonicalPath="/" jsonLd={[organizationSchema, websiteSchema]} />
      <Section className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr,0.85fr]">
            <FadeIn className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"><Sparkles className="h-4 w-4" /> {t('home.eyebrow')}</div>
              <div className="space-y-6">
                <h1 className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">{t('home.title')}</h1>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">{t('home.description')}</p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/contact"><a><Button size="lg" className="rounded-full px-7">{t('common.actions.start_project')}</Button></a></Link>
                <Link href="/portfolio"><a><Button size="lg" variant="outline" className="rounded-full px-7">{t('common.actions.see_case_studies')}</Button></a></Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  [t('home.stats.projects'), String(siteConfig.data?.stats.projects ?? 150)],
                  [t('home.stats.satisfaction'), `${siteConfig.data?.stats.satisfaction ?? 98}%`],
                  [t('home.stats.experience'), `${siteConfig.data?.stats.experience ?? 5}+`],
                ].map(([label, value]) => <div key={label} className="rounded-2xl border border-border/60 bg-card/70 p-5 shadow-sm backdrop-blur"><p className="text-2xl font-semibold">{value}</p><p className="mt-1 text-sm text-muted-foreground">{label}</p></div>)}
              </div>
            </FadeIn>
            <FadeIn className="relative">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(59,130,246,0.28),transparent_60%)] blur-3xl" />
              <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm text-slate-400">{t('home.dashboard.subtitle')}</p><h2 className="mt-2 text-2xl font-semibold">{t('home.dashboard.title')}</h2></div>
                    <div className="rounded-full bg-primary/20 p-3 text-primary-foreground"><Star className="h-5 w-5" /></div>
                  </div>
                  <div className="mt-8 grid gap-4 sm:grid-cols-2">{dashboardItems.map((item) => <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5"><CheckCircle2 className="h-5 w-5 text-emerald-400" /><h3 className="mt-4 font-medium">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p></div>)}</div>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow={t('home.services.eyebrow')} title={t('home.services.title')} description={t('home.services.description')} />
          {services.isLoading ? <LoadingState /> : services.isError ? <ErrorState /> : <Stagger className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{services.data?.slice(0, 6).map((service) => <StaggerItem key={service.id} className="h-full"><article className="group h-full rounded-[1.75rem] border border-border/60 bg-card p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">{t('common.labels.service')}</p><h3 className="mt-4 text-2xl font-semibold tracking-tight">{service.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{service.description}</p><ul className="mt-6 space-y-3 text-sm text-muted-foreground">{service.features.slice(0, 3).map((feature) => <li key={feature} className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />{feature}</li>)}</ul></article></StaggerItem>)}</Stagger>}
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <SectionHeader eyebrow={t('home.portfolio.eyebrow')} title={t('home.portfolio.title')} description={t('home.portfolio.description')} />
          {portfolio.isLoading ? <LoadingState /> : portfolio.isError ? <ErrorState /> : <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">{(portfolio.data ?? []).filter((item) => item.featured).slice(0, 3).map((item) => <StaggerItem key={item.id}><article className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={item.image} alt={item.title} className="h-56 w-full object-cover" loading="lazy" decoding="async" /><div className="p-6"><p className="text-sm font-medium text-primary">{item.categoryName}</p><h3 className="mt-3 text-xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.shortDescription}</p><Link href={`/portfolio/${item.slug}`}><a className="mt-5 inline-flex items-center gap-2 font-medium text-primary">{t('common.actions.view_project')} <ArrowRight className="h-4 w-4" /></a></Link></div></article></StaggerItem>)}</Stagger>}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeader eyebrow={t('home.testimonials.eyebrow')} title={t('home.testimonials.title')} description={t('home.testimonials.description')} align="center" />
          {testimonials.isLoading ? <LoadingState /> : testimonials.isError ? <ErrorState /> : <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">{(testimonials.data ?? []).filter((item) => item.featured).slice(0, 3).map((item) => <StaggerItem key={item.id}><article className="rounded-[1.75rem] border border-border/60 bg-card p-7 shadow-sm"><div className="flex items-center gap-4"><img src={item.image} alt={item.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" decoding="async" /><div><h3 className="font-semibold">{item.name}</h3><p className="text-sm text-muted-foreground">{item.role} · {item.company}</p></div></div><p className="mt-6 text-sm leading-7 text-muted-foreground">“{item.text}”</p></article></StaggerItem>)}</Stagger>}
        </Container>
      </Section>

      <Section className="bg-muted/40">
        <Container>
          <SectionHeader eyebrow={t('home.blog.eyebrow')} title={t('home.blog.title')} description={t('home.blog.description')} />
          {posts.isLoading ? <LoadingState /> : posts.isError ? <ErrorState /> : <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">{(posts.data ?? []).filter((post) => post.featured).slice(0, 3).map((post) => <StaggerItem key={post.id}><article className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={post.image} alt={post.title} className="h-52 w-full object-cover" loading="lazy" decoding="async" /><div className="p-6"><p className="text-sm text-primary">{post.category}</p><h3 className="mt-3 text-xl font-semibold">{post.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p><Link href={`/blog/${post.slug}`}><a className="mt-5 inline-flex items-center gap-2 font-medium text-primary">{t('common.actions.read_article')} <ArrowRight className="h-4 w-4" /></a></Link></div></article></StaggerItem>)}</Stagger>}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950 px-8 py-12 text-white shadow-2xl shadow-primary/10 sm:px-12"><div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"><div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary-foreground/80">{t('home.cta.eyebrow')}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{t('home.cta.title')}</h2><p className="mt-4 text-slate-300">{t('home.cta.description')}</p></div><Link href="/contact"><a><Button size="lg" variant="secondary" className="rounded-full px-8">{t('home.cta.button')}</Button></a></Link></div></div>
        </Container>
      </Section>
    </>
  );
}
