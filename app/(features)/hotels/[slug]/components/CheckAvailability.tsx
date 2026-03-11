"use client";
import { Button, DatePicker, InputNumber, Select } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React from "react";

const { RangePicker } = DatePicker;

const renderDropdownNoScroll = (menu: React.ReactNode) => (
  <div onWheel={(e) => e.stopPropagation()}>{menu}</div>
);

const CHILD_AGE_OPTIONS = [
  { value: 0, label: "Below 1 yr" },
  ...Array.from({ length: 18 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} yr`,
  })),
];

interface CheckAvailabilityProps {
  dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
  onDatesChange: (dates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => void;
  rooms: number;
  onRoomsChange: (rooms: number) => void;
  adults: number;
  onAdultsChange: (adults: number) => void;
  numChildren: number;
  onChildrenChange: (numChildren: number) => void;
  childAges: number[];
  onChildAgesChange: (ages: number[]) => void;
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
  numChildren,
  onChildrenChange,
  childAges,
  onChildAgesChange,
  onCheck,
  loading,
}) => {
  const handleChildAgeChange = (index: number, age: number) => {
    const updated = [...childAges];
    updated[index] = age;
    onChildAgesChange(updated);
  };

  const handleChildrenCountChange = (count: number) => {
    onChildrenChange(count);
    const updated = Array.from({ length: count }, (_, i) => childAges[i] ?? 0);
    onChildAgesChange(updated);
  };

  const hasAllChildAges =
    numChildren === 0 || childAges.filter((a) => a !== undefined).length >= numChildren;

  return (
    <section className="absolute -bottom-15 left-0 right-0 z-30 px-6">
      <div
        className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-6 shadow-2xl -mt-16  rounded-lg"
        style={{ maxWidth: "1200px", margin: "0 auto" }}
        aria-label="Check room availability"
        role="search"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCheck();
          }}
        >
          {/* Main fields row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            {/* Dates */}
            <div className="flex flex-col col-span-2 md:col-span-1 lg:col-span-2">
              <label
                htmlFor="date-range"
                className="text-sm font-light text-white/80 mb-1"
              >
                Check In — Check Out
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
              />
            </div>

            {/* Rooms */}
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
                onChange={(v) => onRoomsChange(v ?? 1)}
                className="!w-full"
                size="large"
                aria-label="Number of rooms"
              />
            </div>

            {/* Adults */}
            <div className="flex flex-col">
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
                onChange={(v) => onAdultsChange(v ?? 1)}
                className="!w-full"
                size="large"
                aria-label="Number of adults"
              />
            </div>

            {/* Children */}
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
                value={numChildren}
                onChange={(v) => handleChildrenCountChange(v ?? 0)}
                className="!w-full"
                size="large"
                aria-label="Number of children"
              />
            </div>

            {/* Button — spans full width on mobile, single col on lg+ */}
            <div className="flex flex-col col-span-2 md:col-span-1">
              <label className="text-sm font-light text-white/80 mb-1 invisible">
                &nbsp;
              </label>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                onClick={onCheck}
                loading={loading}
                disabled={!dates[0] || !dates[1] || !hasAllChildAges || loading}
                className="w-full !bg-primary !text-white hover:!opacity-90 border-none rounded-full font-semibold transition-opacity"
                aria-label={loading ? "Checking availability" : "Check room availability"}
              >
                {loading ? "Checking..." : "Check Availability"}
              </Button>
            </div>
          </div>

          {/* Child ages row */}
          {numChildren > 0 && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <p className="text-sm text-white/80 mb-2">
                Age of {numChildren === 1 ? "child" : "children"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {Array.from({ length: numChildren }, (_, i) => (
                  <div key={i} className="flex flex-col">
                    <label className="text-xs text-white/70 mb-1">
                      Child {i + 1}
                    </label>
                    <Select
                      size="large"
                      placeholder="Age"
                      value={childAges[i] ?? undefined}
                      onChange={(v) => handleChildAgeChange(i, v)}
                      options={CHILD_AGE_OPTIONS}
                      className="!w-full"
                      dropdownStyle={{ zIndex: 10000 }}
                      getPopupContainer={(trigger) =>
                        trigger.parentElement ?? document.body
                      }
                      dropdownRender={renderDropdownNoScroll}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <InfoCircleOutlined className="text-white/50 shrink-0 text-xs" />
                <span className="text-xs text-white/60">
                  Children from the age of 10 will be charged
                </span>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default CheckAvailability;
