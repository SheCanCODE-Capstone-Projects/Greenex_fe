'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const routeSchema = z.object({
  name: z.string().min(1, 'Route name is required'),
  zoneId: z.string().min(1, 'Zone ID is required'),
  dayOfWeek: z.string().min(1, 'Day of week is required'),
  shift: z.enum(['Morning', 'Afternoon', 'Evening']),
  status: z.enum(['Active', 'Inactive']),
});

type RouteFormData = z.infer<typeof routeSchema>;

interface RouteFormProps {
  route?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function RouteForm({ route, onSubmit, onCancel, isEditing = false }: RouteFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RouteFormData>({
    resolver: zodResolver(routeSchema),
    defaultValues: route ? {
      name: route.name,
      zoneId: route.zoneId,
      dayOfWeek: route.dayOfWeek,
      shift: route.shift,
      status: route.status,
    } : {
      shift: 'Morning',
      status: 'Active',
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Route' : 'Create New Route'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Route Name *</label>
            <Input
              {...register('name')}
              placeholder="e.g., Route A - Kicukiro"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Zone ID *</label>
            <Input
              {...register('zoneId')}
              placeholder="e.g., ZN001"
              className={errors.zoneId ? 'border-red-500' : ''}
            />
            {errors.zoneId && (
              <p className="text-red-500 text-sm mt-1">{errors.zoneId.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Day of Week *</label>
            <select
              {...register('dayOfWeek')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.dayOfWeek ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            {errors.dayOfWeek && (
              <p className="text-red-500 text-sm mt-1">{errors.dayOfWeek.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Shift *</label>
            <select
              {...register('shift')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status *</label>
            <select
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Update Route' : 'Create Route'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}