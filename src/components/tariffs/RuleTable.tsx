'use client'
import { TariffRule, Zone } from '@/data/tariffs';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Plus } from 'lucide-react';

interface RuleTableProps {
  rules: TariffRule[];
  zones: Zone[];
  onAdd: () => void;
  onEdit: (rule: TariffRule) => void;
  onDelete: (id: string) => void;
}

export function RuleTable({ rules, zones, onAdd, onEdit, onDelete }: RuleTableProps) {
  const getZoneName = (zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    return zone ? `${zone.sector} - ${zone.cell}` : 'Unknown Zone';
  };

  const getTotalEstimate = () => {
    return rules.reduce((total, rule) => {
      // Simple estimate: amount × frequency × 4 weeks
      return total + (rule.amount * rule.pickup_frequency_per_week * 4);
    }, 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Tariff Rules</h2>
        <Button onClick={onAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      {rules.length > 0 ? (
        <>
          <div className="overflow-x-auto mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Zone</th>
                  <th className="text-left py-3 px-4 font-medium">House Type</th>
                  <th className="text-left py-3 px-4 font-medium">Frequency/Week</th>
                  <th className="text-left py-3 px-4 font-medium">Amount (RWF)</th>
                  <th className="text-left py-3 px-4 font-medium">Monthly Est.</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rules.map((rule) => (
                  <tr key={rule.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{getZoneName(rule.zone_id)}</td>
                    <td className="py-3 px-4">{rule.house_type}</td>
                    <td className="py-3 px-4">{rule.pickup_frequency_per_week}</td>
                    <td className="py-3 px-4 font-medium">{rule.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-green-600 font-medium">
                      {(rule.amount * rule.pickup_frequency_per_week * 4).toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onEdit(rule)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onDelete(rule.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-green-800">
                Total Rules: {rules.length}
              </span>
              <span className="text-lg font-bold text-green-800">
                Monthly Revenue Estimate: {getTotalEstimate().toLocaleString()} RWF
              </span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              *Estimate based on amount × frequency × 4 weeks per month
            </p>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p className="mb-4">No rules defined for this tariff plan</p>
          <Button onClick={onAdd} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Add First Rule
          </Button>
        </div>
      )}
    </div>
  );
}