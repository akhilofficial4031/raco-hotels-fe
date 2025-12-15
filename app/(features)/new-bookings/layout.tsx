import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking | Raco Hotels",
  description: "Complete your hotel booking at Raco Hotels.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

