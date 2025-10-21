import { DefaultSeoProps } from "next-seo";
import { getImageUrl } from "./utils";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com";

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: "%s | Raco Hotels",
  defaultTitle: "Raco Hotels - Luxury Accommodations & Premium Hotel Bookings",
  description:
    "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels - luxury accommodations, exclusive deals, and exceptional service across our hotel group.",
  canonical: siteUrl,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Raco Hotels",
    title: "Raco Hotels - Luxury Accommodations & Premium Hotel Bookings",
    description:
      "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels - luxury accommodations, exclusive deals, and exceptional service across our hotel group.",
    images: [
      {
        url: `${siteUrl}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: "Raco Hotels - Luxury Accommodations",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@racohotels",
    site: "@racohotels",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "hotels, luxury hotels, hotel booking, accommodations, travel, vacation, business travel, hotel reservations, premium hotels, hotel deals",
    },
    {
      name: "author",
      content: "Raco Hotels",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "googlebot",
      content: "index, follow",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
    {
      name: "theme-color",
      content: "#8B5CF6", // Purple theme color
    },
    {
      name: "application-name",
      content: "Raco Hotels",
    },
    {
      name: "apple-mobile-web-app-title",
      content: "Raco Hotels",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/manifest.json",
    },
    {
      rel: "canonical",
      href: siteUrl,
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ],
};

// SEO configuration for different page types
export const pageSEOConfigs = {
  hotels: {
    title: "Hotels - Browse Our Premium Collection",
    description:
      "Explore our curated collection of luxury hotels worldwide. Find the perfect accommodation for your next business trip or vacation with Raco Hotels.",
    keywords:
      "hotel collection, luxury hotels, hotel directory, premium accommodations, hotel search",
  },
  hotelDetail: (
    hotelName: string,
    city: string,
    country: string,
    description: string
  ) => ({
    title: `${hotelName} - ${city}, ${country}`,
    description: `Book ${hotelName} in ${city}, ${country}. ${description.slice(0, 120)}... Experience luxury accommodations with Raco Hotels.`,
    keywords: `${hotelName}, ${city} hotels, ${country} accommodations, luxury hotel ${city}, hotel booking ${city}`,
  }),
  home: {
    title: "Welcome to Raco Hotels - Your Gateway to Luxury",
    description:
      "Discover exceptional hospitality with Raco Hotels. Premium accommodations, world-class service, and unforgettable experiences across our global hotel portfolio.",
    keywords:
      "Raco Hotels, luxury hotels, premium accommodations, hotel group, hospitality, travel",
  },
};

// Schema.org structured data
export const generateHotelSchema = (hotel: {
  name: string;
  description: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  phone: string;
  email: string;
  starRating: number;
  latitude: number;
  longitude: number;
  images: Array<{ url: string; alt: string }>;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.addressLine1,
      addressLocality: hotel.city,
      addressRegion: hotel.state,
      postalCode: hotel.postalCode,
      addressCountry: hotel.countryCode,
    },
    telephone: hotel.phone,
    email: hotel.email,
    starRating: {
      "@type": "Rating",
      ratingValue: hotel.starRating,
      bestRating: "5",
      worstRating: "1",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    },
    image: hotel.images.map((img) => getImageUrl(img.url)),
    url: `${siteUrl}/hotels/${hotel.name.toLowerCase().replace(/\s+/g, "-")}`,
    priceRange: "$$$",
    "@id": `${siteUrl}/hotels/${hotel.name.toLowerCase().replace(/\s+/g, "-")}#hotel`,
  };
};

export const generateBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
};
