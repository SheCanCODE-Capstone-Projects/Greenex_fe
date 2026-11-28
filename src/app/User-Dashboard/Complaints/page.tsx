"use client";

import { useState, useEffect } from 'react';
import { AlertCircle, MessageSquare, Plus, Clock, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import complaintService, { ComplaintType, Complaint } from '@/lib/complaint-citizen-service';

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'MISSED_PICKUP' as ComplaintType,
    description: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('user_complaints');
    if (stored) {
      setComplaints(JSON.parse(stored));
    }
    
    // Log household data for debugging
    const householdData = localStorage.getItem('household_data');
    console.log('Household Data:', householdData ? JSON.parse(householdData) : 'Not found');
  }, []);

  const saveComplaintsToStorage = (newComplaints: Complaint[]) => {
    localStorage.setItem('user_complaints', JSON.stringify(newComplaints));
    setComplaints(newComplaints);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.description.trim()) {
      toast.error('Please provide a description');
      return;
    }

    setSubmitting(true);
    
    const householdData = localStorage.getItem('household_data');
    const householdId = householdData ? JSON.parse(householdData).id : 'local';
    
    const localComplaint: Complaint = {
      id: Date.now().toString(),
      type: formData.type,
      description: formData.description,
      createdAt: new Date().toISOString(),
      householdId: householdId,
      wasteCompanyId: 'pending'
    };
    
    const updatedComplaints = [localComplaint, ...complaints];
    saveComplaintsToStorage(updatedComplaints);
    
    toast.success('Complaint submitted successfully');
    setFormData({ type: 'MISSED_PICKUP', description: '' });
    setShowForm(false);
    setSubmitting(false);
  };

  const handleDelete = (id: string) => {
    const updatedComplaints = complaints.filter(c => c.id !== id);
    saveComplaintsToStorage(updatedComplaints);
    toast.success('Complaint removed');
  };

  const getComplaintTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'MISSED_PICKUP': 'Missed Pickup',
      'DAMAGED_BIN': 'Damaged Bin',
      'LATE_PICKUP': 'Late Pickup',
      'INCOMPLETE_COLLECTION': 'Incomplete Collection',
      'OTHER': 'Other'
    };
    return labels[type] || type;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Complaints</h1>
          <p className="text-gray-600 mt-1">Report issues with waste collection service</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-secondary-green transition-colors"
        >
          <Plus size={20} />
          New Complaint
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="text-primary-green" size={24} />
            Submit a Complaint
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complaint Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ComplaintType })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                <option value="MISSED_PICKUP">Missed Pickup</option>
                <option value="LATE_PICKUP">Late Pickup</option>
                <option value="DAMAGED_BIN">Damaged Bin</option>
                <option value="INCOMPLETE_COLLECTION">Incomplete Collection</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Please describe the issue in detail..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-primary-green text-white py-2 rounded-lg hover:bg-secondary-green transition-colors disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Complaints</h2>
        
        {complaints.length === 0 ? (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600">No complaints submitted yet</p>
            <p className="text-sm text-gray-500 mt-1">Click "New Complaint" to report an issue</p>
          </div>
        ) : (
          <div className="space-y-3">
            {complaints.map((complaint) => (
              <div
                key={complaint.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {getComplaintTypeLabel(complaint.type)}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock size={14} />
                        {formatDate(complaint.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-700">{complaint.description}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
