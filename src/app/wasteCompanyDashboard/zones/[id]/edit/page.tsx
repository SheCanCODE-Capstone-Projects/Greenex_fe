'use client'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ZoneForm } from '@/components/zones/ZoneForm';
import { dummyZones } from '@/data/zones';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function EditZonePage() {
  const router = useRouter();
  const params = useParams();
  const zoneId = params.id as string;

  const [zone, setZone] = useState(null);
  
  useEffect(() => {
    const savedZones = localStorage.getItem('zones');
    const zones = savedZones ? JSON.parse(savedZones) : dummyZones;
    const foundZone = zones.find(z => z.id === zoneId);
    setZone(foundZone);
  }, [zoneId]);

  if (!zone) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Zone Not Found</h1>
            <p className="text-gray-600 mb-4">The zone you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/wasteCompanyDashboard/zones')
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Zones
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleSubmit = (data: any) => {
    try {
      const savedZones = localStorage.getItem('zones');
      const zones = savedZones ? JSON.parse(savedZones) : dummyZones;
      const updatedZones = zones.map(z => 
        z.id === zoneId ? { ...z, ...data } : z
      );
      localStorage.setItem('zones', JSON.stringify(updatedZones));
      
      toast.success('Zone updated successfully!');
      router.push('/wasteCompanyDashboard/zones');
    } catch (error) {
      toast.error('Failed to update zone. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/wasteCompanyDashboard/zones');
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <ZoneForm
          zone={zone}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />
      </div>
    </DashboardLayout>
  );
}