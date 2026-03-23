export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  image: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  image: string;
  shortDescription: string;
  shortDescription_ar: string;
  fullDescription: string;
  fullDescription_ar: string;
  website: string;
  year: string;
  services: string[];
  technologies: string[];
  impact: {
    value: string;
    label: string;
  };
  client?: string;
  images?: string[];
  testimonial?: string;
}

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

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
  };
  stats: {
    projects: number;
    clients: number;
    experience: number;
    satisfaction: number;
  };
  hero?: {
    image?: string;
    video?: string;
  };
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  whatsapp?: string;
}

export interface ServiceOption {
  id: string;
  name: string;
  name_ar: string;
}
