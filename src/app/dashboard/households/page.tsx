'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Household, dummyHouseholds } from '@/data/households';
import { Zone, dummyZones } from '@/data/zones';
import { HouseholdTable } from '@/components/households/HouseholdTable';
import { HouseholdDetailsModal } from '@/components/households/HouseholdDetailsModal';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function HouseholdsPage() {
  const router = useRouter();
  const [households, setHouseholds] = useState<Household[]>([]);
  const [zones] = useState<Zone[]>(dummyZones);
  const [selectedHousehold, setSelectedHousehold] = useState<Household | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteHouseholdId, setDeleteHouseholdId] = useState<string | null>(null);

  useEffect(() => {
    const savedHouseholds = localStorage.getItem('households');
    if (savedHouseholds) {
      setHouseholds(JSON.parse(savedHouseholds));
    } else {
      setHouseholds(dummyHouseholds);
      localStorage.setItem('households', JSON.stringify(dummyHouseholds));
    }
  }, []);

  const handleView = (household: Household) => {
    setSelectedHousehold(household);
    setShowDetails(true);
  };

  const handleEdit = (id: string) => {
    router.push(`/dashboard/households/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setDeleteHouseholdId(id);
  };

  const handleToggleStatus = (id: string) => {
    const updatedHouseholds = households.map(household => 
      household.id === id 
        ? { ...household, status: household.status === 'active' ? 'inactive' : 'active' }
        : household
    );
    setHouseholds(updatedHouseholds);
    localStorage.setItem('households', JSON.stringify(updatedHouseholds));
    
    const household = households.find(h => h.id === id);
    const newStatus = household?.status === 'active' ? 'inactive' : 'active';
    toast.success(`Household ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const confirmDelete = () => {
    if (deleteHouseholdId) {
      const updatedHouseholds = households.filter(household => household.id !== deleteHouseholdId);
      setHouseholds(updatedHouseholds);
      localStorage.setItem('households', JSON.stringify(updatedHouseholds));
      setDeleteHouseholdId(null);
      toast.success('Household deleted successfully!');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Household Management</h1>
          <Button onClick={() => router.push('/dashboard/households/create')}>
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
    </DashboardLayout>
  );
}