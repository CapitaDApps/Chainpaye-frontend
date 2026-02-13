# Payment Verification Quick Reference

## Quick Start

### When User Clicks "I've Sent the Money"

1. **Validate** sender name and phone
2. **Start** verification polling
3. **Show** confirming screen
4. **Poll** Toronet API every 5 seconds
5. **Wait** for success response
6. **Save** transaction to database
7. **POST** to success URL
8. **Show** receipt
9. **Redirect** to success URL

## API Endpoints

### 1. Toronet Verification
```
POST https://www.toronet.org/api/payment/toro/
Headers: admin, adminpwd
Body: {op: "recordfiattransaction", params: [...]}
Poll: Every 5 seconds until success
```

### 2. Save Transaction
```
POST {API_BASE_URL}/api/v1/record-transaction/{transactionId}
Headers: admin, adminpwd
Body: {amount, currency, senderName, senderPhone, paidAt}
```

### 3. Success Notification
```
POST {paymentData.successUrl}
Body: {paymentLinkId, transactionId, amount, currency, ...}
Timeout: 8 seconds
```

## Key Parameters

### From Payment Data
- `currency`: "NGN", "USD", "GBP", "EUR"
- `txid`: Transaction ID from Toronet (e.g., "0101848843_987...")
- `paymenttype`: "bank" or "card"
- `transactionId`: Database transaction ID
- `successUrl`: Merchant's webhook URL

### From User Input
- `senderName`: User's full name (validated, sanitized)
- `senderPhone`: User's phone number (validated, sanitized)

## Success Criteria

Payment is confirmed when Toronet API returns:
- `success === true` OR
- `result === true` OR
- `status === 'completed'`

## Error Handling

| Error Type | Action |
|------------|--------|
| Network error | Continue polling (SWR retries) |
| Timeout (15 min) | Show error, stop polling |
| Already recorded | Treat as success, continue |
| Success URL fails | Log error, redirect anyway |

## Timeouts

- **Polling interval**: 5 seconds
- **Verification timeout**: 15 minutes
- **Success URL POST**: 8 seconds
- **Auto-redirect**: 3 seconds after success

## SWR Configuration

```typescript
{
  refreshInterval: 5000,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  shouldRetryOnError: true,
  errorRetryInterval: 5000,
  dedupingInterval: 2000,
}
```

## State Flow

```
loading → method → bank-details → confirming → success
                                      ↓
                                    error
```

## Testing Checklist

- [ ] Sender validation works
- [ ] Polling starts on button click
- [ ] Confirming screen shows
- [ ] Toronet API called with correct params
- [ ] Polling stops on success
- [ ] Transaction saved to database
- [ ] Success URL receives POST
- [ ] Receipt displays correctly
- [ ] Auto-redirect works
- [ ] Timeout error shows after 15 min
- [ ] "Already recorded" treated as success

## Common Issues

### Polling doesn't start
- Check `isVerifying` state is true
- Verify `params` object has currency, txid, paymenttype
- Check SWR is enabled

### Polling doesn't stop
- Verify success response format
- Check success criteria logic
- Ensure `isSuccess` updates correctly

### Transaction save fails
- Check API_BASE_URL is correct
- Verify admin credentials in headers
- Check transactionId is valid

### Success URL not called
- Verify successUrl exists in payment data
- Check POST request completes
- Review timeout settings

## Debug Commands

```typescript
// Check verification params
console.log('Verification params:', {
  currency: paymentData.currency,
  txid: paymentData.paymentInitialization.toronetResponse.txid,
  paymenttype: paymentData.paymentType
});

// Check SWR state
console.log('SWR state:', { data, error, isSuccess, isValidating });

// Check transaction data
console.log('Transaction data:', {
  transactionId: paymentData.transactionId,
  amount: paymentData.amount,
  currency: paymentData.currency,
  senderName,
  senderPhone
});
```

## Environment Variables

```bash
# Required
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_TORONET_ADMIN=//
NEXT_PUBLIC_TORONET_ADMIN_PWD=//
```

## File Locations

- Hook: `lib/hooks/usePaymentVerification.ts`
- Page: `app/payment/[id]/page.tsx`
- Utilities: `lib/utils/api.ts`, `lib/utils/validation.ts`
- Components: `components/v2/payment/confirmation-success.tsx`
