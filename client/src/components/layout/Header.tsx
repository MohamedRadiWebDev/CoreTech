import { useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, Sparkles } from 'lucide-react';
import { navItems } from '@/app/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { useLanguage } from '@/context/LanguageContext';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import LanguageToggle from '@/components/ui/LanguageToggle';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [location] = useLocation();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const links = useMemo(() => navItems.map((item) => ({ ...item, label: t(item.translationKey) })), [t]);

  const isActive = (href: string) => (href === '/' ? location === href : location.startsWith(href));

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav aria-label="Primary" className={cn('flex items-center gap-2', mobile && 'flex-col items-stretch')}>
      {links.map((item) => (
        <Link key={item.href} href={item.href}>
          <a
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              isActive(item.href)
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
              mobile && 'rounded-xl px-4 py-3 text-base',
            )}
          >
            {item.label}
          </a>
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-background/80 px-4 py-3 shadow-lg shadow-slate-950/5 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
          <Link href="/">
            <a className="inline-flex items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-500 text-white shadow-lg shadow-primary/30">
                <Sparkles className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-primary">Core Tech</span>
                <span className="block text-xs text-muted-foreground">Premium digital growth studio</span>
              </span>
            </a>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
            <NavLinks />
          </div>

          <div className="flex items-center gap-2" data-rtl={isRTL}>
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/contact">
              <a className="hidden sm:block">
                <Button className="rounded-full px-5">{t('contact.submit_button')}</Button>
              </a>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side={isRTL ? 'left' : 'right'} className="w-[320px] border-l border-border/60 bg-background/95 p-6 backdrop-blur-xl">
                <SheetTitle className="mb-6 text-left text-lg font-semibold">Core Tech</SheetTitle>
                <div className="space-y-6">
                  <NavLinks mobile />
                  <Link href="/contact">
                    <a className="block"><Button className="w-full rounded-xl">{t('contact.submit_button')}</Button></a>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
