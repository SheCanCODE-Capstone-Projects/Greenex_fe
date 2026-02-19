/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export interface DashboardStats {
  totalHouseholds: number;
  activeHouseholds: number;
  totalRevenue: number;
  pendingPayments: number;
  completedCollections: number;
  pendingComplaints: number;
}

export interface AdminDashboardStats {
  totalCompanies: number;
  approvedCompanies: number;
  pendingCompanies: number;
  rejectedCompanies: number;
  totalUsers: number;
}

class DashboardService {
  async getWasteCompanyStats(): Promise<DashboardStats> {
    const response = await axiosInstance.get('/api/waste-company/dashboard/stats');
    return response.data;
  }

  async getAdminStats(): Promise<AdminDashboardStats> {
    const response = await axiosInstance.get('/api/admin/dashboard/stats');
    return response.data;
  }

  async getUserStats(): Promise<any> {
    const response = await axiosInstance.get('/api/user/dashboard/stats');
    return response.data;
  }
}

export default new DashboardService();
