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
    // Handle paginated response - extract from content array
    if (response.data.content && Array.isArray(response.data.content)) {
      const companies = response.data.content;
      return {
        totalCompanies: response.data.totalElements || companies.length,
        approvedCompanies: companies.filter((c: any) => c.registrationStatus === 'APPROVED').length,
        pendingCompanies: companies.filter((c: any) => c.registrationStatus === 'PENDING').length,
        rejectedCompanies: companies.filter((c: any) => c.registrationStatus === 'REJECTED').length,
        totalUsers: companies.length // Adjust based on your actual user count logic
      };
    }
    return response.data;
  }

  async getUserStats(): Promise<any> {
    const response = await axiosInstance.get('/api/user/dashboard/stats');
    return response.data;
  }
}

export default new DashboardService();
