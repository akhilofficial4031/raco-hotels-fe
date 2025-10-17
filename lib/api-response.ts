import { NextResponse } from "next/server";

// Cache control configurations
export const CACHE_CONFIGS = {
  // No cache - for dynamic/user-specific content
  NO_CACHE: "no-store, no-cache, must-revalidate",

  // Short cache - for frequently changing content (5 minutes)
  SHORT: "public, s-maxage=300, stale-while-revalidate=600",

  // Medium cache - for semi-static content (1 hour)
  MEDIUM: "public, s-maxage=3600, stale-while-revalidate=7200",

  // Long cache - for static content (24 hours)
  LONG: "public, s-maxage=86400, stale-while-revalidate=172800",

  // Very long cache - for rarely changing content (7 days)
  VERY_LONG: "public, s-maxage=604800, stale-while-revalidate=1209600",
} as const;

// Standard response headers for APIs
const getStandardHeaders = (cacheControl?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (cacheControl) {
    headers["Cache-Control"] = cacheControl;
  }

  return headers;
};

// Success response builder
export function createSuccessResponse<T>(
  data: T,
  options: {
    status?: number;
    cache?: keyof typeof CACHE_CONFIGS | string;
    headers?: Record<string, string>;
  } = {}
) {
  const { status = 200, cache, headers: additionalHeaders = {} } = options;

  const cacheControl = cache
    ? typeof cache === "string"
      ? cache
      : CACHE_CONFIGS[cache]
    : undefined;

  return NextResponse.json(data, {
    status,
    headers: {
      ...getStandardHeaders(cacheControl),
      ...additionalHeaders,
    },
  });
}

// Error response builder
export function createErrorResponse(
  message: string,
  options: {
    status?: number;
    code?: string;
    details?: unknown;
    headers?: Record<string, string>;
  } = {}
) {
  const {
    status = 500,
    code,
    details,
    headers: additionalHeaders = {},
  } = options;

  const errorData: Record<string, unknown> = {
    error: message,
    timestamp: new Date().toISOString(),
  };

  if (code) errorData.code = code;
  if (details) errorData.details = details;

  return NextResponse.json(errorData, {
    status,
    headers: {
      ...getStandardHeaders(CACHE_CONFIGS.NO_CACHE), // Never cache errors
      ...additionalHeaders,
    },
  });
}

// HEAD response builder
export function createHeadResponse(
  options: {
    cache?: keyof typeof CACHE_CONFIGS | string;
    headers?: Record<string, string>;
  } = {}
) {
  const { cache, headers: additionalHeaders = {} } = options;

  const cacheControl = cache
    ? typeof cache === "string"
      ? cache
      : CACHE_CONFIGS[cache]
    : undefined;

  return new NextResponse(null, {
    status: 200,
    headers: {
      ...getStandardHeaders(cacheControl),
      ...additionalHeaders,
    },
  });
}

// Not found response builder
export function createNotFoundResponse(message = "Resource not found") {
  return createErrorResponse(message, {
    status: 404,
    code: "NOT_FOUND",
  });
}

// Validation error response builder
export function createValidationErrorResponse(
  message = "Invalid request data",
  details?: unknown
) {
  return createErrorResponse(message, {
    status: 400,
    code: "VALIDATION_ERROR",
    details,
  });
}

// Unauthorized response builder
export function createUnauthorizedResponse(message = "Unauthorized access") {
  return createErrorResponse(message, {
    status: 401,
    code: "UNAUTHORIZED",
  });
}

// Rate limit response builder
export function createRateLimitResponse(message = "Too many requests") {
  return createErrorResponse(message, {
    status: 429,
    code: "RATE_LIMIT_EXCEEDED",
    headers: {
      "Retry-After": "60", // Suggest retry after 60 seconds
    },
  });
}

// API response wrapper with error handling
export async function withErrorHandler<T>(
  handler: () => Promise<T> | T,
  errorMessage = "Internal server error"
): Promise<NextResponse> {
  try {
    const result = await handler();
    return result instanceof NextResponse
      ? result
      : createSuccessResponse(result);
  } catch (error) {
    // Log error in development only to avoid console warnings in production
    if (process.env.NODE_ENV === "development") {
      console.error("API Error:", error);
    }

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes("validation")) {
        return createValidationErrorResponse(error.message);
      }
      if (error.message.includes("not found")) {
        return createNotFoundResponse(error.message);
      }
      if (error.message.includes("unauthorized")) {
        return createUnauthorizedResponse(error.message);
      }
    }

    return createErrorResponse(errorMessage);
  }
}
