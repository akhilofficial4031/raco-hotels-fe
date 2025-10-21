import SEOHead from "@/components/SEOHead";
import { getFetcher } from "@/lib/fetcher";
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
import { ApiResponse } from "@/types/api";
import { HotelDetailsResponse } from "@/types/hotel";
import type { Metadata } from "next";
import CheckAvailability from "./components/CheckAvailability";
import LocationInfo from "./components/LocationInfo";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate dynamic metadata for SEO using the utility function
const generateHotelPageMetadata = withMetadataErrorHandling(
  async (slug: string): Promise<Metadata> => {
    const hotelResponse = await getFetcher<ApiResponse<HotelDetailsResponse>>(
      `/api/hotels/slug/${slug}`
    );
    const hotel = hotelResponse.data.hotel;

    return generateHotelMetadata({
      hotel,
      slug,
    });
  },
  "Hotel Details"
);

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { slug } = await params;
  return generateHotelPageMetadata(slug);
};

const HotelDetailsPage = async ({ params }: Props) => {
  const { slug } = await params;
  const hotelResponse = await getFetcher<ApiResponse<HotelDetailsResponse>>(
    `/api/hotels/slug/${slug}`
  );

  const hotel = hotelResponse.data.hotel;

  // Generate structured data
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
        description={`Book ${hotel.name} in ${hotel.city}, ${hotel.countryCode}. ${hotel.description.slice(0, 120)}... Experience luxury accommodations with Raco Hotels.`}
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
      <div className="bg-[#F8F5F2]">
        <div
          className="relative h-screen w-full"
          style={{
            backgroundImage: `url(${getImageUrl(hotel.images[0]?.url)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-40 z-10" />

          <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-wider">
              {hotel.name}
            </h1>
            <div className="flex items-center mt-4">
              {Array.from({ length: hotel.starRating }, (_, i) => (
                <svg
                  key={`star-${hotel.id}-${i}`}
                  className="w-8 h-8 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <p className="mt-4 text-lg">
              {hotel.city}, {hotel.countryCode}
            </p>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 text-white flex flex-col items-end space-y-4 pr-8">
            <div className="flex items-center">
              <span className="mr-2">{hotel.phone}</span>
              <i className="fa fa-phone" aria-hidden="true" />
            </div>
            <div className="flex items-center">
              <span className="mr-2">{hotel.email}</span>
              <i className="fa fa-envelope" aria-hidden="true" />
            </div>
          </div>
          <CheckAvailability />
        </div>

        <div className="py-44">
          <div className="container mx-auto px-4 text-center">
            <i
              className="fa fa-building-o text-4xl text-purple-400"
              aria-hidden="true"
            />
            <p className="mt-4 text-sm font-semibold tracking-widest text-purple-600">
              WELCOME TO {hotel.name.toUpperCase()}
            </p>
            <h2 className="mt-4 text-5xl font-serif text-purple-900">
              A Serene & Exclusive Experience
            </h2>
            <p className="mt-6 max-w-3xl mx-auto text-lg text-gray-500 leading-relaxed font-sans">
              {hotel.description}
            </p>
          </div>
        </div>
        <div className="container mx-auto px-4 pb-16">
          {/* <div className="-mt-32">
          <Amenities amenities={hotel.amenities} />
        </div>
        <div>
          <Features features={hotel.features} />
        </div> */}
          <LocationInfo locationInfo={hotel.locationInfo} />
        </div>
      </div>
    </>
  );
};

export default HotelDetailsPage;
