# Backend Implementation - Option B (With Polling)

## Overview
Backend handles all verification:
1. Immediate verification: 15 minutes, every 3 seconds
2. Hourly cron job: After 15 minutes, checks every 1 hour until 24 hours
3. Status endpoint: For frontend polling
4. Email notifications: Sends receipt when confirmed

---

## Files to Create/Modify

### 1. models/Transaction.ts - Add new fields
### 2. services/verification.service.ts (NEW)
### 3. services/email.service.ts (NEW)
### 4. routes/transactions.ts - Add endpoints
### 5. cron/verify-pending-transactions.ts (NEW)
### 6. server.ts - Start cron job
### 7. .env - Add environment variables

---

## Implementation Steps

See individual file changes below.
