import axiosInstance from './axios';

export type SessionStatus = 'PLANNED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface Session {
  id: string;
  routeId: string;
  routeName: string;
  zoneName: string;
  driverUserId: string;
  driverName: string;
  date: string;
  status: SessionStatus;
  totalStops: number;
  completedStops: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSessionData {
  routeId: string;
  date: string;
  driverUserId: string;
}

export interface SessionStop {
  id: string;
  householdId: string;
  householdAddress: string;
  citizenName: string;
  sequenceNumber: number;
  plannedTime: string;
  status: string;
  reason?: string;
  completedAt?: string;
  createdAt: string;
}

class SessionService {
  async create(data: CreateSessionData): Promise<Session> {
    const response = await axiosInstance.post('/api/manager/sessions', data);
    return response.data;
  }

  async getAll(): Promise<Session[]> {
    const response = await axiosInstance.get('/api/manager/sessions');
    if (response.data?.content && Array.isArray(response.data.content)) {
      return response.data.content;
    }
    return Array.isArray(response.data) ? response.data : [];
  }

  async getById(id: string): Promise<Session> {
    const response = await axiosInstance.get(`/api/manager/sessions/${id}`);
    return response.data;
  }

  async getStops(id: string): Promise<SessionStop[]> {
    const response = await axiosInstance.get(`/api/manager/sessions/${id}/stops`);
    return response.data;
  }

  async updateStatus(id: string, status: SessionStatus): Promise<Session> {
    const response = await axiosInstance.patch(`/api/manager/sessions/${id}/status?status=${status}`);
    return response.data;
  }

  async assignDriver(id: string, driverId: string): Promise<Session> {
    const response = await axiosInstance.patch(`/api/manager/sessions/${id}/driver/${driverId}`);
    return response.data;
  }
}

export default new SessionService();
