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
import { InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const { RangePicker } = DatePicker;

const CHILD_AGE_OPTIONS = [
  { value: 0, label: "Below 1 year" },
  ...Array.from({ length: 18 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} year`,
  })),
];

interface QuickBookingFormValues {
  hotelId: number;
  dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  rooms: number;
  adults: number;
  children: number;
  childAges?: number[];
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
  const params = useParams();

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

    const childAges = values.childAges ?? [];

    const params = new URLSearchParams({
      hotelId: hotelId.toString(),
      checkIn,
      checkOut,
      numberOfRooms: (rooms ?? 1).toString(),
      adults: (adults ?? 1).toString(),
      children: (children ?? 0).toString(),
      childAges: childAges.join(","),
    });

    router.push(`/available-rooms?${params.toString()}`);
    setLoading(false);
    onClose();
    form.resetFields();
  };
  const getHotelIdFromParams = () => {
    const hotelSlug = params?.['slug'];
    if (!hotelSlug) return null;
    const hotel = hotels.find((hotel) => hotel.slug === hotelSlug);
    if (!hotel) return null;
    return hotel.id;
  };

  const handleClose = () => {
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (!open) return;
    const hotelId = getHotelIdFromParams();
    if (hotelId) {
      form.setFieldValue("hotelId", hotelId);
    }
  }, [params, open]);

  return (
    <Modal
      title="Quick Booking"
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleCheckAvailability}
        onValuesChange={(_, allValues) => {
          if ((allValues.children ?? 0) === 0) {
            form.setFieldValue("childAges", undefined);
          }
        }}
        initialValues={{
          rooms: 1,
          adults: 1,
          children: 0,
          dates: [dayjs().add(1, "day"), dayjs().add(2, "day")],
        }}
        className="!pt-6"
      >
        <div
          style={{ maxHeight: "60vh", overflowY: "auto", overflowX: "hidden" }}
          className="pr-1"
          onWheel={(e) => e.stopPropagation()}
        >
          <Form.Item
            name="hotelId"
            label="Select Hotel"
            rules={[{ required: true, message: "Please select a hotel!" }]}
            className="!mb-3"
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

          <div className="grid grid-cols-3 gap-3">
            <Form.Item name="rooms" label="Rooms" className="!mb-3">
              <InputNumber min={1} max={20} className="!w-full" size="large" />
            </Form.Item>

            <Form.Item name="adults" label="Adults" className="!mb-3">
              <InputNumber min={1} max={20} className="!w-full" size="large" />
            </Form.Item>

            <Form.Item name="children" label="Children" className="!mb-3">
              <InputNumber min={0} max={20} className="!w-full" size="large" />
            </Form.Item>
          </div>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) => prev.children !== curr.children}
          >
            {({ getFieldValue }) => {
              const childrenCount = getFieldValue("children") ?? 0;
              if (childrenCount <= 0) return null;
              return (
                <div className="space-y-2 mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Child ages
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {Array.from({ length: childrenCount }, (_, i) => (
                      <Form.Item
                        key={i}
                        name={["childAges", i]}
                        label={`Child ${i + 1}`}
                        className="!mb-2"
                        rules={[
                          {
                            required: true,
                            message: `Please select age for child ${i + 1}`,
                          },
                        ]}
                      >
                        <Select
                          size="large"
                          placeholder="Select age"
                          options={CHILD_AGE_OPTIONS}
                          allowClear={false}
                        />
                      </Form.Item>
                    ))}
                  </div>
                </div>
              );
            }}
          </Form.Item>

          <div className="flex items-center gap-2 mb-2">
            <InfoCircleOutlined className="text-gray-400 shrink-0" />
            <span className="text-sm text-gray-500">
              Children above the age of 10 will be charged
            </span>
          </div>

          <Form.Item
            name="dates"
            label="Check In - Check Out"
            rules={[{ required: true, message: "Please select dates!" }]}
            className="!mb-3"
          >
            <RangePicker
              placement="bottomRight"
              size="large"
              className="w-full"
              disabledDate={(current) =>
                current && current < dayjs().startOf("day")
              }
            />
          </Form.Item>
        </div>
        <Form.Item className="!mb-0 pt-2">
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
