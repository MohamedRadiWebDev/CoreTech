// Type definitions for the application

// Service type from services.json
export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  image: string;
}

// Portfolio item type from portfolio.json
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  client: string;
  year: string;
  services: string[];
  technologies: string[];
  impact: {
    value: string;
    label: string;
  };
  testimonial: string;
  images: string[];
}

// Testimonial type from testimonials.json
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
  date: string;
  projectId?: string;
  projectName?: string;
}

// Blog post type from blog.json
export interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

// Pricing plan type from pricing.json
export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  popular: boolean;
  description: string;
  features: Array<{
    text: string;
    included: boolean;
  }>;
}

// Team member type
export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Contact form data type
export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}