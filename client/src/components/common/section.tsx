import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function Section({ children, className, id }: PropsWithChildren<{ className?: string; id?: string }>) {
  return <section id={id} className={cn('py-16 sm:py-20 lg:py-24', className)}>{children}</section>;
}

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('max-w-3xl space-y-4', align === 'center' && 'mx-auto text-center')}>
      {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">{eyebrow}</p> : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="text-pretty text-base leading-7 text-muted-foreground sm:text-lg">{description}</p> : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PropsWithChildren<{ eyebrow?: string; title: string; description: string }>) {
  return (
    <Section className="pt-32 pb-14 sm:pt-36 lg:pt-40">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-primary/10 sm:px-10 lg:px-14 lg:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_35%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.18),transparent_30%)]" />
          <div className="relative max-w-3xl space-y-5">
            {eyebrow ? <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/80">{eyebrow}</p> : null}
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="text-lg leading-8 text-slate-300">{description}</p>
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
