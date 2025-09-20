import { PaginationResponse } from "./api";

export interface LocationImage {
  url: string;
  alt: string;
}

export interface LocationInfo {
  heading: string;
  subHeading: string;
  bulletPoints: string[];
  description: string;
  images: LocationImage[];
}

export interface Image {
  id: number;
  hotelId: number;
  url: string;
  alt: string;
  sortOrder: number;
  createdAt: string;
}

export interface Feature {
  id: number;
  code: string;
  name: string;
  description: string;
  isVisible: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Amenity {
  id: number;
  code: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: number;
  name: string;
  slug: string;
  description: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  starRating: number;
  checkInTime: string;
  checkOutTime: string;
  locationInfo: LocationInfo[];
  isActive: number;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  features: Feature[];
  amenities: Amenity[];
}

export interface HotelResponse {
  pagination: PaginationResponse;
  hotels: Hotel[];
}

export interface HotelDetailsResponse {
  hotel: Hotel;
}
