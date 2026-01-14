import React from "react";
import { Truck } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-6 flex items-center justify-between">
      <div className="flex flex-col">
        {/* Row 1: Logo + Title */}
        <div className="flex items-center gap-3">
          <Truck size={40} className="text-secondary-green" />
          <h1 className="text-xl font-bold">GreenEX</h1>
        </div>

        {/* Row 2: Subtitle */}
        <p className="text-sm text-teal-100 ml-13">Smart Waste Collection</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-semibold">John Doe</p>
          <p className="text-sm text-teal-100">Registered: 01-05-2024</p>
        </div>
        <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center font-bold">
          JD
        </div>
      </div>
    </div>
  );
}
