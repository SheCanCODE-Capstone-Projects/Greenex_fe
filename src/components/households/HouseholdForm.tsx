'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Household, Zone } from '@/data/households';
import { ZoneSelect } from './ZoneSelect';

const householdSchema = z.object({
  zone_id: z.string().min(1, 'Zone is required'),
  household_code: z.string().min(1, 'Household code is required'),
  head_of_household: z.string().min(1, 'Head of household is required'),
  phone: z.string().min(1, 'Phone number is required'),
  house_type: z.enum(['Apartment', 'Bungalow', 'Duplex', 'Other'], {
    required_error: 'House type is required'
  }),
  number_of_people: z.number().min(1, 'Number of people must be at least 1'),
  address_description: z.string().optional(),
});

type HouseholdFormData = z.infer<typeof householdSchema>;

interface HouseholdFormProps {
  household?: Household;
  zones: Zone[];
  onSubmit: (data: HouseholdFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function HouseholdForm({ household, zones, onSubmit, onCancel, isEditing = false }: HouseholdFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<HouseholdFormData>({
    resolver: zodResolver(householdSchema),
    defaultValues: household ? {
      zone_id: household.zone_id,
      household_code: household.household_code,
      head_of_household: household.head_of_household,
      phone: household.phone,
      house_type: household.house_type,
      number_of_people: household.number_of_people,
      address_description: household.address_description,
    } : {
      number_of_people: 1,
    },
  });

  const watchedZoneId = watch('zone_id');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Household' : 'Register New Household'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Zone *</label>
            <ZoneSelect
              zones={zones}
              value={watchedZoneId || ''}
              onChange={(value) => setValue('zone_id', value)}
              className={errors.zone_id ? 'border-red-500' : ''}
            />
            {errors.zone_id && (
              <p className="text-red-500 text-sm mt-1">{errors.zone_id.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Household Code *</label>
            <Input
              {...register('household_code')}
              placeholder="e.g., HH-KIC-001"
              className={errors.household_code ? 'border-red-500' : ''}
            />
            {errors.household_code && (
              <p className="text-red-500 text-sm mt-1">{errors.household_code.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Head of Household *</label>
            <Input
              {...register('head_of_household')}
              placeholder="Full name"
              className={errors.head_of_household ? 'border-red-500' : ''}
            />
            {errors.head_of_household && (
              <p className="text-red-500 text-sm mt-1">{errors.head_of_household.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Phone Number *</label>
            <Input
              {...register('phone')}
              placeholder="+250788123456"
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">House Type *</label>
            <select
              {...register('house_type')}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${errors.house_type ? 'border-red-500' : ''}`}
            >
              <option value="">Select house type</option>
              <option value="Apartment">Apartment</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Duplex">Duplex</option>
              <option value="Other">Other</option>
            </select>
            {errors.house_type && (
              <p className="text-red-500 text-sm mt-1">{errors.house_type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Number of People *</label>
            <Input
              type="number"
              min="1"
              {...register('number_of_people', { valueAsNumber: true })}
              className={errors.number_of_people ? 'border-red-500' : ''}
            />
            {errors.number_of_people && (
              <p className="text-red-500 text-sm mt-1">{errors.number_of_people.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Address Description</label>
          <Textarea
            {...register('address_description')}
            placeholder="Detailed address or landmarks"
            rows={3}
            className={errors.address_description ? 'border-red-500' : ''}
          />
          {errors.address_description && (
            <p className="text-red-500 text-sm mt-1">{errors.address_description.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Save Household'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}