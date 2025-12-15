"use client";
import React from "react";
import { Modal, Button, Divider } from "antd";
import { message } from "@/components/message";
import { DownloadOutlined, CloseOutlined } from "@ant-design/icons";

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
}

const formatCurrency = (amountCents: number, currencyCode: string) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currencyCode || "INR",
    minimumFractionDigits: 0,
  }).format(amountCents / 100);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  isOpen,
  onClose,
  bookingResponse,
  hotelName = "Hotel Name",
  customerName = "Guest",
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
      message.loading({ content: "Generating PDF...", key: "pdf-generation" });

      console.log("Starting PDF generation...");

      // Dynamic import to avoid SSR issues
      console.log("Importing libraries...");
      const html2canvas = (await import("html2canvas")).default;
      const jsPDF = (await import("jspdf")).default;
      console.log("Libraries loaded successfully");

      // Hide buttons temporarily
      buttons = receiptRef.current.querySelectorAll(".no-print");
      console.log(`Found ${buttons.length} buttons to hide`);
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
        .booking-receipt [style*="background:"],
        .booking-receipt [style*="linear-gradient"] {
          background: rgb(126, 98, 49) !important;
          color: rgb(255, 255, 255) !important;
        }
      `;
      document.head.appendChild(tempStyle);

      // Small delay to ensure render
      await new Promise((resolve) => setTimeout(resolve, 500));

      console.log("Starting canvas capture...");
      console.log("Receipt element dimensions:", {
        width: receiptRef.current.offsetWidth,
        height: receiptRef.current.offsetHeight,
        scrollHeight: receiptRef.current.scrollHeight,
      });

      // Capture the screenshot
      const canvas = await html2canvas(receiptRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        foreignObjectRendering: false,
        onclone: (clonedDoc) => {
          console.log("Canvas cloning...");
          const clonedElement = clonedDoc.querySelector(".booking-receipt");
          if (clonedElement) {
            console.log("Cloned element found");

            // Force all elements to use explicit RGB colors
            const allElements = clonedElement.querySelectorAll("*");
            console.log(`Processing ${allElements.length} elements...`);

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

                // Force background colors to white or explicit RGB
                if (
                  computedStyle.backgroundColor &&
                  computedStyle.backgroundColor !== "rgba(0, 0, 0, 0)"
                ) {
                  htmlEl.style.backgroundColor =
                    computedStyle.backgroundColor.includes("rgb")
                      ? computedStyle.backgroundColor
                      : "#ffffff";
                }
              }
            });

            // Add a style tag to override any lab() colors
            const style = clonedDoc.createElement("style");
            style.textContent = `
              * {
                color: inherit !important;
                border-color: currentColor !important;
              }
              [style*="lab("] {
                color: #000000 !important;
                background-color: #ffffff !important;
              }
            `;
            clonedDoc.head.appendChild(style);

            console.log("Cleaned problematic colors from cloned element");
          }
        },
      });

      console.log("Canvas captured:", {
        width: canvas.width,
        height: canvas.height,
      });

      // Convert canvas to image
      const imgData = canvas.toDataURL("image/png", 1.0);
      console.log("Image data created, length:", imgData.length);

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      console.log("PDF object created");

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Calculate dimensions to fit page with margins
      const margin = 10;
      const imgWidth = pdfWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      console.log("PDF dimensions:", {
        pdfWidth,
        pdfHeight,
        imgWidth,
        imgHeight,
      });

      let heightLeft = imgHeight;
      let position = margin;

      // Add first page
      console.log("Adding image to PDF...");
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - margin * 2;

      // Add remaining pages if content is longer
      let pageCount = 1;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight - margin * 2;
        pageCount++;
      }

      console.log(`PDF created with ${pageCount} page(s)`);

      // Save the PDF
      const filename = `Booking-Receipt-${booking.referenceCode}.pdf`;
      console.log("Saving PDF as:", filename);
      pdf.save(filename);

      console.log("PDF save triggered");

      message.success({
        content: "PDF downloaded successfully!",
        key: "pdf-generation",
      });
    } catch (error) {
      console.error("PDF Generation Error:", error);
      console.error("Error details:", {
        message: error instanceof Error ? error.message : "Unknown",
        stack: error instanceof Error ? error.stack : undefined,
      });

      message.error({
        content: `Failed to generate PDF: ${error instanceof Error ? error.message : "Unknown error"}`,
        key: "pdf-generation",
      });
    } finally {
      // Always restore buttons visibility
      console.log("Restoring buttons...");
      if (buttons) {
        buttons.forEach((btn) => {
          (btn as HTMLElement).style.display = "";
        });
        console.log("Buttons restored");
      }

      // Remove temporary color override style
      const tempStyle = document.getElementById("pdf-color-override");
      if (tempStyle) {
        tempStyle.remove();
        console.log("Temporary styles removed");
      }
    }
  };

  return (
    <Modal
      title={null}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      maskClosable={false}
      closeIcon={<CloseOutlined />}
      styles={{
        body: { padding: 0, maxHeight: "90vh", overflowY: "auto" },
        mask: { zIndex: 10000 },
        wrapper: { zIndex: 10001 },
      }}
      style={{ zIndex: 10001 }}
    >
      <div ref={receiptRef} className="bg-white booking-receipt">
        {/* Header */}
        <div
          className="text-white p-6 text-center"
          style={{ background: "linear-gradient(to right, #7e6231, #e4b159)" }}
        >
          <div className="text-2xl font-bold mb-2"> Booking Confirmed!</div>
          <div className="text-blue-100" style={{ color: "#dbeafe" }}>
            Thank you for choosing us
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6">
          {/* Booking Reference */}
          <div className="text-center mb-6">
            <div className="text-lg font-semibold text-gray-700 mb-1">
              Booking Reference
            </div>
            <div
              className="text-2xl font-bold text-blue-600 bg-blue-50 py-2 px-4 rounded-lg inline-block"
              style={{ color: "#1e40af", backgroundColor: "#eff6ff" }}
            >
              {booking.referenceCode}
            </div>
          </div>

          <Divider />

          {/* Guest Information */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Guest Details
              </h4>
              <div className="space-y-1 text-sm">
                <div>
                  <strong>Name:</strong> {customerName}
                </div>
                <div>
                  <strong>Booking ID:</strong> #{booking.id}
                </div>
                <div>
                  <strong>Status:</strong>
                  <span
                    className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                    style={{
                      backgroundColor:
                        booking.status === "confirmed" ? "#dcfce7" : "#fef3c7",
                      color:
                        booking.status === "confirmed" ? "#166534" : "#92400e",
                    }}
                  >
                    {booking.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-2">
                Hotel Details
              </h4>
              <div className="space-y-1 text-sm">
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
          </div>

          <Divider />

          {/* Stay Information */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-2">
              Stay Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium text-gray-600">Check-in</div>
                <div className="font-semibold">
                  {formatDate(booking.checkInDate)}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-600">Check-out</div>
                <div className="font-semibold">
                  {formatDate(booking.checkOutDate)}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* Payment Summary */}
          <div className="mb-4">
            <h4 className="font-semibold text-gray-700 mb-3">
              Payment Summary
            </h4>
            <div className="space-y-2 text-sm">
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
              <Divider className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-blue-600" style={{ color: "#1e40af" }}>
                  {formatCurrency(
                    booking.totalAmountCents,
                    booking.currencyCode
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Amount Paid:</span>
                <span>
                  {formatCurrency(
                    booking.amountPaidCents,
                    booking.currencyCode
                  )}
                </span>
              </div>
              <div
                className="flex justify-between text-sm font-medium text-red-600"
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
            </div>
          </div>

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

          <div className="text-xs text-gray-500 text-center mb-4">
            Booking created on {new Date(booking.createdAt).toLocaleString()}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t no-print">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleDownloadPDF}
              className="flex-1 !bg-blue-600"
              size="large"
            >
              Download PDF Receipt
            </Button>
            <Button onClick={onClose} size="large" className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BookingConfirmationModal;
