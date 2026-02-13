# Complete Backend Implementation Guide - Option B

## Overview
Backend handles all payment verification with two phases:
1. **Immediate verification**: 15 minutes, checks every 3 seconds
2. **Hourly cron job**: After 15 minutes, checks every 1 hour until 24 hours
3. **Status endpoint**: For frontend polling
4. **Email notifications**: Sends receipt when confirmed or expired

---

## Files to Create/Modify

### 1. Update Transaction Model
### 2. Create Verification Service
### 3. Create Email Service  
### 4. Add Transaction Routes
### 5. Create Cron Job
### 6. Update Server Entry Point
### 7. Configure Environment Variables

---

## Step-by-Step Implementation

### STEP 1: Update Transaction Model

**File: `models/Transaction.ts`**

Add these new fields to the schema (after existing fields):

```typescript
lastVerificationCheck: {
  type: Date,
  index: true,
},
expiresAt: {
  type: Date,
  index: true,
},
verificationStartedAt: {
  type: Date,
},
```

Add compound index for cron job queries (after existing indexes):

```typescript
TransactionSchema.index({ state: 1, expiresAt: 1 });
TransactionSchema.index({ state: 1, verificationStartedAt: 1 });
```

---

### STEP 2: Create Verification Service

**File: `services/verification.service.ts`** (NEW FILE)

Create this new file with shared verification logic.

See full implementation in next section.

---

