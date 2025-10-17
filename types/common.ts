// Common/shared types used across the application

export type ButtonVariant = "primary" | "secondary";

export interface ImageData {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CTAButton {
  text: string;
  variant: ButtonVariant;
  href?: string;
}

export interface NavigationItem {
  href: string;
  label: string;
  dropdown?: Array<{
    href: string;
    label: string;
  }>;
}

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

// Landing page data structure from API
export interface LandingPageData {
  topBanner: {
    message: string;
    link: {
      text: string;
      href: string;
    };
  };
  header: {
    logo: ImageData & { width: number; height: number };
    navigation: NavigationItem[];
    cta: {
      text: string;
    };
    language: {
      icon: string;
      text: string;
    };
  };
  hero: {
    subtitle: string;
    title: {
      gradient: string;
      regular: string;
    };
    description: string;
    cta: CTAButton;
    image: ImageData & { width: number; height: number };
  };
  aboutUs: {
    sectionTitle: string;
    title: string;
    description: string;
    cta: CTAButton;
    badge: ImageData & { width: number; height: number };
    image: ImageData & { width: number; height: number };
  };
  ourStays: {
    sectionTitle: string;
    title: string;
    description: string;
  };
  featuredStays: {
    title: string;
    description: string;
    cta: CTAButton;
  };
  signatureExperiences: {
    sectionTitle: string;
    title: string;
    description: string;
    club19: {
      title: string;
      subtitle: string;
      description: string;
      ctas: CTAButton[];
      images: ImageData[];
    };
    badge: ImageData;
  };
  gravityBar: {
    sectionTitle: string;
    title: string;
    description: string;
    ctas: CTAButton[];
    image: ImageData;
    badge: ImageData;
  };
  restaurant: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    description: string;
    ctas: CTAButton[];
    images: ImageData[];
    badge: ImageData;
  };
  testimonials: {
    sectionTitle: string;
    title: string;
    items: Array<{
      name: string;
      location: string;
      image: string;
      testimonial: string;
    }>;
  };
  gallery: {
    sectionTitle: string;
    title: string;
    images: ImageData[];
    ctas: CTAButton[];
  };
  seo: SEOData & {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
}
