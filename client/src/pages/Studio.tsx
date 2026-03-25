import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Copy, Download, FileUp, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useContentStore } from '@/lib/content/content-store';
import { blogRecordSchema, portfolioRecordSchema, serviceIconKeys, serviceRecordSchema, testimonialRecordSchema } from '@/lib/content/studio-schemas';
import type { BlogPostRecord, PortfolioRecord, ServiceRecord, TestimonialRecord } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Container, PageHero, Section } from '@/components/common/section';
import { SeoHead } from '@/components/seo/SeoHead';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

function splitList(value: string) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

function joinList(values: string[]) {
  return values.join('\n');
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

function downloadJson(fileName: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

type TabKey = 'overview' | 'blog' | 'portfolio' | 'services' | 'testimonials';

export default function StudioPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  const store = useContentStore();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const fileRef = useRef<HTMLInputElement>(null);

  const modifiedCount = useMemo(() => (['blog', 'portfolio', 'services', 'testimonials'] as const).filter((key) => store.hasOverride(key)).length, [store]);

  const handleExport = () => {
    downloadJson(`content-bundle-${new Date().toISOString().slice(0, 10)}.json`, store.exportBundle());
    toast({ title: t('studio.messages.export_success') });
  };

  const handleImport = async (file: File) => {
    const text = await file.text();
    const payload = JSON.parse(text) as unknown;
    store.importBundle(payload);
    toast({ title: t('studio.messages.import_success') });
  };

  return (
    <>
      <SeoHead title={t('studio.meta_title')} description={t('studio.meta_description')} canonicalPath="/studio" robots="noindex,nofollow" />
      <PageHero eyebrow={t('studio.eyebrow')} title={t('studio.title')} description={t('studio.description')} />
      <Section className="pt-0">
        <Container>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <Button onClick={handleExport}><Download className="mr-2 h-4 w-4" />{t('studio.actions.export')}</Button>
            <Button variant="secondary" onClick={() => fileRef.current?.click()}><FileUp className="mr-2 h-4 w-4" />{t('studio.actions.import')}</Button>
            <ConfirmAction
              title={t('studio.actions.reset_all')}
              description={t('studio.confirm_reset_all')}
              confirmLabel={t('studio.actions.confirm')}
              cancelLabel={t('studio.actions.cancel')}
              onConfirm={() => {
                store.resetAll();
                toast({ title: t('studio.messages.reset_success') });
              }}
              trigger={<Button variant="outline"><RotateCcw className="mr-2 h-4 w-4" />{t('studio.actions.reset_all')}</Button>}
            />
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) return;
                try {
                  await handleImport(file);
                } catch (error) {
                  toast({ variant: 'destructive', title: t('studio.messages.import_failed'), description: error instanceof Error ? error.message : undefined });
                }
                event.currentTarget.value = '';
              }}
            />
          </div>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabKey)}>
            <TabsList className="mb-6 grid w-full grid-cols-5">
              <TabsTrigger value="overview">{t('studio.tabs.overview')}</TabsTrigger>
              <TabsTrigger value="blog">{t('studio.tabs.blog')}</TabsTrigger>
              <TabsTrigger value="portfolio">{t('studio.tabs.portfolio')}</TabsTrigger>
              <TabsTrigger value="services">{t('studio.tabs.services')}</TabsTrigger>
              <TabsTrigger value="testimonials">{t('studio.tabs.testimonials')}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard title={t('studio.overview.blog')} value={String(store.collections.blog.length)} />
                <MetricCard title={t('studio.overview.portfolio')} value={String(store.collections.portfolio.length)} />
                <MetricCard title={t('studio.overview.services')} value={String(store.collections.services.length)} />
                <MetricCard title={t('studio.overview.testimonials')} value={String(store.collections.testimonials.length)} />
              </div>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>{t('studio.overview.local_state')}</CardTitle>
                  <CardDescription>{t('studio.overview.local_state_description')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <p>{t('studio.overview.modified_count', { count: String(modifiedCount) })}</p>
                  <p>{store.lastSavedAt ? `${t('studio.overview.last_saved')}: ${new Date(store.lastSavedAt).toLocaleString()}` : t('studio.overview.never_saved')}</p>
                  <p className="rounded-lg border bg-muted/40 p-3">{t('studio.local_notice')}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blog"><BlogEditor /></TabsContent>
            <TabsContent value="portfolio"><PortfolioEditor /></TabsContent>
            <TabsContent value="services"><ServicesEditor /></TabsContent>
            <TabsContent value="testimonials"><TestimonialsEditor /></TabsContent>
          </Tabs>
        </Container>
      </Section>
      <div dir={isRTL ? 'rtl' : 'ltr'} className="sr-only" aria-hidden />
    </>
  );
}

