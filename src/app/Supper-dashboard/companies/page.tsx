"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, XCircle, Building2, FileText, Eye, Download } from "lucide-react";

interface Company {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  sectors: string[];
  registrationDate: string;
  status: "completed" | "progress" | "rejected";
  requirements: {
    kigaliContract: boolean;
    remaCertificate: boolean;
    rdbCertificate: boolean;
  };
  documents: {
    kigaliContract?: string;
    remaCertificate?: string;
    rdbCertificate?: string;
  };
}

const mockCompanies: Company[] = [
  {
    id: 1,
    name: "EcoWaste Solutions",
    email: "contact@ecowaste.rw",
    phoneNumber: "+250788123456",
    sectors: ["Kicukiro", "Gasabo"],
    registrationDate: "2024-01-15",
    status: "completed",
    requirements: {
      kigaliContract: true,
      remaCertificate: true,
      rdbCertificate: true,
    },
    documents: {
      kigaliContract: "kigali_contract_ecowaste.pdf",
      remaCertificate: "rema_license_ecowaste.pdf",
      rdbCertificate: "rdb_certificate_ecowaste.pdf",
    },
  },
  {
    id: 2,
    name: "Green Clean Ltd",
    email: "info@greenclean.rw",
    phoneNumber: "+250788654321",
    sectors: ["Nyarugenge"],
    registrationDate: "2024-01-20",
    status: "progress",
    requirements: {
      kigaliContract: true,
      remaCertificate: true,
      rdbCertificate: false,
    },
    documents: {
      kigaliContract: "kigali_contract_greenclean.pdf",
      remaCertificate: "rema_license_greenclean.pdf",
    },
  },
  {
    id: 3,
    name: "Waste Masters",
    email: "admin@wastemasters.rw",
    phoneNumber: "+250788987654",
    sectors: ["Kicukiro", "Nyarugenge", "Gasabo"],
    registrationDate: "2024-01-10",
    status: "rejected",
    requirements: {
      kigaliContract: false,
      remaCertificate: false,
      rdbCertificate: true,
    },
    documents: {
      rdbCertificate: "rdb_certificate_wastemasters.pdf",
    },
  },
];

export default function CompaniesPage() {
  const [filter, setFilter] = useState<"all" | "completed" | "progress" | "rejected">("all");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredCompanies = filter === "all" 
    ? mockCompanies 
    : mockCompanies.filter(company => company.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      progress: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };
    return variants[status as keyof typeof variants] || "";
  };

  const getCompletionPercentage = (requirements: Company["requirements"]) => {
    const total = Object.keys(requirements).length;
    const completed = Object.values(requirements).filter(Boolean).length;
    return Math.round((completed / total) * 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Companies Registration</h1>
        <div className="flex gap-2">
          {["all", "completed", "progress", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize ${
                filter === status
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Total Companies" 
          value={mockCompanies.length.toString()} 
          icon={<Building2 className="w-6 h-6 text-blue-600" />}
        />
        <StatCard 
          title="Completed" 
          value={mockCompanies.filter(c => c.status === "completed").length.toString()} 
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
        />
        <StatCard 
          title="In Progress" 
          value={mockCompanies.filter(c => c.status === "progress").length.toString()} 
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
        />
      </div>

      <div className="grid gap-4">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="p-6 rounded-2xl shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(company.status)}
                <div>
                  <h3 className="font-semibold text-lg">{company.name}</h3>
                  <p className="text-gray-500 text-sm">{company.email}</p>
                  <p className="text-gray-500 text-sm">{company.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedCompany(company)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200"
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  View Details
                </button>
                <Badge className={getStatusBadge(company.status)}>
                  {company.status}
                </Badge>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Sectors:</strong> {company.sectors.join(", ")}
              </p>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Requirements Completion</span>
                <span className="text-sm text-gray-500">
                  {getCompletionPercentage(company.requirements)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${getCompletionPercentage(company.requirements)}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 text-sm">
              {Object.entries(company.requirements).map(([requirement, completed]) => {
                const getDocumentLabel = (req: string) => {
                  switch (req) {
                    case 'kigaliContract':
                      return 'Umujyi wa Kigali Contract';
                    case 'remaCertificate':
                      return 'REMA Environmental License';
                    case 'rdbCertificate':
                      return 'RDB Certificate of Incorporation';
                    default:
                      return req;
                  }
                };
                
                return (
                  <div key={requirement} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {completed ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                      <span className={completed ? "text-green-700" : "text-red-700"}>
                        {getDocumentLabel(requirement)}
                      </span>
                    </div>
                    {completed && company.documents[requirement as keyof typeof company.documents] && (
                      <button className="text-blue-600 hover:text-blue-800 text-xs">
                        <FileText className="w-3 h-3 inline mr-1" />
                        View
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t text-sm text-gray-500">
              Registered: {new Date(company.registrationDate).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>

      {/* Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                  <Badge className={getStatusBadge(selectedCompany.status)}>
                    {selectedCompany.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <p>{selectedCompany.email}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Phone:</span>
                      <p>{selectedCompany.phoneNumber}</p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Service Sectors:</span>
                      <p>{selectedCompany.sectors.join(", ")}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Registration Date:</span>
                      <p>{new Date(selectedCompany.registrationDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Submitted Documents</h3>
                  <div className="space-y-3">
                    {Object.entries(selectedCompany.requirements).map(([requirement, completed]) => {
                      const getDocumentLabel = (req: string) => {
                        switch (req) {
                          case 'kigaliContract':
                            return 'Umujyi wa Kigali Contract';
                          case 'remaCertificate':
                            return 'REMA Environmental License';
                          case 'rdbCertificate':
                            return 'RDB Certificate of Incorporation';
                          default:
                            return req;
                        }
                      };
                      
                      const documentFile = selectedCompany.documents[requirement as keyof typeof selectedCompany.documents];
                      
                      return (
                        <div key={requirement} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                            <div>
                              <p className="font-medium">{getDocumentLabel(requirement)}</p>
                              {documentFile && (
                                <p className="text-sm text-gray-500">{documentFile}</p>
                              )}
                            </div>
                          </div>
                          {completed && documentFile && (
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                                <Eye className="w-4 h-4 inline mr-1" />
                                View
                              </button>
                              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm hover:bg-gray-200">
                                <Download className="w-4 h-4 inline mr-1" />
                                Download
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h2 className="text-2xl font-bold">{value}</h2>
          </div>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
}