# Company Status Management - Frontend Only

## Overview
Company approval status is managed entirely on the frontend using localStorage. No backend API needed.

## How It Works

### Status Storage
```javascript
localStorage.setItem('company_status', 'PENDING' | 'APPROVED' | 'REJECTED');
```

### Default Behavior
- New companies → `PENDING` (default)
- After admin approval → `APPROVED`
- If rejected → `REJECTED`

## Status Types

### PENDING (Default)
- Shows "Application Under Review" page
- 3-5 business days message
- Cannot access dashboard

### APPROVED
- Full dashboard access
- Auto-redirects from status page

### REJECTED
- Shows contact information page
- Email, phone, Twitter, Instagram links
- Cannot access dashboard

## Admin Approval Process

When admin approves a company, set status in localStorage:

```javascript
// In admin dashboard after approval
localStorage.setItem('company_status', 'APPROVED');
```

## Testing Different States

### Test PENDING
```javascript
localStorage.setItem('company_status', 'PENDING');
// or
localStorage.removeItem('company_status'); // defaults to PENDING
```

### Test APPROVED
```javascript
localStorage.setItem('company_status', 'APPROVED');
```

### Test REJECTED
```javascript
localStorage.setItem('company_status', 'REJECTED');
```

## Flow

```
Login → Check onboarding → Check company_status → Route accordingly

PENDING → /company-status (waiting page)
APPROVED → /wasteCompanyDashboard
REJECTED → /company-status (contact page)
```

## Files

1. **`src/app/company-status/page.tsx`**
   - Reads `company_status` from localStorage
   - Shows appropriate UI based on status

2. **`src/app/wasteCompanyDashboard/page.tsx`**
   - Checks `company_status === 'APPROVED'`
   - Redirects if not approved

3. **`src/app/signin/page.tsx`**
   - Routes to `/company-status` after onboarding

## Logo

Green truck icon used throughout:
```jsx
<Truck className="w-5 h-5 text-white" />
```

## No Backend Required

✅ All status management in localStorage  
✅ No API calls needed  
✅ Simple and fast  
✅ Works immediately  

Admin just needs to set `company_status` in localStorage when approving companies.
