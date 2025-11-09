import { Hotel, RoomType } from "@/types/hotel";
import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  CheckOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import moment from "moment";

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
      <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />
          <div className="h-4 bg-gray-200 rounded mb-2" />
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
          <div className="space-y-3">
            <div className="h-12 bg-gray-100 rounded" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const BUCKET_BASE_URL = process.env.NEXT_PUBLIC_BUCKET_URL ?? "";
  const nights =
    checkIn && checkOut ? moment(checkOut).diff(moment(checkIn), "days") : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
      {/* Header Section */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-1">
              Booking Summary
            </h2>
            <p className="text-gray-600">Your reservation details</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <CheckOutlined className="text-xl text-primary" />
          </div>
        </div>
      </div>

      {/* Hotel & Room Information */}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-left gap-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 capitalize">
            {hotel.name}
          </h3>
          <div className="inline-flex items-center bg-gray-50 capitalize text-primary px-4 py-2 rounded-md text-sm font-semibold">
            <span className="w-2 h-2 bg-primary rounded-full mr-2 " />
            {roomType.name}
          </div>
        </div>

        {/* Reservation Details */}
        <div className="space-y-4 mb-6">
          {/* Check-in */}
          <div className="flex items-center p-4 bg-gray-50 rounded-md">
            <div className="bg-white p-2 rounded-md shadow-sm mr-4">
              <CalendarOutlined className="text-primary text-lg" />
            </div>
            <div className="flex justify-between w-full">
              <div>
                <p className="text-sm font-medium text-gray-500">Check-in</p>
                <p className="text-lg font-semibold text-gray-900">
                  {moment(checkIn).format("DD MMM YYYY")}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Check-out</p>
                <p className="text-lg font-semibold text-gray-900">
                  {moment(checkOut).format("DD MMM YYYY")}
                </p>
              </div>
            </div>
          </div>

          {/* Check-out */}
          {/* <div className="flex items-center p-4 bg-gray-50 rounded-md">
            <div className="bg-white p-2 rounded-md shadow-sm mr-4">
              <CalendarOutlined className="text-primary text-lg" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500">Check-out</p>
              <p className="text-lg font-semibold text-gray-900">
                {moment(checkOut).format("ddd, DD MMM YYYY")}
              </p>
            </div>
          </div> */}

          {/* Guests & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-md">
              <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                <UserOutlined className="text-primary text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="font-semibold text-gray-900">
                  {roomType.baseOccupancy} Adults
                </p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-md">
              <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                <CalendarOutlined className="text-primary text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-semibold text-gray-900">
                  {nights} {nights === 1 ? "Night" : "Nights"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Room Images */}
      {!!(roomType.images && roomType.images.length > 0) && (
        <div className="border-t border-gray-100">
          <Carousel autoplay>
            {roomType.images.map((image) => (
              <div key={image.id}>
                <img
                  src={`${BUCKET_BASE_URL}/${image.url.replace("r2://", "")}`}
                  alt={image.alt}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Hotel Address */}
      <div className="p-6 border-t border-gray-100 bg-gray-50">
        <div className="flex items-start">
          <div className="bg-white p-2 rounded-md shadow-sm mr-4 mt-1">
            <EnvironmentOutlined className="text-primary text-lg" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Hotel Location
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {hotel.addressLine1}
              <br />
              {hotel.city}, {hotel.state} {hotel.postalCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
