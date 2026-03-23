import { ArrowRight, CheckCircle2, MonitorSmartphone, Rocket, Video } from 'lucide-react';
import { Link } from 'wouter';
import { PageHero, Container, Section, SectionHeader } from '@/components/common/section';
import { ErrorState, LoadingState } from '@/components/common/states';
import { Stagger, StaggerItem } from '@/components/motion/reveal';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { useServices } from '@/hooks/use-site-data';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';

const icons = [MonitorSmartphone, Rocket, Video];

export default function Services() {
  const { t } = useTranslation();
  const services = useServices();

  return (
    <>
      <SeoHead title={t('meta.services_title')} description={t('meta.services_description')} canonicalPath="/services" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }])} />
      <PageHero eyebrow="Services" title={t('services_page.title')} description={t('services_page.description')}>
        <div className="flex flex-wrap gap-4">
          <Link href="/contact"><a><Button className="rounded-full">{t('services_page.cta_button')}</Button></a></Link>
          <Link href="/portfolio"><a><Button variant="secondary" className="rounded-full">See proof</Button></a></Link>
        </div>
      </PageHero>
      <Section>
        <Container>
          <SectionHeader eyebrow="Delivery model" title="Flexible service lines grounded in strategy, craft, and measurable outcomes." description="Each offering is packaged with a premium process: discovery, concepting, execution, launch support, and iteration." />
          {services.isLoading ? <LoadingState /> : services.isError ? <ErrorState /> : (
            <Stagger className="mt-12 space-y-8">
              {services.data?.map((service, index) => {
                const Icon = icons[index % icons.length];
                return (
                  <StaggerItem key={service.id}>
                    <article id={service.id} className="grid gap-8 overflow-hidden rounded-[2rem] border border-border/60 bg-card p-6 shadow-sm lg:grid-cols-[0.95fr,1.05fr] lg:p-8">
                      <img src={service.image} alt={service.title} className="h-full min-h-[260px] w-full rounded-[1.5rem] object-cover" loading="lazy" decoding="async" />
                      <div className="flex flex-col justify-center">
                        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><Icon className="h-6 w-6" /></div>
                        <h2 className="mt-5 text-3xl font-semibold tracking-tight">{service.title}</h2>
                        <p className="mt-4 text-base leading-8 text-muted-foreground">{service.description}</p>
                        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                          {service.features.map((feature) => <li key={feature} className="flex gap-3 rounded-2xl bg-muted/50 p-4 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />{feature}</li>)}
                        </ul>
                        <div className="mt-8 flex flex-wrap gap-4">
                          <Link href="/contact"><a><Button className="rounded-full">{t('services_page.request_service')}</Button></a></Link>
                          <Link href={`/portfolio?filter=${service.id}`}><a className="inline-flex items-center gap-2 font-medium text-primary">{t('services_page.see_work')} <ArrowRight className="h-4 w-4" /></a></Link>
                        </div>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}
        </Container>
      </Section>
    </>
  );
}
