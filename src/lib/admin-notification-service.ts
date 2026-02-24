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

  async deleteAll(): Promise<void> {
    await axiosInstance.delete('/notifications');
  }
}

export default new AdminNotificationService();
