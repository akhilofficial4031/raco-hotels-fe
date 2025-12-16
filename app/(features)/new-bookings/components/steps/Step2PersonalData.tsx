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
    trigger,
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
                <Input
                  {...field}
                  placeholder="Enter Full Name"
                  onBlur={() => {
                    field.onBlur();
                    trigger("fullName");
                  }}
                />
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
                <Input
                  {...field}
                  placeholder="Enter Email"
                  type="email"
                  onBlur={() => {
                    field.onBlur();
                    trigger("email");
                  }}
                />
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
                <Input
                  {...field}
                  placeholder="Enter Phone Number"
                  onBlur={() => {
                    field.onBlur();
                    trigger("phone");
                  }}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Alternate Phone"
            validateStatus={errors.alternatePhone ? "error" : ""}
            help={errors.alternatePhone?.message}
          >
            <Controller
              name="alternatePhone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Alternate Phone Number"
                  onBlur={() => {
                    field.onBlur();
                    trigger("alternatePhone");
                  }}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Nationality"
            validateStatus={errors.nationality ? "error" : ""}
            help={errors.nationality?.message}
          >
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select Nationality"
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("nationality");
                  }}
                >
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
          <Form.Item
            label="ID Type"
            validateStatus={errors.idType ? "error" : ""}
            help={errors.idType?.message}
          >
            <Controller
              name="idType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder="Select ID type"
                  onChange={(value) => {
                    field.onChange(value);
                    trigger("idType");
                  }}
                >
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
          <Form.Item
            label="ID Number"
            validateStatus={errors.idNumber ? "error" : ""}
            help={errors.idNumber?.message}
          >
            <Controller
              name="idNumber"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter ID number"
                  onBlur={() => {
                    field.onBlur();
                    trigger("idNumber");
                  }}
                />
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
          <Form.Item
            label="Emergency Contact Number"
            validateStatus={errors.emergencyContactPhone ? "error" : ""}
            help={errors.emergencyContactPhone?.message}
          >
            <Controller
              name="emergencyContactPhone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Emergency Contact Number"
                  onBlur={() => {
                    field.onBlur();
                    trigger("emergencyContactPhone");
                  }}
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
