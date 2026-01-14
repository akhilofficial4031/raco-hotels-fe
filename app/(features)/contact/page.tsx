"use client";

import { Form, Input, Card } from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import { postFetcher } from "@/lib/fetcher";
import { useState } from "react";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
// Using CSS classes instead of heroicons for compatibility
// import { MapPinIcon, PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

const { TextArea } = Input;

// Validation schema for contact form (no date field needed)
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\+\(\)]+$/, "Please enter a valid phone number")
    .refine((val) => {
      const digitCount = val.replace(/[^\d]/g, "").length;
      return digitCount <= 12;
    }, "Please enter a valid phone number"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactApiPayload {
  name: string;
  phone: string;
  date: string;
  message: string;
  status: string;
  contactType: string;
}

interface ContactApiResponse {
  id: string;
  message: string;
}

export default function ContactPage() {
  const [antdForm] = Form.useForm();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Transform form data to match API payload structure
      const payload: ContactApiPayload = {
        name: data.name,
        phone: data.phone,
        date: dayjs().format("YYYY-MM-DD"), // Use current date
        message: data.message,
        status: "pending",
        contactType: "general", // Identifier for contact page submissions
      };

      // Call the inquiries API (same as AttractionEnquiry)
      await postFetcher<ContactApiResponse, ContactApiPayload>(
        "/api/inquiries",
        payload
      );
      setShowMessage(true);
      setIsSuccess(true);

      setTimeout(() => {
        handleReset();
        setShowMessage(false);
      }, 3000);
    } catch (_error) {
      setShowMessage(true);
      setIsSuccess(false);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const handleReset = () => {
    reset();
    antdForm.resetFields();
  };

  return (
    <div className="min-h-screen bg-background-light py-12 px-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 !">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto ">
            We are here to help you with any questions or inquiries. Get in
            touch with our team for personalized assistance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {/* Contact Information Section */}
          <div className="space-y-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  {/* Company Name */}
                  <div>
                    <h3 className="text-xl font-medium  text-gray-800 mb-2">
                      Raco Facility Managements and Trading Pvt Ltd
                    </h3>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 text-primary mt-1 flex items-center justify-center">
                      <HomeOutlined className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">
                        Address
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        Medical College PO, Murinjapalam
                        <br />
                        Thiruvananthapuram, Kerala
                        <br />
                        695011
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 text-primary flex items-center justify-center">
                      <MailOutlined className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Email</h4>
                      <a
                        href="mailto:racohotelgroup@gmail.com"
                        className="!text-primary"
                      >
                        racohotelgroup@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-6 h-6 text-primary flex items-center justify-center">
                      <PhoneOutlined className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-1">Phone</h4>
                      <a href="tel:888766734" className="!text-primary">
                        888766734
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Business Hours or Additional Info Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 !mt-4">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 ">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center gap-3 ">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Professional facility management services
                  </li>
                  <li className="flex items-center gap-3 ">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Quality hotel booking experiences
                  </li>
                  <li className="flex items-center gap-3 ">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    24/7 customer support
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full " />
                    Competitive pricing and packages
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Contact Form Section */}
          <div>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 ">
                  Send us a Message
                </h2>
                <p className="text-gray-600 mb-6 ">
                  Fill out the form below and we&rsquo;ll get back to you as
                  soon as possible.
                </p>

                <Form
                  form={antdForm}
                  layout="vertical"
                  onFinish={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <Form.Item
                    label="Name"
                    className=""
                    validateStatus={errors.name ? "error" : ""}
                    help={
                      errors.name?.message
                        ? String(errors.name.message)
                        : undefined
                    }
                    required
                  >
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          size="large"
                          placeholder="Enter your name"
                          className="hover:border-blue-400 focus:border-blue-600"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    className=""
                    validateStatus={errors.phone ? "error" : ""}
                    help={
                      errors.phone?.message
                        ? String(errors.phone.message)
                        : undefined
                    }
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
                          className="hover:border-blue-400 focus:border-blue-600"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    className=""
                    validateStatus={errors.message ? "error" : ""}
                    help={
                      errors.message?.message
                        ? String(errors.message.message)
                        : undefined
                    }
                    required
                  >
                    <Controller
                      name="message"
                      control={control}
                      render={({ field }) => (
                        <TextArea
                          {...field}
                          rows={4}
                          placeholder="Describe your inquiry, requirements, or how we can assist you..."
                          maxLength={500}
                          showCount
                          className="hover:border-blue-400 focus:border-blue-600"
                        />
                      )}
                    />
                  </Form.Item>

                  <Form.Item className="mb-0 ">
                    <div className="flex gap-3 justify-end pt-4">
                      <button onClick={handleReset} className="btn-secondary">
                        Reset
                      </button>
                      <button
                        className="btn-primary px-8 py-2 text-white font-medium  transition-colors disabled:opacity-50"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </Form.Item>
                </Form>

                {/* Success/Error Messages */}
                {showMessage === true && (
                  <div className="mt-6 p-4 rounded-md">
                    {isSuccess ? (
                      <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">
                            Message sent successfully!
                          </span>
                        </div>
                        <p className="mt-1 text-sm">
                          We&rsquo;ll get back to you as soon as possible.
                        </p>
                      </div>
                    ) : (
                      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium">
                            Failed to send message
                          </span>
                        </div>
                        <p className="mt-1 text-sm">
                          Please try again or contact us directly.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
