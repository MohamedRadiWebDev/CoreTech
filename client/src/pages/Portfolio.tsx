import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";
import { PortfolioItem } from "@/types";
import { Link, useLocation } from "wouter";

const Portfolio = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [location] = useLocation();

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Load portfolio data
    fetch('/public/data/portfolio.json')
      .then(response => response.json())
      .then(data => {
        setPortfolioItems(data);
        
        // Check for URL filter parameter
        const urlParams = new URLSearchParams(location.split('?')[1]);
        const filterParam = urlParams.get('filter');
        
        if (filterParam) {
          setActiveFilter(filterParam);
          setFilteredItems(data.filter((item: PortfolioItem) => item.category === filterParam));
        } else {
          setFilteredItems(data);
        }
      })
      .catch(error => console.error('Error loading portfolio items:', error));
  }, [location]);

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    if (filter === "all") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === filter));
    }
  };

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
        <title>{t("meta.portfolio_title")} | Core Tech</title>
        <meta name="description" content={t("meta.portfolio_description")} />
      </Helmet>
      
      <main className="pt-32 pb-20 min-h-screen" data-rtl={isRTL}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("portfolio_page.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("portfolio_page.description")}
            </p>
          </motion.div>
          
          {/* Portfolio Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button 
              className={`px-6 py-2 rounded-full font-medium ${
                activeFilter === "all" 
                  ? "bg-primary-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-600 hover:text-white"
              } transition-colors`}
              onClick={() => handleFilterChange("all")}
            >
              {t("portfolio.filter_all")}
            </button>
            <button 
              className={`px-6 py-2 rounded-full font-medium ${
                activeFilter === "web-design" 
                  ? "bg-primary-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-600 hover:text-white"
              } transition-colors`}
              onClick={() => handleFilterChange("web-design")}
            >
              {t("portfolio.filter_web")}
            </button>
            <button 
              className={`px-6 py-2 rounded-full font-medium ${
                activeFilter === "digital-marketing" 
                  ? "bg-primary-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-600 hover:text-white"
              } transition-colors`}
              onClick={() => handleFilterChange("digital-marketing")}
            >
              {t("portfolio.filter_marketing")}
            </button>
            <button 
              className={`px-6 py-2 rounded-full font-medium ${
                activeFilter === "video-production" 
                  ? "bg-primary-600 text-white" 
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-600 hover:text-white"
              } transition-colors`}
              onClick={() => handleFilterChange("video-production")}
            >
              {t("portfolio.filter_video")}
            </button>
          </motion.div>
          
          {/* Portfolio Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <motion.div 
                  key={item.id}
                  className="portfolio-item bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg group"
                  variants={itemVariants}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                      {item.category === 'web-design' ? (
                        <a 
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer" 
                          className="px-6 py-2 bg-white text-primary-600 font-medium rounded-lg transform -translate-y-10 group-hover:translate-y-0 transition-all duration-300">
                          {t("portfolio.view_website")}
                        </a>
                      ) : (
                        <Link href={`/portfolio/${item.id}`}>
                          <a className="px-6 py-2 bg-white text-primary-600 font-medium rounded-lg transform -translate-y-10 group-hover:translate-y-0 transition-all duration-300">
                            {t("portfolio.view_details")}
                          </a>
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">{item.categoryName}</span>
                    <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.shortDescription}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {item.year}
                      </div>
                      <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        <span className="mr-1">{item.impact.value}</span> {item.impact.label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                {portfolioItems.length === 0 ? (
                  <div>
                    <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{t("portfolio_page.loading")}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("portfolio_page.loading_message")}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                      <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{t("portfolio_page.no_results")}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {t("portfolio_page.no_results_message")}
                    </p>
                    <button
                      onClick={() => handleFilterChange("all")}
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                      {t("portfolio_page.show_all")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
          
          <div className="mt-16 bg-gray-100 dark:bg-gray-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">{t("portfolio_page.cta_title")}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-3xl mx-auto">
              {t("portfolio_page.cta_description")}
            </p>
            <Link href="/contact">
              <a className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                {t("portfolio_page.cta_button")}
              </a>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Portfolio;
