/**
 * Login Module Exports
 * Centralized exports for all login components and utilities
 */

// Components
export { FormInput } from './FormInput';
export { LoginForm } from './LoginForm';
export { PasswordInput } from './PasswordInput';
export { SocialLoginButtons } from './SocialLoginButtons';

// Hooks
export { useLoginForm } from './useLoginForm';

// Types
export type {
  FormInputProps,
  LoginFormData,
  LoginFormProps,
  LoginPageProps,
  LoginResponse,
  PasswordInputProps,
  ValidationResult,
} from './types';

// Utilities
export {
  sanitizeInput,
  validateEmail,
  validateLoginForm,
  validatePassword,
} from './validation';

// Constants
export {
  FORM_CONFIG,
  LOGIN_ERRORS,
  LOGIN_LABELS,
  LOGIN_PLACEHOLDERS,
  LOGIN_SUCCESS_MESSAGES,
  LOGO_CONFIG,
} from './constants';
