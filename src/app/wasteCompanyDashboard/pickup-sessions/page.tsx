"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Truck, Clock, CheckCircle, Calendar, Plus, MapPin, MessageSquare } from "lucide-react";
import { PickupSessionTable } from '@/components/pickup-sessions/PickupSessionTable';

interface PickupSession {
  id: string;
  routeId: string;
  date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
}

export default function PickupSessionsPage() {
  const [sessions] = useState<PickupSession[]>([
    {
      id: 'PS001',
      routeId: 'RT001',
      date: '2024-01-15',
      status: 'In Progress'
    },
    {
      id: 'PS002',
      routeId: 'RT002',
      date: '2024-01-15',
      status: 'Completed'
    },
    {
      id: 'PS003',
      routeId: 'RT003',
      date: '2024-01-16',
      status: 'Scheduled'
    },
    {
      id: 'PS004',
      routeId: 'RT001',
      date: '2024-01-16',
      status: 'Cancelled'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };



  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pickup Sessions</h1>
            <p className="text-gray-600">Monitor and manage waste collection sessions</p>
          </div>
          <button 
            onClick={() => window.location.href = '/wasteCompanyDashboard/pickup-sessions/create'}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={20} />
            Schedule Session
          </button>
        </div>

        <div className="flex gap-3 mb-4">
          <button 
            onClick={() => window.location.href = '/wasteCompanyDashboard/routes'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <MapPin size={16} />
            Manage Routes
          </button>
          <button 
            onClick={() => window.location.href = '/wasteCompanyDashboard/complaints'}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-orange-700"
          >
            <MessageSquare size={16} />
            View Complaints
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Scheduled</p>
                <p className="text-2xl font-bold text-blue-600">
                  {sessions.filter(s => s.status === 'Scheduled').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {sessions.filter(s => s.status === 'In Progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {sessions.filter(s => s.status === 'Completed').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <Truck className="text-purple-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Sessions</p>
                <p className="text-2xl font-bold text-purple-600">{sessions.length}</p>
              </div>
            </div>
          </div>
        </div>

        <PickupSessionTable 
          sessions={sessions}
          onEdit={(id) => window.location.href = `/wasteCompanyDashboard/pickup-sessions/${id}/edit`}
          onView={(id) => console.log('View session:', id)}
        />
      </div>
    </DashboardLayout>
  );
}