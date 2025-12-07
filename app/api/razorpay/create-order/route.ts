import { RazorpayOrderRequest } from "@/types/razorpay";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID ?? "",
  key_secret: process.env.RAZORPAY_KEY_SECRET ?? "",
});

export async function POST(request: NextRequest) {
  try {
    const body: RazorpayOrderRequest = await request.json();

    const { amount, currency, receipt, notes } = body;

    // Validate required fields
    if (!amount || !currency || !receipt) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields: amount, currency, or receipt",
        },
        { status: 400 }
      );
    }

    // Validate Razorpay credentials
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay credentials not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Payment gateway not configured",
        },
        { status: 500 }
      );
    }

    // Create Razorpay order
    const options = {
      amount,
      currency,
      receipt,
      notes: notes ?? {},
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create order",
      },
      { status: 500 }
    );
  }
}
