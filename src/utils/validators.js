
export function validateRequired(value) {
  return value && value.trim().length > 0;
}


export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


export function validateMinLength(value, minLength) {
  return value && value.trim().length >= minLength;
}

export function validateMaxLength(value, maxLength) {
  return value && value.trim().length <= maxLength;
}