function MetricCard({ title, value }: { title: string; value: string }) {
  return <Card><CardHeader><CardDescription>{title}</CardDescription><CardTitle className="text-3xl">{value}</CardTitle></CardHeader></Card>;
}

function BlogEditor() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const store = useContentStore();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(store.collections.blog[0]?.id ?? '');

  const list = useMemo(() => store.collections.blog.filter((item) => (item.title ?? '').toLowerCase().includes(query.toLowerCase()) || item.slug.includes(query.toLowerCase())), [store.collections.blog, query]);
  const selected = store.collections.blog.find((item) => item.id === selectedId) ?? null;
  const form = useForm<BlogPostRecord>({ resolver: zodResolver(blogRecordSchema), values: selected ?? createBlog() });

  const save = (values: BlogPostRecord) => {
    const next = store.collections.blog.map((item) => item.id === selectedId ? values : item);
    if (!next.some((item) => item.id === selectedId)) next.push(values);
    if (next.some((item) => item.id !== values.id && item.slug === values.slug)) {
      toast({ variant: 'destructive', title: t('studio.validation.unique_slug') });
      return;
    }
    store.setCollection('blog', next);
    setSelectedId(values.id);
    toast({ title: t('studio.messages.save_success') });
  };

  return (
    <CollectionLayout
      title={t('studio.tabs.blog')}
      query={query}
      onQuery={setQuery}
      onNew={() => {
        const item = createBlog();
        store.setCollection('blog', [item, ...store.collections.blog]);
        setSelectedId(item.id);
      }}
      onReset={() => {
        store.resetCollection('blog');
        toast({ title: t('studio.messages.reset_success') });
      }}
      hasOverride={store.hasOverride('blog')}
      list={list.map((item) => ({
        id: item.id,
        title: item.title ?? item.id,
        subtitle: item.slug,
        featured: Boolean(item.featured),
        onSelect: () => setSelectedId(item.id),
        selected: item.id === selectedId,
        onDuplicate: () => {
          const dupe = { ...item, id: `${item.id}-copy-${Date.now()}`, slug: `${item.slug}-copy` };
          store.setCollection('blog', [dupe, ...store.collections.blog]);
          setSelectedId(dupe.id);
        },
        onDelete: () => {
          store.setCollection('blog', store.collections.blog.filter((entry) => entry.id !== item.id));
          if (selectedId === item.id) setSelectedId('');
          toast({ title: t('studio.messages.delete_success') });
        },
      }))}
    >
      {selected ? (
        <form onSubmit={form.handleSubmit(save)} className="space-y-4">
          <Field label={t('studio.fields.id')}><Input {...form.register('id')} /></Field>
          <Field label={t('studio.fields.slug')}><Input {...form.register('slug')} /></Field>
          <Field label={t('studio.fields.title_en')}><Input {...form.register('title')} /></Field>
          <Field label={t('studio.fields.title_ar')}><Input {...form.register('title_ar')} /></Field>
          <Field label={t('studio.fields.excerpt_en')}><Textarea {...form.register('excerpt')} /></Field>
          <Field label={t('studio.fields.excerpt_ar')}><Textarea {...form.register('excerpt_ar')} /></Field>
          <Field label={t('studio.fields.content_en')}><Textarea rows={6} {...form.register('content')} /></Field>
          <Field label={t('studio.fields.content_ar')}><Textarea rows={6} {...form.register('content_ar')} /></Field>
          <Field label={t('studio.fields.category_key')}><Input {...form.register('category')} /></Field>
          <Field label={t('studio.fields.category_ar')}><Input {...form.register('category_ar')} /></Field>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label={t('studio.fields.author_en')}><Input {...form.register('author')} /></Field>
            <Field label={t('studio.fields.author_ar')}><Input {...form.register('author_ar')} /></Field>
            <Field label={t('studio.fields.author_role_en')}><Input {...form.register('authorRole')} /></Field>
            <Field label={t('studio.fields.author_role_ar')}><Input {...form.register('authorRole_ar')} /></Field>
            <Field label={t('studio.fields.author_image')}><Input {...form.register('authorImage')} /></Field>
            <Field label={t('studio.fields.date')}><Input type="date" {...form.register('date')} /></Field>
          </div>
          <Field label={t('studio.fields.image')}><Input {...form.register('image')} /></Field>
          <Field label={t('studio.fields.tags_en')}><Textarea value={joinList(form.watch('tags') ?? [])} onChange={(event) => form.setValue('tags', splitList(event.target.value), { shouldValidate: true })} /></Field>
          <Field label={t('studio.fields.tags_ar')}><Textarea value={joinList(form.watch('tags_ar') ?? [])} onChange={(event) => form.setValue('tags_ar', splitList(event.target.value), { shouldValidate: true })} /></Field>
          <ToggleField label={t('studio.fields.featured')} checked={Boolean(form.watch('featured'))} onCheckedChange={(value) => form.setValue('featured', value)} />
          <FormErrors errors={form.formState.errors as Record<string, unknown>} />
          <Button type="submit"><Save className="mr-2 h-4 w-4" />{t('studio.actions.save')}</Button>
        </form>
      ) : <p className="text-sm text-muted-foreground">{t('studio.empty_select')}</p>}
    </CollectionLayout>
  );
}

