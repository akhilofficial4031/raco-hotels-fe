import { DefaultSeoProps } from "next-seo";
import { getImageUrl } from "./utils";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://racohotelgroup.com";

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
        url: `${siteUrl}/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: "Raco Hotels - Luxury Accommodations",
        type: "image/png",
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
      href: "/pwa/ios/180.png",
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

// Organization structured data
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Raco Hotels",
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description:
      "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels - luxury accommodations, exclusive deals, and exceptional service.",
    contactPoint: {
      "@type": "ContactPoint",
      // TODO: Update with real Raco Residency phone number
      telephone: "+1-555-0199",
      contactType: "customer service",
      // TODO: Update with real Raco Residency email
      email: "contact@racohotels.com",
      areaServed: "Worldwide",
      availableLanguage: ["English"],
    },
    sameAs: [
      // TODO: Update with real Raco Residency social links
      "https://facebook.com/racohotels",
      "https://twitter.com/racohotels",
      "https://instagram.com/racohotels",
      "https://linkedin.com/company/racohotels",
    ],
    address: {
      "@type": "PostalAddress",
      // TODO: Update with real Raco Residency address
      streetAddress: "123 Residency Street",
      addressLocality: "City Name",
      addressRegion: "State",
      postalCode: "00000",
      addressCountry: "Country",
    },
  };
};

// Website structured data
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Raco Hotels",
    url: siteUrl,
    description:
      "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels.",
  };
};

// Local Business schema for individual hotels
export const generateLocalBusinessSchema = (hotel: {
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
  priceRange?: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: hotel.name,
    description: hotel.description,
    image: hotel.images.map((img) => getImageUrl(img.url)),
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.addressLine1,
      addressLocality: hotel.city,
      addressRegion: hotel.state,
      postalCode: hotel.postalCode,
      addressCountry: hotel.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    },
    telephone: hotel.phone,
    email: hotel.email,
    starRating: {
      "@type": "Rating",
      ratingValue: hotel.starRating,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange: hotel.priceRange ?? "$$$",
    url: `${siteUrl}/hotels/${hotel.name.toLowerCase().replace(/\s+/g, "-")}`,
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi" },
      { "@type": "LocationFeatureSpecification", name: "Parking" },
      { "@type": "LocationFeatureSpecification", name: "Restaurant" },
    ],
  };
};

// FAQ Schema
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// ItemList Schema for Hotels Listing Page - Enables rich results with carousel
export const generateHotelsListSchema = (
  hotels: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    city: string;
    state: string;
    countryCode: string;
    images: Array<{ url: string; alt: string }>;
    starRating: number;
  }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: hotels.map((hotel, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Hotel",
        "@id": `${siteUrl}/hotels/${hotel.slug}#hotel`,
        name: hotel.name,
        description: hotel.description,
        url: `${siteUrl}/hotels/${hotel.slug}`,
        image:
          hotel.images.length > 0
            ? getImageUrl(hotel.images[0].url)
            : `${siteUrl}/logo.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: hotel.city,
          addressRegion: hotel.state,
          addressCountry: hotel.countryCode,
        },
        starRating: {
          "@type": "Rating",
          ratingValue: hotel.starRating,
          bestRating: 5,
          worstRating: 1,
        },
      },
    })),
  };
};

// CollectionPage Schema for Hotels Listing
export const generateCollectionPageSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Hotels - Browse Our Premium Collection",
    description:
      "Explore our curated collection of luxury hotels worldwide. Find the perfect accommodation for your next business trip or vacation with Raco Hotels.",
    url: `${siteUrl}/hotels`,
    isPartOf: {
      "@type": "WebSite",
      name: "Raco Hotels",
      url: siteUrl,
    },
  };
};

// Enhanced Hotel Schema with Room Offers
export const generateEnhancedHotelSchema = (
  hotel: {
    id: number;
    name: string;
    slug: string;
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
    checkInTime: string;
    checkOutTime: string;
    images: Array<{ url: string; alt: string }>;
    amenities?: Array<{ name: string; icon: string }>;
    features?: Array<{ name: string; description: string }>;
  },
  roomTypes?: Array<{
    id: number;
    name: string;
    description: string;
    basePriceCents: number;
    currencyCode: string;
    baseOccupancy: number;
    maxOccupancy: number;
    sizeSqft: number;
    bedType: string;
  }>,
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
    bestRating?: number;
    worstRating?: number;
  }
) => {
  const baseSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": `${siteUrl}/hotels/${hotel.slug}#lodging`,
    name: hotel.name,
    description: hotel.description,
    url: `${siteUrl}/hotels/${hotel.slug}`,
    image: hotel.images.map((img) => getImageUrl(img.url)),
    telephone: hotel.phone,
    email: hotel.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.addressLine1,
      addressLocality: hotel.city,
      addressRegion: hotel.state,
      postalCode: hotel.postalCode,
      addressCountry: hotel.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    },
    starRating: {
      "@type": "Rating",
      ratingValue: hotel.starRating,
      bestRating: 5,
      worstRating: 1,
    },
    checkinTime: hotel.checkInTime,
    checkoutTime: hotel.checkOutTime,
    amenityFeature: hotel.amenities?.map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity.name,
      value: true,
    })) ?? [
      {
        "@type": "LocationFeatureSpecification",
        name: "Free WiFi",
        value: true,
      },
      { "@type": "LocationFeatureSpecification", name: "Parking", value: true },
      {
        "@type": "LocationFeatureSpecification",
        name: "Restaurant",
        value: true,
      },
    ],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/new-bookings?hotelId=${hotel.id}`,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      result: {
        "@type": "LodgingReservation",
        name: `Reserve a room at ${hotel.name}`,
      },
    },
  };

  // Add aggregate rating if available
  if (aggregateRating && aggregateRating.reviewCount > 0) {
    baseSchema.aggregateRating = generateAggregateRatingSchema(aggregateRating);
  }

  // Add room offers if available
  if (roomTypes && roomTypes.length > 0) {
    return {
      ...baseSchema,
      makesOffer: roomTypes.map((room) => ({
        "@type": "Offer",
        name: room.name,
        description: room.description,
        price: (room.basePriceCents / 100).toFixed(2),
        priceCurrency: room.currencyCode,
        availability: "https://schema.org/InStock",
        url: `${siteUrl}/new-bookings?hotelId=${hotel.id}&roomTypeId=${room.id}`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: (room.basePriceCents / 100).toFixed(2),
          priceCurrency: room.currencyCode,
          unitText: "per night",
        },
        itemOffered: {
          "@type": "Product",
          name: room.name,
          description: room.description,
          additionalProperty: [
            {
              "@type": "PropertyValue",
              name: "Occupancy",
              value: `${room.baseOccupancy}-${room.maxOccupancy} guests`,
            },
            {
              "@type": "PropertyValue",
              name: "Size",
              value: `${room.sizeSqft} sq ft`,
            },
            {
              "@type": "PropertyValue",
              name: "Bed Type",
              value: room.bedType,
            },
          ],
        },
      })),
    };
  }

  return baseSchema;
};

// Product Schema for Individual Room Types
export const generateRoomProductSchema = (
  hotel: { name: string; slug: string; city: string; countryCode: string },
  room: {
    id: number;
    name: string;
    description: string;
    basePriceCents: number;
    currencyCode: string;
    baseOccupancy: number;
    maxOccupancy: number;
    sizeSqft: number;
    bedType: string;
    images: Array<{ url: string; alt: string }>;
  }
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${room.name} at ${hotel.name}`,
    description: room.description,
    image: room.images.map((img) => getImageUrl(img.url)),
    offers: {
      "@type": "Offer",
      price: (room.basePriceCents / 100).toFixed(2),
      priceCurrency: room.currencyCode,
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/hotels/${hotel.slug}`,
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0], // 90 days from now
      seller: {
        "@type": "Organization",
        name: "Raco Hotels",
      },
    },
    brand: {
      "@type": "Brand",
      name: "Raco Hotels",
    },
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Base Occupancy",
        value: room.baseOccupancy,
      },
      {
        "@type": "PropertyValue",
        name: "Maximum Occupancy",
        value: room.maxOccupancy,
      },
      {
        "@type": "PropertyValue",
        name: "Room Size",
        value: `${room.sizeSqft} sq ft`,
      },
      {
        "@type": "PropertyValue",
        name: "Bed Type",
        value: room.bedType,
      },
    ],
  };
};

// AggregateRating Schema (use when reviews are available)
export const generateAggregateRatingSchema = (ratings: {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}) => {
  return {
    "@type": "AggregateRating",
    ratingValue: ratings.ratingValue,
    reviewCount: ratings.reviewCount,
    bestRating: ratings.bestRating ?? 5,
    worstRating: ratings.worstRating ?? 1,
  };
};
