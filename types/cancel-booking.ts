export interface CancelBookingRequestOTP {
  bookingReference: string;
}

export interface CancelBookingRequest {
  bookingReferenceCode: string;
  otp: string;
}

export interface CancelBookingResponse {
  booking: CancelBookingResponseData;
}

export interface CancelBookingResponseData {
  id: number;
  referenceCode: string;
  status: string;
}

export interface CancelBookingVerifyOTPRequest {
  bookingReference: string;
  otp: string;
}

export interface CancelBookingVerifyOTPResponse {
  booking: CancelBookingResponseData;
}

export interface CancelBookingVerifyOTPResponseData {
  id: number;
  referenceCode: string;
  status: string;
}
