"use client";
import { RoomType, Addon } from "@/types/hotel";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Input, Divider } from "antd";

interface Step3PaymentDetailsProps {
  roomType: RoomType;
}

const formatCurrency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

const Step3PaymentDetails: React.FC<Step3PaymentDetailsProps> = ({
  roomType,
}) => {
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [totalAmount, setTotalAmount] = useState(roomType?.basePriceCents || 0);

  useEffect(() => {
    if (roomType?.basePriceCents) {
      setTotalAmount(roomType.basePriceCents);
    }
  }, [roomType?.basePriceCents]);

  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons((prev) =>
      prev.find((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  useEffect(() => {
    const addonsTotal = selectedAddons.reduce(
      (sum, addon) => sum + addon.priceCents,
      0
    );
    const basePrice = roomType?.basePriceCents || 0;
    setTotalAmount(basePrice + addonsTotal);
  }, [selectedAddons, roomType?.basePriceCents]);

  const handleSubmit = () => {
    console.log("Selected addons:", selectedAddons);
    console.log("Total amount:", totalAmount);
    // Handle payment submission
  };

  if (!roomType) {
    return <div>Loading room details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Payment Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-gray-600">
            <span>Room Rent</span>
            <span>
              {formatCurrency(
                roomType.basePriceCents || 0,
                roomType.currencyCode || "INR"
              )}
            </span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Tax</span>
            <span>TBD</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Other Fees</span>
            <span>TBD</span>
          </div>

          {selectedAddons.map((addon) => (
            <div
              key={addon.id}
              className="flex justify-between items-center text-gray-600"
            >
              <span>{addon.name}</span>
              <span>
                + {formatCurrency(addon.priceCents, addon.currencyCode)}
              </span>
            </div>
          ))}
        </div>

        <Divider />

        <div className="flex justify-between items-center font-bold text-lg text-gray-800">
          <span>Total</span>
          <span>
            {formatCurrency(totalAmount, roomType.currencyCode || "INR")}
          </span>
        </div>
      </div>

      {/* Optional Add-ons */}
      {roomType?.addons?.length && roomType?.addons?.length > 0 ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Optional Add-ons
          </h3>
          <div className="space-y-2">
            {roomType.addons.map((addon) => (
              <Checkbox
                key={addon.id}
                onChange={() => handleAddonToggle(addon)}
              >
                {addon.name} -{" "}
                <span className="font-semibold">
                  {formatCurrency(addon.priceCents, addon.currencyCode)}
                </span>
              </Checkbox>
            ))}
          </div>
        </div>
      ) : null}

      {/* Promo Code */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Promo Code</h3>
        <div className="flex gap-2">
          <Input placeholder="Enter promo code" />
          <Button type="primary" className="!bg-primary">
            Apply
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button size="large" className="flex-1">
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          size="large"
          className="flex-1 !bg-primary"
        >
          Book now
        </Button>
      </div>
    </div>
  );
};

export default Step3PaymentDetails;
