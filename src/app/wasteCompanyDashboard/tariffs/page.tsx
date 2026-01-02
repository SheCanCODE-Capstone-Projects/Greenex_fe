'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TariffPlan, TariffRule, dummyZones } from '@/data/tariffs';
import { tariffStore } from '@/lib/tariff-store';
import { TariffTable } from '@/components/tariffs/TariffTable';
import { TariffDetailsModal } from '@/components/tariffs/TariffDetailsModal';
import { ConfirmDialog } from '@/components/tariffs/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export default function TariffsPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<TariffPlan[]>(tariffStore.getPlans());
  const [selectedPlan, setSelectedPlan] = useState<TariffPlan | null>(null);
  const [selectedPlanRules, setSelectedPlanRules] = useState<TariffRule[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState<string | null>(null);

  const handleView = (plan: TariffPlan) => {
    setSelectedPlan(plan);
    setSelectedPlanRules(tariffStore.getRulesForPlan(plan.id));
    setShowDetails(true);
  };

  const handleEdit = (id: string) => {
    router.push(`/wasteCompanyDashboard/tariffs/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setDeletePlanId(id);
  };

  const confirmDelete = () => {
    if (deletePlanId) {
      const success = tariffStore.deletePlan(deletePlanId);
      if (success) {
        setPlans(tariffStore.getPlans());
        toast.success('Tariff plan deleted successfully!');
      } else {
        toast.error('Failed to delete tariff plan.');
      }
      setDeletePlanId(null);
    }
  };

  const getRuleCount = (planId: string) => {
    return tariffStore.getRuleCount(planId);
  };

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
          plans={plans}
          getRuleCount={getRuleCount}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <TariffDetailsModal
          plan={selectedPlan}
          rules={selectedPlanRules}
          zones={dummyZones}
          open={showDetails}
          onOpenChange={setShowDetails}
        />

        <ConfirmDialog
          open={!!deletePlanId}
          onOpenChange={() => setDeletePlanId(null)}
          title="Confirm Delete"
          message="Are you sure you want to delete this tariff plan? This will also delete all associated rules. This action cannot be undone."
          onConfirm={confirmDelete}
          confirmText="Delete"
          variant="destructive"
        />
    </div>
  );
}