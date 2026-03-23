import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react';

export function LoadingState({ title = 'Loading content', description = 'Preparing an optimized experience for you.' }: { title?: string; description?: string }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-border/60 bg-card/80 p-10 text-center shadow-sm">
      <LoaderCircle className="mb-4 h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function ErrorState({ title = 'Unable to load content', description = 'Please refresh the page or try again shortly.' }: { title?: string; description?: string }) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-10 text-center shadow-sm">
      <AlertTriangle className="mb-4 h-10 w-10 text-destructive" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', description = 'Check back soon for fresh updates.' }: { title?: string; description?: string }) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center">
      <Inbox className="mb-4 h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
