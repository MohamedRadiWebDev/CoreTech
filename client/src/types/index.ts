export type Language = 'en' | 'ar';

export type LocalizedText = {
  title?: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  excerpt?: string;
  excerpt_ar?: string;
  content?: string;
  content_ar?: string;
  shortDescription?: string;
  shortDescription_ar?: string;
  fullDescription?: string;
  fullDescription_ar?: string;
  label?: string;
  label_ar?: string;
  name?: string;
  name_ar?: string;
  role?: string;
  role_ar?: string;
  category?: string;
  category_ar?: string;
  categoryName?: string;
  categoryName_ar?: string;
  projectName?: string;
  projectName_ar?: string;
  client?: string;
  client_ar?: string;
  seoTitle?: string;
  seoTitle_ar?: string;
  seoDescription?: string;
  seoDescription_ar?: string;
};

export interface ServiceRecord extends LocalizedText {
  id: string;
  slug: string;
  features: string[];
  features_ar: string[];
  image: string;
  iconKey: 'monitor' | 'rocket' | 'video' | 'film' | 'play' | 'messages-square';
  featured?: boolean;
  order?: number;
}

export interface LocalizedService {
  id: string;
  slug: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  iconKey: ServiceRecord['iconKey'];
  featured: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PortfolioRecord extends LocalizedText {
  id: string;
  slug: string;
  image: string;
  gallery?: string[];
  website: string;
  year: string;
  services: string[];
  services_ar: string[];
  technologies: string[];
  technologies_ar: string[];
  impact: {
    value: string;
    label: string;
    label_ar: string;
  };
  featured?: boolean;
}

export interface LocalizedPortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  client?: string;
  year: string;
  website: string;
  services: string[];
  technologies: string[];
  impact: { value: string; label: string };
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogPostRecord extends LocalizedText {
  id: string;
  slug: string;
  author: string;
  author_ar: string;
  authorRole: string;
  authorRole_ar: string;
  authorImage: string;
  date: string;
  image: string;
  tags: string[];
  tags_ar: string[];
  featured?: boolean;
}

export interface LocalizedBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categoryKey: string;
  category: string;
  author: string;
  authorRole: string;
  authorImage: string;
  date: string;
  image: string;
  tags: string[];
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface TestimonialRecord {
  id: string;
  name: string;
  name_ar: string;
  role: string;
  role_ar: string;
  company: string;
  company_ar: string;
  image: string;
  text: string;
  text_ar: string;
  rating: number;
  date: string;
  projectId?: string;
  projectName?: string;
  projectName_ar?: string;
  featured?: boolean;
}

export interface LocalizedTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
  date: string;
  projectId?: string;
  projectName?: string;
  featured: boolean;
}

export interface ServiceOptionRecord {
  id: string;
  label: string;
  label_ar: string;
}

export interface LocalizedServiceOption {
  id: string;
  label: string;
}

export interface SiteConfigRecord {
  company: {
    name: string;
    name_ar: string;
    tagline: string;
    tagline_ar: string;
    email: string;
    phone: string;
    address: string;
    address_ar: string;
  };
  stats: {
    projects: number;
    clients: number;
    experience: number;
    satisfaction: number;
  };
}

export interface SiteConfig {
  company: {
    name: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
  };
  stats: SiteConfigRecord['stats'];
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
  whatsapp?: string;
}
