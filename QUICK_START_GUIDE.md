# Quick Start Guide - Option B Implementation

## ✅ What's Done

### Frontend (Complete)
All frontend changes have been implemented:
- ✅ Email field added to bank transfer form
- ✅ Email validation added
- ✅ Verification pending screen created
- ✅ Status polling implemented (every 5 seconds for 20 minutes)
- ✅ Success screen shows when payment confirmed

### Backend (Needs Implementation)
Backend code is ready to copy/paste. See files:
- `BACKEND_CODE_COMPLETE.txt` - Part 1 (services)
- `BACKEND_CODE_PART2.txt` - Part 2 (routes, cron, config)

---

## 🚀 How It Works

### User Flow:
1. User enters name, phone, **email** on bank transfer form
2. User clicks "I've sent the money"
3. Frontend submits to `/api/v1/transactions/:id/verify`
4. Frontend shows "Verifying..." screen
5. Frontend polls `/api/v1/transactions/:id/status` every 5 seconds
6. **If confirmed within 20 minutes:** Frontend shows success immediately
7. **If not confirmed:** User can close page, will receive email

### Backend Flow:
1. `/verify` endpoint saves sender info
2. Starts immediate verification (15 min, every 3 seconds)
3. Cron job continues hourly checks (after 15 min, until 24 hours)
4. When confirmed:
   - Atomic update (prevents duplicates)
   - Email sent with receipt
   - Webhook called to successUrl
5. After 24 hours: Expiration email sent

---

## 📋 Backend Implementation Checklist

### Step 1: Install Dependencies
```bash
npm install nodemailer @types/nodemailer
```

### Step 2: Create New Files
Copy code from `BACKEND_CODE_COMPLETE.txt` and `BACKEND_CODE_PART2.txt`:

- [ ] `services/verification.service.ts`
- [ ] `services/email.service.ts`
- [ ] `cron/verify-pending-transactions.ts`

### Step 3: Update Existing Files

**models/Transaction.ts:**
- [ ] Add 3 new fields: `lastVerificationCheck`, `expiresAt`, `verificationStartedAt`
- [ ] Add 2 new indexes

**routes/transactions.ts:**
- [ ] Add `POST /api/v1/transactions/:id/verify` endpoint
- [ ] Add `GET /api/v1/transactions/:id/status` endpoint
- [ ] Add `startImmediateVerification` helper function
- [ ] Import verification service at top

**server.ts:**
- [ ] Import `startVerificationCron`
- [ ] Call `startVerificationCron()` on startup

**.env:**
- [ ] Add `GMAIL_USER`
- [ ] Add `GMAIL_APP_PASSWORD`
- [ ] Add `TORONET_ADMIN`
- [ ] Add `TORONET_ADMIN_PWD`

### Step 4: Get Gmail App Password
1. [ ] Enable 2FA on Google account
2. [ ] Go to https://myaccount.google.com/apppasswords
3. [ ] Generate app password for "Mail"
4. [ ] Copy 16-character password to `.env`

### Step 5: Test
- [ ] Submit payment verification request
- [ ] Check console logs (should see "Starting immediate verification")
- [ ] Verify checks happen every 3 seconds
- [ ] Wait 15 minutes, verify cron job takes over
- [ ] Confirm email is sent when payment confirmed
- [ ] Test expiration email (set expiresAt to past date)

---

## 🔍 Verification Timeline

```
0 seconds:    User clicks "I've sent money"
              ↓
              Frontend submits to /verify
              ↓
              Backend starts immediate verification
              ↓
0-15 min:     Check Toronet API every 3 seconds
              Frontend polls status every 5 seconds
              ↓
15 min:       Immediate verification stops
              Frontend polling stops at 20 min
              ↓
15 min-24h:   Cron job checks every 1 hour
              ↓
24 hours:     Transaction expires
              Expiration email sent
```

---

## 📧 Email Templates

### Confirmation Email:
- Subject: "✅ Payment Confirmed - ChainPaye Receipt"
- Contains: Full receipt with transaction details
- Button: "View Full Receipt" (links to successUrl)

### Expiration Email:
- Subject: "⏰ Payment Verification Expired - ChainPaye"
- Contains: Transaction ID, amount, support contact

---

## 🐛 Troubleshooting

### Email not sending?
- Check Gmail credentials in `.env`
- Verify 2FA is enabled
- Regenerate App Password
- Check console for error messages

### Immediate verification not starting?
- Check `/verify` endpoint logs
- Verify `startImmediateVerification` is called
- Check for errors in console

### Cron job not running?
- Verify `startVerificationCron()` is called in server.ts
- Check console for "Starting verification cron job" message
- Wait 1 hour and check logs

### Frontend not showing success?
- Check `/status` endpoint is working
- Verify polling is active (check console)
- Check transaction state in database

---

## 📁 File Structure

```
backend/
├── models/
│   └── Transaction.ts (MODIFY)
├── services/
│   ├── verification.service.ts (NEW)
│   └── email.service.ts (NEW)
├── cron/
│   └── verify-pending-transactions.ts (NEW)
├── routes/
│   └── transactions.ts (MODIFY)
├── server.ts (MODIFY)
└── .env (MODIFY)

frontend/
├── lib/utils/
│   └── validation.ts (✅ DONE)
├── components/v2/payment/
│   ├── bank-transfer.tsx (✅ DONE)
│   └── verification-pending.tsx (✅ DONE)
└── app/payment/[id]/
    └── page.tsx (✅ DONE)
```

---

## 🎯 Next Steps

1. Review frontend changes (already complete)
2. Copy backend code from provided files
3. Test locally with test payment
4. Deploy to staging
5. Monitor logs and emails
6. Deploy to production

---

## 📞 Support

If you encounter issues:
1. Check console logs (both frontend and backend)
2. Verify environment variables are set
3. Test email sending separately
4. Check database for transaction state
5. Review error messages in logs

---

## ✨ Benefits of Option B

✅ Users who wait see immediate success
✅ Users who leave still get email notification
✅ No race conditions (atomic updates)
✅ Reliable backend verification
✅ Professional email receipts
✅ Webhook integration for merchant systems
✅ Handles edge cases (timeouts, delays, failures)

---

Ready to implement! Start with Step 1 of the checklist above.
