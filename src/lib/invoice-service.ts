import axiosInstance from './axios';

export interface Invoice {
  id: number;
  householdId: number;
  householdName?: string;
  invoiceNumber: string;
  amount: number;
  dueDate: string;
  status: 'PENDING' | 'PAID' | 'OVERDUE' | 'CANCELLED';
  issueDate: string;
  items?: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface CreateInvoiceData {
  householdId: number;
  amount: number;
  dueDate: string;
  items?: InvoiceItem[];
}

class InvoiceService {
  async getAll(): Promise<Invoice[]> {
    const response = await axiosInstance.get('/api/waste-company/invoices');
    return response.data;
  }

  async getById(id: number): Promise<Invoice> {
    const response = await axiosInstance.get(`/api/waste-company/invoices/${id}`);
    return response.data;
  }

  async create(data: CreateInvoiceData): Promise<Invoice> {
    const response = await axiosInstance.post('/api/waste-company/invoices', data);
    return response.data;
  }

  async updateStatus(id: number, status: 'PAID' | 'CANCELLED'): Promise<Invoice> {
    const response = await axiosInstance.put(`/api/waste-company/invoices/${id}/status`, { status });
    return response.data;
  }
}

export default new InvoiceService();
