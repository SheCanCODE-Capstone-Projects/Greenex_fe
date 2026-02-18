import axiosInstance from './axios';

export interface Payment {
  id: number;
  householdId: number;
  householdName?: string;
  amount: number;
  paymentMethod: 'CASH' | 'MOBILE_MONEY' | 'BANK_TRANSFER';
  paymentDate: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  reference?: string;
  createdAt: string;
}

export interface CreatePaymentData {
  householdId: number;
  amount: number;
  paymentMethod: 'CASH' | 'MOBILE_MONEY' | 'BANK_TRANSFER';
  reference?: string;
}

class PaymentService {
  async getAll(): Promise<Payment[]> {
    const response = await axiosInstance.get('/api/waste-company/payments');
    return response.data;
  }

  async getById(id: number): Promise<Payment> {
    const response = await axiosInstance.get(`/api/waste-company/payments/${id}`);
    return response.data;
  }

  async create(data: CreatePaymentData): Promise<Payment> {
    const response = await axiosInstance.post('/api/waste-company/payments', data);
    return response.data;
  }

  async updateStatus(id: number, status: 'COMPLETED' | 'FAILED'): Promise<Payment> {
    const response = await axiosInstance.put(`/api/waste-company/payments/${id}/status`, { status });
    return response.data;
  }
}

export default new PaymentService();
