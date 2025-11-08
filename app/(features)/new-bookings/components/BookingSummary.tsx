import { Hotel, RoomType } from "@/types/hotel";
import React from "react";
import {
  // ClockCircleOutlined, // Not used
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

interface BookingSummaryProps {
  hotel: Hotel;
  roomType: RoomType;
  checkIn: string | null;
  checkOut: string | null;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  hotel,
  roomType,
  checkIn,
  checkOut,
}) => {
  if (!hotel || !roomType) {
    return (
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-serif text-primary mb-4">
          Booking Summary
        </h2>
        <p>Loading booking details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-serif text-primary mb-4">
        Your Stay at {hotel.name}
      </h2>

      <div className="space-y-4 dm-sans">
        <div>
          <h3 className="text-lg font-semibold flex items-center font-serif">
            <HomeOutlined className="mr-2 text-primary" /> Hotel Details
          </h3>
          <p className="text-gray-600 ml-6">
            {hotel.addressLine1}, {hotel.city}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center font-serif">
            <UserOutlined className="mr-2 text-primary" /> Room
          </h3>
          <p className="text-gray-600 ml-6">{roomType.name}</p>
          <p className="text-gray-500 text-sm ml-6">{roomType.description}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center font-serif">
            <CalendarOutlined className="mr-2 text-primary" /> Check-in /
            Check-out
          </h3>
          <p className="text-gray-600 ml-6">
            {checkIn} to {checkOut}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold flex items-center font-serif">
            <UserOutlined className="mr-2 text-primary" /> Guests
          </h3>
          <p className="text-gray-600 ml-6">{roomType.baseOccupancy} Adults</p>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
