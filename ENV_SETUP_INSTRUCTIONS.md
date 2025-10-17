# Environment Variables Setup - Complete Guide

## ✅ What Was Fixed

### Problem
- Client components were trying to use `process.env.NEXT_BUCKET_URL` which is server-only
- Inconsistent use of `NEXT_PUBLIC_BUCKET_URL` vs `NEXT_BUCKET_URL`
- Security risk: Bucket URL could be exposed to browser

### Solution
- **Server components** process image URLs using `NEXT_BUCKET_URL` (server-only, secure)
- **Client components** receive already-processed URLs via props
- Centralized image URL processing in `lib/utils.ts`
- Bucket URL never exposed to client/browser

---

## 📝 Setup Instructions

### Step 1: Create Your .env File

Copy the example file and add your actual values:

```bash
cp .env.example .env
```

### Step 2: Update .env with Your Values

Edit `.env` and replace the placeholder values:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://raco-hotels.com

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://raco-hotels.com

# Cloudflare R2 Bucket URL (Server-side only)
NEXT_BUCKET_URL=https://pub-YOUR-ACTUAL-BUCKET-ID.r2.dev

# Google Site Verification
GOOGLE_SITE_VERIFICATION=your-actual-verification-code

# Node Environment (automatically set by Next.js)
# NODE_ENV=development|production
```

### Step 3: Restart Development Server

**IMPORTANT**: After creating/modifying `.env`, you MUST restart the dev server:

```bash
# Stop current server (Ctrl+C)
yarn dev
```

---

## 🔐 Environment Variables Explained

### `NEXT_PUBLIC_SITE_URL`
- **Purpose**: Your website's public URL
- **Used for**: SEO, sitemaps, canonical URLs, Open Graph tags
- **Example**: `https://raco-hotels.com`

### `NEXT_PUBLIC_API_BASE_URL`
- **Purpose**: Base URL for API calls from your Next.js frontend
- **Used for**: Fetching data from your Next.js API routes
- **Development**: `http://localhost:3000`
- **Production**: `https://raco-hotels.com`

### `NEXT_BUCKET_URL` (Server-Only)
- **Purpose**: Cloudflare R2 bucket URL for images
- **Security**: NOT exposed to browser (server-only)
- **Used by**: Server components to process image URLs
- **Example**: `https://pub-xxxxxxxxxxxxx.r2.dev`

### `GOOGLE_SITE_VERIFICATION`
- **Purpose**: Google Search Console verification
- **Used for**: SEO verification meta tag
- **Example**: `abcdefg123456789`

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│  Server Component (HotelList)           │
│  - Fetches hotel data                   │
│  - Reads NEXT_BUCKET_URL (server-only)  │
│  - Processes image URLs                 │
│  - Passes processed URLs to client      │
└────────────┬────────────────────────────┘
             │ (passes hotels with processedImageUrl)
             ↓
┌─────────────────────────────────────────┐
│  Client Component (RightCarousel)       │
│  - Receives processed image URLs        │
│  - Displays images                      │
│  - No access to NEXT_BUCKET_URL         │
└─────────────────────────────────────────┘
```

---

## 📦 Files Changed

### Created:
- `.env.example` - Environment variable template
- `ENV_SETUP_INSTRUCTIONS.md` - This file

### Modified:
- `lib/utils.ts` - Added `processImageUrl()` utility function
- `types/hotel.ts` - Added `processedImageUrl?` to Hotel type
- `app/(features)/hotels/components/HotelList.tsx` - Process images on server
- `components/client/RightCarousel.tsx` - Use processed URLs from props
- `components/embla-carousel/EmblaCarousel.tsx` - Use processed URLs from props
- `app/(features)/hotels/[slug]/components/LocationInfo.tsx` - Use server-only env var
- `app/(features)/hotels/[slug]/components/Amenities.tsx` - Remove unused imports
- `app/(features)/hotels/[slug]/page.tsx` - Use utility function
- `lib/seo.ts` - Use utility function for schema images

---

## 🧪 Testing

After setup, verify everything works:

1. **Start dev server**:
   ```bash
   yarn dev
   ```

2. **Check images load**:
   - Visit `http://localhost:3000`
   - Verify hotel carousel images display correctly
   - Check hotel detail pages

3. **Verify security** (bucket URL not exposed):
   - Open browser DevTools
   - Check "Sources" or "Network" tab
   - Search for your bucket URL
   - It should NOT appear in any client JavaScript bundles

4. **Check console for errors**:
   - No "process.env.NEXT_BUCKET_URL is undefined" errors
   - Images should load properly

---

## 🚀 Deployment

When deploying to production (Cloudflare, Vercel, etc.):

1. Add environment variables in your hosting platform:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_API_BASE_URL`
   - `NEXT_BUCKET_URL`
   - `GOOGLE_SITE_VERIFICATION`

2. Ensure `NEXT_BUCKET_URL` is marked as **server-only** (not exposed to client)

3. Redeploy your application

---

## ❓ FAQ

### Q: Why not use `NEXT_PUBLIC_BUCKET_URL`?
**A**: Security. Keeping the bucket URL server-only prevents it from being exposed in the client bundle. Malicious users can't see or abuse your bucket URL.

### Q: What if I see "undefined" for images?
**A**: 
1. Check `.env` file exists
2. Verify `NEXT_BUCKET_URL` is set correctly
3. Restart dev server (`yarn dev`)
4. Check image URLs in your API responses have valid format

### Q: Can I use a different bucket service (AWS S3, etc.)?
**A**: Yes! Just update `NEXT_BUCKET_URL` to your bucket's public URL. The `processImageUrl()` function in `lib/utils.ts` handles the URL processing.

### Q: Where do I get my Cloudflare R2 bucket URL?
**A**: 
1. Go to Cloudflare Dashboard → R2
2. Select your bucket
3. Go to Settings → Public Access
4. Copy the "Public bucket URL"

---

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Image Optimization in Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

**Need Help?** Check the code comments in:
- `lib/utils.ts` - Image processing functions
- `app/(features)/hotels/components/HotelList.tsx` - Server-side processing example
