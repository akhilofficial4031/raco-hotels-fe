"use client";
import React from "react";
import { Hotel, RoomType } from "@/types/hotel";
import Step1Amenities from "./steps/Step1_Amenities";
import Step2PersonalData from "./steps/Step2_PersonalData";
import Step3PaymentDetails from "./steps/Step3_PaymentDetails";

interface BookingStepperProps {
  hotel: Hotel;
  roomType: RoomType;
}

const BookingStepper: React.FC<BookingStepperProps> = ({ hotel, roomType }) => {
  const steps = [
    {
      number: 1,
      title: "Property amenities",
      component: <Step1Amenities hotel={hotel} roomType={roomType} />,
    },
    {
      number: 2,
      title: "Personal data",
      component: <Step2PersonalData />,
    },
    {
      number: 3,
      title: "Payment details",
      component: <Step3PaymentDetails roomType={roomType} />,
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`p-8 ${
            index < steps.length - 1 ? "border-b border-gray-200" : ""
          }`}
        >
          <h2 className="text-xl font-bold mb-4">
            Step {step.number}: {step.title}
          </h2>
          <div>{step.component}</div>
        </div>
      ))}
    </div>
  );
};

export default BookingStepper;
