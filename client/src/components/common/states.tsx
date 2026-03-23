import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export function LoadingState({ title, description }: { title?: string; description?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-border/60 bg-card/80 p-10 text-center shadow-sm">
      <LoaderCircle className="mb-4 h-10 w-10 animate-spin text-primary" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title ?? t('common.states.loading_title')}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description ?? t('common.states.loading_description')}</p>
    </div>
  );
}

export function ErrorState({ title, description }: { title?: string; description?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-3xl border border-destructive/20 bg-destructive/5 p-10 text-center shadow-sm">
      <AlertTriangle className="mb-4 h-10 w-10 text-destructive" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title ?? t('common.states.error_title')}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description ?? t('common.states.error_description')}</p>
    </div>
  );
}

export function EmptyState({ title, description }: { title?: string; description?: string }) {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 p-10 text-center">
      <Inbox className="mb-4 h-10 w-10 text-muted-foreground" aria-hidden="true" />
      <h2 className="text-xl font-semibold">{title ?? t('common.states.empty_title')}</h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description ?? t('common.states.empty_description')}</p>
    </div>
  );
}