function PortfolioEditor() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const store = useContentStore();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(store.collections.portfolio[0]?.id ?? '');
  const list = useMemo(() => store.collections.portfolio.filter((item) => (item.title ?? '').toLowerCase().includes(query.toLowerCase()) || item.slug.includes(query.toLowerCase())), [store.collections.portfolio, query]);
  const selected = store.collections.portfolio.find((item) => item.id === selectedId) ?? null;
  const form = useForm<PortfolioRecord>({ resolver: zodResolver(portfolioRecordSchema), values: selected ?? createPortfolio() });

  const save = (values: PortfolioRecord) => {
    const next = store.collections.portfolio.map((item) => item.id === selectedId ? values : item);
    if (!next.some((item) => item.id === selectedId)) next.push(values);
    if (next.some((item) => item.id !== values.id && item.slug === values.slug)) {
      toast({ variant: 'destructive', title: t('studio.validation.unique_slug') });
      return;
    }
    store.setCollection('portfolio', next);
    setSelectedId(values.id);
    toast({ title: t('studio.messages.save_success') });
  };

  return (
    <CollectionLayout
      title={t('studio.tabs.portfolio')}
      query={query}
      onQuery={setQuery}
      onNew={() => {
        const item = createPortfolio();
        store.setCollection('portfolio', [item, ...store.collections.portfolio]);
        setSelectedId(item.id);
      }}
      onReset={() => {
        store.resetCollection('portfolio');
        toast({ title: t('studio.messages.reset_success') });
      }}
      hasOverride={store.hasOverride('portfolio')}
      list={list.map((item) => ({
        id: item.id,
        title: item.title ?? item.id,
        subtitle: item.slug,
        featured: Boolean(item.featured),
        onSelect: () => setSelectedId(item.id),
        selected: item.id === selectedId,
        onDuplicate: () => {
          const dupe = { ...item, id: `${item.id}-copy-${Date.now()}`, slug: `${item.slug}-copy` };
          store.setCollection('portfolio', [dupe, ...store.collections.portfolio]);
          setSelectedId(dupe.id);
        },
        onDelete: () => {
          store.setCollection('portfolio', store.collections.portfolio.filter((entry) => entry.id !== item.id));
          if (selectedId === item.id) setSelectedId('');
          toast({ title: t('studio.messages.delete_success') });
        },
      }))}
    >
      {selected ? <form onSubmit={form.handleSubmit(save)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('studio.fields.id')}><Input {...form.register('id')} /></Field>
          <Field label={t('studio.fields.slug')}><Input {...form.register('slug')} /></Field>
          <Field label={t('studio.fields.title_en')}><Input {...form.register('title')} /></Field>
          <Field label={t('studio.fields.title_ar')}><Input {...form.register('title_ar')} /></Field>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('studio.fields.category_key')}><Input {...form.register('category')} /></Field>
          <Field label={t('studio.fields.category_ar')}><Input {...form.register('category_ar')} /></Field>
          <Field label={t('studio.fields.category_name_en')}><Input {...form.register('categoryName')} /></Field>
          <Field label={t('studio.fields.category_name_ar')}><Input {...form.register('categoryName_ar')} /></Field>
        </div>
        <Field label={t('studio.fields.image')}><Input {...form.register('image')} /></Field>
        <Field label={t('studio.fields.gallery')}><Textarea value={joinList(form.watch('gallery') ?? [])} onChange={(event) => form.setValue('gallery', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <Field label={t('studio.fields.short_description_en')}><Textarea {...form.register('shortDescription')} /></Field>
        <Field label={t('studio.fields.short_description_ar')}><Textarea {...form.register('shortDescription_ar')} /></Field>
        <Field label={t('studio.fields.full_description_en')}><Textarea rows={5} {...form.register('fullDescription')} /></Field>
        <Field label={t('studio.fields.full_description_ar')}><Textarea rows={5} {...form.register('fullDescription_ar')} /></Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('studio.fields.client_en')}><Input {...form.register('client')} /></Field>
          <Field label={t('studio.fields.client_ar')}><Input {...form.register('client_ar')} /></Field>
          <Field label={t('studio.fields.website')}><Input {...form.register('website')} /></Field>
          <Field label={t('studio.fields.year')}><Input {...form.register('year')} /></Field>
        </div>
        <Field label={t('studio.fields.services_en')}><Textarea value={joinList(form.watch('services') ?? [])} onChange={(event) => form.setValue('services', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <Field label={t('studio.fields.services_ar')}><Textarea value={joinList(form.watch('services_ar') ?? [])} onChange={(event) => form.setValue('services_ar', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <Field label={t('studio.fields.technologies_en')}><Textarea value={joinList(form.watch('technologies') ?? [])} onChange={(event) => form.setValue('technologies', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <Field label={t('studio.fields.technologies_ar')}><Textarea value={joinList(form.watch('technologies_ar') ?? [])} onChange={(event) => form.setValue('technologies_ar', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <div className="grid gap-4 md:grid-cols-3">
          <Field label={t('studio.fields.impact_value')}><Input {...form.register('impact.value')} /></Field>
          <Field label={t('studio.fields.impact_label_en')}><Input {...form.register('impact.label')} /></Field>
          <Field label={t('studio.fields.impact_label_ar')}><Input {...form.register('impact.label_ar')} /></Field>
        </div>
        <ToggleField label={t('studio.fields.featured')} checked={Boolean(form.watch('featured'))} onCheckedChange={(value) => form.setValue('featured', value)} />
        <FormErrors errors={form.formState.errors as Record<string, unknown>} />
        <Button type="submit"><Save className="mr-2 h-4 w-4" />{t('studio.actions.save')}</Button>
      </form> : <p className="text-sm text-muted-foreground">{t('studio.empty_select')}</p>}
    </CollectionLayout>
  );
}

function ServicesEditor() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const store = useContentStore();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(store.collections.services[0]?.id ?? '');
  const list = useMemo(() => store.collections.services.filter((item) => (item.title ?? '').toLowerCase().includes(query.toLowerCase()) || item.slug.includes(query.toLowerCase())), [store.collections.services, query]);
  const selected = store.collections.services.find((item) => item.id === selectedId) ?? null;
  const form = useForm<ServiceRecord>({ resolver: zodResolver(serviceRecordSchema), values: selected ?? createService() });

  const save = (values: ServiceRecord) => {
    const next = store.collections.services.map((item) => item.id === selectedId ? values : item);
    if (!next.some((item) => item.id === selectedId)) next.push(values);
    if (next.some((item) => item.id !== values.id && item.slug === values.slug)) {
      toast({ variant: 'destructive', title: t('studio.validation.unique_slug') });
      return;
    }
    store.setCollection('services', next.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)));
    setSelectedId(values.id);
    toast({ title: t('studio.messages.save_success') });
  };

  return (
    <CollectionLayout
      title={t('studio.tabs.services')}
      query={query}
      onQuery={setQuery}
      onNew={() => {
        const item = createService();
        store.setCollection('services', [item, ...store.collections.services]);
        setSelectedId(item.id);
      }}
      onReset={() => {
        store.resetCollection('services');
        toast({ title: t('studio.messages.reset_success') });
      }}
      hasOverride={store.hasOverride('services')}
      list={list.map((item) => ({
        id: item.id,
        title: item.title ?? item.id,
        subtitle: item.slug,
        featured: Boolean(item.featured),
        onSelect: () => setSelectedId(item.id),
        selected: item.id === selectedId,
        onDuplicate: () => {
          const dupe = { ...item, id: `${item.id}-copy-${Date.now()}`, slug: `${item.slug}-copy` };
          store.setCollection('services', [dupe, ...store.collections.services]);
          setSelectedId(dupe.id);
        },
        onDelete: () => {
          store.setCollection('services', store.collections.services.filter((entry) => entry.id !== item.id));
          if (selectedId === item.id) setSelectedId('');
          toast({ title: t('studio.messages.delete_success') });
        },
      }))}
    >
      {selected ? <form onSubmit={form.handleSubmit(save)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('studio.fields.id')}><Input {...form.register('id')} /></Field>
          <Field label={t('studio.fields.slug')}><Input {...form.register('slug')} /></Field>
          <Field label={t('studio.fields.title_en')}><Input {...form.register('title')} /></Field>
          <Field label={t('studio.fields.title_ar')}><Input {...form.register('title_ar')} /></Field>
        </div>
        <Field label={t('studio.fields.description_en')}><Textarea {...form.register('description')} /></Field>
        <Field label={t('studio.fields.description_ar')}><Textarea {...form.register('description_ar')} /></Field>
        <Field label={t('studio.fields.features_en')}><Textarea value={joinList(form.watch('features') ?? [])} onChange={(event) => form.setValue('features', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <Field label={t('studio.fields.features_ar')}><Textarea value={joinList(form.watch('features_ar') ?? [])} onChange={(event) => form.setValue('features_ar', splitList(event.target.value), { shouldValidate: true })} /></Field>
        <Field label={t('studio.fields.image')}><Input {...form.register('image')} /></Field>
        <Field label={t('studio.fields.icon_key')}>
          <Select value={form.watch('iconKey')} onValueChange={(value) => form.setValue('iconKey', value as ServiceRecord['iconKey'], { shouldValidate: true })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>{serviceIconKeys.map((key) => <SelectItem key={key} value={key}>{key}</SelectItem>)}</SelectContent>
          </Select>
        </Field>
        <Field label={t('studio.fields.order')}><Input type="number" {...form.register('order', { valueAsNumber: true })} /></Field>
        <ToggleField label={t('studio.fields.featured')} checked={Boolean(form.watch('featured'))} onCheckedChange={(value) => form.setValue('featured', value)} />
        <FormErrors errors={form.formState.errors as Record<string, unknown>} />
        <Button type="submit"><Save className="mr-2 h-4 w-4" />{t('studio.actions.save')}</Button>
      </form> : <p className="text-sm text-muted-foreground">{t('studio.empty_select')}</p>}
    </CollectionLayout>
  );
}

function TestimonialsEditor() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const store = useContentStore();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>(store.collections.testimonials[0]?.id ?? '');
  const list = useMemo(() => store.collections.testimonials.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()) || item.company.toLowerCase().includes(query.toLowerCase())), [store.collections.testimonials, query]);
  const selected = store.collections.testimonials.find((item) => item.id === selectedId) ?? null;
  const form = useForm<TestimonialRecord>({ resolver: zodResolver(testimonialRecordSchema), values: selected ?? createTestimonial() });

  const save = (values: TestimonialRecord) => {
    const next = store.collections.testimonials.map((item) => item.id === selectedId ? values : item);
    if (!next.some((item) => item.id === selectedId)) next.push(values);
    store.setCollection('testimonials', next);
    setSelectedId(values.id);
    toast({ title: t('studio.messages.save_success') });
  };

  return (
    <CollectionLayout
      title={t('studio.tabs.testimonials')}
      query={query}
      onQuery={setQuery}
      onNew={() => {
        const item = createTestimonial();
        store.setCollection('testimonials', [item, ...store.collections.testimonials]);
        setSelectedId(item.id);
      }}
      onReset={() => {
        store.resetCollection('testimonials');
        toast({ title: t('studio.messages.reset_success') });
      }}
      hasOverride={store.hasOverride('testimonials')}
      list={list.map((item) => ({
        id: item.id,
        title: item.name,
        subtitle: item.company,
        featured: Boolean(item.featured),
        onSelect: () => setSelectedId(item.id),
        selected: item.id === selectedId,
        onDuplicate: () => {
          const dupe = { ...item, id: `${item.id}-copy-${Date.now()}` };
          store.setCollection('testimonials', [dupe, ...store.collections.testimonials]);
          setSelectedId(dupe.id);
        },
        onDelete: () => {
          store.setCollection('testimonials', store.collections.testimonials.filter((entry) => entry.id !== item.id));
          if (selectedId === item.id) setSelectedId('');
          toast({ title: t('studio.messages.delete_success') });
        },
      }))}
    >
      {selected ? <form onSubmit={form.handleSubmit(save)} className="space-y-4">
        <Field label={t('studio.fields.id')}><Input {...form.register('id')} /></Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('studio.fields.name_en')}><Input {...form.register('name')} /></Field>
          <Field label={t('studio.fields.name_ar')}><Input {...form.register('name_ar')} /></Field>
          <Field label={t('studio.fields.role_en')}><Input {...form.register('role')} /></Field>
          <Field label={t('studio.fields.role_ar')}><Input {...form.register('role_ar')} /></Field>
          <Field label={t('studio.fields.company_en')}><Input {...form.register('company')} /></Field>
          <Field label={t('studio.fields.company_ar')}><Input {...form.register('company_ar')} /></Field>
        </div>
        <Field label={t('studio.fields.image')}><Input {...form.register('image')} /></Field>
        <Field label={t('studio.fields.text_en')}><Textarea rows={4} {...form.register('text')} /></Field>
        <Field label={t('studio.fields.text_ar')}><Textarea rows={4} {...form.register('text_ar')} /></Field>
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('studio.fields.rating')}><Input type="number" step="0.5" min={0} max={5} {...form.register('rating', { valueAsNumber: true })} /></Field>
          <Field label={t('studio.fields.date')}><Input type="date" {...form.register('date')} /></Field>
          <Field label={t('studio.fields.project_id')}><Input {...form.register('projectId')} /></Field>
          <Field label={t('studio.fields.project_name_en')}><Input {...form.register('projectName')} /></Field>
          <Field label={t('studio.fields.project_name_ar')}><Input {...form.register('projectName_ar')} /></Field>
        </div>
        <ToggleField label={t('studio.fields.featured')} checked={Boolean(form.watch('featured'))} onCheckedChange={(value) => form.setValue('featured', value)} />
        <FormErrors errors={form.formState.errors as Record<string, unknown>} />
        <Button type="submit"><Save className="mr-2 h-4 w-4" />{t('studio.actions.save')}</Button>
      </form> : <p className="text-sm text-muted-foreground">{t('studio.empty_select')}</p>}
    </CollectionLayout>
  );
}

function CollectionLayout({
  title,
  query,
  onQuery,
  onNew,
  onReset,
  hasOverride,
  list,
  children,
}: {
  title: string;
  query: string;
  onQuery: (value: string) => void;
  onNew: () => void;
  onReset: () => void;
  hasOverride: boolean;
  list: Array<{
    id: string;
    title: string;
    subtitle: string;
    featured: boolean;
    selected: boolean;
    onSelect: () => void;
    onDuplicate: () => void;
    onDelete: () => void;
  }>;
  children: React.ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <div className="grid gap-6 lg:grid-cols-[320px,1fr]">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{t('studio.search_hint')}</CardDescription>
          <div className="flex gap-2">
            <Button size="sm" onClick={onNew}><Plus className="mr-1 h-4 w-4" />{t('studio.actions.new')}</Button>
            <ConfirmAction
              title={t('studio.actions.reset_collection')}
              description={t('studio.confirm_reset_collection')}
              confirmLabel={t('studio.actions.confirm')}
              cancelLabel={t('studio.actions.cancel')}
              onConfirm={onReset}
              trigger={<Button size="sm" variant="outline" disabled={!hasOverride}><RotateCcw className="mr-1 h-4 w-4" />{t('studio.actions.reset_collection')}</Button>}
            />
          </div>
          <Input value={query} onChange={(event) => onQuery(event.target.value)} placeholder={t('studio.search_placeholder')} />
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[65vh] pr-2">
            <div className="space-y-2">
              {list.map((item) => (
                <button key={item.id} className={`w-full rounded-lg border p-3 text-left transition ${item.selected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'}`} onClick={item.onSelect}>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{item.title}</p>
                    {item.featured ? <Badge variant="secondary">{t('studio.badges.featured')}</Badge> : null}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.subtitle}</p>
                  <Separator className="my-2" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" type="button" onClick={(event) => { event.stopPropagation(); item.onDuplicate(); }}><Copy className="h-4 w-4" /></Button>
                    <ConfirmAction
                      title={t('studio.actions.delete')}
                      description={t('studio.confirm_delete')}
                      confirmLabel={t('studio.actions.confirm')}
                      cancelLabel={t('studio.actions.cancel')}
                      onConfirm={item.onDelete}
                      trigger={<Button size="sm" variant="ghost" type="button" onClick={(event) => event.stopPropagation()}><Trash2 className="h-4 w-4" /></Button>}
                    />
                  </div>
                </button>
              ))}
              {list.length === 0 ? <p className="text-sm text-muted-foreground">{t('studio.empty_list')}</p> : null}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{t('studio.editor')}</CardTitle>
          <CardDescription>{t('studio.editor_description')}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}

function ConfirmAction({
  title,
  description,
  confirmLabel,
  cancelLabel,
  onConfirm,
  trigger,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  trigger: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}</Label>{children}</div>;
}

function ToggleField({ label, checked, onCheckedChange }: { label: string; checked: boolean; onCheckedChange: (value: boolean) => void }) {
  return <div className="flex items-center justify-between rounded-lg border p-3"><Label>{label}</Label><Switch checked={checked} onCheckedChange={onCheckedChange} /></div>;
}

function FormErrors({ errors }: { errors: Record<string, unknown> }) {
  const entries = Object.entries(errors);
  if (!entries.length) return null;
  return <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">{entries.map(([key, value]) => <p key={key}>{key}: {String((value as { message?: string }).message ?? 'invalid')}</p>)}</div>;
}

function createBlog(): BlogPostRecord {
  const stamp = Date.now();
  const slug = `new-blog-${stamp}`;
  return {
    id: slug,
    slug,
    title: 'New post',
    title_ar: 'مقال جديد',
    excerpt: 'Short summary',
    excerpt_ar: 'ملخص قصير',
    content: '<p>Write content...</p>',
    content_ar: '<p>اكتب المحتوى...</p>',
    category: 'general',
    category_ar: 'عام',
    author: 'Author',
    author_ar: 'الكاتب',
    authorRole: 'Editor',
    authorRole_ar: 'المحرر',
    authorImage: '/images/placeholder-avatar.png',
    date: new Date().toISOString().slice(0, 10),
    image: '/images/placeholder.jpg',
    tags: ['general'],
    tags_ar: ['عام'],
    featured: false,
  };
}

function createPortfolio(): PortfolioRecord {
  const stamp = Date.now();
  const slug = `new-project-${stamp}`;
  return {
    id: slug,
    slug,
    title: 'New project',
    title_ar: 'مشروع جديد',
    category: 'web-design',
    category_ar: 'تجارب الويب',
    categoryName: 'Web experiences',
    categoryName_ar: 'تجارب الويب',
    image: '/images/placeholder.jpg',
    gallery: ['/images/placeholder.jpg'],
    shortDescription: 'Project short description',
    shortDescription_ar: 'وصف قصير للمشروع',
    fullDescription: 'Project detailed description',
    fullDescription_ar: 'وصف تفصيلي للمشروع',
    client: 'Client name',
    client_ar: 'اسم العميل',
    website: 'https://example.com',
    year: String(new Date().getFullYear()),
    services: ['Website design'],
    services_ar: ['تصميم موقع'],
    technologies: ['React'],
    technologies_ar: ['ريأكت'],
    impact: { value: '0%', label: 'growth', label_ar: 'نمو' },
    featured: false,
  };
}

function createService(): ServiceRecord {
  const stamp = Date.now();
  const slug = `new-service-${stamp}`;
  return {
    id: slugify(slug),
    slug: slugify(slug),
    title: 'New service',
    title_ar: 'خدمة جديدة',
    description: 'Service description',
    description_ar: 'وصف الخدمة',
    features: ['Feature'],
    features_ar: ['ميزة'],
    image: '/images/placeholder.jpg',
    iconKey: 'monitor',
    featured: false,
    order: 999,
  };
}

function createTestimonial(): TestimonialRecord {
  const stamp = Date.now();
  const id = `testimonial-${stamp}`;
  return {
    id: slugify(id),
    name: 'Client name',
    name_ar: 'اسم العميل',
    role: 'Role',
    role_ar: 'المنصب',
    company: 'Company',
    company_ar: 'الشركة',
    image: '/images/placeholder-avatar.png',
    text: 'Great experience working with the team.',
    text_ar: 'تجربة رائعة في العمل مع الفريق.',
    rating: 5,
    date: new Date().toISOString().slice(0, 10),
    projectId: '',
    projectName: '',
    projectName_ar: '',
    featured: false,
  };
}
