"use client";

import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function GreenExDashboard() {
  const donutData = {
    labels: ["Organic", "Recyclable", "General Waste"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: ["#68D391", "#38A169", "#22543D"],
        borderWidth: 0,
      },
    ],
  };
  const donutOptions = {
    plugins: {
      legend: { display: false },
    },
    cutout: "70%",
  };
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Compliance %",
        data: [95, 92, 90, 93, 96, 94],
        backgroundColor: "#38A169",
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, max: 100, ticks: { color: "#4A5568" } },
      x: { ticks: { color: "#4A5568" } },
    },
  };

  return (
    <div className="w-full min-h-screen bg-light-bg dark:bg-dark-bg">
    
      <header className="w-full bg-primary-green text-white p-4 flex gap-15 shadow-md">
        <h1 className="text-2xl font-bold">GreenEx</h1>
        <span className="text-lg font-semibold">Super Admin Portal</span>
      </header>

      <div className="flex w-full">
        
        <aside className="w-64 bg-primary-green text-white p-6 space-y-6 min-h-screen border-r border-gray-700">
          <nav className="space-y-4 mt-10">
            <a className="block bg-secondary-green py-2 px-4 rounded-lg font-semibold text-white">
              Overview
            </a>
            <a className="block hover:text-secondary-green">User review</a>
            <a className="block hover:text-secondary-green">Companies</a>
        
          </nav>
        </aside>
        <main className="ml-64 w-full p-8 space-y-8">
        
          <section className="grid grid-cols-4 gap-6">
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <p className="text-gray-500">Total Households</p>
              <h2 className="text-3xl font-bold mt-2">30,500</h2>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <p className="text-gray-500">Registered Companies</p>
              <h2 className="text-3xl font-bold mt-2">45</h2>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <p className="text-gray-500">Active Routes</p>
              <h2 className="text-3xl font-bold mt-2">310/325</h2>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <p className="text-gray-500">Monthly Revenue</p>
              <h2 className="text-3xl font-bold mt-2">120M RWF</h2>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md flex flex-col items-center">
              <h3 className="font-semibold mb-4">Householder (Last 6 Months)</h3>
              <div className="w-56 h-56">
                <Doughnut data={donutData} options={donutOptions} />
              </div>
              <div className="mt-4 flex flex-col space-y-1 w-full max-w-xs">
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span> Organic
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-600 rounded-full"></span> Recyclable
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-800 rounded-full"></span> General Waste
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-4">Registed Company</h3>
              <div className="w-full h-48">
                <Bar data={barData} options={barOptions} />
              </div>
            </div>
          </section>
          <section className="grid grid-cols-2 gap-6">
            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-4">Real-Time Activity</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>New Company Registered: EcoClean Waste ltd</li>
                <li>Route Optimization Scheduled Database Bech</li>
                <li>High-Value Payment: Kigali Corp</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-card p-6 rounded-2xl shadow-md">
              <h3 className="font-semibold mb-4">Monitoring Summary</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-xl text-center">
                  <p>Non-Subscribed Household (2,500)</p>
                </div>
                <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-xl text-center">
                  <p>Unsolved Complaints (15/120)</p>
                  <div className="w-full h-2 bg-gray-300 rounded-full mt-2">
                    <div className="h-2 bg-primary-green rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
