# Payment Verification Flow Documentation

## Overview
The payment verification system uses SWR (Stale-While-Revalidate) library to automatically poll the Toronet API until payment is confirmed, then saves the transaction to the database and notifies the success URL.

## Flow Diagram

```
User Clicks "I've Sent the Money"
           ↓
    Validate Sender Info
           ↓
    Show Confirming Screen
           ↓
    Start SWR Polling (Every 5 seconds)
           ↓
┌──────────────────────────────────┐
│  Poll Toronet API                │
│  POST /api/payment/toro/         │
│  {                               │
│    op: "recordfiattransaction",  │
│    params: [currency, txid, type]│
│  }                               │
└──────────────────────────────────┘
           ↓
    ┌─────────────┐
    │  Success?   │
    └─────────────┘
         ↓ No (Retry in 5s)
         ↓ Yes
    Stop Polling
         ↓
┌──────────────────────────────────┐
│  Save to Database                │
│  POST /api/v1/record-transaction │
│  {amount, currency, sender...}   │
└──────────────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  POST to Success URL             │
│  {paymentLinkId, transactionId...}│
└──────────────────────────────────┘
         ↓
    Show Success Page
         ↓
    Redirect to Success URL
```

## Implementation Details

### 1. SWR Configuration

**Library**: `swr` (installed via npm)

**Hook**: `usePaymentVerification` in `lib/hooks/usePaymentVerification.ts`

**Configuration**:
```typescript
{
  refreshInterval: 5000,        // Poll every 5 seconds
  revalidateOnFocus: false,     // Don't revalidate on window focus
  revalidateOnReconnect: true,  // Revalidate when connection restored
  shouldRetryOnError: true,     // Keep retrying on errors
  errorRetryInterval: 5000,     // Retry every 5 seconds on error
  dedupingInterval: 2000,       // Prevent duplicate requests
}
```

### 2. Toronet API Verification

**Endpoint**: `https://www.toronet.org/api/payment/toro/`

**Method**: POST

**Headers**:
```typescript
{
  'Content-Type': 'application/json',
  'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN,
  'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD,
}
```

**Request Body**:
```json
{
  "op": "recordfiattransaction",
  "params": [
    {"name": "currency", "value": "NGN"},
    {"name": "txid", "value": "0101848843_987ba537551348e3814e866350c368e1"},
    {"name": "paymenttype", "value": "bank"}
  ]
}
```

**Success Response**:
```json
{
  "success": true,
  "result": true,
  "status": "completed",
  // ... other fields
}
```

**Success Criteria**:
- `success === true` OR
- `result === true` OR
- `status === 'completed'`

### 3. Save Transaction to Database

**Endpoint**: `POST {API_BASE_URL}/api/v1/record-transaction/{transactionId}`

**Headers**:
```typescript
{
  'Content-Type': 'application/json',
  'admin': process.env.NEXT_PUBLIC_TORONET_ADMIN,
  'adminpwd': process.env.NEXT_PUBLIC_TORONET_ADMIN_PWD,
}
```

**Request Body**:
```json
{
  "amount": "5000",
  "currency": "NGN",
  "senderName": "John Doe",
  "senderPhone": "+234-123-456-7890",
  "paidAt": "2026-02-12T10:30:00.000Z"
}
```

**Error Handling**:
- If response contains "already recorded" → Treat as success
- Log errors but don't block success flow
- Continue to next step regardless

### 4. POST to Success URL

**Endpoint**: `{paymentData.successUrl}` (from payment link data)

**Method**: POST

**Timeout**: 8 seconds

**Request Body**:
```json
{
  "paymentLinkId": "697ecadd88e5e54e39285e80",
  "transactionId": "69813102a20faae6ee89e637",
  "amount": "5000",
  "currency": "NGN",
  "senderName": "John Doe",
  "senderPhone": "+234-123-456-7890",
  "paymentMethod": "bank",
  "status": "completed",
  "paidAt": "2026-02-12T10:30:00.000Z",
  "name": "Blessing Idowu"
}
```

**Behavior**:
- Always redirect to success URL after timeout or completion
- Don't block on POST failure (payment was successful)
- Log errors for monitoring

### 5. Display Success Receipt

**Component**: `SuccessReceipt` in `components/v2/payment/confirmation-success.tsx`

**Data Displayed**:
- Amount and currency
- Transaction ID (reference number)
- Date and time
- Payment method
- Sender name
- Recipient details

