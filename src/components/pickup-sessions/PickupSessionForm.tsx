'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const pickupSessionSchema = z.object({
  routeId: z.string().min(1, 'Route ID is required'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start time is required'),
  estimatedDuration: z.string().min(1, 'Duration is required'),
  driverId: z.string().min(1, 'Driver ID is required'),
  vehicleId: z.string().min(1, 'Vehicle ID is required'),
  notes: z.string().optional(),
  status: z.enum(['Scheduled', 'In Progress', 'Completed', 'Cancelled']),
});

type PickupSessionFormData = z.infer<typeof pickupSessionSchema>;

interface PickupSessionFormProps {
  session?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function PickupSessionForm({ session, onSubmit, onCancel, isEditing = false }: PickupSessionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PickupSessionFormData>({
    resolver: zodResolver(pickupSessionSchema),
    defaultValues: session ? {
      routeId: session.routeId,
      date: session.date,
      startTime: session.startTime,
      estimatedDuration: session.estimatedDuration,
      driverId: session.driverId,
      vehicleId: session.vehicleId,
      notes: session.notes,
      status: session.status,
    } : {
      status: 'Scheduled',
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Pickup Session' : 'Schedule New Pickup Session'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Route ID *</label>
            <Input
              {...register('routeId')}
              placeholder="Enter route ID"
              className={errors.routeId ? 'border-red-500' : ''}
            />
            {errors.routeId && (
              <p className="text-red-500 text-sm mt-1">{errors.routeId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <Input
              type="date"
              {...register('date')}
              className={errors.date ? 'border-red-500' : ''}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Time *</label>
            <Input
              type="time"
              {...register('startTime')}
              className={errors.startTime ? 'border-red-500' : ''}
            />
            {errors.startTime && (
              <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estimated Duration (hours) *</label>
            <Input
              type="number"
              step="0.5"
              min="0.5"
              {...register('estimatedDuration')}
              placeholder="e.g., 2.5"
              className={errors.estimatedDuration ? 'border-red-500' : ''}
            />
            {errors.estimatedDuration && (
              <p className="text-red-500 text-sm mt-1">{errors.estimatedDuration.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Driver ID *</label>
            <Input
              {...register('driverId')}
              placeholder="Enter driver ID"
              className={errors.driverId ? 'border-red-500' : ''}
            />
            {errors.driverId && (
              <p className="text-red-500 text-sm mt-1">{errors.driverId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Vehicle ID *</label>
            <Input
              {...register('vehicleId')}
              placeholder="Enter vehicle ID"
              className={errors.vehicleId ? 'border-red-500' : ''}
            />
            {errors.vehicleId && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicleId.message}</p>
            )}
          </div>

          {isEditing && (
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Add any additional notes..."
          />
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Update Session' : 'Schedule Session'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}