# Razorpay Setup Checklist

This is a quick checklist of things you need to do on the Razorpay dashboard to integrate payments
into your application.

## Quick Setup Steps

### 1. Create Razorpay Account

- [ ] Sign up at https://dashboard.razorpay.com/signup
- [ ] Verify your email address
- [ ] Log in to Razorpay Dashboard

### 2. Get Test Mode API Keys (For Development)

- [ ] Ensure you're in **Test Mode** (toggle at top-left)
- [ ] Go to **Settings** → **API Keys**
- [ ] Click **Generate Test Key** (if not already done)
- [ ] Copy **Key ID** (starts with `rzp_test_`)
- [ ] Click **Show** and copy **Key Secret**
- [ ] Save these keys securely

### 3. Configure Environment Variables

Add these to your `.env.local` file:

```bash
RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=YYYYYYYYYYYYYYYYYYYYYYYY
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXXXXXXXX
```

Replace `XXXXXXXXXXXXXXXX` and `YYYYYYYYYYYYYYYYYYYYYYYY` with your actual keys.

### 4. Test the Integration

- [ ] Restart your development server: `yarn dev`
- [ ] Go to the booking page
- [ ] Fill in booking details
- [ ] Click "Book now"
- [ ] Use test card: `4111 1111 1111 1111`, CVV: `123`, Expiry: any future date
- [ ] Complete the payment
- [ ] Verify booking confirmation modal shows payment details

### 5. Complete KYC (For Production)

To accept real payments, you need to complete KYC verification:

- [ ] Go to **Settings** → **Business Settings**
- [ ] Fill in business details:
  - Business Name
  - Business Type
  - PAN Card Number
  - Bank Account Details
- [ ] Upload required documents:
  - [ ] PAN Card copy
  - [ ] Business proof (GST/Shop Act License)
  - [ ] Address proof
  - [ ] Bank statement or cancelled cheque
- [ ] Submit for verification
- [ ] Wait for approval (typically 1-2 business days)

### 6. Get Live Mode API Keys (After KYC Approval)

- [ ] Switch to **Live Mode** (toggle at top-left)
- [ ] Go to **Settings** → **API Keys**
- [ ] Click **Generate Live Key**
- [ ] Copy **Key ID** (starts with `rzp_live_`)
- [ ] Click **Show** and copy **Key Secret**
- [ ] Update production environment variables

### 7. Configure Settlement Account

- [ ] Go to **Settings** → **Bank Accounts**
- [ ] Add your bank account for settlements
- [ ] Complete penny drop verification
- [ ] Set settlement schedule (daily/weekly)

### 8. Optional: Set Up Webhooks

Webhooks notify your server about payment events in real-time.

- [ ] Go to **Settings** → **Webhooks**
- [ ] Click **Create New Webhook**
- [ ] Enter webhook URL: `https://yourdomain.com/api/razorpay/webhook`
- [ ] Select events:
  - [ ] `payment.authorized`
  - [ ] `payment.captured`
  - [ ] `payment.failed`
  - [ ] `order.paid`
- [ ] Set webhook secret
- [ ] Save webhook secret to `.env.local` as `RAZORPAY_WEBHOOK_SECRET`
- [ ] Implement webhook handler (see documentation)

### 9. Review Settings

- [ ] **Settings** → **Payment Methods**: Enable/disable payment methods
- [ ] **Settings** → **Checkout**: Customize checkout appearance
- [ ] **Settings** → **Notifications**: Configure email/SMS notifications
- [ ] **Settings** → **Pricing**: Review transaction fees

### 10. Go Live

- [ ] Ensure all KYC documents are approved
- [ ] Test thoroughly in Test Mode
- [ ] Update `.env.local` with Live Mode keys
- [ ] Deploy to production
- [ ] Make a small test transaction in Live Mode
- [ ] Monitor transactions in dashboard

## Important Notes

### Security

- ✅ Never commit `.env.local` to version control
- ✅ Never expose `RAZORPAY_KEY_SECRET` publicly
- ✅ Use HTTPS in production (required by Razorpay)
- ✅ Always verify payment signatures server-side

### Test Cards

For testing in Test Mode:

**Successful Payment:**

- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payment:**

- Card: `4000 0000 0000 0002`

**Test UPI:**

- UPI ID: `success@razorpay`

### Transaction Fees

Review pricing at: https://razorpay.com/pricing/

- Domestic cards: ~2%
- International cards: ~3%
- UPI: Free
- Wallets: ~2%

### Support

- Dashboard: https://dashboard.razorpay.com
- Documentation: https://razorpay.com/docs/
- Support: https://razorpay.com/support/

## Troubleshooting

### Can't find API Keys?

- Make sure you're logged into Razorpay Dashboard
- Check if you're in the correct mode (Test/Live)
- Go to Settings → API Keys

### Test payments not working?

- Verify `NEXT_PUBLIC_RAZORPAY_KEY_ID` matches Test Key ID
- Check browser console for errors
- Ensure development server was restarted after adding env variables

### KYC taking too long?

- Typical approval time: 1-2 business days
- Check for email from Razorpay for any missing documents
- Contact Razorpay support if delayed beyond 3 days

---

**For detailed setup instructions, see:**
[RAZORPAY_INTEGRATION_GUIDE.md](./RAZORPAY_INTEGRATION_GUIDE.md)
