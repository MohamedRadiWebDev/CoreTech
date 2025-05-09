
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
    initializeAnimations();
    window.scrollTo(0, 0);

    fetch('/data/blog.json')
      .then(response => response.json())
      .then(data => {
        const currentPost = data.find((post: BlogPost) => post.id === params?.id);
        if (currentPost) {
          setPost(currentPost);
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
          <h2 className="text-2xl font-bold mb-2">{t("blog.loading")}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("blog.loading_message")}
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
          <h2 className="text-2xl font-bold mb-2">{t("blog.not_found")}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t("blog.not_found_message")}
          </p>
          <Link href="/blog">
            <a className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              {t("blog.back_to_blog")}
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t(`blog.${post.id}_title`) || post.title} | Core Tech</title>
        <meta name="description" content={t(`blog.${post.id}_excerpt`) || post.excerpt} />
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
                <svg className={`w-4 h-4 ${isRTL ? 'ml-2 rotate-0' : 'mr-2 rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                {t("blog.back_to_blog")}
              </a>
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t(`blog.${post.id}_title`) || post.title}
            </h1>

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
                {t(`blog.category_${post.category.toLowerCase()}`) || post.category}
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
                alt={t(`blog.${post.id}_title`) || post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="max-w-3xl mx-auto prose lg:prose-xl dark:prose-dark">
              <div dangerouslySetInnerHTML={{ 
                __html: t(`blog.${post.id}_content`) || post.content 
              }} />
            </div>

            <div className="max-w-3xl mx-auto mt-8 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm py-1 px-3 rounded-full">
                  #{t(`blog.tag_${tag.toLowerCase()}`) || tag}
                </span>
              ))}
            </div>
          </motion.div>

          {relatedPosts.length > 0 && (
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">{t("blog.related_posts")}</h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <motion.article 
                    key={relatedPost.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
                    whileHover={{ y: -5 }}
                  >
                    <Link href={`/blog/${relatedPost.id}`}>
                      <a>
                        <div className="relative">
                          <img 
                            src={relatedPost.image} 
                            alt={t(`blog.${relatedPost.id}_title`) || relatedPost.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                            {t(`blog.category_${relatedPost.category.toLowerCase()}`) || relatedPost.category}
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {relatedPost.date}
                          </div>
                          <h3 className="text-xl font-bold mb-3">
                            {t(`blog.${relatedPost.id}_title`) || relatedPost.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {t(`blog.${relatedPost.id}_excerpt`) || relatedPost.excerpt}
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
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default BlogPostDetail;
