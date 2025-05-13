import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Testimonial } from "@/types";

const TestimonialsSection = () => {
  const { isRTL } = useLanguage();
  const { t } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load testimonials from JSON file
    fetch('/data/testimonials.json')
      .then(response => response.json())
      .then(data => setTestimonials(data))
      .catch(error => console.error('Error loading testimonials:', error));
  }, []);

  // Handle dot navigation
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.querySelector('.testimonial-slide')?.clientWidth || 0;
      sliderRef.current.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    }
  };

  // Handle scroll event to update the active dot
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const slideWidth = sliderRef.current.querySelector('.testimonial-slide')?.clientWidth || 0;
      if (slideWidth > 0) {
        const newIndex = Math.round(scrollLeft / slideWidth);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener('scroll', handleScroll);
      return () => slider.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex]);

  return (
    <section 
      id="testimonials" 
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t("testimonials.description")}
          </p>
        </motion.div>

        <motion.div 
          ref={sliderRef}
          className="testimonial-slider flex overflow-x-auto pb-8 gap-6 snap-x scrollbar-hide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onScroll={handleScroll}
        >
          {testimonials.length > 0 ? (
            testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="testimonial-slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border-l-4 border-primary-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            // Fallback if JSON fails to load
            Array.from({ length: 4 }).map((_, index) => (
              <motion.div 
                key={index}
                className="testimonial-slide flex-shrink-0 w-full md:w-1/2 lg:w-1/3 bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border-l-4 border-primary-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="mr-4 h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div>
                    <h4 className="text-lg font-bold">{t(`testimonials.person${index + 1}_name`)}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{t(`testimonials.person${index + 1}_role`)}</p>
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
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{t(`testimonials.quote${index + 1}`)}"
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.length > 0 ? (
            testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === index 
                    ? "bg-primary-600" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
              <button 
                key={index}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === index 
                    ? "bg-primary-600" 
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;