export function isRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function passwordsMatch(password: string, confirmation: string): boolean {
  return password === confirmation;
}
