import axiosInstance from './axios';
import { Session, SessionStop } from './session-service';

export type StopStatus = 'PENDING' | 'COMPLETED' | 'SKIPPED';

class DriverSessionService {
  async getTodaySessions(): Promise<Session[]> {
    try {
      console.log('Calling /api/driver/sessions/today');
      const response = await axiosInstance.get('/api/driver/sessions/today');
      console.log('Today sessions full response:', response);
      console.log('Today sessions response.data:', response.data);
      console.log('Is array?', Array.isArray(response.data));
      if (response.data?.content && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('Error fetching today sessions:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      return [];
    }
  }

  async getUpcomingSessions(): Promise<Session[]> {
    try {
      console.log('Calling /api/driver/sessions/upcoming');
      const response = await axiosInstance.get('/api/driver/sessions/upcoming');
      console.log('Upcoming sessions full response:', response);
      console.log('Upcoming sessions response.data:', response.data);
      console.log('Is array?', Array.isArray(response.data));
      if (response.data?.content && Array.isArray(response.data.content)) {
        return response.data.content;
      }
      return Array.isArray(response.data) ? response.data : [];
    } catch (error: any) {
      console.error('Error fetching upcoming sessions:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      return [];
    }
  }

  async getSessionStops(id: string): Promise<SessionStop[]> {
    const response = await axiosInstance.get(`/api/driver/sessions/${id}/stops`);
    return Array.isArray(response.data) ? response.data : [];
  }

  async completeSession(id: string): Promise<Session> {
    const response = await axiosInstance.post(`/api/driver/sessions/${id}/complete`);
    return response.data;
  }

  async updateStopStatus(stopId: string, status: StopStatus, reason?: string): Promise<SessionStop> {
    const response = await axiosInstance.patch(`/api/driver/stops/${stopId}`, { status, reason });
    return response.data;
  }
}

export default new DriverSessionService();
