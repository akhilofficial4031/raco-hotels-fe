/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllAttractions } from "@/lib/hotels";
import Image from "next/image";
import Link from "next/link";
import AnimatedContainer from "@/components/ui/AnimatedContainer";
import { Attraction } from "@/types/hotel";
import { getImageUrl } from "@/lib/utils";

export default async function AllAttractions() {
  const response = await getAllAttractions();

  const attractions =
    ((response as any).data?.attractions as Attraction[]) ?? [];

  return (
    <section className="py-16 md:py-24 bg-background-ultra-light">
      <div className="container mx-auto px-4 md:px-6">
        <AnimatedContainer animationName="fadeUp">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel text-primary mb-4">
              Attractions & Experiences
            </h2>
            <p className="text-lg text-text-light font-dm-sans max-w-2xl mx-auto">
              Discover the unique amenities and entertainment options available
              at our hotels.
            </p>
          </div>
        </AnimatedContainer>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {attractions.map((attraction: Attraction, index: number) => (
            <AnimatedContainer
              key={attraction.id ?? index}
              animationName="fadeUp"
              delay={index * 0.1}
            >
              <div className="group h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                {/* Image Container */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200">
                  {attraction.content?.hero?.imageUrl ? (
                    <Image
                      src={getImageUrl(attraction.content.hero.imageUrl)}
                      alt={
                        attraction.content.hero.title ?? attraction.name ?? ""
                      }
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      No Image Available
                    </div>
                  )}

                  {/* Hotel Name Badge */}
                  {attraction.hotelName ? (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary rounded-sm shadow-sm">
                      {attraction.hotelName}
                    </div>
                  ) : null}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-cinzel text-gray-900 group-hover:text-primary transition-colors">
                      {attraction.name}
                    </h3>
                  </div>

                  {/* {attraction.content?.hero?.title ? (
                    <h4 className="text-lg font-dm-sans font-medium text-gray-800 mb-2">
                      {attraction.content.hero.title}
                    </h4>
                  ) : null} */}

                  {attraction.content?.hero?.subtitle ? (
                    <p className="text-text-light font-dm-sans text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                      {attraction.content.hero.subtitle}
                    </p>
                  ) : null}

                  <div className="pt-4 mt-auto border-t border-gray-100">
                    <Link
                      href={`/hotels/${attraction.hotelSlug}/${attraction.slug}`}
                      className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-primary hover:text-primary-dark transition-colors"
                    >
                      Explore Now
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
