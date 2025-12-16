'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const complaintSchema = z.object({
  householdId: z.string().min(1, 'Household ID is required'),
  type: z.enum(['Missed Pickup', 'Schedule Change', 'Damaged Bin', 'Service Quality', 'Other']),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
  status: z.enum(['Open', 'In Progress', 'Resolved']),
});

type ComplaintFormData = z.infer<typeof complaintSchema>;

interface ComplaintFormProps {
  complaint?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function ComplaintForm({ complaint, onSubmit, onCancel, isEditing = false }: ComplaintFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ComplaintFormData>({
    resolver: zodResolver(complaintSchema),
    defaultValues: complaint ? {
      householdId: complaint.householdId,
      type: complaint.type,
      description: complaint.description,
      priority: complaint.priority,
      status: complaint.status,
    } : {
      type: 'Missed Pickup',
      priority: 'Medium',
      status: 'Open',
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Complaint' : 'Create New Complaint'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Household ID *</label>
            <Input
              {...register('householdId')}
              placeholder="e.g., HH001"
              className={errors.householdId ? 'border-red-500' : ''}
            />
            {errors.householdId && (
              <p className="text-red-500 text-sm mt-1">{errors.householdId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Complaint Type *</label>
            <select
              {...register('type')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Missed Pickup">Missed Pickup</option>
              <option value="Schedule Change">Schedule Change</option>
              <option value="Damaged Bin">Damaged Bin</option>
              <option value="Service Quality">Service Quality</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Priority *</label>
            <select
              {...register('priority')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description *</label>
          <textarea
            {...register('description')}
            rows={4}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the complaint in detail..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Update Complaint' : 'Create Complaint'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}