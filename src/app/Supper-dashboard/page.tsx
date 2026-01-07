"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { NotificationDropdown } from "@/components/ui/notification";
import { useCompanyNotifications } from "@/lib/useCompanyNotifications";

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
  const { notifications, dismissNotification } = useCompanyNotifications();

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
    switch (activeSection) {
      case 'overview':
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
      case 'user-review':
        return (
          <div className="mt-6">
            <Card className="p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">User Reviews & Feedback</h2>
              <div className="space-y-4">
                <ReviewItem user="John Doe" rating={5} comment="Excellent waste collection service!" date="2024-01-15" />
                <ReviewItem user="Jane Smith" rating={4} comment="Good service, but could be more frequent." date="2024-01-14" />
                <ReviewItem user="Mike Johnson" rating={5} comment="Very reliable and professional team." date="2024-01-13" />
              </div>
            </Card>
          </div>
        );
      case 'companies':
        return (
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
              <StatCard title="Total Companies" value="23" color="text-blue-600" />
              <StatCard title="Approved" value="15" note="65%" color="text-green-600" />
              <StatCard title="In Process" value="5" note="22%" color="text-yellow-600" />
              <StatCard title="Rejected" value="3" note="13%" color="text-red-600" />
            </div>
            
            <Card className="p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-6">Company Registration Management</h2>
              <div className="space-y-6">
                <CompanyDetailCard 
                  name="Green Waste Ltd" 
                  status="Approved" 
                  registrationDate="2024-01-10"
                  documents={{
                    kigaliContract: { status: "Verified", filename: "kigali_contract_greenwaste.pdf" },
                    remaDocument: { status: "Verified", filename: "rema_certificate_greenwaste.pdf" },
                    rdbDocument: { status: "Verified", filename: "rdb_license_greenwaste.pdf" },
                    insurancePolicy: { status: "Verified", filename: "insurance_greenwaste.pdf" },
                    vehicleRegistration: { status: "Verified", filename: "vehicle_reg_greenwaste.pdf" }
                  }}
                  routes={8} 
                  households={450}
                  contact="info@greenwaste.rw"
                />
                <CompanyDetailCard 
                  name="Eco Clean Services" 
                  status="Approved" 
                  registrationDate="2024-01-08"
                  documents={{
                    kigaliContract: { status: "Verified", filename: "kigali_contract_ecoclean.pdf" },
                    remaDocument: { status: "Verified", filename: "rema_certificate_ecoclean.pdf" },
                    rdbDocument: { status: "Verified", filename: "rdb_license_ecoclean.pdf" },
                    insurancePolicy: { status: "Verified", filename: "insurance_ecoclean.pdf" },
                    vehicleRegistration: { status: "Verified", filename: "vehicle_reg_ecoclean.pdf" }
                  }}
                  routes={6} 
                  households={320}
                  contact="contact@ecoclean.rw"
                />
                <CompanyDetailCard 
                  name="City Waste Management" 
                  status="In Process" 
                  registrationDate="2024-01-12"
                  documents={{
                    kigaliContract: { status: "Verified", filename: "kigali_contract_citywaste.pdf" },
                    remaDocument: { status: "Under Review", filename: "rema_certificate_citywaste.pdf" },
                    rdbDocument: { status: "Pending", filename: "rdb_license_citywaste.pdf" },
                    insurancePolicy: { status: "Verified", filename: "insurance_citywaste.pdf" },
                    vehicleRegistration: { status: "Under Review", filename: "vehicle_reg_citywaste.pdf" }
                  }}
                  routes={0} 
                  households={0}
                  contact="admin@citywaste.rw"
                />
                <CompanyDetailCard 
                  name="Quick Clean Co" 
                  status="Rejected" 
                  registrationDate="2024-01-05"
                  documents={{
                    kigaliContract: { status: "Rejected", filename: "kigali_contract_quickclean.pdf" },
                    remaDocument: { status: "Missing", filename: "" },
                    rdbDocument: { status: "Expired", filename: "rdb_license_quickclean_old.pdf" },
                    insurancePolicy: { status: "Invalid", filename: "insurance_quickclean.pdf" },
                    vehicleRegistration: { status: "Incomplete", filename: "" }
                  }}
                  routes={0} 
                  households={0}
                  contact="info@quickclean.rw"
                />
              </div>
            </Card>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0B5D2E] text-white flex flex-col justify-between py-6
        transform transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="space-y-6 px-4">
          <div className="flex items-center gap-3 bg-[#0F7A3B] px-4 py-3 rounded-xl text-sm font-medium">
            <LayoutDashboard size={18} />
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

    
      <main className="flex-1 p-4 md:p-6">
      
        <header className="bg-white rounded-xl shadow px-4 md:px-6 py-4 flex justify-between items-center relative z-20">
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
            <NotificationDropdown 
              notifications={notifications}
              onDismiss={dismissNotification}
            />

            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-semibold">
              CM
            </div>
          </div>
        </header>

      
        {renderContent()}
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
      className={`w-full flex items-center gap-3 cursor-pointer px-4 py-3 rounded-xl transition-colors text-left ${
        isActive 
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
              <p>Registration Status: <span className={`font-medium ${
                status === 'Approved' ? 'text-green-600' : 
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

