import { getFetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api";
import { HotelResponse } from "@/types/hotel";
import { getServerSideSitemap } from "next-sitemap";

export async function GET() {
  try {
    // Fetch all hotels for dynamic sitemap
    const response = await getFetcher<ApiResponse<HotelResponse>>(
      "/api/hotels?limit=1000"
    );
    const hotels = response.data.hotels || [];

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://racohotelgroup.com";

    // Generate sitemap fields for each hotel with enhanced metadata
    const hotelSitemapFields = hotels.map((hotel) => ({
      loc: `${siteUrl}/hotels/${hotel.slug}`,
      lastmod: hotel.updatedAt || new Date().toISOString(),
      changefreq: "weekly" as const,
      priority: 0.8,
      images: hotel.images?.slice(0, 5).map((img) => ({
        loc: new URL(img.url.startsWith('http') ? img.url : `${siteUrl}${img.url}`),
        title: img.alt || hotel.name,
        caption: `${hotel.name} - ${hotel.city}, ${hotel.countryCode}`,
      })),
    }));

    // Generate sitemap fields for attractions
    const attractionSitemapFields = hotels.flatMap((hotel) =>
      (hotel.attractions || []).map((attraction) => ({
        loc: `${siteUrl}/hotels/${hotel.slug}/${attraction.slug}`,
        lastmod: attraction.updatedAt || new Date().toISOString(),
        changefreq: "monthly" as const,
        priority: 0.7,
      }))
    );

    // Add only actually implemented pages with proper priorities
    const additionalFields = [
      {
        loc: siteUrl,
        lastmod: new Date().toISOString(),
        changefreq: "daily" as const,
        priority: 1.0,
      },
      {
        loc: `${siteUrl}/hotels`,
        lastmod: new Date().toISOString(),
        changefreq: "daily" as const,
        priority: 0.9,
      },
    ];

    const allFields = [
      ...additionalFields,
      ...hotelSitemapFields,
      ...attractionSitemapFields,
    ];

    return getServerSideSitemap(allFields);
  } catch (_error) {
    // Error logging removed

    // Return minimal sitemap in case of error
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://racohotelgroup.com";
    const fallbackFields = [
      {
        loc: siteUrl,
        lastmod: new Date().toISOString(),
        changefreq: "daily" as const,
        priority: 1.0,
      },
      {
        loc: `${siteUrl}/hotels`,
        lastmod: new Date().toISOString(),
        changefreq: "daily" as const,
        priority: 0.9,
      },
    ];

    return getServerSideSitemap(fallbackFields);
  }
}
