import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { getImageUrl } from "@/lib/utils";
import { Hotel } from "@/types/hotel";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

interface HotelListingGridProps {
  hotels: Hotel[];
  showTitles?: boolean;
}

const HotelListingGrid = ({
  hotels,
  showTitles = true,
}: HotelListingGridProps) => {
  const hotelCount = hotels.length;

  return (
    <section
      className="bg-background-light min-h-screen py-16 md:py-24"
      aria-labelledby="hotels-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        {showTitles ? (
          <AnimatedContainer animationName="fadeDown">
            <div className="text-center mb-16 md:mb-24">
              <span
                className="tag-head !font-cinzel inline-block mb-4"
                role="doc-subtitle"
              >
                Discover Our Collection
              </span>
              <h1
                id="hotels-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-normal text-primary leading-tight !font-cinzel mb-6"
              >
                Premium Hotels
              </h1>
              <p className="text-gray-600 dm-sans text-lg max-w-2xl mx-auto leading-relaxed">
                Experience luxury and comfort at our carefully curated selection
                of hotels, each offering unique amenities and exceptional
                service.
              </p>
            </div>
          </AnimatedContainer>
        ) : null}
        {/* Hotels List - Alternating Layout */}
        <div className="space-y-24 md:space-y-32">
          {hotelCount === 0 ? (
            <AnimatedContainer animationName="fadeUp">
              <div className="text-center py-16 bg-white/50 rounded-2xl">
                <p className="text-text-light dm-sans text-lg">
                  No hotels available at the moment. Please check back soon.
                </p>
              </div>
            </AnimatedContainer>
          ) : (
            hotels.map((hotel, index) => (
              <AnimatedContainer
                key={hotel.id}
                animationName="fadeUp"
                delay={0.1}
              >
                <HotelListItem hotel={hotel} index={index} />
              </AnimatedContainer>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

interface HotelListItemProps {
  hotel: Hotel;
  index: number;
}

const HotelListItem = ({ hotel, index }: HotelListItemProps) => {
  const primaryImage = hotel.images[0];
  const imageUrl = getImageUrl(primaryImage?.url);
  const isEven = index % 2 === 0;

  return (
    <article
      className={`flex flex-col ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      } gap-8 lg:gap-16 items-center`}
    >
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <Link
          href={`/hotels/${hotel.slug}`}
          className="group block relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
          aria-label={`View details for ${hotel.name}`}
        >
          <div className="aspect-[4/3] relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={primaryImage?.alt || `${hotel.name} - ${hotel.city}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              priority={index === 0}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />

            {/* Star Rating Badge - Floating */}
            {/* {hotel.starRating > 0 && (
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-sm flex items-center gap-1.5">
                {[...Array(hotel.starRating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 text-primary"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )} */}
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-primary dm-sans tracking-wide text-sm font-medium uppercase">
            <span className="w-8 h-[1px] bg-primary" />
            <span>
              {hotel.city}, {hotel.state}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-normal text-text-dark !font-cinzel leading-tight">
            <Link
              href={`/hotels/${hotel.slug}`}
              className="hover:text-primary transition-colors"
            >
              {hotel.name}
            </Link>
          </h2>

          <p className="text-gray-600 dm-sans leading-relaxed text-lg text-justify">
            {hotel.description}
          </p>
        </div>

        {/* Amenities Preview - Horizontal Scrollable or Wrap */}
        {/* {!!hotel.amenities?.length && (
          <div className="flex flex-wrap gap-x-6 gap-y-3 py-4 border-t border-border/50">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <div
                key={amenity.id}
                className="flex items-center text-text-light dm-sans text-sm group"
              >
                <span className="w-1.5 h-1.5 rounded-full capitalize bg-primary/40 group-hover:bg-primary mr-2 transition-colors" />
                {amenity.name}
              </div>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-primary text-sm font-medium self-center cursor-default">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>
        )} */}

        <div className="pt-4">
          <Link
            href={`/hotels/${hotel.slug}`}
            className="inline-flex items-center gap-3 text-text-dark hover:text-primary transition-colors duration-300 group"
          >
            <span className="text-lg font-cinzel font-semibold border-b border-transparent group-hover:border-primary transition-all">
              Explore Hotel
            </span>
            <span className="p-2 rounded-full bg-background-light group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ArrowRightOutlined className="h-5 w-5 !text-primary group-hover:!text-white" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default HotelListingGrid;
