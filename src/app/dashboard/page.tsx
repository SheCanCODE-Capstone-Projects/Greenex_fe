"use client";

import React, { useState, useEffect } from "react";

interface Truck {
  id: string;
  name: string;
  status: 'Active' | 'Idle' | 'Maintenance';
  percent: number;
  route: string;
  driver: string;
}

interface Zone {
  id: string;
  name: string;
  households: number;
  status: 'Active' | 'Completed' | 'Pending';
}

interface PickupSession {
  id: string;
  zone: string;
  time: string;
  status: 'In Progress' | 'Completed' | 'Scheduled';
  collected: number;
  total: number;
}

interface Complaint {
  id: string;
  title: string;
  level: 'Urgent' | 'Medium' | 'Low';
  time: string;
  sector: string;
  resolved: boolean;
}

interface Stats {
  households: number;
  pickups: { completed: number; total: number };
  revenue: number;
  complaints: number;
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [stats, setStats] = useState<Stats>({
    households: 2847,
    pickups: { completed: 156, total: 160 },
    revenue: 85000,
    complaints: 12
  });
  
  const [zones, setZones] = useState<Zone[]>([
    { id: '1', name: 'Kicukiro Zone A', households: 245, status: 'Active' },
    { id: '2', name: 'Gasabo Zone B', households: 189, status: 'Completed' },
    { id: '3', name: 'Nyarugenge Zone C', households: 156, status: 'Pending' }
  ]);
  
