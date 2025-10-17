import {
  createHeadResponse,
  createNotFoundResponse,
  createSuccessResponse,
  withErrorHandler,
} from "@/lib/api-response";
import { ApiResponse, Hotel, HotelDetailsResponse } from "@/types";
import { NextRequest } from "next/server";

interface BackendHotelResponse {
  success: boolean;
  data: {
    hotel: Hotel;
    message: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  return withErrorHandler(async () => {
    const { slug } = await params;

    if (!process.env.NEXT_BACKEND_URL) {
      throw new Error("Backend URL is not configured");
    }

    const backendUrl = `${process.env.NEXT_BACKEND_URL}/api/hotels/slug/${slug}`;

    const res = await fetch(backendUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (res.status === 404) {
      return createNotFoundResponse(`Hotel with slug '${slug}' not found`);
    }

    if (!res.ok) {
      const errorBody = await res.text();
      throw new Error(
        `Failed to fetch hotel details from backend: ${res.status} ${res.statusText} - ${errorBody}`
      );
    }

    const backendResponse: BackendHotelResponse = await res.json();

    if (!backendResponse.success) {
      return createNotFoundResponse(`Hotel with slug '${slug}' not found`);
    }

    if (!backendResponse.data?.hotel) {
      return createNotFoundResponse(`Hotel with slug '${slug}' not found`);
    }

    const hotel: Hotel = backendResponse.data.hotel;

    const response: ApiResponse<HotelDetailsResponse> = {
      success: true,
      message: backendResponse.data.message,
      data: {
        hotel,
      },
    };

    return createSuccessResponse(response, { cache: "MEDIUM" });
  }, "Failed to fetch hotel details");
}

export async function HEAD(
  _request: NextRequest,
  { _params }: { _params: Promise<{ slug: string }> }
) {
  return withErrorHandler(
    () => createHeadResponse({ cache: "MEDIUM" }),
    "Failed to process HEAD request"
  );
}
