/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export interface AdminCompany {
    _id: string;
    name: string;
    contractNumber: string;
    sectorCoverage: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    createdAt: string;
    // Documents might come as an object or just status
    documents?: {
        kigaliContract?: string;
        remaCertificate?: string;
        rdbCertificate?: string;
        insurancePolicy?: string;
        vehicleRegistration?: string;
    };
    contact?: string; // If available
}

export const adminService = {
    getPendingCompanies: async (): Promise<AdminCompany[]> => {
        try {
            const response = await axiosInstance.get('/api/admin/companies/pending');
            return Array.isArray(response.data) ? response.data : response.data.companies || [];
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
