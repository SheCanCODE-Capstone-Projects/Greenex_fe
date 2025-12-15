'use client'
import { useState } from 'react';
import { TariffPlan } from '@/data/tariffs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, Edit, Trash2, Search } from 'lucide-react';

interface TariffTableProps {
  plans: TariffPlan[];
  getRuleCount: (planId: string) => number;
  onView: (plan: TariffPlan) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TariffTable({ plans, getRuleCount, onView, onEdit, onDelete }: TariffTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPlans = plans.filter(plan =>
    plan.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBillingFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'MONTHLY': return 'Monthly';
      case 'QUARTERLY': return 'Quarterly';
      case 'YEARLY': return 'Yearly';
      default: return frequency;
    }
  };

  const formatDateRange = (from: string, to: string) => {
    const fromDate = new Date(from).toLocaleDateString();
    const toDate = new Date(to).toLocaleDateString();
    return `${fromDate} → ${toDate}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by plan name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 px-4 font-medium">Name</th>
              <th className="text-left py-3 px-4 font-medium">Billing Frequency</th>
              <th className="text-left py-3 px-4 font-medium">Active Period</th>
              <th className="text-left py-3 px-4 font-medium">Status</th>
              <th className="text-left py-3 px-4 font-medium"># Rules</th>
              <th className="text-left py-3 px-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{plan.name}</td>
                <td className="py-3 px-4">{getBillingFrequencyLabel(plan.billing_frequency)}</td>
                <td className="py-3 px-4 text-sm">{formatDateRange(plan.active_from, plan.active_to)}</td>
                <td className="py-3 px-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    plan.status === 'ACTIVE' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {plan.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                    {getRuleCount(plan.id)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onView(plan)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(plan.id)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(plan.id)}
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

      {filteredPlans.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No tariff plans found matching your search.
        </div>
      )}
    </div>
  );
}