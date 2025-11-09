 
"use client";

import { RoomType } from "@/types/hotel";
import React from "react";
import { Button, Modal } from "antd";
import RoomImageCarousel from "./RoomImageCarousel";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

interface AvailableRoomsModalProps {
  open: boolean;
  onClose: () => void;
  roomTypes: RoomType[];
  onProceedToBooking: (roomType: RoomType) => void;
}

const AvailableRoomsModal: React.FC<AvailableRoomsModalProps> = ({
  open,
  onClose,
  roomTypes,
  onProceedToBooking,
}) => {
  return (
    <Modal
      title="Available Rooms"
      open={open}
      onCancel={onClose}
      footer={null}
      width={1200}
      centered
    >
      <div className="space-y-8 max-h-[70vh] overflow-y-auto p-4">
        {roomTypes.map((roomType) => (
          <div
            key={roomType.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex"
          >
            <div className="relative w-1/3">
              {roomType.images && roomType.images.length > 1 ? (
                <RoomImageCarousel slides={roomType.images} />
              ) : (
                <Image
                  src={getImageUrl(roomType.images[0]?.url)}
                  alt={roomType.images[0]?.alt ?? roomType.name}
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            <div className="p-6 w-2/3 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold font-serif text-primary">
                  {roomType.name}
                </h3>
                <p className="mt-2 text-gray-600 font-sans">
                  {roomType.description}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                  <div className="flex items-center">
                    <i className="fa fa-users mr-2 text-primary" />
                    <span>
                      Sleeps {roomType.baseOccupancy} - {roomType.maxOccupancy}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa fa-bed mr-2 text-primary" />
                    <span>{roomType.bedType}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fa fa-expand mr-2 text-primary" />
                    <span>{roomType.sizeSqft} sqft</span>
                  </div>
                  <div className="flex items-center">
                    <i
                      className={`fa ${
                        roomType.smokingAllowed
                          ? "fa-smoking"
                          : "fa-smoking-ban"
                      } mr-2 text-primary`}
                    />
                    <span>
                      {roomType.smokingAllowed ? "Smoking" : "Non-Smoking"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <p className="text-2xl font-bold text-primary">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: roomType.currencyCode,
                    minimumFractionDigits: 0,
                  }).format(roomType.basePriceCents / 100)}
                  <span className="text-sm font-normal text-gray-500">
                    /night
                  </span>
                </p>
                <Button
                  type="primary"
                  onClick={() => onProceedToBooking(roomType)}
                  className="!bg-primary !text-white hover:!bg-primary/90"
                >
                  Proceed to Booking
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default AvailableRoomsModal;
