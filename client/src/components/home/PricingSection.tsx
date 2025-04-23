import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PricingPlan } from "@/types";

const PricingSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  useEffect(() => {
    // Load pricing from JSON file
    fetch('/src/data/pricing.json')
      .then(response => response.json())
      .then(data => setPricingPlans(data))
      .catch(error => console.error('Error loading pricing plans:', error));
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
    <section 
      id="pricing" 
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("pricing.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("pricing.description")}
          </p>
        </motion.div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {pricingPlans.length > 0 ? (
            pricingPlans.map((plan, index) => (
              <motion.div 
                key={plan.id}
                className={`${
                  plan.popular 
                    ? "pricing-card bg-white dark:bg-gray-800 rounded-xl shadow-xl transform md:scale-105 relative z-10 border-2 border-primary-500 transition-all duration-300" 
                    : "pricing-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                }`}
                variants={itemVariants}
              >
                {plan.popular && (
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                    <span className="bg-primary-600 text-white text-sm font-semibold py-1 px-4 rounded-full">
                      {t("pricing.most_popular")}
                    </span>
                  </div>
                )}
                <div className={`p-8 ${plan.popular ? "pt-10" : ""}`}>
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/project</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {plan.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {feature.included ? (
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        )}
                        <span className={`${feature.included ? 'text-gray-700 dark:text-gray-300' : 'text-gray-500 dark:text-gray-400 opacity-50'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <a className={`block w-full text-center py-3 px-4 ${
                      plan.popular
                        ? "bg-primary-600 hover:bg-primary-700 text-white" 
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white border border-gray-300"
                    } font-medium rounded-lg transition-colors`}>
                      {t("pricing.get_started")}
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            // Fallback if JSON fails to load
            Array.from({ length: 3 }).map((_, index) => (
              <motion.div 
                key={index}
                className={`${
                  index === 1 
                    ? "pricing-card bg-white dark:bg-gray-800 rounded-xl shadow-xl transform md:scale-105 relative z-10 border-2 border-primary-500 transition-all duration-300" 
                    : "pricing-card bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                }`}
                variants={itemVariants}
              >
                {index === 1 && (
                  <div className="absolute top-0 inset-x-0 transform -translate-y-1/2 flex justify-center">
                    <span className="bg-primary-600 text-white text-sm font-semibold py-1 px-4 rounded-full">
                      {t("pricing.most_popular")}
                    </span>
                  </div>
                )}
                <div className={`p-8 ${index === 1 ? "pt-10" : ""}`}>
                  <h3 className="text-2xl font-bold mb-4">{t(`pricing.plan${index + 1}_name`)}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${index === 0 ? '499' : index === 1 ? '999' : '1,999'}</span>
                    <span className="text-gray-500 dark:text-gray-400">/project</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    {t(`pricing.plan${index + 1}_description`)}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {Array.from({ length: 5 }).map((_, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        {featureIndex < 4 - index || (index === 1 && featureIndex < 5) || (index === 2) ? (
                          <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-400 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                        )}
                        <span className={`${
                          featureIndex < 4 - index || (index === 1 && featureIndex < 5) || (index === 2) 
                            ? 'text-gray-700 dark:text-gray-300' 
                            : 'text-gray-500 dark:text-gray-400 opacity-50'
                        }`}>
                          {t(`pricing.plan${index + 1}_feature${featureIndex + 1}`)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact">
                    <a className={`block w-full text-center py-3 px-4 ${
                      index === 1
                        ? "bg-primary-600 hover:bg-primary-700 text-white" 
                        : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white border border-gray-300"
                    } font-medium rounded-lg transition-colors`}>
                      {t("pricing.get_started")}
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <motion.div 
          className="mt-16 max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl p-8 animate-on-scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-center">{t("pricing.custom_solution_title")}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
            {t("pricing.custom_solution_description")}
          </p>
          <div className="text-center">
            <Link href="/contact">
              <a className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {t("pricing.request_quote")}
              </a>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
