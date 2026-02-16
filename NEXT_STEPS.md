# Next Steps - Security Implementation

## 📊 Current Status

### ✅ What's Done:
- Documentation files cleaned of credentials
- Security audit completed
- `.env.local` is not tracked in git
- Security documentation created

### ⚠️ What Needs Attention:
- Frontend exposes credentials via `NEXT_PUBLIC_` prefix
- Credentials need to be rotated (password was exposed)
- Backend API proxy needs to be implemented

---

## 🎯 Implementation Plan

### Option 1: Quick Fix (Recommended for Now)
**Keep current architecture, just rotate credentials**

**Time:** 5 minutes
**Risk:** Medium (credentials still exposed, but at least they're new)

**Steps:**
1. Change Toronet admin password
2. Update `.env.local` with new password
3. Test payment flows

**Pros:**
- Quick to implement
- No code changes needed
- Reduces immediate risk

**Cons:**
- Credentials still visible in browser
- Not production-ready
- Still vulnerable to abuse

---

### Option 2: Full Security Fix (Recommended for Production)
**Implement backend API proxy**

**Time:** 1-2 hours
**Risk:** Low (proper security implementation)

**Steps:**
1. Create backend proxy route
2. Remove `NEXT_PUBLIC_` prefix
3. Update frontend API calls
4. Rotate credentials
5. Test thoroughly

**Pros:**
- Production-ready security
- Credentials never exposed to browser
- Industry best practice

**Cons:**
- Requires code changes
- Needs testing
- Takes more time

---

## 🔧 Detailed Implementation: Option 2

### Step 1: Create Backend Proxy Route

**Create `app/api/proxy/toronet/route.ts`:**

```typescript
import { NextRequest, NextResponse } from 'next/server';

// This route proxies requests to your backend API
// Credentials stay server-side and never reach the browser
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { endpoint, method = 'POST', data } = body;
    
    // Server-side only credentials (no NEXT_PUBLIC_)
    const admin = process.env.TORONET_ADMIN;
    const adminpwd = process.env.TORONET_ADMIN_PWD;
    
    if (!admin || !adminpwd) {
      console.error('Missing Toronet credentials in environment');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Validate endpoint is from your backend
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
    if (!endpoint.startsWith(apiBaseUrl)) {
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      );
    }
    
    console.log(`Proxying ${method} request to:`, endpoint);
    
    // Make request to your backend with credentials
    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'admin': admin,
        'adminpwd': adminpwd,
      },
      body: data ? JSON.stringify(data) : undefined,
    });
    
    const result = await response.json();
    
    // Return the response from your backend
    return NextResponse.json(result, { status: response.status });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

// Support GET requests too
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint');
    
    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter required' },
        { status: 400 }
      );
    }
    
    const admin = process.env.TORONET_ADMIN;
    const adminpwd = process.env.TORONET_ADMIN_PWD;
    
    if (!admin || !adminpwd) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    // Validate endpoint
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://chainpaye-backend.onrender.com';
    if (!endpoint.startsWith(apiBaseUrl)) {
      return NextResponse.json(
        { error: 'Invalid endpoint' },
        { status: 400 }
      );
    }
    
    console.log('Proxying GET request to:', endpoint);
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'admin': admin,
        'adminpwd': adminpwd,
      },
    });
    
    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
    
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

---

### Step 2: Update Environment Variables

**Update `.env.local`:**

```env
# API Base URL (public - just a URL)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

# Toronet Credentials (server-side only - NO NEXT_PUBLIC_ prefix)
TORONET_ADMIN=0x6b03eea493cfeab887f40969e40b069bb334f632
TORONET_ADMIN_PWD=your-new-password-here

# Email configuration (if using Nodemailer)
# GMAIL_USER=your-email@gmail.com
# GMAIL_APP_PASSWORD=your-app-password
```

**Important:** Remove `NEXT_PUBLIC_` prefix from credentials!

---

### Step 3: Update Frontend API Calls

**File: `app/payment/[id]/page.tsx`**

#### Change 1: Status Check (Line ~432)

**Before:**
```typescript
const response = await fetch(
  `${apiBaseUrl}/api/v1/transactions/${transactionRef}/status`,
  {
    method: 'GET',
    headers: {
      'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
      'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
    },
  }
);
```

**After:**
```typescript
const response = await fetch(
  `/api/proxy/toronet?endpoint=${encodeURIComponent(`${apiBaseUrl}/api/v1/transactions/${transactionRef}/status`)}`,
  {
    method: 'GET',
  }
);
```

#### Change 2: Verification Submission (Line ~512)

**Before:**
```typescript
const response = await fetchWithRetry(
  `${apiBaseUrl}/api/v1/transactions/${transactionRef}/verify`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
      'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
    },
    body: JSON.stringify({
      senderName: sanitizeName(senderName),
      senderPhone: sanitizePhoneNumber(senderPhone),
      senderEmail: sanitizeEmail(senderEmail),
      currency: paymentData?.currency,
      txid: paymentData?.paymentInitialization?.toronetResponse?.txid,
      paymentType: paymentData?.paymentType,
      amount: paymentData?.amount,
      successUrl: paymentData?.successUrl,
      paymentLinkId: paymentId,
    }),
  },
  2
);
```

**After:**
```typescript
const response = await fetchWithRetry(
  `/api/proxy/toronet`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      endpoint: `${apiBaseUrl}/api/v1/transactions/${transactionRef}/verify`,
      method: 'POST',
      data: {
        senderName: sanitizeName(senderName),
        senderPhone: sanitizePhoneNumber(senderPhone),
        senderEmail: sanitizeEmail(senderEmail),
        currency: paymentData?.currency,
        txid: paymentData?.paymentInitialization?.toronetResponse?.txid,
        paymentType: paymentData?.paymentType,
        amount: paymentData?.amount,
        successUrl: paymentData?.successUrl,
        paymentLinkId: paymentId,
      },
    }),
  },
  2
);
```

#### Change 3: Transaction Recording (Line ~639)

**Before:**
```typescript
return await fetchWithRetry(`${apiBaseUrl}/api/v1/record-transaction/${paymentData.transactionId}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN || '',
    'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD || '',
  },
  body: JSON.stringify(transactionData),
}, 2);
```

**After:**
```typescript
return await fetchWithRetry(`/api/proxy/toronet`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    endpoint: `${apiBaseUrl}/api/v1/record-transaction/${paymentData.transactionId}`,
    method: 'POST',
    data: transactionData,
  }),
}, 2);
```

---

### Step 4: Test Everything

**Test Cases:**
1. ✅ NGN bank transfer payment
2. ✅ USD bank transfer payment
3. ✅ Card payment redirect
4. ✅ Verification submission
5. ✅ Status polling
6. ✅ Transaction recording
7. ✅ Success page display
8. ✅ Error handling

**Verification:**
1. Open browser DevTools → Network tab
2. Make a payment
3. Check requests - should NOT see credentials in headers
4. Check Console - should NOT see credentials logged
5. View page source - should NOT find credentials

---

### Step 5: Deploy to Production

**Environment Variables in Vercel/Hosting:**
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend.com
TORONET_ADMIN=0x...
TORONET_ADMIN_PWD=your-new-password
```

**Important:**
- Do NOT use `NEXT_PUBLIC_` prefix for credentials
- Set these in your hosting platform's environment variables
- Never commit `.env.local` or `.env.production`

---

## 🧪 Testing Checklist

After implementing the proxy:

- [ ] Build succeeds without errors
- [ ] NGN payments work end-to-end
- [ ] USD payments work end-to-end
- [ ] Card payments redirect correctly
- [ ] Verification polling works
- [ ] Success page shows correct data
- [ ] Error handling works properly
- [ ] No credentials visible in browser DevTools
- [ ] No credentials in page source
- [ ] No credentials in JavaScript bundle

---

## 📋 Quick Reference

### Files to Create:
- `app/api/proxy/toronet/route.ts` - NEW proxy route

### Files to Modify:
- `app/payment/[id]/page.tsx` - Update 3 API calls
- `.env.local` - Remove `NEXT_PUBLIC_` prefix

### Environment Variables:
```env
# Before (Insecure)
NEXT_PUBLIC_TORONET_ADMIN=...
NEXT_PUBLIC_TORONET_ADMIN_PWD=...

# After (Secure)
TORONET_ADMIN=...
TORONET_ADMIN_PWD=...
```

---

## 🚨 Important Notes

1. **Rotate credentials** after implementing the proxy
2. **Test thoroughly** before deploying to production
3. **Never commit** `.env.local` or `.env.production`
4. **Set environment variables** in your hosting platform
5. **Monitor logs** for any credential leaks

---

## 📞 Need Help?

- Review `SECURITY_STATUS.md` for current status
- Check `SECURITY_AUDIT_REPORT.md` for detailed findings
- See `SECURITY_CHECKLIST.md` for complete checklist

---

**Recommendation:** Implement Option 2 (Full Security Fix) before production deployment.

**Estimated Time:** 1-2 hours including testing

**Priority:** HIGH - Credentials are currently exposed to browser
