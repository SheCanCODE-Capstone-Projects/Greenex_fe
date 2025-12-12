'use client'
import { useRouter } from 'next/navigation';
import { ZoneForm } from '@/components/zones/ZoneForm';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CreateZonePage() {
  const router = useRouter();

  const handleSubmit = (data: any) => {
    try {
      const newZone = {
        id: Date.now().toString(),
        ...data,
      };
      
      const savedZones = localStorage.getItem('zones');
      const zones = savedZones ? JSON.parse(savedZones) : [];
      const updatedZones = [...zones, newZone];
      localStorage.setItem('zones', JSON.stringify(updatedZones));
      
      toast.success('Zone created successfully!');
      router.push('/dashboard/zones');
    } catch (error) {
      toast.error('Failed to create zone. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/zones');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <ZoneForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </DashboardLayout>
  );
}