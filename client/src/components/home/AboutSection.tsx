import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";

const AboutSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();

  return (
    <section 
      id="about" 
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      data-rtl={isRTL}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="animate-on-scroll"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Core Tech Team" 
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </motion.div>
          
          <motion.div 
            className="animate-on-scroll"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.title")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t("about.description_1")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {t("about.description_2")}
            </p>
            
            <h3 className="text-xl font-bold mb-4">{t("about.mission_title")}</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              {t("about.mission_description")}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">100+</div>
                <div className="text-gray-600 dark:text-gray-400 text-center">{t("about.projects_completed")}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">92%</div>
                <div className="text-gray-600 dark:text-gray-400 text-center">{t("about.client_satisfaction")}</div>
              </div>
            </div>
            
            <Link href="/contact">
              <a className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {t("about.contact_button")}
              </a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
