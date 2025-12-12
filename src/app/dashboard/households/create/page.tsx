'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HouseholdForm } from '@/components/households/HouseholdForm';
import { dummyZones } from '@/data/households';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CreateHouseholdPage() {
  const router = useRouter();
  const [zones] = useState(dummyZones);

  const handleSubmit = (data: any) => {
    try {
      const newHousehold = {
        id: Date.now().toString(),
        ...data,
      };
      
      const savedHouseholds = localStorage.getItem('households');
      const households = savedHouseholds ? JSON.parse(savedHouseholds) : [];
      const updatedHouseholds = [...households, newHousehold];
      localStorage.setItem('households', JSON.stringify(updatedHouseholds));
      
      toast.success('Household registered successfully!');
      router.push('/dashboard/households');
    } catch (error) {
      toast.error('Failed to register household. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/households');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <HouseholdForm
          zones={zones}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
}