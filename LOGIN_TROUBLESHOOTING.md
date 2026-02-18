# Login Troubleshooting Guide

## Common Login Issues & Solutions

### Issue 1: "Invalid email or password"
**Cause:** Wrong credentials or account doesn't exist
**Solution:**
1. Verify email is correct
2. Check password (case-sensitive)
3. Ensure account was created and verified
4. Try password reset if available

### Issue 2: "Account not verified"
**Cause:** Email not verified with OTP
**Solution:**
1. Check email for verification code
2. Complete OTP verification
3. Try signing up again if OTP expired

### Issue 3: "Request timeout"
**Cause:** Backend server is sleeping (free tier)
**Solution:**
1. Wait 30-60 seconds for server to wake up
2. Try login again
3. Check backend URL is correct

### Issue 4: Network/CORS errors
**Cause:** Backend not accessible or CORS issues
**Solution:**
1. Check backend is running: https://greenex-be-28wt.onrender.com
2. Check browser console for errors
3. Verify backend URL in axios.ts

## Debug Steps

### 1. Check Backend Connection
Open browser console and run:
```javascript
fetch('https://greenex-be-28wt.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### 2. Check localStorage
```javascript
// Check if old tokens exist
console.log('Token:', localStorage.getItem('auth_token'));
console.log('User:', localStorage.getItem('user_info'));

// Clear if needed
localStorage.clear();
```

### 3. Check Network Tab
1. Open DevTools (F12)
2. Go to Network tab
3. Try login
4. Check the `/api/auth/login` request
5. Look at Response tab for error details

### 4. Check Console Logs
The login now logs detailed error information:
- Request details
- Response status
- Error messages
- Response data

## Test Credentials

If you need to create a test account:

1. **Sign Up:**
   - Go to `/signup`
   - Fill in details
   - Use valid email format
   - Password: Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char

2. **Verify OTP:**
   - Check email for 6-digit code
   - Enter code on OTP page

3. **Login:**
   - Use same email/password from signup

## Backend API Endpoints

```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify-otp
```

## Error Response Format

The backend should return:
```json
{
  "message": "Error description",
  "error": "Error type",
  "status": 400
}
```

## Success Response Format

Login success should return:
```json
{
  "token": "jwt.token.here",
  "userId": 123,
  "email": "user@example.com",
  "fullName": "User Name",
  "role": "CITIZEN" | "COMPANY_MANAGER" | "ADMIN"
}
```

## Quick Fixes

### Clear All Data and Start Fresh
```javascript
// Run in browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Force Logout
```javascript
localStorage.removeItem('auth_token');
localStorage.removeItem('user_info');
window.location.href = '/signin';
```

## Contact Support

If issues persist:
1. Check browser console for errors
2. Check Network tab for failed requests
3. Verify backend is accessible
4. Check backend logs if available
5. Try different browser/incognito mode
