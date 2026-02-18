# Greenex Backend API Integration

## Overview
Complete integration with backend API at: `https://greenex-be-28wt.onrender.com`

## Service Files Created

### 1. **waste-company-service.ts**
Manages waste company operations for admin
- `getAllCompanies()` - Get all registered companies
- `getCompanyById(id)` - Get company details
- `approveCompany(id)` - Approve pending company
- `rejectCompany(id, reason)` - Reject company with reason
- `downloadDocument(url)` - Download company documents

### 2. **household-service.ts**
Manages household/customer operations
- `getAll()` - Get all households
- `getById(id)` - Get household details
- `create(data)` - Register new household
- `update(id, data)` - Update household info
- `delete(id)` - Remove household

### 3. **zone-service.ts**
Manages service zones
- `getAll()` - Get all zones
- `getById(id)` - Get zone details
- `create(data)` - Create new zone
- `update(id, data)` - Update zone
- `delete(id)` - Delete zone

### 4. **tariff-service.ts**
Manages pricing and tariffs
- `getAll()` - Get all tariffs
- `getById(id)` - Get tariff details
- `create(data)` - Create new tariff
- `update(id, data)` - Update tariff
- `delete(id)` - Delete tariff

### 5. **payment-service.ts**
Manages payments
- `getAll()` - Get all payments
- `getById(id)` - Get payment details
- `create(data)` - Record new payment
- `updateStatus(id, status)` - Update payment status

### 6. **invoice-service.ts**
Manages invoices/billing
- `getAll()` - Get all invoices
- `getById(id)` - Get invoice details
- `create(data)` - Generate new invoice
- `updateStatus(id, status)` - Update invoice status

### 7. **complaint-service.ts**
Manages customer complaints
- `getAll()` - Get all complaints
- `getById(id)` - Get complaint details
- `updateStatus(id, status)` - Update complaint status

### 8. **route-service-api.ts**
Manages collection routes
- `getAll()` - Get all routes
- `getById(id)` - Get route details
- `create(data)` - Create new route
- `update(id, data)` - Update route
- `delete(id)` - Delete route

### 9. **user-dashboard-service.ts**
User/household dashboard operations
- `getProfile()` - Get user profile
- `updateProfile(data)` - Update profile
- `getSchedules()` - Get collection schedules
- `getComplaints()` - Get user complaints
- `createComplaint(data)` - Submit complaint
- `getPayments()` - Get payment history
- `getInvoices()` - Get invoices

### 10. **onboarding-service.ts**
Waste company registration/onboarding
- `submitOnboarding(data)` - Submit company registration
- `checkStatus(companyId)` - Check registration status

### 11. **dashboard-service.ts**
Dashboard statistics
- `getWasteCompanyStats()` - Company dashboard stats
- `getAdminStats()` - Admin dashboard stats
- `getUserStats()` - User dashboard stats

## Usage Example

```typescript
import { householdService, zoneService, paymentService } from '@/lib/api-services';

// Fetch households
const households = await householdService.getAll();

// Create new zone
const newZone = await zoneService.create({
  zoneName: "Kicukiro Zone A",
  district: "Kicukiro",
  sector: "Gatenga"
});

// Record payment
const payment = await paymentService.create({
  householdId: 1,
  amount: 5000,
  paymentMethod: 'MOBILE_MONEY'
});
```

## Authentication
All requests automatically include JWT token from localStorage via axios interceptor.

## Error Handling
All services throw errors that should be caught with try-catch blocks.

## Configuration
Backend URL is configured in `src/lib/axios.ts`:
```typescript
baseURL: 'https://greenex-be-28wt.onrender.com'
```
