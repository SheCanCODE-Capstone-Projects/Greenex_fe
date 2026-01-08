"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend as ChartLegend,
  type ChartOptions,
} from "chart.js";
import {
  LayoutDashboard,
  Home,
  MessageSquare,
  Menu,
  Bell,
  Download,
  Eye,
  Check,
  X,
  Clock,
  User,
  Calendar,
  Building2,
} from "lucide-react";
import { contactService, Contact } from "@/lib/contact-service";
import { toast } from "react-toastify";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  ChartLegend
);

export default function SupperDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(false);

  // Fetch contacts when user review section is active
  useEffect(() => {
    if (activeSection === 'user-review') {
      const fetchContacts = async () => {
        try {
          setLoadingContacts(true);
          const data = await contactService.getAllContacts();
          setContacts(data);
        } catch (err: any) {
          console.error('Error fetching contacts:', err);
          toast.error(err.message || 'Failed to load contacts');
        } finally {
          setLoadingContacts(false);
        }
      };
      fetchContacts();
    }
  }, [activeSection]);

  const barData = {
    labels: ["Kicukiro", "Gasabo", "Nyarugenge", "Remera", "Kimisagara", "Gisozi"],
    datasets: [
      {
        label: "Complaints per District",
        data: [45, 32, 58, 28, 67, 41],
        backgroundColor: [
          "#2E7D32",
          "#00E676",
          "#2E7D32",
          "#00E676",
          "#2E7D32",
          "#00E676",
        ],
        borderRadius: 8,
      },
    ],
  };

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const donutData = {
    labels: ["Nyarugenge", "Gasabo", "Kicukiro"],
    datasets: [
      {
        data: [100000, 80000, 60000],
        backgroundColor: ["#2E7D32", "#1B5E20", "#4CAF50"],
        borderWidth: 0,
        cutout: "75%",
      },
    ],
  };

  const donutOptions: ChartOptions<"doughnut"> = {
    plugins: { legend: { display: false } },
    maintainAspectRatio: false,
  };

  function renderContent() {
    if (activeSection === 'user-review') {
      if (loadingContacts) {
        return (
          <div className="flex items-center justify-center h-64 mt-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading contact submissions...</p>
            </div>
          </div>
        );
      }

      return (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Contact Submissions</h2>

          <div className="grid gap-4">
            {contacts.length === 0 ? (
              <Card className="p-12 rounded-2xl shadow text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No contact submissions found</p>
              </Card>
            ) : (
              contacts.map((contact) => (
                <Card key={contact.id} className="p-6 rounded-2xl shadow hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{contact.fullName}</h3>
                        <p className="text-gray-500 text-sm">{contact.email}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${contact.processed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                      }`}>
                      {contact.processed ? 'Processed' : 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700">Service Interest:</span>
                      <span className="text-gray-600 capitalize">{contact.serviceInterest}</span>
                    </div>
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span className="text-gray-600">{contact.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700 text-sm leading-relaxed italic">
                      &quot;{contact.message}&quot;
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                      Reply
                    </button>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      );
    }

    // Companies section
    if (activeSection === 'companies') {
      return (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-6">Companies Registration</h2>
          <Card className="p-12 rounded-2xl shadow text-center">
            <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Companies management content will be displayed here</p>
            <p className="text-sm text-gray-500 mt-2">This section is under development</p>
          </Card>
        </div>
      );
    }

    // Overview section
    return (
      <div className="mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard title="Total Households" value="2,847" note="+12% this month" color="text-green-600" />
          <StatCard title="Registered Companies" value="156/160" note="98%" color="text-green-600" />
          <StatCard title="Active Routes" value="24" />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <Card className="p-4 rounded-2xl shadow h-[420px]">
            <h2 className="font-semibold mb-4">District Complaints Overview</h2>
            <div className="h-[330px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </Card>
          <Card className="p-4 rounded-2xl shadow h-[420px]">
            <h2 className="font-semibold mb-4">Monthly Revenue Distribution</h2>
            <div className="relative h-[260px] flex items-center justify-center">
              <Doughnut data={donutData} options={donutOptions} />
              <div className="absolute text-center">
                <p className="text-xl font-bold">85K</p>
                <p className="text-sm text-gray-500">RWF</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B5D2E] text-white flex flex-col py-6
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static overflow-y-auto`}
      >
        <div className="space-y-6 px-4">
          <div className="flex items-center gap-3 px-4 py-3 text-lg font-bold">
            <LayoutDashboard size={20} />
            Dashboard
          </div>

          <nav className="space-y-5 text-sm">
            <SidebarItem
              label="Overview"
              icon={<LayoutDashboard size={18} />}
              isActive={activeSection === 'overview'}
              onClick={() => setActiveSection('overview')}
            />
            <SidebarItem
              label="User Review"
              icon={<MessageSquare size={18} />}
              isActive={activeSection === 'user-review'}
              onClick={() => setActiveSection('user-review')}
            />
            <SidebarItem
              label="Companies"
              icon={<Home size={18} />}
              isActive={activeSection === 'companies'}
              onClick={() => setActiveSection('companies')}
            />
          </nav>
        </div>
      </aside>


      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}


      <main className="flex-1">

        <header className="bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-3">

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 rounded-md z-50"
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-lg md:text-xl font-bold">
                Green Ex Manager
              </h1>
              <p className="text-xs md:text-sm text-gray-500">
                supper admin Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={22} />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                12
              </span>
            </div>

            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              CM
            </div>
          </div>
        </header>


        <div className="p-4 md:p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-colors text-left ${isActive
        ? "bg-[#0F7A3B] text-white"
        : "hover:text-green-300 hover:bg-[#0F7A3B]/20"
        }`}
      onClick={onClick}
      type="button"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ReviewItem({ user, rating, comment, date }: { user: string; rating: number; comment: string; date: string }) {
  return (
    <div className="border-b pb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium">{user}</h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-1">{comment}</p>
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  );
}

function CompanyDetailCard({
  name,
  status,
  registrationDate,
  documents,
  routes,
  households,
  contact
}: {
  name: string;
  status: string;
  registrationDate: string;
  documents: {
    kigaliContract: { status: string; filename: string };
    remaDocument: { status: string; filename: string };
    rdbDocument: { status: string; filename: string };
    insurancePolicy: { status: string; filename: string };
    vehicleRegistration: { status: string; filename: string };
  };
  routes: number;
  households: number;
  contact: string;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'In Process': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentStatus = (docStatus: string) => {
    switch (docStatus) {
      case 'Verified': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Under Review': return 'text-blue-600 bg-blue-50';
      case 'Rejected': case 'Invalid': case 'Expired': return 'text-red-600 bg-red-50';
      case 'Missing': case 'Incomplete': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleViewDocument = (filename: string) => {
    if (filename) {
      // Simulate viewing document
      window.open(`/documents/${filename}`, '_blank');
    }
  };

  const handleDownloadDocument = (filename: string) => {
    if (filename) {
      // Simulate downloading document
      const link = document.createElement('a');
      link.href = `/documents/${filename}`;
      link.download = filename;
      link.click();
    }
  };

  const handleApproveCompany = () => {
    // Simulate company approval
    alert(`${name} has been approved!`);
  };

  const handleRejectCompany = () => {
    // Simulate company rejection
    alert(`${name} has been rejected!`);
  };

  return (
    <Card className="p-6 border-l-4 border-l-green-500">
      <CardContent className="p-0">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-gray-600">Registered: {registrationDate}</p>
            <p className="text-sm text-gray-600">Contact: {contact}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
              {status}
            </span>
            {status === 'In Process' && (
              <div className="flex gap-1">
                <button
                  onClick={handleApproveCompany}
                  className="p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                  title="Approve Company"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleRejectCompany}
                  className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                  title="Reject Company"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          <div>
            <h4 className="font-medium mb-3">Required Documents</h4>
            <div className="space-y-3">
              <DocumentRow
                label="Kigali Contract"
                document={documents.kigaliContract}
                getStatusColor={getDocumentStatus}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
              />
              <DocumentRow
                label="REMA Certificate"
                document={documents.remaDocument}
                getStatusColor={getDocumentStatus}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
              />
              <DocumentRow
                label="RDB License"
                document={documents.rdbDocument}
                getStatusColor={getDocumentStatus}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
              />
              <DocumentRow
                label="Insurance Policy"
                document={documents.insurancePolicy}
                getStatusColor={getDocumentStatus}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
              />
              <DocumentRow
                label="Vehicle Registration"
                document={documents.vehicleRegistration}
                getStatusColor={getDocumentStatus}
                onView={handleViewDocument}
                onDownload={handleDownloadDocument}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-3">Operations Summary</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Active Routes: <span className="font-medium text-gray-900">{routes}</span></p>
              <p>Households Served: <span className="font-medium text-gray-900">{households}</span></p>
              <p>Document Progress: <span className="font-medium text-gray-900">
                {Object.values(documents).filter(doc => doc.status === 'Verified').length}/5 Verified
              </span></p>
              <p>Registration Status: <span className={`font-medium ${status === 'Approved' ? 'text-green-600' :
                status === 'In Process' ? 'text-yellow-600' : 'text-red-600'
                }`}>{status}</span></p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DocumentRow({
  label,
  document,
  getStatusColor,
  onView,
  onDownload
}: {
  label: string;
  document: { status: string; filename: string };
  getStatusColor: (status: string) => string;
  onView: (filename: string) => void;
  onDownload: (filename: string) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">{label}:</span>
        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(document.status)}`}>
          {document.status}
        </span>
      </div>
      {document.filename && (
        <div className="flex gap-1">
          <button
            onClick={() => onView(document.filename)}
            className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded transition-colors"
            title="View Document"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onDownload(document.filename)}
            className="p-1 bg-green-100 hover:bg-green-200 text-green-700 rounded transition-colors"
            title="Download Document"
          >
            <Download size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, note, color }: { title: string; value: string; note?: string; color?: string }) {
  return (
    <Card className="rounded-2xl shadow">
      <CardContent className="p-4">
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
        {note && <p className={`text-sm ${color}`}>{note}</p>}
      </CardContent>
    </Card>
  );
}

