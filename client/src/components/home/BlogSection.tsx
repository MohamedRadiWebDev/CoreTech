import { Link } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BlogPost } from "@/types";

const BlogSection = () => {
  const { t } = useTranslation();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Load blog posts from JSON file
    fetch('/data/blog.json')
      .then(response => response.json())
      .then(data => {
        const posts = data.slice(0, 3).map((post: BlogPost) => ({
          ...post,
          title: t(`blog.${post.id}_title`) || post.title,
          excerpt: t(`blog.${post.id}_excerpt`) || post.excerpt,
          category: t(`blog.category_${post.category.toLowerCase()}`),
        }));
        setBlogPosts(posts);
      })
      .catch(error => console.error('Error loading blog posts:', error));
  }, [t]);

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
      id="blog" 
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("blog.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("blog.description")}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts.map((post) => (
            <motion.article 
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
            >
              <Link href={`/blog/${post.id}`}>
                <a>
                  <div className="relative">
                    <img 
                      src={post.image} 
                      alt={t(`blog.${post.id}_title`) || post.title}
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
                    <h3 className="text-xl font-bold mb-3">
                      {t(`blog.${post.id}_title`) || post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {t(`blog.${post.id}_excerpt`) || post.excerpt}
                    </p>
                    <span className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                      {t("blog.read_more")}
                      <svg className={`w-4 h-4 ${isRTL ? 'mr-2 rotate-180' : 'ml-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </span>
                  </div>
                </a>
              </Link>
            </motion.article>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link href="/blog">
            <a className="px-8 py-3 bg-white dark:bg-gray-800 border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white dark:border-primary-500 dark:text-primary-500 dark:hover:bg-primary-900 dark:hover:text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              {t("blog.view_all")}
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;