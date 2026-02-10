# Card Payment Redirect Debug Guide

## Issue
Card payments are not redirecting to the payment provider.

## Root Cause Analysis
The issue could be in several places:
1. **Method Selection**: Card option not being selectable
2. **Redirect URL**: Missing or incorrect redirect URL in API response
3. **Payment Logic**: handlePay function not executing correctly

## Debugging Steps Added

### 1. Method Selection Debugging
Added console logging to track:
- Which payment methods are available
- When card/bank options are clicked
- Current selected method

**Console logs to look for:**
```
MethodSelection Debug: { selectedMethod, availableMethods, paymentData }
Card option clicked: { availableCard: true/false }
Bank option clicked: { availableBank: true/false }
```

### 2. Payment Handler Debugging
Enhanced the `handlePay` function with detailed logging:
```javascript
console.log("handlePay called with:", { selectedMethod, paymentData });
console.log("Card payment redirect URL:", redirectUrl);
console.log("Payment data for debugging:", {
  redirectUrl: paymentData?.redirectUrl,
  toronetUrl: paymentData?.paymentInitialization?.toronetResponse?.url,
  fullToronetResponse: paymentData?.paymentInitialization?.toronetResponse
});
```

### 3. Interface Fix
Fixed TypeScript interface to use correct field name `url` in `toronetResponse`:
```typescript
toronetResponse: {
  // ... other fields
  url?: string; // For card payments (correct field name)
}
```

## Expected API Response for Card Payments

The API should return a structure like this for card payments:
```json
{
  "success": true,
  "data": {
    "currency": "USD",
    "paymentType": "card", 
    "token": "USD",
    "redirectUrl": "https://payment-provider.com/checkout/...", // Top level
    "paymentInitialization": {
      "toronetResponse": {
        "url": "https://payment-provider.com/checkout/..." // Correct field name
      }
    }
  }
}
```

## Debugging Steps in Production

### 1. Check Browser Console
Look for these specific logs:
- `"MethodSelection Debug:"` - Shows available methods and selection state
- `"handlePay called with:"` - Shows when pay button is clicked
- `"Card payment redirect URL:"` - Shows the URL being used for redirect
- `"Payment data for debugging:"` - Shows all possible redirect URL locations

### 2. Check Method Availability
Verify that card payments are enabled for the currency/payment type:
- **NGN**: Card should be disabled
- **USD Bank**: Card should be disabled  
- **USD/GBP/EUR Card**: Card should be enabled

### 3. Check API Response
Verify the backend API returns the redirect URL in one of these locations:
- `data.redirectUrl`
- `data.paymentInitialization.toronetResponse.url`

### 4. Test Method Selection
- Click on card payment option
- Check console for "Card option clicked" log
- Verify `selectedMethod` becomes "card"
- Check if Pay button becomes enabled

### 5. Test Pay Button
- With card selected, click Pay button
- Check console for "handlePay called with" log
- Look for redirect URL in the debug logs
- Check if `window.location.href` is being set

## Common Issues and Solutions

### Issue 1: Card Option Not Selectable
**Symptoms**: Card option appears grayed out or clicking doesn't select it
**Debug**: Check `availableMethods.card` in console logs
**Solution**: Verify payment type and currency logic

### Issue 2: No Redirect URL
**Symptoms**: "Card payment redirect URL not available" alert
**Debug**: Check API response structure
**Solutions**:
- Verify backend returns redirect URL
- Check if URL is in correct field
- Ensure payment link is for card payment type

### Issue 3: Method Not Selected
**Symptoms**: Pay button remains disabled
**Debug**: Check `selectedMethod` in console logs
**Solution**: Manually click card option or check auto-selection logic

### Issue 4: handlePay Not Called
**Symptoms**: No console logs when clicking Pay
**Debug**: Check if Pay button is enabled and clickable
**Solution**: Ensure a payment method is selected

## Testing Checklist

### For Card Payments:
1. **Create Card Payment Link**: Ensure payment type is "card"
2. **Check Method Selection**: Card option should be available and selectable
3. **Check Auto-Selection**: If only card is available, it should auto-select
4. **Check Pay Button**: Should be enabled when card is selected
5. **Check Redirect**: Should redirect to payment provider URL
6. **Check Console Logs**: All debug logs should appear

### Test URLs to Try:
- Card payment with USD currency
- Card payment with GBP currency  
- Card payment with EUR currency

### Expected Behavior:
1. Card option is available and clickable
2. Selecting card enables Pay button
3. Clicking Pay logs debug info
4. Browser redirects to payment provider
5. No error alerts appear

## Quick Fixes

### If Card Option Not Available:
Check the payment method logic in the payment page around line 560.

### If No Redirect URL:
1. Check API response structure
2. Verify backend returns redirect URL
3. Update field mapping if URL is in different location

### If Selection Not Working:
1. Check console for click events
2. Verify `onSelectMethod` is being called
3. Check if `availableMethods.card` is true

## Development Debug Panel
In development mode, a debug panel shows:
- Selected method
- Available methods
- Currency and payment type

This helps quickly identify configuration issues.