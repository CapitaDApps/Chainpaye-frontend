# Error Handling Guide

## User-Friendly Error Messages

The payment page now displays user-friendly error messages for various scenarios:

### 1. Payment Link Not Found (404)
**Icon:** 🔍  
**Title:** Payment Link Not Found  
**Message:** This payment link doesn't exist or has expired. Please check the link and try again, or contact the sender for a new payment link.  
**Actions:** Go Back button only

### 2. Payment Link Expired (410)
**Icon:** ⏰  
**Title:** Payment Link Expired  
**Message:** This payment link has expired. Please contact the sender to request a new payment link.  
**Actions:** Go Back button only

### 3. Network/Connection Error
**Icon:** 📡  
**Title:** Connection Error  
**Message:** Unable to connect to the server. Please check your internet connection and try again.  
**Actions:** Try Again + Go Back buttons

### 4. SSL/TLS Security Error
**Icon:** 🔒  
**Title:** Connection Security Error  
**Message:** There's a temporary issue with the secure connection. Please try again in a few minutes.  
**Actions:** Try Again + Go Back buttons

### 5. Request Timeout
**Icon:** ⏱️  
**Title:** Request Timeout  
**Message:** The server is taking too long to respond. Please try again.  
**Actions:** Try Again + Go Back buttons

### 6. Configuration Error
**Icon:** ⚙️  
**Title:** Service Configuration Error  
**Message:** There's a configuration issue with the payment service. Please contact support for assistance.  
**Actions:** Go Back button only

### 7. Payment Setup Failed
**Icon:** ❌  
**Title:** Payment Setup Failed  
**Message:** Unable to initialize the payment. Please try creating a new payment link or contact support.  
**Actions:** Go Back button only

### 8. Generic Error
**Icon:** ⚠️  
**Title:** Something Went Wrong  
**Message:** An unexpected error occurred. Please try again or contact support if the problem persists.  
**Actions:** Try Again + Go Back buttons

## Error State Features

- **Visual Design**: Clean, centered error card with appropriate icons
- **Color Scheme**: Red/orange gradient background for error states
- **Action Buttons**: 
  - "Try Again" button (blue) - shown for recoverable errors
  - "Go Back" button (gray) - always shown
- **Support Link**: Email link to support@chainpaye.com
- **Responsive**: Works on all screen sizes

## API Error Handling

### Frontend (page.tsx)
- Catches HTTP status codes and converts to user-friendly messages
- Handles network errors, timeouts, and SSL errors
- Implements retry logic with exponential backoff
- Logs errors for debugging

### API Route (route.ts)
- Returns specific error messages based on status codes
- Includes debug information in development
- Properly forwards status codes from backend

### Utility Functions (api.ts)
- `handleApiError()`: Converts technical errors to user-friendly messages
- `fetchWithRetry()`: Automatically retries failed requests
- `reportError()`: Logs errors for monitoring

## Testing Error Scenarios

To test different error states:

1. **404 Error**: Use an invalid payment link ID
2. **Network Error**: Disconnect internet and try to load
3. **Timeout**: Set a very short timeout in fetchWithRetry
4. **Server Error**: Backend returns 500 status
5. **Expired Link**: Backend returns 410 status

## Error Tracking

All errors are:
- Logged to console with context
- Tracked via `trackEvent()` for analytics
- Reported via `reportError()` for monitoring
- Include correlation IDs for debugging

## Best Practices

1. **Always show actionable information**: Tell users what went wrong and what they can do
2. **Avoid technical jargon**: Use plain language
3. **Provide next steps**: Clear call-to-action buttons
4. **Include support contact**: Always offer a way to get help
5. **Log everything**: Capture errors for debugging without exposing to users
