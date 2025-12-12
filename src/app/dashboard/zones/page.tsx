'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Zone, dummyZones } from '@/data/zones';
import { ZoneTable } from '@/components/zones/ZoneTable';
import { ZoneDetailsModal } from '@/components/zones/ZoneDetailsModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function ZonesPage() {
  const router = useRouter();
  const [zones, setZones] = useState<Zone[]>([]);
  
  useEffect(() => {
    const savedZones = localStorage.getItem('zones');
    if (savedZones) {
      setZones(JSON.parse(savedZones));
    } else {
      setZones(dummyZones);
      localStorage.setItem('zones', JSON.stringify(dummyZones));
    }
  }, []);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteZoneId, setDeleteZoneId] = useState<string | null>(null);

  const handleView = (zone: Zone) => {
    setSelectedZone(zone);
    setShowDetails(true);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/zones/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setDeleteZoneId(id);
  };

  const confirmDelete = () => {
    if (deleteZoneId) {
      const updatedZones = zones.filter(zone => zone.id !== deleteZoneId);
      setZones(updatedZones);
      localStorage.setItem('zones', JSON.stringify(updatedZones));
      setDeleteZoneId(null);
      toast.success('Zone deleted successfully!');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Zone Management</h1>
          <Button onClick={() => router.push('/dashboard/zones/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Zone
          </Button>
        </div>

        <ZoneTable
          zones={zones}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ZoneDetailsModal
          zone={selectedZone}
          open={showDetails}
          onOpenChange={setShowDetails}
        />

        <Dialog open={!!deleteZoneId} onOpenChange={() => setDeleteZoneId(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this zone? This action cannot be undone.</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteZoneId(null)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}