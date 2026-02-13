# Frontend Implementation - Option B (With Polling)

## Overview
Frontend submits verification request, then polls backend every 5 seconds for 20 minutes to check transaction status. If confirmed, shows success screen immediately. User also receives email confirmation.

---

## Files to Modify

### 1. lib/utils/validation.ts
### 2. components/v2/payment/bank-transfer.tsx
### 3. components/v2/payment/verification-pending.tsx (NEW)
### 4. app/payment/[id]/page.tsx

---

## Implementation Steps

See individual file changes below.
