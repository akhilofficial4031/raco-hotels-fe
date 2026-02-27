/* eslint-disable @next/next/no-img-element */
import { Hotel, RoomType } from "@/types/hotel";
import React from "react";
import {
  UserOutlined,
  CalendarOutlined,
  CheckOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Carousel } from "antd";
import moment from "moment";

const EXTRA_ADULT_CHARGE = 1000;
const EXTRA_ADULT_TAX_RATE = 0.05;

interface BookingSummaryProps {
  hotel: Hotel;
  roomType: RoomType;
  checkIn: string | null;
  checkOut: string | null;
  numberOfRooms: number;
  adults: number;
  children: number;
  childAges: number[];
}

function formatCurrency(amount: number, currencyCode: string): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
  }).format(amount);
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  hotel,
  roomType,
  checkIn,
  checkOut,
  numberOfRooms,
  adults,
  children,
  childAges,
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

  const childrenTreatedAsAdults = childAges.filter((age) => age > 10).length;
  const effectiveAdults = adults + childrenTreatedAsAdults;
  const childrenUnder10 = children - childrenTreatedAsAdults;
  const hasExtraAdult = effectiveAdults === roomType.maxOccupancy + 1;

  const basePrice = (roomType.offerPrice ?? roomType.basePriceCents) / 100;
  const originalBasePrice = roomType.basePriceCents / 100;
  const hasOffer = roomType.offerPrice != null;

  const roomSubtotal = basePrice * numberOfRooms * nights;
  const extraAdultPerNight = hasExtraAdult ? EXTRA_ADULT_CHARGE : 0;
  const extraAdultSubtotal = extraAdultPerNight * nights;
  const extraAdultTax = extraAdultSubtotal * EXTRA_ADULT_TAX_RATE;
  const grandTotal = roomSubtotal + extraAdultSubtotal + extraAdultTax;

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden">
      {/* Header */}
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

      {/* Hotel & Room */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-gray-900 capitalize">
            {hotel.name}
          </h3>
          <div className="inline-flex items-center bg-gray-50 capitalize text-primary px-3 py-1.5 rounded-md text-sm font-semibold">
            <span className="w-2 h-2 bg-primary rounded-full mr-2" />
            {roomType.name}
          </div>
        </div>
      </div>

      {/* Dates */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center p-4 bg-gray-50 rounded-md">
          <div className="bg-white p-2 rounded-md shadow-sm mr-4 shrink-0">
            <CalendarOutlined className="text-primary text-lg" />
          </div>
          <div className="flex justify-between w-full gap-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-0.5">
                Check-in
              </p>
              <p className="text-base font-semibold text-gray-900">
                {moment(checkIn).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="text-gray-300 self-center">→</div>
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 mb-0.5">
                Check-out
              </p>
              <p className="text-base font-semibold text-gray-900">
                {moment(checkOut).format("DD MMM YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Guests */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <TeamOutlined className="text-primary" />
          <h4 className="font-semibold text-gray-900">Guests & Rooms</h4>
        </div>
        <div className="space-y-2 text-sm font-dm-sans">
          <div className="flex justify-between text-gray-700">
            <span>Rooms</span>
            <span className="font-semibold">{numberOfRooms}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Adults</span>
            <span className="font-semibold">
              {effectiveAdults}
              {childrenTreatedAsAdults > 0 && (
                <span className="text-xs text-gray-400 ml-1">
                  (incl. {childrenTreatedAsAdults} child
                  {childrenTreatedAsAdults > 1 ? "ren" : ""} &gt;10 yrs)
                </span>
              )}
            </span>
          </div>
          {childrenUnder10 > 0 && (
            <div className="flex justify-between text-gray-700">
              <span>Children (under 10)</span>
              <span className="font-semibold">{childrenUnder10}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-700">
            <span>Duration</span>
            <span className="font-semibold">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          </div>
          {hasExtraAdult ? (
            <div className="flex items-center gap-2 mt-2 px-3 py-2 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              <UserOutlined />
              <span>
                1 extra adult accommodated in the same room — surcharge applies
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-primary font-bold text-base">₹</span>
          <h4 className="font-semibold text-gray-900">Price Breakdown</h4>
        </div>
        <div className="space-y-2 text-sm font-dm-sans">
          {/* Room rate line */}
          <div className="flex justify-between text-gray-700">
            <span className="flex-1">
              {hasOffer ? (
                <>
                  <span className="line-through text-gray-400 mr-1">
                    {formatCurrency(originalBasePrice, roomType.currencyCode)}
                  </span>
                  {formatCurrency(basePrice, roomType.currencyCode)}
                </>
              ) : (
                formatCurrency(basePrice, roomType.currencyCode)
              )}{" "}
              × {numberOfRooms} {numberOfRooms === 1 ? "room" : "rooms"} ×{" "}
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
            <span className="font-semibold ml-4 shrink-0">
              {formatCurrency(roomSubtotal, roomType.currencyCode)}
            </span>
          </div>

          {/* Extra adult charge */}
          {hasExtraAdult ? (
            <>
              <div className="flex justify-between text-amber-700">
                <span>
                  Extra adult charge (₹{EXTRA_ADULT_CHARGE.toLocaleString("en-IN")} × {nights}{" "}
                  {nights === 1 ? "night" : "nights"})
                </span>
                <span className="font-semibold ml-4 shrink-0">
                  {formatCurrency(extraAdultSubtotal, roomType.currencyCode)}
                </span>
              </div>
              <div className="flex justify-between text-amber-600 text-xs">
                <span>
                  GST on extra adult charge (
                  {(EXTRA_ADULT_TAX_RATE * 100).toFixed(0)}%)
                </span>
                <span className="font-medium ml-4 shrink-0">
                  + {formatCurrency(extraAdultTax, roomType.currencyCode)}
                </span>
              </div>
            </>
          ) : null}

          {/* Divider + Total */}
          <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between items-baseline">
            <div>
              <p className="font-bold text-gray-900 text-base">Total</p>
              <p className="text-xs text-gray-400">
                {hasExtraAdult
                  ? "Room taxes billed at check-in"
                  : "Taxes & fees billed at check-in"}
              </p>
            </div>
            <span className="text-2xl font-bold text-primary ml-4">
              {formatCurrency(grandTotal, roomType.currencyCode)}
            </span>
          </div>
        </div>
      </div>

      {/* Room Images */}
      {!!(roomType.images && roomType.images.length > 0) && (
        <div className="border-b border-gray-100">
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
      <div className="p-6 bg-gray-50">
        <div className="flex items-start">
          <div className="bg-white p-2 rounded-md shadow-sm mr-4 mt-1 shrink-0">
            <EnvironmentOutlined className="text-primary text-lg" />
          </div>
          <div className="flex-1">
            <h4 className="text-base font-bold text-gray-900 mb-1">
              Hotel Location
            </h4>
            <p className="text-gray-600 text-sm leading-relaxed">
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
