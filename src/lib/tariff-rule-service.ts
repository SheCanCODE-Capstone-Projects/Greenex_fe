import axiosInstance from './axios';

export type HouseType = 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL';

export interface TariffRule {
  id: string;
  tariffPlanId: string;
  zoneId: string;
  houseType: HouseType;
  pickupFrequencyPerWeek: number;
  amount: number;
}

export interface CreateTariffRuleData {
  tariffPlanId: string;
  zoneId: string;
  houseType: HouseType;
  pickupFrequencyPerWeek: number;
  amount: number;
}

class TariffRuleService {
  async getAll(): Promise<TariffRule[]> {
    const response = await axiosInstance.get('/api/manager/tariffs/rules');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return [];
  }

  async getByPlanId(planId: string): Promise<TariffRule[]> {
    const response = await axiosInstance.get(`/api/manager/tariffs/plans/${planId}/rules`);
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return [];
  }

  async getById(id: string): Promise<TariffRule> {
    const response = await axiosInstance.get(`/api/manager/tariffs/rules/${id}`);
    return response.data;
  }

  async create(data: CreateTariffRuleData): Promise<TariffRule> {
    const response = await axiosInstance.post('/api/manager/tariffs/rules', data);
    return response.data;
  }

  async update(id: string, data: Partial<CreateTariffRuleData>): Promise<TariffRule> {
    const response = await axiosInstance.put(`/api/manager/tariffs/rules/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/api/manager/tariffs/rules/${id}`);
  }
}

export default new TariffRuleService();
