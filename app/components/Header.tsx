"use client";

import { HotelNavItem, NavLink } from "@/types/hotel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  hotels?: HotelNavItem[];
}

const Header = ({ hotels = [] }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    { href: "/about", label: "About" },
    {
      href: "/hotels",
      label: "Our Properties",
      dropdown:
        hotelDropdownItems.length > 0
          ? hotelDropdownItems
          : [{ href: "/hotels", label: "View All Properties" }],
    },
    {
      href: "#",
      label: "Dining & Experiences",
      dropdown: [
        { href: "/dining", label: "Dining" },
        { href: "/experiences", label: "Experiences" },
      ],
    },
    { href: "/offers", label: "Offers" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="bg-white text-gray-800 shadow-md dm-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Raco Hotels"
                width={120}
                height={40}
              />
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center space-x-8"
            ref={dropdownRef}
          >
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="relative">
                  <button
                    onClick={() => handleDropdownToggle(link.label)}
                    className="flex items-center hover:text-primary transition-colors focus:outline-none"
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
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary first:rounded-t-md last:rounded-b-md"
                          onClick={() => setOpenDropdown(null)}
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
                  className="hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-primary text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity">
              Book Now
            </button>
            <div className="flex items-center space-x-2">
              <Image src="/globe.svg" alt="Language" width={20} height={20} />
              <span>Eng</span>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-white hover:bg-gray-700"
              >
                {link.label}
              </Link>
            ))}
            <button className="w-full text-left bg-primary text-white px-4 py-3 rounded-md hover:opacity-90 transition-opacity mt-4">
              Book Now
            </button>
            <div className="flex items-center space-x-2 px-3 py-2">
              <Image src="/globe.svg" alt="Language" width={20} height={20} />
              <span>Eng</span>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
