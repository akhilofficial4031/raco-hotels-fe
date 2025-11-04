import { HotelNavItem } from "@/types/hotel";
import Header from "./Header";

interface HeaderWrapperProps {
  hotels: HotelNavItem[];
}

/**
 * Server component wrapper for Header that accepts hotels data as props
 * Hotels data is now fetched at the layout level to avoid duplicate API calls
 */
export default function HeaderWrapper({ hotels }: HeaderWrapperProps) {
  return <Header hotels={hotels} />;
}
