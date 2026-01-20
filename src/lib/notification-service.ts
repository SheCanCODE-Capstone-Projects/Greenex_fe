/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export type NotificationType = 'COMPANY_REGISTRATION' | 'CONTACT_MESSAGE' | 'COMPLAINT';
export type RecipientRole = 'SUPER_ADMIN' | 'WASTE_COMPANY';

export interface NotificationMetadata {
    // For company registration
    companyName?: string;
    companyEmail?: string;
    companyPhone?: string;

    // For contact messages
    contactName?: string;
    contactEmail?: string;

    // For complaints
    complaintId?: string;
    householdId?: string;
    complaintType?: string;

    // Additional fields
    [key: string]: any;
}

export interface Notification {
    _id: string;
    type: NotificationType;
    recipientId: string;
    recipientRole: RecipientRole;
    title: string;
    message: string;
    metadata?: NotificationMetadata;
    isRead: boolean;
    createdAt: string;
    updatedAt?: string;
}

export const notificationService = {
    /**
     * Get all notifications for the current user
     */
    getAllNotifications: async (): Promise<Notification[]> => {
        try {
            const response = await axiosInstance.get<Notification[]>('/notifications');
            return Array.isArray(response.data) ? response.data : [];
        } catch (error: any) {
            console.error('Failed to fetch notifications:', error);
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - backend server is slow or unavailable');
            }
            throw error;
        }
    },

    /**
     * Delete a notification by ID
     */
    deleteNotification: async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`/notifications/${id}`);
        } catch (error: any) {
            console.error(`Failed to delete notification ${id}:`, error);
            throw error;
        }
    },

    /**
     * Get unread notification count
     */
    getUnreadCount: async (): Promise<number> => {
        try {
            const notifications = await notificationService.getAllNotifications();
            return notifications.filter(n => !n.isRead).length;
        } catch (error) {
            console.error('Failed to get unread count:', error);
            return 0;
        }
    }
};
