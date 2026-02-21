'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TariffPlan } from '@/data/tariffs';

const tariffPlanSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  billing_frequency: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY'], {
    message: 'Billing frequency is required'
  }),
  active_from: z.string().min(1, 'Active from date is required'),
  active_to: z.string().min(1, 'Active to date is required'),
  status: z.enum(['ACTIVE', 'INACTIVE'], {
    message: 'Status is required'
  }),
}).refine((data) => {
  const fromDate = new Date(data.active_from);
  const toDate = new Date(data.active_to);
  return toDate >= fromDate;
}, {
  message: "Active to date must be after or equal to active from date",
  path: ["active_to"],
});

type TariffPlanFormData = z.infer<typeof tariffPlanSchema>;

interface TariffFormProps {
  plan?: TariffPlan;
  onSubmit: (data: TariffPlanFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function TariffForm({ plan, onSubmit, onCancel, isEditing = false }: TariffFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TariffPlanFormData>({
    resolver: zodResolver(tariffPlanSchema),
    defaultValues: plan ? {
      name: plan.name,
      billing_frequency: plan.billing_frequency,
      active_from: plan.active_from,
      active_to: plan.active_to,
      status: plan.status,
    } : {
      status: 'ACTIVE',
      billing_frequency: 'MONTHLY',
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Tariff Plan' : 'Create Tariff Plan'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Plan Name *</label>
            <Input
              {...register('name')}
              placeholder="e.g., Standard Residential Plan"
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Billing Frequency *</label>
            <select
              {...register('billing_frequency')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.billing_frequency ? 'border-red-500' : ''}`}
            >
              <option value="">Select frequency</option>
              <option value="MONTHLY">Monthly</option>
              <option value="QUARTERLY">Quarterly</option>
              <option value="YEARLY">Yearly</option>
            </select>
            {errors.billing_frequency && (
              <p className="text-red-500 text-sm mt-1">{errors.billing_frequency.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Active From *</label>
            <Input
              type="date"
              {...register('active_from')}
              className={errors.active_from ? 'border-red-500' : ''}
            />
            {errors.active_from && (
              <p className="text-red-500 text-sm mt-1">{errors.active_from.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Active To *</label>
            <Input
              type="date"
              {...register('active_to')}
              className={errors.active_to ? 'border-red-500' : ''}
            />
            {errors.active_to && (
              <p className="text-red-500 text-sm mt-1">{errors.active_to.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status *</label>
            <select
              {...register('status')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.status ? 'border-red-500' : ''}`}
            >
              <option value="">Select status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Create Plan'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}