import type { PasswordIssue } from "@virastack/password/strength";

// The package returns keys; the text is yours (or your i18n library's).
export const passwordMessages: Record<PasswordIssue, string> = {
  "password.tooShort": "Use at least 15 characters.",
  "password.tooLong": "Use at most 64 characters.",
  "password.noLowercase": "Add a lowercase letter.",
  "password.noUppercase": "Add an uppercase letter.",
  "password.noDigit": "Add a digit.",
  "password.noSymbol": "Add a symbol.",
  "password.common": "This password is too common.",
  "password.blocked": "Don't use the product name.",
  "password.repetitive": "Avoid repeats and sequences like aaaa or 1234.",
  "password.containsPersonalInfo": "Don't use your name or email.",
  "password.mismatch": "Passwords don't match.",
};