**Actions**:
- Download PDF receipt
- Automatic redirect to success URL after 3 seconds

## State Management

### States in Payment Flow

1. **loading**: Initial state, fetching payment data
2. **method**: Selecting payment method
3. **bank-details**: Entering bank transfer details and sender info
4. **confirming**: Polling Toronet API for payment confirmation
5. **success**: Payment confirmed, showing receipt
6. **error**: Error occurred, showing error message

### Key State Variables

```typescript
const [step, setStep] = useState<"method" | "bank-details" | "confirming" | "success" | "loading" | "error">("loading");
const [isVerifying, setIsVerifying] = useState(false);
const [senderName, setSenderName] = useState<string>("");
const [senderPhone, setSenderPhone] = useState<string>("");
const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
```

## Timeout Handling

**Verification Timeout**: 15 minutes

```typescript
const timeout = setTimeout(() => {
  console.log("Payment verification timeout reached");
  setIsVerifying(false);
  setError("Payment verification timed out. Please contact support if your payment was successful.");
  setStep("error");
}, 15 * 60 * 1000); // 15 minutes
```

**Cleanup**: Timeout is cleared on:
- Successful verification
- Component unmount
- User navigates away

## Error Handling

### Verification Errors
- **Network errors**: Continue polling (SWR handles retries)
- **Timeout errors**: Show error message after 15 minutes
- **API errors**: Log and continue polling

### Transaction Save Errors
- **Already recorded**: Treat as success, continue flow
- **Network errors**: Log but don't block success
- **Server errors**: Log but don't block success

### Success URL POST Errors
- **Timeout**: Continue to redirect anyway
- **Network errors**: Log and redirect
- **Server errors**: Log and redirect

## Environment Variables Required

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_TORONET_ADMIN=0x6b03eea493cfeab887f40969e40b069bb334f632
NEXT_PUBLIC_TORONET_ADMIN_PWD=Holland234$
```

## Testing Scenarios

### 1. Successful Payment Flow
1. User enters sender details
2. Clicks "I've sent the money"
3. System polls Toronet API
4. Payment confirmed within 30 seconds
5. Transaction saved to database
6. Success URL notified
7. Receipt displayed
8. Redirect to success URL

### 2. Delayed Payment Confirmation
1. User enters sender details
2. Clicks "I've sent the money"
3. System polls for 5 minutes
4. Payment confirmed after 5 minutes
5. Continue normal flow

### 3. Timeout Scenario
1. User enters sender details
2. Clicks "I've sent the money"
3. System polls for 15 minutes
4. No confirmation received
5. Show timeout error
6. User can contact support

### 4. Already Recorded Transaction
1. Payment confirmed
2. Transaction save returns "already recorded"
3. Treat as success
4. Continue to success URL POST
5. Show receipt

## Performance Considerations

### SWR Benefits
- **Automatic polling**: No manual interval management
- **Deduplication**: Prevents duplicate requests
- **Error retry**: Automatic retry on failures
- **Cache management**: Efficient memory usage
- **Focus revalidation**: Optional revalidation on window focus

### Network Optimization
- **5-second polling interval**: Balance between responsiveness and server load
- **2-second deduplication**: Prevent rapid duplicate requests
- **Timeout handling**: Prevent infinite polling
- **Error retry interval**: 5 seconds between retries

## Monitoring and Analytics

### Events Tracked
- `payment_verification_started`: When polling begins
- `payment_verification_success`: When payment confirmed
- `payment_verification_timeout`: When timeout reached
- `transaction_saved`: When transaction saved to DB
- `transaction_already_recorded`: When transaction already exists
- `validation_error`: When sender info validation fails

### Error Reporting
All errors are reported with context:
- Payment ID
- Transaction ID
- Error message
- Timestamp
- User agent
- Network status

## Security Considerations

1. **API Credentials**: Stored in environment variables
2. **HTTPS Only**: All API calls use HTTPS
3. **Input Sanitization**: Sender name and phone sanitized
4. **Validation**: Server-side validation of all inputs
5. **Rate Limiting**: SWR deduplication prevents abuse
6. **Timeout Protection**: 15-minute maximum polling time

## Future Improvements

1. **Webhook Support**: Replace polling with webhooks for instant confirmation
2. **Progressive Timeout**: Increase polling interval over time
3. **Offline Support**: Queue verification when offline
4. **Push Notifications**: Notify user when payment confirmed
5. **Multi-currency Support**: Enhanced currency handling
6. **Receipt Customization**: Branded receipts per merchant
