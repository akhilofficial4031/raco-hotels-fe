"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const quickLinks = [
    { href: "/about", label: "About" },
    { href: "/properties", label: "Properties" },
    { href: "/offers", label: "Offers" },
    { href: "/contact", label: "Contact" },
  ];

  const stayWithUsLinks = [
    { href: "/rooms-suites", label: "Rooms & Suites" },
    { href: "/dining", label: "Dining" },
    { href: "/spa-wellness", label: "Spa & Wellness" },
  ];

  const discoverLinks = [
    { href: "/attractions", label: "Attractions Nearby" },
    { href: "/experiences", label: "Experiences & Tours" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog / Travel Guide" },
  ];

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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 w-full bg-footer-dark-bg rounded-4xl mb-12">
          <div className="p-8 items-center justify-center mb-12  col-span-2">
            <div className="flex-grow text-center md:text-left mb-6 md:mb-0">
              <p
                className="font-semibold tracking-wider uppercase mb-4 font-cinzel text-2xl"
                role="doc-subtitle"
              >
                <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text">
                  DO YOU NEED HELP?
                </span>
              </p>
              <p className="text-gray-300">
                In a world that moves too fast, we believe in the art of slow
                living. Natural textures, warm lighting, and thoughtful spaces
                create an atmosphere of comfort and timeless elegance.
              </p>
            </div>
          </div>
          <div className="flex bg-footer-cta-bg items-center rounded-l-[72px] justify-center rounded-r-4xl relative">
            {/* <div className="bg-footer-cta-bg rounded-l-full h-[400px] w-40 absolute -left-10" /> */}
            <button className="px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-transform transform hover:scale-105 text-white">
              Get consultation <i className="fa fa-arrow-right" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-gray-800">
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

          <nav aria-labelledby="stay-with-us-heading">
            <h3
              id="stay-with-us-heading"
              className="font-bold mb-4 text-sm uppercase"
            >
              Stay with us
            </h3>
            <ul className="space-y-3">
              {stayWithUsLinks.map((link) => (
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

          <nav aria-labelledby="discover-heading">
            <h3
              id="discover-heading"
              className="font-bold mb-4 text-sm uppercase"
            >
              Discover
            </h3>
            <ul className="space-y-3">
              {discoverLinks.map((link) => (
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

          <div className="col-span-2 md:col-span-1 flex flex-col items-start md:items-end text-left md:text-right">
            <Link href="/" className="mb-4" aria-label="Raco Hotels Home">
              <Image
                src="/logo.png"
                alt="Raco Hotels Logo"
                width={120}
                height={40}
              />
            </Link>
            <div className="mt-auto">
              <p className="text-sm">+91 981 981-23-19</p>
              <p className="text-sm">hello@racogroup.com</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-gray-600">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              Instagram <i className="fa fa-instagram" />
            </Link>
            <Link
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-primary"
            >
              Whatsapp <i className="fa fa-whatsapp" />
            </Link>
          </div>
          <p className="text-sm">&copy; 2025 — Copyright</p>
        </div>
      </div>
      {isVisible ? (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-50"
          aria-label="Go to top"
        >
          <i className="fa fa-arrow-up text-primary" />
        </button>
      ) : null}
    </footer>
  );
};

export default Footer;
