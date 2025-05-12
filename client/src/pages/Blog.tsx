import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";
import { BlogPost } from "@/types";
import { Link } from "wouter";

const Blog = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();

    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Load blog data
    fetch('/data/blog.json')
      .then(response => response.json())
      .then(data => {
        const translatedPosts = data.map((post: BlogPost) => ({
          ...post,
          title: t(`blog.${post.id}_title`) || post.title,
          excerpt: t(`blog.${post.id}_excerpt`) || post.excerpt,
          content: t(`blog.${post.id}_content`) || post.content,
          category: post.category,
          tags: post.tags
        }));
        setBlogPosts(translatedPosts);
        setFilteredPosts(translatedPosts);
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }, [t]);

  // Get unique categories
  const categories = blogPosts.length > 0 
    ? ['all', ...new Set(blogPosts.map(post => post.category.toLowerCase()))]
    : ['all', 'seo', 'social media', 'video'];

  // Handle category filter
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    if (category === 'all') {
      setFilteredPosts(blogPosts);
    } else {
      setFilteredPosts(blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase()));
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
        <title>{t("meta.blog_title")} | Core Tech</title>
        <meta name="description" content={t("meta.blog_description")} />
      </Helmet>

      <main className="pt-32 pb-20 overflow-visible" data-rtl={isRTL}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("blog_page.title")}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("blog_page.description")}
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button 
                key={category}
                className={`px-6 py-2 rounded-full font-medium capitalize ${
                  activeCategory === category 
                    ? "bg-primary-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-primary-600 hover:text-white"
                } transition-colors`}
                onClick={() => handleCategoryChange(category)}
              >
                {category === 'all' ? t("blog_page.all_categories") : category}
              </button>
            ))}
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <motion.article 
                  key={post.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                  variants={itemVariants}
                >
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.id}`}>
                      <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                        {t("blog.read_more")}
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </Link>
                  </div>
                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 px-6 pb-6">
                      {post.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm py-1 px-3 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                {blogPosts.length === 0 ? (
                  <div>
                    <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                      <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{t("blog_page.loading")}</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      {t("blog_page.loading_message")}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="inline-block p-4 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                      <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{t("blog_page.no_results")}</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {t("blog_page.no_results_message")}
                    </p>
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
                    >
                      {t("blog_page.show_all")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          {/* Newsletter Subscription */}
          <motion.div 
            className="mt-20 bg-gray-100 dark:bg-gray-800 rounded-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("blog_page.newsletter_title")}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {t("blog_page.newsletter_description")}
                </p>
              </div>

              <div>
                <form className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder={t("blog_page.email_placeholder")}
                    className="flex-grow px-4 py-3 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    required
                  />
                  <button 
                    type="submit"
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                  >
                    {t("blog_page.subscribe_button")}
                  </button>
                </form>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  {t("blog_page.privacy_notice")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Blog;