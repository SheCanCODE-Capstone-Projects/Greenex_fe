'use client'
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { TariffForm } from '@/components/tariffs/TariffForm';
import { RuleTable } from '@/components/tariffs/RuleTable';
import { RuleFormModal } from '@/components/tariffs/RuleFormModal';
import { ConfirmDialog } from '@/components/tariffs/ConfirmDialog';
import { tariffStore } from '@/lib/tariff-store';
import { dummyZones, TariffPlan, TariffRule } from '@/data/tariffs';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function EditTariffPage() {
  const router = useRouter();
  const params = useParams();
  const planId = params.id as string;
  
  const [plan, setPlan] = useState<TariffPlan | null>(null);
  const [rules, setRules] = useState<TariffRule[]>([]);
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [editingRule, setEditingRule] = useState<TariffRule | undefined>(undefined);
  const [deleteRuleId, setDeleteRuleId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    const foundPlan = tariffStore.getPlan(planId);
    if (foundPlan) {
      setPlan(foundPlan);
      setRules(tariffStore.getRulesForPlan(planId));
    }
  }, [planId]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (!plan) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold mb-4">Tariff Plan Not Found</h1>
            <p className="text-gray-600 mb-4">The tariff plan you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/dashboard/tariffs')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Tariff Plans
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handlePlanSubmit = (data: any) => {
    try {
      const updatedPlan = tariffStore.updatePlan(planId, data);
      if (updatedPlan) {
        setPlan(updatedPlan);
        setHasUnsavedChanges(false);
        toast.success('Tariff plan updated successfully!');
      } else {
        toast.error('Failed to update tariff plan.');
      }
    } catch (error) {
      toast.error('Failed to update tariff plan. Please try again.');
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmed) return;
    }
    router.push('/dashboard/tariffs');
  };

  const handleAddRule = () => {
    setEditingRule(undefined);
    setShowRuleModal(true);
  };

  const handleEditRule = (rule: TariffRule) => {
    setEditingRule(rule);
    setShowRuleModal(true);
  };

  const handleRuleSubmit = (ruleData: any) => {
    try {
      if (editingRule) {
        const updatedRule = tariffStore.updateRule(editingRule.id, ruleData);
        if (updatedRule) {
          setRules(tariffStore.getRulesForPlan(planId));
          toast.success('Rule updated successfully!');
        } else {
          toast.error('Failed to update rule.');
        }
      } else {
        tariffStore.createRule({
          ...ruleData,
          tariff_plan_id: planId,
        });
        setRules(tariffStore.getRulesForPlan(planId));
        toast.success('Rule added successfully!');
      }
    } catch (error) {
      toast.error('Failed to save rule. Please try again.');
    }
  };

  const handleDeleteRule = (id: string) => {
    setDeleteRuleId(id);
  };

  const confirmDeleteRule = () => {
    if (deleteRuleId) {
      const success = tariffStore.deleteRule(deleteRuleId);
      if (success) {
        setRules(tariffStore.getRulesForPlan(planId));
        toast.success('Rule deleted successfully!');
      } else {
        toast.error('Failed to delete rule.');
      }
      setDeleteRuleId(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <TariffForm
          plan={plan}
          onSubmit={handlePlanSubmit}
          onCancel={handleCancel}
          isEditing={true}
        />

        <RuleTable
          rules={rules}
          zones={dummyZones}
          onAdd={handleAddRule}
          onEdit={handleEditRule}
          onDelete={handleDeleteRule}
        />

        <RuleFormModal
          open={showRuleModal}
          onOpenChange={setShowRuleModal}
          rule={editingRule}
          zones={dummyZones}
          onSubmit={handleRuleSubmit}
        />

        <ConfirmDialog
          open={!!deleteRuleId}
          onOpenChange={() => setDeleteRuleId(null)}
          title="Confirm Delete"
          message="Are you sure you want to delete this rule? This action cannot be undone."
          onConfirm={confirmDeleteRule}
          confirmText="Delete"
          variant="destructive"
        />
      </div>
    </DashboardLayout>
  );
}