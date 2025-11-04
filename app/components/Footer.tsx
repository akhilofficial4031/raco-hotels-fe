import Image from "next/image";
import Link from "next/link";
import { HotelNavItem } from "@/types/hotel";

interface FooterProps {
  hotels: HotelNavItem[];
}

const Footer = ({ hotels }: FooterProps) => {
  const currentYear = new Date().getFullYear();

  // Generate hotel links from API data
  const ourPropertiesLinks = hotels.map((hotel) => ({
    href: `/hotels/${hotel.slug}`,
    label: `${hotel.name} - ${hotel.city}, ${hotel.state}`,
  }));

  const quickLinks = [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/offers", label: "Special Offers" },
    { href: "/dining", label: "Dining" },
    { href: "/experiences", label: "Experiences" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="bg-gray-800 text-white dm-sans" role="contentinfo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and About */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-4" aria-label="Raco Hotels Home">
              <Image
                src="/logo.png"
                alt="Raco Hotels Logo"
                width={150}
                height={50}
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Discover and book exclusive luxury hotels around the world.
              Experience unparalleled service and comfort with Raco Hotels.
            </p>
          </div>

          {/* Column 2: Our Properties */}
          <nav aria-labelledby="properties-heading">
            <h3 id="properties-heading" className="text-lg font-semibold mb-4">
              Our Properties
            </h3>
            <ul className="space-y-2">
              {ourPropertiesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm capitalize"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/hotels"
                  className="text-white hover:text-gray-300 transition-colors text-sm font-semibold"
                >
                  View All Properties &rarr;
                </Link>
              </li>
            </ul>
          </nav>

          {/* Column 3: Quick Links */}
          <nav aria-labelledby="quick-links-heading">
            <h3 id="quick-links-heading" className="text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Contact and Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-400 text-sm mb-4">
              123 Luxury Lane, Suite 500
              <br />
              New York, NY 10001, USA
            </p>
            <p className="text-gray-400 text-sm mb-4">
              <a
                href="mailto:contact@racohotels.com"
                className="hover:text-white transition-colors"
              >
                contact@racohotels.com
              </a>
              <br />
              <a
                href="tel:+12125551234"
                className="hover:text-white transition-colors"
              >
                +1 (212) 555-1234
              </a>
            </p>
            <nav aria-label="Social media links">
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/racohotels"
                  aria-label="Follow us on Facebook"
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa fa-facebook-f"
                    style={{ fontSize: "20px" }}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://twitter.com/racohotels"
                  aria-label="Follow us on Twitter"
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa fa-twitter"
                    style={{ fontSize: "20px" }}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://instagram.com/racohotels"
                  aria-label="Follow us on Instagram"
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa fa-instagram"
                    style={{ fontSize: "20px" }}
                    aria-hidden="true"
                  />
                </a>
                <a
                  href="https://linkedin.com/company/racohotels"
                  aria-label="Follow us on LinkedIn"
                  className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa fa-linkedin"
                    style={{ fontSize: "20px" }}
                    aria-hidden="true"
                  />
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} Raco Hotels. All rights reserved.</p>
          <nav aria-label="Legal links" className="mt-4">
            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
            >
              Privacy Policy
            </Link>
            <span className="mx-2" aria-hidden="true">
              |
            </span>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
            >
              Terms of Service
            </Link>
            <span className="mx-2" aria-hidden="true">
              |
            </span>
            <Link
              href="/accessibility"
              className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-800 rounded px-2 py-1"
            >
              Accessibility
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
