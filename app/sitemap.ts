import { MetadataRoute } from "next";
import { getFetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api";
import { HotelResponse } from "@/types/hotel";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://racohotelgroup.com";

  // Static routes
  const routes = [
    "",
    "/hotels",
    "/contact",
    "/privacy-policy",
    "/terms-conditions",
    "/available-rooms",
    "/new-bookings",
    "/cookie-policy",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  try {
    // Fetch all hotels for dynamic sitemap
    const response = await getFetcher<ApiResponse<HotelResponse>>(
      "/api/hotels?limit=1000"
    );
    const hotels = response.data.hotels || [];

    // Generate sitemap fields for each hotel
    const hotelRoutes = hotels.map((hotel) => ({
      url: `${siteUrl}/hotels/${hotel.slug}`,
      lastModified: hotel.updatedAt ? new Date(hotel.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    // Generate sitemap fields for attractions
    const attractionRoutes = hotels.flatMap((hotel) =>
      (hotel.attractions || []).map((attraction) => ({
        url: `${siteUrl}/hotels/${hotel.slug}/${attraction.slug}`,
        lastModified: attraction.updatedAt
          ? new Date(attraction.updatedAt)
          : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }))
    );

    return [...routes, ...hotelRoutes, ...attractionRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return routes;
  }
}
