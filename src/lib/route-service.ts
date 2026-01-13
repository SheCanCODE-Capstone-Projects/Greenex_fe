/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export interface Route {
    _id: string;
    zoneId: string;
    name: string;
    dayOfWeek: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';
    shift: 'MORNING' | 'AFTERNOON' | 'EVENING' | 'NIGHT';
    createdAt: string;
    updatedAt: string;
}

export interface CreateRouteData {
    zoneId: string;
    name: string;
    dayOfWeek: string;
    shift: string;
}

export const routeService = {
    getAllRoutes: async (): Promise<Route[]> => {
        try {
            const response = await axiosInstance.get('/api/manager/routes');
            return Array.isArray(response.data) ? response.data : response.data.routes || [];
        } catch (error: any) {
            console.error('Failed to fetch routes:', error);
            throw error;
        }
    },

    createRoute: async (data: CreateRouteData): Promise<Route> => {
        try {
            const response = await axiosInstance.post('/api/manager/routes', data);
            return response.data;
        } catch (error: any) {
            console.error('Failed to create route:', error);
            throw error;
        }
    },

    updateRoute: async (id: string, data: Partial<CreateRouteData>): Promise<Route> => {
        try {
            const response = await axiosInstance.put(`/api/manager/routes/${id}`, data);
            return response.data;
        } catch (error: any) {
            console.error(`Failed to update route ${id}:`, error);
            throw error;
        }
    },

    deleteRoute: async (id: string): Promise<void> => {
        try {
            await axiosInstance.delete(`/api/manager/routes/${id}`);
        } catch (error: any) {
            console.error(`Failed to delete route ${id}:`, error);
            throw error;
        }
    }
};
