import { Amenity } from "@/types/hotel";
import React from "react";

interface Props {
  amenities: Amenity[];
}

const Amenities = ({ amenities }: Props) => {
  const _baseUrl = process.env.NEXT_PUBLIC_BUCKET_URL;

  return (
    <div className="py-16">
      <h2 className="text-4xl font-serif text-purple-900 mb-8 text-center">
        Amenities
      </h2>
      <div className="max-w-4xl mx-auto border-t border-b border-gray-300 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-3">
              <i
                className={`fa ${amenity.icon} text-purple-500`}
                aria-hidden="true"
              />
              <span className="text-gray-700 font-sans">{amenity.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Amenities;
