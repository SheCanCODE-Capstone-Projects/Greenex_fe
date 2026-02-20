/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from './axios';

// Type definitions
export interface Pageable {
  page: number;
  size: number;
  sort: string[];
}

export interface PendingCompany {
  id: number;
  name: string;
  email?: string;
  sectorCoverage: string;
  status: 'PENDING';
  createdAt: string;
  // Add other fields as needed
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

class CompanyManagementService {
  /**
   * Get pending companies with pagination
   * @param page - Page number (starts from 0)
   * @param size - Number of records per page
   * @param sort - Fields to sort by
   */
  async getPendingCompanies(
    page: number = 0,
    size: number = 10,
    sort: string[] = ['id']
  ): Promise<PageResponse<PendingCompany>> {
    const params = {
      page,
      size,
      sort: sort.join(',')
    };

    const response = await axiosInstance.get<PageResponse<PendingCompany>>(
      '/api/admin/companies/pending',
      { params }
    );
    
    return response.data;
  }

  /**
   * Approve a company
   */
  async approveCompany(companyId: number): Promise<void> {
    await axiosInstance.post(`/api/admin/companies/${companyId}/approve`);
  }

  /**
   * Reject a company
   */
  async rejectCompany(companyId: number): Promise<void> {
    await axiosInstance.post(`/api/admin/companies/${companyId}/reject`);
  }
}

export default new CompanyManagementService();
