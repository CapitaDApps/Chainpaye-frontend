# Payment Initialization Error Guide

## Issue
Card payments fail with "Card payment redirect URL not available" when payment initialization fails.

## Root Cause
The error occurs when the backend API call to Toronet fails during payment initialization, resulting in:
- `paymentInitialization.status = "FAILED"`
- `toronetResponse` contains error information instead of payment details
- No `url` field available for card payment redirect

## Example Error Response
```json
{
  "paymentInitialization": {
    "status": "FAILED",
    "toronetResponse": {
      "success": false,
      "error": "write EPROTO 402CB6DEDC7D0000:error:0A000458:SSL routines:ssl3_read_bytes:tlsv1 unrecognized name",
      "message": "Toronet API call failed: SSL error"
    }
  }
}
```

## Implemented Solutions

### 1. Early Detection of Failed Initialization
Added check during payment data fetch:
```javascript
// Check if payment initialization failed
if (data.paymentInitialization?.status === 'FAILED') {
  const errorMsg = data.paymentInitialization.toronetResponse?.message || 
                  data.paymentInitialization.toronetResponse?.error || 
                  'Payment initialization failed';
  throw new Error(`Payment setup failed: ${errorMsg}`);
}
```

### 2. Enhanced Card Payment Error Handling
Added specific check before attempting redirect:
```javascript
// Check if payment initialization was successful
if (paymentData?.paymentInitialization?.status === 'FAILED') {
  const errorMsg = paymentData.paymentInitialization.toronetResponse?.message || 
                  paymentData.paymentInitialization.toronetResponse?.error || 
                  'Payment initialization failed';
  alert(`Payment setup failed: ${errorMsg}. Please try creating a new payment link.`);
  return;
}
```

### 3. Visual Error Indicators
Added error warning in method selection:
- Shows red warning box when initialization fails
- Displays error message from API response
- Disables Pay button when initialization failed
- Changes button text to "Payment Setup Failed"

### 4. Updated TypeScript Interfaces
Enhanced interfaces to handle failed responses:
```typescript
toronetResponse: {
  // Success fields (optional)
  result?: boolean;
  txid?: string;
  instruction?: string;
  url?: string;
  
  // Error fields
  success?: boolean;
  error?: string;
  message?: string;
}
```

## Common Causes of Initialization Failure

### 1. SSL/TLS Issues
- **Error**: `SSL routines:ssl3_read_bytes:tlsv1 unrecognized name`
- **Cause**: SSL certificate or TLS configuration issues
- **Solution**: Check Toronet API SSL configuration

### 2. Network Connectivity
- **Error**: Connection timeout or network errors
- **Cause**: Network issues between backend and Toronet API
- **Solution**: Check network connectivity and firewall settings

### 3. API Authentication
- **Error**: Authentication failed
- **Cause**: Invalid API credentials or expired tokens
- **Solution**: Verify Toronet API credentials

### 4. Invalid Payment Parameters
- **Error**: Invalid request parameters
- **Cause**: Incorrect payment amount, currency, or other parameters
- **Solution**: Validate payment parameters before API call

## User Experience Improvements

### Before Fix:
- User could select card payment
- Clicking Pay would show generic "redirect URL not available" error
- No indication of what went wrong
- Confusing user experience

### After Fix:
- Clear error message shown immediately when page loads
- Payment methods disabled when initialization fails
- Specific error details displayed
- Clear instruction to create new payment link
- Pay button disabled with descriptive text

## Debugging Steps

### 1. Check Payment Initialization Status
Look for these console logs:
```
"Payment initialization failed:" - Shows failed initialization details
"Cannot proceed with card payment - initialization failed:" - Shows card payment block
```

### 2. Check API Response
Verify the API response contains:
```json
{
  "paymentInitialization": {
    "status": "SUCCESS", // Should be SUCCESS, not FAILED
    "toronetResponse": {
      "url": "https://payment-provider.com/..." // Should contain redirect URL
    }
  }
}
```

### 3. Check Error Details
If initialization fails, check:
- `toronetResponse.error` - Technical error details
- `toronetResponse.message` - User-friendly error message
- Backend logs for Toronet API call failures

## Prevention Strategies

### 1. Backend Improvements
- Add retry logic for Toronet API calls
- Implement proper SSL/TLS configuration
- Add connection pooling and timeout handling
- Validate parameters before API calls

### 2. Frontend Resilience
- ✅ Early error detection (implemented)
- ✅ User-friendly error messages (implemented)
- ✅ Graceful degradation (implemented)
- ✅ Clear recovery instructions (implemented)

### 3. Monitoring
- Monitor payment initialization success rates
- Alert on high failure rates
- Track specific error types
- Monitor SSL certificate expiration

## Recovery Instructions for Users

When payment initialization fails:
1. **Try refreshing the page** - May resolve temporary issues
2. **Create a new payment link** - Recommended solution
3. **Contact support** - If problem persists
4. **Check payment parameters** - Ensure amount and currency are valid

## Technical Recovery

### For SSL Errors:
1. Check Toronet API SSL certificate
2. Verify TLS configuration
3. Update SSL certificates if expired
4. Check firewall and proxy settings

### For Network Errors:
1. Check network connectivity
2. Verify DNS resolution
3. Check firewall rules
4. Monitor network latency

### For Authentication Errors:
1. Verify API credentials
2. Check token expiration
3. Refresh authentication tokens
4. Verify API permissions

This implementation provides a much better user experience by catching initialization failures early and providing clear guidance on how to resolve the issue.