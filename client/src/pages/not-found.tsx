import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { SeoHead } from '@/components/seo/SeoHead';
import { useTranslation } from '@/hooks/useTranslation';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <SeoHead title={t('meta.not_found_title')} description={t('meta.not_found_description')} robots="noindex,nofollow" canonicalPath="/404" />
      <div className="flex min-h-screen items-center justify-center px-4 pt-24"><div className="max-w-lg rounded-[2rem] border border-border/60 bg-card p-10 text-center shadow-sm"><p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{t('not_found.eyebrow')}</p><h1 className="mt-4 text-4xl font-semibold tracking-tight">{t('not_found.title')}</h1><p className="mt-4 text-muted-foreground">{t('not_found.description')}</p><Link href="/"><a className="mt-8 inline-block"><Button className="rounded-full px-7">{t('not_found.button')}</Button></a></Link></div></div>
    </>
  );
}
