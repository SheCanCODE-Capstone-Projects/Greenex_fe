"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MapPin, Plus, Edit, Trash2, Navigation, Calendar, MessageSquare } from "lucide-react";

interface Route {
  id: string;
  wasteCompanyId: string;
  zoneId: string;
  name: string;
  dayOfWeek: string;
  shift: 'Morning' | 'Afternoon' | 'Evening';
  status: 'Active' | 'Inactive';
}

export default function RoutesPage() {
  const [routes] = useState<Route[]>([
    {
      id: 'RT001',
      wasteCompanyId: 'WC001',
      zoneId: 'ZN001',
      name: 'Route A - Kicukiro',
      dayOfWeek: 'Monday',
      shift: 'Morning',
      status: 'Active'
    },
    {
      id: 'RT002',
      wasteCompanyId: 'WC001',
      zoneId: 'ZN002',
      name: 'Route B - Gasabo',
      dayOfWeek: 'Tuesday',
      shift: 'Afternoon',
      status: 'Active'
    },
    {
      id: 'RT003',
      wasteCompanyId: 'WC001',
      zoneId: 'ZN003',
      name: 'Route C - Nyarugenge',
      dayOfWeek: 'Wednesday',
      shift: 'Morning',
      status: 'Inactive'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getShiftColor = (shift: string) => {
    switch (shift) {
      case 'Morning': return 'bg-blue-100 text-blue-800';
      case 'Afternoon': return 'bg-yellow-100 text-yellow-800';
      case 'Evening': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Routes Management</h1>
            <p className="text-gray-600">Manage collection routes and assignments</p>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700">
            <Plus size={20} />
            Add Route
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => window.location.href = '/wasteCompanyDashboard/pickup-sessions'}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Calendar size={16} />
            Pickup Sessions
          </button>
          <button 
            onClick={() => window.location.href = '/wasteCompanyDashboard/complaints'}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700"
          >
            <MessageSquare size={16} />
            View Complaints
          </button>
        </div>

        <div className="bg-white rounded-lg shadow border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Route ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Route Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Zone ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Day of Week</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Shift</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routes.map((route) => (
                <tr key={route.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{route.id}</td>
                  <td className="py-3 px-4 font-medium">{route.name}</td>
                  <td className="py-3 px-4 font-mono text-sm">{route.zoneId}</td>
                  <td className="py-3 px-4">{route.dayOfWeek}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getShiftColor(route.shift)}`}>
                      {route.shift}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(route.status)}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}