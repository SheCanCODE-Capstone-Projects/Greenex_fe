'use client'
import { Edit, Eye } from 'lucide-react';

interface PickupSession {
  id: string;
  routeId: string;
  date: string;
  startTime?: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  driverId?: string;
  vehicleId?: string;
}

interface PickupSessionTableProps {
  sessions: PickupSession[];
  onEdit: (id: string) => void;
  onView: (id: string) => void;
}

export function PickupSessionTable({ sessions, onEdit, onView }: PickupSessionTableProps) {
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
    <div className="bg-white rounded-lg shadow border overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3 px-4 font-medium text-gray-900">Session ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Route ID</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Start Time</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Driver</th>
            <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 font-mono text-sm">{session.id}</td>
              <td className="py-3 px-4 font-mono text-sm">{session.routeId}</td>
              <td className="py-3 px-4">{new Date(session.date).toLocaleDateString()}</td>
              <td className="py-3 px-4">{session.startTime || '-'}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                  {session.status}
                </span>
              </td>
              <td className="py-3 px-4 font-mono text-sm">{session.driverId || '-'}</td>
              <td className="py-3 px-4">
                <div className="flex gap-2">
                  <button 
                    onClick={() => onEdit(session.id)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => onView(session.id)}
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