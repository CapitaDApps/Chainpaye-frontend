# Fix: Sender Info Not Saving to Database

## Problem
Frontend sends sender info (name, phone, email) but it's not being saved to the database.

---

## Frontend is Sending (✅ Confirmed)

The frontend now logs and sends:
```javascript
{
  senderName: "John Doe",
  senderPhone: "+1234567890",
  senderEmail: "john@example.com",
  currency: "NGN",
  txid: "0101865530_4bb16a602dca030388cbc66d70821a74",
  paymentType: "bank",
  amount: "50000.00",
  successUrl: "...",
  paymentLinkId: "..."
}
```

---

## Backend Fix Needed

### File: `routes/transactions.ts`

Make sure your `/verify` endpoint saves the sender info correctly:

```typescript
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
    
    console.log('=== VERIFY ENDPOINT DEBUG ===');
    console.log('Transaction ID:', id);
    console.log('Sender Info:', { senderName, senderPhone, senderEmail });
    console.log('Request body:', req.body);
    
    // Parse Authorization header
    const auth = parseBasicAuth(req.headers.authorization);
    
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: 'Admin credentials required'
      });
    }
    
    // Find transaction by reference
    const transaction = await Transaction.findOne({ reference: id });
    
    if (!transaction) {
      console.error(`Transaction not found with reference: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    console.log('Found transaction:', transaction._id);
    
    // IMPORTANT: Save sender info to payerInfo field
    transaction.payerInfo = {
      name: senderName,
      phone: senderPhone,
      email: senderEmail,
    };
    
    // Save toronet reference
    transaction.toronetReference = txid;
    
    // Set verification timestamps
    transaction.verificationStartedAt = new Date();
    transaction.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    // Save metadata
    transaction.metadata = {
      ...transaction.metadata,
      paymentType,
      successUrl,
      paymentLinkId,
    };
    
    // SAVE TO DATABASE
    await transaction.save();
    
    console.log('Transaction updated with sender info');
    console.log('Saved payerInfo:', transaction.payerInfo);
    
    // Start immediate verification
    startImmediateVerification(transaction);
    
    return res.status(200).json({
      success: true,
      message: 'Verification started. You will receive an email confirmation.',
      data: {
        transactionId: transaction.reference,
        email: senderEmail,
        payerInfo: transaction.payerInfo, // Return to confirm it was saved
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
```

---

## Check Transaction Schema

Make sure your Transaction model has the `payerInfo` field defined:

### File: `models/Transaction.ts`

```typescript
export interface IPayerInfo {
  email?: string;
  phone?: string;
  name?: string;
  metadata?: Record<string, any>;
}

const PayerInfoSchema: Schema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  metadata: {
    type: Schema.Types.Mixed,
    default: {}
  }
}, { _id: false });

const TransactionSchema: Schema = new Schema({
  // ... other fields ...
  
  payerInfo: {
    type: PayerInfoSchema,
    default: {}
  },
  
  toronetReference: {
    type: String,
    trim: true,
  },
  
  verificationStartedAt: {
    type: Date,
  },
  
  expiresAt: {
    type: Date,
    index: true,
  },
  
  // ... other fields ...
});
```

---

## Verify It's Working

### Step 1: Check Backend Logs

After submitting the form, check your backend console for:
```
=== VERIFY ENDPOINT DEBUG ===
Transaction ID: TXN_MLKDW0K2_175DB93D
Sender Info: { senderName: 'John Doe', senderPhone: '+1234567890', senderEmail: 'john@example.com' }
Found transaction: 698ea793d1e33d0de161e7ba
Transaction updated with sender info
Saved payerInfo: { name: 'John Doe', phone: '+1234567890', email: 'john@example.com' }
```

### Step 2: Check Database

Query the transaction in MongoDB:
```javascript
db.transactions.findOne({ reference: "TXN_MLKDW0K2_175DB93D" })
```

You should see:
```json
{
  "_id": ObjectId("698ea793d1e33d0de161e7ba"),
  "reference": "TXN_MLKDW0K2_175DB93D",
  "payerInfo": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com"
  },
  "toronetReference": "0101865530_4bb16a602dca030388cbc66d70821a74",
  "verificationStartedAt": ISODate("2026-02-13T05:00:00.000Z"),
  "expiresAt": ISODate("2026-02-14T05:00:00.000Z"),
  // ... other fields
}
```

### Step 3: Check Frontend Response

In browser console, you should see:
```
Verification request submitted: {
  success: true,
  message: "Verification started...",
  data: {
    transactionId: "TXN_MLKDW0K2_175DB93D",
    email: "john@example.com",
    payerInfo: {
      name: "John Doe",
      phone: "+1234567890",
      email: "john@example.com"
    }
  }
}
```

---

## Common Issues

### Issue 1: payerInfo is empty object

**Cause:** Schema doesn't have `payerInfo` field or it's not being saved

**Fix:** Add `payerInfo` field to Transaction schema (see above)

### Issue 2: Transaction not found

**Cause:** Using wrong ID (using `_id` instead of `reference`)

**Fix:** Already fixed in frontend - it now uses `reference` field

### Issue 3: Data not persisting

**Cause:** Not calling `await transaction.save()`

**Fix:** Make sure you call `await transaction.save()` after updating fields

---

## Summary

1. ✅ Frontend sends sender info correctly
2. 🔧 Backend needs to save to `payerInfo` field
3. 🔧 Backend needs to call `transaction.save()`
4. 🔧 Schema needs `payerInfo` field defined

After making these changes, restart your backend and test again!
