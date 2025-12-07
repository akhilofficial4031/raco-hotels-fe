"use client";

import "@ant-design/v5-patch-for-react-19";
import QuickBooking from "@/app/components/QuickBooking";
import { HotelNavItem } from "@/types/hotel";
import { createContext, useContext, useState, ReactNode } from "react";

interface QuickBookingContextType {
  openModal: () => void;
}

const QuickBookingContext = createContext<QuickBookingContextType | undefined>(
  undefined
);

export const useQuickBooking = () => {
  const context = useContext(QuickBookingContext);
  if (!context) {
    throw new Error(
      "useQuickBooking must be used within a QuickBookingProvider"
    );
  }
  return context;
};

interface QuickBookingProviderProps {
  children: ReactNode;
  hotels: HotelNavItem[];
}

export const QuickBookingProvider = ({
  children,
  hotels,
}: QuickBookingProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <QuickBookingContext.Provider value={{ openModal }}>
      {children}
      <QuickBooking
        open={isModalOpen}
        onClose={closeModal}
        hotels={hotels}
      />
    </QuickBookingContext.Provider>
  );
};
