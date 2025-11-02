"use client";
import { RoomType, Addon } from "@/types/hotel";
import React, { useState, useEffect } from "react";
import { Button, Checkbox, Input, Divider } from "antd";

interface PaymentDetailsProps {
  roomType: RoomType;
}

const formatCurrency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ roomType }) => {
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

  if (!roomType) {
    return (
      <div className="bg-white p-6 rounded-lg dm-sans">
        <h2 className="text-2xl font-serif text-primary mb-4">
          Payment Summary
        </h2>
        <p>Loading room details...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dm-sans">
      <h2 className="text-2xl font-serif text-primary mb-4">Payment Summary</h2>
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
          <span>TBD</span> {/* Placeholder */}
        </div>
        <div className="flex justify-between items-center text-gray-600">
          <span>Other Fees</span>
          <span>TBD</span> {/* Placeholder */}
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

      <div className="flex justify-between items-center font-bold text-lg text-primary">
        <span>Total</span>
        <span>
          {formatCurrency(totalAmount, roomType.currencyCode || "INR")}
        </span>
      </div>

      {roomType?.addons?.length && roomType?.addons?.length > 0 ? (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-primary mb-2 font-serif">
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

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-primary mb-2 font-serif">
          Promo Code
        </h3>
        <div className="flex gap-2">
          <Input placeholder="Enter promo code" />
          <Button type="primary" className="!bg-primary">
            Apply
          </Button>
        </div>
      </div>

      <Button type="primary" size="large" className="w-full mt-6 !bg-primary">
        Proceed to Payment
      </Button>
    </div>
  );
};

export default PaymentDetails;
