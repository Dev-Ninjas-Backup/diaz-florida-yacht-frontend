/**
 * Login Page
 * Clean, modular login page using refactored components
 */

'use client';

import { LoginForm } from '@/components/Login/LoginForm';
import { LOGIN_LABELS, LOGO_CONFIG } from '@/components/Login/constants';
import { useLoginForm } from '@/components/Login/useLoginForm';
import React from 'react';

interface LoginProps {
  onClose?: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onClose }) => {
  const {
    formData,
    showPassword,
    isSubmitting,
    handleInputChange,
    togglePassword,
    handleSubmit,
    handleGoogleLogin,
  } = useLoginForm({ onClose });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div
            className={`${LOGO_CONFIG.size} rounded-full border-4 border-blue-500 flex items-center justify-center`}
          >
            <span className={`text-blue-500 font-bold ${LOGO_CONFIG.fontSize}`}>
              {LOGO_CONFIG.text}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {LOGIN_LABELS.title}
        </h2>

        {/* Login Form */}
        <LoginForm
          formData={formData}
          isSubmitting={isSubmitting}
          showPassword={showPassword}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onTogglePassword={togglePassword}
          onGoogleLogin={handleGoogleLogin}
        />
      </div>
    </div>
  );
};

export default LoginPage;
