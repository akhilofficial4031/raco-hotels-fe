"use client";
import { PromoCodeResponse, RoomType } from "@/types/hotel";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Checkbox, Input, Divider, Tag } from "antd";
import { message } from "@/components/message";
import { useFormContext, Controller } from "react-hook-form";
import { BookingFormValues } from "../form-schema";
import { getFetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api";

interface Step3PaymentDetailsProps {
  roomType: RoomType;
  hotelId: number;
  isSubmitting?: boolean;
}

const formatCurrency = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
    minimumFractionDigits: 0,
  }).format(amount / 100);
};

const formatNumber = (amount: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const Step3PaymentDetails: React.FC<Step3PaymentDetailsProps> = ({
  roomType,
  hotelId,
  isSubmitting = false,
}) => {
  const { control, watch, setValue } = useFormContext<BookingFormValues>();
  const selectedAddonIds: number[] = watch("addons", []);
  const totalAmount = watch("totalAmount", roomType?.basePriceCents ?? 0);
  const taxAmount = watch("taxAmount", 0);
  const promoCode = watch("promoCode", "");
  const discountAmount = watch(
    "discountAmount" as keyof BookingFormValues,
    0
  ) as number;
  const [subtotalAmount, setSubtotalAmount] = useState<number>(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState<number>(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState<boolean>(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>("");

  const getRoomRent = useCallback(() => {
    if (roomType.offerPrice) {
      if (!roomType.offerStartDate || !roomType.offerEndDate) {
        return roomType.offerPrice;
      } else {
        const today = new Date();
        const offerStartDate = new Date(roomType.offerStartDate || "");
        const offerEndDate = new Date(roomType.offerEndDate || "");
        if (today >= offerStartDate && today <= offerEndDate) {
          return roomType.offerPrice;
        }
      }
    }
    return roomType.basePriceCents;
  }, [roomType]);

  useEffect(() => {
    const TAX_RATE = 0.18;
    const addonsTotal = selectedAddonIds.reduce((sum, addonId) => {
      const addon = roomType.addons?.find((a) => a.addonId === addonId);
      return sum + (addon?.priceCents ?? 0);
    }, 0);

    const basePrice = getRoomRent() ?? 0;
    const subtotal = basePrice + addonsTotal;
    if (discountAmount > 0) {
      setTotalAfterDiscount(subtotal - discountAmount * 100);
    }
    setSubtotalAmount(subtotal);
    const taxableAmount =
      totalAfterDiscount > 0 ? totalAfterDiscount : subtotal;
    const tax = Math.round(taxableAmount * TAX_RATE);

    setValue("taxAmount", tax);
    setValue("totalAmount", taxableAmount + tax);
  }, [
    selectedAddonIds,
    roomType?.addons,
    getRoomRent,
    setValue,
    discountAmount,
    totalAfterDiscount,
  ]);

  const handleApplyPromoCode = async () => {
    if (!promoCode?.trim()) {
      message.warning("Please enter a promo code");
      return;
    }

    setIsApplyingPromo(true);

    try {
      const response = await getFetcher<ApiResponse<PromoCodeResponse>>(
        `/api/promo-codes/validate/${hotelId}/${promoCode.trim()}`
      );

      if (response.success && response.data?.promoCode) {
        const promoCodeData = response.data.promoCode;
        const { type, value } = promoCodeData;
        let discount = 0;
        if (type === "fixed") {
          discount = value / 100;
        } else {
          discount = Math.round((subtotalAmount * (value / 100)) / 100);
        }

        setValue("discountAmount" as keyof BookingFormValues, discount);
        setAppliedPromoCode(promoCode.trim());

        message.success("Promo code applied successfully!");
      } else {
        message.error(response.message ?? "Invalid promo code");
      }
    } catch (_error) {
      message.error("Failed to apply promo code. Please try again.");
    } finally {
      setIsApplyingPromo(false);
    }
  };

  const handleRemovePromoCode = () => {
    setAppliedPromoCode("");
    setValue("promoCode", "");
    setValue("discountAmount" as keyof BookingFormValues, 0);
    setTotalAfterDiscount(0);
    message.success("Promo code removed successfully!");
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
                getRoomRent() ?? 0,
                roomType.currencyCode ?? "INR"
              )}
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

        <div className="flex justify-between items-center text-gray-600 mt-2">
          <span>Subtotal</span>
          <span>
            {formatCurrency(
              subtotalAmount ?? 0,
              roomType.currencyCode || "INR"
            )}
          </span>
        </div>

        {(discountAmount ?? 0) > 0 && (
          <>
            <div className="flex justify-between items-center text-green-600 mt-2">
              <span>Discount</span>
              <span>
                -{formatNumber(discountAmount, roomType.currencyCode || "INR")}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span>Total after discount</span>
              <span>
                {formatCurrency(
                  totalAfterDiscount,
                  roomType.currencyCode || "INR"
                )}
              </span>
            </div>
          </>
        )}

        <div className="flex justify-between items-center text-gray-600 mt-2">
          <span>Tax(18%)</span>
          <span>
            {formatCurrency(taxAmount ?? 0, roomType.currencyCode ?? "INR")}
          </span>
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
      {roomType?.addons?.length ? (
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
        {appliedPromoCode ? (
          <div className="flex items-center gap-2">
            <Tag
              color="green"
              closable
              onClose={handleRemovePromoCode}
              className="flex items-center"
            >
              <span className="uppercase font-medium">{appliedPromoCode}</span>
            </Tag>
            <span className="text-sm text-gray-500">Promo code applied</span>
          </div>
        ) : (
          <div className="flex gap-2">
            <Controller
              name="promoCode"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter promo code" />
              )}
            />
            <Button
              type="primary"
              className="!bg-primary !text-white"
              onClick={handleApplyPromoCode}
              loading={isApplyingPromo}
              disabled={isApplyingPromo || !promoCode?.trim()}
            >
              Apply
            </Button>
          </div>
        )}
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
