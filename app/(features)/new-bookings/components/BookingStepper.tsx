"use client";
import { postFetcher } from "@/lib/fetcher";
import { Hotel, RoomType } from "@/types/hotel";
import {
  PaymentDetails,
  RazorpayOrderResponse,
  RazorpayPaymentSuccessResponse,
} from "@/types/razorpay";
import { zodResolver } from "@hookform/resolvers/zod";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { FieldErrors, FormProvider, useForm } from "react-hook-form";
import BookingConfirmationModal from "./BookingConfirmationModal";
import { BookingFormValues, bookingSchema } from "./form-schema";
import Step1Amenities from "./steps/Step1Amenities";
import Step2PersonalData from "./steps/Step2PersonalData";
import Step3PaymentDetails from "./steps/Step3PaymentDetails";

interface BookingResponse {
  success: boolean;
  data: {
    booking: {
      id: number;
      referenceCode: string;
      hotelId: number;
      status: string;
      source: string;
      checkInDate: string;
      checkOutDate: string;
      numAdults: number;
      numChildren: number;
      totalAmountCents: number;
      currencyCode: string;
      taxAmountCents: number;
      feeAmountCents: number;
      discountAmountCents: number;
      amountPaidCents: number;
      balanceDueCents: number;
      paymentStatus: string;
      paymentMethod: string;
      paymentProcessor: string;
      notes?: string;
      createdAt: string;
    };
  };
}

interface BookingStepperProps {
  hotel: Hotel;
  roomType: RoomType;
  roomId: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  numAdults: number;
  numChildren: number;
}

