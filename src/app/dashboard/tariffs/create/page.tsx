'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TariffForm } from '@/components/tariffs/TariffForm';
import { RuleFormModal } from '@/components/tariffs/RuleFormModal';
import { tariffStore } from '@/lib/tariff-store';
import { dummyZones, TariffRule } from '@/data/tariffs';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function CreateTariffPage() {
  const router = useRouter();
  const [tempRules, setTempRules] = useState<Omit<TariffRule, 'id' | 'tariff_plan_id'>[]>([]);
  const [showRuleModal, setShowRuleModal] = useState(false);

  const handleSubmit = (data: any) => {
    try {
      const newPlan = tariffStore.createPlan({
        ...data,
        waste_company_id: 'company-1',
      });

      // Add any temporary rules
      tempRules.forEach(rule => {
        tariffStore.createRule({
          ...rule,
          tariff_plan_id: newPlan.id,
        });
      });

      toast.success('Tariff plan created successfully!');
      router.push('/dashboard/tariffs');
    } catch (error) {
      toast.error('Failed to create tariff plan. Please try again.');
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/tariffs');
  };

  const handleAddRule = (ruleData: any) => {
    setTempRules(prev => [...prev, ruleData]);
    toast.success('Rule added to plan!');
  };

  const handleDeleteTempRule = (index: number) => {
    setTempRules(prev => prev.filter((_, i) => i !== index));
    toast.success('Rule removed from plan!');
  };

  const getZoneName = (zoneId: string) => {
    const zone = dummyZones.find(z => z.id === zoneId);
    return zone ? `${zone.sector} - ${zone.cell}` : 'Unknown Zone';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <TariffForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />

        {/* Optional Rules Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">Tariff Rules (Optional)</h2>
              <p className="text-sm text-gray-600">You can add rules now or later when editing the plan</p>
            </div>
            <Button onClick={() => setShowRuleModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Rule
            </Button>
          </div>

          {tempRules.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Zone</th>
                    <th className="text-left py-3 px-4 font-medium">House Type</th>
                    <th className="text-left py-3 px-4 font-medium">Frequency/Week</th>
                    <th className="text-left py-3 px-4 font-medium">Amount (RWF)</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tempRules.map((rule, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{getZoneName(rule.zone_id)}</td>
                      <td className="py-3 px-4">{rule.house_type}</td>
                      <td className="py-3 px-4">{rule.pickup_frequency_per_week}</td>
                      <td className="py-3 px-4 font-medium">{rule.amount.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTempRule(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No rules added yet. Click "Add Rule" to get started.</p>
            </div>
          )}
        </div>

        <RuleFormModal
          open={showRuleModal}
          onOpenChange={setShowRuleModal}
          zones={dummyZones}
          onSubmit={handleAddRule}
        />
      </div>
    </DashboardLayout>
  );
}