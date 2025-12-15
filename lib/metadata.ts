import type { Metadata } from "next";
import { siteUrl } from "./seo";
import { getImageUrl } from "./utils";

// Base metadata configuration
const BASE_METADATA = {
  siteName: "Raco Hotels",
  locale: "en_US",
  twitterCard: "summary_large_image" as const,
  twitterCreator: "@racohotels",
  twitterSite: "@racohotels",
} as const;

// Type definitions for metadata generation
interface BaseMetadataParams {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical?: string;
  images?: ReadonlyArray<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
}

interface HotelMetadataParams {
  hotel: {
    name: string;
    city: string;
    countryCode: string;
    description: string;
    starRating: number;
    images: Array<{ url: string; alt?: string }>;
  };
  slug: string;
}

interface AttractionMetadataParams {
  attraction: {
    name: string;
    content: {
      hero: {
        title: string;
        subtitle: string;
        imageUrl: string;
      };
      aboutSection: {
        description: string;
      };
      gallery?: {
        images?: string[];
      };
    };
    hotelName?: string;
  };
  slug: string;
  hotelSlug: string;
}

interface PageMetadataParams extends BaseMetadataParams {
  path: string;
  type?: "website" | "article";
}

// Utility functions using functional programming principles
const createBaseMetadata = (params: BaseMetadataParams): Partial<Metadata> => ({
  title: params.title,
  description: params.description,
  keywords: Array.isArray(params.keywords)
    ? params.keywords
    : params.keywords
      ? [params.keywords]
      : undefined,
  authors: [{ name: "Raco Hotels" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: params.canonical ? { canonical: params.canonical } : undefined,
});

const createOpenGraphMetadata = (
  params: BaseMetadataParams & { url: string; type?: string }
) => ({
  title: params.title,
  description: params.description,
  url: params.url,
  siteName: BASE_METADATA.siteName,
  locale: BASE_METADATA.locale,
  type: (params.type as "website" | "article") ?? "website",
  images: params.images ? [...params.images] : [],
});

const createTwitterMetadata = (params: BaseMetadataParams) => ({
  card: BASE_METADATA.twitterCard,
  title: params.title,
  description: params.description,
  creator: BASE_METADATA.twitterCreator,
  site: BASE_METADATA.twitterSite,
  images: params.images?.map((img) => img.url) ?? [],
});

// Compose metadata for different page types
export const generatePageMetadata = (params: PageMetadataParams): Metadata => {
  const url = `${siteUrl}${params.path}`;

  return {
    ...createBaseMetadata(params),
    openGraph: createOpenGraphMetadata({ ...params, url }),
    twitter: createTwitterMetadata(params),
  };
};

// Specialized metadata generator for hotel pages
export const generateHotelMetadata = (
  params: HotelMetadataParams
): Metadata => {
  const { hotel, slug } = params;

  const title = `${hotel.name} - ${hotel.city}, ${hotel.countryCode} | Raco Hotels`;
  const description = `Book ${hotel.name} in ${hotel.city}, ${hotel.countryCode}. ${hotel.description.slice(0, 120)}... Experience luxury accommodations with Raco Hotels.`;
  const keywords = [
    hotel.name,
    `${hotel.city} hotels`,
    `${hotel.countryCode} accommodations`,
    `luxury hotel ${hotel.city}`,
    `hotel booking ${hotel.city}`,
    `${hotel.starRating} star hotel`,
    "Raco Hotels",
  ];

  const images = hotel.images.slice(0, 4).map((img) => ({
    url: getImageUrl(img.url),
    width: 1200,
    height: 630,
    alt: img.alt ?? `${hotel.name} - ${hotel.city}`,
  }));

  return generatePageMetadata({
    title,
    description,
    keywords,
    canonical: `${siteUrl}/hotels/${slug}`,
    path: `/hotels/${slug}`,
    images,
  });
};

// Specialized metadata generator for attraction pages
export const generateAttractionMetadata = (
  params: AttractionMetadataParams
): Metadata => {
  const { attraction, slug, hotelSlug } = params;

  const hotelRef = attraction.hotelName ? ` at ${attraction.hotelName}` : "";
  const title = `${attraction.content.hero.title ?? attraction.name}${hotelRef} | Raco Hotels`;
  const description = `${attraction.content.hero.subtitle}. ${attraction.content.aboutSection.description.slice(0, 140)}...`;
  const keywords = [
    attraction.name,
    attraction.content.hero.title,
    attraction.hotelName ?? "",
    "hotel attraction",
    "hotel amenity",
    "Raco Hotels",
  ].filter(Boolean);

  // Build images array from hero image and gallery
  const images: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }> = [];

  // Add hero image
  if (attraction.content.hero.imageUrl) {
    images.push({
      url: getImageUrl(attraction.content.hero.imageUrl),
      width: 1200,
      height: 630,
      alt: attraction.content.hero.title ?? attraction.name,
    });
  }

  // Add gallery images if available
  if (attraction.content.gallery?.images) {
    attraction.content.gallery.images.slice(0, 3).forEach((img) => {
      images.push({
        url: getImageUrl(img),
        width: 1200,
        height: 630,
        alt: attraction.name,
      });
    });
  }

  return generatePageMetadata({
    title,
    description,
    keywords,
    canonical: `${siteUrl}/hotels/${hotelSlug}/${slug}`,
    path: `/hotels/${hotelSlug}/${slug}`,
    images,
  });
};

// Error fallback metadata generator
export const generateFallbackMetadata = (pageType: string): Metadata => ({
  title: `${pageType} | Raco Hotels`,
  description: "Discover luxury accommodations with Raco Hotels.",
  robots: {
    index: true,
    follow: true,
  },
});

// Higher-order function for metadata generation with error handling
export const withMetadataErrorHandling = <T extends unknown[]>(
  metadataGenerator: (...args: T) => Promise<Metadata>,
  fallbackType: string
) => {
  return async (...args: T): Promise<Metadata> => {
    try {
      return await metadataGenerator(...args);
    } catch (_error) {
      // Error logging removed
      return generateFallbackMetadata(fallbackType);
    }
  };
};

// Default Open Graph image configuration
const DEFAULT_OG_IMAGE = {
  url: `${siteUrl}/images/og-default.png`,
  width: 1200,
  height: 630,
  alt: "Raco Hotels - Luxury Accommodations",
};

// Predefined metadata configurations for common pages
export const pageMetadataConfigs = {
  hotels: {
    title: "Hotels - Browse Our Premium Collection",
    description:
      "Explore our curated collection of luxury hotels worldwide. Find the perfect accommodation for your next business trip or vacation with Raco Hotels.",
    keywords:
      "hotel collection, luxury hotels, hotel directory, premium accommodations, hotel search",
    path: "/hotels",
    images: [DEFAULT_OG_IMAGE],
  },
  home: {
    title: "Welcome to Raco Hotels - Your Gateway to Luxury",
    description:
      "Discover exceptional hospitality with Raco Hotels. Premium accommodations, world-class service, and unforgettable experiences across our global hotel portfolio.",
    keywords:
      "Raco Hotels, luxury hotels, premium accommodations, hotel group, hospitality, travel",
    path: "/",
    images: [DEFAULT_OG_IMAGE],
  },
} as const;

// Convenience functions for specific page types
export const generateHotelsPageMetadata = (): Metadata =>
  generatePageMetadata(pageMetadataConfigs.hotels);

export const generateHomePageMetadata = (seoContent?: {
  title: string;
  description: string;
  keywords: string;
}): Metadata => {
  if (seoContent) {
    return generatePageMetadata({
      title: seoContent.title,
      description: seoContent.description,
      keywords: seoContent.keywords,
      path: "/",
      images: [DEFAULT_OG_IMAGE],
    });
  }
  return generatePageMetadata(pageMetadataConfigs.home);
};
