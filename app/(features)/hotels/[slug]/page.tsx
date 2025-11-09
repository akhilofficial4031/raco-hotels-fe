import SEOHead from "@/components/SEOHead";
import { getHotelBySlug, getHotelRoomTypes } from "@/lib/hotels";
import {
  generateHotelMetadata,
  withMetadataErrorHandling,
} from "@/lib/metadata";
import {
  generateBreadcrumbSchema,
  generateHotelSchema,
  siteUrl,
} from "@/lib/seo";
import { getImageUrl } from "@/lib/utils";
import type { Metadata } from "next";
import HotelDetailsClient from "./components/HotelDetailsClient";

interface Props {
  params: {
    slug: string;
  };
}

export const generateMetadata = withMetadataErrorHandling(
  async ({ params }: Props): Promise<Metadata> => {
    const hotelResponse = await getHotelBySlug(params.slug);
    const hotel = hotelResponse.data.hotel;
    return generateHotelMetadata({ hotel, slug: params.slug });
  },
  "Hotel Details"
);

const HotelDetailsPage = async ({ params }: Props) => {
  const { slug } = params;
  const hotelResponse = await getHotelBySlug(slug);
  const hotel = hotelResponse.data.hotel;
  console.log("hotel", hotel);

  const roomTypesResponse = await getHotelRoomTypes(hotel.id);
  const roomTypes = roomTypesResponse.data.roomTypes;

  const hotelSchema = generateHotelSchema(hotel);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Hotels", url: `${siteUrl}/hotels` },
    { name: hotel.name, url: `${siteUrl}/hotels/${slug}` },
  ]);

  return (
    <>
      <SEOHead
        structuredData={[hotelSchema, breadcrumbSchema]}
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
      />
      <HotelDetailsClient hotel={hotel} initialRoomTypes={roomTypes} />
    </>
  );
};

export default HotelDetailsPage;
