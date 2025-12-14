// Razorpay TypeScript types

export interface RazorpayOrderRequest {
  amount: number; // Amount in smallest currency unit (e.g., paise for INR)
  currency: string; // Currency code (e.g., 'INR')
  receipt: string; // Unique receipt/reference ID
  notes?: Record<string, string>; // Optional notes
}

export interface RazorpayOrderResponse {
  id: string; // Razorpay order ID
  entity: string; // 'order'
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
}

export interface RazorpayPaymentVerificationRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayPaymentVerificationResponse {
  success: boolean;
  message: string;
  orderId?: string;
  paymentId?: string;
  booking?: {
    id: number;
    referenceCode: string;
    paymentStatus: string;
    amountPaidCents: number;
    balanceDueCents: number;
  };
}

export interface RazorpayCheckoutOptions {
  key: string; // Razorpay key ID
  amount: number; // Amount in smallest currency unit
  currency: string;
  name: string; // Company/business name
  description: string; // Payment description
  image?: string; // Company logo URL
  order_id: string; // Razorpay order ID
  handler: (response: RazorpayPaymentSuccessResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
}

export interface RazorpayPaymentSuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// Extend Window interface to include Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
      on: (event: string, handler: (response: unknown) => void) => void;
    };
  }
}

export interface PaymentDetails {
  orderId: string;
  paymentId: string;
  signature: string;
  amount: number;
  currency: string;
  status: string;
}
