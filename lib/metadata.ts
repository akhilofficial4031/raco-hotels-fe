import type { Metadata } from "next";
import { siteUrl } from "./seo";

// Base metadata configuration
const BASE_METADATA = {
  siteName: "Raco Hotels",
  locale: "en_US",
  twitterCard: "summary_large_image" as const,
  twitterCreator: "@racohotels",
} as const;

// Type definitions for metadata generation
interface BaseMetadataParams {
  title: string;
  description: string;
  keywords?: string | string[];
  canonical?: string;
  images?: Array<{
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
  baseUrl?: string;
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
  images: params.images ?? [],
});

const createTwitterMetadata = (params: BaseMetadataParams) => ({
  card: BASE_METADATA.twitterCard,
  title: params.title,
  description: params.description,
  creator: BASE_METADATA.twitterCreator,
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
  const { hotel, slug, baseUrl = "" } = params;

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
    url: `${baseUrl}/${img.url.replace("r2://", "")}`,
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Error generating metadata for ${fallbackType}:`, error);
      return generateFallbackMetadata(fallbackType);
    }
  };
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
  },
  home: {
    title: "Welcome to Raco Hotels - Your Gateway to Luxury",
    description:
      "Discover exceptional hospitality with Raco Hotels. Premium accommodations, world-class service, and unforgettable experiences across our global hotel portfolio.",
    keywords:
      "Raco Hotels, luxury hotels, premium accommodations, hotel group, hospitality, travel",
    path: "/",
  },
} as const;

// Convenience functions for specific page types
export const generateHotelsPageMetadata = (): Metadata =>
  generatePageMetadata(pageMetadataConfigs.hotels);

export const generateHomePageMetadata = (): Metadata =>
  generatePageMetadata(pageMetadataConfigs.home);
