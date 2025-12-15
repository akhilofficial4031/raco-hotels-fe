"use client";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input, Select, Checkbox, Form, Row, Col, Divider } from "antd";
import { BookingFormValues } from "../form-schema";
import { nationalities } from "@/lib/nationalities";

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
                <Input {...field} placeholder="Enter Full Name" />
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
                <Input {...field} placeholder="Enter Email" type="email" />
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
                <Input {...field} placeholder="Enter Phone Number" />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Alternate Phone">
            <Controller
              name="alternatePhone"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter Alternate Phone Number" />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Nationality">
            {/* <Controller
              name="nationality"
              control={control}
              render={({ field }) => <Input {...field} />}
            /> */}

            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Select Nationality">
                  <Option value="">Select Nationality</Option>
                  {nationalities.map((nationality) => (
                    <Option key={nationality} value={nationality}>
                      {nationality}
                    </Option>
                  ))}
                </Select>
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Identity Documents */}
      <Divider orientation="left">Identity Documents</Divider>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item label="ID Type">
            <Controller
              name="idType"
              control={control}
              render={({ field }) => (
                <Select {...field} placeholder="Select ID type">
                  <Option value="">Select ID type</Option>
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
              render={({ field }) => (
                <Input {...field} placeholder="Enter ID number" />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Emergency Contact Name">
            <Controller
              name="emergencyContactName"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter Emergency Contact Name" />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Emergency Contact Number">
            <Controller
              name="emergencyContactPhone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Emergency Contact Number"
                />
              )}
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Preferences & Additional Info */}
      <Divider orientation="left">Additional Info</Divider>

      {/* Notes field spans full width */}
      <Form.Item label="Notes">
        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextArea
              {...field}
              rows={3}
              placeholder="Enter any additional notes"
            />
          )}
        />
      </Form.Item>

      <Form.Item>
        <Controller
          name="marketingOptIn"
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            >
              Sign up for marketing emails
            </Checkbox>
          )}
        />
      </Form.Item>
    </Form>
  );
};

export default Step2PersonalData;
