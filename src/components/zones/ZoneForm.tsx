'use client'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Zone } from '@/data/zones';

const zoneSchema = z.object({
  sector: z.string().min(1, 'Sector is required'),
  cell: z.string().min(1, 'Cell is required'),
  village: z.string().min(1, 'Village is required'),
  code: z.string().min(1, 'Code is required'),
  description: z.string().min(1, 'Description is required'),
});

type ZoneFormData = z.infer<typeof zoneSchema>;

interface ZoneFormProps {
  zone?: Zone;
  onSubmit: (data: ZoneFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export function ZoneForm({ zone, onSubmit, onCancel, isEditing = false }: ZoneFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ZoneFormData>({
    resolver: zodResolver(zoneSchema),
    defaultValues: zone ? {
      sector: zone.sector,
      cell: zone.cell,
      village: zone.village,
      code: zone.code,
      description: zone.description,
    } : undefined,
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold mb-6">
        {isEditing ? 'Edit Zone' : 'Create New Zone'}
      </h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Sector</label>
          <Input
            {...register('sector')}
            placeholder="Enter sector"
            className={errors.sector ? 'border-red-500' : ''}
          />
          {errors.sector && (
            <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cell</label>
          <Input
            {...register('cell')}
            placeholder="Enter cell"
            className={errors.cell ? 'border-red-500' : ''}
          />
          {errors.cell && (
            <p className="text-red-500 text-sm mt-1">{errors.cell.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Village</label>
          <Input
            {...register('village')}
            placeholder="Enter village"
            className={errors.village ? 'border-red-500' : ''}
          />
          {errors.village && (
            <p className="text-red-500 text-sm mt-1">{errors.village.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Code</label>
          <Input
            {...register('code')}
            placeholder="Enter code"
            className={errors.code ? 'border-red-500' : ''}
          />
          {errors.code && (
            <p className="text-red-500 text-sm mt-1">{errors.code.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            {...register('description')}
            placeholder="Enter description"
            className={errors.description ? 'border-red-500' : ''}
            rows={3}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isEditing ? 'Save Changes' : 'Create Zone'}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}