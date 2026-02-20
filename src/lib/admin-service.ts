/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export interface Pageable {
    page: number;
    size: number;
    sort: string[];
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
}

export interface AdminCompany {
    _id?: string;
    id?: string;
    name: string;
    contractNumber: string;
    sectorCoverage: string;
    status: string; // Keep as string for case-insensitive handling
    createdAt: string;
    documents?: {
        cityOfKigaliDocument?: string;
        remaDocument?: string;
        rdbDocument?: string;
        // Insurance and vehicle are not sent/needed for this view
    };
    contact?: string;
}

export const adminService = {
    getPendingCompanies: async (page = 0, size = 10, sort = ["id"]): Promise<PageResponse<AdminCompany>> => {
        try {
            // Construct the pageable object as requested
            const pageable = {
                page,
                size,
                sort
            };

            // The example showed: ?pageable={"page":0,"size":10,"sort":["id"]}
            // Axios will encode this. If the backend expects a raw JSON string:
            const response = await axiosInstance.get('/api/admin/companies/pending', {
                params: {
                    pageable: JSON.stringify(pageable)
                }
            });

            // Handle both structure where response.data is the PageResponse 
            // or if it's wrapped in another object
            return response.data.content ? response.data : {
                content: response.data.companies || response.data || [],
                totalElements: response.data.totalElements || 0,
                totalPages: response.data.totalPages || 0,
                size: response.data.size || size,
                number: response.data.number || page,
                first: response.data.first ?? true,
                last: response.data.last ?? true
            };
        } catch (error: any) {
            console.error('Failed to fetch pending companies:', error);
            const message = error.response?.data?.message || 'Failed to fetch pending companies';
            throw new Error(message);
        }
    },

    approveCompany: async (companyId: string): Promise<any> => {
        try {
            const response = await axiosInstance.post(`/api/admin/companies/${companyId}/approve`);
            return response.data;
        } catch (error: any) {
            console.error(`Failed to approve company ${companyId}:`, error);
            const message = error.response?.data?.message || 'Failed to approve company';
            throw new Error(message);
        }
    },

    rejectCompany: async (companyId: string): Promise<any> => {
        try {
            const response = await axiosInstance.post(`/api/admin/companies/${companyId}/reject`);
            return response.data;
        } catch (error: any) {
            console.error(`Failed to reject company ${companyId}:`, error);
            const message = error.response?.data?.message || 'Failed to reject company';
            throw new Error(message);
        }
    }
};
