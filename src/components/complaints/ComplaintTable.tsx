'use client'
import { Edit, Eye } from 'lucide-react';

interface Complaint {
  id: string;
  householdId: string;
  type: 'Missed Pickup' | 'Schedule Change' | 'Damaged Bin' | 'Service Quality' | 'Other';
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  resolvedAt?: string;
}

interface ComplaintTableProps {
  complaints: Complaint[];
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export function ComplaintTable({ complaints, onEdit, onView }: ComplaintTableProps) {
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
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit(complaint.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onView(complaint.id)}
                    className="text-green-600 hover:text-green-800 text-sm"
                  >
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}