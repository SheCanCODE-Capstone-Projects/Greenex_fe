import axiosInstance from './axios';

/**
 * Complete onboarding form data matching backend requirements
 */
export interface OnboardingFormData {
  name: string;
  sectorCoverage: string;
  remaDocument: File;
  cityOfKigaliDocument: File;
  rdbDocument: File;
}

/**
 * Backend response structure
 */
export interface OnboardingResponse {
  message: string;
  companyId?: number;
  status?: string;
}

/**
 * Service for handling company onboarding with file uploads
 */
class OnboardingService {
  /**
   * Submit complete onboarding data with all required files
   * @param data - Complete form data including all 3 required files
   * @returns Promise with backend response
   */
  async submitOnboarding(data: OnboardingFormData): Promise<OnboardingResponse> {
    try {
      // Create FormData object
      const formData = new FormData();
      
      // Append required string fields
      formData.append('name', data.name);
      formData.append('sectorCoverage', data.sectorCoverage);
      
      // Append required file fields
      formData.append('remaDocument', data.remaDocument);
      formData.append('cityOfKigaliDocument', data.cityOfKigaliDocument);
      formData.append('rdbDocument', data.rdbDocument);

      // Get auth token from localStorage
      const token = localStorage.getItem('auth_token');
      
      // Make request with proper headers
      const response = await axiosInstance.post<OnboardingResponse>(
        '/api/auth/company/register',
        formData,
        {
          headers: {
            // Don't set Content-Type - browser will set it with boundary
            ...(token && { Authorization: `Bearer ${token}` })
          },
          // Increase timeout for file uploads
          timeout: 180000, // 3 minutes
        }
      );
      
      return response.data;
    } catch (error: any) {
      // Handle specific error cases
      if (error.code === 'ECONNABORTED') {
        throw new Error('Upload timeout - please check your connection and try again.');
      }
      
      if (error.response?.status === 413) {
        throw new Error('Files are too large. Please ensure each file is under 5MB.');
      }
      
      if (error.response?.status === 415) {
        throw new Error('Invalid file format. Please upload PDF files only.');
      }
      
      if (error.response?.status === 400) {
        const message = error.response?.data?.message || 'Invalid form data. Please check all fields.';
        throw new Error(message);
      }
      
      // Generic error handling
      const message = 
        error.response?.data?.message || 
        error.response?.data?.error || 
        error.message || 
        'Onboarding submission failed. Please try again.';
      
      throw new Error(message);
    }
  }
}

export default new OnboardingService();
