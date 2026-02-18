import axiosInstance from './axios';

export interface Household {
  id: number;
  householdName: string;
  address: string;
  phoneNumber: string;
  email?: string;
  zoneId: number;
  zoneName?: string;
  numberOfMembers: number;
  wasteType: string[];
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface CreateHouseholdData {
  householdName: string;
  address: string;
  phoneNumber: string;
  email?: string;
  zoneId: number;
  numberOfMembers: number;
  wasteType: string[];
}

class HouseholdService {
  async getAll(): Promise<Household[]> {
    const response = await axiosInstance.get('/api/waste-company/households');
    return response.data;
  }

  async getById(id: number): Promise<Household> {
    const response = await axiosInstance.get(`/api/waste-company/households/${id}`);
    return response.data;
  }

  async create(data: CreateHouseholdData): Promise<Household> {
    const response = await axiosInstance.post('/api/waste-company/households', data);
    return response.data;
  }

  async update(id: number, data: Partial<CreateHouseholdData>): Promise<Household> {
    const response = await axiosInstance.put(`/api/waste-company/households/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/waste-company/households/${id}`);
  }
}

export default new HouseholdService();
