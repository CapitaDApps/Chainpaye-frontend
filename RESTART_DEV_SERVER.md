# 🔄 Restart Dev Server Required

## ⚠️ Why You're Seeing the Error

The error "header 'admin' is missing" is appearing because:

1. ✅ The code fix is in place
2. ✅ The environment variables are correct
3. ❌ The dev server is using the OLD code/environment

**Solution:** Restart the dev server to load the new code and environment variables.

---

## 🚀 How to Restart

### Step 1: Stop the Current Dev Server

In your terminal where the dev server is running:
- Press `Ctrl + C` to stop it

### Step 2: Start Fresh

```bash
npm run dev
```

### Step 3: Wait for Server to Start

You should see:
```
▲ Next.js 16.1.1
- Local:        http://localhost:3000
- Environments: .env.local

✓ Starting...
✓ Ready in 2.3s
```

### Step 4: Test the Payment Link

1. Open your browser
2. Visit the payment link (e.g., `http://localhost:3000/payment/123`)
3. The page should load without the "admin missing" error

---

## 🔍 What Changed

### Environment Variables:
The credentials were renamed from:
```env
# OLD (exposed to browser)
NEXT_PUBLIC_TORONET_ADMIN=...
NEXT_PUBLIC_TORONET_ADMIN_PWD=...
```

To:
```env
# NEW (server-side only)
TORONET_ADMIN=...
TORONET_ADMIN_PWD=...
```

### Code Changes:
The payment link initialization now reads these server-side variables:
```typescript
const admin = process.env.TORONET_ADMIN;
const adminpwd = process.env.TORONET_ADMIN_PWD;
```

**Important:** Next.js only loads environment variables when the server starts. That's why you need to restart!

---

## ✅ Verification

After restarting, check:

### 1. Server Console
Should see:
```
Fetching payment link from: http://localhost:4000/api/v1/payment-links/123
Payment link fetched successfully
```

Should NOT see:
```
Missing Toronet credentials in environment variables
```

### 2. Browser Console
Should NOT see:
```
Payment Setup Error: header 'admin' is missing
```

### 3. Payment Page
Should see:
- ✅ Payment details loaded
- ✅ Account information displayed
- ✅ No error messages

---

## 🐛 If Still Not Working

### Check 1: Environment Variables Loaded
Add this temporarily to `app/api/v1/payment-links/[id]/route.ts` (line 23):
```typescript
console.log('Credentials check:', {
  hasAdmin: !!admin,
  hasAdminPwd: !!adminpwd,
  adminLength: admin?.length,
});
```

This will show if the credentials are being loaded.

### Check 2: Correct .env.local File
Make sure you're editing the right file:
```bash
# Check if file exists
dir .env.local

# View contents
type .env.local
```

Should show:
```env
TORONET_ADMIN=0x6b03eea493cfeab887f40969e40b069bb334f632
TORONET_ADMIN_PWD=Holland234$
```

### Check 3: No Typos
Common issues:
- ❌ `TORONET_ADMIM` (typo)
- ❌ `TORONET_ADMIN_PASSWORD` (wrong name)
- ✅ `TORONET_ADMIN` (correct)
- ✅ `TORONET_ADMIN_PWD` (correct)

---

## 📝 Quick Checklist

- [ ] Stop dev server (Ctrl + C)
- [ ] Verify `.env.local` has `TORONET_ADMIN` (no NEXT_PUBLIC_)
- [ ] Verify `.env.local` has `TORONET_ADMIN_PWD` (no NEXT_PUBLIC_)
- [ ] Start dev server (`npm run dev`)
- [ ] Wait for "Ready" message
- [ ] Test payment link
- [ ] Verify no "admin missing" error

---

## 🎯 Expected Result

After restart:
1. ✅ Payment link loads successfully
2. ✅ Payment details displayed
3. ✅ No credential errors
4. ✅ All payment flows work

---

## 💡 Why This Happens

Next.js loads environment variables at startup:
```
Server Start → Load .env.local → Keep in memory → Serve requests
```

If you change `.env.local` while the server is running:
```
Server Running → .env.local changed → Server still uses OLD values ❌
```

You must restart:
```
Server Restart → Load NEW .env.local → Use NEW values ✅
```

---

## 🚀 Alternative: Use nodemon (Optional)

To auto-restart on changes, you can use nodemon:

```bash
npm install -D nodemon
```

Update `package.json`:
```json
{
  "scripts": {
    "dev": "nodemon --watch .env.local --exec 'next dev'"
  }
}
```

This will auto-restart when `.env.local` changes.

---

**TL;DR:** Stop the dev server (Ctrl+C) and start it again (`npm run dev`). The error will be gone!
