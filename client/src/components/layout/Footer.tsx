import { Link } from 'wouter';
import { navItems } from '@/app/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useSiteConfig, useSocialLinks, useServices } from '@/hooks/use-site-data';
import { Container } from '@/components/common/section';
import { SocialIconLinks } from '@/components/common/social-icons';

const Footer = () => {
  const { t } = useTranslation();
  const { data: siteConfig } = useSiteConfig();
  const { data: socialLinks } = useSocialLinks();
  const { data: services } = useServices();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-100">
      <Container className="py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr,1fr]">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">{t('common.company_name')}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{siteConfig?.company.tagline}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-300">{t('footer.description')}</p>
            <div className="grid gap-2 text-sm text-slate-300">
              <a href={`mailto:${siteConfig?.company.email}`} className="hover:text-white">{siteConfig?.company.email}</a>
              <a href={`tel:${siteConfig?.company.phone}`} className="hover:text-white">{siteConfig?.company.phone}</a>
              <p>{siteConfig?.company.address}</p>
            </div>
            <SocialIconLinks links={socialLinks} />
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{t('footer.explore')}</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">{navItems.map((item) => <li key={item.href}><Link href={item.href}><a className="hover:text-white">{t(item.translationKey)}</a></Link></li>)}</ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{t('footer.services')}</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">{services?.slice(0, 6).map((service) => <li key={service.id}><Link href={`/services#${service.id}`}><a className="hover:text-white">{service.title}</a></Link></li>)}</ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {t('common.company_name')}. {t('footer.rights')}</p>
          <div className="flex flex-wrap gap-4"><span>{t('footer.privacy_policy')}</span><span>{t('footer.terms_of_service')}</span><span>{t('footer.sitemap')}</span></div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
