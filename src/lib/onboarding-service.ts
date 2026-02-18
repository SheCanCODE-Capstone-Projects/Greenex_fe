import axiosInstance from './axios';

export interface OnboardingData {
  companyName: string;
  email: string;
  phoneNumber: string;
  tinNumber: string;
  address: string;
  sectors: string[];
  kigaliContract?: File;
  remaCertificate?: File;
  rdbCertificate?: File;
}

export interface OnboardingResponse {
  message: string;
  companyId: number;
  status: string;
}

class OnboardingService {
  async submitOnboarding(data: OnboardingData): Promise<OnboardingResponse> {
    const formData = new FormData();
    formData.append('companyName', data.companyName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('tinNumber', data.tinNumber);
    formData.append('address', data.address);
    formData.append('sectors', JSON.stringify(data.sectors));
    
    if (data.kigaliContract) formData.append('kigaliContract', data.kigaliContract);
    if (data.remaCertificate) formData.append('remaCertificate', data.remaCertificate);
    if (data.rdbCertificate) formData.append('rdbCertificate', data.rdbCertificate);

    const response = await axiosInstance.post('/api/waste-company/onboarding', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async checkStatus(companyId: number): Promise<any> {
    const response = await axiosInstance.get(`/api/waste-company/onboarding/${companyId}/status`);
    return response.data;
  }
}

export default new OnboardingService();
