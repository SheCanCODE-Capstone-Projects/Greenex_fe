'use client'
import { Edit, Trash2 } from 'lucide-react';

interface Route {
  id: string;
  name: string;
  zoneId: string;
  dayOfWeek: string;
  shift: 'Morning' | 'Afternoon' | 'Evening';
  status: 'Active' | 'Inactive';
}

interface RouteTableProps {
  routes: Route[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function RouteTable({ routes, onEdit, onDelete }: RouteTableProps) {
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
                  <button 
                    onClick={() => onEdit(route.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => onDelete(route.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
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