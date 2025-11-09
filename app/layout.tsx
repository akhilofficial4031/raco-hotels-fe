import type { Metadata } from "next";
import { Montserrat, Cinzel, DM_Sans } from "next/font/google";
import Head from "next/head";
import "../font-awesome-4.7.0/css/font-awesome.css";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
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
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <SmoothScroll>{children}</SmoothScroll>
        <Footer />
      </body>
    </html>
  );
}
