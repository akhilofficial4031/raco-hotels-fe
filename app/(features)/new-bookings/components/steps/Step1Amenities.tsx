"use client";
import { Hotel, RoomType, Amenity } from "@/types/hotel";
import React from "react";

interface Step1AmenitiesProps {
  hotel: Hotel;
  roomType: RoomType;
}

const Step1Amenities: React.FC<Step1AmenitiesProps> = ({ hotel, roomType }) => {
  const getAmenityDetails = (amenityId: number): Amenity | undefined => {
    return hotel.amenities.find((a) => a.id === amenityId);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {roomType.amenities.map(({ amenityId }) => {
          const amenity = getAmenityDetails(amenityId);
          if (!amenity) return null;
          return (
            <div key={amenityId} className="flex items-center space-x-2">
              <i
                className={`fa ${amenity.icon} text-gray-600`}
                aria-hidden="true"
              />
              <span className="text-gray-700">{amenity.name}</span>
            </div>
          );
        })}
      </div>
      {/* <div className="text-sm text-gray-600">
        <p className="mb-2">
          <strong>Breakfast included</strong>
        </p>
      </div> */}

      {/* House Rules */}
      <div>
        <h4 className="font-semibold text-gray-800 mb-3">House rules</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">⏰ Check-in time</span>
            <span className="text-gray-800">
              From{" "}
              <span className="font-bold">{hotel.checkInTime || "3 PM"}</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">⏰ Check-out time</span>
            <span className="text-gray-800">
              Until{" "}
              <span className="font-bold">{hotel.checkOutTime || "11 AM"}</span>
            </span>
          </div>
        </div>
        <div>
          <h5 className="font-semibold text-gray-800 mb-2">Beware</h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-red-500">🚫</span>
              <span className="text-gray-700">No pets allowed</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">🚭</span>
              <span className="text-gray-700">No smoking</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-red-500">🚫</span>
              <span className="text-gray-700">No partying</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Amenities;