const BookingStepper: React.FC<BookingStepperProps> = ({
  hotel,
  roomType,
  roomId,
  checkInDate,
  checkOutDate,
  numAdults,
  numChildren,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [bookingResponse, setBookingResponse] =
    useState<BookingResponse | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const methods = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      addons: [],
      totalAmount: roomType.basePriceCents || 0,
      taxAmount: 0,
      promoCode: "",
      alternatePhone: "",
      nationality: "",
      idType: "",
      idNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      dietaryPreferences: "",
      specialRequests: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
      loyaltyNumber: "",
      notes: "",
      marketingOptIn: false,
    },
  });

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle Razorpay payment
  const handleRazorpayPayment = async (
    bookingData: BookingResponse,
    formData: BookingFormValues
  ) => {
    try {
      // Create Razorpay order
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: bookingData.data.booking.totalAmountCents,
          currency: bookingData.data.booking.currencyCode,
          receipt: bookingData.data.booking.referenceCode,
          notes: {
            bookingId: bookingData.data.booking.id.toString(),
            hotelName: hotel.name,
          },
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create payment order");
      }

      const orderData: { success: boolean; order: RazorpayOrderResponse } =
        await orderResponse.json();

      if (!orderData.success) {
        throw new Error("Failed to create payment order");
      }

      // Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "RACO Hotels",
        description: `Booking for ${hotel.name}`,
        order_id: orderData.order.id,
        handler: async (response: RazorpayPaymentSuccessResponse) => {
          // Payment successful, verify the payment
          try {
            const verifyResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData: { success: boolean } =
              await verifyResponse.json();

            if (verifyData.success) {
              // Store payment details
              setPaymentDetails({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                amount: orderData.order.amount,
                currency: orderData.order.currency,
                status: "success",
              });

              // Show confirmation modal
              setShowConfirmationModal(true);
              message.success("Payment completed successfully!");
            } else {
              message.error(
                "Payment verification failed. Please contact support."
              );
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Payment verification error:", error);
            message.error(
              "Payment verification failed. Please contact support."
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#7e6231",
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
            message.warning("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Razorpay payment error:", error);
      message.error("Failed to initialize payment. Please try again.");
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data: BookingFormValues) => {
    if (!checkInDate || !checkOutDate) {
      message.error("Check-in and check-out dates are required");
      return;
    }

    setIsSubmitting(true);
    let paymentInitiated = false;

    try {
      // Transform form data to match API payload structure
      const payload = {
        hotelId: hotel.id,
        bookingDetails: {
          checkInDate,
          checkOutDate,
          numAdults,
          numChildren,
          status: "confirmed",
        },
        customerData: {
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
          alternatePhone: data.alternatePhone ?? "",
          dateOfBirth: data.dateOfBirth
            ? data.dateOfBirth.format("YYYY-MM-DD")
            : "",
          gender: data.gender ?? "male",
          nationality: data.nationality ?? "",
          idType: data.idType ?? "",
          idNumber: data.idNumber ?? "",
          addressLine1: data.addressLine1 ?? "",
          addressLine2: data.addressLine2 ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          country: data.country ?? "",
          postalCode: data.postalCode ?? "",
          dietaryPreferences: data.dietaryPreferences
            ? [data.dietaryPreferences]
            : [],
          specialRequests: data.specialRequests ? [data.specialRequests] : [],
          emergencyContactName: data.emergencyContactName ?? "",
          emergencyContactPhone: data.emergencyContactPhone ?? "",
          loyaltyNumber: data.loyaltyNumber ?? "",
          marketingOptIn: data.marketingOptIn ?? false,
          notes: data.notes ?? "",
          firstBookingSource: "web",
        },
        selectedRooms: [
          {
            id: roomId,
          },
        ],
        selectedAddons:
          data.addons?.map((addonId) => ({
            id: addonId,
            priceCents:
              roomType.addons?.find((a) => a.addonId === addonId)?.priceCents ??
              0,
          })) ?? [],
        roomTypeDetails: {
          id: roomType.id,
          basePriceCents: roomType.basePriceCents ?? 0,
        },
        promoCode: data.promoCode ?? "",
        amountPaidCents: 0, // This would be set based on payment processing
        taxAmountCents: data.taxAmount ?? 0,
        totalAmountCents: data.totalAmount ?? 0,
      };

      // Call the booking API
      const result = await postFetcher<BookingResponse>(
        "/api/bookings",
        payload
      );

      // Store the booking response
      setBookingResponse(result);

      message.success(
        "Booking created successfully! Redirecting to payment..."
      );

      // Initiate Razorpay payment
      // Note: payment handlers and modal callbacks will handle setIsSubmitting(false)
      paymentInitiated = true;
      await handleRazorpayPayment(result, data);
    } catch (_error) {
      message.error("Failed to create booking. Please try again.");
    } finally {
      // Only reset isSubmitting if payment was not successfully initiated
      // If payment was initiated, the Razorpay handlers will reset it
      if (!paymentInitiated) {
        setIsSubmitting(false);
      }
    }
  };

  const steps = [
    {
      number: 1,
      title: "Property amenities",
      component: <Step1Amenities hotel={hotel} roomType={roomType} />,
    },
    {
      number: 2,
      title: "Personal data",
      component: <Step2PersonalData />,
    },
    {
      number: 3,
      title: "Payment details",
      component: (
        <Step3PaymentDetails roomType={roomType} isSubmitting={isSubmitting} />
      ),
    },
  ];

  const onError = (errors: FieldErrors<BookingFormValues>) => {
    message.error(
      "Please fill in all required fields (Full Name, Email, Phone)"
    );

    // Scroll to first error
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.getElementsByName(firstErrorField)[0];
      element?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit, onError)}
        className="bg-white rounded-lg border border-gray-200 relative"
      >
        {isSubmitting ? (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
              <p className="text-gray-600">Creating your booking...</p>
            </div>
          </div>
        ) : null}
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`p-8 ${
              index < steps.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <h2 className="text-xl font-bold mb-4">
              Step {step.number}: {step.title}
            </h2>
            <div>{step.component}</div>
          </div>
        ))}
      </form>

      {/* Booking Confirmation Modal */}
      <BookingConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => {
          setShowConfirmationModal(false);
          setBookingResponse(null);
          setPaymentDetails(null);
        }}
        bookingResponse={bookingResponse}
        hotelName={hotel.name}
        customerName={methods.watch("fullName") || "Guest"}
        paymentDetails={paymentDetails}
      />
    </FormProvider>
  );
};

export default BookingStepper;
