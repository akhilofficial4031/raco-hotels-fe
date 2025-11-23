import { HotelNavItem } from "@/types/hotel";
import Header from "./Header";

interface HeaderWrapperProps {
  hotels: HotelNavItem[];
}

const HeaderWrapper = async ({ hotels }: HeaderWrapperProps) => {
  return <Header hotels={hotels} />;
};

export default HeaderWrapper;
