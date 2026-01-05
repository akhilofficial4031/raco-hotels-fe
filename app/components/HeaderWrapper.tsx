import { HotelNavItem } from "@/types/hotel";
import Header from "./Header";
import { TopBannerContent } from "@/types/landing-page";

interface HeaderWrapperProps {
  hotels: HotelNavItem[];
  topBannerContent: TopBannerContent;
}

const HeaderWrapper = async ({
  hotels,
  topBannerContent,
}: HeaderWrapperProps) => {
  return <Header hotels={hotels} topBannerContent={topBannerContent} />;
};

export default HeaderWrapper;
