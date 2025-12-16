'use client'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Calendar, Edit } from 'lucide-react';

export default function EditPickupSessionPage() {
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    routeId: '',
    date: '',
    startTime: '',
    estimatedDuration: '',
    driverId: '',
    vehicleId: '',
    notes: '',
    status: 'Scheduled'
  });

  useEffect(() => {
    const savedSessions = localStorage.getItem('pickupSessions');
    const sessions = savedSessions ? JSON.parse(savedSessions) : [];
    const foundSession = sessions.find(s => s.id === sessionId);
    
    if (foundSession) {
      setSession(foundSession);
      setFormData({
        routeId: foundSession.routeId || '',
        date: foundSession.date || '',
        startTime: foundSession.startTime || '',
        estimatedDuration: foundSession.estimatedDuration || '',
        driverId: foundSession.driverId || '',
        vehicleId: foundSession.vehicleId || '',
        notes: foundSession.notes || '',
        status: foundSession.status || 'Scheduled'
      });
    }
  }, [sessionId]);

  if (!session) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Pickup Session Not Found</h1>
            <p className="text-gray-600 mb-4">The pickup session you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/wasteCompanyDashboard/pickup-sessions')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Pickup Sessions
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const savedSessions = localStorage.getItem('pickupSessions');
      const sessions = savedSessions ? JSON.parse(savedSessions) : [];
      const updatedSessions = sessions.map(s => 
        s.id === sessionId ? { ...s, ...formData, updatedAt: new Date().toISOString() } : s
      );
      localStorage.setItem('pickupSessions', JSON.stringify(updatedSessions));
      
      toast.success('Pickup session updated successfully!');
      router.push('/wasteCompanyDashboard/pickup-sessions');
    } catch (error) {
      toast.error('Failed to update pickup session. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/wasteCompanyDashboard/pickup-sessions');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Edit className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold text-gray-900">Edit Pickup Session</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Route ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.routeId}
                  onChange={(e) => setFormData({...formData, routeId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  required
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Duration (hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  required
                  value={formData.estimatedDuration}
                  onChange={(e) => setFormData({...formData, estimatedDuration: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Driver ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.driverId}
                  onChange={(e) => setFormData({...formData, driverId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vehicle ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehicleId}
                  onChange={(e) => setFormData({...formData, vehicleId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Edit size={20} />
                Update Session
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}