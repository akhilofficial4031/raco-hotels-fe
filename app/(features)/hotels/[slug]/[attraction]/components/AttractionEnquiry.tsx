"use client";

import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "next/navigation";
import { postFetcher } from "@/lib/fetcher";
import { useState } from "react";

const { TextArea } = Input;

// Validation schema
const attractionInquirySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number"),
  date: z
    .any()
    .refine((val) => val && dayjs.isDayjs(val), "Please select a date"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type AttractionInquiryFormData = z.infer<typeof attractionInquirySchema>;

interface AttractionInquiryProps {
  open: boolean;
  onClose: () => void;
}

interface InquiryApiPayload {
  name: string;
  phone: string;
  date: string;
  message: string;
  status: string;
  attractionSlug: string;
}

interface InquiryApiResponse {
  id: string;
  message: string;
}

const AttractionEnquiry: React.FC<AttractionInquiryProps> = ({
  open,
  onClose,
}) => {
  const [antdForm] = Form.useForm();
  const params = useParams();
  const attractionSlug = params.attraction as string;
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AttractionInquiryFormData>({
    resolver: zodResolver(attractionInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      date: dayjs().add(1, "day"),
      message: "",
    },
  });

  const onSubmit = async (data: AttractionInquiryFormData) => {
    try {
      // Transform form data to match API payload structure
      const payload: InquiryApiPayload = {
        name: data.name,
        phone: data.phone,
        date: data.date.format("YYYY-MM-DD"),
        message: data.message,
        status: "pending",
        attractionSlug,
      };

      // Call the inquiries API
      await postFetcher<InquiryApiResponse, InquiryApiPayload>(
        "/api/inquiries",
        payload
      );
      setShowMessage(true);
      setIsSuccess(true);

      setTimeout(() => {
        handleClose();
        setShowMessage(false);
      }, 3000);
    } catch (_error) {
      setShowMessage(true);
      setIsSuccess(false);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }
  };

  const handleClose = () => {
    reset();
    antdForm.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Attraction Inquiry"
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      destroyOnClose
      width={500}
    >
      <Form
        form={antdForm}
        layout="vertical"
        onFinish={handleSubmit(onSubmit)}
        className="!pt-6"
      >
        <Form.Item
          label="Full Name"
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
          required
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Enter your full name"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          validateStatus={errors.phone ? "error" : ""}
          help={errors.phone?.message}
          required
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                size="large"
                placeholder="Enter your phone number"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Preferred Date"
          validateStatus={errors.date ? "error" : ""}
          required
        >
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                value={value}
                onChange={(date: Dayjs | null) => onChange(date)}
                size="large"
                className="w-full"
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
                placeholder="Select preferred date"
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Message"
          validateStatus={errors.message ? "error" : ""}
          help={errors.message?.message}
          required
        >
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextArea
                {...field}
                rows={4}
                placeholder="Tell us about your inquiry or any special requirements..."
                maxLength={500}
                showCount
              />
            )}
          />
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex gap-3 justify-end">
            <Button size="large" onClick={handleClose} type="text">
              Cancel
            </Button>
            <button
              className="btn-primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </div>
        </Form.Item>
      </Form>
      {showMessage ? (
        isSuccess ? (
          <div className="mt-4 text-green-500">
            Inquiry submitted successfully!
          </div>
        ) : (
          <div className="mt-4 text-red-500">
            Failed to submit inquiry. Please try again.
          </div>
        )
      ) : null}
    </Modal>
  );
};

export default AttractionEnquiry;
