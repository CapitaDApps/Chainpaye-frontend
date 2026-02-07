export interface ValidationError {
  field: string;
  message: string;
}

export const validateSenderInfo = (name: string, phone: string): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  // Name validation
  if (!name.trim()) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  } else if (name.trim().length > 50) {
    errors.push({ field: 'name', message: 'Name must be less than 50 characters' });
  } else if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
    errors.push({ field: 'name', message: 'Name can only contain letters, spaces, hyphens, and apostrophes' });
  }
  
  // Phone validation (optional but must be valid if provided)
  if (phone && phone.trim()) {
    const phoneRegex = /^\+?[\d\s\-\(\)]{7,20}$/;
    if (!phoneRegex.test(phone.trim())) {
      errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
    }
  }
  
  return errors;
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/[^\w\s\-'@.+()]/g, ''); // Remove special characters except common ones
};

// Enhanced sanitization for different input types
export const sanitizeEmail = (email: string): string => {
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '');
};

export const sanitizePhoneNumber = (phone: string): string => {
  return phone
    .trim()
    .replace(/[^0-9+\-\s()]/g, '');
};

export const sanitizeName = (name: string): string => {
  return name
    .trim()
    .replace(/[^a-zA-Z\s'-]/g, '')
    .replace(/\s+/g, ' ');
};

export const sanitizeAmount = (amount: string): string => {
  return amount
    .trim()
    .replace(/[^0-9.]/g, '');
};

// Content Security Policy helpers
export const escapeHtml = (text: string): string => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

export const validateCSRFToken = (token: string): boolean => {
  // Basic CSRF token validation
  if (!token) return false;
  if (token.length < 32) return false;
  return /^[a-zA-Z0-9]+$/.test(token);
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters except +
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If it starts with +, keep it, otherwise add country code logic if needed
  return cleaned;
};