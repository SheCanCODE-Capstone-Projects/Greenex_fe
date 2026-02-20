// Central API Services Export
export { authService } from './auth-service';
export { adminService } from './admin-service';
export { default as wasteCompanyService } from './waste-company-service';
export { default as householdService } from './household-service';
export { default as zoneService } from './zone-service';
export { default as tariffService } from './tariff-service';
export { default as paymentService } from './payment-service';
export { default as invoiceService } from './invoice-service';
export { default as complaintService } from './complaint-service';
export { default as routeService } from './route-service-api';
export { default as userDashboardService } from './user-dashboard-service';
export { default as onboardingService } from './onboarding-service';
export { default as dashboardService } from './dashboard-service';

// Re-export types
export type { RegisterData, RegisterResponse } from './auth-service';
export type { AdminCompany } from './admin-service';
export type { WasteCompany, ApprovalRequest } from './waste-company-service';
export type { Household, CreateHouseholdData } from './household-service';
export type { Zone, CreateZoneData } from './zone-service';
export type { Tariff, CreateTariffData } from './tariff-service';
export type { Payment, CreatePaymentData } from './payment-service';
export type { Invoice, InvoiceItem, CreateInvoiceData } from './invoice-service';
export type { Complaint } from './complaint-service';
export type { Route, CreateRouteData } from './route-service-api';
export type { UserProfile, Schedule, UserComplaint, CreateComplaintData, UserPayment } from './user-dashboard-service';
export type { OnboardingFormData, OnboardingResponse } from './onboarding-service';
export type { DashboardStats, AdminDashboardStats } from './dashboard-service';
