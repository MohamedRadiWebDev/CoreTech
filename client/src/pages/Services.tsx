import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";
import { Service } from "@/types";
import { Link } from "wouter";

const Services = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Load services data
    fetch('/src/data/services.json')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error loading services:', error));
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("meta.services_title")} | MBM Digital</title>
        <meta name="description" content={t("meta.services_description")} />
      </Helmet>
      
      <main className="pt-32 pb-20 min-h-screen" data-rtl={isRTL}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("services_page.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("services_page.description")}
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
          >
            {services.length > 0 ? (
              services.map((service, index) => (
                <motion.div 
                  key={service.id}
                  id={service.id}
                  variants={itemVariants}
                  className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
                >
                  <div className="md:w-1/2">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="rounded-xl shadow-lg w-full h-auto"
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="h-16 w-16 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-6">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 dark:text-primary-400" dangerouslySetInnerHTML={{ __html: service.icon }} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {service.description}
                    </p>
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4">{t("services_page.what_we_offer")}:</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start">
                            <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-3 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/contact">
                        <a className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                          {t("services_page.request_service")}
                        </a>
                      </Link>
                      <Link href={`/portfolio?filter=${service.id}`}>
                        <a className="px-6 py-3 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                          {t("services_page.see_work")}
                        </a>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{t("services_page.loading")}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("services_page.loading_message")}
                </p>
              </div>
            )}
          </motion.div>
          
          <div className="mt-20 bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("services_page.cta_title")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              {t("services_page.cta_description")}
            </p>
            <Link href="/contact">
              <a className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {t("services_page.cta_button")}
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Services;
