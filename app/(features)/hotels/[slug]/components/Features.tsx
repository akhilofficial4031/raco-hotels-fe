import { Feature } from "@/types/hotel";
import React from "react";

interface Props {
  features: Feature[];
}

const Features = ({ features }: Props) => {
  return (
    <div className="py-16">
      <h2 className="text-4xl font-serif text-purple-900 mb-8 text-center">
        Features
      </h2>
      <div className="max-w-4xl mx-auto border-t border-b border-gray-300 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {features.map((feature) => (
            <div key={feature.id}>
              <h3 className="text-xl font-semibold text-purple-800 font-sans">
                {feature.name}
              </h3>
              <p className="text-gray-600 mt-1 font-sans">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
