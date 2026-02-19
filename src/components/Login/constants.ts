export const LOGIN_LABELS = {
  title: 'Login',
  email: 'Email',
  username: 'Username',
  password: 'Password',
  rememberMe: 'Remember me',
  forgotPassword: 'Forget Password',
  loginButton: 'Log in',
  loggingIn: 'Logging in...',
  continueWithGoogle: 'Continue with Google',
  dontHaveAccount: "Don't have an account?",
  register: 'Register!',
  orDivider: 'or',
} as const;

export const LOGIN_PLACEHOLDERS = {
  email: 'Enter your email',
  username: 'username',
  password: '123******',
} as const;

export const LOGIN_ERRORS = {
  emailRequired: 'Please enter your email',
  passwordRequired: 'Please enter your password',
  invalidEmail: 'Please enter a valid email address',
  loginFailed: 'Login failed. Please check your credentials.',
  networkError: 'Network error. Please try again.',
  unexpectedError: 'An unexpected error occurred. Please try again.',
} as const;

export const LOGIN_SUCCESS_MESSAGES = {
  loginSuccess: 'Login successful!',
  googleComingSoon: 'Google login coming soon!',
} as const;

export const LOGO_CONFIG = {
  text: 'FYT',
  size: 'w-16 h-16',
  fontSize: 'text-2xl',
} as const;

export const FORM_CONFIG = {
  minPasswordLength: 6,
  rememberMeDefault: false,
  submitDelay: 1500,
} as const;
