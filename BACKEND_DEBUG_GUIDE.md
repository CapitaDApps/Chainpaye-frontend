# Backend Debug Guide

## Issue: 404 Transaction Not Found

The frontend is calling:
```
POST http://localhost:4000/api/v1/transactions/698ea653d1e33d0de161e7ad/verify
```

But getting 404 error.

---

## Possible Causes

### 1. Route Not Registered
The `/verify` endpoint might not be registered in your Express/Fastify app.

### 2. Wrong Route Path
The route might be registered with a different path pattern.

### 3. Transaction Doesn't Exist
The transaction with that reference ID doesn't exist in the database.

---

## Debug Steps

### Step 1: Verify Route is Registered

**Check your server.ts or app.ts:**

```typescript
// Make sure you're importing and using the transactions router
import transactionRoutes from './routes/transactions';

// Register the routes
app.use('/api/v1', transactionRoutes);
// OR
app.use('/api/v1/transactions', transactionRoutes);
```

**Important:** Check if your route is:
- `/api/v1/transactions/:id/verify` (if using `app.use('/api/v1/transactions', ...)`)
- OR `/:id/verify` (if using `app.use('/api/v1', ...)`)

### Step 2: Test the Endpoint Directly

Use curl or Postman to test:

```bash
curl -X POST http://localhost:4000/api/v1/transactions/TEST123/verify \
  -H "Content-Type: application/json" \
  -H "Authorization: Basic BASE64_ENCODED_CREDENTIALS" \
  -d '{
    "senderName": "Test User",
    "senderPhone": "+1234567890",
    "senderEmail": "test@example.com",
    "currency": "NGN",
    "txid": "test-txid",
    "paymentType": "bank",
    "amount": "1000",
    "successUrl": "http://example.com/success",
    "paymentLinkId": "test-payment-link"
  }'
```

Expected responses:
- 404: Route not found (route not registered)
- 401: Unauthorized (route exists, auth failed)
- 404 with "Transaction not found": Route exists, transaction doesn't exist

### Step 3: Check Transaction in Database

The transaction ID being used is: `698ea653d1e33d0de161e7ad`

Check if this transaction exists:

```javascript
// In MongoDB shell or your database client
db.transactions.findOne({ reference: "698ea653d1e33d0de161e7ad" })
```

Or check what the actual reference field looks like:

```javascript
db.transactions.findOne({ _id: ObjectId("698ea653d1e33d0de161e7ad") })
```

---

## Common Issues & Fixes

### Issue 1: Route Path Mismatch

**Problem:** Route is registered as `/transactions/:id/verify` but app.use already has `/api/v1/transactions`

**Fix:**
```typescript
// In routes/transactions.ts
router.post('/:id/verify', async (req, res) => { ... });

// In server.ts
app.use('/api/v1/transactions', transactionRoutes);
```

### Issue 2: Transaction Reference vs _id

**Problem:** Frontend sends transaction `_id` but backend looks for `reference` field

**Fix Option A - Update Backend:**
```typescript
// Try both reference and _id
const transaction = await Transaction.findOne({
  $or: [
    { reference: id },
    { _id: id }
  ]
});
```

**Fix Option B - Check What Frontend Sends:**
The frontend sends `paymentData.transactionId`. Check what this value is:
- Is it the MongoDB `_id`?
- Is it the `reference` field?

### Issue 3: Route Not Registered

**Problem:** Forgot to register the router in main server file

**Fix:**
```typescript
// server.ts
import transactionRoutes from './routes/transactions';

// Add this line
app.use('/api/v1/transactions', transactionRoutes);
```

---

## Quick Test

Add this simple test endpoint to verify routing works:

```typescript
// In routes/transactions.ts
router.get('/test', (req, res) => {
  res.json({ message: 'Transactions route is working!' });
});
```

Then test:
```bash
curl http://localhost:4000/api/v1/transactions/test
```

If this works, your routing is correct and the issue is with the specific endpoint.

---

## Next Steps

1. Check your server.ts - is the transactions router registered?
2. Check the route path - does it match the frontend call?
3. Check the database - does the transaction exist?
4. Check the field name - is it `reference` or `_id`?

Once you identify the issue, let me know and I'll help you fix it!
