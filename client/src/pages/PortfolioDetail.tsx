import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { initializeAnimations } from "@/lib/animate";
import { PortfolioItem } from "@/types";
import clientPortrait from "@assets/stock_images/professional_busines_f92ef03e.jpg";

const PortfolioDetail = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [match, params] = useRoute("/portfolio/:id");
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProjects, setRelatedProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    // Initialize scroll animations
    initializeAnimations();

    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Load portfolio data
    fetch('/data/portfolio.json')
      .then(response => response.json())
      .then(data => {
        // Find the project with the matching ID
        const currentProject = data.find((item: PortfolioItem) => item.id === params?.id);

        if (currentProject) {
          setProject(currentProject);

          // Get related projects (same category, excluding current project)
          const related = data
            .filter((p: PortfolioItem) => p.category === currentProject.category && p.id !== currentProject.id)
            .slice(0, 3);

          setRelatedProjects(related);
        }

        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading portfolio project:', error);
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
          <h2 className="text-2xl font-bold mb-2">{t("portfolio.loading")}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t("portfolio.loading_message")}
          </p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block p-4 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{t("portfolio.not_found")}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t("portfolio.not_found_message")}
          </p>
          <Link href="/portfolio">
            <a className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              {t("portfolio.back_to_portfolio")}
            </a>
          </Link>
        </div>
      </div>
    );
  }

  // Format the description by splitting on newlines
  const descriptionParagraphs = project.fullDescription.split('\n\n');

  return (
    <>
      <Helmet>
        <title>{project.title} | Core Tech</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>

      <main className="pt-32 pb-20 min-h-screen" data-rtl={isRTL}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="mb-12 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/portfolio">
              <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium mb-6">
                <svg className="mr-2 w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
                {t("portfolio.back_to_portfolio")}
              </a>
            </Link>

            <span className="inline-block px-4 py-1 bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-medium rounded-full text-sm mb-4">
              {project.categoryName}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{project.title}</h1>

            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <div className="mr-3 w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-3 w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Year</p>
                  <p className="font-medium">{project.year}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="mr-3 w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Impact</p>
                  <p className="font-medium">{project.impact.value} {project.impact.label}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full h-[30rem] max-w-5xl mx-auto rounded-xl overflow-hidden mb-12">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                {descriptionParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="text-xl font-bold mb-4">Services Provided</h3>
                  <ul className="space-y-2">
                    {project.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold mb-6">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.images.map((image, index) => (
                      <motion.div 
                        key={index}
                        className="rounded-xl overflow-hidden shadow-lg"
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img 
                          src={image} 
                          alt={`${project.title} - image ${index + 1}`} 
                          className="w-full h-64 object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Testimonial */}
              {project.testimonial && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8 mb-12">
                  <svg className="w-10 h-10 text-gray-300 dark:text-gray-600 mb-4" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M10 8v6a6 6 0 01-6 6H8a6 6 0 016 6v-6a6 6 0 00-6-6H4a6 6 0 01-6-6v-6a6 6 0 016-6h6a6 6 0 016 6zm20 0v6a6 6 0 01-6 6h4a6 6 0 016 6v-6a6 6 0 00-6-6h-4a6 6 0 01-6-6v-6a6 6 0 016-6h6a6 6 0 016 6z"></path>
                  </svg>
                  <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-6">
                    "{project.testimonial}"
                  </p>
                  <div className="flex items-center">
                    <img 
                      src={clientPortrait} 
                      alt="Client" 
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      loading="lazy"
                      width="48"
                      height="48"
                    />
                    <div>
                      <h4 className="font-medium">Client Representative</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{project.client}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                
                  <div className="flex gap-4">
                    <a 
                      href={project.website} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t("portfolio.view_website")}
                    </a>
                    <Link href="/contact">
                      <a className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        {t("portfolio.start_project")}
                      </a>
                    </Link>
                  </div>
                
              </div>
            </div>
          </motion.div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-8 text-center">Related Projects</h2>

              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject) => (
                  <motion.div 
                    key={relatedProject.id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative">
                      <img 
                        src={relatedProject.image} 
                        alt={relatedProject.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-primary-600 text-white text-xs font-semibold py-1 px-3 rounded-full">
                          {relatedProject.categoryName}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3">{relatedProject.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {relatedProject.shortDescription}
                      </p>
                      <Link href={`/portfolio/${relatedProject.id}`}>
                        <a className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium">
                          View Project
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </a>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
};

export default PortfolioDetail;