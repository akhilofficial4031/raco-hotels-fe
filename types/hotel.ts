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

export interface Addon {
  id: number;
  name: string;
  description: string;
  priceCents: number;
  currencyCode: string;
}

export interface HotelResponse {
  pagination: PaginationResponse;
  hotels: Hotel[];
}

export interface HotelDetailsResponse {
  hotel: Hotel;
}

// Navigation-specific types for header dropdown
export interface HotelNavItem {
  id: number;
  name: string;
  slug: string;
  city: string;
  state: string;
}

export interface NavLink {
  href: string;
  label: string;
  dropdown?: Array<{
    href: string;
    label: string;
  }>;
}

export interface RoomImage {
  id: number;
  roomTypeId: number;
  url: string;
  alt: string;
  sortOrder: number;
  createdAt: string;
}

export interface RoomAmenity {
  amenityId: number;
  roomTypeId: number;
  createdAt: string;
}

export interface Room {
  id: number;
  hotelId: number;
  roomTypeId: number;
  roomNumber: string;
  floor: string;
  description: string;
  status: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  roomType: {
    id: number;
    name: string;
  };
}

export interface RoomType {
  id: number;
  hotelId: number;
  name: string;
  slug: string;
  description: string;
  baseOccupancy: number;
  maxOccupancy: number;
  basePriceCents: number;
  currencyCode: string;
  sizeSqft: number;
  bedType: string;
  smokingAllowed: number;
  totalRooms: number;
  isActive: number;
  createdAt: string;
  updatedAt: string;
  images: RoomImage[];
  amenities: RoomAmenity[];
  rooms: Room[];
  addons?: Addon[];
}

export interface RoomTypesData {
  roomTypes: RoomType[];
  message: string;
}

export interface RoomTypesApiResponse {
  success: boolean;
  data: RoomTypesData;
}

export interface AvailableRoom {
  id: number;
  hotelId: number;
  roomTypeId: number;
  roomNumber: string;
  floor: string;
  description: string;
  status: string;
  isActive: number;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilityData {
  results: AvailableRoom[];
  message: string;
}

export interface AvailabilityApiResponse {
  success: boolean;
  data: AvailabilityData;
}

export interface AvailableRoomDetails {
  roomId: number;
  roomNumber: string;
  floor: string;
  roomDescription: string;
  status: string;
}

export interface AvailableRoomType {
  roomTypeId: number;
  roomTypeName: string;
  roomTypeSlug: string;
  description: string;
  baseOccupancy: number;
  maxOccupancy: number;
  basePriceCents: number;
  currencyCode: string;
  sizeSqft: number;
  bedType: string;
  smokingAllowed: boolean;
  totalRooms: number;
  availableRooms: number;
  images: RoomImage[];
  rooms: AvailableRoomDetails[];
}

export interface AvailableRoomTypesData {
  hotelId: number;
  checkInDate: string;
  checkOutDate: string;
  roomTypes: AvailableRoomType[];
  totalRoomTypesAvailable: number;
}

export interface AvailableRoomTypesApiResponse {
  success: boolean;
  data: AvailableRoomTypesData;
  message: string;
}
