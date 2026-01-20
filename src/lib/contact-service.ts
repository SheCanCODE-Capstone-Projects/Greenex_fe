/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export interface Contact {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceInterest: string;
  message: string;
  createdAt: string;
  processed: boolean;
}

export const contactService = {
  getAllContacts: async (): Promise<Contact[]> => {
    try {
      const response = await axiosInstance.get<Contact[]>('/api/contact');
      return response.data || [];
    } catch (error: any) {
      console.error('Contact service error:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - backend server is slow or unavailable');
      }
      throw error;
    }
  },

  submitContactForm: async (data: Omit<Contact, 'id' | 'createdAt' | 'processed'>): Promise<Contact> => {
    try {
      const response = await axiosInstance.post<Contact>('/api/contact', data);
      return response.data;
    } catch (error: any) {
      console.error('Submit contact error:', error);
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timeout - server is waking up, please try again in a minute');
      }
      throw error;
    }
  },

  getContactById: async (id: string): Promise<Contact> => {
    try {
      const response = await axiosInstance.get<Contact>(`/api/contact/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(`Get contact ${id} error:`, error);
      throw error;
    }
  },

  deleteContact: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/contact/${id}`);
    } catch (error: any) {
      console.error(`Delete contact ${id} error:`, error);
      throw error;
    }
  }
};
