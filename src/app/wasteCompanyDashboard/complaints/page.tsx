"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { Plus, Search, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { dummyHouseholds } from '../../../data/households';

interface Complaint {
  id: string;
  household_id: string;
  type: 'Missed Pickup' | 'Late Pickup' | 'Irregular Schedule' | 'Partial Pickup' | 'Overfilled Bins Not Emptied' | 'No Pickup for Several Weeks' | 'Other';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created_at: string;
  resolved_at: string | null;
}

const COMPLAINT_TYPES = [
  'Missed Pickup',
  'Late Pickup', 
  'Irregular Schedule',
  'Partial Pickup',
  'Overfilled Bins Not Emptied',
  'No Pickup for Several Weeks',
  'Other'
] as const;

const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved', 'Closed'] as const;

export default function ComplaintsPage() {
  const router = useRouter();
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "C001",
      household_id: "1",
      type: "Missed Pickup",
      description: "Garbage was not collected on scheduled day. Bins were left full.",
      status: "Open",
      created_at: "2024-01-15T08:30:00Z",
      resolved_at: null
    },
    {
      id: "C002", 
      household_id: "2",
      type: "Late Pickup",
      description: "Pickup was 3 hours late from scheduled time.",
      status: "In Progress",
      created_at: "2024-01-14T10:15:00Z",
      resolved_at: null
    },
    {
      id: "C003",
      household_id: "3", 
      type: "Overfilled Bins Not Emptied",
      description: "Bins were overfilled and crew left them without emptying.",
      status: "Resolved",
      created_at: "2024-01-13T14:20:00Z",
      resolved_at: "2024-01-14T09:00:00Z"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const [newComplaint, setNewComplaint] = useState({
    household_id: "",
    type: "" as Complaint['type'] | "",
    description: "",
    status: "Open" as Complaint['status']
  });

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.household_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || complaint.status === statusFilter;
    const matchesType = typeFilter === "All" || complaint.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddComplaint = () => {
    if (!newComplaint.household_id || !newComplaint.type || !newComplaint.description) {
      alert("Please fill in all required fields");
      return;
    }

    const complaint: Complaint = {
      id: `C${String(complaints.length + 1).padStart(3, '0')}`,
      household_id: newComplaint.household_id,
      type: newComplaint.type as Complaint['type'],
      description: newComplaint.description,
      status: newComplaint.status,
      created_at: new Date().toISOString(),
      resolved_at: null
    };

    setComplaints([complaint, ...complaints]);
    setNewComplaint({
      household_id: "",
      type: "",
      description: "",
      status: "Open"
    });
    setShowAddForm(false);
  };

  const updateComplaintStatus = (id: string, status: Complaint['status']) => {
    setComplaints(complaints.map(complaint => 
      complaint.id === id 
        ? { 
            ...complaint, 
            status, 
            resolved_at: status === 'Resolved' ? new Date().toISOString() : null 
          }
        : complaint
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'In Progress': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Closed': return <CheckCircle className="w-4 h-4 text-gray-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="p-6 space-y-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Complaints Management</h1>
              <p className="text-gray-600">Manage and track customer complaints</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Complaint
            </button>
          </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              {COMPLAINT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Household</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {complaint.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dummyHouseholds.find(h => h.id === complaint.household_id)?.code || complaint.household_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {complaint.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {complaint.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(complaint.status)}
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                          {complaint.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(complaint.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={complaint.status}
                        onChange={(e) => updateComplaintStatus(complaint.id, e.target.value as Complaint['status'])}
                        className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {STATUS_OPTIONS.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Add New Complaint</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Household *</label>
                  <select
                    value={newComplaint.household_id}
                    onChange={(e) => setNewComplaint({...newComplaint, household_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select household</option>
                    {dummyHouseholds.filter(h => h.status === 'active').map(household => (
                      <option key={household.id} value={household.id}>
                        {household.code} - {household.address}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    value={newComplaint.type}
                    onChange={(e) => setNewComplaint({...newComplaint, type: e.target.value as Complaint['type']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select complaint type</option>
                    {COMPLAINT_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    value={newComplaint.description}
                    onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Describe the complaint..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={newComplaint.status}
                    onChange={(e) => setNewComplaint({...newComplaint, status: e.target.value as Complaint['status']})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {STATUS_OPTIONS.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddComplaint}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Complaint
                </button>
              </div>
            </div>
          </div>
        )}
        </section>
  );
}