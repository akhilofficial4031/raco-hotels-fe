import { RazorpayPaymentVerificationRequest } from "@/types/razorpay";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

interface VerifyPaymentRequestBody extends RazorpayPaymentVerificationRequest {
  bookingId: number;
  amount: number;
}

interface BookingUpdateResponse {
  data?: {
    booking?: unknown;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: VerifyPaymentRequestBody = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingId,
      amount,
    } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing payment verification details",
        },
        { status: 400 }
      );
    }

    if (!bookingId || !amount) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing booking ID or amount",
        },
        { status: 400 }
      );
    }

    // Validate Razorpay credentials
    if (!process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay key secret not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway not configured",
        },
        { status: 500 }
      );
    }

    // Verify signature
    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest("hex");

    const isValid = generated_signature === razorpay_signature;

    if (!isValid) {
      // Payment verification failed
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed - Invalid signature",
        },
        { status: 400 }
      );
    }

    // Payment verification successful - now update booking payment status
    try {
      const backendApiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
      if (!backendApiUrl) {
        throw new Error("NEXT_PUBLIC_API_BASE_URL is not set");
      }

      const updatePaymentResponse = await fetch(
        `${backendApiUrl}/api/bookings/${bookingId}/payment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            // Add authentication headers if required
            // "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            amountPaidCents: amount,
            paymentStatus: "paid",
            paymentMethod: "online",
            paymentProcessor: "razorpay",
            processorPaymentId: razorpay_payment_id,
            transactionId: razorpay_order_id,
            notes: "Payment completed via Razorpay",
          }),
        }
      );

      if (!updatePaymentResponse.ok) {
        const errorData = await updatePaymentResponse.json().catch(() => ({}));
        console.error("Failed to update booking payment status:", errorData);

        return NextResponse.json(
          {
            success: false,
            message: "Payment verified but failed to update booking status",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
          },
          { status: 500 }
        );
      }

      const bookingData: BookingUpdateResponse =
        await updatePaymentResponse.json();

      return NextResponse.json(
        {
          success: true,
          message: "Payment verified and booking updated successfully",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          booking: bookingData.data?.booking,
        },
        { status: 200 }
      );
    } catch (updateError) {
      console.error("Error updating booking payment status:", updateError);

      return NextResponse.json(
        {
          success: false,
          message: "Payment verified but failed to update booking status",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          error:
            updateError instanceof Error
              ? updateError.message
              : "Unknown error",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to verify payment",
      },
      { status: 500 }
    );
  }
}
