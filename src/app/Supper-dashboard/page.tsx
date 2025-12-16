"use client";

import React, { useState } from "react";
import { LayoutDashboard, Home, MessageSquare, Menu, Bell } from "lucide-react";
import OverviewPage from "./overview/page";
import CompaniesPage from "./companies/page";
import UserReviewPage from "./user-review/page";

export default function SupperDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage />;
      case "companies":
        return <CompaniesPage />;
      case "user-review":
        return <UserReviewPage />;
      default:
        return <OverviewPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
    
      <aside className="hidden md:flex w-64 bg-[#0B5D2E] text-white flex-col justify-between py-6">
        <div className="space-y-6 px-4">
          <nav className="space-y-5 text-sm">
            <SidebarItem 
              icon={<LayoutDashboard size={18} />} 
              label="Overview" 
              isActive={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <SidebarItem 
              icon={<MessageSquare size={18} />} 
              label="User Review" 
              isActive={activeTab === "user-review"}
              onClick={() => setActiveTab("user-review")}
            />
            <SidebarItem 
              icon={<Home size={18} />} 
              label="Companies" 
              isActive={activeTab === "companies"}
              onClick={() => setActiveTab("companies")}
            />
          </nav>
        </div>

        <div className="px-6">
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm">
            N
          </div>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-6">
        <header className="bg-white rounded-xl shadow px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Menu className="md:hidden" />
            <div>
              <h1 className="text-lg md:text-xl font-bold">Green Ex Manager</h1>
              <p className="text-xs md:text-sm text-gray-500">Waste Collection Company</p>
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
        <div className="mt-6">
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
  onClick 
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
