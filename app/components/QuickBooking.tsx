"use client";

import { HotelNavItem } from "@/types/hotel";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  message,
  Modal,
  Select,
} from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { RangePicker } = DatePicker;

interface QuickBookingFormValues {
  hotelId: number;
  dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  rooms: number;
  adults: number;
  children: number;
}

interface QuickBookingProps {
  open: boolean;
  onClose: () => void;
  hotels: HotelNavItem[];
}

const QuickBooking: React.FC<QuickBookingProps> = ({
  open,
  onClose,
  hotels,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleCheckAvailability = async (values: QuickBookingFormValues) => {
    setLoading(true);
    const { hotelId, dates, rooms, adults, children } = values;

    if (!hotelId || !dates?.[0] || !dates?.[1]) {
      message.error("Please select a hotel and valid dates.");
      setLoading(false);
      return;
    }

    const checkIn = dates[0].format("YYYY-MM-DD");
    const checkOut = dates[1].format("YYYY-MM-DD");

    const params = new URLSearchParams({
      hotelId: hotelId.toString(),
      checkIn,
      checkOut,
      rooms: (rooms ?? 1).toString(),
      adults: (adults ?? 1).toString(),
      children: (children ?? 0).toString(),
    });

    router.push(`/available-rooms?${params.toString()}`);
    setLoading(false);
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Quick Booking"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCheckAvailability}
        initialValues={{
          rooms: 1,
          adults: 1,
          children: 0,
          dates: [dayjs().add(1, "day"), dayjs().add(2, "day")],
        }}
        className="!pt-6"
      >
        <Form.Item
          name="hotelId"
          label="Select Hotel"
          rules={[{ required: true, message: "Please select a hotel!" }]}
        >
          <Select
            size="large"
            placeholder="Choose your destination"
            options={hotels.map((hotel) => ({
              value: hotel.id,
              label: `${hotel.name} - ${hotel.city}, ${hotel.state}`,
            }))}
            showSearch
            dropdownStyle={{ zIndex: 10000 }}
          />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Check In - Check Out"
          rules={[{ required: true, message: "Please select dates!" }]}
        >
          <RangePicker
            size="large"
            className="w-full"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        </Form.Item>

        <div className="grid grid-cols-3 gap-4">
          <Form.Item name="rooms" label="Rooms">
            <InputNumber min={1} max={20} className="!w-full" size="large" />
          </Form.Item>
          <Form.Item name="adults" label="Adults">
            <InputNumber min={1} max={20} className="!w-full" size="large" />
          </Form.Item>
          <Form.Item name="children" label="Children">
            <InputNumber min={0} max={20} className="!w-full" size="large" />
          </Form.Item>
        </div>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="w-full !bg-primary !text-white hover:!opacity-90 border-none rounded-full font-semibold transition-opacity"
          >
            Check Availability
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuickBooking;
