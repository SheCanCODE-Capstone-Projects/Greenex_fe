import axiosInstance from './axios';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: string;
  createdAt: string;
}

class AdminNotificationService {
  async getAll(): Promise<AdminNotification[]> {
    const response = await axiosInstance.get('/notifications');
    return Array.isArray(response.data) ? response.data : [];
  }

  async delete(id: string): Promise<AdminNotification> {
    const response = await axiosInstance.delete(`/notifications/${id}`);
    return response.data;
  }
}

export default new AdminNotificationService();
