import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { SeoHead } from '@/components/seo/SeoHead';

export default function NotFound() {
  return (
    <>
      <SeoHead title="Page not found" description="The page you requested could not be found." robots="noindex,nofollow" canonicalPath="/404" />
      <div className="flex min-h-screen items-center justify-center px-4 pt-24">
        <div className="max-w-lg rounded-[2rem] border border-border/60 bg-card p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">404</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">This page doesn’t exist.</h1>
          <p className="mt-4 text-muted-foreground">The route may have changed, the content may have moved, or the URL may be incorrect.</p>
          <Link href="/"><a className="mt-8 inline-block"><Button className="rounded-full px-7">Back to home</Button></a></Link>
        </div>
      </div>
    </>
  );
}
