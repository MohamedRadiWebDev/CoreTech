
import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 dark:from-primary/5 dark:via-primary/2 dark:to-primary/5"
      data-rtl={isRTL}
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
          >
            {t("home.hero_title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400"
          >
            {t("home.hero_subtitle")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-x-4"
          >
            <Link href="/services">
              <Button size="lg" className="bg-primary text-primary-foreground">
                {t("home.hero_cta")}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
