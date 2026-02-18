'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HouseholdTable } from '@/components/households/HouseholdTable';
import { HouseholdDetailsModal } from '@/components/households/HouseholdDetailsModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import householdService, { Household } from '@/lib/household-service';
import zoneService, { Zone } from '@/lib/zone-service';

export default function HouseholdsPage() {
  const router = useRouter();
  const [households, setHouseholds] = useState<Household[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteHouseholdId, setDeleteHouseholdId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [householdsData, zonesData] = await Promise.all([
        householdService.getAll(),
        zoneService.getAll()
      ]);
      setHouseholds(householdsData);
      setZones(zonesData);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (household: Household) => {
    setSelectedHousehold(household);
    setShowDetails(true);
  };

  const handleEdit = (id: number) => {
    router.push(`/wasteCompanyDashboard/households/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    setDeleteHouseholdId(id);
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const household = households.find(h => h.id === id);
      if (!household) return;
      
      const newStatus = household.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await householdService.update(id, { ...household, status: newStatus } as any);
      await fetchData();
      toast.success(`Household ${newStatus === 'ACTIVE' ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const confirmDelete = async () => {
    if (deleteHouseholdId) {
      try {
        await householdService.delete(deleteHouseholdId);
        await fetchData();
        setDeleteHouseholdId(null);
        toast.success('Household deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete household');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Household Management</h1>
        <Button onClick={() => router.push('/wasteCompanyDashboard/households/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Register New Household
        </Button>
      </div>

      <HouseholdTable
        households={households}
        zones={zones}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />

      <HouseholdDetailsModal
        household={selectedHousehold}
        zones={zones}
        open={showDetails}
        onOpenChange={setShowDetails}
      />

      <Dialog open={!!deleteHouseholdId} onOpenChange={() => setDeleteHouseholdId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this household? This action cannot be undone.</p>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeleteHouseholdId(null)}>
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