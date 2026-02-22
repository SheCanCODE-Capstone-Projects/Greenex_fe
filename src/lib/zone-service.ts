import axiosInstance from './axios';

export interface Zone {
  id: string;
  code: string;
  sector: string;
  cell: string;
  village: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface CreateZoneData {
  sector: string;
  cell: string;
  village: string;
  code: string;
  description: string;
}

class ZoneService {
  async getAll(): Promise<Zone[]> {
    const response = await axiosInstance.get('/api/manager/zones');
    console.log('GET /api/manager/zones response:', response.data);
    // Handle both plain array and paginated { content: [] } responses
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return [];
  }

  async getById(id: string): Promise<Zone> {
    const response = await axiosInstance.get(`/api/manager/zones/${id}`);
    console.log(`GET /api/manager/zones/${id} response:`, response.data);
    return response.data;
  }

  async create(data: CreateZoneData): Promise<Zone> {
    const response = await axiosInstance.post('/api/manager/zones', data);
    return response.data;
  }

  async update(id: string, data: Partial<CreateZoneData>): Promise<Zone> {
    console.log(`PUT /api/manager/zones/${id} payload:`, JSON.stringify(data, null, 2));
    const response = await axiosInstance.put(`/api/manager/zones/${id}`, data);
    console.log(`PUT /api/manager/zones/${id} response:`, response.data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/api/manager/zones/${id}`);
  }
}

export default new ZoneService();
