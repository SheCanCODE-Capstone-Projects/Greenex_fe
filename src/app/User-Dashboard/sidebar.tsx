import React from 'react';
import { Home, Calendar, Route, CreditCard, History, Users, FileText } from 'lucide-react';

export default function Sidebar() {
  return (
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
  );
}