import axiosInstance from './axios';

export interface Complaint {
  id: number;
  householdId: number;
  householdName?: string;
  subject: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  createdAt: string;
  resolvedAt?: string;
}

export interface CreateComplaintResponse {
  message: string;
  complaint: Complaint;
}

class ComplaintService {
  async getAll(): Promise<Complaint[]> {
    const response = await axiosInstance.get('/api/waste-company/complaints');
    return response.data;
  }

  async getById(id: number): Promise<Complaint> {
    const response = await axiosInstance.get(`/api/waste-company/complaints/${id}`);
    return response.data;
  }

  async updateStatus(id: number, status: 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'): Promise<Complaint> {
    const response = await axiosInstance.put(`/api/waste-company/complaints/${id}/status`, { status });
    return response.data;
  }
}

export default new ComplaintService();
