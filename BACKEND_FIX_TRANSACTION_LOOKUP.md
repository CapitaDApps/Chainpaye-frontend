# Fix: Transaction Lookup Issue

## Problem
Frontend sends transaction ID but backend can't find it.

## Root Cause
The `id` parameter might be either:
- MongoDB `_id` field
- Transaction `reference` field

Backend needs to check both.

---

## Solution: Update Backend Endpoints

### File: `routes/transactions.ts`

Update both endpoints to search by both `_id` and `reference`:

```typescript
import mongoose from 'mongoose';

// POST /api/v1/transactions/:id/verify
router.post('/:id/verify', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      senderName, 
      senderPhone, 
      senderEmail,
      currency,
      txid,
      paymentType,
      amount,
      successUrl,
      paymentLinkId
    } = req.body;
    
    // Parse Authorization header
    const auth = parseBasicAuth(req.headers.authorization);
    
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: 'Admin credentials required'
      });
    }
    
    // Find transaction by either _id or reference
    let transaction;
    
    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      transaction = await Transaction.findOne({
        $or: [
          { _id: id },
          { reference: id }
        ]
      });
    } else {
      // If not a valid ObjectId, only search by reference
      transaction = await Transaction.findOne({ reference: id });
    }
    
    if (!transaction) {
      console.error(`Transaction not found with id: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    console.log(`Found transaction: ${transaction._id}, reference: ${transaction.reference}`);
    
    // Save all info needed for verification
    transaction.payerInfo = {
      name: senderName,
      phone: senderPhone,
      email: senderEmail,
    };
    transaction.toronetReference = txid;
    transaction.verificationStartedAt = new Date();
    transaction.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    transaction.metadata = {
      ...transaction.metadata,
      paymentType,
      successUrl,
      paymentLinkId,
    };
    
    await transaction.save();
    
    console.log(`Verification request received for transaction ${id}`);
    
    // Start immediate verification (15 minutes, every 3 seconds)
    startImmediateVerification(transaction);
    
    return res.status(200).json({
      success: true,
      message: 'Verification started. You will receive an email confirmation.',
      data: {
        transactionId: transaction.reference,
        email: senderEmail,
      }
    });
    
  } catch (error) {
    console.error('Error submitting verification:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit verification request',
      error: error.message
    });
  }
});

// GET /api/v1/transactions/:id/status
router.get('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Parse Authorization header
    const auth = parseBasicAuth(req.headers.authorization);
    
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: 'Admin credentials required'
      });
    }
    
    // Find transaction by either _id or reference
    let transaction;
    
    // Check if id is a valid MongoDB ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      transaction = await Transaction.findOne({
        $or: [
          { _id: id },
          { reference: id }
        ]
      });
    } else {
      // If not a valid ObjectId, only search by reference
      transaction = await Transaction.findOne({ reference: id });
    }
    
    if (!transaction) {
      console.error(`Transaction not found with id: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    return res.status(200).json({
      success: true,
      data: {
        transactionId: transaction.reference,
        state: transaction.state,
        amount: transaction.amount,
        currency: transaction.currency,
        paidAt: transaction.paidAt,
        senderName: transaction.payerInfo?.name,
      }
    });
    
  } catch (error) {
    console.error('Error checking transaction status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check transaction status',
      error: error.message
    });
  }
});
```

---

## Alternative: Check What Frontend Sends

Add logging to see what the frontend is actually sending:

```typescript
router.post('/:id/verify', async (req, res) => {
  const { id } = req.params;
  
  console.log('=== VERIFY ENDPOINT DEBUG ===');
  console.log('Received ID:', id);
  console.log('ID type:', typeof id);
  console.log('Is valid ObjectId:', mongoose.Types.ObjectId.isValid(id));
  
  // Try to find by _id
  const byId = await Transaction.findById(id);
  console.log('Found by _id:', byId ? 'YES' : 'NO');
  
  // Try to find by reference
  const byRef = await Transaction.findOne({ reference: id });
  console.log('Found by reference:', byRef ? 'YES' : 'NO');
  
  // List all transactions (for debugging)
  const allTransactions = await Transaction.find().limit(5);
  console.log('Sample transactions:', allTransactions.map(t => ({
    _id: t._id,
    reference: t.reference
  })));
  console.log('=== END DEBUG ===');
  
  // ... rest of code
});
```

This will help you see:
1. What ID the frontend is sending
2. Whether it exists as `_id` or `reference`
3. What transactions actually exist in the database

---

## Quick Fix: Use Mock Mode

While debugging the backend, you can use mock mode in the frontend:

**File: `app/payment/[id]/page.tsx`**

Change line ~430:
```typescript
const MOCK_MODE = true; // Enable mock mode for testing
```

This will let you test the frontend UI while you fix the backend.

---

## Summary

The issue is likely one of these:
1. ✅ Route not registered (check server.ts)
2. ✅ Transaction lookup using wrong field (_id vs reference)
3. ✅ Transaction doesn't exist in database

Use the debug logging above to identify which one, then apply the appropriate fix!
