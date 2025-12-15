# Razorpay Payment Flow Integration

## Overview

This document describes the complete payment flow from Razorpay payment completion to backend
booking status update.

## Architecture

```
┌─────────────────┐
│  User Browser   │
│  (Razorpay UI)  │
└────────┬────────┘
         │
         │ 1. Payment Success
         ▼
┌─────────────────────────────────┐
│  Next.js Frontend               │
│  BookingStepper.tsx             │
│  (Razorpay Handler)             │
└────────┬────────────────────────┘
         │
         │ 2. POST /api/razorpay/verify-payment
         │    { razorpay_order_id, razorpay_payment_id,
         │      razorpay_signature, bookingId, amount }
         ▼
┌─────────────────────────────────┐
│  Next.js Server API             │
│  verify-payment/route.ts        │
└────────┬────────────────────────┘
         │
         │ 3a. Verify Signature
         │
         │ 3b. PATCH /api/bookings/{id}/payment
         │     { amountPaidCents, paymentStatus,
         │       processorPaymentId, transactionId }
         ▼
┌─────────────────────────────────┐
│  Backend API (Cloudflare)       │
│  localhost:8787                 │
│  PATCH /api/bookings/{id}/payment│
└─────────────────────────────────┘
```

## Step-by-Step Flow

### 1. Booking Creation

- User fills out booking form in `BookingStepper.tsx`
- Booking is created via `/api/bookings` endpoint
- Initial booking has `paymentStatus: "pending"` and `amountPaidCents: 0`

### 2. Payment Initiation

- Razorpay order is created via `/api/razorpay/create-order`
- Razorpay checkout modal opens
- User completes payment through Razorpay

### 3. Payment Verification (Client-Side)

- Razorpay calls success handler with:
  - `razorpay_payment_id`
  - `razorpay_order_id`
  - `razorpay_signature`
- Handler sends these along with `bookingId` and `amount` to Next.js server

### 4. Payment Verification (Server-Side)

**File**: `app/api/razorpay/verify-payment/route.ts`

```typescript
POST / api / razorpay / verify - payment;
{
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  bookingId: number;
  amount: number;
}
```

**Process**:

1. Validates signature using HMAC-SHA256
2. If signature is valid, calls backend API to update booking

### 5. Backend Booking Update

**Backend Endpoint**: `PATCH /api/bookings/{id}/payment`

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

**Response**:

```json
{
  "success": true,
  "data": {
    "booking": {
      "id": 123,
      "referenceCode": "BK-12345",
      "paymentStatus": "paid",
      "amountPaidCents": 50000,
      "balanceDueCents": 0
      // ... other booking fields
    }
  }
}
```

### 6. Frontend Response

- Updated booking data is returned to frontend
- Success message is shown
- Booking confirmation modal is displayed
- Booking state is updated with latest payment information

## Configuration

### Environment Variables

Add to your `.env` file:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8787

# Razorpay Configuration
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
```

### Backend API Requirements

The backend API at `localhost:8787` must:

1. Expose `PATCH /api/bookings/{id}/payment` endpoint
2. Accept the request body as defined in the OpenAPI spec
3. Update booking payment status in the database
4. Return updated booking data

## Error Handling

### 1. Signature Verification Failure

- Payment is rejected
- User is notified to contact support
- Booking remains in pending state

### 2. Backend API Failure

- Payment is verified but booking update fails
- Error is logged with details
- User is notified to contact support
- Payment details are preserved for manual reconciliation

### 3. Network Errors

- User sees error message
- Transaction IDs are logged for debugging
- Manual intervention may be required

## Security Considerations

1. **Signature Verification**: All payments are verified using HMAC-SHA256 signature
2. **Server-Side Processing**: Payment updates happen on the Next.js server (not browser)
3. **API Authentication**: Backend API calls should include authentication headers (if required by
   your API)
4. **Secret Management**: Razorpay secret key is never exposed to the browser

## Authentication (If Required)

If your backend API requires authentication, update the fetch call in `verify-payment/route.ts`:

```typescript
const updatePaymentResponse = await fetch(
  `${backendApiUrl}/api/bookings/${bookingId}/payment`,
  {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // Add your auth token
      // Or use other auth methods like cookies
    },
    body: JSON.stringify({...}),
  }
);
```

## Testing

### Local Testing

1. Start backend API:

   ```bash
   # Backend should be running on http://localhost:8787
   ```

2. Start Next.js app:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Create a test booking and complete payment using Razorpay test mode

4. Verify:
   - Payment signature is verified
   - Backend API receives PATCH request
   - Booking payment status is updated
   - Frontend shows success message

### Test Scenarios

1. **Successful Payment**: Complete payment flow end-to-end
2. **Invalid Signature**: Tamper with signature to verify rejection
3. **Backend API Down**: Stop backend and verify error handling
4. **Network Timeout**: Test with slow network conditions
5. **User Cancellation**: Close Razorpay modal before payment

## Monitoring

### Logs to Monitor

1. **Frontend Console**:
   - Payment verification requests
   - Success/failure messages
   - Booking data updates

2. **Next.js Server Logs**:
   - Signature verification results
   - Backend API responses
   - Error details

3. **Backend API Logs**:
   - PATCH requests received
   - Database update success/failure
   - Updated booking records

## Troubleshooting

### Payment verified but booking not updated

**Symptoms**: User sees success but admin doesn't see payment

**Check**:

1. Next.js server logs for backend API errors
2. Backend API logs for PATCH endpoint errors
3. Database for booking record state
4. Network connectivity between Next.js and backend

**Resolution**: Manually update booking using transaction IDs from logs

### Signature verification fails

**Symptoms**: Valid payments are rejected

**Check**:

1. `RAZORPAY_KEY_SECRET` environment variable
2. Razorpay dashboard for correct secret key
3. Server restart after environment changes

**Resolution**: Update secret key and restart servers

### Environment variable not found

**Symptoms**: `NEXT_PUBLIC_API_URL` is undefined

**Check**:

1. `.env` file has the variable
2. Variable name starts with `NEXT_PUBLIC_`
3. Next.js server restarted after adding variable

**Resolution**: Add variable and restart dev server

## Production Deployment

### Checklist

- [ ] Update `NEXT_PUBLIC_API_URL` to production backend URL
- [ ] Update Razorpay keys to production keys (starting with `rzp_live_`)
- [ ] Verify backend API is accessible from Next.js server
- [ ] Test payment flow in production/staging environment
- [ ] Set up monitoring and alerting for payment failures
- [ ] Configure authentication headers if required
- [ ] Test error scenarios (API down, network issues, etc.)
- [ ] Verify webhook integration (if using Razorpay webhooks)

## Related Files

- `app/api/razorpay/verify-payment/route.ts` - Payment verification & booking update
- `app/api/razorpay/create-order/route.ts` - Razorpay order creation
- `app/(features)/new-bookings/components/BookingStepper.tsx` - Frontend payment handler
- `types/razorpay.ts` - TypeScript type definitions
- `.env.example` - Environment variable template

## API Reference

### Backend API Schema

Refer to: `http://localhost:8787/openapi.json`

Path: `/api/bookings/{id}/payment`

Method: `PATCH`

See OpenAPI documentation for complete schema details.
