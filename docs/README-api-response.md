# API Response Utilities Documentation

## Overview

This utility provides standardized response builders for Next.js API routes, following Next.js best practices for consistent API responses, caching, and error handling.

## Location

`lib/api-response.ts`

## Features

### 1. **Standardized Cache Control**
```typescript
export const CACHE_CONFIGS = {
  NO_CACHE: "no-store, no-cache, must-revalidate",        // Dynamic content
  SHORT: "public, s-maxage=300, stale-while-revalidate=600",     // 5 minutes
  MEDIUM: "public, s-maxage=3600, stale-while-revalidate=7200",  // 1 hour  
  LONG: "public, s-maxage=86400, stale-while-revalidate=172800", // 24 hours
  VERY_LONG: "public, s-maxage=604800, stale-while-revalidate=1209600", // 7 days
}
```

### 2. **Response Builders**

#### Success Response
```typescript
// Basic usage
return createSuccessResponse(data, { cache: "MEDIUM" });

// Advanced usage
return createSuccessResponse(data, {
  status: 201,
  cache: "SHORT",
  headers: { "X-Custom-Header": "value" }
});
```

#### Error Response
```typescript
// Basic error
return createErrorResponse("Something went wrong");

// Detailed error
return createErrorResponse("Invalid input", {
  status: 400,
  code: "VALIDATION_ERROR",
  details: { field: "email", message: "Invalid format" }
});
```

#### Specialized Error Responses
```typescript
// Pre-built error responses
return createNotFoundResponse("User not found");
return createValidationErrorResponse("Invalid email", { field: "email" });
return createUnauthorizedResponse();
return createRateLimitResponse();
```

#### HEAD Response
```typescript
return createHeadResponse({ cache: "MEDIUM" });
```

### 3. **Error Handler Wrapper**
```typescript
export async function GET() {
  return withErrorHandler(
    async () => {
      const data = await fetchSomeData();
      return createSuccessResponse(data, { cache: "MEDIUM" });
    },
    "Failed to fetch data"
  );
}
```

## Usage Examples

### Simple API Route
```typescript
// app/api/users/route.ts
import { createSuccessResponse, withErrorHandler } from "@/lib/api-response";

export async function GET() {
  return withErrorHandler(
    async () => {
      const users = await getUsers();
      return createSuccessResponse(users, { cache: "SHORT" });
    }
  );
}
```

### Complex API Route with Validation
```typescript
// app/api/users/[id]/route.ts
import { 
  createSuccessResponse, 
  createNotFoundResponse,
  createValidationErrorResponse,
  withErrorHandler 
} from "@/lib/api-response";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  return withErrorHandler(async () => {
    const { id } = params;
    
    if (!id || isNaN(Number(id))) {
      return createValidationErrorResponse("Invalid user ID");
    }
    
    const user = await getUserById(id);
    
    if (!user) {
      return createNotFoundResponse("User not found");
    }
    
    return createSuccessResponse(user, { cache: "MEDIUM" });
  });
}
```

### Before vs After Comparison

#### Before (Redundant Code)
```typescript
export async function GET() {
  try {
    const data = await fetchData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
```

#### After (Clean & Consistent)
```typescript
export async function GET() {
  return withErrorHandler(
    async () => {
      const data = await fetchData();
      return createSuccessResponse(data, { cache: "MEDIUM" });
    }
  );
}
```

## Benefits

### 1. **DRY Principle**
- No repeated response creation code
- Centralized cache control configuration
- Consistent error handling

### 2. **Type Safety**
- TypeScript support for all response builders
- Compile-time validation of cache configs
- Proper typing for error responses

### 3. **Consistency**
- All APIs use the same response format
- Standardized error structure with timestamps
- Consistent cache headers

### 4. **Maintainability**
- Update cache policies in one place
- Easy to modify error response format
- Centralized logging and error handling

### 5. **Developer Experience**
- Simple, intuitive API
- Less boilerplate code
- Built-in best practices

## Error Response Format

All errors follow a consistent structure:
```json
{
  "error": "Human-readable error message",
  "code": "MACHINE_READABLE_CODE",
  "details": { /* Additional context */ },
  "timestamp": "2023-10-15T10:30:00.000Z"
}
```

## Cache Strategy

- **NO_CACHE**: User-specific data, real-time content
- **SHORT (5min)**: Frequently changing data (live prices, inventory)
- **MEDIUM (1hr)**: Semi-static content (product details, user profiles)
- **LONG (24hr)**: Static content (configuration, settings)
- **VERY_LONG (7d)**: Rarely changing content (terms of service, help docs)

## Best Practices

1. **Always use `withErrorHandler`** for automatic error handling
2. **Choose appropriate cache levels** based on data volatility
3. **Provide meaningful error messages** for better debugging
4. **Use specific error response builders** for common scenarios
5. **Add custom headers** only when necessary
6. **Log errors** are automatically handled by `withErrorHandler`
