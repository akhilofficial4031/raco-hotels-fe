/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from "@/components/message";
import { postFetcher } from "@/lib/fetcher";
import { ApiResponse } from "@/types/api";
import { CancelBookingRequestOTP, CancelBookingResponse, CancelBookingVerifyOTPRequest, CancelBookingVerifyOTPResponse } from "@/types/cancel-booking";
import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";


interface CancelBookingModalProps {
    open: boolean;
    onClose: () => void;
}

export default function CancelBookingModal({ open, onClose }: CancelBookingModalProps) {
    const [form] = Form.useForm();
    const [loadingCancelBooking, setLoadingCancelBooking] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const OTPMessage = "An OTP has been sent to your email address. Please enter the OTP to continue.";

    const handleSubmit = async () => {
        setLoadingCancelBooking(true);
        if (showOtp) {
            try {
                const payload: CancelBookingVerifyOTPRequest = {
                    bookingReference: form.getFieldValue("bookingReferenceCode"),
                    otp: form.getFieldValue("otp"),
                };
                const result = await postFetcher<ApiResponse<CancelBookingVerifyOTPResponse>>(
                    "/api/public/bookings/cancel/verify-otp",
                    payload
                );
                if (result.success) {
                    setShowOtp(false);
                    setIsVerified(true);
                } else {
                    setIsVerified(false);
                    message.error(result.message);
                }
            } catch (error) {
                setIsVerified(false);
                message.error("Failed to verify OTP. Please try again or check your connection.");
            } finally {
                setLoadingCancelBooking(false);
            }
        } else {
            try {
                const payload: CancelBookingRequestOTP = {
                    bookingReference: form.getFieldValue("bookingReferenceCode"),
                };
                const result = await postFetcher<ApiResponse<CancelBookingResponse>>(
                    "/api/public/bookings/cancel/request-otp",
                    payload
                );
                if (result.success) {
                    setShowOtp(true);
                    message.success(result.message);
                } else {
                    message.error(result.message);
                }
            } catch (error) {
                message.error("Failed to send OTP. Please check your booking reference and try again.");
            } finally {
                setLoadingCancelBooking(false);
            }
        }
    };

    const handleClose = () => {
        setLoadingCancelBooking(false);
        setShowOtp(false);
        setIsVerified(false);
        form.resetFields();
        onClose();
    };
    return (
        <Modal
            title="Cancel Booking"
            open={open}
            onCancel={handleClose}
            footer={null}
            centered
            destroyOnHidden
        >
            <Form
                form={form}
                layout="vertical"

                className="!pt-6"
            >
                {!isVerified ? (
                    <Form.Item
                        name="bookingReferenceCode"
                        label="Booking Reference Code"

                        rules={[{ required: true, message: "Please enter your booking reference code!" }]}
                    >
                        <Input placeholder="Enter your booking reference code" disabled={showOtp} />
                    </Form.Item>
                ) : null}
                {showOtp && !isVerified ? <p className="text-sm text-green-500">{OTPMessage}</p> : null}
                {showOtp && !isVerified ? (
                    <Form.Item
                        name="otp"
                        label="OTP"
                        rules={[{ required: true, message: "Please enter OTP!" }]}
                    >
                        <Input placeholder="Enter OTP" />
                    </Form.Item>
                ) : null}

                {isVerified ? <p className="text-sm text-gray-500">Booking request submitted successfully. Our team will contact you shortly.</p> : null}
                {!isVerified ? (
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loadingCancelBooking}
                            size="large"
                            className="w-full !bg-primary !text-white hover:!opacity-90 border-none rounded-full font-semibold transition-opacity"
                            onClick={handleSubmit}
                        >
                            {showOtp ? "Submit Cancellation Request" : "Continue"}
                        </Button>
                    </Form.Item>
                ) : null}
            </Form>
        </Modal>
    );
}