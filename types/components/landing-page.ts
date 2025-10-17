// Landing page component interfaces
export interface TopBannerProps {
  data: {
    message: string;
    link: {
      text: string;
      href: string;
    };
  };
}

export interface HeaderProps {
  data: {
    logo: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    navigation: Array<{
      href: string;
      label: string;
      dropdown?: Array<{
        href: string;
        label: string;
      }>;
    }>;
    cta: {
      text: string;
    };
    language: {
      icon: string;
      text: string;
    };
  };
}

export interface HeroProps {
  data: {
    subtitle: string;
    title: {
      gradient: string;
      regular: string;
    };
    description: string;
    cta: {
      text: string;
    };
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}

export interface AboutUsProps {
  data: {
    sectionTitle: string;
    title: string;
    description: string;
    cta: {
      text: string;
    };
    badge: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
    };
  };
}

export interface OurStaysProps {
  data: {
    sectionTitle: string;
    title: string;
    description: string;
  };
}

export interface FeaturedStaysProps {
  data: {
    title: string;
    description: string;
    cta: {
      text: string;
    };
  };
}

export interface SignatureExperiencesProps {
  data: {
    sectionTitle: string;
    title: string;
    description: string;
    club19: {
      title: string;
      subtitle: string;
      description: string;
      ctas: Array<{
        text: string;
        variant: "primary" | "secondary";
      }>;
      images: Array<{
        src: string;
        alt: string;
      }>;
    };
    badge: {
      src: string;
      alt: string;
    };
  };
}

export interface GravityBarProps {
  data: {
    sectionTitle: string;
    title: string;
    description: string;
    ctas: Array<{
      text: string;
      variant: "primary" | "secondary";
    }>;
    image: {
      src: string;
      alt: string;
    };
    badge: {
      src: string;
      alt: string;
    };
  };
}

export interface RestaurantProps {
  data: {
    sectionTitle: string;
    title: string;
    subtitle: string;
    description: string;
    ctas: Array<{
      text: string;
      variant: "primary" | "secondary";
    }>;
    images: Array<{
      src: string;
      alt: string;
    }>;
    badge: {
      src: string;
      alt: string;
    };
  };
}

export interface TestimonialsProps {
  data: {
    sectionTitle: string;
    title: string;
    items: Array<{
      name: string;
      location: string;
      image: string;
      testimonial: string;
    }>;
  };
}

export interface GalleryProps {
  data: {
    sectionTitle: string;
    title: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
    ctas: Array<{
      text: string;
      variant: "primary" | "secondary";
    }>;
  };
}
