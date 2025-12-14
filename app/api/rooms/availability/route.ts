import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hotelId = searchParams.get("hotelId");
    const checkInDate = searchParams.get("checkInDate");
    const checkOutDate = searchParams.get("checkOutDate");
    const roomTypeId = searchParams.get("roomTypeId");

    // Validate required parameters
    if (!hotelId || !checkInDate || !checkOutDate) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required parameters: hotelId, checkInDate, checkOutDate",
        },
        { status: 400 }
      );
    }

    // Build query string for backend
    const backendParams = new URLSearchParams({
      hotelId,
      checkInDate,
      checkOutDate,
    });

    if (roomTypeId) {
      backendParams.append("roomTypeId", roomTypeId);
    }

    const backendUrl = `${BACKEND_API_URL}/api/rooms/availability?${backendParams.toString()}`;

    // Fetch from backend API
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Backend API error: ${response.status} ${response.statusText}`,
        errorText
      );
      return NextResponse.json(
        {
          success: false,
          error: `Backend API returned ${response.status}: ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error proxying availability request:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
