"use client";

import { useState } from "react";
import { Download, Eye, FileText } from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Overdue";
  description: string;
}

export default function InvoicesPage() {
  const [invoices] = useState<Invoice[]>([
    { id: "INV-001", date: "2024-01-15", amount: 99, status: "Paid", description: "Premium Plan - January 2024" },
    { id: "INV-002", date: "2023-12-15", amount: 99, status: "Paid", description: "Premium Plan - December 2023" },
    { id: "INV-003", date: "2023-11-15", amount: 99, status: "Paid", description: "Premium Plan - November 2023" },
    { id: "INV-004", date: "2023-10-15", amount: 99, status: "Paid", description: "Premium Plan - October 2023" },
  ]);

  const [viewingInvoice, setViewingInvoice] = useState<Invoice | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setViewingInvoice(invoice);
  };

  const handleDownloadInvoice = (invoice: Invoice) => {
    const invoiceContent = `
INVOICE

Invoice ID: ${invoice.id}
Date: ${invoice.date}
Description: ${invoice.description}
Amount: $${invoice.amount}
Status: ${invoice.status}

Thank you for your business!
EcoCycle Solutions
    `;
    
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-dark-bg mb-6">Invoices</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-dark-bg">Invoice ID</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-bg">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-bg">Description</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-bg">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-bg">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-bg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-dark-bg">{invoice.id}</td>
                    <td className="py-3 px-4 text-gray-700">{invoice.date}</td>
                    <td className="py-3 px-4 text-gray-700">{invoice.description}</td>
                    <td className="py-3 px-4 font-semibold text-dark-bg">${invoice.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleViewInvoice(invoice)}
                          className="p-2 text-primary-green hover:bg-primary-green/10 rounded"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDownloadInvoice(invoice)}
                          className="p-2 text-primary-green hover:bg-primary-green/10 rounded"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      {viewingInvoice && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setViewingInvoice(null)}>
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8 text-primary-green" />
                  <h3 className="text-2xl font-bold text-dark-bg">Invoice Details</h3>
                </div>
                <button 
                  onClick={() => setViewingInvoice(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 border-t border-b border-gray-200 py-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Invoice ID:</span>
                  <span className="font-semibold text-dark-bg">{viewingInvoice.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold text-dark-bg">{viewingInvoice.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-semibold text-dark-bg">{viewingInvoice.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-dark-bg text-xl">${viewingInvoice.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(viewingInvoice.status)}`}>
                    {viewingInvoice.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => handleDownloadInvoice(viewingInvoice)}
                  className="flex-1 bg-primary-green text-white px-4 py-3 rounded-lg hover:bg-secondary-green flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </button>
                <button 
                  onClick={() => setViewingInvoice(null)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