  const [pickupSessions, setPickupSessions] = useState<PickupSession[]>([
    { id: '1', zone: 'Kicukiro Zone A', time: '08:30 AM', status: 'In Progress', collected: 82, total: 100 },
    { id: '2', zone: 'Gasabo Zone B', time: '10:15 AM', status: 'Completed', collected: 95, total: 95 },
    { id: '3', zone: 'Nyarugenge Zone C', time: '02:00 PM', status: 'Scheduled', collected: 0, total: 78 }
  ]);
  
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: '1', title: 'Missed pick up', level: 'Urgent', time: '2 hours ago', sector: 'Gasabo sector', resolved: false },
    { id: '2', title: 'Schedule change request', level: 'Medium', time: '5 hours ago', sector: 'Remera sector', resolved: false }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPickupSessions(prev => prev.map(session => ({
        ...session,
        collected: session.status === 'In Progress' ? Math.min(session.total, session.collected + Math.random() * 3) : session.collected
      })));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const validateZoneData = (zone: Zone): boolean => {
    return zone.name.length > 0 && zone.households > 0;
  };

  const getZoneStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-200';
      case 'Completed': return 'bg-blue-200';
      case 'Pending': return 'bg-yellow-200';
      default: return 'bg-gray-200';
    }
  };

  const resolveComplaint = async (id: string) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setComplaints(prev => prev.map(c => 
        c.id === id ? { ...c, resolved: true } : c
      ));
      setStats(prev => ({ ...prev, complaints: prev.complaints - 1 }));
    } catch (err) {
      setError('Failed to resolve complaint');
    } finally {
      setLoading(false);
    }
  };


  return (
    <main className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-green-900 text-white p-6 space-y-6 hidden md:block">
        <h2 className="text-2xl font-bold">Green Ex</h2>
        <ul className="space-y-3 text-sm">
          {['Dashboard', 'Routes', 'Households', 'Zones', 'Payments', 'Complaints'].map(item => (
            <SidebarItem 
              key={item}
              label={item} 
              active={activeTab === item}
              onClick={() => setActiveTab(item)}
            />
          ))}
        </ul>
      </aside>

      <section className="flex-1 p-6 space-y-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
            <button onClick={() => setError(null)} className="float-right font-bold">×</button>
          </div>
        )}

        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Green Ex Manager</h1>
            <p className="text-gray-600">Waste Collection Company - {activeTab}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="text-gray-600 text-xl"></button>
              {stats.complaints > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {stats.complaints}
                </span>
              )}
            </div>
            <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center font-semibold">
              CM
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title="Total Households" 
            value={stats.households.toLocaleString()} 
            subtext="+12% this month" 
            icon="" 
          />
          <StatCard 
            title="Today pickups" 
            value={`${stats.pickups.completed}/${stats.pickups.total}`} 
            percent={Math.round((stats.pickups.completed / stats.pickups.total) * 100)} 
            icon="" 
          />
          <StatCard 
            title="Monthly Revenue" 
            value={`${(stats.revenue / 1000).toFixed(0)}K RWF`} 
            icon="" 
          />
          <StatCard 
            title="Active complaints" 
            value={stats.complaints.toString()} 
            subtext={`${complaints.filter(c => c.level === 'Urgent').length} Urgent`} 
            icon="" 
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Pickup Sessions</h2>
            <div className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              {pickupSessions.map(session => (
                <PickupSessionCard 
                  key={session.id}
                  zone={session.zone}
                  time={session.time}
                  status={session.status}
                  collected={Math.round(session.collected)}
                  total={session.total}
                />
              ))}
            </div>
            <div className="space-y-6">
          
              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="text-lg font-semibold mb-6">District Complaints Overview</h3>
                <div className="relative h-56">
                  
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="border-t border-gray-100 w-full"></div>
                    ))}
                  </div>
                  
                 
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-10">
                    <span>70</span>
                    <span>56</span>
                    <span>42</span>
                    <span>28</span>
                    <span>14</span>
                    <span>0</span>
                  </div>
                  
                 
                  <div className="relative h-full flex items-end justify-between px-4 pt-4">
                    {[
                      { district: 'Kicukiro', value: 45, color: 'from-green-500 to-green-400' },
                      { district: 'Gasabo', value: 32, color: 'from-green-600 to-green-500' },
                      { district: 'Nyarugenge', value: 58, color: 'from-green-400 to-green-300' },
                      { district: 'Remera', value: 28, color: 'from-green-700 to-green-600' },
                      { district: 'Kimisagara', value: 67, color: 'from-green-500 to-green-400' },
                      { district: 'Gisozi', value: 41, color: 'from-green-600 to-green-500' }
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1 mx-1">
                        <div className="relative w-full max-w-12 group">
                          <div 
                            className={`bg-gradient-to-t ${item.color} rounded-t-md transition-all duration-300 hover:scale-105 cursor-pointer shadow-sm`}
                            style={{ height: `${(item.value / 70) * 180}px` }}
                          >
                         
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700">
                              {item.value}
                            </div>
                            
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.value} complaints
                            </div>
                          </div>
                        </div>
                        <span className="text-xs mt-3 text-gray-700 font-medium text-center leading-tight">{item.district}</span>
                      </div>
                    ))}
                  </div>
                </div>
             
                <div className="mt-4 flex justify-center">
                  <div className="flex items-center space-x-2 text-xs text-gray-600">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-600 to-green-400 rounded"></div>
                    <span>Complaints per District</span>
                  </div>
                </div>
              </div>


              <div className="bg-white p-6 rounded-xl shadow border">
                <h3 className="text-lg font-semibold mb-4">Monthly Revenue Distribution</h3>
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#f3f4f6" strokeWidth="8"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="8" 
                        strokeDasharray="131.9 219.9" strokeDashoffset="0"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="8" 
                        strokeDasharray="65.9 219.9" strokeDashoffset="-131.9"/>
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="8" 
                        strokeDasharray="22.1 219.9" strokeDashoffset="-197.8"/>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-bold">85K</div>
                        <div className="text-xs text-gray-600">RWF</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Collections</span>
                    </div>
                    <span className="font-medium">60%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Subscriptions</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                      <span>Other</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Recent Complaints</h2>
            <button className="text-green-600 font-medium">View All</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.filter(c => !c.resolved).map(complaint => (
              <ComplaintCard
                key={complaint.id}
                title={complaint.title}
                level={complaint.level}
                time={complaint.time}
                sector={complaint.sector}
                button={loading ? 'Processing...' : 'Resolve'}
                onResolve={() => resolveComplaint(complaint.id)}
                disabled={loading}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function SidebarItem({ label, active, onClick }: { 
  label: string; 
  active?: boolean; 
  onClick: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={`px-3 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors ${
        active ? "bg-green-700" : "hover:bg-green-800"
      }`}
    >
      <span></span>
      {label}
    </li>
  );
}

function StatCard({ title, value, subtext, percent, icon }: {
  title: string;
  value: string;
  subtext?: string;
  percent?: number;
  icon: string;
}) {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border space-y-1">
      <div className="text-3xl">{icon}</div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
      {percent && <p className="text-green-600 font-semibold">{percent}%</p>}
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}

function PickupSessionCard({ zone, time, status, collected, total }: {
  zone: string;
  time: string;
  status: string;
  collected: number;
  total: number;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-green-200 border-green-500';
      case 'Completed': return 'bg-blue-200 border-blue-500';
      case 'Scheduled': return 'bg-yellow-200 border-yellow-500';
      default: return 'bg-gray-200 border-gray-500';
    }
  };

  const percentage = total > 0 ? Math.round((collected / total) * 100) : 0;

  return (
    <div className={`p-4 rounded-xl shadow bg-white border-l-8 ${getStatusColor(status)}`}>
      <div className="flex justify-between">
        <h3 className="font-bold">{zone}</h3>
        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
          {status}
        </span>
      </div>
      <p className="text-sm text-gray-600">Scheduled: {time} • Progress: {collected}/{total}</p>
      <div className="mt-2 flex items-center space-x-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <span className="text-sm font-semibold text-blue-600">{percentage}%</span>
      </div>
    </div>
  );
}

function ComplaintCard({ title, level, time, sector, button, onResolve, disabled }: {
  title: string;
  level: string;
  time: string;
  sector: string;
  button: string;
  onResolve: () => void;
  disabled?: boolean;
}) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Urgent': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-5 rounded-xl bg-white shadow border space-y-2">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-gray-900">{title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(level)}`}>
          {level}
        </span>
      </div>
      <p className="text-sm text-gray-500">Household • {sector}</p>
      <p className="text-xs text-gray-400">Reported {time}</p>
      <button 
        onClick={onResolve}
        disabled={disabled}
        className={`mt-2 px-4 py-2 rounded text-white text-sm transition-colors ${
          disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'
        }`}
      >
        {button}
      </button>
    </div>
  );
}