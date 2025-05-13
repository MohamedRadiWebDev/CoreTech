import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PortfolioItem } from "@/types";

const PortfolioSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    // Load portfolio items from JSON file
    fetch('/data/portfolio.json')
      .then(response => response.json())
      .then(data => {
        // Filter for homepage: 3 web, 2 marketing, 1 video
        const webProjects = data.filter(item => item.category === 'web-design').slice(0, 3);
        const marketingProjects = data.filter(item => item.category === 'digital-marketing').slice(0, 2);
        const videoProjects = data.filter(item => item.category === 'video-production').slice(0, 1);
        
        const homepageProjects = [...webProjects, ...marketingProjects, ...videoProjects].map(item => ({
          ...item,
          shortDescription: isRTL ? item.shortDescription_ar : item.shortDescription,
          categoryName: t(`portfolio.category_${item.category}`),
        }));
        
        setPortfolioItems(homepageProjects);
        setFilteredItems(homepageProjects);
      })
      .catch(error => console.error('Error loading portfolio items:', error));
  }, []);

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
    <section 
      id="portfolio" 
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      data-rtl={isRTL}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16 animate-on-scroll"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("portfolio.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("portfolio.description")}
          </p>
        </motion.div>
        
        {/* Portfolio Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12 animate-on-scroll"
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
            // Fallback if JSON fails to load
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div 
                key={index}
                className="portfolio-item bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg group"
                variants={itemVariants}
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="absolute inset-0 bg-primary-600 bg-opacity-0 group-hover:bg-opacity-70 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
                    <Link href={`/portfolio/${index}`}>
                      <a className="px-6 py-2 bg-white text-primary-600 font-medium rounded-lg transform -translate-y-10 group-hover:translate-y-0 transition-all duration-300">
                        {t("portfolio.view_project")}
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
                    {t(`portfolio.category${(index % 3) + 1}`)}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-3">
                    {t(`portfolio.project${index + 1}_title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {t(`portfolio.project${index + 1}_description`)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      2024
                    </div>
                    <div className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      <span className="mr-1">+30%</span> {t("portfolio.growth")}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="text-center mt-16">
          <Link href="/contact">
            <a className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {t("portfolio.start_project")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
