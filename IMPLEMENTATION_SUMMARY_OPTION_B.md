# Implementation Summary - Option B (Frontend Polling + Backend Verification)

## ✅ Frontend Changes Complete

### Files Modified:
1. ✅ `lib/utils/validation.ts` - Added email validation and sanitization
2. ✅ `components/v2/payment/bank-transfer.tsx` - Added email field
3. ✅ `components/v2/payment/verification-pending.tsx` - NEW FILE created
4. ✅ `app/payment/[id]/page.tsx` - Updated with polling logic

### What Changed:
- Removed SWR verification hook
- Added email collection (name, phone, email)
- Frontend submits verification request to backend
- Frontend polls status every 5 seconds for 20 minutes
- Shows "Verifying..." screen with live status
- If confirmed during polling → Shows success immediately
- If not confirmed after 20 minutes → User can close page, will get email

---

## 🔧 Backend Changes Needed

### Files to Create:
1. `services/verification.service.ts` - Shared verification logic
2. `services/email.service.ts` - Email sending with Nodemailer
3. `cron/verify-pending-transactions.ts` - Hourly background checks

### Files to Modify:
1. `models/Transaction.ts` - Add 3 new fields
2. `routes/transactions.ts` - Add 2 new endpoints
3. `server.ts` - Start cron job
4. `.env` - Add Gmail credentials

---

## Backend Implementation Details

### New Transaction Fields:
```typescript
lastVerificationCheck: Date  // Last time we checked Toronet API
expiresAt: Date              // 24 hours from verification start
verificationStartedAt: Date  // When user clicked "I've sent money"
```

### New Endpoints:
1. `POST /api/v1/transactions/:id/verify` - Start verification
2. `GET /api/v1/transactions/:id/status` - Check status (for polling)

### Verification Strategy:


**Phase 1: Immediate Verification (0-15 minutes)**
- Triggered when `/verify` endpoint is called
- Checks Toronet API every 3 seconds
- Runs in background (setInterval)
- Stops after 15 minutes

**Phase 2: Hourly Cron Job (15 min - 24 hours)**
- Runs every 1 hour
- Only checks transactions past 15-minute mark
- Continues until payment confirmed or 24 hours expire

**Phase 3: Expiration (After 24 hours)**
- Transaction marked as PAYOUT_FAILED
- Expiration email sent to user

### When Payment Confirms:
1. Atomic update (`findOneAndUpdate` with `state: PENDING` condition)
2. Email sent with receipt
3. Webhook called to successUrl
4. All verification stops (both immediate and cron)

---

## Environment Variables Needed

**⚠️ SECURITY WARNING:**
- Never commit real credentials to documentation or git
- Use `.env.example` as a template
- Keep actual credentials in `.env.local` (gitignored)
- For production, use your hosting platform's environment variables

Add to `.env`:
```env
# Gmail configuration for Nodemailer
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-char-app-password

# Toronet API credentials
TORONET_ADMIN=your-toronet-admin-address
TORONET_ADMIN_PWD=your-toronet-admin-password
```

### How to Get Gmail App Password:
1. Enable 2-Factor Authentication on Google account
2. Go to https://myaccount.google.com/apppasswords
3. Generate new app password for "Mail"
4. Use that 16-character password in GMAIL_APP_PASSWORD

---

## Installation Steps

### 1. Install Dependencies
```bash
npm install nodemailer @types/nodemailer
```

### 2. Create Service Files
- Copy `services/verification.service.ts` code
- Copy `services/email.service.ts` code
- Copy `cron/verify-pending-transactions.ts` code

### 3. Update Existing Files
- Update `models/Transaction.ts` with new fields
- Update `routes/transactions.ts` with new endpoints
- Update `server.ts` to start cron job

### 4. Configure Environment
- Add Gmail credentials to `.env`
- Test email sending

### 5. Test Flow
1. Submit payment verification
2. Check immediate verification logs (every 3 seconds)
3. Wait 15 minutes, check cron job takes over
4. Verify email is sent when confirmed

---

## Testing Checklist

### Frontend:
- [ ] Email field appears on bank transfer form
- [ ] Email validation works
- [ ] Verification request submits successfully
- [ ] "Verifying..." screen shows with spinner
- [ ] "Checking payment status..." indicator appears
- [ ] Success screen shows when payment confirmed
- [ ] Can close page and reopen without issues

### Backend:
- [ ] `/verify` endpoint saves sender info
- [ ] Immediate verification starts (logs every 3 seconds)
- [ ] `/status` endpoint returns transaction state
- [ ] Atomic update prevents duplicate processing
- [ ] Email sends successfully with receipt
- [ ] Webhook calls successUrl
- [ ] Cron job runs every hour
- [ ] Expiration email sends after 24 hours

---

## Flow Diagram

```
User clicks "I've sent money"
         ↓
Frontend: Submit to /verify endpoint
         ↓
Backend: Save sender info + Start immediate verification
         ↓
Backend: Check Toronet API every 3 seconds (15 min)
         ↓
Frontend: Poll /status every 5 seconds (20 min)
         ↓
    ┌────┴────┐
    ↓         ↓
Confirmed   Not confirmed after 15 min
    ↓         ↓
    ↓    Cron job continues (hourly)
    ↓         ↓
    ↓    ┌────┴────┐
    ↓    ↓         ↓
    ↓ Confirmed  24 hours passed
    ↓    ↓         ↓
    └────┴─→ Email + Webhook
              ↓
         Expiration email
```

---

## Next Steps

1. Review frontend changes (already complete)
2. Implement backend files (see detailed code below)
3. Test locally with test payment
4. Deploy and monitor logs
5. Verify emails are being sent

---

## Detailed Backend Code

See the following files for complete implementation:
- `BACKEND_VERIFICATION_SERVICE.md`
- `BACKEND_EMAIL_SERVICE.md`
- `BACKEND_ROUTES.md`
- `BACKEND_CRON_JOB.md`
