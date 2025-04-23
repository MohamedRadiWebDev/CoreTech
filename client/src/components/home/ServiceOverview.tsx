import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Service } from "@/types";

const ServiceOverview = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Load services from JSON file
    fetch('/src/data/services.json')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error loading services:', error));
  }, []);

  // Container and item animations
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
    <section 
      id="services" 
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      data-rtl={isRTL}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 animate-on-scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("services.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("services.description")}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.length > 0 ? (
            services.map((service, index) => (
              <motion.div 
                key={service.id}
                className="service-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="h-20 w-20 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-all duration-300 hover:shadow-xl hover:rotate-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 drop-shadow-md" strokeWidth="2" stroke="#0A2540" fill="none" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: service.icon }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>
                <Link href={`/services#${service.id}`}>
                  <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                    {t("services.learn_more")}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </Link>
              </motion.div>
            ))
          ) : (
            // Fallback services if JSON fails to load
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div 
                key={index}
                className="service-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300"
                variants={itemVariants}
              >
                <div className="h-16 w-16 bg-gradient-to-br from-primary-400 to-primary-600 dark:from-primary-600 dark:to-primary-800 rounded-lg flex items-center justify-center mb-6 shadow-md transform hover:scale-105 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">{t(`services.service${index + 1}_title`)}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {t(`services.service${index + 1}_description`)}
                </p>
                <Link href={`/services#service${index + 1}`}>
                  <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                    {t("services.learn_more")}
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="text-center mt-16">
          <Link href="/contact">
            <a className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {t("services.discuss_project")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceOverview;
