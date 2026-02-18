'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TariffTable } from '@/components/tariffs/TariffTable';
import { TariffDetailsModal } from '@/components/tariffs/TariffDetailsModal';
import { ConfirmDialog } from '@/components/tariffs/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import tariffService, { Tariff } from '@/lib/tariff-service';
import zoneService, { Zone } from '@/lib/zone-service';

export default function TariffsPage() {
  const router = useRouter();
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [deleteTariffId, setDeleteTariffId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tariffsData, zonesData] = await Promise.all([
        tariffService.getAll(),
        zoneService.getAll()
      ]);
      setTariffs(tariffsData);
      setZones(zonesData);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (tariff: Tariff) => {
    setSelectedTariff(tariff);
    setShowDetails(true);
  };

  const handleEdit = (id: number) => {
    router.push(`/wasteCompanyDashboard/tariffs/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    setDeleteTariffId(id);
  };
  
  const confirmDelete = async () => {
    if (deleteTariffId) {
      try {
        await tariffService.delete(deleteTariffId);
        await fetchData();
        setDeleteTariffId(null);
        toast.success('Tariff deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete tariff');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Tariff Plans</h1>
          <Button onClick={() => router.push('/wasteCompanyDashboard/tariffs/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create Tariff Plan
          </Button>
        </div>

        <TariffTable
          plans={tariffs as any}
          getRuleCount={() => 0}
          onView={handleView as any}
          onEdit={handleEdit as any}
          onDelete={handleDelete as any}
        />

        <TariffDetailsModal
          plan={selectedTariff as any}
          rules={[]}
          zones={zones as any}
          open={showDetails}
          onOpenChange={setShowDetails}
        />

        <ConfirmDialog
          open={!!deleteTariffId}
          onOpenChange={() => setDeleteTariffId(null)}
          title="Confirm Delete"
          message="Are you sure you want to delete this tariff plan? This will also delete all associated rules. This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
    </div>
  );
}