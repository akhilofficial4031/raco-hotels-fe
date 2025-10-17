import {
  createHeadResponse,
  createSuccessResponse,
  withErrorHandler,
} from "@/lib/api-response";
import { ApiResponse, HotelResponse } from "@/types";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ?? "50";
    const page = searchParams.get("page") ?? "1";

    const backendUrl = new URL(`${process.env.NEXT_BACKEND_URL}/api/hotels`);
    backendUrl.searchParams.set("limit", limit);
    backendUrl.searchParams.set("page", page);

    const response = await fetch(backendUrl.toString(), {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch hotels from backend API");
    }

    const data: ApiResponse<HotelResponse> = await response.json();

    return createSuccessResponse(data, { cache: "MEDIUM" });
  }, "Failed to fetch hotels");
}

export async function HEAD(_request: NextRequest) {
  return withErrorHandler(
    () => createHeadResponse({ cache: "MEDIUM" }),
    "Failed to process HEAD request"
  );
}
