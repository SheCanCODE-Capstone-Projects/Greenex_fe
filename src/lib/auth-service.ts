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

export const authService = {
    register: async (data: RegisterData): Promise<RegisterResponse> => {
        try {
            const payload = {
                ...data,
                userType: data.userType
            };

            const response = await axiosInstance.post<RegisterResponse>('/api/auth/register', payload);
            return response.data;
        } catch (error: any) {
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - backend server is waking up, please try again.');
            }

            if (error.response?.status === 409) {
                throw new Error('Email already exists. Please use a different email or try logging in.');
            }

            if (error.response?.status === 400) {
                const responseData = error.response?.data;
                if (responseData?.errors) {
                    if (typeof responseData.errors === 'object' && !Array.isArray(responseData.errors)) {
                        const errorMessages = Object.values(responseData.errors).join(', ');
                        throw new Error(errorMessages);
                    } else if (Array.isArray(responseData.errors)) {
                        throw new Error(responseData.errors.join(', '));
                    }
                }
                throw new Error(responseData?.message || 'Invalid registration data. Please check your inputs.');
            }

            const responseData = error.response?.data;
            let message = 'Registration failed. Please try again.';

            if (responseData) {
                if (responseData.message) {
                    message = responseData.message;
                } else if (responseData.error) {
                    message = responseData.error;
                } else if (typeof responseData === 'string') {
                    message = responseData;
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
            if (error.code === 'ECONNABORTED') {
                throw new Error('Request timeout - backend server is waking up, please try again.');
            }

            if (error.response?.status === 401) {
                throw new Error('Invalid email or password');
            }

            if (error.response?.status === 403) {
                throw new Error('Account not verified. Please check your email for verification code.');
            }

            const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Login failed. Please try again.';
            throw new Error(message);
        }
    },

    verifyOtp: async (otp: string): Promise<any> => {
        try {
            const response = await axiosInstance.post('/api/auth/verify-otp', { otp });
            return response.data;
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'OTP Verification failed';
            throw new Error(message);
        }
    }
};
