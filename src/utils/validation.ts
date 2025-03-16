/**
 * Validates an email address
 * @param email The email to validate
 * @returns Whether the email is valid
 */
export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validates a URL
 * @param url The URL to validate
 * @returns Whether the URL is valid
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates a phone number (basic validation)
 * @param phone The phone number to validate
 * @returns Whether the phone number is valid
 */
export const isValidPhone = (phone: string): boolean => {
  // This is a simple validation that checks for at least 10 digits
  const regex = /^\+?[\d\s-()]{10,}$/;
  return regex.test(phone);
};

/**
 * Validates a password strength
 * @param password The password to validate
 * @param options Options for validation
 * @returns Whether the password meets the requirements
 */
export const isStrongPassword = (
  password: string,
  options = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  }
): boolean => {
  if (password.length < options.minLength) return false;

  if (options.requireUppercase && !/[A-Z]/.test(password)) return false;
  if (options.requireLowercase && !/[a-z]/.test(password)) return false;
  if (options.requireNumbers && !/\d/.test(password)) return false;
  if (
    options.requireSpecialChars &&
    !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
  )
    return false;

  return true;
};

/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value The value to check
 * @returns Whether the value is empty
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
};

/**
 * Validates a credit card number using the Luhn algorithm
 * @param cardNumber The credit card number to validate
 * @returns Whether the credit card number is valid
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  // Remove spaces and dashes
  const sanitized = cardNumber.replace(/[\s-]/g, "");

  // Check if it contains only digits
  if (!/^\d+$/.test(sanitized)) return false;

  // Luhn algorithm
  let sum = 0;
  let double = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(sanitized.charAt(i), 10);

    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
};
