"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, DatePicker, Select, Checkbox, Form, Row, Col } from "antd";
import { BookingFormValues } from "../form-schema";

const { Option } = Select;
const { TextArea } = Input;

const Step2PersonalData = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<BookingFormValues>();

  return (
    <Form layout="vertical">
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
              render={({ field }) => (
                <Input {...field} placeholder="e.g. Maria Lost" />
              )}
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
              render={({ field }) => (
                <Input {...field} placeholder="email@email.com" type="email" />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Phone Number"
            validateStatus={errors.phone ? "error" : ""}
            help={errors.phone?.message}
          >
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="+123 001 234 567" />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Alternate Phone">
            <Controller
              name="alternatePhone"
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
        <Col xs={24} md={12}>
          <Form.Item label="Gender">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Select gender">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Nationality">
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="ID Type">
            <Controller
              name="idType"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Select ID type">
                  <Option value="passport">Passport</Option>
                  <Option value="driving_license">Driving License</Option>
                  <Option value="national_id">National ID</Option>
                </Select>
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="ID Number">
            <Controller
              name="idNumber"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Address Line 1">
            <Controller
              name="addressLine1"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Address Line 2">
            <Controller
              name="addressLine2"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="City">
            <Controller
              name="city"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="State">
            <Controller
              name="state"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item label="Country">
            <Controller
              name="country"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Postal Code">
            <Controller
              name="postalCode"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Dietary Preferences">
            <Controller
              name="dietaryPreferences"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Emergency Contact Name">
            <Controller
              name="emergencyContactName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Emergency Contact Phone">
            <Controller
              name="emergencyContactPhone"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Loyalty Number">
            <Controller
              name="loyaltyNumber"
              control={control}
              render={({ field }) => <Input {...field} />}
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

      <Form.Item label="Notes">
        <Controller
          name="notes"
          control={control}
          render={({ field }) => <TextArea {...field} rows={3} />}
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
    </Form>
  );
};

export default Step2PersonalData;
