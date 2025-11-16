/**
 * Login Module Types
 * TypeScript interfaces and types for the login flow
 */

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginPageProps {
  onClose?: () => void;
}

export interface LoginFormProps {
  formData: LoginFormData;
  isSubmitting: boolean;
  showPassword: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onTogglePassword: () => void;
  onGoogleLogin: () => void;
}

export interface FormInputProps {
  id: string;
  name: string;
  type?: string;
  label: string;
  value: string;
  placeholder: string;
  icon?: React.ReactNode;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface PasswordInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder: string;
  showPassword: boolean;
  onTogglePassword: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}
