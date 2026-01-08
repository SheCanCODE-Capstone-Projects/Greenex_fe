import React from 'react';
import Sidebar from './sidebar';
import Header from './Header';
import HouseholdSection from './Household/HouseholdSection';
import ComplaintsSection from './complaints/UserComplaints';

export default function GreenEXDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <Header />
        
        <div className="p-6">
          <HouseholdSection />
          <ComplaintsSection />
        </div>
      </div>
    </div>
  );
}