import React from 'react';

export default function Header() {
  return (
    <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <div className="w-8 h-8 bg-green-800 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-xl font-bold">GreenEX</h1>
          <p className="text-sm text-teal-100">Smart Waste Collection</p>
        </div>
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