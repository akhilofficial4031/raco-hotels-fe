import { getHotelBySlug, getHotelRoomTypes } from "@/lib/hotels";
import {
  generateHotelMetadata,
  withMetadataErrorHandling,
} from "@/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateEnhancedHotelSchema,
  generateHotelSchema,
  siteUrl,
} from "@/lib/seo";
import type { Metadata } from "next";
import Script from "next/script";
import HotelDetailsClient from "./components/HotelDetailsClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export const generateMetadata = withMetadataErrorHandling(
  async ({ params }: Props): Promise<Metadata> => {
    const { slug } = await params;
    const hotelResponse = await getHotelBySlug(slug);
    const hotel = hotelResponse.data.hotel;
    return generateHotelMetadata({ hotel, slug });
  },
  "Hotel Details"
);

const HotelDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const hotelResponse = await getHotelBySlug(slug);
  const hotel = hotelResponse.data.hotel;

  const roomTypesResponse = await getHotelRoomTypes(hotel.id);
  const roomTypes = roomTypesResponse.data.roomTypes;

  // Generate enhanced structured data with room offers
  const enhancedHotelSchema = generateEnhancedHotelSchema(hotel, roomTypes);
  
  // Keep the basic hotel schema for backward compatibility
  const hotelSchema = generateHotelSchema(hotel);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Hotels", url: `${siteUrl}/hotels` },
    { name: hotel.name, url: `${siteUrl}/hotels/${slug}` },
  ]);

  return (
    <>
      {/* Structured Data - Enhanced Hotel Schema */}
      <Script
        id="enhanced-hotel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedHotelSchema),
        }}
      />
      
      {/* Structured Data - Basic Hotel Schema */}
      <Script
        id="hotel-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hotelSchema),
        }}
      />
      
      {/* Structured Data - Breadcrumb Schema */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <HotelDetailsClient hotel={hotel} initialRoomTypes={roomTypes} />
    </>
  );
};

export default HotelDetailsPage;
