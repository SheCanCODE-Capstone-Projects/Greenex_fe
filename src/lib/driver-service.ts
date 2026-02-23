import axiosInstance from './axios';

export interface Driver {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status?: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
}

export interface CreateDriverData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  licenseNumber: string;
}

class DriverService {
  async getAll(): Promise<Driver[]> {
    const response = await axiosInstance.get('/api/manager/drivers');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return [];
  }

  async getById(id: string): Promise<Driver> {
    const response = await axiosInstance.get(`/api/manager/drivers/${id}`);
    return response.data;
  }

  async create(data: CreateDriverData): Promise<Driver> {
    const response = await axiosInstance.post('/api/manager/drivers', data);
    return response.data;
  }

  async updateStatus(driverId: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING'): Promise<Driver> {
    console.log('Updating status for driver:', driverId, 'to:', status);
    const response = await axiosInstance.patch(`/api/manager/drivers/${driverId}/status?status=${status}`);
    console.log('Status update response:', response.data);
    return response.data;
  }
}

export default new DriverService();
