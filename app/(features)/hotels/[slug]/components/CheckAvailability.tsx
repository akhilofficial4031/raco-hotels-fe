"use client";

import React, { useState } from "react";
import { DatePicker, Select, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const CheckAvailability = () => {
  const [checkIn, setCheckIn] = useState<dayjs.Dayjs | null>(
    dayjs().add(1, "day")
  );
  const [checkOut, setCheckOut] = useState<dayjs.Dayjs | null>(
    dayjs().add(2, "day")
  );
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState("1 Adult, 0 Children");

  const handleCheckInChange = (date: dayjs.Dayjs | null) => {
    setCheckIn(date);
    if (date && checkOut && date.isAfter(checkOut)) {
      setCheckOut(date.add(1, "day"));
    }
  };

  const disabledCheckOutDate = (current: dayjs.Dayjs) => {
    return current && checkIn ? current.isBefore(checkIn, "day") : false;
  };

  return (
    <div
      className="bg-slate-800 text-white p-6 shadow-lg -mt-16 absolute -bottom-15 left-0 right-0 z-30"
      style={{ maxWidth: "1200px", margin: "0 auto" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
        <div className="flex flex-col">
          <label className="text-sm font-light text-gray-300 mb-1">
            Check In
          </label>
          <DatePicker
            value={checkIn}
            onChange={handleCheckInChange}
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-light text-gray-300 mb-1">
            Check Out
          </label>
          <DatePicker
            value={checkOut}
            onChange={(date) => setCheckOut(date)}
            disabledDate={disabledCheckOutDate}
            className="w-full"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-light text-gray-300 mb-1">Rooms</label>
          <Select
            value={rooms}
            onChange={(value) => setRooms(value)}
            className="w-full"
          >
            <Option value={1}>1 Room</Option>
            <Option value={2}>2 Rooms</Option>
            <Option value={3}>3 Rooms</Option>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-light text-gray-300 mb-1">
            Guests
          </label>
          <Select
            value={guests}
            onChange={(value) => setGuests(value)}
            className="w-full"
          >
            <Option value="1 Adult, 0 Children">1 Adult, 0 Children</Option>
            <Option value="2 Adults, 0 Children">2 Adults, 0 Children</Option>
            <Option value="2 Adults, 1 Child">2 Adults, 1 Child</Option>
          </Select>
        </div>
        <Button
          type="primary"
          size="large"
          className="w-full bg-[#C3A177] hover:bg-[#b39267] border-none text-white h-full mt-5"
        >
          Check Availability
        </Button>
      </div>
    </div>
  );
};

export default CheckAvailability;
