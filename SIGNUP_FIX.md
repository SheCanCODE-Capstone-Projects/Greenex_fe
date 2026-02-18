# 🔧 Signup Issue - Fixed & Troubleshooting Guide

## Changes Made

### 1. Enhanced Registration Error Handling
- ✅ Detailed console logging
- ✅ Better error messages for 409 (Email exists)
- ✅ Better error messages for 400 (Invalid data)
- ✅ Timeout handling
- ✅ Field validation errors

### 2. Enhanced Signup Page Logging
- ✅ Logs registration attempt
- ✅ Logs response data
- ✅ Logs state storage
- ✅ Logs redirect
- ✅ Detailed error logging

## How to Debug Signup

### Step 1: Open Browser Console
Press F12 → Console tab

### Step 2: Try to Sign Up
You'll see detailed logs:
```
Starting registration for: { email: "...", userType: "citizen", fullname: "..." }
Registration attempt with: { fullName: "...", email: "...", phone: "...", userType: "CITIZEN" }
Registration successful: { message: "...", user: {...} }
Signup state saved, redirecting to OTP
```

### Step 3: Check for Errors
If signup fails, you'll see:
```
Registration error details: {
  message: "...",
  response: { ... },
  status: 400,
  code: "..."
}
Registration failed: Error: ...
```

## Common Signup Issues & Solutions

### Issue 1: "Email already exists"
**Cause:** Email is already registered
**Solution:**
1. Use a different email
2. Or try logging in with existing account
3. Check if you already have an account

### Issue 2: Password validation errors
**Cause:** Password doesn't meet requirements
**Solution:**
Password must have:
- ✅ Minimum 8 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special character (@$!%*?&)

**Example valid passwords:**
- `Password123!`
- `MyPass@2024`
- `Secure$Pass1`

### Issue 3: Phone number validation
**Cause:** Invalid phone format
**Solution:**
- Must be exactly 10 digits
- Example: `0788123456`
- No spaces or special characters

### Issue 4: "Request timeout"
**Cause:** Backend server is sleeping
**Solution:**
1. Wait 30-60 seconds
2. Try again
3. Backend is waking up (free tier)

### Issue 5: Form validation errors
**Cause:** Fields not filled correctly
**Solution:**
Check all fields:
- ✅ Full name (min 3 characters)
- ✅ Valid email format (must have @ and .)
- ✅ Phone (exactly 10 digits)
- ✅ Password (meets requirements)
- ✅ Confirm password (matches password)
- ✅ Terms & conditions (checked)

## Field Validation Rules

### Full Name
- Minimum 3 characters
- Example: "John Doe"

### Email
- Must contain @
- Must contain .
- Example: "user@example.com"

### Phone
- Exactly 10 digits
- No spaces or special characters
- Example: "0788123456"

### Password
```regex
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$
```

### User Type
- `citizen` → Household user
- `company` → Waste company manager

## Test the Fix

### 1. Clear Browser Data
```javascript
// Run in console
localStorage.clear();
location.reload();
```

### 2. Fill Form Correctly
- Full Name: "John Doe"
- Email: "john.doe@example.com"
- Phone: "0788123456"
- Password: "Password123!"
- Confirm: "Password123!"
- User Type: Citizen or Company
- ✅ Check terms & conditions

### 3. Watch Console
- ✅ "Starting registration..." → Form submitted
- ✅ "Registration attempt..." → Request sent
- ✅ "Registration successful..." → Backend responded
- ✅ "Signup state saved..." → Data stored
- ✅ Redirects to OTP page

## Backend Requirements

Backend should accept:
```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "0788123456",
  "password": "Password123!",
  "userType": "CITIZEN" | "COMPANY"
}
```

Backend should return:
```json
{
  "message": "Registration successful",
  "user": {
    "id": 123,
    "email": "john.doe@example.com",
    "fullName": "John Doe"
  }
}
```

## Error Response Handling

### 409 - Email Exists
```json
{
  "status": 409,
  "message": "Email already exists"
}
```
**User sees:** "Email already exists. Please use a different email or try logging in."

### 400 - Invalid Data
```json
{
  "status": 400,
  "message": "Invalid data",
  "errors": {
    "email": "Invalid email format",
    "password": "Password too weak"
  }
}
```
**User sees:** "Invalid email format, Password too weak"

## Complete Signup Flow

```
1. Fill Form
   ↓
2. Validate Fields
   ↓
3. Submit to Backend
   ↓
4. Store Signup State
   ↓
5. Redirect to OTP
   ↓
6. Enter OTP Code
   ↓
7. Verify Account
   ↓
8. Redirect to Login (Citizen) or Onboarding (Company)
```

## Quick Test

### Test Backend Directly
```javascript
// Run in browser console
fetch('https://greenex-be-28wt.onrender.com/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullName: "Test User",
    email: "test@example.com",
    phone: "0788123456",
    password: "Password123!",
    userType: "CITIZEN"
  })
})
.then(r => r.json())
.then(data => console.log('Backend response:', data))
.catch(err => console.error('Backend error:', err))
```

## Still Not Working?

### Checklist:
1. ✅ All fields filled correctly
2. ✅ Password meets requirements
3. ✅ Phone is 10 digits
4. ✅ Email format is valid
5. ✅ Terms & conditions checked
6. ✅ Backend URL correct
7. ✅ No console errors
8. ✅ Internet connection working

### Get More Info:
1. Open DevTools (F12)
2. Go to Network tab
3. Try signup
4. Check `/api/auth/register` request
5. Look at Response tab
6. Check Status code

### Common Status Codes:
- `200/201` - Success ✅
- `400` - Invalid data ❌
- `409` - Email exists ❌
- `500` - Server error ❌
- `timeout` - Server sleeping ⏳

## Summary

✅ Enhanced error handling
✅ Detailed logging for debugging
✅ Better error messages
✅ Field validation feedback
✅ Email exists detection
✅ Password requirements clear
✅ Troubleshooting guide

**Signup should now work with clear error messages!** 🎉
