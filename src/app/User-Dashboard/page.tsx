"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, CreditCard, MapPin, CheckCircle, Clock, AlertCircle, TrendingUp, Trash2, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function UserDashboard() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user data from localStorage
    const householdData = localStorage.getItem('household_data');
    const userInfo = localStorage.getItem('user_info');
    
    if (householdData) {
      const household = JSON.parse(householdData);
      const user = userInfo ? JSON.parse(userInfo) : {};
      
      setUserData({
        name: user.fullName || household.fullName || 'User',
        address: household.address || 'Kigali, Rwanda',
        district: household.district || 'Gasabo',
        sector: household.sector || 'Remera',
        residents: household.numberOfResidents || 4,
        propertyType: household.propertyType || 'House',
        nextCollection: 'Monday, Feb 3, 2025',
        collectionTime: '8:00 AM - 10:00 AM',
        wasteCompany: 'EcoClean Rwanda',
        driverName: 'Jean Paul Mugabo',
        monthlyFee: 5000, // RWF
        lastPayment: 'Jan 15, 2025',
        paymentStatus: 'Paid',
        totalCollections: 24,
        missedCollections: 1,
        onTimeRate: 96,
        accountStatus: 'Active',
        memberSince: 'June 2024'
      });
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Next Collection',
      value: userData?.nextCollection?.split(',')[0] || 'Monday',
      subValue: userData?.collectionTime || '8:00 AM',
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: null
    },
    {
      label: 'Monthly Fee',
      value: `${userData?.monthlyFee?.toLocaleString() || '5,000'} RWF`,
      subValue: userData?.paymentStatus || 'Paid',
      icon: CreditCard,
      color: userData?.paymentStatus === 'Paid' ? 'text-green-600' : 'text-orange-600',
      bgColor: userData?.paymentStatus === 'Paid' ? 'bg-green-50' : 'bg-orange-50',
      trend: null
    },
    {
      label: 'Total Collections',
      value: userData?.totalCollections || '24',
      subValue: `${userData?.onTimeRate || 96}% on-time`,
      icon: Trash2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: '+2 this month'
    },
    {
      label: 'Account Status',
      value: userData?.accountStatus || 'Active',
      subValue: `Since ${userData?.memberSince || 'June 2024'}`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      trend: null
    }
  ];

  const recentActivity = [
    {
      title: 'Waste Collected Successfully',
      description: `Driver: ${userData?.driverName || 'Jean Paul'} • Route: ${userData?.sector || 'Remera'} Zone`,
      time: '2 days ago',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Payment Confirmed',
      description: `${userData?.monthlyFee?.toLocaleString() || '5,000'} RWF • Mobile Money`,
      time: '15 days ago',
      icon: CreditCard,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Collection Scheduled',
      description: `Next pickup: ${userData?.nextCollection || 'Monday, Feb 3'}`,
      time: '1 week ago',
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Reminder: Upcoming Collection',
      description: 'Please ensure bins are accessible',
      time: '2 weeks ago',
      icon: Bell,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const upcomingSchedule = [
    { date: 'Mon, Feb 3', time: '8:00 AM - 10:00 AM', status: 'scheduled' },
    { date: 'Mon, Feb 10', time: '8:00 AM - 10:00 AM', status: 'scheduled' },
    { date: 'Mon, Feb 17', time: '8:00 AM - 10:00 AM', status: 'scheduled' },
    { date: 'Mon, Feb 24', time: '8:00 AM - 10:00 AM', status: 'scheduled' }
  ];

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {userData?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p className="text-gray-600">
          {userData?.address || 'Kigali, Rwanda'} • {userData?.propertyType || 'House'} • {userData?.residents || 4} residents
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={stat.color} size={24} />
                  </div>
                  {stat.trend && (
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      <TrendingUp size={12} />
                      {stat.trend}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className={`text-2xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subValue}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Activity</h2>
              <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                      <Icon className={activity.color} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 mb-1">{activity.title}</p>
                      <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock size={12} />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Schedule</h2>
            <div className="space-y-4">
              {upcomingSchedule.map((schedule, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <Calendar className="text-green-600" size={20} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm">{schedule.date}</p>
                    <p className="text-xs text-gray-600">{schedule.time}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      Scheduled
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Info Card */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-green-50">
                <Trash2 className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Waste Company</p>
                <p className="font-bold text-gray-800">{userData?.wasteCompany || 'EcoClean Rwanda'}</p>
                <p className="text-xs text-gray-500 mt-1">Licensed & Certified</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50">
                <MapPin className="text-blue-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Service Zone</p>
                <p className="font-bold text-gray-800">{userData?.district || 'Gasabo'} - {userData?.sector || 'Remera'}</p>
                <p className="text-xs text-gray-500 mt-1">Weekly Collection</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-50">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Performance</p>
                <p className="font-bold text-gray-800">{userData?.onTimeRate || 96}% On-Time Rate</p>
                <p className="text-xs text-gray-500 mt-1">{userData?.missedCollections || 1} missed in 6 months</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow text-center">
          <CreditCard className="text-green-600 mx-auto mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-800">Make Payment</p>
        </button>
        <button className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow text-center">
          <AlertCircle className="text-orange-600 mx-auto mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-800">Report Issue</p>
        </button>
        <button className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow text-center">
          <Calendar className="text-blue-600 mx-auto mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-800">View Schedule</p>
        </button>
        <button className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow text-center">
          <Clock className="text-purple-600 mx-auto mb-2" size={24} />
          <p className="text-sm font-semibold text-gray-800">History</p>
        </button>
      </div>
    </div>
  );
}
