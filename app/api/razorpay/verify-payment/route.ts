import { RazorpayPaymentVerificationRequest } from "@/types/razorpay";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: RazorpayPaymentVerificationRequest = await request.json();

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

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

    if (isValid) {
      // Payment verification successful
      return NextResponse.json(
        {
          success: true,
          message: "Payment verified successfully",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
        },
        { status: 200 }
      );
    } else {
      // Payment verification failed
      console.error("Payment signature verification failed");
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed - Invalid signature",
        },
        { status: 400 }
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
