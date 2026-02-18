import axiosInstance from './axios';

export interface Tariff {
  id: number;
  tariffName: string;
  zoneId: number;
  zoneName?: string;
  wasteType: string;
  basePrice: number;
  pricePerKg?: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}

export interface CreateTariffData {
  tariffName: string;
  zoneId: number;
  wasteType: string;
  basePrice: number;
  pricePerKg?: number;
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY';
}

class TariffService {
  async getAll(): Promise<Tariff[]> {
    const response = await axiosInstance.get('/api/waste-company/tariffs');
    return response.data;
  }

  async getById(id: number): Promise<Tariff> {
    const response = await axiosInstance.get(`/api/waste-company/tariffs/${id}`);
    return response.data;
  }

  async create(data: CreateTariffData): Promise<Tariff> {
    const response = await axiosInstance.post('/api/waste-company/tariffs', data);
    return response.data;
  }

  async update(id: number, data: Partial<CreateTariffData>): Promise<Tariff> {
    const response = await axiosInstance.put(`/api/waste-company/tariffs/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/waste-company/tariffs/${id}`);
  }
}

export default new TariffService();
