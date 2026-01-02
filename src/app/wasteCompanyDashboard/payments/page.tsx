'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Payment, dummyPayments } from '@/data/payments';
import { Household, dummyHouseholds } from '@/data/households';
import { PaymentTable } from '@/components/payments/PaymentTable';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'react-toastify';

export default function PaymentsPage() {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [households] = useState<Household[]>(dummyHouseholds);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const savedPayments = localStorage.getItem('payments');
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments));
    } else {
      setPayments(dummyPayments);
      localStorage.setItem('payments', JSON.stringify(dummyPayments));
    }
  }, []);

  const handleView = (payment: Payment) => {
    setSelectedPayment(payment);
    setShowDetails(true);
  };



  const handleMarkPaid = (id: string) => {
    const updatedPayments = payments.map(payment => 
      payment.id === id 
        ? { 
            ...payment, 
            status: 'paid' as const,
            paid_at: new Date().toISOString(),
            transaction_ref: `TXN${Date.now()}`
          }
        : payment
    );
    setPayments(updatedPayments);
    localStorage.setItem('payments', JSON.stringify(updatedPayments));
    toast.success('Payment marked as paid successfully!');
  };

  const getHouseholdCode = (householdId: string) => {
    const household = households.find(h => h.id === householdId);
    return household?.code || 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Payment Management</h1>
          <Button onClick={() => router.push('/wasteCompanyDashboard/payments/create')}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Payment
          </Button>
        </div>

        <PaymentTable
          payments={payments}
          households={households}
          onView={handleView}
          onMarkPaid={handleMarkPaid}
        />

        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Payment Details</DialogTitle>
            </DialogHeader>
            {selectedPayment && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Household</label>
                  <p className="text-sm">{getHouseholdCode(selectedPayment.household_id)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Period</label>
                  <p className="text-sm">{selectedPayment.period_month}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Amount</label>
                  <p className="text-sm">{selectedPayment.amount.toLocaleString()} RWF</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Status</label>
                  <p className="text-sm capitalize">{selectedPayment.status}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Transaction Reference</label>
                  <p className="text-sm">{selectedPayment.transaction_ref || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Channel</label>
                  <p className="text-sm capitalize">{selectedPayment.channel || '-'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Paid At</label>
                  <p className="text-sm">
                    {selectedPayment.paid_at ? new Date(selectedPayment.paid_at).toLocaleString() : '-'}
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setShowDetails(false)}>Close</Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
    </div>
  );
}