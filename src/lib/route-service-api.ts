import axiosInstance from './axios';

export interface Route {
  id: number;
  routeName: string;
  zoneId: number;
  zoneName?: string;
  startPoint: string;
  endPoint: string;
  distance?: number;
  estimatedTime?: number;
  status: 'ACTIVE' | 'INACTIVE';
  households?: number[];
  createdAt: string;
}

export interface CreateRouteData {
  routeName: string;
  zoneId: number;
  startPoint: string;
  endPoint: string;
  distance?: number;
  estimatedTime?: number;
  households?: number[];
}

class RouteService {
  async getAll(): Promise<Route[]> {
    const response = await axiosInstance.get('/api/waste-company/routes');
    return response.data;
  }

  async getById(id: number): Promise<Route> {
    const response = await axiosInstance.get(`/api/waste-company/routes/${id}`);
    return response.data;
  }

  async create(data: CreateRouteData): Promise<Route> {
    const response = await axiosInstance.post('/api/waste-company/routes', data);
    return response.data;
  }

  async update(id: number, data: Partial<CreateRouteData>): Promise<Route> {
    const response = await axiosInstance.put(`/api/waste-company/routes/${id}`, data);
    return response.data;
  }

  async delete(id: number): Promise<void> {
    await axiosInstance.delete(`/api/waste-company/routes/${id}`);
  }
}

export default new RouteService();
