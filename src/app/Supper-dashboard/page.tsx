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
} from "lucide-react";

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
            <SidebarItem label="Overview" icon={<LayoutDashboard size={18} />} />
            <SidebarItem label="User Review" icon={<MessageSquare size={18} />} />
            <SidebarItem label="Companies" icon={<Home size={18} />} />
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
                Waste Collection Company
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

      
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <StatCard
            title="Total Households"
            value="2,847"
            note="+12% this month"
            color="text-green-600"
          />
          <StatCard
            title="Registered Companies"
            value="156/160"
            note="98%"
            color="text-green-600"
          />
          <StatCard title="Active Routes" value="24" />
        </div>

      
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
          <Card className="p-4 rounded-2xl shadow h-[420px]">
            <h2 className="font-semibold mb-4">
              District Complaints Overview
            </h2>
            <div className="h-[330px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </Card>

          <Card className="p-4 rounded-2xl shadow h-[420px]">
            <h2 className="font-semibold mb-4">
              Monthly Revenue Distribution
            </h2>
            <div className="relative h-[260px] flex items-center justify-center">
              <Doughnut data={donutData} options={donutOptions} />
              <div className="absolute text-center">
                <p className="text-xl font-bold">85K</p>
                <p className="text-sm text-gray-500">RWF</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 hover:text-green-300 cursor-pointer">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function StatCard({
  title,
  value,
  note,
  color,
}: {
  title: string;
  value: string;
  note?: string;
  color?: string;
}) {
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

