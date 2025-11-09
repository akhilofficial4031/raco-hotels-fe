import { getActiveHotels } from "@/lib/hotels";
import { generateHotelsPageMetadata } from "@/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateHotelsListSchema,
  siteUrl,
} from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";
import HotelList from "./components/HotelList";

export const metadata: Metadata = generateHotelsPageMetadata();

export default async function HotelsPage() {
  // Fetch hotels for structured data
  const hotels = await getActiveHotels();

  // Generate structured data for hotels listing page
  const hotelsListSchema = generateHotelsListSchema(hotels);
  const collectionPageSchema = generateCollectionPageSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Hotels", url: `${siteUrl}/hotels` },
  ]);

  return (
    <>
      {/* Structured Data for Hotels Listing */}
      <Script
        id="hotels-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelsListSchema),
        }}
      />
      <Script
        id="collection-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionPageSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <HotelList />
    </>
  );
}
