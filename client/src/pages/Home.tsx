import { useEffect } from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import ServiceOverview from "@/components/home/ServiceOverview";
import PortfolioSection from "@/components/home/PortfolioSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";

const Home = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("meta.home_title")} | CoreTech</title>
        <meta name="description" content={t("meta.home_description")} />
      </Helmet>
      
      <main className="pt-20">
        <HeroSection />
        <ServiceOverview />
        <PortfolioSection />
        <TestimonialsSection />
        <BlogSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Home;
