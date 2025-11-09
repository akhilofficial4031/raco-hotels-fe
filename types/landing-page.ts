export interface Button {
  text: string;
  type?: "primary" | "secondary";
}

export interface Image {
  src: string;
  alt: string;
}

export interface TopBannerContent {
  isVisible: boolean;
  text: string;
  linkText: string;
  linkUrl: string;
}

export interface HeroContent {
  tagline: string;
  title: {
    highlight: string;
    subtitle: string;
  };
  description: string;
  primaryButton: Button;
  image: Image;
}

export interface AboutUsContent {
  sectionTag: string;
  title: string;
  description: string;
  badge: Image;
  primaryButton: Button;
  image: Image;
}

export interface OurStaysContent {
  sectionTag: string;
  title: string;
  description: string;
}

export interface FeaturedStaysContent {
  title: string;
  description: string;
  primaryButton: Button;
}

export interface ClubExperience {
  name: string;
  tagline: string;
  title: string;
  description: string;
  buttons: Button[];
}

export interface SignatureExperiencesContent {
  sectionTag: string;
  title: string;
  description: string;
  club: ClubExperience;
  images: Image[];
  badge: Image;
}

export interface GravityBarContent {
  sectionTag: string;
  title: string;
  description: string;
  name: string;
  image: Image;
  buttons: Button[];
  badge: Image;
}

export interface RestaurantContent {
  name: string;
  sectionTag: string;
  title: string;
  description: string;
  buttons: Button[];
  images: Image[];
  badge: Image;
}

export interface Testimonial {
  name: string;
  location: string;
  avatar: string;
  testimonial: string;
  rating?: number;
}

export interface TestimonialsContent {
  sectionTag: string;
  title: string;
  items: Testimonial[];
}

export interface GalleryContent {
  sectionTag: string;
  title: string;
  images: Image[];
  buttons: Button[];
}

export interface SEOContent {
  title: string;
  description: string;
  keywords: string;
}

export interface LandingPageContent {
  topBanner: TopBannerContent;
  hero: HeroContent;
  aboutUs: AboutUsContent;
  ourStays: OurStaysContent;
  featuredStays: FeaturedStaysContent;
  signatureExperiences: SignatureExperiencesContent;
  gravityBar: GravityBarContent;
  restaurant: RestaurantContent;
  testimonials: TestimonialsContent;
  gallery: GalleryContent;
  seo: SEOContent;
}

// CMS API Response Types
export interface CMSHomepageResponse {
  success: boolean;
  data: LandingPageContent;
  message?: string;
}
