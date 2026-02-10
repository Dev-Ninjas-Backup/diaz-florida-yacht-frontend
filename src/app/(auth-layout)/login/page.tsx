'use client';

import { LoginForm } from '@/components/Login/LoginForm';
import { LOGIN_LABELS, LOGO_CONFIG } from '@/components/Login/constants';
import { useLoginForm } from '@/components/Login/useLoginForm';
import React from 'react';

const LoginPage: React.FC = () => {
  const {
    formData,
    showPassword,
    isSubmitting,
    handleInputChange,
    togglePassword,
    handleSubmit,
    handleGoogleLogin,
  } = useLoginForm({ onClose: undefined });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 md:p-10">
        <div className="flex justify-center mb-6">
          <div
            className={`${LOGO_CONFIG.size} rounded-full border-4 border-blue-500 flex items-center justify-center`}
          >
            <span className={`text-blue-500 font-bold ${LOGO_CONFIG.fontSize}`}>
              {LOGO_CONFIG.text}
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          {LOGIN_LABELS.title}
        </h2>

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
