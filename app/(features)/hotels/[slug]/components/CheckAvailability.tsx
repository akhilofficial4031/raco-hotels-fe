"use client";
import React from "react";
import { DatePicker, InputNumber, Button } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface CheckAvailabilityProps {
  dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  onDatesChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  rooms: number;
  onRoomsChange: (rooms: number) => void;
  adults: number;
  onAdultsChange: (adults: number) => void;
  children: number;
  onChildrenChange: (children: number) => void;
  onCheck: () => void;
  loading: boolean;
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({
  dates,
  onDatesChange,
  rooms,
  onRoomsChange,
  adults,
  onAdultsChange,
  children = 0,
  onChildrenChange,
  onCheck,
  loading,
}) => {
  return (
    <div
      className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 shadow-2xl -mt-16 absolute -bottom-15 left-0 right-0 z-30 rounded-lg"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
        <div className="flex flex-col col-span-2">
          <label className="text-sm font-light text-white/80 mb-1">
            Check In - Check Out
          </label>
          <RangePicker
            value={dates}
            size="large"
            onChange={(d) =>
              onDatesChange(d as [dayjs.Dayjs | null, dayjs.Dayjs | null])
            }
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-light text-white/80 mb-1">Rooms</label>
          <InputNumber
            min={1}
            max={20}
            value={rooms}
            onChange={(value) => onRoomsChange(value ?? 1)}
            className="!w-full"
            size="large"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-light text-white/80 mb-1">
            Adults
          </label>
          <InputNumber
            min={1}
            max={20}
            value={adults}
            onChange={(value) => onAdultsChange(value ?? 1)}
            className="!w-full"
            size="large"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-light text-white/80 mb-1">
            Children
          </label>
          <InputNumber
            min={0}
            max={20}
            value={children}
            onChange={(value) => onChildrenChange(value ?? 1)}
            className="!w-full"
            size="large"
          />
        </div>
        <Button
          type="primary"
          size="large"
          onClick={onCheck}
          loading={loading}
          disabled={!dates[0] || !dates[1] || loading}
          className="w-full !bg-primary !text-white hover:!opacity-90 border-none h-full mt-5 rounded-full font-semibold transition-opacity"
        >
          {loading ? "Checking..." : "Check Availability"}
        </Button>
      </div>
    </div>
  );
};

export default CheckAvailability;
