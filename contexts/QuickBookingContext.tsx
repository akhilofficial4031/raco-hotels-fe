"use client";

import AttractionEnquiry from "@/app/(features)/hotels/[slug]/[attraction]/components/AttractionEnquiry";
import QuickBooking from "@/app/components/QuickBooking";
import { HotelNavItem } from "@/types/hotel";
import { createContext, useContext, useState, ReactNode } from "react";

interface QuickBookingContextType {
  openModal: () => void;
  openAttractionModal: () => void;
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
  const [isAttractionModalOpen, setIsAttractionModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openAttractionModal = () => setIsAttractionModalOpen(true);
  const closeAttractionModal = () => setIsAttractionModalOpen(false);

  return (
    <QuickBookingContext.Provider value={{ openModal, openAttractionModal }}>
      {children}
      <QuickBooking open={isModalOpen} onClose={closeModal} hotels={hotels} />
      <AttractionEnquiry
        open={isAttractionModalOpen}
        onClose={closeAttractionModal}
      />
    </QuickBookingContext.Provider>
  );
};
