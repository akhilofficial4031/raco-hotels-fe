"use client";
import { Button, DatePicker, InputNumber } from "antd";
import dayjs from "dayjs";
import React from "react";

const { RangePicker } = DatePicker;

interface CheckAvailabilityProps {
  dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  onDatesChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  rooms: number;
  onRoomsChange: (rooms: number) => void;
  // adults: number;
  // onAdultsChange: (adults: number) => void;
  // children: number;
  // onChildrenChange: (children: number) => void;
  onCheck: () => void;
  loading: boolean;
}

const CheckAvailability: React.FC<CheckAvailabilityProps> = ({
  dates,
  onDatesChange,
  rooms,
  onRoomsChange,
  onCheck,
  loading,
}) => {
  return (
    <section
      className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 shadow-2xl -mt-16 absolute -bottom-15 left-0 right-0 z-30 rounded-lg"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
      aria-label="Check room availability"
      role="search"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCheck();
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
      >
        <div className="flex flex-col">
          <label
            htmlFor="date-range"
            className="text-sm font-light text-white/80 mb-1"
          >
            Check In - Check Out
          </label>
          <RangePicker
            id="date-range"
            value={dates}
            size="large"
            onChange={(d) =>
              onDatesChange(d as [dayjs.Dayjs | null, dayjs.Dayjs | null])
            }
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            className="w-full"
            aria-label="Select check-in and check-out dates"
            aria-required="true"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="rooms-input"
            className="text-sm font-light text-white/80 mb-1"
          >
            Rooms
          </label>
          <InputNumber
            id="rooms-input"
            min={1}
            max={20}
            value={rooms}
            onChange={(value) => onRoomsChange(value ?? 1)}
            className="!w-full"
            size="large"
            aria-label="Number of rooms"
            aria-required="true"
          />
        </div>
        {/* <div className="flex flex-col">
          <label
            htmlFor="adults-input"
            className="text-sm font-light text-white/80 mb-1"
          >
            Adults
          </label>
          <InputNumber
            id="adults-input"
            min={1}
            max={20}
            value={adults}
            onChange={(value) => onAdultsChange(value ?? 1)}
            className="!w-full"
            size="large"
            aria-label="Number of adults"
            aria-required="true"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="children-input"
            className="text-sm font-light text-white/80 mb-1"
          >
            Children
          </label>
          <InputNumber
            id="children-input"
            min={0}
            max={20}
            value={children}
            onChange={(value) => onChildrenChange(value ?? 1)}
            className="!w-full"
            size="large"
            aria-label="Number of children"
          />
        </div> */}
        <div>
          <label>&nbsp; </label>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            onClick={onCheck}
            loading={loading}
            disabled={!dates[0] || !dates[1] || loading}
            className="w-full !bg-primary !text-white hover:!opacity-90 border-none h-full mt-5 rounded-full font-semibold transition-opacity"
            aria-label={
              loading ? "Checking availability" : "Check room availability"
            }
            aria-live="polite"
          >
            {loading ? "Checking..." : "Check Availability"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CheckAvailability;
