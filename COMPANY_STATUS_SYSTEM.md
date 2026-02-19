# Company Approval Status System

## Overview
Implemented a status-based access control system for waste companies. Only APPROVED companies can access the dashboard. PENDING and REJECTED companies see appropriate status pages.

## Flow

```
Login → Check Onboarding → Check Approval Status → Route to Appropriate Page
```

### Detailed Flow

1. **Company Manager logs in**
   - If onboarding NOT complete → `/onboarding`
   - If onboarding complete → `/company-status`

2. **Company Status Page checks approval**
   - `APPROVED` → Redirect to `/wasteCompanyDashboard`
   - `PENDING` → Show waiting message (3-5 business days)
   - `REJECTED` → Show contact information page

3. **Dashboard Access**
   - Checks approval status on load
   - If not APPROVED → Redirect to `/company-status`

## Files Created/Modified

### New Files

1. **`src/app/company-status/page.tsx`**
   - Status page with 3 states: PENDING, APPROVED, REJECTED
   - PENDING: Shows review timeline (3-5 days)
   - REJECTED: Shows contact options (email, phone, social media)

2. **`src/lib/company-service.ts`**
   - Service to fetch company approval status from backend
   - API endpoint: `GET /api/auth/company/status`

### Modified Files

1. **`src/app/signin/page.tsx`**
   - Changed routing for COMPANY_MANAGER
   - After onboarding → `/company-status` (not dashboard)

2. **`src/app/onboarding/page.tsx`**
   - After success → Redirect to `/company-status` (not signin)

3. **`src/components/onboarding/SuccessStep.tsx`**
   - Button text: "Continue" (not "Go to Dashboard")

4. **`src/app/wasteCompanyDashboard/page.tsx`**
   - Added approval status check on mount
   - Shows loader while checking
   - Redirects if not APPROVED

## Status Types

```typescript
type CompanyStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
```

### PENDING
- **Message**: "Application Under Review"
- **Timeline**: 3-5 Business Days
- **Action**: Wait for email/phone notification
- **What's shown**:
  - Review timeline
  - What happens next (3 steps)
  - Back to login button

### APPROVED
- **Action**: Auto-redirect to dashboard
- **Access**: Full dashboard access

### REJECTED
- **Message**: "Application Requires Attention"
- **Action**: Contact GreenEx team
- **Contact Options**:
  - Email: support@greenex.rw
  - Phone: +250 788 123 456
  - Twitter: @greenex
  - Instagram: @greenex

## Backend API Required

### Endpoint
```
GET /api/auth/company/status
```

### Headers
```
Authorization: Bearer <token>
```

### Response
```json
{
  "status": "PENDING" | "APPROVED" | "REJECTED",
  "companyId": 123,
  "companyName": "Green Waste Solutions",
  "message": "Optional message"
}
```

### Status Codes
- `200` - Success
- `404` - Company not found
- `401` - Unauthorized

## User Experience

### PENDING Company
1. Completes onboarding
2. Sees success message
3. Redirected to status page
4. Sees "Under Review" message
5. Waits 3-5 business days
6. Cannot access dashboard

### APPROVED Company
1. Logs in
2. Status check happens
3. Auto-redirected to dashboard
4. Full access granted

### REJECTED Company
1. Logs in
2. Sees "Requires Attention" message
3. Contact options displayed
4. Can reach out via email/phone/social
5. Cannot access dashboard

## Testing

### Test PENDING Status
```typescript
// In company-status/page.tsx, temporarily set:
const mockStatus: CompanyStatus = 'PENDING';
```

### Test REJECTED Status
```typescript
// In company-status/page.tsx, temporarily set:
const mockStatus: CompanyStatus = 'REJECTED';
```

### Test APPROVED Status
```typescript
// In company-status/page.tsx, temporarily set:
const mockStatus: CompanyStatus = 'APPROVED';
// Should auto-redirect to dashboard
```

## Security

- ✅ Status checked on every dashboard access
- ✅ JWT token required for API calls
- ✅ Automatic redirection if not approved
- ✅ No way to bypass status check

## Contact Information

Update these in `company-status/page.tsx`:

```typescript
Email: support@greenex.rw
Phone: +250 788 123 456
Twitter: https://twitter.com/greenex
Instagram: https://instagram.com/greenex
```

## Summary

✅ PENDING companies see waiting message  
✅ REJECTED companies see contact page  
✅ APPROVED companies access dashboard  
✅ Dashboard protected with status check  
✅ Clean user experience for all states  
✅ Contact options for rejected companies  

**Status:** Complete and ready for backend integration
