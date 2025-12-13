import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Montserrat, Cinzel, DM_Sans, Dancing_Script } from "next/font/google";
import Head from "next/head";
import "../font-awesome-4.7.0/css/font-awesome.css";
import Footer from "./components/Footer";
import HeaderWrapper from "./components/HeaderWrapper";
import SmoothScroll from "./components/SmoothScroll";
import { WebVitals } from "./components/WebVitals";
import { getHotelsForNavigation } from "@/lib/hotels";
import { QuickBookingProvider } from "@/contexts/QuickBookingContext";
import "./globals.css";
import ResourceHints from "./components/ResourceHints";

const montserrat = Montserrat({
  variable: "--font-montserrat",
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

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://raco-hotels.com"
  ),
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
}: {
  children: React.ReactNode;
}) {
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
        className={`${montserrat.variable} ${cinzel.variable} ${dmSans.variable} ${dancingScript.variable} min-h-screen`}
      >
        <QuickBookingProvider hotels={hotels}>
          <SmoothScroll>
            <ResourceHints />
            <WebVitals />
            <HeaderWrapper hotels={hotels} />
            <main>{children}</main>
            <Footer />
          </SmoothScroll>
        </QuickBookingProvider>
      </body>
    </html>
  );
}
