"use client";
import { useQuickBooking } from "@/contexts/QuickBookingContext";
import {
  FooterContactContent,
  FooterContactContentPages,
  FooterImagePath,
} from "@/lib/footer";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { openModal, openAttractionModal } = useQuickBooking();
  const router = useRouter();

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const pathname = usePathname();
  const isAttractionPage = /^\/hotels\/[^\/]+\/[^\/]+$/.test(pathname);

  const footerContactContentPage = (): string => {
    if (pathname === "/") {
      return FooterContactContentPages.HOME;
    } else if (pathname.includes(FooterContactContentPages.RACO_REGENCY)) {
      return FooterContactContentPages.RACO_REGENCY;
    } else if (
      pathname.includes(FooterContactContentPages.RACO_CYBER_RESIDENCY)
    ) {
      return FooterContactContentPages.RACO_CYBER_RESIDENCY;
    } else {
      return FooterContactContentPages.HOME;
    }
  };

  const footerImagePath = (): string => {
    if (pathname === "/") {
      return FooterImagePath.home;
    } else if (pathname.includes(FooterContactContentPages.RACO_REGENCY)) {
      return FooterImagePath["raco-regency"];
    } else if (
      pathname.includes(FooterContactContentPages.RACO_CYBER_RESIDENCY)
    ) {
      return FooterImagePath["raco-cyber-residency"];
    }
    return FooterImagePath.home;
  };

  const handleBookingClick = () => {
    if (isAttractionPage) {
      openAttractionModal();
    } else {
      openModal();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const quickLinks = [
    { href: "/hotels", label: "Properties" },
    { href: "/contact", label: "Contact" },
  ];

  // const stayWithUsLinks = [
  //   { href: "/rooms-suites", label: "Rooms & Suites" },
  //   { href: "/dining", label: "Dining" },
  //   { href: "/spa-wellness", label: "Spa & Wellness" },
  // ];

  // const discoverLinks = [
  //   { href: "/attractions", label: "Attractions Nearby" },
  //   { href: "/experiences", label: "Experiences & Tours" },
  //   { href: "/gallery", label: "Gallery" },
  //   { href: "/blog", label: "Blog / Travel Guide" },
  // ];

  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ];

  return (
    <footer
      className="text-white dm-sans border-t border-gray-300"
      style={{ backgroundColor: "var(--color-background-light)" }}
      role="contentinfo"
    >
      <div
        className={`relative bg-[url(${footerImagePath()})] bg-cover bg-center h-96 w-full flex items-center justify-center`}
      >
        <img
          src={footerImagePath()}
          alt="Footer Image"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="bg-black/50 absolute top-0 left-0 w-full h-full" />
        <div className="relative z-10 flex flex-col items-center justify-center gap-4">
          <p className="text-white text-5xl font-cinzel text-center">
            Your next unforgettable
            <br /> escape awaits.
          </p>
          <button className="btn-primary" onClick={handleBookingClick}>
            {isAttractionPage ? "Inquire Now" : "Book Now"}
          </button>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8 mt-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full bg-footer-dark-bg rounded-4xl mb-12">
          <div className="p-8 items-center justify-center mb-12  col-span-2">
            <div className="flex-grow text-center md:text-left mb-6 md:mb-0">
              <p
                className="font-semibold tracking-wider uppercase mb-4 font-cinzel text-2xl"
                role="doc-subtitle"
              >
                <span className="text-white">Empowering Your Journey</span>
              </p>
              <p className="text-gray-300">
                {
                  FooterContactContent[
                    footerContactContentPage() as keyof typeof FooterContactContent
                  ]
                }
              </p>
            </div>
          </div>
          <div className="flex bg-footer-cta-bg items-center rounded-l-[72px] justify-center rounded-r-4xl relative">
            {/* <div className="bg-footer-cta-bg rounded-l-full h-[400px] w-40 absolute -left-10" /> */}
            <button
              onClick={() => router.push("/contact")}
              className="px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 text-text-dark"
            >
              Contact Us <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mt-18 text-gray-800">
          <nav aria-labelledby="quick-links-heading">
            <h3
              id="quick-links-heading"
              className="font-bold mb-4 text-sm uppercase"
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-labelledby="legal-heading">
            <h3 id="legal-heading" className="font-bold mb-4 text-sm uppercase">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="stay-with-us-heading">
            <h3
              id="stay-with-us-heading"
              className="font-bold mb-4 text-sm uppercase"
            >
              {/* Stay with us */}
            </h3>
            <ul className="space-y-3">
              {/* {stayWithUsLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))} */}
            </ul>
          </nav>

          <nav aria-labelledby="discover-heading">
            <h3
              id="discover-heading"
              className="font-bold mb-4 text-sm uppercase"
            >
              {/* Discover */}
            </h3>
            <ul className="space-y-3">
              {/* {discoverLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))} */}
            </ul>
          </nav>

          <div className="col-span-2 md:col-span-1 flex flex-col items-start md:items-end text-left md:text-right">
            <Link href="/" className="mb-4" aria-label="Raco Hotels Home">
              <Image
                src="/raco-logo.png"
                alt="Raco Hotels Logo"
                width={120}
                height={40}
              />
            </Link>
            <div className="mt-auto">
              <p className="text-sm">092490 97929</p>
              <p className="text-sm">racohotelgroup@gmail.com</p>
            </div>
          </div>
        </div>

        <div className="pt-8 items-center text-gray-600 mt-[100px]">
          <div className="grid grid-cols-3 gap-18 mb-18">
            <div className="border-t border-gray-300 pt-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary"
              >
                <span className="flex justify-between w-full">
                  Instagram <i className="fa fa-instagram" />
                </span>
              </Link>
            </div>
            <div className="border-t border-gray-300 pt-4">
              <Link
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary"
              >
                <span className="flex justify-between w-full">
                  Whatsapp <i className="fa fa-whatsapp" />
                </span>
              </Link>
            </div>
            <div />
          </div>
          <p className="text-sm mt-18">&copy; 2025 — Copyright</p>
        </div>
      </div>
      {isVisible ? (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-transparent border w-10 h-10 border-gray-500  rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-50"
          aria-label="Go to top"
        >
          <i className="fa fa-arrow-up !font-light text-gray-500" />
        </button>
      ) : null}
    </footer>
  );
};

export default Footer;
