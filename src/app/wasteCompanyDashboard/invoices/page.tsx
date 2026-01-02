"use client";

import { useState } from "react";
import { Download, Eye } from "lucide-react";

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-700";
      case "Pending": return "bg-yellow-100 text-yellow-700";
      case "Overdue": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-light-bg p-6">
      <div className="max-w-7xl mx-auto">
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
                        <button className="p-2 text-primary-green hover:bg-primary-green/10 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-primary-green hover:bg-primary-green/10 rounded">
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
      </div>
    </div>
  );
}
