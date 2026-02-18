import axiosInstance from './axios';

export interface UserProfile {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address?: string;
  householdId?: number;
}

export interface Schedule {
  id: number;
  date: string;
  timeSlot: string;
  routeId: number;
  routeName?: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
}

export interface UserComplaint {
  id: number;
  subject: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
}

export interface CreateComplaintData {
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface UserPayment {
  id: number;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference?: string;
}

class UserDashboardService {
  async getProfile(): Promise<UserProfile> {
    const response = await axiosInstance.get('/api/user/profile');
    return response.data;
  }

  async updateProfile(data: Partial<UserProfile>): Promise<UserProfile> {
    const response = await axiosInstance.put('/api/user/profile', data);
    return response.data;
  }

  async getSchedules(): Promise<Schedule[]> {
    const response = await axiosInstance.get('/api/user/schedules');
    return response.data;
  }

  async getComplaints(): Promise<UserComplaint[]> {
    const response = await axiosInstance.get('/api/user/complaints');
    return response.data;
  }

  async createComplaint(data: CreateComplaintData): Promise<UserComplaint> {
    const response = await axiosInstance.post('/api/user/complaints', data);
    return response.data;
  }

  async getPayments(): Promise<UserPayment[]> {
    const response = await axiosInstance.get('/api/user/payments');
    return response.data;
  }

  async getInvoices(): Promise<any[]> {
    const response = await axiosInstance.get('/api/user/invoices');
    return response.data;
  }
}

export default new UserDashboardService();
