# JSON-LD Structured Data Implementation Guide

## Overview

This guide explains the JSON-LD structured data implementation for Raco Hotels, which enhances SEO
and enables rich search results in Google and other search engines. With proper JSON-LD markup, your
hotels can appear with enhanced features like:

- **Hotel carousels** in search results
- **Direct navigation** to specific hotels from search
- **Rich snippets** with ratings, prices, and images
- **Knowledge panels** with hotel information
- **Booking actions** directly from search results

## Table of Contents

1. [What is JSON-LD?](#what-is-json-ld)
2. [Schema Types Implemented](#schema-types-implemented)
3. [Implementation Details](#implementation-details)
4. [Testing Your Structured Data](#testing-your-structured-data)
5. [Best Practices](#best-practices)
6. [Troubleshooting](#troubleshooting)

## What is JSON-LD?

JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding structured data using
JSON. It's recommended by Google and provides a clean way to add metadata to your pages without
interfering with the HTML structure.

### Benefits:

- **Improved SEO**: Better understanding of your content by search engines
- **Rich Results**: Enhanced search results with images, ratings, prices
- **Direct Actions**: Users can book or navigate directly from search
- **Knowledge Graph**: Your content can appear in Google's Knowledge Graph
- **Voice Search**: Better discoverability through voice assistants

## Schema Types Implemented

### 1. Organization Schema (Homepage)

**Purpose**: Identifies Raco Hotels as an organization with contact information and social profiles.

**Location**: `/app/page.tsx`

**Schema Type**: `https://schema.org/Organization`

**Key Fields**:

- Organization name and logo
- Contact information (phone, email)
- Physical address
- Social media profiles
- Service area and languages

**Example**:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Raco Hotels",
  "url": "https://raco-hotels.com",
  "logo": "https://raco-hotels.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-212-555-1234",
    "contactType": "customer service"
  }
}
```

### 2. WebSite Schema (Homepage)

**Purpose**: Defines the website and enables search functionality directly from Google.

**Location**: `/app/page.tsx`

**Schema Type**: `https://schema.org/WebSite`

**Key Fields**:

- Website name and URL
- Search action with URL template
- Site description

**Search Action**: Enables the Google "Search this site" feature in search results.

### 3. ItemList Schema (Hotels Listing Page)

**Purpose**: Creates a structured list of hotels that can appear as a carousel in search results.

**Location**: `/app/(features)/hotels/page.tsx`

**Schema Type**: `https://schema.org/ItemList`

**Key Fields**:

- List of hotels with position
- Each hotel with name, description, image, location
- Star ratings and contact information

**Benefits**:

- Hotels can appear in carousel format
- Users can browse hotels directly from search
- Improves visibility for multiple properties

### 4. CollectionPage Schema (Hotels Listing Page)

**Purpose**: Identifies the hotels listing as a collection page.

**Location**: `/app/(features)/hotels/page.tsx`

**Schema Type**: `https://schema.org/CollectionPage`

**Key Fields**:

- Page name and description
- Parent website relationship

### 5. Enhanced LodgingBusiness Schema (Hotel Detail Pages)

**Purpose**: Provides comprehensive information about individual hotels with room offers.

**Location**: `/app/(features)/hotels/[slug]/page.tsx`

**Schema Type**: `https://schema.org/LodgingBusiness`

**Key Fields**:

- Hotel details (name, description, contact)
- Geographic coordinates
- Check-in/check-out times
- Amenities and features
- Star rating
- **Room offers with pricing** (NEW!)
- Reservation actions

**Room Offers**: Each room type is included as an `Offer` with:

- Room name and description
- Price per night
- Occupancy information
- Room size and bed type
- Availability status

**Example**:

```json
{
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  "name": "Luxury Hotel Downtown",
  "makesOffer": [
    {
      "@type": "Offer",
      "name": "Deluxe King Room",
      "price": "299.00",
      "priceCurrency": "USD",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "unitText": "per night"
      }
    }
  ]
}
```

### 6. BreadcrumbList Schema (All Pages)

**Purpose**: Shows the page hierarchy and navigation path.

**Location**: All major pages

**Schema Type**: `https://schema.org/BreadcrumbList`

**Key Fields**:

- List items with position
- Page name and URL

**Benefits**:

- Breadcrumb navigation in search results
- Better site structure understanding
- Improved internal linking signals

### 7. Product Schema (Room Types)

**Purpose**: Represents individual room types as bookable products.

**Schema Type**: `https://schema.org/Product`

**Key Fields**:

- Room name and description
- Images
- Pricing and currency
- Room specifications (size, occupancy, bed type)
- Availability and seller information

**Use Case**: Can be used for room-specific pages or detailed room comparisons.

### 8. AggregateRating Schema (Future Implementation)

**Purpose**: Display star ratings and review counts in search results.

**Schema Type**: `https://schema.org/AggregateRating`

**Status**: Helper function created, ready for implementation when reviews are available.

**Required Fields**:

- Rating value
- Review count
- Best/worst rating scale

## Implementation Details

### Function Reference

All JSON-LD generation functions are located in `/lib/seo.ts`:

#### Core Functions

1. **`generateOrganizationSchema()`**
   - No parameters required
   - Returns Organization schema for homepage

2. **`generateWebsiteSchema()`**
   - No parameters required
   - Returns Website schema with search action

3. **`generateHotelsListSchema(hotels)`**
   - Parameters: Array of hotel objects
   - Returns ItemList schema for hotels listing

4. **`generateCollectionPageSchema()`**
   - No parameters required
   - Returns CollectionPage schema

5. **`generateEnhancedHotelSchema(hotel, roomTypes?)`**
   - Parameters: Hotel object, optional room types array
   - Returns LodgingBusiness schema with room offers
   - **NEW**: Includes pricing and room details

6. **`generateHotelSchema(hotel)`**
   - Parameters: Hotel object
   - Returns basic Hotel schema (backward compatibility)

7. **`generateBreadcrumbSchema(items)`**
   - Parameters: Array of { name, url } objects
   - Returns BreadcrumbList schema

8. **`generateRoomProductSchema(hotel, room)`**
   - Parameters: Hotel info, room object
   - Returns Product schema for room types

9. **`generateAggregateRatingSchema(ratings)`**
   - Parameters: Rating statistics
   - Returns AggregateRating schema (for future use)

### Usage Examples

#### Adding Schema to a Page

```tsx
import Script from "next/script";
import { generateOrganizationSchema } from "@/lib/seo";

export default function MyPage() {
  const schema = generateOrganizationSchema();

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
      {/* Your page content */}
    </>
  );
}
```

#### Multiple Schemas on One Page

```tsx
const hotelSchema = generateEnhancedHotelSchema(hotel, roomTypes);
const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

return (
  <>
    <SEOHead structuredData={[hotelSchema, breadcrumbSchema]} />
    {/* Your content */}
  </>
);
```

## Testing Your Structured Data

### Google Rich Results Test

1. Visit: https://search.google.com/test/rich-results
2. Enter your URL or paste the HTML
3. Review validation results
4. Fix any errors or warnings

### Schema Markup Validator

1. Visit: https://validator.schema.org/
2. Paste your JSON-LD or enter URL
3. Check for schema.org compliance
4. Review suggestions

### Google Search Console

1. Go to Search Console → Enhancements
2. Check for structured data errors
3. Monitor rich result performance
4. Submit URLs for re-indexing after changes

### Testing Checklist

- ✅ All required properties present
- ✅ No schema validation errors
- ✅ URLs are absolute and correct
- ✅ Images are accessible and properly sized
- ✅ Prices are current and accurate
- ✅ Contact information is valid
- ✅ Geographic coordinates are correct
- ✅ Check-in/check-out times are accurate

## Best Practices

### 1. Keep Data Accurate and Current

- Update prices regularly
- Ensure availability reflects actual inventory
- Keep contact information current
- Update images and descriptions

### 2. Use Complete Data

- Fill all recommended properties
- Provide high-quality images
- Include detailed descriptions
- Add all available amenities

### 3. Maintain Consistency

- Ensure data matches visible page content
- Use same format across all pages
- Keep naming conventions consistent
- Synchronize with other marketing materials

### 4. Image Requirements

For optimal results in rich snippets:

- **Minimum**: 1200px wide
- **Aspect ratios**: 16:9, 4:3, or 1:1
- **Format**: JPG, PNG, or WebP
- **File size**: Optimized but high quality

### 5. Price Information

- Always include currency code
- Use decimal format (e.g., "299.00" not "299")
- Specify unit of time (per night)
- Include any taxes/fees if required by law

### 6. Review and Rating Guidelines

When implementing reviews:

- Only include genuine reviews
- Follow Google's review snippet guidelines
- Use appropriate date formats
- Include reviewer name if available

### 7. Schema Updates

- Monitor schema.org for new properties
- Update when Google releases new features
- Test after major changes
- Keep up with search engine guidelines

## Rich Result Opportunities

### Hotel Carousels

When properly implemented, your hotels can appear in carousel format showing:

- Hotel images
- Star ratings
- Starting prices
- Location information
- Direct links to hotel pages

### Booking Actions

Users may see "Book" or "Check Availability" buttons directly in search results, leading to your
booking pages.

### Knowledge Panels

Your hotel properties may appear in Knowledge Panels with:

- Photos and virtual tours
- Reviews and ratings
- Contact information
- Location maps
- Price ranges

### Voice Search

Proper structured data improves discoverability through:

- Google Assistant
- Alexa
- Siri
- Other voice assistants

## Troubleshooting

### Common Issues

#### 1. Schema Not Appearing in Rich Results

**Possible Causes**:

- Recently added (can take 2-4 weeks)
- Validation errors
- Low page quality signals
- Competitive SERP

**Solutions**:

- Verify with Rich Results Test
- Check Search Console for errors
- Ensure content quality
- Request re-indexing

#### 2. Validation Errors

**Common Errors**:

- Missing required properties
- Invalid property values
- Incorrect data types
- Malformed JSON

**Solutions**:

- Use schema.org validator
- Check JSON syntax
- Verify all URLs are absolute
- Test thoroughly before deployment

#### 3. Inconsistent Data

**Issue**: Schema data doesn't match page content

**Solution**:

- Ensure visual and structured data match
- Update both simultaneously
- Use single source of truth for data
- Implement automated testing

#### 4. Image Issues

**Problems**:

- Images not showing in rich results
- Low-quality thumbnails

**Solutions**:

- Meet minimum size requirements (1200px)
- Use proper aspect ratios
- Optimize for web (fast loading)
- Ensure images are accessible (no auth required)

### Monitoring Performance

1. **Google Search Console**
   - Track rich result impressions
   - Monitor click-through rates
   - Check for enhancement errors
   - Review coverage reports

2. **Analytics**
   - Track traffic from rich results
   - Monitor booking conversions
   - Compare performance over time
   - A/B test schema variations

3. **Regular Audits**
   - Monthly schema validation
   - Quarterly comprehensive review
   - Update for new features
   - Remove deprecated properties

## Additional Resources

### Official Documentation

- [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [Schema.org - Hotel](https://schema.org/Hotel)
- [Schema.org - LodgingBusiness](https://schema.org/LodgingBusiness)
- [JSON-LD Specification](https://json-ld.org/)

### Testing Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema Markup Validator](https://validator.schema.org/)
- [Google Search Console](https://search.google.com/search-console)

### Best Practice Guides

- [Google Hotel Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/hotel)
- [Schema.org Best Practices](https://schema.org/docs/bestpractices.html)

## Future Enhancements

### Planned Features

1. **Review Integration**
   - Add AggregateRating to hotel pages
   - Include individual review markup
   - Display rating stars in search

2. **Event Markup**
   - Special events at hotels
   - Seasonal promotions
   - Conference facilities

3. **FAQ Sections**
   - Common hotel questions
   - Policy information
   - Amenity details

4. **Video Content**
   - Hotel tours
   - Room previews
   - Amenity showcases

5. **Special Offers**
   - Seasonal discounts
   - Package deals
   - Early booking offers

## Support and Maintenance

### Regular Tasks

- **Weekly**: Monitor Search Console for errors
- **Monthly**: Validate schema on key pages
- **Quarterly**: Full audit of all structured data
- **Annually**: Review and update based on new features

### Getting Help

If you encounter issues with JSON-LD implementation:

1. Check this documentation first
2. Review Google Search Console errors
3. Test with validation tools
4. Consult official schema.org documentation
5. Reach out to the development team

---

**Last Updated**: November 2025

**Version**: 2.0

**Author**: Raco Hotels Development Team
