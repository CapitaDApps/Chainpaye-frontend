# SSL Error Troubleshooting Guide

## Current Error
```
Error: Payment setup failed: Toronet API call failed: write EPROTO 402CB6DEDC7D0000:error:0A000458:SSL routines:ssl3_read_bytes:tlsv1 unrecognized name:../deps/openssl/openssl/ssl/record/rec_layer_s3.c:1605:SSL alert number 112
```

## Error Analysis

### SSL Alert Number 112
- **Alert Code**: 112 = `unrecognized_name`
- **Meaning**: The server doesn't recognize the hostname in the SNI (Server Name Indication)
- **Common Cause**: Hostname mismatch or SSL certificate configuration issue

### Error Components
1. **`EPROTO`**: Protocol error during SSL handshake
2. **`ssl3_read_bytes`**: Error occurred while reading SSL data
3. **`tlsv1 unrecognized name`**: Server doesn't recognize the hostname
4. **`SSL alert number 112`**: Server sent "unrecognized_name" alert

## Root Causes & Solutions

### 1. Hostname/SNI Mismatch
**Problem**: The hostname in the request doesn't match the SSL certificate

**Solutions**:
```javascript
// Option 1: Use correct hostname
const TORONET_API_URL = 'https://correct-hostname.toronet.org/api';

// Option 2: Disable SNI (not recommended for production)
const https = require('https');
const agent = new https.Agent({
  servername: '', // Disable SNI
});

// Option 3: Override servername
const agent = new https.Agent({
  servername: 'correct-hostname.toronet.org',
});
```

### 2. SSL Certificate Issues
**Problem**: Invalid, expired, or misconfigured SSL certificate

**Check Certificate**:
```bash
# Check SSL certificate
openssl s_client -connect api.toronet.org:443 -servername api.toronet.org

# Check certificate details
curl -vI https://api.toronet.org/
```

**Solutions**:
- Verify certificate is valid and not expired
- Ensure certificate matches the hostname
- Check certificate chain is complete

### 3. TLS Version Mismatch
**Problem**: Client and server TLS versions incompatible

**Solutions**:
```javascript
// Force specific TLS version
const https = require('https');
const agent = new https.Agent({
  secureProtocol: 'TLSv1_2_method', // or TLSv1_3_method
});

// Allow multiple TLS versions
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // NOT for production
```

### 4. Firewall/Proxy Issues
**Problem**: Corporate firewall or proxy interfering with SSL

**Solutions**:
- Check firewall rules for HTTPS traffic
- Configure proxy settings if needed
- Whitelist Toronet API domains

## Backend Implementation Fixes

### 1. Enhanced Error Handling
```javascript
const https = require('https');
const fetch = require('node-fetch');

// Create custom agent with better SSL handling
const httpsAgent = new https.Agent({
  keepAlive: true,
  timeout: 30000,
  // Add these for SSL issues:
  rejectUnauthorized: true, // Keep true for security
  servername: 'api.toronet.org', // Match certificate hostname
});

// Enhanced fetch with retry logic
async function callToronetAPI(endpoint, data, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://api.toronet.org${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'YourApp/1.0',
        },
        body: JSON.stringify(data),
        agent: httpsAgent,
        timeout: 30000,
      });
      
      return await response.json();
    } catch (error) {
      console.error(`Toronet API call attempt ${i + 1} failed:`, error.message);
      
      if (i === retries - 1) throw error;
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}
```

### 2. SSL Configuration Options
```javascript
// Option A: Strict SSL (recommended)
const strictAgent = new https.Agent({
  rejectUnauthorized: true,
  checkServerIdentity: (hostname, cert) => {
    // Custom hostname verification if needed
    return undefined; // No error
  },
});

// Option B: Relaxed SSL (development only)
const relaxedAgent = new https.Agent({
  rejectUnauthorized: false, // NEVER use in production
});

// Option C: Custom certificate handling
const fs = require('fs');
const customAgent = new https.Agent({
  ca: fs.readFileSync('path/to/ca-certificate.pem'),
  cert: fs.readFileSync('path/to/client-certificate.pem'),
  key: fs.readFileSync('path/to/client-key.pem'),
});
```

### 3. Environment-Specific Configuration
```javascript
// config/ssl.js
const https = require('https');

function createSSLAgent() {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (isProduction) {
    return new https.Agent({
      rejectUnauthorized: true,
      servername: process.env.TORONET_HOSTNAME || 'api.toronet.org',
      timeout: 30000,
    });
  } else {
    // Development - more lenient
    return new https.Agent({
      rejectUnauthorized: false,
      timeout: 10000,
    });
  }
}

module.exports = { createSSLAgent };
```

## Environment Variables to Add

```bash
# .env
TORONET_API_URL=https://api.toronet.org
TORONET_HOSTNAME=api.toronet.org
TORONET_SSL_VERIFY=true
TORONET_TIMEOUT=30000
```

## Debugging Steps

### 1. Test SSL Connection
```bash
# Test basic connectivity
curl -v https://api.toronet.org/

# Test with specific TLS version
curl --tlsv1.2 -v https://api.toronet.org/

# Test certificate chain
openssl s_client -connect api.toronet.org:443 -showcerts
```

### 2. Node.js SSL Debugging
```javascript
// Enable SSL debugging
process.env.NODE_DEBUG = 'tls';

// Or more verbose
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Temporary for debugging
```

### 3. Check DNS Resolution
```bash
# Check DNS
nslookup api.toronet.org
dig api.toronet.org

# Check from your server
node -e "console.log(require('dns').lookup('api.toronet.org', console.log))"
```

## Immediate Fixes to Try

### 1. Update Toronet API Call
```javascript
// In your backend API route
const https = require('https');

const agent = new https.Agent({
  servername: 'api.toronet.org', // Explicit servername
  timeout: 30000,
});

const response = await fetch(TORONET_URL, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Host': 'api.toronet.org', // Explicit host header
  },
  body: JSON.stringify(requestData),
  agent: agent,
});
```

### 2. Add Retry Logic
```javascript
async function callToronetWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fetch(url, options);
    } catch (error) {
      if (error.code === 'EPROTO' && i < maxRetries - 1) {
        console.log(`SSL error, retrying... (${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, 2000));
        continue;
      }
      throw error;
    }
  }
}
```

### 3. Fallback Configuration
```javascript
// Try different SSL configurations
const sslConfigs = [
  { rejectUnauthorized: true, servername: 'api.toronet.org' },
  { rejectUnauthorized: true, servername: '' },
  { rejectUnauthorized: false }, // Last resort
];

for (const config of sslConfigs) {
  try {
    const agent = new https.Agent(config);
    const response = await fetch(url, { ...options, agent });
    return response;
  } catch (error) {
    console.log(`SSL config failed:`, config, error.message);
  }
}
```

## Contact Toronet Support

If the issue persists, contact Toronet support with:
1. **Error details**: Full SSL error message
2. **Client info**: Your server's IP address and location
3. **Request details**: Exact API endpoint and request format
4. **SSL test results**: Output from `openssl s_client` command

## Monitoring & Prevention

1. **SSL Certificate Monitoring**: Set up alerts for certificate expiration
2. **Health Checks**: Regular API connectivity tests
3. **Error Tracking**: Monitor SSL error rates
4. **Fallback Mechanisms**: Implement graceful degradation

This SSL error is typically resolved by correcting the hostname/certificate configuration on either the client or server side.