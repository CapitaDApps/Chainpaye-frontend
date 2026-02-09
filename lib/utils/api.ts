export const fetchWithRetry = async (
  url: string, 
  options: RequestInit, 
  retries = 3,
  delay = 1000
): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;
      
      // If it's a client error (4xx), don't retry
      if (response.status >= 400 && response.status < 500) {
        return response;
      }
      
      // For server errors (5xx), retry
      if (i === retries - 1) return response;
      
    } catch (error) {
      if (i === retries - 1) throw error;
    }
    
    // Exponential backoff
    await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
  }
  
  throw new Error('Max retries exceeded');
};

export const handleApiError = (error: any, context?: string): string => {
  console.error(`API Error${context ? ` in ${context}` : ''}:`, error);
  
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'Network connection failed. Please check your internet connection.';
  }
  
  if (error.message?.includes('timeout')) {
    return 'Request timed out. Please try again.';
  }
  
  if (error.status === 404) {
    return 'Payment link not found or has expired.';
  }
  
  if (error.status === 429) {
    return 'Too many requests. Please wait a moment and try again.';
  }
  
  if (error.status >= 500) {
    return 'Server error. Please try again in a few moments.';
  }
  
  return error.message || 'An unexpected error occurred. Please try again.';
};

// Session management
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

export const createSession = (paymentId: string): string => {
  const sessionId = `session_${paymentId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const sessionData = {
    id: sessionId,
    paymentId,
    createdAt: Date.now(),
    lastActivity: Date.now(),
    isActive: true
  };
  
  localStorage.setItem(`payment_session_${paymentId}`, JSON.stringify(sessionData));
  return sessionId;
};

export const validateSession = (paymentId: string): boolean => {
  try {
    const sessionData = localStorage.getItem(`payment_session_${paymentId}`);
    if (!sessionData) return false;
    
    const session = JSON.parse(sessionData);
    const now = Date.now();
    
    // Check if session has expired
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      localStorage.removeItem(`payment_session_${paymentId}`);
      return false;
    }
    
    // Update last activity
    session.lastActivity = now;
    localStorage.setItem(`payment_session_${paymentId}`, JSON.stringify(session));
    
    return session.isActive;
  } catch {
    return false;
  }
};

export const clearSession = (paymentId: string): void => {
  localStorage.removeItem(`payment_session_${paymentId}`);
};

// Analytics and event tracking
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId?: string;
}

export const trackEvent = (event: string, properties: Record<string, any> = {}): void => {
  try {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now()
      },
      timestamp: Date.now()
    };
    
    // Store locally for now - in production, send to analytics service
    const events = JSON.parse(localStorage.getItem('payment_analytics') || '[]');
    events.push(analyticsEvent);
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('payment_analytics', JSON.stringify(events));
    
    // In production, send to analytics service
    // sendToAnalyticsService(analyticsEvent);
  } catch (error) {
    console.warn('Failed to track event:', error);
  }
};

// Error reporting
export const reportError = (error: Error, context?: Record<string, any>): void => {
  try {
    const errorReport = {
      message: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      context: context || {}
    };
    
    // Store locally for now - in production, send to error reporting service
    const errors = JSON.parse(localStorage.getItem('payment_errors') || '[]');
    errors.push(errorReport);
    
    // Keep only last 50 errors
    if (errors.length > 50) {
      errors.splice(0, errors.length - 50);
    }
    
    localStorage.setItem('payment_errors', JSON.stringify(errors));
    
    // In production, send to error reporting service like Sentry
    // Sentry.captureException(error, { extra: context });
    
    console.error('Error reported:', errorReport);
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
};