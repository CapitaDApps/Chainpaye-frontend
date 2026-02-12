// Validation utilities for user input

export interface ValidationError {
  field: string;
  message: string;
}

export function validateSenderInfo(name: string, phone: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Validate name
  if (!name || name.trim().length === 0) {
    errors.push({
      field: 'name',
      message: 'Name is required',
    });
  } else if (name.trim().length < 2) {
    errors.push({
      field: 'name',
      message: 'Name must be at least 2 characters',
    });
  } else if (name.trim().length > 100) {
    errors.push({
      field: 'name',
      message: 'Name must be less than 100 characters',
    });
  }

  // Validate phone
  if (!phone || phone.trim().length === 0) {
    errors.push({
      field: 'phone',
      message: 'Phone number is required',
    });
  } else if (!/^[\d\s\-\+\(\)]+$/.test(phone)) {
    errors.push({
      field: 'phone',
      message: 'Phone number can only contain numbers, spaces, and +()-',
    });
  } else if (phone.replace(/[\s\-\+\(\)]/g, '').length < 10) {
    errors.push({
      field: 'phone',
      message: 'Phone number must be at least 10 digits',
    });
  }

  return errors;
}

export function sanitizeName(name: string): string {
  // Remove any potentially harmful characters
  return name
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/\s+/g, ' '); // Normalize whitespace
}

export function sanitizePhoneNumber(phone: string): string {
  // Keep only valid phone number characters
  return phone
    .trim()
    .replace(/[^\d\s\-\+\(\)]/g, '');
}
