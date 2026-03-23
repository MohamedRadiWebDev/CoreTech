import { useMemo, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Container, PageHero, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { breadcrumbSchema } from '@/lib/seo';
import { useBlogPosts } from '@/hooks/use-site-data';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export default function Blog() {
  const { t } = useTranslation();
  const posts = useBlogPosts();
  const [category, setCategory] = useState<string>('all');
  const categories = useMemo(() => ['all', ...Array.from(new Set((posts.data ?? []).map((post) => post.category)))], [posts.data]);
  const filtered = useMemo(() => category === 'all' ? posts.data ?? [] : (posts.data ?? []).filter((post) => post.category === category), [posts.data, category]);
  return (
    <>
      <SeoHead title={t('meta.blog_title')} description={t('meta.blog_description')} canonicalPath="/blog" jsonLd={breadcrumbSchema([{ name: t('nav.home'), path: '/' }, { name: t('nav.blog'), path: '/blog' }])} />
      <PageHero eyebrow={t('blog_page.eyebrow')} title={t('blog_page.title')} description={t('blog_page.description')} />
      <Section><Container><div className="flex flex-wrap gap-3">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={cn('rounded-full border px-5 py-2 text-sm font-medium transition', item === category ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:text-foreground')}>{item === 'all' ? t('blog_page.all_categories') : item}</button>)}</div>{posts.isLoading ? <div className="mt-10"><LoadingState /></div> : posts.isError ? <div className="mt-10"><ErrorState /></div> : filtered.length === 0 ? <div className="mt-10"><EmptyState title={t('blog_page.empty_title')} description={t('blog_page.empty_description')} /></div> : <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{filtered.map((post) => <article key={post.id} className="overflow-hidden rounded-[1.75rem] border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={post.image} alt={post.title} className="h-56 w-full object-cover" loading="lazy" decoding="async" /><div className="p-6"><p className="text-sm text-primary">{post.category}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{post.excerpt}</p><div className="mt-5 flex items-center justify-between text-sm text-muted-foreground"><span>{post.author}</span><span>{post.date}</span></div><Link href={`/blog/${post.slug}`}><a className="mt-5 inline-flex items-center gap-2 font-medium text-primary">{t('common.actions.read_article')} <ArrowRight className="h-4 w-4" /></a></Link></div></article>)}</div>}</Container></Section>
    </>
  );
}
