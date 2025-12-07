# Razorpay Payment Gateway Setup

## Quick Start

### 1. Install Dependencies (Already Done)

```bash
yarn add razorpay
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the project root with your Razorpay credentials:

```bash
# Get these from https://dashboard.razorpay.com/app/keys

# Test Mode (for development)
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYYYYYYYYYY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

### 3. Get Your API Keys

1. **Create Razorpay Account:**
   - Sign up at https://dashboard.razorpay.com/signup
   - Verify your email

2. **Get Test Keys:**
   - Log in to Razorpay Dashboard
   - Ensure you're in **Test Mode** (toggle at top-left)
   - Go to **Settings** → **API Keys**
   - Click **Generate Test Key**
   - Copy **Key ID** and **Key Secret**

3. **Replace in `.env.local`:**
   - Replace `XXXXXXXXXXXXXXXX` with your Key ID
   - Replace `YYYYYYYYYYYYYYYYYYYYYYYY` with your Key Secret

### 4. Restart Server

```bash
yarn dev
```

### 5. Test the Integration

Use these test credentials:

**Test Card (Success):**

- Card: `4111 1111 1111 1111`
- CVV: `123`
- Expiry: `12/25`
- Name: Any name

## Complete Documentation

For detailed setup instructions, see:

- **[Razorpay Integration Guide](./docs/RAZORPAY_INTEGRATION_GUIDE.md)** - Complete setup guide
- **[Setup Checklist](./docs/RAZORPAY_SETUP_CHECKLIST.md)** - Step-by-step checklist
- **[Implementation Summary](./docs/RAZORPAY_IMPLEMENTATION_SUMMARY.md)** - Technical details

## Payment Flow

1. User completes booking form
2. Backend creates booking
3. Razorpay payment modal opens
4. User completes payment
5. Payment verified server-side
6. Confirmation modal shows booking + payment details

## Need Help?

- Razorpay Dashboard: https://dashboard.razorpay.com
- Razorpay Docs: https://razorpay.com/docs/
- Support: https://razorpay.com/support/

## Production Setup

For production deployment with live payments, see the complete guide in:
`docs/RAZORPAY_INTEGRATION_GUIDE.md`

You'll need to:

1. Complete KYC verification
2. Get Live API keys
3. Update environment variables
4. Test with real transactions
