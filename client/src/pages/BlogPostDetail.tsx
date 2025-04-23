import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";
import { BlogPost } from "@/types";

const BlogPostDetail = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [match, params] = useRoute("/blog/:id");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Load blog data
    fetch('/src/data/blog.json')
      .then(response => response.json())
      .then(data => {
        // Find the post with the matching ID
        const currentPost = data.find((post: BlogPost) => post.id === params?.id);
        
        if (currentPost) {
          setPost(currentPost);
          
          // Get related posts (same category, excluding current post)
          const related = data
            .filter((p: BlogPost) => p.category === currentPost.category && p.id !== currentPost.id)
            .slice(0, 3);
          
          setRelatedPosts(related);
        }
        
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog post:', error);
        setLoading(false);
      });
  }, [params?.id]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <svg className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{t("blog_post.loading")}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("blog_post.loading_message")}
          </p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{t("blog_post.not_found")}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t("blog_post.not_found_message")}
          </p>
          <Link href="/blog">
            <a className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              {t("blog_post.back_to_blog")}
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // Format the content by splitting on newlines
  const contentParagraphs = post.content.split('\n\n');

  return (
    <>
      <Helmet>
        <title>{post.title} | Core Tech</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>
      
      <main className="pt-32 pb-20 min-h-screen" data-rtl={isRTL}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium mb-6">
                <svg className="mr-2 w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                {t("blog_post.back_to_blog")}
              </a>
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <h3 className="font-medium">{post.author}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.authorRole}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </div>
            </div>
            
            <div className="mb-8">
              <span className="bg-primary-600 text-white text-sm font-semibold py-1 px-3 rounded-full">
                {post.category}
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[30rem] max-w-5xl mx-auto rounded-xl overflow-hidden mb-12">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="max-w-3xl mx-auto prose lg:prose-xl dark:prose-dark prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300">
              {contentParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="max-w-3xl mx-auto mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm py-1 px-3 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
          
          {/* Author Bio */}
          <motion.div 
            className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <img 
                src={post.authorImage} 
                alt={post.author} 
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h3 className="text-xl font-bold mb-2">{post.author}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {post.authorRole} at Core Tech
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  Professional content creator with a passion for digital marketing and web development.
                  Helping businesses navigate the digital landscape with practical insights and strategies.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">{t("blog_post.related_posts")}</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <motion.article 
                    key={relatedPost.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                        {relatedPost.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {relatedPost.date}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{relatedPost.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {relatedPost.excerpt}
                      </p>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                          {t("blog.read_more")}
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Comment Section (Optional) */}
          <motion.div 
            className="max-w-3xl mx-auto mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-8">{t("blog_post.leave_comment")}</h2>
            
            <form className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("blog_post.name")}
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("blog_post.email")}
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("blog_post.comment")}
                </label>
                <textarea 
                  id="comment" 
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {t("blog_post.submit_comment")}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default BlogPostDetail;