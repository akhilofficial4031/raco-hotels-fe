"use client";
import { RoomType, Addon } from "@/types/hotel";
import React, { useEffect } from "react";
import { Button, Checkbox, Input, Divider } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { BookingFormValues } from "../form-schema";

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
  const { control, watch, setValue } = useFormContext<BookingFormValues>();
  const selectedAddons: Addon[] = watch("addons", []);
  const totalAmount = watch("totalAmount", roomType?.basePriceCents || 0);

  useEffect(() => {
    const addonsTotal = selectedAddons.reduce(
      (sum, addon) => sum + addon.priceCents,
      0
    );
    const basePrice = roomType?.basePriceCents || 0;
    setValue("totalAmount", basePrice + addonsTotal);
  }, [selectedAddons, roomType?.basePriceCents, setValue]);

  const handleAddonToggle = (addon: Addon) => {
    const currentAddons: Addon[] = selectedAddons || [];
    const addonIndex = currentAddons.findIndex((a) => a.id === addon.id);
    if (addonIndex > -1) {
      setValue(
        "addons",
        currentAddons.filter((a) => a.id !== addon.id)
      );
    } else {
      setValue("addons", [...currentAddons, addon]);
    }
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
                +{" "}
                {formatCurrency(addon.priceCents, addon.currencyCode || "INR")}
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
                checked={selectedAddons.some((a) => a.id === addon.id)}
              >
                {addon.name} -{" "}
                <span className="font-semibold">
                  {formatCurrency(
                    addon.priceCents,
                    addon.currencyCode || "INR"
                  )}
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
          <Controller
            name="promoCode"
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder="Enter promo code" />
            )}
          />
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
          htmlType="submit"
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
