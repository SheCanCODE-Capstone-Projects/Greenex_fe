'use client'
import { Household, Zone } from '@/data/households';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface HouseholdDetailsModalProps {
  household: Household | null;
  zones: Zone[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HouseholdDetailsModal({ household, zones, open, onOpenChange }: HouseholdDetailsModalProps) {
  if (!household) return null;

  const zone = zones.find(z => z.id === household.zone_id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Household Details</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Household Code</label>
              <p className="text-sm font-semibold">{household.household_code}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Head of Household</label>
              <p className="text-sm">{household.head_of_household}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Phone Number</label>
              <p className="text-sm">{household.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">House Type</label>
              <p className="text-sm">{household.house_type}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Zone</label>
              <p className="text-sm">{zone ? `${zone.sector} - ${zone.cell}` : 'Unknown Zone'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Number of People</label>
              <p className="text-sm">{household.number_of_people}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Address Description</label>
              <p className="text-sm">{household.address_description || 'No description provided'}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}