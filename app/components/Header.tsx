"use client";

import { HotelNavItem, NavLink } from "@/types/hotel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useQuickBooking } from "@/contexts/QuickBookingContext";
// import { TopBannerContent } from "@/types/landing-page";
// import TopBanner from "./TopBanner";
import { usePathname } from "next/navigation";
import { TopBannerContent } from "@/types/landing-page";
import TopBanner from "./TopBanner";

interface HeaderProps {
  hotels?: HotelNavItem[];
  topBannerContent: TopBannerContent;
}

const Header = ({ hotels = [], topBannerContent }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { openModal, openAttractionModal } = useQuickBooking();
  const pathname = usePathname();

  // Check if we're on an attraction page (pattern: /hotels/[slug]/[attraction])
  const isAttractionPage = /^\/hotels\/[^\/]+\/[^\/]+$/.test(pathname);

  const handleBookingClick = () => {
    if (isAttractionPage) {
      openAttractionModal();
    } else {
      openModal();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Generate hotel dropdown items from API data
  const hotelDropdownItems = hotels.map((hotel) => ({
    href: `/hotels/${hotel.slug}`,
    label: `${hotel.name} - ${hotel.city}, ${hotel.state}`,
  }));

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    {
      href: "/hotels",
      label: "Our Properties",
      dropdown:
        hotelDropdownItems.length > 0
          ? hotelDropdownItems
          : [{ href: "/hotels", label: "View All Properties" }],
    },

    // { href: "/offers", label: "Offers" },
    { href: "/contact", label: "Contact" },
  ];

  // const topBannerContent: TopBannerContent = {
  //   isVisible: true,
  //   text: "Escape the ordinary — book your perfect stay now",
  //   linkText: "Book Now",
  //   onClick: openModal,
  // };

  return (
    <div className="sticky w-full top-0 z-[99]">
      {topBannerContent.isVisible ? (
        <TopBanner content={topBannerContent} />
      ) : null}

      <header className="bg-white text-gray-800 dm-sans" role="banner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center"
                aria-label="Raco Hotels Home"
              >
                <Image
                  src="/raco-logo.png"
                  alt="Raco Hotels Logo"
                  width={80}
                  height={30}
                  priority
                />
              </Link>
            </div>

            <nav
              className="hidden md:flex items-center space-x-8"
              ref={dropdownRef}
              role="navigation"
              aria-label="Main navigation"
            >
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="relative">
                    <button
                      onClick={() => handleDropdownToggle(link.label)}
                      className="flex cursor-pointer items-center hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                      aria-label={`${link.label} menu`}
                    >
                      {link.label}
                      <svg
                        className={`w-4 h-4 ml-1 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <div
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10"
                        role="menu"
                        aria-label={`${link.label} submenu`}
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            className="block cursor-pointer capitalize px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary first:rounded-t-md last:rounded-b-md"
                            onClick={() => setOpenDropdown(null)}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={handleBookingClick}
                className="btn-primary"
                aria-label="Book a hotel room now"
              >
                {isAttractionPage ? "Inquire Now" : "Book Now"}
              </button>
              {/* <div className="flex items-center space-x-2">
              <Image
                src="/globe.svg"
                alt=""
                width={20}
                height={20}
                aria-hidden="true"
              />
              <span aria-label="Language: English">Eng</span>
            </div> */}
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-expanded={isMobileMenuOpen}
                aria-label={
                  isMobileMenuOpen ? "Close main menu" : "Open main menu"
                }
              >
                <span className="sr-only">
                  {isMobileMenuOpen ? "Close menu" : "Open menu"}
                </span>
                {isMobileMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <div
            className="md:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={openModal}
                className="w-full text-left bg-primary text-white px-4 py-3 rounded-md hover:opacity-90 transition-opacity mt-4 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Book a hotel room now"
              >
                Book Now
              </button>
              <div className="flex items-center space-x-2 px-3 py-2">
                <Image
                  src="/globe.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
                <span aria-label="Language: English">Eng</span>
              </div>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  );
};

export default Header;
