'use client'
import { useState, useEffect } from 'react';
import companyManagementService, { PendingCompany, PageResponse } from '@/lib/company-management-service';
import { toast } from 'react-toastify';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PendingCompaniesPage() {
  const [companies, setCompanies] = useState<PendingCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const fetchPendingCompanies = async (page: number) => {
    setLoading(true);
    try {
      const response: PageResponse<PendingCompany> = await companyManagementService.getPendingCompanies(
        page,
        pageSize,
        ['id']
      );
      
      setCompanies(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setCurrentPage(response.number);
    } catch (error: any) {
      toast.error(error.message || 'Failed to fetch pending companies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCompanies(currentPage);
  }, []);

  const handleApprove = async (companyId: number) => {
    try {
      await companyManagementService.approveCompany(companyId);
      toast.success('Company approved successfully');
      fetchPendingCompanies(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Failed to approve company');
    }
  };

  const handleReject = async (companyId: number) => {
    try {
      await companyManagementService.rejectCompany(companyId);
      toast.success('Company rejected');
      fetchPendingCompanies(currentPage);
    } catch (error: any) {
      toast.error(error.message || 'Failed to reject company');
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchPendingCompanies(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-12 h-12 text-primary-green animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-dark dark:text-text-light">
          Pending Companies
        </h1>
        <p className="text-text-primary-muted">
          Total: {totalElements} companies
        </p>
      </div>

      {/* Companies Table */}
      <div className="bg-white dark:bg-dark-bg rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-light-bg dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-dark dark:text-text-light">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-dark dark:text-text-light">
                Company Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-dark dark:text-text-light">
                Sector Coverage
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-text-dark dark:text-text-light">
                Created At
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-text-dark dark:text-text-light">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {companies.map((company) => (
              <tr key={company.id} className="hover:bg-light-bg dark:hover:bg-gray-800">
                <td className="px-6 py-4 text-sm text-text-dark dark:text-text-light">
                  {company.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-text-dark dark:text-text-light">
                  {company.name}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary-muted">
                  {company.sectorCoverage}
                </td>
                <td className="px-6 py-4 text-sm text-text-primary-muted">
                  {new Date(company.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      onClick={() => handleApprove(company.id)}
                      className="bg-primary-green hover:bg-secondary-green text-white px-4 py-2 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleReject(company.id)}
                      variant="outline"
                      className="border-accent-red text-accent-red hover:bg-accent-red hover:text-white px-4 py-2 rounded-lg"
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-text-primary-muted">
          Page {currentPage + 1} of {totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
