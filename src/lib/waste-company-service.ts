import axiosInstance from './axios';

export interface WasteCompany {
  id: number;
  companyName: string;
  email: string;
  phoneNumber: string;
  tinNumber: string;
  address: string;
  sectors: string[];
  status: string;
  registrationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  kigaliContractUrl?: string;
  remaCertificateUrl?: string;
  rdbCertificateUrl?: string;
  cityOfKigaliDocumentUrl?: string;
  remaDocumentUrl?: string;
  rdbDocumentUrl?: string;
}

export interface ApprovalRequest {
  companyId: number;
  status: 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
}

class WasteCompanyService {
  async getAllCompanies(status?: 'PENDING' | 'APPROVED' | 'REJECTED'): Promise<WasteCompany[]> {
    let endpoint = '/api/admin/companies/pending';

    if (status === 'APPROVED') {
      endpoint = '/api/admin/companies/approved';
    } else if (status === 'REJECTED') {
      endpoint = '/api/admin/companies/rejected';
    }

    // User logs show POST for these listing endpoints
    const response = await axiosInstance.post(endpoint, {});

    // Handle both plain array and paginated response
    let companies: any[] = [];
    if (response.data?.content && Array.isArray(response.data.content)) {
      companies = response.data.content;
    } else if (Array.isArray(response.data)) {
      companies = response.data;
    }

    // Map registrationStatus to status field if it's used in the UI
    return companies.map(company => {
      // Prioritize registrationStatus but fallback to status
      const regStatus = company.registrationStatus || company.status;

      return {
        ...company,
        // If we fetched from a specific status endpoint, we can be more confident
        // in that status even if the object's registrationStatus is laggy
        status: status || regStatus
      };
    });
  }

  async getCompanyById(id: number): Promise<WasteCompany> {
    const response = await axiosInstance.get(`/api/admin/waste-companies/${id}`);
    return response.data;
  }

  async approveCompany(companyId: number): Promise<void> {
    await axiosInstance.post(`/api/admin/companies/${companyId}/approve`);
  }

  async rejectCompany(companyId: number, reason: string): Promise<void> {
    await axiosInstance.post(`/api/admin/companies/${companyId}/reject`, { reason });
  }

  async downloadDocument(url: string): Promise<Blob> {
    const response = await axiosInstance.get(url, { responseType: 'blob' });
    return response.data;
  }
}

export default new WasteCompanyService();
