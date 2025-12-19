import React from 'react';
import { Home, Calendar, Route, CreditCard, History, Users, FileText } from 'lucide-react';

export default function GreenEXDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white">
        <div className="p-6 flex items-center gap-3 border-b border-green-700">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-green-800 rounded-full"></div>
          </div>
          <span className="text-xl font-bold">GreenEX</span>
        </div>

        <nav className="p-4">
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 bg-green-700 rounded-lg">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <Calendar size={20} />
            <span>Schedule</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <Route size={20} />
            <span>Route</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <FileText size={20} />
            <span>Household</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <CreditCard size={20} />
            <span>Payments</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <History size={20} />
            <span>History</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <Users size={20} />
            <span>Customer</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 mb-2 hover:bg-green-700 rounded-lg">
            <FileText size={20} />
            <span>Complaints</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
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

        {/* Content */}
        <div className="p-6">
          {/* My Household Section */}
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

          {/* My Complaints Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">My Complaints</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-sm"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Nov 2025</p>
                      <p className="text-sm text-gray-500">Nov 2025</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded font-semibold">Late</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Missed Pickup</p>
                      <p className="text-sm text-gray-500">Oct 8, 2025</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded font-semibold">Late</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Missed Waste</p>
                      <p className="text-sm text-gray-500">Sept 11, 2025</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-orange-500 text-white text-xs rounded font-semibold">Late</span>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 text-sm"></span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Transport not fully loaded</p>
                      <p className="text-sm text-gray-500">Oct 8, 11/25</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-500 text-white text-xs rounded font-semibold">Overdue</span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-sm"></span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Notifications</p>
                        <p className="text-sm text-gray-500">01-12-2025</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-500 text-white text-xs rounded font-semibold">New</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-sm"></span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Reminder</p>
                        <p className="text-sm text-gray-500">Tomorrow pick day</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-500 text-white text-xs rounded font-semibold">New</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm"></span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Extra Pickup</p>
                        <p className="text-sm text-gray-500">Pickup for extra 2-3 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border border-gray-200 rounded-lg px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-sm"></span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Bill of waste</p>
                        <p className="text-sm text-gray-500">03-12 EM</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-500 text-white text-xs rounded font-semibold">Follow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}