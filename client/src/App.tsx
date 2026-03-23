import { Suspense, lazy } from 'react';
import { Route, Switch } from 'wouter';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import SkipLink from '@/components/ui/SkipLink';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useRouteScroll } from '@/hooks/use-route-scroll';

const Home = lazy(() => import('@/pages/Home'));
const Services = lazy(() => import('@/pages/Services'));
const Portfolio = lazy(() => import('@/pages/Portfolio'));
const PortfolioDetail = lazy(() => import('@/pages/PortfolioDetail'));
const Testimonials = lazy(() => import('@/pages/Testimonials'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPostDetail = lazy(() => import('@/pages/BlogPostDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/not-found'));

function AppShell() {
  useRouteScroll();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <Header />
      <main id="main-content" className="flex min-h-screen flex-col">
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><LoadingSpinner size="lg" /></div>}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/portfolio/:id" component={PortfolioDetail} />
            <Route path="/testimonials" component={Testimonials} />
            <Route path="/blog" component={Blog} />
            <Route path="/blog/:id" component={BlogPostDetail} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AppShell />
          </TooltipProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
