"use client";
import { RoomType } from "@/types/hotel";
import React, { useEffect } from "react";
import { Button, Checkbox, Input, Divider } from "antd";
import { useFormContext, Controller } from "react-hook-form";
import { BookingFormValues } from "../form-schema";

interface Step3PaymentDetailsProps {
  roomType: RoomType;
  isSubmitting?: boolean;
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
  isSubmitting = false,
}) => {
  const { control, watch, setValue } = useFormContext<BookingFormValues>();
  const selectedAddonIds: number[] = watch("addons", []);
  const totalAmount = watch("totalAmount", roomType?.basePriceCents ?? 0);
  const taxAmount = watch("taxAmount", 0);

  useEffect(() => {
    const TAX_RATE = 0.18;
    const addonsTotal = selectedAddonIds.reduce((sum, addonId) => {
      const addon = roomType.addons?.find((a) => a.id === addonId);
      return sum + (addon?.priceCents ?? 0);
    }, 0);

    const basePrice = roomType?.basePriceCents ?? 0;
    const subtotal = basePrice + addonsTotal;
    const tax = Math.round(subtotal * TAX_RATE);

    setValue("taxAmount", tax);
    setValue("totalAmount", subtotal + tax);
  }, [selectedAddonIds, roomType?.addons, roomType?.basePriceCents, setValue]);

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
            <span>Tax(18%)</span>
            <span>
              {formatCurrency(taxAmount ?? 0, roomType.currencyCode || "INR")}
            </span>
          </div>

          {selectedAddonIds.length > 0 && (
            <div className="flex justify-between items-center text-gray-600">
              <span>Add-ons</span>
            </div>
          )}
          {selectedAddonIds.map((addonId) => {
            const addon = roomType.addons?.find((a) => a.addonId === addonId);
            if (!addon) return null;
            return (
              <div
                key={addon.id}
                className="flex justify-between items-center text-gray-600 pl-8"
              >
                <span className="capitalize">{addon.name}</span>
                <span>
                  +{" "}
                  {formatCurrency(
                    addon.priceCents,
                    addon.currencyCode || "INR"
                  )}
                </span>
              </div>
            );
          })}
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
          <div className="space-y-2 flex flex-col">
            {roomType.addons?.map((addon) => {
              const isChecked = selectedAddonIds.includes(addon.addonId);

              return (
                <Checkbox
                  key={addon.id}
                  checked={isChecked}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const currentAddons = selectedAddonIds || [];

                    if (checked) {
                      // Add addon ID to the array
                      setValue("addons", [...currentAddons, addon.addonId]);
                    } else {
                      // Remove addon ID from the array
                      setValue(
                        "addons",
                        currentAddons.filter((id) => id !== addon.addonId)
                      );
                    }
                  }}
                >
                  <span className="capitalize">{addon.name} - </span>
                  <span className="font-semibold">
                    {formatCurrency(
                      addon.priceCents,
                      addon.currencyCode || "INR"
                    )}
                  </span>
                </Checkbox>
              );
            })}
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
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : "Book now"}
        </Button>
      </div>
    </div>
  );
};

export default Step3PaymentDetails;
