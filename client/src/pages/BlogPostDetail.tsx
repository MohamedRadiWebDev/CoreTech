import { Link, useRoute } from 'wouter';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Container, Section } from '@/components/common/section';
import { EmptyState, ErrorState, LoadingState } from '@/components/common/states';
import { SeoHead } from '@/components/seo/SeoHead';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import { useBlogPost } from '@/hooks/use-site-data';
import { renderRichText } from '@/lib/content';
import { useLanguage } from '@/context/LanguageContext';

export default function BlogPostDetail() {
  const [, params] = useRoute('/blog/:id');
  const { isRTL } = useLanguage();
  const blog = useBlogPost(params?.id);

  if (blog.isLoading) return <div className="pt-32 px-4"><LoadingState title="Loading article" description="Preparing insights and metadata." /></div>;
  if (blog.isError) return <div className="pt-32 px-4"><ErrorState title="Unable to load article" /></div>;
  if (!blog.post) return <div className="pt-32 px-4"><EmptyState title="Article not found" description="The article may have moved or no longer exists." /></div>;

  const post = blog.post;
  const path = `/blog/${post.id}`;
  return (
    <>
      <SeoHead
        title={post.title}
        description={post.excerpt}
        canonicalPath={path}
        type="article"
        image={post.image}
        jsonLd={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path }]),
          articleSchema({ title: post.title, description: post.excerpt, image: post.image, datePublished: post.date, author: post.author, path }),
        ]}
      />
      <Section className="pt-32 pb-16">
        <Container className="max-w-4xl">
          <Link href="/blog"><a className="inline-flex items-center gap-2 text-sm font-medium text-primary">{isRTL ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />} Back to blog</a></Link>
          <article className="mt-6 overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-sm">
            <img src={post.image} alt={post.title} className="h-[340px] w-full object-cover sm:h-[420px]" decoding="async" />
            <div className="p-6 sm:p-10">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{post.category}</p>
              <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{post.title}</h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-3"><img src={post.authorImage} alt={post.author} className="h-10 w-10 rounded-full object-cover" loading="lazy" decoding="async" /><span>{post.author} · {post.authorRole}</span></div>
                <span>{post.date}</span>
              </div>
              <div className="prose prose-slate mt-10 max-w-none dark:prose-invert">{renderRichText(post.content)}</div>
              <div className="mt-10 flex flex-wrap gap-2">{post.tags.map((tag) => <span key={tag} className="rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">#{tag}</span>)}</div>
            </div>
          </article>
          {blog.related.length ? <div className="mt-12"><h2 className="text-2xl font-semibold">Related insights</h2><div className="mt-6 grid gap-6 md:grid-cols-3">{blog.related.map((item) => <Link key={item.id} href={`/blog/${item.id}`}><a className="rounded-[1.5rem] border border-border/60 bg-card p-4 shadow-sm transition hover:-translate-y-1"><img src={item.image} alt={item.title} className="h-36 w-full rounded-2xl object-cover" loading="lazy" decoding="async" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p></a></Link>)}</div></div> : null}
        </Container>
      </Section>
    </>
  );
}
