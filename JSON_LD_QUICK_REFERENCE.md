# JSON-LD Quick Reference Card

## Quick Implementation Guide

### 🏠 Homepage Schema

```tsx
import { generateOrganizationSchema, generateWebsiteSchema } from "@/lib/seo";
import Script from "next/script";

const orgSchema = generateOrganizationSchema();
const websiteSchema = generateWebsiteSchema();

<Script id="org-schema" type="application/ld+json" 
  dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
<Script id="website-schema" type="application/ld+json" 
  dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
```

### 🏨 Hotels Listing Page

```tsx
import { 
  generateHotelsListSchema, 
  generateCollectionPageSchema,
  generateBreadcrumbSchema 
} from "@/lib/seo";

const hotels = await getActiveHotels();
const listSchema = generateHotelsListSchema(hotels);
const collectionSchema = generateCollectionPageSchema();
const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: siteUrl },
  { name: "Hotels", url: `${siteUrl}/hotels` }
]);

// Add three Script tags with these schemas
```

### 🛏️ Hotel Detail Page

```tsx
import { 
  generateEnhancedHotelSchema, 
  generateBreadcrumbSchema 
} from "@/lib/seo";

const hotel = await getHotelBySlug(slug);
const roomTypes = await getHotelRoomTypes(hotel.id);

// Enhanced schema WITH room offers and pricing
const enhancedSchema = generateEnhancedHotelSchema(hotel, roomTypes);

// Breadcrumbs
const breadcrumbs = generateBreadcrumbSchema([
  { name: "Home", url: siteUrl },
  { name: "Hotels", url: `${siteUrl}/hotels` },
  { name: hotel.name, url: `${siteUrl}/hotels/${slug}` }
]);

// Use SEOHead component
<SEOHead structuredData={[enhancedSchema, breadcrumbs]} />
```

## Available Schema Functions

| Function | Purpose | Returns |
|----------|---------|---------|
| `generateOrganizationSchema()` | Company info | Organization |
| `generateWebsiteSchema()` | Site + search | WebSite |
| `generateHotelsListSchema(hotels)` | Hotel list carousel | ItemList |
| `generateCollectionPageSchema()` | Collection page | CollectionPage |
| `generateEnhancedHotelSchema(hotel, rooms?)` | Hotel + room offers | LodgingBusiness |
| `generateHotelSchema(hotel)` | Basic hotel info | Hotel |
| `generateBreadcrumbSchema(items)` | Navigation path | BreadcrumbList |
| `generateRoomProductSchema(hotel, room)` | Room as product | Product |
| `generateLocalBusinessSchema(hotel)` | Local business | LodgingBusiness |
| `generateFAQSchema(faqs)` | FAQ section | FAQPage |
| `generateAggregateRatingSchema(ratings)` | Review ratings | AggregateRating |

## Schema Benefits by Type

### 🎯 ItemList (Hotels Listing)
- ✅ Carousel in search results
- ✅ Multiple hotels shown at once
- ✅ Quick navigation from search
- ✅ Images and ratings displayed

### 🏪 LodgingBusiness (Hotel Pages)
- ✅ Rich snippets with photos
- ✅ Star ratings visible
- ✅ Pricing information
- ✅ Booking actions
- ✅ Map integration
- ✅ Check-in/out times

### 📦 Product (Room Types)
- ✅ Price comparisons
- ✅ Availability status
- ✅ Room specifications
- ✅ Direct booking links

### 🍞 BreadcrumbList
- ✅ Breadcrumb navigation
- ✅ Site structure clarity
- ✅ Better internal linking

## Testing URLs

- **Rich Results**: https://search.google.com/test/rich-results
- **Validator**: https://validator.schema.org/
- **Search Console**: https://search.google.com/search-console

## Required Data Fields

### For Hotel Schema
```typescript
{
  name: string;              // ✅ Required
  description: string;       // ✅ Required
  address: object;           // ✅ Required
  telephone: string;         // ✅ Required
  image: string[];           // ✅ Required (at least 1)
  geo: { lat, lng };        // 🌟 Recommended
  starRating: number;        // 🌟 Recommended
  priceRange: string;        // 🌟 Recommended
  amenityFeature: array;     // 📝 Optional
}
```

### For Room Offers
```typescript
{
  name: string;              // ✅ Required
  description: string;       // ✅ Required
  price: string;             // ✅ Required
  priceCurrency: string;     // ✅ Required
  availability: URL;         // 🌟 Recommended
  url: string;              // 🌟 Recommended
}
```

## Common Patterns

### Multiple Schemas on One Page
```tsx
<SEOHead structuredData={[schema1, schema2, schema3]} />
```

### With Next.js Script Component
```tsx
<Script
  id="unique-id"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### With SEOHead Component
```tsx
<SEOHead
  title="Page Title"
  description="Description"
  canonical={canonicalUrl}
  structuredData={[schema]}
/>
```

## Image Requirements

- **Minimum Width**: 1200px
- **Formats**: JPG, PNG, WebP
- **Aspect Ratios**: 16:9, 4:3, 1:1
- **Quality**: High-res but optimized
- **Accessibility**: Publicly accessible URLs

## Price Format

```typescript
// ✅ Correct
price: "299.00"
priceCurrency: "USD"

// ❌ Wrong
price: 299
price: "$299"
price: "299"  // Missing decimals
```

## Common Mistakes to Avoid

❌ Relative URLs instead of absolute  
❌ Missing required fields  
❌ Incorrect data types  
❌ Schema data doesn't match page content  
❌ Images behind authentication  
❌ Missing currency codes  
❌ Invalid JSON syntax  

## Testing Checklist

- [ ] Validation passes (validator.schema.org)
- [ ] Rich Results Test passes
- [ ] All images load
- [ ] Prices are current
- [ ] URLs are absolute
- [ ] Data matches page content
- [ ] No console errors

## Search Result Features

### What Users See

**Hotel Listing**:
- 🖼️ Image carousel
- ⭐ Star rating
- 💰 Starting price
- 📍 Location
- 🔗 Direct link

**Hotel Details**:
- 🏨 Hotel name & description
- ⭐ Ratings
- 💵 Price range
- 🗺️ Map location
- 📞 Contact info
- 🛏️ Room options
- ✅ Availability
- 🎯 Book button

## File Locations

- **Schema Functions**: `/lib/seo.ts`
- **Homepage**: `/app/page.tsx`
- **Hotels List**: `/app/(features)/hotels/page.tsx`
- **Hotel Detail**: `/app/(features)/hotels/[slug]/page.tsx`
- **SEO Component**: `/components/SEOHead.tsx`

## Need Help?

1. Check `JSON_LD_SCHEMA_GUIDE.md` for detailed docs
2. Test with Google Rich Results Test
3. Check Search Console for errors
4. Review schema.org documentation

---

**Quick Tip**: Always test your structured data after making changes. Google's Rich Results Test is your best friend! 🚀

