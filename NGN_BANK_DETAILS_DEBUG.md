# NGN Bank Details Debug Guide

## Issue
Account details not showing in production for NGN bank transfers.

## Root Cause Analysis
The issue is likely that the backend API is not returning the expected bank details in the structured format. The NGN bank details should be in:
```
paymentData.paymentInitialization.toronetResponse.{
  bankname,
  accountnumber, 
  accountname,
  amount
}
```

## Debugging Steps Added

### 1. Console Logging
Added comprehensive console logging to see what data is being received:
```javascript
console.log("Payment Data Debug:", {
  currency: paymentData.currency,
  paymentType: paymentData.paymentType,
  token: paymentData.token,
  isUSDBank,
  toronetResponse: paymentData.paymentInitialization.toronetResponse,
  ngnBankDetails,
  usdBankDetails,
  isNGNBankDetailsMissing,
  instruction
});
```

### 2. Fallback Display
Added "Loading..." text when bank details are missing instead of showing empty fields.

### 3. Error Message
Added error message when NGN bank details are completely missing with:
- User-friendly error message
- Refresh button
- Debug info (development only)

### 4. Instruction Parsing
Added logic to extract bank details from the `instruction` field if structured fields are missing:
- Extracts account number using regex: `/account.*number[:\s]*(\d+)/i`
- Extracts account name using regex: `/account.*name[:\s]*([^.]+)/i`
- Extracts bank name using regex: `/(\w+\s*Bank)/i`

### 5. Loading State
Added loading indicator when bank details are being fetched.

## How to Debug in Production

### 1. Check Browser Console
Look for "Payment Data Debug:" logs to see:
- What data is being received from the API
- Whether `toronetResponse` contains the expected fields
- Whether the instruction field has the bank details

### 2. Check API Response
Verify the backend API `/api/v1/payment-links/{id}` returns:
```json
{
  "success": true,
  "data": {
    "paymentInitialization": {
      "toronetResponse": {
        "bankname": "FCMB",
        "accountnumber": "0101848843", 
        "accountname": "CapitaDapps Bridge Limited Acct Joseph Paul",
        "amount": 5000,
        "instruction": "Please deposit the amount shown into the account..."
      }
    }
  }
}
```

### 3. Common Issues to Check

#### Backend API Issues:
- Backend not returning structured bank details
- Network timeout causing incomplete responses
- Authentication issues with the backend API

#### Frontend Issues:
- Caching issues (clear browser cache)
- Environment variable issues (API_BASE_URL)
- Network connectivity problems

#### Data Structure Issues:
- Backend returning different field names
- Missing or null values in the response
- Incorrect data types (string vs number)

## Expected Behavior

### For NGN Payments:
- Should show bank name, account name, account number, and amount
- Should display instruction text
- Should allow copying of account details

### For USD Payments:
- Should show Chase Bank details
- Should show transaction ID
- Should display USD-specific instructions

## Testing Steps

1. **Create NGN Payment Link**: Test with NGN currency
2. **Check Console Logs**: Look for debug information
3. **Verify API Response**: Check network tab for API response
4. **Test Fallbacks**: Verify error messages and loading states work
5. **Test Copy Functionality**: Ensure copy buttons work for available fields

## Quick Fixes

### If Bank Details Are in Instruction Only:
The component now tries to extract details from the instruction field automatically.

### If API Returns Different Field Names:
Update the field mapping in the component:
```javascript
const ngnBankDetails = {
  bankName: paymentData.paymentInitialization.toronetResponse.bank_name || "",
  accountNumber: paymentData.paymentInitialization.toronetResponse.account_number || "",
  accountName: paymentData.paymentInitialization.toronetResponse.account_name || "",
  amount: paymentData.paymentInitialization.toronetResponse.amount || 0,
};
```

### If Amount is Wrong:
The component now falls back to `paymentData.amount` if `toronetResponse.amount` is missing.

## Monitoring

The component now provides better error handling and user feedback, making it easier to identify and resolve issues in production.