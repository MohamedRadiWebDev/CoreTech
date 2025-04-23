/**
 * Initialize animations for scroll effects on the website
 * This is used across different pages to create consistent animation behaviors
 */
export function initializeAnimations(): void {
  // When we have more complex animations, we can implement them here
  // For now, this is a placeholder function that will be expanded later
  
  // Check if window is available (for SSR compatibility)
  if (typeof window !== 'undefined') {
    // Add smooth scrolling behavior to the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Initialize any scroll-triggered animations
    const handleScroll = () => {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // If element is in viewport
        if (rect.top < windowHeight * 0.9) {
          element.classList.add('animated');
        }
      });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on load to animate elements that are already in view
    handleScroll();
    
    // We're not going to return a cleanup function since this is meant to be persistent
    // For components that need cleanup, they should implement their own event listeners
  }
}