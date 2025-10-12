import { generateHotelsPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import HotelList from "./components/HotelList";

export const metadata: Metadata = generateHotelsPageMetadata();

export default function HotelsPage() {
  return <HotelList />;
}
