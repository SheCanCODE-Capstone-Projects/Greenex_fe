/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

export interface RegisterData {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    userType: string;
}

export interface RegisterResponse {
    message: string;
    user?: any;
    token?: string;

}

export interface CompanyRegisterData {
    name: string;
    contractNumber: string;
    sectorCoverage: string;
}

export interface CompanyRegisterResponse {
    message: string;
    // Add other fields if returned by backend
}

export const authService = {
    register: async (data: RegisterData): Promise<RegisterResponse> => {
        try {

            const payload = {
                ...data,
                userType: data.userType.toUpperCase()
            };

            const response = await axiosInstance.post<RegisterResponse>('/api/auth/register', payload);
            return response.data;
        } catch (error: any) {
            console.error('Registration error full object:', error);
            if (error.response?.data) {
                console.error('Registration backend response data:', error.response.data);
            }

            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - backend server is waking up, please try again.');
            }

            const responseData = error.response?.data;
            let message = 'Registration failed';

            if (responseData) {
                if (responseData.errors) {
                    if (typeof responseData.errors === 'object' && !Array.isArray(responseData.errors)) {

                        message = Object.values(responseData.errors).join(', ');
                    } else if (Array.isArray(responseData.errors)) {
                        message = responseData.errors.join(', ');
                    } else {
                        message = String(responseData.errors);
                    }
                } else if (responseData.message) {
                    message = responseData.message;
                } else if (typeof responseData === 'string') {
                    message = responseData;
                } else if (Array.isArray(responseData)) {
                    message = responseData.join(', ');
                }
            } else if (error.message) {
                message = error.message;
            }

            throw new Error(message);
        }
    },

    login: async (email: string, password: string): Promise<any> => {
        try {
            const response = await axiosInstance.post('/api/auth/login', { email, password });
            return response.data;
        } catch (error: any) {
            console.error('Login error:', error);
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - backend server is waking up, please try again.');
            }
            const message = error.response?.data?.message || error.message || 'Login failed';
            throw new Error(message);
        }
    },

    verifyOtp: async (otp: string): Promise<any> => {
        try {
            const response = await axiosInstance.post('/api/auth/verify-otp', { otp });
            return response.data;
        } catch (error: any) {
            console.error('OTP Verification error:', error);
            const message = error.response?.data?.message || error.message || 'OTP Verification failed';
            throw new Error(message);
        }
    },

    registerCompany: async (data: CompanyRegisterData): Promise<CompanyRegisterResponse> => {
        try {
            const response = await axiosInstance.post<CompanyRegisterResponse>('/api/auth/company/register', data);
            return response.data;
        } catch (error: any) {
            console.error('Company Registration error:', error);
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - backend server is waking up, please try again.');
            }
            const message = error.response?.data?.message || error.message || 'Company Registration failed';
            throw new Error(message);
        }
    }
};
