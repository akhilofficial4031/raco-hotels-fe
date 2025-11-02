"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Input,
  Button,
  DatePicker,
  Select,
  Checkbox,
  Form,
  Row,
  Col,
} from "antd";

const { Option } = Select;
const { TextArea } = Input;

const bookingFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  alternatePhone: z.string().optional(),
  dateOfBirth: z.any().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  idType: z.string().optional(),
  idNumber: z.string().optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  specialRequests: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  loyaltyNumber: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  notes: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log(data);
    // Here you would call the booking API
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md dm-sans">
      <h2 className="text-2xl font-serif text-primary mb-6">
        Guest Information
      </h2>
      <Form onFinish={handleSubmit(onSubmit)} layout="vertical">
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Full Name"
              validateStatus={errors.fullName ? "error" : ""}
              help={errors.fullName?.message}
            >
              <Controller
                name="fullName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              validateStatus={errors.email ? "error" : ""}
              help={errors.email?.message}
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} type="email" />}
              />
            </Form.Item>
          </Col>
          {/* ... Add other form fields in a similar way ... */}
        </Row>

        {/* Example for a few more fields to show the pattern */}
        <Row gutter={24}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Phone Number"
              validateStatus={errors.phone ? "error" : ""}
              help={errors.phone?.message}
            >
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Date of Birth">
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} style={{ width: "100%" }} />
                )}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Special Requests">
          <Controller
            name="specialRequests"
            control={control}
            render={({ field }) => <TextArea {...field} rows={4} />}
          />
        </Form.Item>

        <Form.Item>
          <Controller
            name="marketingOptIn"
            control={control}
            render={({ field }) => (
              <Checkbox {...field}>Sign up for marketing emails</Checkbox>
            )}
          />
        </Form.Item>

        {/* The submit button is in the PaymentDetails component, but if it were here, it would look like this: */}
        {/* <Button type="primary" htmlType="submit" size="large" className="w-full !bg-primary">
          Submit Booking
        </Button> */}
      </Form>
    </div>
  );
};

export default BookingForm;
