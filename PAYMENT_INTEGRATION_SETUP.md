# Payment Backend Integration Setup

## Overview

This guide explains how to configure the Next.js frontend to communicate with the backend API for
payment status updates after Razorpay payment completion.

## What Was Added

### 1. Environment Variable Configuration

A new environment variable is required for backend API communication:

```env
NEXT_PUBLIC_API_URL=http://localhost:8787
```

**Action Required**: Add this to your `.env` file.

For reference, see `.env.example` file.

### 2. Updated Payment Verification Flow

The `/api/razorpay/verify-payment` endpoint now:

1. ✅ Verifies Razorpay payment signature (security check)
2. ✅ Calls backend API `PATCH /api/bookings/{id}/payment`
3. ✅ Updates booking with payment information
4. ✅ Returns updated booking data to frontend

### 3. Enhanced Frontend Handler

The payment success handler in `BookingStepper.tsx` now:

1. ✅ Passes `bookingId` and `amount` to verification endpoint
2. ✅ Receives updated booking data from backend
3. ✅ Updates UI with latest payment status
4. ✅ Shows detailed error messages if backend update fails

## Quick Setup

### Step 1: Add Environment Variable

Add to your `.env` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8787
```

### Step 2: Restart Development Server

```bash
# Stop the current dev server (Ctrl+C)
# Then restart:
npm run dev
# or
yarn dev
```

### Step 3: Verify Backend API is Running

Make sure your backend API is running on `http://localhost:8787`:

```bash
curl http://localhost:8787/openapi.json
```

This should return the OpenAPI specification.

### Step 4: Test the Payment Flow

1. Create a test booking
2. Complete payment with Razorpay test card
3. Verify:
   - Payment succeeds in Razorpay
   - Booking status updates in backend
   - Success message shows in frontend

## Configuration Details

### Backend API Endpoint

**Endpoint**: `PATCH /api/bookings/{id}/payment`

**Request Body**:

```json
{
  "amountPaidCents": 50000,
  "paymentStatus": "paid",
  "paymentMethod": "online",
  "paymentProcessor": "razorpay",
  "processorPaymentId": "pay_xxxxxxxxxxxxx",
  "transactionId": "order_xxxxxxxxxxxxx",
  "notes": "Payment completed via Razorpay"
}
```

### Authentication (If Required)

If your backend API requires authentication, edit:

`app/api/razorpay/verify-payment/route.ts`

Update the fetch call around line 78:

```typescript
const updatePaymentResponse = await fetch(
  `${backendApiUrl}/api/bookings/${bookingId}/payment`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${yourAuthToken}`, // Add this
      // or
      "Cookie": request.headers.get("cookie") || "", // Forward cookies
    },
    body: JSON.stringify({...}),
  }
);
```

## Production Configuration

For production deployment:

### 1. Update Backend API URL

In your production environment variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

### 2. Update Razorpay Keys

```env
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_live_secret_key
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxx
```

### 3. Enable HTTPS

Ensure both frontend and backend are served over HTTPS in production.

## Troubleshooting

### Error: "NEXT_PUBLIC_API_URL is not defined"

**Solution**:

1. Add `NEXT_PUBLIC_API_URL` to `.env` file
2. Restart Next.js dev server

### Error: "Failed to update booking payment status"

**Check**:

1. Backend API is running and accessible
2. Backend endpoint `/api/bookings/{id}/payment` exists
3. Network connectivity between Next.js and backend
4. Check Next.js server console for detailed error logs

**Debug**:

```bash
# Check if backend is accessible
curl http://localhost:8787/api/bookings/1/payment

# Check Next.js server logs
# Look for "Failed to update booking payment status:" messages
```

### Error: "Payment verified but failed to update booking status"

This means:

- ✅ Razorpay payment was successful
- ✅ Signature verification passed
- ❌ Backend API update failed

**Action**:

1. Check backend API logs
2. Verify booking ID exists in database
3. Check authentication/authorization if required
4. Manually update booking using transaction IDs from error message

### Payment succeeds but booking not updated

**Check**:

1. Next.js server logs: `console.error("Failed to update booking payment status:")`
2. Backend API logs: Look for PATCH requests to `/api/bookings/{id}/payment`
3. Network tab in browser dev tools: Check if API call is made

**Solution**: Follow error messages and check backend API configuration

## Testing Checklist

- [ ] Backend API is running on configured URL
- [ ] `NEXT_PUBLIC_API_URL` is set in `.env`
- [ ] Next.js dev server restarted after env changes
- [ ] Create test booking succeeds
- [ ] Razorpay payment modal opens
- [ ] Complete payment with test card
- [ ] Payment verification succeeds
- [ ] Backend API receives PATCH request
- [ ] Booking payment status updates in database
- [ ] Frontend shows success message
- [ ] Booking confirmation modal displays

## Files Modified

1. **`app/api/razorpay/verify-payment/route.ts`**
   - Added backend API call after signature verification
   - Enhanced error handling
   - Returns updated booking data

2. **`app/(features)/new-bookings/components/BookingStepper.tsx`**
   - Pass `bookingId` and `amount` to verification endpoint
   - Handle updated booking data in response
   - Update booking state with latest information

3. **`types/razorpay.ts`**
   - Added `booking` field to verification response type

4. **`.env.example`** (Created)
   - Added environment variable template

## Documentation

For detailed flow documentation, see:

- `docs/RAZORPAY_PAYMENT_FLOW.md` - Complete payment flow architecture

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Next.js server logs
3. Review backend API logs
4. Check network connectivity
5. Verify environment variables are set correctly

## Summary

The integration is now complete. After Razorpay payment succeeds:

1. 🔐 Payment is verified securely on the server
2. 📡 Backend API is automatically called
3. 💾 Booking payment status is updated
4. ✅ User sees confirmation

**Next Steps**: Add `NEXT_PUBLIC_API_URL` to your `.env` file and restart the dev server.
