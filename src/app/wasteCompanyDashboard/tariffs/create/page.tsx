'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TariffForm } from '@/components/tariffs/TariffForm';
import { toast } from 'react-toastify';
import tariffService from '@/lib/tariff-service';

export default function CreateTariffPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await tariffService.create(data);
      toast.success('Tariff plan created successfully!');
      router.push('/wasteCompanyDashboard/tariffs');
    } catch (error) {
      toast.error('Failed to create tariff plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/wasteCompanyDashboard/tariffs');
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <TariffForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditing={false}
      />
    </div>
  );
}
