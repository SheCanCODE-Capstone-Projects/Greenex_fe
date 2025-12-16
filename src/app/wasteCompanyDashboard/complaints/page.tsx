"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { MessageSquare, Clock, CheckCircle, AlertTriangle, Plus, MapPin, Calendar } from "lucide-react";

interface Complaint {
  id: string;
  householdId: string;
  companyUserId: string;
  type: 'Missed Pickup' | 'Schedule Change' | 'Damaged Bin' | 'Service Quality' | 'Other';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  resolvedAt?: string;
}

export default function ComplaintsPage() {
  const [complaints] = useState<Complaint[]>([
    {
      id: 'CP001',
      householdId: 'HH001',
      companyUserId: 'CU001',
      type: 'Missed Pickup',
      description: 'Garbage was not collected on scheduled day',
      status: 'Open',
      createdAt: '2024-01-15T09:30:00Z'
    },
    {
      id: 'CP002',
      householdId: 'HH002',
      companyUserId: 'CU002',
      type: 'Schedule Change',
      description: 'Request to change pickup time from morning to afternoon',
      status: 'In Progress',
      createdAt: '2024-01-14T14:20:00Z'
    },
    {
      id: 'CP003',
      householdId: 'HH003',
      companyUserId: 'CU001',
      type: 'Damaged Bin',
      description: 'Waste bin was damaged during collection',
      status: 'Resolved',
      createdAt: '2024-01-13T11:15:00Z',
      resolvedAt: '2024-01-14T16:30:00Z'
    }
  ]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Missed Pickup': return 'bg-red-100 text-red-800';
      case 'Schedule Change': return 'bg-blue-100 text-blue-800';
      case 'Damaged Bin': return 'bg-yellow-100 text-yellow-800';
      case 'Service Quality': return 'bg-purple-100 text-purple-800';
      case 'Other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
            <p className="text-gray-600">Track and resolve customer complaints</p>
          </div>
          <button 
            onClick={() => window.location.href = '/wasteCompanyDashboard/complaints/create'}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <Plus size={20} />
            Add Complaint
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
            onClick={() => window.location.href = '/wasteCompanyDashboard/routes'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <MapPin size={16} />
            Manage Routes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-blue-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Total Complaints</p>
                <p className="text-2xl font-bold text-blue-600">{complaints.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <Clock className="text-yellow-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Open</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {complaints.filter(c => c.status === 'Open').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-orange-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">
                  {complaints.filter(c => c.status === 'In Progress').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-green-600">
                  {complaints.filter(c => c.status === 'Resolved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Complaint ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Household ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Created At</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Resolved At</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-sm">{complaint.id}</td>
                  <td className="py-3 px-4 font-mono text-sm">{complaint.householdId}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(complaint.type)}`}>
                      {complaint.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs truncate">{complaint.description}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm">{new Date(complaint.createdAt).toLocaleString()}</td>
                  <td className="py-3 px-4 text-sm">
                    {complaint.resolvedAt ? new Date(complaint.resolvedAt).toLocaleString() : '-'}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => window.location.href = `/wasteCompanyDashboard/complaints/${complaint.id}/edit`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        View Details
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