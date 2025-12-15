"use client";
import { message } from "@/components/message";
import { PaymentDetails } from "@/types/razorpay";
import { CloseOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, Modal } from "antd";
import React from "react";

interface BookingData {
  id: number;
  referenceCode: string;
  hotelId: number;
  status: string;
  source: string;
  checkInDate: string;
  checkOutDate: string;
  numAdults: number;
  numChildren: number;
  totalAmountCents: number;
  currencyCode: string;
  taxAmountCents: number;
  feeAmountCents: number;
  discountAmountCents: number;
  amountPaidCents: number;
  balanceDueCents: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentProcessor: string;
  notes?: string;
  createdAt: string;
}

interface BookingResponse {
  success: boolean;
  data: {
    booking: BookingData;
  };
}

interface BookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingResponse: BookingResponse | null;
  hotelName?: string;
  customerName?: string;
  paymentDetails?: PaymentDetails | null;
}

const formatCurrency = (amountCents: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
    minimumFractionDigits: 0,
  }).format(amountCents / 100);
};

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingResponse,
  hotelName = "Hotel Name",
  customerName = "Guest",
  paymentDetails = null,
}) => {
  const receiptRef = React.useRef<HTMLDivElement>(null);

  if (!bookingResponse?.data?.booking) return null;

  const booking = bookingResponse.data.booking;

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) {
      message.error("Receipt content not available");
      return;
    }

    let buttons: NodeListOf<Element> | null = null;

    try {
      message.loading("Generating PDF...");

      // Dynamic import to avoid SSR issues
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;

      // Hide buttons temporarily
      buttons = receiptRef.current.querySelectorAll(".no-print");
      buttons.forEach((btn) => {
        (btn as HTMLElement).style.display = "none";
      });

      // Add a temporary style to override all lab() colors
      const tempStyle = document.createElement("style");
      tempStyle.id = "pdf-color-override";
      tempStyle.textContent = `
        .booking-receipt,
        .booking-receipt * {
          color: rgb(0, 0, 0) !important;
          border-color: rgb(209, 213, 219) !important;
          background: transparent !important;
        }
        .booking-receipt [style*="color: #1e40af"],
        .booking-receipt .text-blue-600 {
          color: rgb(30, 64, 175) !important;
        }
        .booking-receipt [style*="color: #dc2626"],
        .booking-receipt .text-red-600 {
          color: rgb(220, 38, 38) !important;
        }
        .booking-receipt [style*="color: #16a34a"],
        .booking-receipt .text-green-600 {
          color: rgb(22, 163, 74) !important;
        }
        .booking-receipt .text-yellow-600,
        .booking-receipt .text-yellow-800 {
          color: rgb(146, 64, 14) !important;
        }
        .booking-receipt .text-green-800 {
          color: rgb(22, 101, 52) !important;
        }
      `;
      document.head.appendChild(tempStyle);

      // Small delay to ensure render
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Capture the screenshot
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector(".booking-receipt");
          if (clonedElement) {
            // Force all elements to use explicit RGB colors
            const allElements = clonedElement.querySelectorAll("*");

            allElements.forEach((el) => {
              const htmlEl = el as HTMLElement;

              // Get current styles and convert to RGB
              const computedStyle =
                clonedDoc.defaultView?.getComputedStyle(htmlEl);

              if (computedStyle) {
                // Force text color to black or white based on original
                if (
                  computedStyle.color &&
                  computedStyle.color !== "rgba(0, 0, 0, 0)"
                ) {
                  htmlEl.style.color = computedStyle.color.includes("rgb")
                    ? computedStyle.color
                    : "#000000";
                }

                // Remove all background colors to prevent PDF issues
                htmlEl.style.backgroundColor = "transparent";
              }
            });

            // Add a style tag to override any lab() colors
            const style = clonedDoc.createElement("style");
            style.textContent = `
              * {
                color: inherit !important;
                border-color: currentColor !important;
                background-color: transparent !important;
                background: transparent !important;
              }
              [style*="lab("] {
                color: #000000 !important;
                background-color: transparent !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        },
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png", 1.0);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit page with margins
      const margin = 10;
      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = margin;

      // Add first page
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - margin * 2;

      // Add remaining pages if content is longer
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - margin * 2;
      }

      // Save the PDF
      const filename = `Booking-Receipt-${booking.referenceCode}.pdf`;

      pdf.save(filename);

      message.success("PDF downloaded successfully!");
    } catch (error) {
      // console.error("PDF Generation Error:", error);
      // console.error("Error details:", {
      //   message: error instanceof Error ? error.message : "Unknown",
      //   stack: error instanceof Error ? error.stack : undefined,
      // });

      message.error(
        `Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      // Always restore buttons visibility
      if (buttons) {
        buttons.forEach((btn) => {
          (btn as HTMLElement).style.display = "";
        });
      }

      // Remove temporary color override style
      const tempStyle = document.getElementById("pdf-color-override");
      if (tempStyle) {
        tempStyle.remove();
      }
    }
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={550}
      centered
      maskClosable={false}
      closeIcon={<CloseOutlined />}
      styles={{
        body: { padding: 0, maxHeight: "85vh", overflowY: "hidden" },
        mask: { zIndex: 10000 },
        wrapper: { zIndex: 10001 },
      }}
      style={{ zIndex: 10001 }}
    >
      <div ref={receiptRef} className="bg-white booking-receipt">
        {/* Header */}

        {/* Receipt Content */}
        <div className="p-4">
          {/* Booking Reference */}
          <div className="text-center mb-4">
            <div className="text-base font-semibold text-gray-700 mb-1">
              Booking Confirmed
            </div>
            <div
              className="text-xl font-bold text-blue-600 py-1.5 px-3 rounded-lg inline-block border"
              style={{ color: "#1e40af", borderColor: "#1e40af" }}
            >
              {booking.referenceCode}
            </div>
          </div>

          {/* Combined Guest, Hotel, and Stay Information */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div>
              <h4 className="font-semibold text-gray-700 mb-1.5 text-sm">
                Guest Details
              </h4>
              <div className="space-y-1 text-xs">
                <div>
                  <strong>Name:</strong> {customerName}
                </div>
                <div>
                  <strong>ID:</strong> #{booking.id}
                </div>
                <div>
                  <strong>Status:</strong>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded-full text-xs  ${
                      booking.status === "confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                    style={{
                      color:
                        booking.status === "confirmed" ? "#166534" : "#92400e",
                      borderColor:
                        booking.status === "confirmed" ? "#86efac" : "#fde047",
                    }}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-1.5 text-sm">
                Hotel Details
              </h4>
              <div className="space-y-1 text-xs">
                <div>
                  <strong>Hotel:</strong> {hotelName}
                </div>
                <div>
                  <strong>Adults:</strong> {booking.numAdults}
                </div>
                <div>
                  <strong>Children:</strong> {booking.numChildren}
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-1.5 text-sm">
                Stay Information
              </h4>
              <div className="space-y-1 text-xs">
                <div>
                  <div className="font-medium text-gray-600">Check-in:</div>
                  <div className="font-semibold">
                    {new Date(booking.checkInDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="font-medium text-gray-600">Check-out:</div>
                  <div className="font-semibold">
                    {new Date(booking.checkOutDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Divider className="my-3" />

          {/* Payment Summary */}
          <div className="mb-3">
            <h4 className="font-semibold text-gray-700 mb-2 text-sm">
              Payment Summary
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {formatCurrency(
                    booking.totalAmountCents - booking.taxAmountCents,
                    booking.currencyCode
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%):</span>
                <span>
                  {formatCurrency(booking.taxAmountCents, booking.currencyCode)}
                </span>
              </div>
              {booking.discountAmountCents > 0 && (
                <div
                  className="flex justify-between text-green-600"
                  style={{ color: "#16a34a" }}
                >
                  <span>Discount:</span>
                  <span>
                    -
                    {formatCurrency(
                      booking.discountAmountCents,
                      booking.currencyCode
                    )}
                  </span>
                </div>
              )}
              <Divider className="my-1.5" />
              <div className="flex justify-between font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-blue-600" style={{ color: "#1e40af" }}>
                  {formatCurrency(
                    booking.totalAmountCents,
                    booking.currencyCode
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Amount Paid:</span>
                <span>
                  {formatCurrency(
                    booking.amountPaidCents,
                    booking.currencyCode
                  )}
                </span>
              </div>
              <div
                className="flex justify-between font-medium text-red-600"
                style={{ color: "#dc2626" }}
              >
                <span>Balance Due:</span>
                <span>
                  {formatCurrency(
                    booking.balanceDueCents,
                    booking.currencyCode
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>
                  <strong>Payment Status:</strong>
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-xs  ${
                    paymentDetails?.status === "success"
                      ? "text-green-800"
                      : booking.paymentStatus === "completed"
                        ? "text-green-800 "
                        : "text-yellow-800 "
                  }`}
                  style={{
                    color:
                      paymentDetails?.status === "success"
                        ? "#166534"
                        : booking.paymentStatus === "completed"
                          ? "#166534"
                          : "#92400e",
                    borderColor:
                      paymentDetails?.status === "success"
                        ? "#86efac"
                        : booking.paymentStatus === "completed"
                          ? "#86efac"
                          : "#fde047",
                  }}
                >
                  {paymentDetails?.status === "success"
                    ? "PAID"
                    : booking.paymentStatus.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Razorpay Payment Details */}
          {Boolean(paymentDetails) && (
            <div className="mb-3">
              <h4 className="font-semibold text-gray-700 mb-1.5 text-sm">
                Payment Information
              </h4>
              <div className="text-xs space-y-1 border border-green-200 p-2 rounded-lg">
                <div>
                  <strong>Payment Gateway:</strong> Razorpay
                </div>
                {Boolean(paymentDetails?.paymentId) && (
                  <div className="break-all">
                    <strong>Transaction ID:</strong> {paymentDetails?.paymentId}
                  </div>
                )}
                {Boolean(paymentDetails?.orderId) && (
                  <div className="break-all">
                    <strong>Order ID:</strong> {paymentDetails?.orderId}
                  </div>
                )}
                {paymentDetails?.amount !== undefined && (
                  <div>
                    <strong>Amount Paid:</strong>{" "}
                    {formatCurrency(
                      paymentDetails.amount,
                      paymentDetails.currency
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Payment Information */}
          {/* <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">
              Payment Information
            </h4>
            <div className="text-sm space-y-1">
              <div>
                <strong>Payment Status:</strong>
                <span
                  className={`ml-1 px-2 py-1 rounded-full text-xs ${
                    booking.paymentStatus === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                  style={{
                    backgroundColor:
                      booking.paymentStatus === "completed"
                        ? "#dcfce7"
                        : "#fef3c7",
                    color:
                      booking.paymentStatus === "completed"
                        ? "#166534"
                        : "#92400e",
                  }}
                >
                  {booking.paymentStatus.toUpperCase()}
                </span>
              </div>
              <div>
                <strong>Payment Method:</strong>{" "}
                {booking.paymentMethod.toUpperCase()}
              </div>
              <div>
                <strong>Processor:</strong>{" "}
                {booking.paymentProcessor.toUpperCase()}
              </div>
            </div>
          </div> */}

          <div className="text-xs text-gray-500 text-center mb-2">
            Booking created on{" "}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 border-t no-print">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadPDF}
              className="flex-1 !bg-blue-600"
              size="middle"
            >
              Download PDF
            </Button>
            <Button onClick={onClose} size="middle" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingConfirmationModal;
