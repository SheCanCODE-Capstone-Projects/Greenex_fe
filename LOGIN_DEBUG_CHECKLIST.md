# 🔍 Login Not Working - Debug Checklist

## Issue: User stays on signin page after attempting login

### Quick Checks

#### 1. Open Browser Console (F12)
Look for these logs when you click "Sign In":
```
Attempting login with: { email: "..." }
Login response: { ... }
Token stored
User role: ...
Redirecting to ...
```

#### 2. Check for Errors
Look for RED error messages in console:
- ❌ Network errors
- ❌ 401 Unauthorized
- ❌ 403 Forbidden
- ❌ CORS errors
- ❌ Timeout errors

#### 3. Check Network Tab
1. Open DevTools (F12)
2. Go to "Network" tab
3. Click "Sign In"
4. Look for `/api/auth/login` request
5. Check:
   - Status code (should be 200)
   - Response data
   - Request payload

---

## Common Issues & Solutions

### Issue 1: Backend Returns Wrong Format
**Symptom:** Login seems to work but doesn't redirect

**Check backend response format:**
```json
{
  "token": "eyJhbGc...",
  "userId": 123,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "CITIZEN"
}
```

**If backend returns different format, we need to adjust the code.**

### Issue 2: Token Not Stored
**Check in console:**
```javascript
localStorage.getItem('auth_token')
localStorage.getItem('user_info')
```

**Should return:**
- Token: JWT string
- User info: JSON object

### Issue 3: Role Not Detected
**Check console for:**
```
User role: undefined
```

**This means backend didn't return role or it's in wrong format.**

### Issue 4: CORS Error
**Symptom:** Console shows CORS error

**Solution:** Backend needs to allow frontend origin

### Issue 5: 401 Unauthorized
**Symptom:** "Invalid email or password"

**Causes:**
- Wrong credentials
- Account doesn't exist
- Account not verified

---

## Test Backend Directly

Run this in browser console:
```javascript
fetch('https://greenex-be-28wt.onrender.com/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'YOUR_EMAIL',
    password: 'YOUR_PASSWORD'
  })
})
.then(r => r.json())
.then(data => {
  console.log('Backend response:', data);
  console.log('Has token?', !!data.token);
  console.log('Has role?', !!data.role);
  console.log('Role value:', data.role);
})
.catch(err => console.error('Error:', err))
```

---

## What Backend Should Return

### Success Response (200)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 123,
  "email": "user@example.com",
  "fullName": "John Doe",
  "role": "CITIZEN"
}
```

### Error Response (401)
```json
{
  "message": "Invalid credentials",
  "status": 401
}
```

---

## Debug Steps

### Step 1: Check Console Logs
```
✅ "Attempting login with: ..." - Request started
✅ "Login response: ..." - Backend responded
✅ "Token stored" - Token saved
✅ "User role: CITIZEN" - Role detected
✅ "Redirecting to user dashboard" - Navigation started
```

### Step 2: Check localStorage
```javascript
// After login attempt, check:
console.log('Token:', localStorage.getItem('auth_token'));
console.log('User:', localStorage.getItem('user_info'));
```

### Step 3: Check Backend Response
In Network tab, click on `/api/auth/login` request:
- Preview tab: See response data
- Response tab: See raw response
- Headers tab: Check status code

---

## Possible Backend Issues

### 1. Role Field Missing
Backend returns:
```json
{
  "token": "...",
  "user": {
    "role": "CITIZEN"  // ❌ Role is nested
  }
}
```

**Fix needed:** Update frontend to read `response.user.role`

### 2. Role Field Different Name
Backend returns:
```json
{
  "token": "...",
  "userRole": "CITIZEN"  // ❌ Different field name
}
```

**Fix needed:** Update frontend to read `response.userRole`

### 3. Role Value Different
Backend returns:
```json
{
  "token": "...",
  "role": "citizen"  // ❌ Lowercase
}
```

**Fix needed:** Convert to uppercase or update role checks

---

## Quick Fix Test

Try this in browser console after clicking "Sign In":
```javascript
// Check what's in localStorage
console.log('Auth token:', localStorage.getItem('auth_token'));
console.log('User info:', localStorage.getItem('user_info'));

// If token exists but no redirect, manually redirect:
if (localStorage.getItem('auth_token')) {
  const userInfo = JSON.parse(localStorage.getItem('user_info'));
  console.log('User role:', userInfo.role);
  
  // Manual redirect based on role
  if (userInfo.role === 'CITIZEN') {
    window.location.href = '/User-Dashboard';
  } else if (userInfo.role === 'COMPANY_MANAGER') {
    window.location.href = '/wasteCompanyDashboard';
  } else if (userInfo.role === 'ADMIN') {
    window.location.href = '/Supper-dashboard';
  }
}
```

---

## Next Steps

1. **Open browser console (F12)**
2. **Try to login**
3. **Copy all console logs**
4. **Check Network tab for `/api/auth/login` response**
5. **Share the response format**

Then I can adjust the code to match your backend's exact response format.

---

## Expected Console Output

### Successful Login:
```
Attempting login with: { email: "user@example.com" }
Login response: { token: "...", userId: 123, role: "CITIZEN", ... }
Token stored
Decoded token: { role: "CITIZEN", ... }
User role: CITIZEN
User info stored: { userId: 123, email: "...", role: "CITIZEN" }
Redirecting to user dashboard
```

### Failed Login:
```
Attempting login with: { email: "user@example.com" }
Login error details: {
  message: "Invalid credentials",
  response: { message: "Invalid email or password" },
  status: 401
}
```

---

## Contact for Help

If still not working, provide:
1. Console logs (all of them)
2. Network tab response for `/api/auth/login`
3. Any error messages
4. Backend response format

This will help identify the exact issue!
