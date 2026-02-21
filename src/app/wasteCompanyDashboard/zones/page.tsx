'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ZoneTable } from '@/components/zones/ZoneTable';
import { ZoneDetailsModal } from '@/components/zones/ZoneDetailsModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import zoneService from '@/lib/zone-service';
import { Zone as UIZone } from '@/data/zones';

export default function ZonesPage() {
  const router = useRouter();
  const [zones, setZones] = useState<UIZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedZone, setSelectedZone] = useState<UIZone | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteZoneId, setDeleteZoneId] = useState<string | null>(null);

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      setLoading(true);
      const data = await zoneService.getAll();

      const mappedZones: UIZone[] = data.map(z => ({
        id: String(z.id),
        district: z.district,
        districtName: z.district,
        sector: z.sector,
        sectorName: z.sector,
        cell: z.cell || '',
        cellName: z.cell || '',
        village: '', // Missing in API
        villageName: '',
        code: z.zoneName,
        description: z.description || ''
      }));

      setZones(mappedZones);
    } catch (error) {
      toast.error('Failed to fetch zones');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (zone: UIZone) => {
    setSelectedZone(zone);
    setShowDetails(true);
  };

  const handleEdit = (id: string) => {
    router.push(`/wasteCompanyDashboard/zones/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setDeleteZoneId(id);
  };

  const confirmDelete = async () => {
    if (deleteZoneId) {
      try {
        await zoneService.delete(Number(deleteZoneId));
        await fetchZones();
        setDeleteZoneId(null);
        toast.success('Zone deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete zone');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Zone Management</h1>
        <Button onClick={() => router.push('/wasteCompanyDashboard/zones/create')}>
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
  );
}