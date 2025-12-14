'use client'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { HouseholdForm } from '@/components/households/HouseholdForm';
import { dummyHouseholds } from '@/data/households';
import { dummyZones } from '@/data/zones';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function EditHouseholdPage() {
  const router = useRouter();
  const params = useParams();
  const householdId = params.id as string;
  const [zones] = useState(dummyZones);
  const [household, setHousehold] = useState(null);

  useEffect(() => {
    const savedHouseholds = localStorage.getItem('households');
    const households = savedHouseholds ? JSON.parse(savedHouseholds) : dummyHouseholds;
    const foundHousehold = households.find(h => h.id === householdId);
    setHousehold(foundHousehold);
  }, [householdId]);

  if (!household) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Household Not Found</h1>
            <p className="text-gray-600 mb-4">The household you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/dashboard/households')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Households
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = (data: any) => {
    try {
      const savedHouseholds = localStorage.getItem('households');
      const households = savedHouseholds ? JSON.parse(savedHouseholds) : dummyHouseholds;
      const updatedHouseholds = households.map(h => 
        h.id === householdId ? { ...h, ...data } : h
      );
      localStorage.setItem('households', JSON.stringify(updatedHouseholds));
      
      toast.success('Household updated successfully!');
      router.push('/dashboard/households');
    } catch (error) {
      toast.error('Failed to update household. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/households');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <HouseholdForm
          household={household}
          zones={zones}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      </div>
    </DashboardLayout>
  );
}