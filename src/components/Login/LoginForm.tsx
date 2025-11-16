/**
 * Login Form Component
 * Main form UI with all input fields and buttons
 */

import React from 'react';
import { FaUser } from 'react-icons/fa';
import { FormInput } from './FormInput';
import { PasswordInput } from './PasswordInput';
// import { SocialLoginButtons } from './SocialLoginButtons';
import { LOGIN_LABELS, LOGIN_PLACEHOLDERS } from './constants';
import type { LoginFormProps } from './types';

export const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  isSubmitting,
  showPassword,
  onInputChange,
  onSubmit,
  onTogglePassword,
//   onGoogleLogin,
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Email Field */}
      <FormInput
        id="email"
        name="email"
        type="email"
        label={LOGIN_LABELS.email}
        value={formData.email}
        placeholder={LOGIN_PLACEHOLDERS.email}
        onChange={onInputChange}
        icon={<FaUser className="w-4 h-4 text-blue-500" />}
        required
      />

      {/* Password Field */}
      <PasswordInput
        id="password"
        name="password"
        label={LOGIN_LABELS.password}
        value={formData.password}
        placeholder={LOGIN_PLACEHOLDERS.password}
        showPassword={showPassword}
        onTogglePassword={onTogglePassword}
        onChange={onInputChange}
        required
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={onInputChange}
            className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
          />
          <span className="ml-2 text-sm text-gray-700">
            {LOGIN_LABELS.rememberMe}
          </span>
        </label>
        <a
          href="#"
          className="text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
        >
          {LOGIN_LABELS.forgotPassword}
        </a>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? LOGIN_LABELS.loggingIn : LOGIN_LABELS.loginButton}
      </button>

      {/* Social Login Buttons */}
      {/* <SocialLoginButtons onGoogleLogin={onGoogleLogin} /> */}

      {/* Register Link */}
      <p className="text-center text-sm text-gray-700 mt-6">
        {LOGIN_LABELS.dontHaveAccount}{' '}
        <a
          href="#"
          className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
        >
          {LOGIN_LABELS.register}
        </a>
      </p>
    </form>
  );
};
