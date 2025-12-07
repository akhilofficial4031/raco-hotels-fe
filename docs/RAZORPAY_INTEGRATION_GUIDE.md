# Razorpay Integration Guide

This guide will help you set up and configure Razorpay payment gateway for the RACO Hotels booking
system.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Razorpay Account Setup](#razorpay-account-setup)
3. [Getting API Keys](#getting-api-keys)
4. [Environment Configuration](#environment-configuration)
5. [Testing with Test Mode](#testing-with-test-mode)
6. [Going Live](#going-live)
7. [Webhook Setup (Optional)](#webhook-setup-optional)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:

- A Razorpay account (sign up at https://razorpay.com)
- Access to your project's environment variables
- Node.js and yarn installed
- The razorpay package installed (already done via `yarn add razorpay`)

---

## Razorpay Account Setup

### Step 1: Create a Razorpay Account

1. Visit [https://dashboard.razorpay.com/signup](https://dashboard.razorpay.com/signup)
2. Sign up using your email address or Google account
3. Complete the email verification process
4. You'll be redirected to the Razorpay Dashboard

### Step 2: Complete KYC (For Production)

To accept live payments, you need to complete KYC:

1. Navigate to **Settings** → **Business Settings**
2. Fill in your business details:
   - Business Name
   - Business Type (Proprietorship, Partnership, Company, etc.)
   - PAN Card details
   - Bank Account details
3. Upload required documents:
   - PAN Card
   - Business proof (GST certificate, Shop Act License, etc.)
   - Address proof
   - Bank statement/cancelled cheque
4. Submit for verification (usually takes 1-2 business days)

**Note:** You can use Test Mode without completing KYC.

---

## Getting API Keys

### Test Mode Keys

1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Ensure you're in **Test Mode** (toggle on the top-left corner)
3. Navigate to **Settings** → **API Keys**
4. Click on **Generate Test Key** (if not already generated)
5. You'll see two keys:
   - **Key ID** (starts with `rzp_test_`)
   - **Key Secret** (click "Show" to reveal)
6. Copy both keys (you'll need them for environment configuration)

### Live Mode Keys

1. Complete KYC verification (see Step 2 above)
2. Switch to **Live Mode** (toggle on the top-left corner)
3. Navigate to **Settings** → **API Keys**
4. Click on **Generate Live Key**
5. You'll see:
   - **Key ID** (starts with `rzp_live_`)
   - **Key Secret** (click "Show" to reveal)
6. Copy both keys securely

**Important:** Never commit or expose your Key Secret publicly!

---

## Environment Configuration

### Step 1: Create `.env.local` file

Create a `.env.local` file in the root of your project (this file is gitignored):

```bash
# Razorpay Configuration
# For Test Mode
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYYYYYYYYYY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX

# For Live Mode (after KYC approval)
# RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
# RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYYYYYYYYYY
# NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
```

### Step 2: Replace with Your Keys

1. Replace `rzp_test_XXXXXXXXXXXXXXXX` with your actual Key ID
2. Replace `YYYYYYYYYYYYYYYYYYYYYYYY` with your actual Key Secret
3. Ensure `NEXT_PUBLIC_RAZORPAY_KEY_ID` matches `RAZORPAY_KEY_ID` (this is used client-side)

### Step 3: Restart Development Server

After updating environment variables, restart your development server:

```bash
yarn dev
```

---

## Testing with Test Mode

Razorpay provides test cards and payment methods for testing:

### Test Card Details

**Successful Payment:**

- Card Number: `4111 1111 1111 1111`
- CVV: Any 3 digits (e.g., `123`)
- Expiry: Any future date (e.g., `12/25`)
- Name: Any name

**Failed Payment:**

- Card Number: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

### Test UPI

- UPI ID: `success@razorpay`
- This will simulate a successful UPI payment

### Test Wallets

Select any wallet (Paytm, PhonePe, etc.) in test mode and the payment will be auto-approved.

### Testing Flow

1. Fill in the booking form with your details
2. Click "Book now"
3. Razorpay checkout modal will open
4. Select a payment method (Card, UPI, Wallet, etc.)
5. Use the test credentials above
6. Complete the payment
7. You should see the booking confirmation modal with payment details

---

## Going Live

### Checklist Before Going Live

- [ ] Complete KYC verification (approved by Razorpay)
- [ ] Generate Live API keys
- [ ] Update `.env.local` with live keys
- [ ] Test the complete booking flow in Test Mode
- [ ] Set up webhook for payment confirmations (recommended)
- [ ] Configure settlement account in Razorpay Dashboard
- [ ] Review Razorpay pricing and transaction fees
- [ ] Add appropriate error handling for failed payments
- [ ] Set up monitoring for payment failures

### Switching to Live Mode

1. Ensure KYC is approved
2. Get your live API keys from the dashboard
3. Update `.env.local`:

```bash
# Live Mode Configuration
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYYYYYYYYYY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXXXX
```

4. Deploy to production with these environment variables
5. Make a small test transaction to verify everything works

---

## Webhook Setup (Optional)

Webhooks allow Razorpay to notify your server about payment events in real-time.

### Why Use Webhooks?

- Get real-time notifications of successful/failed payments
- Handle edge cases (user closes browser before payment completion)
- Reconcile payments automatically
- Update booking status automatically

### Setting Up Webhooks

1. Go to Razorpay Dashboard → **Settings** → **Webhooks**
2. Click **Create New Webhook**
3. Enter your webhook URL:
   ```
   https://yourdomain.com/api/razorpay/webhook
   ```
4. Select events to listen for:
   - `payment.authorized`
   - `payment.captured`
   - `payment.failed`
   - `order.paid`
5. Set a webhook secret (store this securely)
6. Click **Create Webhook**

### Implementing Webhook Handler

Create `/app/api/razorpay/webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET || "")
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // Handle different event types
    switch (event.event) {
      case "payment.captured":
        // Update booking payment status to completed
        console.log("Payment captured:", event.payload.payment.entity);
        break;

      case "payment.failed":
        // Handle failed payment
        console.log("Payment failed:", event.payload.payment.entity);
        break;

      // Add more cases as needed
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { success: false, message: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
```

Add to your `.env.local`:

```bash
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret_here
```

---

## Troubleshooting

### Common Issues and Solutions

#### 1. "Payment gateway not configured" error

**Cause:** Environment variables are not set correctly

**Solution:**

- Verify `.env.local` exists in project root
- Ensure all three variables are set:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`
  - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
- Restart your development server after changes

#### 2. Razorpay checkout not opening

**Cause:** Razorpay script not loaded or incorrect Key ID

**Solution:**

- Check browser console for errors
- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` is set correctly
- Ensure Razorpay script is loading (check Network tab)
- Clear browser cache and try again

#### 3. Payment verification failed

**Cause:** Signature mismatch or incorrect Key Secret

**Solution:**

- Verify `RAZORPAY_KEY_SECRET` matches your dashboard
- Check if you're using test keys with test mode and live keys with live mode
- Review server logs for detailed error messages

#### 4. "Invalid Key" error

**Cause:** Wrong keys or mode mismatch

**Solution:**

- Ensure test keys start with `rzp_test_`
- Ensure live keys start with `rzp_live_`
- Don't mix test and live keys
- Regenerate keys if necessary from dashboard

#### 5. Payment success but booking not updating

**Cause:** Verification API not being called or failing

**Solution:**

- Check browser console for API call errors
- Verify `/api/razorpay/verify-payment` endpoint is working
- Check server logs for verification failures
- Implement webhook for reliable payment status updates

---

## Additional Resources

- [Razorpay Official Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/payments/test-card-details/)
- [Razorpay Dashboard](https://dashboard.razorpay.com)
- [Razorpay Support](https://razorpay.com/support/)

---

## Security Best Practices

1. **Never expose Key Secret:**
   - Store only in server-side environment variables
   - Never commit to git
   - Never send to client-side code

2. **Always verify payments:**
   - Use the verification endpoint to validate signatures
   - Don't trust client-side payment confirmations alone

3. **Use HTTPS:**
   - Always use HTTPS in production
   - Razorpay requires HTTPS for live mode

4. **Implement rate limiting:**
   - Add rate limiting to your API endpoints
   - Prevent abuse of payment creation endpoints

5. **Log transactions:**
   - Keep detailed logs of all payment attempts
   - Monitor for unusual patterns

6. **Handle errors gracefully:**
   - Show user-friendly error messages
   - Log detailed errors for debugging
   - Provide support contact for failed payments

---

## Payment Flow Summary

```
User fills booking form
       ↓
Submits form
       ↓
Backend creates booking (status: pending)
       ↓
Frontend calls /api/razorpay/create-order
       ↓
Razorpay order created
       ↓
Razorpay checkout modal opens
       ↓
User completes payment
       ↓
Payment success callback triggered
       ↓
Frontend calls /api/razorpay/verify-payment
       ↓
Signature verified
       ↓
Booking confirmation modal shown
       ↓
Webhook updates booking status (optional)
```

---

## Support

If you encounter any issues not covered in this guide:

1. Check Razorpay Dashboard for transaction logs
2. Review server and browser console logs
3. Contact Razorpay support: https://razorpay.com/support/
4. For integration issues, raise a ticket with your development team

---

**Last Updated:** December 2024
