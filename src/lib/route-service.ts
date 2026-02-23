import axiosInstance from './axios';

export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
export type Shift = 'MORNING' | 'AFTERNOON' | 'EVENING';

export interface Route {
  id: string;
  zoneId: string;
  name: string;
  dayOfWeek: DayOfWeek;
  shift: Shift;
  createdAt?: string;
}

export interface CreateRouteData {
  zoneId: string;
  name: string;
  dayOfWeek: DayOfWeek;
  shift: Shift;
}

class RouteService {
  async getAll(): Promise<Route[]> {
    const response = await axiosInstance.get('/api/manager/routes');
    if (Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return [];
  }

  async getById(id: string): Promise<Route> {
    const response = await axiosInstance.get(`/api/manager/routes/${id}`);
    return response.data;
  }

  async create(data: CreateRouteData): Promise<Route> {
    const response = await axiosInstance.post('/api/manager/routes', data);
    return response.data;
  }

  async update(id: string, data: Partial<CreateRouteData>): Promise<Route> {
    const response = await axiosInstance.put(`/api/manager/routes/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`/api/manager/routes/${id}`);
  }
}

export default new RouteService();
