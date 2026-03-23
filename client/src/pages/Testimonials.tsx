import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Container, PageHero, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { useTestimonials } from '@/hooks/use-site-data';
import { useTranslation } from '@/hooks/useTranslation';

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = useTestimonials();

  return (
    <>
      <SeoHead title={t('meta.testimonials_title')} description={t('meta.testimonials_description')} canonicalPath="/testimonials" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Testimonials', path: '/testimonials' }])} />
      <PageHero eyebrow="Testimonials" title={t('testimonials_page.title')} description={t('testimonials_page.description')} />
      <Section>
        <Container>
          {testimonials.isLoading ? <LoadingState /> : testimonials.isError ? <ErrorState /> : !(testimonials.data?.length) ? <EmptyState title="No testimonials available" /> : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {testimonials.data.map((item) => (
                <article key={item.id} className="rounded-[1.75rem] border border-border/60 bg-card p-7 shadow-sm">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="h-14 w-14 rounded-full object-cover" loading="lazy" decoding="async" />
                    <div><h2 className="font-semibold">{item.name}</h2><p className="text-sm text-muted-foreground">{item.role}</p></div>
                  </div>
                  <p className="mt-6 text-sm leading-7 text-muted-foreground">“{item.text}”</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground"><span>{item.date}</span><span>{item.rating}/5</span></div>
                </article>
              ))}
            </div>
          )}
          <div className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">{t('testimonials_page.cta_title')}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{t('testimonials_page.cta_description')}</p>
            <div className="mt-6 flex flex-wrap gap-4"><Link href="/contact"><a><Button>{t('testimonials_page.cta_button')}</Button></a></Link><Link href="/portfolio"><a><Button variant="secondary">{t('testimonials_page.view_portfolio')}</Button></a></Link></div>
          </div>
        </Container>
      </Section>
    </>
  );
}
