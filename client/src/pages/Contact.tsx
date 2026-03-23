import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Container, PageHero, Section } from '@/components/common/section';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { useServiceOptions, useSiteConfig, useSocialLinks } from '@/hooks/use-site-data';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { SocialIconLinks } from '@/components/common/social-icons';

export default function Contact() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { data: serviceOptions } = useServiceOptions();
  const { data: siteConfig } = useSiteConfig();
  const { data: socialLinks } = useSocialLinks();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });

  return (
    <>
      <SeoHead title={t('meta.contact_title')} description={t('meta.contact_description')} canonicalPath="/contact" jsonLd={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }])} />
      <PageHero eyebrow="Contact" title={t('contact_page.title')} description={t('contact_page.subtitle')} />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr,0.9fr]">
            <section className="rounded-[2rem] border border-border/60 bg-card p-8 shadow-sm">
              <h2 className="text-2xl font-semibold">{t('contact.form_title')}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">Tell us about your goals, timeline, and current challenges. We’ll respond with a tailored direction.</p>
              {submitted ? <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-700 dark:text-emerald-300"><strong>{t('contact.success_title')}</strong><p className="mt-1 text-sm">{t('contact.success_message')}</p></div> : null}
              <form className="mt-6 space-y-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 5000); setFormData({ name: '', email: '', service: '', message: '' }); }}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2"><label htmlFor="name" className="text-sm font-medium">{t('contact.name_label')}</label><Input id="name" value={formData.name} onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))} placeholder={t('contact.name_placeholder')} required /></div>
                  <div className="space-y-2"><label htmlFor="email" className="text-sm font-medium">{t('contact.email_label')}</label><Input id="email" type="email" value={formData.email} onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))} placeholder={t('contact.email_placeholder')} required /></div>
                </div>
                <div className="space-y-2"><label htmlFor="service" className="text-sm font-medium">{t('contact.service_label')}</label><select id="service" value={formData.service} onChange={(e) => setFormData((prev) => ({ ...prev, service: e.target.value }))} className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"><option value="">{t('contact.service_placeholder')}</option>{serviceOptions?.map((service) => <option key={service.id} value={service.id}>{isRTL ? service.name_ar : service.name}</option>)}</select></div>
                <div className="space-y-2"><label htmlFor="message" className="text-sm font-medium">{t('contact.message_label')}</label><Textarea id="message" rows={6} value={formData.message} onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))} placeholder={t('contact.message_placeholder')} required /></div>
                <Button type="submit" size="lg" className="rounded-full px-7">{t('contact.submit_button')}</Button>
              </form>
            </section>
            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950 p-8 text-white shadow-sm">
                <h2 className="text-2xl font-semibold">{t('contact.get_in_touch')}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">{t('contact.get_in_touch_description')}</p>
                <div className="mt-8 space-y-5 text-sm">
                  <a href={`mailto:${siteConfig?.company.email}`} className="flex items-start gap-3 text-slate-200"><Mail className="mt-0.5 h-4 w-4 text-primary" />{siteConfig?.company.email}</a>
                  <a href={`tel:${siteConfig?.company.phone}`} className="flex items-start gap-3 text-slate-200"><Phone className="mt-0.5 h-4 w-4 text-primary" />{siteConfig?.company.phone}</a>
                  <p className="flex items-start gap-3 text-slate-200"><MapPin className="mt-0.5 h-4 w-4 text-primary" />{siteConfig?.company.address}</p>
                </div>
                <div className="mt-8"><SocialIconLinks links={socialLinks} /></div>
              </div>
              <div className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 p-8 shadow-sm">
                <div className="flex items-start gap-4"><div className="rounded-full bg-emerald-500 p-3 text-white"><MessageCircle className="h-5 w-5" /></div><div><h3 className="text-xl font-semibold">{t('contact.whatsapp_title')}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{t('contact.whatsapp_description')}</p><a href={socialLinks?.whatsapp ?? 'https://wa.me/966123456789'} className="mt-4 inline-flex items-center font-medium text-emerald-700 dark:text-emerald-300">{t('contact.whatsapp_button')}</a></div></div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
