import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Available Rooms | Raco Hotels",
  description: "Browse available rooms for your selected dates.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function AvailableRoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

