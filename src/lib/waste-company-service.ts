import axiosInstance from './axios';

export interface WasteCompany {
  id: number;
  companyName: string;
  email: string;
  phoneNumber: string;
  tinNumber: string;
  address: string;
  sectors: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  kigaliContractUrl?: string;
  remaCertificateUrl?: string;
  rdbCertificateUrl?: string;
}

export interface ApprovalRequest {
  companyId: number;
  status: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}

class WasteCompanyService {
  async getAllCompanies(): Promise<WasteCompany[]> {
    const response = await axiosInstance.get('/api/admin/waste-companies');
    return response.data;
  }

  async getCompanyById(id: number): Promise<WasteCompany> {
    const response = await axiosInstance.get(`/api/admin/waste-companies/${id}`);
    return response.data;
  }

  async approveCompany(companyId: number): Promise<void> {
    await axiosInstance.put(`/api/admin/waste-companies/${companyId}/approve`);
  }

  async rejectCompany(companyId: number, reason: string): Promise<void> {
    await axiosInstance.put(`/api/admin/waste-companies/${companyId}/reject`, { reason });
  }

  async downloadDocument(url: string): Promise<Blob> {
    const response = await axiosInstance.get(url, { responseType: 'blob' });
    return response.data;
  }
}

export default new WasteCompanyService();
