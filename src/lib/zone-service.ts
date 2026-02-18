import axiosInstance from './axios';

export interface Zone {
  id: number;
  zoneName: string;
  district: string;
  sector: string;
  cell?: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface CreateZoneData {
  zoneName: string;
  district: string;
  sector: string;
  cell?: string;
  description?: string;
}

class ZoneService {
  async getAll(): Promise<Zone[]> {
    const response = await axiosInstance.get('/api/waste-company/zones');
    return response.data;
  }

  async getById(id: number): Promise<Zone> {
    const response = await axiosInstance.get(`/api/waste-company/zones/${id}`);
    return response.data;
  }

  async create(data: CreateZoneData): Promise<Zone> {
    const response = await axiosInstance.post('/api/waste-company/zones', data);
    return response.data;
  }

  async update(id: number, data: Partial<CreateZoneData>): Promise<Zone> {
    const response = await axiosInstance.put(`/api/waste-company/zones/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/waste-company/zones/${id}`);
  }
}

export default new ZoneService();
