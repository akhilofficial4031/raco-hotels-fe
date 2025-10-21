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
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com";

    // Generate sitemap fields for each hotel
    const hotelSitemapFields = hotels.map((hotel) => ({
      loc: `${siteUrl}/hotels/${hotel.slug}`,
      lastmod: hotel.updatedAt || new Date().toISOString(),
      changefreq: "weekly" as const,
      priority: 0.8,
    }));

    // Add other dynamic pages
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

    const allFields = [...hotelSitemapFields, ...additionalFields];

    return getServerSideSitemap(allFields);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error generating server sitemap:", error);

    // Return minimal sitemap in case of error
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com";
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
