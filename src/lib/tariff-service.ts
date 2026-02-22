import axiosInstance from './axios';

export type BillingFrequency = 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'ANNUALLY';

export interface Tariff {
  id: number;
  name: string;
  description: string;
  billingFrequency: BillingFrequency;
  effectiveFrom: string;
  effectiveTo: string;
  createdAt?: string;
}

export interface CreateTariffData {
  name: string;
  description: string;
  billingFrequency: BillingFrequency;
  effectiveFrom: string;
  effectiveTo: string;
}

class TariffService {
  async getAll(): Promise<Tariff[]> {
    const response = await axiosInstance.get('/api/manager/tariffs/plans');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return [];
  }

  async getById(id: number): Promise<Tariff> {
    const response = await axiosInstance.get(`/api/manager/tariffs/plans/${id}`);
    return response.data;
  }

  async create(data: CreateTariffData): Promise<Tariff> {
    const response = await axiosInstance.post('/api/manager/tariffs/plans', data);
    return response.data;
  }

  async update(id: number, data: Partial<CreateTariffData>): Promise<Tariff> {
    const response = await axiosInstance.put(`/api/manager/tariffs/plans/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/manager/tariffs/plans/${id}`);
  }
}

export default new TariffService();
