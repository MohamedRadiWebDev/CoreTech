import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

const HeroSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <section 
      id="home" 
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-20 sm:py-32 overflow-hidden transition-colors duration-300"
      data-rtl={isRTL}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 top-20 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
        <div className="absolute left-20 bottom-20 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2"></div>
        <div className="absolute left-32 top-40 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div 
            className="animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="block mb-2">{t("hero.title_1")}</span>
              <span className="gradient-text">{t("hero.title_2")}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
              {t("hero.description")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/services">
                <a className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  {t("hero.services_button")}
                </a>
              </Link>
              <Link href="/contact">
                <a className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                  {t("hero.contact_button")}
                </a>
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className="relative hidden md:block animate-on-scroll"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Digital marketing team working" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-900/70 to-transparent p-6">
                <div className="text-white">
                  <p className="font-bold text-lg mb-1">{t("hero.trusted_by")}</p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="font-bold text-2xl">40+</span>
                      <span className="ml-2 text-sm">{t("hero.projects")}<br/>{t("hero.completed")}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-2xl">25+</span>
                      <span className="ml-2 text-sm">{t("hero.happy")}<br/>{t("hero.clients")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
