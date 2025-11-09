import type { Metadata } from "next";
import { Montserrat, Cinzel, DM_Sans } from "next/font/google";
import Head from "next/head";
import "../font-awesome-4.7.0/css/font-awesome.css";
import Footer from "./components/Footer";
import HeaderWrapper from "./components/HeaderWrapper";
import SmoothScroll from "./components/SmoothScroll";
import { WebVitals } from "./components/WebVitals";
import ResourceHints from "./components/ResourceHints";
import { getHotelsForNavigation } from "@/lib/hotels";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raco Hotels - Luxury Accommodations & Premium Hotel Bookings",
  description:
    "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels - luxury accommodations, exclusive deals, and exceptional service across our hotel group.",
  keywords: [
    "hotels",
    "luxury hotels",
    "hotel booking",
    "accommodations",
    "travel",
    "vacation",
    "business travel",
    "hotel reservations",
    "premium hotels",
    "hotel deals",
    "Raco Hotels",
  ],
  authors: [{ name: "Raco Hotels" }],
  openGraph: {
    title: "Raco Hotels - Luxury Accommodations & Premium Hotel Bookings",
    description:
      "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels - luxury accommodations, exclusive deals, and exceptional service across our hotel group.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com",
    siteName: "Raco Hotels",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raco Hotels - Luxury Accommodations & Premium Hotel Bookings",
    description:
      "Discover amazing hotels in premium locations worldwide. Book your perfect stay with Raco Hotels.",
    creator: "@racohotels",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "format-detection": "telephone=no",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B5CF6",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch hotels data once for both Header and Footer
  const hotels = await getHotelsForNavigation();

  return (
    <html lang="en">
      <Head>
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com"}
        />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </Head>
      <body
        className={`${montserrat.variable} ${cinzel.variable} ${dmSans.variable}`}
      >
        <WebVitals />
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Skip to main content
        </a>
        <HeaderWrapper hotels={hotels} />
        <SmoothScroll>
          <div id="main-content">{children}</div>
        </SmoothScroll>
        <Footer hotels={hotels} />
      </body>
    </html>
  );
}
