// API utility functions for handling requests, errors, and tracking

export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 3
): Promise<Response> {
  let lastError: Error | null = null;

  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      return response;
    } catch (error) {
      lastError = error as Error;
      console.error(`Fetch attempt ${i + 1} failed:`, error);
      
      // Wait before retrying (exponential backoff)
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  throw lastError || new Error('Fetch failed after retries');
}

export function handleApiError(error: unknown, context: string): string {
  console.error(`API Error in ${context}:`, error);

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Network error. Please check your internet connection and try again.';
    }
    
    if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      return 'Request timed out. Please try again.';
    }
    
    if (error.message.includes('not found') || error.message.includes('404')) {
      return 'Payment link not found. Please check the link and try again.';
    }
    
    if (error.message.includes('expired') || error.message.includes('410')) {
      return 'This payment link has expired. Please request a new one.';
    }
    
    if (error.message.includes('invalid') || error.message.includes('400')) {
      return 'Invalid payment link. Please check the link and try again.';
    }
    
    if (error.message.includes('SSL') || error.message.includes('TLS') || error.message.includes('EPROTO')) {
      return 'Connection security error. Please try again in a few minutes.';
    }
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('DNS')) {
      return 'Unable to reach payment service. Please check your internet connection.';
    }
    
    if (error.message.includes('500') || error.message.includes('Server error')) {
      return 'Server error. Please try again in a few moments.';
    }
    
    if (error.message.includes('503') || error.message.includes('unavailable')) {
      return 'Payment service is temporarily unavailable. Please try again later.';
    }

    // Return the original error message if it's user-friendly
    if (error.message.length < 200 && !error.message.includes('Error:')) {
      return error.message;
    }
  }

  return 'An unexpected error occurred. Please try again or contact support.';
}

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Log events for debugging
  console.log(`[Event] ${eventName}`, properties);
  
  // You can integrate with analytics services here (e.g., Google Analytics, Mixpanel)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
}

export function reportError(error: Error, context?: Record<string, any>) {
  console.error('[Error Report]', error, context);
  
  // You can integrate with error tracking services here (e.g., Sentry)
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    (window as any).Sentry.captureException(error, { extra: context });
  }
}

// Session management
const SESSION_KEY_PREFIX = 'payment_session_';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export function createSession(paymentId: string): string {
  const sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const sessionData = {
    id: sessionId,
    paymentId,
    createdAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION,
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      `${SESSION_KEY_PREFIX}${paymentId}`,
      JSON.stringify(sessionData)
    );
  }

  return sessionId;
}

export function validateSession(paymentId: string): boolean {
  if (typeof window === 'undefined') return false;

  const sessionData = localStorage.getItem(`${SESSION_KEY_PREFIX}${paymentId}`);
  if (!sessionData) return false;

  try {
    const session = JSON.parse(sessionData);
    return session.expiresAt > Date.now();
  } catch {
    return false;
  }
}

export function clearSession(paymentId: string) {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${SESSION_KEY_PREFIX}${paymentId}`);
  }
}
