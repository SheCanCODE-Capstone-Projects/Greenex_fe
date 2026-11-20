import axiosInstance from './axios';

export type ComplaintType = 'MISSED_PICKUP' | 'DAMAGED_BIN' | 'LATE_PICKUP' | 'INCOMPLETE_COLLECTION' | 'OTHER';

export interface Complaint {
  id: string;
  type: string;
  description: string;
  createdAt: string;
  householdId: string;
  wasteCompanyId: string;
}

export interface CreateComplaintData {
  householdId: string;
  type: ComplaintType;
  description: string;
}

class ComplaintService {
  async getAll(): Promise<Complaint[]> {
    const response = await axiosInstance.get('/api/citizen/complaints');
    return Array.isArray(response.data) ? response.data : [];
  }

  async create(data: CreateComplaintData): Promise<Complaint> {
    const response = await axiosInstance.post('/api/citizen/complaints', data);
    return response.data;
  }
}

export default new ComplaintService();
