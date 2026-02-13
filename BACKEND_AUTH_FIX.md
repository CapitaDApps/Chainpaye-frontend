# Fix: Backend Authorization Header

## Problem
Frontend sends: `Authorization: Basic base64(admin:password)`
Backend expects: Custom headers `admin` and `adminpwd`

---

## Solution: Update Backend to Parse Authorization Header

### File: `routes/transactions.ts`

Add this helper function at the top of the file:

```typescript
// Helper function to parse Basic Auth from Authorization header
function parseBasicAuth(authHeader: string | undefined): { admin: string; adminpwd: string } | null {
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return null;
  }
  
  try {
    const base64Credentials = authHeader.substring(6); // Remove 'Basic ' prefix
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [admin, adminpwd] = credentials.split(':');
    
    if (!admin || !adminpwd) {
      return null;
    }
    
    return { admin, adminpwd };
  } catch (error) {
    console.error('Error parsing Basic Auth:', error);
    return null;
  }
}
```

Then update BOTH endpoints to use this function:

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
    
    console.log('=== VERIFY ENDPOINT ===');
    console.log('Authorization header:', req.headers.authorization ? 'Present' : 'Missing');
    
    // Parse Authorization header (NEW WAY)
    const auth = parseBasicAuth(req.headers.authorization);
    
    if (!auth) {
      console.error('Failed to parse authorization header');
      return res.status(401).json({
        success: false,
        message: 'Admin credentials required'
      });
    }
    
    console.log('Auth parsed successfully:', { admin: auth.admin });
    
    // Validate credentials (optional - add your validation logic)
    // if (auth.admin !== process.env.TORONET_ADMIN || auth.adminpwd !== process.env.TORONET_ADMIN_PWD) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Invalid credentials'
    //   });
    // }
    
    // Rest of your code...
    const transaction = await Transaction.findOne({ reference: id });
    
    if (!transaction) {
      console.error(`Transaction not found with reference: ${id}`);
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }
    
    // Save sender info
    transaction.payerInfo = {
      name: senderName,
      phone: senderPhone,
      email: senderEmail,
    };
    transaction.toronetReference = txid;
    transaction.verificationStartedAt = new Date();
    transaction.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    transaction.metadata = {
      ...transaction.metadata,
      paymentType,
      successUrl,
      paymentLinkId,
    };
    
    await transaction.save();
    
    console.log('Transaction updated successfully');
    
    // Start immediate verification
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
    console.error('Error in verify endpoint:', error);
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
    
    // Parse Authorization header (NEW WAY)
    const auth = parseBasicAuth(req.headers.authorization);
    
    if (!auth) {
      return res.status(401).json({
        success: false,
        message: 'Admin credentials required'
      });
    }
    
    // Find transaction
    const transaction = await Transaction.findOne({ reference: id });
    
    if (!transaction) {
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
    console.error('Error in status endpoint:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to check transaction status',
      error: error.message
    });
  }
});
```

---

## Option 2: Change Frontend to Use Custom Headers (Not Recommended)

If you can't change the backend, you can change the frontend back to custom headers, but you'll need to update CORS settings.

---

## Test After Fix

1. Restart your backend server
2. Try the payment flow again
3. Check backend console for:
   ```
   === VERIFY ENDPOINT ===
   Authorization header: Present
   Auth parsed successfully: { admin: '0x6b03...' }
   Transaction updated successfully
   ```

If you see "Auth parsed successfully", the fix is working!
