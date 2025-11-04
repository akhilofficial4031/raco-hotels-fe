import SEOHead from "@/components/SEOHead";
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
import { getImageUrl } from "@/lib/utils";
import type { Metadata } from "next";
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
      <SEOHead
        structuredData={[enhancedHotelSchema, hotelSchema, breadcrumbSchema]}
        title={`${hotel.name} - ${hotel.city}, ${hotel.countryCode}`}
        description={`Book ${hotel.name} in ${hotel.city}, ${hotel.countryCode}. ${hotel.description.slice(
          0,
          120
        )}... Experience luxury accommodations with Raco Hotels.`}
        canonical={`${siteUrl}/hotels/${slug}`}
        openGraph={{
          title: `${hotel.name} - ${hotel.city}, ${hotel.countryCode}`,
          description: `Book ${hotel.name} in ${hotel.city}, ${hotel.countryCode}. Experience luxury accommodations with Raco Hotels.`,
          url: `${siteUrl}/hotels/${slug}`,
          siteName: "Raco Hotels",
          images: hotel.images.slice(0, 4).map((img) => ({
            url: getImageUrl(img.url),
            width: 1200,
            height: 630,
            alt: img.alt || `${hotel.name} - ${hotel.city}`,
          })),
          locale: "en_US",
          type: "website",
        }}
        additionalMetaTags={[
          {
            property: "og:type",
            content: "hotel",
          },
          {
            name: "geo.region",
            content: `${hotel.countryCode}-${hotel.state}`,
          },
          {
            name: "geo.placename",
            content: hotel.city,
          },
          {
            name: "geo.position",
            content: `${hotel.latitude};${hotel.longitude}`,
          },
          {
            name: "ICBM",
            content: `${hotel.latitude}, ${hotel.longitude}`,
          },
        ]}
      />
      <HotelDetailsClient hotel={hotel} initialRoomTypes={roomTypes} />
    </>
  );
};

export default HotelDetailsPage;
