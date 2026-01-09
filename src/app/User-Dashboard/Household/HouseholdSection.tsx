import React from 'react';

export default function HouseholdSection() {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">My Household</h2>
        <a href="#" className="text-green-600 hover:underline">view Map</a>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Wednesday</h3>
            <p className="text-gray-600">December 4, 2025</p>
            <p className="text-sm text-gray-500">8:00 AM - 10 AM</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-gray-600">Status:</span>
              <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">Active</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">Household Code</p>
            <p className="font-bold text-gray-800 mb-3">KG-001-2024</p>
            <p className="text-sm text-gray-500 mb-1">No. Houses</p>
            <div className="flex items-center gap-2">
              <p className="font-bold text-gray-800">1</p>
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-3">Address</p>
            <p className="text-sm text-gray-700">Sector / Cell / Village</p>
            <p className="text-sm text-gray-500">Pulmotti3</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Collection Day</h4>
            <p className="text-gray-600 mb-1">December 4, 2025</p>
            <p className="text-sm text-gray-500 mb-3">8:00 AM - 10 AM</p>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Route A - Gasabo</p>
              <button className="px-4 py-1 bg-green-500 text-white text-sm rounded-full font-semibold">
                Renew All
              </button>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Month Bill Status</h4>
            <p className="text-gray-600 mb-1">Amount: <span className="font-bold">3,000 RWF</span></p>
            <p className="text-sm mb-3">Status: <span className="font-semibold text-green-600">PAID</span></p>
            <div className="flex items-center justify-between">
              <button className="px-4 py-1 bg-green-500 text-white text-sm rounded-full font-semibold">
                View Full Bill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}