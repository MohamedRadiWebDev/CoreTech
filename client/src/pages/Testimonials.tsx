import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";
import { Testimonial } from "@/types";
import { Link } from "wouter";

const Testimonials = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Load testimonials data
    fetch('/src/data/testimonials.json')
      .then(response => response.json())
      .then(data => setTestimonials(data))
      .catch(error => console.error('Error loading testimonials:', error));
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
        <title>{t("meta.testimonials_title")} | Core Tech</title>
        <meta name="description" content={t("meta.testimonials_description")} />
      </Helmet>
      
      <main className="pt-32 pb-20 min-h-screen" data-rtl={isRTL}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("testimonials_page.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("testimonials_page.description")}
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {testimonials.length > 0 ? (
              testimonials.map((testimonial) => (
                <motion.div 
                  key={testimonial.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-primary-500"
                  variants={itemVariants}
                >
                  <div className="flex items-center mb-6">
                    <div className="mr-4 h-16 w-16 rounded-full overflow-hidden">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">{testimonial.name}</h4>
                      <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex text-yellow-400 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i} 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                        >
                          {testimonial.rating > i + 0.5 ? (
                            // Full star
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          ) : testimonial.rating > i ? (
                            // Half star
                            <path fillRule="evenodd" d="M10 15.933l4.472 2.355-.854-4.981 3.618-3.526-5-1.728L10 3.167v12.765zm0-14.167l-6.236 3.38 1.352 7.874-5.616 5.47 8.077 1.17 2.423 7.156 2.423-7.157 8.077-1.17-5.616-5.47 1.352-7.874L10 1.766z" clipRule="evenodd" />
                          ) : (
                            // Empty star
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          )}
                        </svg>
                      ))}
                    </div>
                    <blockquote className="text-gray-700 dark:text-gray-300 italic mb-4">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {testimonial.date}
                    </div>
                    {testimonial.projectName && (
                      <div className="mt-4 text-sm">
                        <span className="font-medium text-gray-700 dark:text-gray-300">{t("testimonials_page.project")}: </span>
                        <Link href={`/portfolio/${testimonial.projectId}`}>
                          <a className="text-primary-600 dark:text-primary-400 hover:underline">
                            {testimonial.projectName}
                          </a>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12">
                <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">{t("testimonials_page.loading")}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("testimonials_page.loading_message")}
                </p>
              </div>
            )}
          </motion.div>
          
          <div className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("testimonials_page.cta_title")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              {t("testimonials_page.cta_description")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <a className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  {t("testimonials_page.cta_button")}
                </a>
              </Link>
              <Link href="/portfolio">
                <a className="px-8 py-3 bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 border border-primary-600 dark:border-primary-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  {t("testimonials_page.view_portfolio")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Testimonials;
