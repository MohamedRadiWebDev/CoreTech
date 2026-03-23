import teamImage from '@assets/stock_images/professional_tech_te_94bc93e3.jpg';
import portrait1 from '@assets/stock_images/professional_busines_6b734d32.jpg';
import portrait2 from '@assets/stock_images/professional_busines_4baa14f6.jpg';
import portrait3 from '@assets/stock_images/professional_busines_8a8f9418.jpg';
import portrait4 from '@assets/stock_images/professional_busines_18064b64.jpg';
import { PageHero, Container, Section, SectionHeader } from '@/components/common/section';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { useTranslation } from '@/hooks/useTranslation';

const team = [portrait1, portrait2, portrait3, portrait4];
const memberKeys = ['m1', 'm2', 'm3', 'm4'] as const;

export default function About() {
  const { t } = useTranslation();
  return (
    <>
      <SeoHead title={t('meta.about_title')} description={t('meta.about_description')} canonicalPath="/about" jsonLd={breadcrumbSchema([{ name: t('nav.home'), path: '/' }, { name: t('nav.about'), path: '/about' }])} />
      <PageHero eyebrow={t('about_page.eyebrow')} title={t('about_page.title')} description={t('about_page.subtitle')} />
      <Section><Container><div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-center"><div><SectionHeader eyebrow={t('about_page.story.eyebrow')} title={t('about_page.story.title')} description={t('about_page.story.paragraph_1')} /><div className="mt-6 space-y-4 text-base leading-8 text-muted-foreground"><p>{t('about_page.story.paragraph_2')}</p><p>{t('about_page.story.paragraph_3')}</p></div></div><img src={teamImage} alt={t('about_page.title')} className="w-full rounded-[2rem] object-cover shadow-xl" decoding="async" /></div></Container></Section>
      <Section className="bg-muted/40"><Container><div className="grid gap-6 lg:grid-cols-2"><article className="rounded-[1.75rem] border border-border/60 bg-card p-8 shadow-sm"><h2 className="text-2xl font-semibold">{t('about_page.mission.title')}</h2><p className="mt-4 text-base leading-8 text-muted-foreground">{t('about_page.mission.description')}</p></article><article className="rounded-[1.75rem] border border-border/60 bg-card p-8 shadow-sm"><h2 className="text-2xl font-semibold">{t('about_page.vision.title')}</h2><p className="mt-4 text-base leading-8 text-muted-foreground">{t('about_page.vision.description')}</p></article></div></Container></Section>
      <Section><Container><SectionHeader eyebrow={t('about_page.team.eyebrow')} title={t('about_page.team.title')} description={t('about_page.team.description')} align="center" /><div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">{team.map((image, index) => { const key = memberKeys[index]; return <article key={key} className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm"><img src={image} alt={t(`about_page.team.members.${key}.name`)} className="h-72 w-full object-cover" loading="lazy" decoding="async" /><div className="p-6"><h3 className="text-xl font-semibold">{t(`about_page.team.members.${key}.name`)}</h3><p className="mt-1 text-sm text-primary">{t(`about_page.team.members.${key}.role`)}</p><p className="mt-4 text-sm leading-7 text-muted-foreground">{t(`about_page.team.members.${key}.bio`)}</p></div></article>; })}</div></Container></Section>
    </>
  );
}
